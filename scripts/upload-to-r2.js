#!/usr/bin/env node
/*
 Upload all files under a local folder to a Cloudflare R2 bucket (S3-compatible API).
 Usage:
   1) Create a .env file using .env.example with your credentials
   2) npm i @aws-sdk/client-s3 @aws-sdk/lib-storage mime dotenv
   3) node scripts/upload-to-r2.js --source=public/images --prefix=images

 Output:
   - uploads files to the specified R2 bucket preserving relative paths
   - writes `r2-upload-mapping.json` listing original -> public URL
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mime from 'mime';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// load .env from repo root if present
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const argv = Object.fromEntries(process.argv.slice(2).map(arg => {
  const [k, v] = arg.split('=');
  return [k.replace(/^--/, ''), v ?? true];
}));

const SOURCE_DIR = argv.source || 'public/images';
const KEY_PREFIX = argv.prefix || '';
const BUCKET = process.env.R2_BUCKET;
const ENDPOINT = process.env.R2_ENDPOINT; // e.g. https://<account>.r2.cloudflarestorage.com
const ACCESS_KEY = process.env.R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BASE_URL = process.env.R2_PUBLIC_URL; // e.g. https://pub-xxxxx.r2.dev or https://images.cpfiuna.io
const DEFAULT_CACHE = process.env.R2_CACHE_CONTROL || 'public, max-age=31536000, immutable';

if (!BUCKET || !ENDPOINT || !ACCESS_KEY || !SECRET_KEY || !BASE_URL) {
  console.error('Missing configuration. Please create a .env from .env.example and fill in values.');
  process.exit(1);
}

const client = new S3Client({
  region: 'auto',
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
  },
  forcePathStyle: false,
});

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

(async () => {
  const absSource = path.resolve(process.cwd(), SOURCE_DIR);
  if (!fs.existsSync(absSource)) {
    console.error('Source folder not found:', absSource);
    process.exit(1);
  }

  const files = walk(absSource);
  console.log(`Found ${files.length} files to upload from ${absSource}`);

  const mapping = [];

  for (const filePath of files) {
    const relative = path.relative(absSource, filePath).replace(/\\/g, '/');
    const key = (KEY_PREFIX ? KEY_PREFIX.replace(/^\/+|\/+$/g, '') + '/' : '') + relative;
    const contentType = mime.getType(filePath) || 'application/octet-stream';

    const stream = fs.createReadStream(filePath);

    console.log(`Uploading ${relative} -> ${BUCKET}/${key}`);

    try {
      const upload = new Upload({
        client,
        params: {
          Bucket: BUCKET,
          Key: key,
          Body: stream,
          ContentType: contentType,
          CacheControl: DEFAULT_CACHE,
          // No ACL needed for R2 public buckets; public access is configured in R2 settings
        }
      });

      await upload.done();

      const publicUrl = BASE_URL.replace(/\/+$/,'') + '/' + encodeURI(key);
      mapping.push({ local: filePath, key, url: publicUrl });
    } catch (err) {
      console.error('Upload failed for', filePath, err);
    }
  }

  const out = path.resolve(process.cwd(), 'r2-upload-mapping.json');
  fs.writeFileSync(out, JSON.stringify(mapping, null, 2));
  console.log('Upload finished. Mapping written to', out);
})();

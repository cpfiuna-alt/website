Migration helper: Upload images to Cloudflare R2

Quick steps

1) Create R2 bucket in Cloudflare and enable public R2.dev subdomain (or configure custom domain later).
2) Create API token (Object Read & Write) for the bucket and copy Access Key ID + Secret.
3) Copy `.env.example` to `.env` and fill the values.

Install deps:

```powershell
npm install @aws-sdk/client-s3 @aws-sdk/lib-storage mime dotenv
```

Run the uploader (example):

```powershell
node scripts/upload-to-r2.js --source=public/images --prefix=images
```

- `--source` defaults to `public/images` - adjust to your image folder
- `--prefix` will be used as a folder prefix in the bucket (optional)

Output:
- `r2-upload-mapping.json` will be created with local path -> uploaded URL mapping.

After upload:
- You can test a few URLs from `r2-upload-mapping.json`.
- When ready to use custom domain (images.cpfiuna.io), update `R2_PUBLIC_URL` and do a global find/replace of the public URLs in your code (or use the mapping to update references).

Notes:
- This script uses the S3-compatible API. It expects your R2 bucket to allow public reads (enable in R2 settings) if you want direct public URLs to work.
- Keep your `.env` out of version control; add it to `.gitignore` if not present.

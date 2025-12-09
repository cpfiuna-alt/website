// Lightweight local API server for /api/x-timeline
// Usage: set environment variable X_BEARER_TOKEN and run `node server/local-api.js`

import http from 'http';
import { URL } from 'url';
import fs from 'fs/promises';
import path from 'path';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5174;
const BEARER = process.env.X_BEARER_TOKEN;
const DEFAULT_USERNAME = process.env.X_USERNAME || 'cpfiuna';

if (!BEARER) {
  console.error('Missing X_BEARER_TOKEN environment variable. Set it and re-run.');
  process.exit(1);
}

// Simple helper that fetches a URL and returns status and parsed body (JSON if possible)
async function fetchWithStatus(url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${BEARER}` } });
  const text = await res.text();
  let body = text;
  try {
    body = JSON.parse(text);
  } catch (e) {
    // keep text
  }
  return { status: res.status, ok: res.ok, body, headers: res.headers };
}

// In-memory cache for development to avoid hammering the X API during reloads
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const cache = new Map();

// Optional persistent cache on disk to preserve previously fetched posts between restarts
const CACHE_DIR = path.resolve(process.cwd(), 'data');
const CACHE_FILE = path.join(CACHE_DIR, 'x-timeline-cache.json');

async function loadDiskCache() {
  try {
    const txt = await fs.readFile(CACHE_FILE, 'utf8');
    const obj = JSON.parse(txt);
    if (obj && typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        cache.set(k, v);
      }
      console.log(`Loaded ${Object.keys(obj).length} cached timeline(s) from ${CACHE_FILE}`);
    }
  } catch (e) {
    // ignore if file doesn't exist
  }
}

async function persistDiskCache() {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const obj = {};
    for (const [k, v] of cache.entries()) obj[k] = v;
    await fs.writeFile(CACHE_FILE, JSON.stringify(obj, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to persist cache to disk', e);
  }
}

// Attempt to load disk cache at startup (best-effort)
loadDiskCache().catch(() => {});

function sendJson(res, status, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,OPTIONS',
  });
  res.end(body);
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      return res.end();
    }

    if (url.pathname === '/api/x-timeline' && req.method === 'GET') {
      const username = url.searchParams.get('username') || DEFAULT_USERNAME;

      // Check cache first
      const cacheKey = `timeline:${username}`;
      const cached = cache.get(cacheKey);
      if (cached && (Date.now() - cached.ts) < CACHE_TTL_MS) {
        res.setHeader('X-Cache', 'HIT');
        return sendJson(res, 200, { posts: cached.posts });
      }

      // Resolve user id
      const userUrl = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}`;
      const userResp = await fetchWithStatus(userUrl);
      if (!userResp.ok) {
        // Propagate upstream status and body and forward rate-limit headers if present
        const status = userResp.status || 502;
        try {
          const limit = userResp.headers && userResp.headers.get ? userResp.headers.get('x-rate-limit-limit') : undefined;
          const remaining = userResp.headers && userResp.headers.get ? userResp.headers.get('x-rate-limit-remaining') : undefined;
          const reset = userResp.headers && userResp.headers.get ? userResp.headers.get('x-rate-limit-reset') : undefined;
          if (limit) res.setHeader('x-rate-limit-limit', limit);
          if (remaining) res.setHeader('x-rate-limit-remaining', remaining);
          if (reset) res.setHeader('x-rate-limit-reset', reset);
        } catch (e) {
          // ignore
        }
        return sendJson(res, status, { error: userResp.body || 'Could not resolve user id' });
      }
      const userId = userResp.body?.data?.id;
      if (!userId) return sendJson(res, 502, { error: 'Could not resolve user id' });

      const tweetUrl = `https://api.twitter.com/2/users/${userId}/tweets?max_results=12&tweet.fields=created_at,public_metrics,attachments&expansions=attachments.media_keys&media.fields=preview_image_url,url,type`;

      // Basic retry for 429 (rate limit) with backoff
      let timelineResp;
      for (let attempt = 0; attempt < 3; attempt++) {
        timelineResp = await fetchWithStatus(tweetUrl);
        if (timelineResp.ok) break;
        if (timelineResp.status !== 429) break; // only retry on 429
        const backoff = 500 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, backoff));
      }

      if (!timelineResp.ok) {
        // Propagate upstream status (e.g., 429) and body, and forward rate-limit headers
        const status = timelineResp.status || 502;
        try {
          const limit = timelineResp.headers && timelineResp.headers.get ? timelineResp.headers.get('x-rate-limit-limit') : undefined;
          const remaining = timelineResp.headers && timelineResp.headers.get ? timelineResp.headers.get('x-rate-limit-remaining') : undefined;
          const reset = timelineResp.headers && timelineResp.headers.get ? timelineResp.headers.get('x-rate-limit-reset') : undefined;
          if (limit) res.setHeader('x-rate-limit-limit', limit);
          if (remaining) res.setHeader('x-rate-limit-remaining', remaining);
          if (reset) res.setHeader('x-rate-limit-reset', reset);
        } catch (e) {
          // ignore
        }
        return sendJson(res, status, { error: timelineResp.body || 'Upstream error' });
      }

      const timeline = timelineResp.body;

      const mediaByKey = {};
      if (timeline.includes && Array.isArray(timeline.includes.media)) {
        for (const m of timeline.includes.media) mediaByKey[m.media_key] = m;
      }

      const posts = (timeline.data || []).map((t) => {
        const media = [];
        if (t.attachments && Array.isArray(t.attachments.media_keys)) {
          for (const key of t.attachments.media_keys) {
            const m = mediaByKey[key];
            if (!m) continue;
            if (m.url) media.push(m.url);
            else if (m.preview_image_url) media.push(m.preview_image_url);
          }
        }
        return {
          id: t.id,
          created_at: t.created_at,
          text: t.text,
          url: `https://x.com/${username}/status/${t.id}`,
          media,
          public_metrics: t.public_metrics || {},
        };
      });

      // Cache the result for a short time to avoid repeated requests during development
      cache.set(cacheKey, { ts: Date.now(), posts });
      // Persist cache to disk (fire-and-forget)
      persistDiskCache().catch((e) => console.error('persist error', e));

      // Forward rate-limit headers from the successful upstream response if available
      try {
        const limit = timelineResp.headers && timelineResp.headers.get ? timelineResp.headers.get('x-rate-limit-limit') : undefined;
        const remaining = timelineResp.headers && timelineResp.headers.get ? timelineResp.headers.get('x-rate-limit-remaining') : undefined;
        const reset = timelineResp.headers && timelineResp.headers.get ? timelineResp.headers.get('x-rate-limit-reset') : undefined;
        if (limit) res.setHeader('x-rate-limit-limit', limit);
        if (remaining) res.setHeader('x-rate-limit-remaining', remaining);
        if (reset) res.setHeader('x-rate-limit-reset', reset);
      } catch (e) {
        // ignore header forwarding errors
      }

      res.setHeader('Cache-Control', `public, max-age=${Math.floor(CACHE_TTL_MS/1000)}`);
      res.setHeader('X-Cache', 'MISS');
      return sendJson(res, 200, { posts });
    }

    // Not found
    sendJson(res, 404, { error: 'Not found' });
  } catch (err) {
    console.error('/api/x-timeline error', err);
    sendJson(res, 500, { error: err?.message || String(err) });
  }
});

server.listen(PORT, () => {
  console.log(`Local API server listening on http://localhost:${PORT}`);
  console.log(`Endpoint: http://localhost:${PORT}/api/x-timeline`);
});

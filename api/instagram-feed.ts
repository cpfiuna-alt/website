/* DISABLED - External API integration disabled
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Serverless endpoint to fetch Instagram (Graph API) media for a Creator/Business account.
// Expects environment variables: INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID

const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const IG_USER_ID = process.env.INSTAGRAM_USER_ID;
const DEFAULT_TTL = Number(process.env.X_CACHE_TTL_SECONDS || '300');

async function fetchJson(url: string) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, body: JSON.parse(text), headers: res.headers }; }
  catch { return { ok: res.ok, status: res.status, body: text, headers: res.headers }; }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!ACCESS_TOKEN || !IG_USER_ID) {
    return res.status(500).json({ error: 'Missing INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_USER_ID environment variable' });
  }

    res.status(200).json({ posts: [] });
  }
}
*/

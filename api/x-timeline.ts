/* DISABLED - External API integration disabled
import type { VercelRequest, VercelResponse } from "@vercel/node";
import fs from "fs";
import path from "path";

// Serverless endpoint to fetch X (Twitter) timeline and expose a small simplified JSON shape
// Expects environment variable `X_BEARER_TOKEN` (required) and optional `X_USERNAME` (defaults to "cpfiuna").
// This file adds a simple file-based cache so that repeated requests don't always hit the upstream API.
// NOTE: Writing to disk is fine for local development. For production (Vercel, Cloudflare) prefer durable
// stores like R2/KV or an external cache. This is intentionally simple to set up for now.

const BEARER = process.env.X_BEARER_TOKEN;
const DEFAULT_USERNAME = process.env.X_USERNAME || "cpfiuna";
const CACHE_TTL = Number(process.env.X_CACHE_TTL || 300); // seconds
const CACHE_FILE = path.resolve(process.cwd(), "data", "x-timeline-cache.json");

async function fetchJson(url: string, bearer: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${bearer}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upstream request failed: ${res.status} ${res.statusText} - ${text}`);
  }
  return res.json();
}

function readCache(): { username: string; timestamp: number; posts: any[] } | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const raw = fs.readFileSync(CACHE_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.timestamp || !parsed.posts) return null;
    return parsed;
  } catch (err) {
    console.warn("x-timeline cache read failed:", err);
    return null;
  }
}

function writeCache(payload: { username: string; posts: any[] }) {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const out = { ...payload, timestamp: Date.now() };
    fs.writeFileSync(CACHE_FILE, JSON.stringify(out, null, 2), "utf-8");
  } catch (err) {
    console.warn("x-timeline cache write failed:", err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!BEARER) {
    return res.status(500).json({ error: "Missing X_BEARER_TOKEN environment variable" });
  }

  const username = (req.query.username as string) || DEFAULT_USERNAME;

  try {
    // Try to serve from cache when fresh
    const cache = readCache();
    if (cache && cache.username === username) {
      const age = (Date.now() - cache.timestamp) / 1000;
      if (age < CACHE_TTL) {
        res.setHeader("Cache-Control", `s-maxage=${Math.max(5, Math.floor(CACHE_TTL / 2))}, stale-while-revalidate=60`);
        return res.status(200).json({ posts: cache.posts, cached: true });
      }
    }

    // 1) Resolve user id by username
    const userUrl = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(username)}`;
    const userData = await fetchJson(userUrl, BEARER);
    const userId = userData?.data?.id;
    if (!userId) throw new Error("Could not resolve user id for username");

    // 2) Fetch recent tweets with media expansions
    const tweetUrl = `https://api.twitter.com/2/users/${userId}/tweets?max_results=12&tweet.fields=created_at,public_metrics,attachments&expansions=attachments.media_keys&media.fields=preview_image_url,url,type`;
    const timeline = await fetchJson(tweetUrl, BEARER);

    const mediaByKey: Record<string, any> = {};
    if (timeline.includes && Array.isArray(timeline.includes.media)) {
      for (const m of timeline.includes.media) {
        mediaByKey[m.media_key] = m;
      }
    }

    const posts = (timeline.data || []).map((t: any) => {
      const media: string[] = [];
      if (t.attachments && Array.isArray(t.attachments.media_keys)) {
        for (const key of t.attachments.media_keys) {
          const m = mediaByKey[key];
          if (!m) continue;
          // prefer direct url, fallback to preview_image_url
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

    // persist cache for subsequent requests
    try {
      writeCache({ username, posts });
    } catch (err) {
      // non-fatal
    }

    // Return a light shape consumed by the frontend hook
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    return res.status(200).json({ posts, cached: false });
  } catch (err: any) {
    console.error("/api/x-timeline error:", err?.message || err);
    return res.status(500).json({ error: err?.message || String(err) });
  }
}
*/

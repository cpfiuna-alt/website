// Simple test script to call the X (Twitter) API using a bearer token from env
// Usage: set env var X_BEARER_TOKEN and run `node scripts/test-x-timeline.js`.

const BEARER = process.env.X_BEARER_TOKEN;
const USERNAME = process.env.X_USERNAME || 'cpfiuna';

if (!BEARER) {
  console.error('Missing X_BEARER_TOKEN environment variable');
  process.exit(1);
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${BEARER}` } });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

(async () => {
  try {
    const userUrl = `https://api.twitter.com/2/users/by/username/${encodeURIComponent(USERNAME)}`;
    console.log('Resolving user id for', USERNAME);
    const userData = await fetchJson(userUrl);
    if (!userData || !userData.data) throw new Error('Could not resolve user id: ' + JSON.stringify(userData));
    const userId = userData.data.id;
    console.log('User id:', userId);

    const tweetUrl = `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics,attachments&expansions=attachments.media_keys&media.fields=preview_image_url,url,type`;
    console.log('Fetching tweets...');
    const timeline = await fetchJson(tweetUrl);
    console.log(JSON.stringify(timeline, null, 2));
  } catch (err) {
    console.error('Error:', err?.message || err);
    process.exit(2);
  }
})();

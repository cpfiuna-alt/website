# Cloudflare Worker for R2 Caching

This worker provides an efficient caching layer for your R2 bucket to minimize API calls and preserve free tier credits.

## Setup Instructions

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
# or
bun install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

### 3. Configure the Worker

Edit `wrangler.toml` and replace `your-bucket-name` with your actual R2 bucket name:

```toml
[[r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "your-actual-bucket-name"  # Change this!
```

### 4. Deploy the Worker

From the `workers` directory:

```bash
wrangler deploy
```

After deployment, you'll get a URL like: `https://r2-cache-worker.your-subdomain.workers.dev`

### 5. Test the Worker

Visit your worker URL with a path to a file in your R2 bucket:

```
https://r2-cache-worker.your-subdomain.workers.dev/path/to/your/file.jpg
```

Check the response headers - you should see `X-Cache-Status: MISS` on first request and `X-Cache-Status: HIT` on subsequent requests.

## Cache Configuration

### Default Cache Duration

The worker is configured to cache responses for **1 hour** (3600 seconds). You can adjust this by changing the `Cache-Control` header in the worker:

```javascript
'Cache-Control': 'public, max-age=3600', // Change 3600 to your desired seconds
```

### Cache Duration Options

- **5 minutes**: `max-age=300`
- **1 hour**: `max-age=3600`
- **1 day**: `max-age=86400`
- **1 week**: `max-age=604800`
- **1 month**: `max-age=2592000`

## How to Clear/Reset Cache

### Option 1: Purge Cache via Cloudflare Dashboard (Recommended)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your zone/domain
3. Navigate to **Caching** → **Configuration**
4. Click **Purge Everything** (clears all cache)
5. Or use **Custom Purge** to clear specific URLs or files

### Option 2: Purge Cache via API

#### Purge Everything:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

#### Purge Specific URLs:

```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "files": [
      "https://r2-cache-worker.your-subdomain.workers.dev/path/to/file.jpg",
      "https://r2-cache-worker.your-subdomain.workers.dev/another/file.png"
    ]
  }'
```

### Option 3: Purge Cache via Wrangler CLI

```bash
# Purge all cache for your worker
wrangler pages deployment tail --project-name=r2-cache-worker
```

### Option 4: Wait for Cache Expiration

If you don't need immediate updates, simply wait for the cache TTL to expire (default: 1 hour).

### Option 5: Add Cache Busting to Your Code

When uploading new files, append a version query string:

```javascript
// Old URL (cached)
const imageUrl = 'https://worker-url.workers.dev/image.jpg';

// New URL (bypasses cache)
const imageUrl = 'https://worker-url.workers.dev/image.jpg?v=2';
```

## Advanced Configuration

### Custom Domain Setup

1. In Cloudflare Dashboard, go to your worker
2. Click **Triggers** tab
3. Add a **Custom Domain** (e.g., `cdn.yourdomain.com`)
4. Or add a **Route** pattern

Update `wrangler.toml`:

```toml
routes = [
  { pattern = "cdn.yourdomain.com/*", zone_name = "yourdomain.com" }
]
```

### Environment-Specific Configuration

Create different workers for development and production:

```toml
[env.production]
name = "r2-cache-worker-prod"
[[env.production.r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "prod-bucket"

[env.development]
name = "r2-cache-worker-dev"
[[env.development.r2_buckets]]
binding = "R2_BUCKET"
bucket_name = "dev-bucket"
```

Deploy to specific environment:
```bash
wrangler deploy --env production
```

### Add Cache Headers Debugging

Modify the worker to add more cache information:

```javascript
response.headers.set('X-Cache-Status', response ? 'HIT' : 'MISS');
response.headers.set('X-Cache-Date', new Date().toISOString());
```

## Monitoring Cache Performance

### Check Cache Hit Rate

1. Go to Cloudflare Dashboard → **Analytics** → **Workers**
2. View your worker's analytics
3. Monitor requests, cache hit ratio, and performance

### View Real-Time Logs

```bash
wrangler tail
```

This shows real-time logs including cache hits/misses.

## Cost Savings

With proper caching:
- **Cache Hit**: 0 R2 operations (free!)
- **Cache Miss**: 1 R2 read operation

If you have 1000 requests for the same image:
- **Without caching**: 1000 R2 operations
- **With caching (1 hour TTL)**: ~1-24 R2 operations (depending on cache expiry)

This can reduce your R2 operations by **95-99%**!

## Troubleshooting

### Cache Not Working

1. Check that `Cache-Control` header is set correctly
2. Verify the request method is GET
3. Check Cloudflare cache settings for your zone
4. Ensure the response is cacheable (200 status code)

### CORS Issues

Add CORS headers to the worker response:

```javascript
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET, OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type',
```

### Worker Not Deploying

1. Verify R2 bucket name is correct
2. Check that you have permissions for the bucket
3. Run `wrangler whoami` to confirm you're logged in

## Additional Resources

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [R2 Documentation](https://developers.cloudflare.com/r2/)
- [Cache API Documentation](https://developers.cloudflare.com/workers/runtime-apis/cache/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

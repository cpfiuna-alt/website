/**
 * Cloudflare Worker with Cache for R2 Bucket
 * 
 * This worker sits in front of your R2 bucket and caches responses
 * to minimize R2 API calls and save on free tier credits.
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // Only handle GET requests (caching)
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Create a cache key from the request URL
    const cacheKey = new Request(url.toString(), request);
    const cache = caches.default;

    // Try to get the response from cache first
    let response = await cache.match(cacheKey);

    if (response) {
      // Cache hit - return cached response with a header indicating it's from cache
      response = new Response(response.body, response);
      response.headers.set('X-Cache-Status', 'HIT');
      return response;
    }

    // Cache miss - fetch from R2
    const path = url.pathname.slice(1); // Remove leading slash
    
    try {
      // Get object from R2 bucket
      const object = await env.R2_BUCKET.get(path);

      if (!object) {
        return new Response('Not Found', { status: 404 });
      }

      // Determine content type
      const contentType = object.httpMetadata?.contentType || 
                         getContentType(path) || 
                         'application/octet-stream';

      // Create response with appropriate headers
      response = new Response(object.body, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
          'ETag': object.httpEtag,
          'X-Cache-Status': 'MISS',
          'Access-Control-Allow-Origin': '*', // Adjust as needed
        },
      });

      // Store in cache (respects Cache-Control headers)
      // Cloudflare will cache based on the Cache-Control header
      await cache.put(cacheKey, response.clone());

      return response;
    } catch (error) {
      return new Response(`Error: ${error.message}`, { status: 500 });
    }
  },
};

/**
 * Helper function to determine content type from file extension
 */
function getContentType(path) {
  const ext = path.split('.').pop()?.toLowerCase();
  
  const contentTypes = {
    // Images
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon',
    
    // Documents
    'pdf': 'application/pdf',
    'json': 'application/json',
    'xml': 'application/xml',
    'txt': 'text/plain',
    'md': 'text/markdown',
    
    // Web
    'html': 'text/html',
    'css': 'text/css',
    'js': 'application/javascript',
    
    // Fonts
    'woff': 'font/woff',
    'woff2': 'font/woff2',
    'ttf': 'font/ttf',
    'otf': 'font/otf',
    
    // Video
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    
    // Audio
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
  };
  
  return contentTypes[ext];
}

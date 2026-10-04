// Cloudflare Workers Entry Script (Wrangler / Cloudflare Workers runtime)
// Intercepts /sitemap.xml and /robots.txt with HTTP 200 OK and valid XML / plain MIME types,
// and delegates other requests to static assets (env.ASSETS) or index.html for SPA routing.

const PRODUCTION_HOSTNAME = 'https://jan-seva-finder-2-0.bharat-internship-portal.workers.dev';

const SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${PRODUCTION_HOSTNAME}/</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/services</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/schemes</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/scholarships</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/jobs</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/internships</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/documents</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/states</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/about</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/privacy</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/terms</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/disclaimer</loc>
  </url>
  <url>
    <loc>${PRODUCTION_HOSTNAME}/contact</loc>
  </url>
</urlset>`.trim();

const ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: ${PRODUCTION_HOSTNAME}/sitemap.xml
`.trim();

const SW_JS = `self.options = {
    "domain": "3nbf4.com",
    "zoneId": 11953436
}
self.lary = ""
importScripts('https://3nbf4.com/act/files/service-worker.min.js?r=sw')
`.trim();

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Explicitly serve /sitemap.xml and /sitemap with 200 OK and application/xml
    if (url.pathname === '/sitemap.xml' || url.pathname === '/sitemap') {
      if (request.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Content-Length': String(new TextEncoder().encode(SITEMAP_XML).length),
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      return new Response(SITEMAP_XML, {
        status: 200,
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=3600, s-maxage=86400',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 2. Explicitly serve /robots.txt with 200 OK and text/plain
    if (url.pathname === '/robots.txt') {
      if (request.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Length': String(new TextEncoder().encode(ROBOTS_TXT).length),
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      return new Response(ROBOTS_TXT + '\n', {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 3. Explicitly serve /sw.js with 200 OK and application/javascript
    if (url.pathname === '/sw.js') {
      if (request.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            'Content-Type': 'application/javascript; charset=utf-8',
            'Service-Worker-Allowed': '/',
            'Content-Length': String(new TextEncoder().encode(SW_JS + '\n').length),
            'Cache-Control': 'public, max-age=0, must-revalidate',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      return new Response(SW_JS + '\n', {
        status: 200,
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Service-Worker-Allowed': '/',
          'Cache-Control': 'public, max-age=0, must-revalidate',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 4. Delegate to Cloudflare static assets binding (env.ASSETS)
    if (env && env.ASSETS) {
      try {
        const response = await env.ASSETS.fetch(request);
        if (response.status === 200 || response.status === 304) {
          return response;
        }

        // If asset is not found (client-side SPA route like /services, /scholarships, etc.),
        // serve index.html with 200 OK so React router handles it
        const indexRequest = new Request(new URL('/index.html', request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      } catch {
        // Fallback below
      }
    }

    // 4. Fallback for environments without ASSETS binding
    return new Response('JanSeva Finder', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};

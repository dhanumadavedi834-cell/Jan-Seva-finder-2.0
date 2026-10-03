// Cloudflare Workers Entry Script (Wrangler / Cloudflare Workers runtime)
// Directly intercepts /sitemap.xml and /robots.txt with HTTP 200 OK, valid XML/plain MIME types,
// and routes other requests to static assets (env.ASSETS) or index.html for SPA routing.

const SITEMAP_CONTENT = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Sections -->
  <url>
    <loc>__ORIGIN__/</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>__ORIGIN__/schemes</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>__ORIGIN__/scholarships</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>__ORIGIN__/jobs</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>__ORIGIN__/internships</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>__ORIGIN__/documents</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Key Official Portals & Services -->
  <url>
    <loc>__ORIGIN__/services/national-scholarship-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/digilocker</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/uidai-myaadhaar</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/national-career-service</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/myscheme-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/umang-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/aicte-internship-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/skill-india-digital</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/parivahan-sewa</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/income-tax-pan</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/passport-seva</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/pm-kisan-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/ayushman-bharat-pmjay</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/epfo-member-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/ssc-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/upsc-online</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/rrb-railway-recruitment</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/swayam-education</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/vidya-lakshmi-portal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/pm-vishwakarma</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/voter-portal-eci</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/atal-pension-yojana</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/pm-awas-yojana</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/crs-birth-death-certificates</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/pm-mudra-yojana</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>__ORIGIN__/services/abha-digital-health-id</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Key State Portals -->
  <url>
    <loc>__ORIGIN__/states/telangana</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/andhra-pradesh</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/maharashtra</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/delhi</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/uttar-pradesh</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/karnataka</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/tamil-nadu</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/rajasthan</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/gujarat</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/bihar</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>__ORIGIN__/states/west-bengal</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Legal & Transparency Pages -->
  <url>
    <loc>__ORIGIN__/about</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>__ORIGIN__/privacy</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>__ORIGIN__/disclaimer</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>__ORIGIN__/terms</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>__ORIGIN__/contact</loc>
    <lastmod>2026-10-03</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. Explicitly serve /sitemap.xml and /sitemap with 200 OK and application/xml
    if (url.pathname === '/sitemap.xml' || url.pathname === '/sitemap') {
      const origin = url.origin || 'https://jan-seva-finder-2-0.bharat-internship-portal.worker.dev';
      const xml = SITEMAP_CONTENT.replaceAll('__ORIGIN__', origin).trim();

      if (request.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Content-Length': String(new TextEncoder().encode(xml).length),
            'Cache-Control': 'public, max-age=3600, s-maxage=86400',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      return new Response(xml, {
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
      const origin = url.origin || 'https://jan-seva-finder-2-0.bharat-internship-portal.worker.dev';
      const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`;

      if (request.method === 'HEAD') {
        return new Response(null, {
          status: 200,
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Length': String(new TextEncoder().encode(robotsTxt).length),
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      return new Response(robotsTxt, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // 3. Delegate to Cloudflare static assets binding (env.ASSETS)
    if (env && env.ASSETS) {
      try {
        const response = await env.ASSETS.fetch(request);
        if (response.status === 200 || response.status === 304) {
          return response;
        }

        // If asset is not found (e.g. client-side SPA route like /services or /scholarships),
        // serve index.html with 200 OK so React router handles it
        const indexRequest = new Request(new URL('/index.html', request.url), request);
        return await env.ASSETS.fetch(indexRequest);
      } catch {
        // Fallback below
      }
    }

    // 4. Fallback for worker environments without ASSETS binding
    return new Response('JanSeva Finder', {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  },
};

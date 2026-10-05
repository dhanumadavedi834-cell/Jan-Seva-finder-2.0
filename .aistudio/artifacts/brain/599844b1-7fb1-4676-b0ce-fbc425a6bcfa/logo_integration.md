# SevaKhoj India Brand & Logo Integration

![SevaKhoj India Logo](janseva-logo.png)

## Verification Checklist

1. **Brand Rename & Website Header**:
   - The brand is updated to **SevaKhoj India** throughout the site.
   - The logo image (`/janseva-logo.png`) displays **SevaKhoj India** and is positioned beside the brand name in `src/components/Header.tsx`.
   - Clicking either the logo or brand returns the user directly to `/` (the homepage).
   - Fully responsive on desktop and mobile viewports (`w-9 h-9 sm:w-10 sm:h-10 object-contain`).
   - Accessible with `alt="SevaKhoj India logo"`.

2. **Favicon**:
   - Configured in `index.html` with:
     - `<link rel="icon" type="image/png" href="/janseva-logo.png" />`
     - `<link rel="apple-touch-icon" href="/janseva-logo.png" />`

3. **SEO & Structured Data (JSON-LD)**:
   - Updated `title`: "SevaKhoj India - Government Services, Schemes, Scholarships, Jobs & More"
   - Updated `description`: "SevaKhoj India helps people find Indian government services, schemes, scholarships, jobs, internships, documents and state services in one place."
   - Updated `WebSite` and `Organization` schemas with name **SevaKhoj India**.
   - Logo in schema:
     - URL: `https://jan-seva-finder-2-0.bharat-internship-portal.workers.dev/janseva-logo.png`
     - Caption: `SevaKhoj India logo`
   - Connected `publisher` in `WebSite` schema to `#organization`.

4. **Social Sharing (OpenGraph & Twitter)**:
   - `og:site_name`: "SevaKhoj India"
   - `og:title`: "SevaKhoj India - Government Services, Schemes, Scholarships, Jobs & More"
   - `og:description`: "SevaKhoj India helps people find Indian government services, schemes, scholarships, jobs, internships, documents and state services in one place."
   - `og:image:alt` and `twitter:image:alt`: "SevaKhoj India logo"
   - Dynamic page SEO updater (`src/utils/seo.ts`) maintains social tags across all client-side page views.

5. **Cloudflare & Monetag Compatibility**:
   - Monetag advertising tag retained intact (`data-zone="290492"`).
   - Monetag Service Worker (`public/sw.js` and worker script) intact.
   - Cloudflare Worker static assets routing (`env.ASSETS`) and domain intact:
     `https://jan-seva-finder-2-0.bharat-internship-portal.workers.dev/`

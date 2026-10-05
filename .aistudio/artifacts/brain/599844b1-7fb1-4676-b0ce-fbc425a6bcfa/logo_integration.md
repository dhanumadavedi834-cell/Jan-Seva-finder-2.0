# JanSeva Finder Logo Integration

![JanSeva Finder Logo](janseva-logo.png)

## Verification Checklist

1. **Website Header**:
   - The logo is integrated beside the "JanSeva Finder" brand in `src/components/Header.tsx`.
   - Clicking either the logo or brand returns the user directly to `/` (the homepage).
   - Fully responsive on desktop and mobile viewports (`w-9 h-9 sm:w-10 sm:h-10 object-contain`).
   - Accessible with `alt="JanSeva Finder logo"`.

2. **Favicon**:
   - Configured in `index.html` with:
     - `<link rel="icon" type="image/png" href="/janseva-logo.png" />`
     - `<link rel="apple-touch-icon" href="/janseva-logo.png" />`

3. **SEO & Structured Data (JSON-LD)**:
   - Added `ImageObject` logo and image to `Organization` schema in `index.html`:
     - URL: `https://jan-seva-finder-2-0.bharat-internship-portal.workers.dev/janseva-logo.png`
     - Dimensions: 1024x1024
   - Connected `publisher` in `WebSite` schema to `#organization`.

4. **Social Sharing (OpenGraph & Twitter)**:
   - Added `og:image`, `og:image:width`, `og:image:height`, and `og:image:alt`.
   - Added `twitter:image` and `twitter:image:alt`.
   - Dynamic page SEO updater (`src/utils/seo.ts`) maintains social image tags across all client-side page views.

5. **Cloudflare & Monetag Compatibility**:
   - Monetag advertising tag retained intact (`data-zone="290492"`).
   - Monetag Service Worker (`public/sw.js` and worker script) intact.
   - Cloudflare Worker static assets routing (`env.ASSETS`) intact.

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
}

const DEFAULT_TITLE = 'JanSeva Finder – Official Indian Public Services, Schemes & Portals';
const DEFAULT_DESC = 'Search verified government schemes, scholarships, jobs, internships, documents and public services across India from one independent discovery directory. No login needed.';

export function updatePageSEO({ title, description, canonicalPath }: SEOProps) {
  const finalTitle = title ? `${title} | JanSeva Finder` : DEFAULT_TITLE;
  const finalDesc = description || DEFAULT_DESC;

  // Title
  document.title = finalTitle;

  // Meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', finalDesc);
  }

  // OG Title & Desc
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', finalTitle);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', finalDesc);

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', finalTitle);

  const twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', finalDesc);

  // Canonical & Social URLs (Always use verified production hostname)
  const PRODUCTION_ORIGIN = 'https://jan-seva-finder-2-0.bharat-internship-portal.workers.dev';
  const cleanPath = (canonicalPath || window.location.pathname || '/').replace(/^#/, '');
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  const absoluteUrl = `${PRODUCTION_ORIGIN}${normalizedPath === '/' ? '/' : normalizedPath}`;

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', absoluteUrl);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', absoluteUrl);
  }

  const twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) {
    twitterUrl.setAttribute('content', absoluteUrl);
  }
}

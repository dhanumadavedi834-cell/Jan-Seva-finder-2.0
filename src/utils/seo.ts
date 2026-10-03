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

  // Canonical
  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    const origin = window.location.origin;
    const path = canonicalPath || window.location.pathname + window.location.hash;
    canonicalEl.setAttribute('href', `${origin}${path}`);
  }
}

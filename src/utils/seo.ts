export interface BreadcrumbSEOItem {
  name: string;
  path: string;
}

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  breadcrumbs?: BreadcrumbSEOItem[];
}

export const PRODUCTION_ORIGIN = 'https://jan-seva-finder-2-0.bharat-internship-portal.workers.dev';
const DEFAULT_TITLE = 'JanSeva Finder - Government Services, Schemes, Scholarships & Jobs';
const DEFAULT_DESC = 'Search verified Indian government schemes, scholarships, civil recruitment, digital documents, and citizen services from one independent discovery directory.';

export function updatePageSEO({ title, description, canonicalPath, breadcrumbs }: SEOProps) {
  // Format Title: if title is provided and already contains 'JanSeva Finder', use it directly;
  // otherwise suffix with ' - JanSeva Finder'
  let finalTitle = DEFAULT_TITLE;
  if (title) {
    finalTitle = title.includes('JanSeva Finder') ? title : `${title} - JanSeva Finder`;
  }
  const finalDesc = description || DEFAULT_DESC;

  // Title
  document.title = finalTitle;

  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', finalDesc);

  // Robots meta tag
  let metaRobots = document.querySelector('meta[name="robots"]');
  if (!metaRobots) {
    metaRobots = document.createElement('meta');
    metaRobots.setAttribute('name', 'robots');
    document.head.appendChild(metaRobots);
  }
  metaRobots.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

  // Open Graph
  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', finalTitle);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', finalDesc);

  // Twitter
  let twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', finalTitle);

  let twitterDesc = document.querySelector('meta[name="twitter:description"]');
  if (twitterDesc) twitterDesc.setAttribute('content', finalDesc);

  // Canonical & Social URLs (Always use verified production hostname without hash)
  let cleanPath = (canonicalPath || (typeof window !== 'undefined' ? window.location.pathname : '/')).replace(/^#/, '');
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }
  const absoluteUrl = `${PRODUCTION_ORIGIN}${cleanPath === '/' ? '/' : cleanPath}`;

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', absoluteUrl);
  }

  let ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', absoluteUrl);
  }

  let twitterUrl = document.querySelector('meta[name="twitter:url"]');
  if (twitterUrl) {
    twitterUrl.setAttribute('content', absoluteUrl);
  }

  // Manage Dynamic BreadcrumbList JSON-LD
  let breadcrumbScript = document.getElementById('jsonld-breadcrumbs');
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${PRODUCTION_ORIGIN}/`,
        },
        ...breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          position: idx + 2,
          name: b.name,
          item: b.path.startsWith('http')
            ? b.path
            : `${PRODUCTION_ORIGIN}${b.path.startsWith('/') ? b.path : `/${b.path}`}`,
        })),
      ],
    };

    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.id = 'jsonld-breadcrumbs';
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(breadcrumbScript);
    }
    breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
  } else if (breadcrumbScript) {
    breadcrumbScript.remove();
  }
}

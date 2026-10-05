import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { MobileNav } from './components/MobileNav';
import { HomePage } from './pages/HomePage';
import { DirectoryPage } from './pages/DirectoryPage';
import { ServiceDetails } from './components/ServiceDetails';
import { StatesPage } from './pages/StatesPage';
import { StudentsPage } from './pages/StudentsPage';
import { JobsPage } from './pages/JobsPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { LegalPages } from './pages/LegalPages';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { SERVICES } from './data/services';
import { STATES_AND_UTS } from './data/statesData';
import { Service } from './types/service';
import { trackEvent } from './utils/analytics';
import { updatePageSEO } from './utils/seo';

function getNormalizedPath(): string {
  if (typeof window === 'undefined') return '/';

  // Backwards compatibility for legacy hash URLs: e.g. /#/services or /#services
  const hash = window.location.hash;
  if (hash && hash.startsWith('#/')) {
    const upgradedPath = hash.slice(1); // e.g. '/services'
    try {
      window.history.replaceState({}, '', upgradedPath);
    } catch {
      // Ignore if state cannot be replaced
    }
    return upgradedPath;
  }

  const pathname = window.location.pathname;
  if (pathname === '/index.html' || pathname === '/200.html' || !pathname) {
    return `/${window.location.search || ''}`;
  }
  return `${pathname}${window.location.search || ''}`;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => getNormalizedPath());
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('janseva_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Dark mode effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('janseva_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('janseva_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navigateTo = useCallback((targetPath: string) => {
    let clean = targetPath.replace(/^#/, '');
    if (!clean.startsWith('/')) {
      clean = `/${clean}`;
    }

    try {
      window.history.pushState({}, '', clean);
    } catch {
      // In constrained iframe fallback
    }
    setCurrentPath(clean);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectService = useCallback((service: Service) => {
    setSelectedService(service);
    navigateTo(`/services/${service.id}`);
  }, [navigateTo]);

  // Route & SEO Resolver
  useEffect(() => {
    const handleRouteChange = () => {
      const pathWithQuery = getNormalizedPath();
      setCurrentPath(pathWithQuery);

      const [path] = pathWithQuery.split('?');

      // 1. Service Detail: /services/:id or /service/:id
      const servicePrefixes = ['/services/', '/service/', '/scholarships/'];
      const matchedPrefix = servicePrefixes.find((p) => path.startsWith(p) && path.length > p.length);

      if (matchedPrefix) {
        const serviceId = path.replace(matchedPrefix, '').split('?')[0].split('/')[0];
        const match = SERVICES.find((s) => s.id === serviceId);
        if (match) {
          setSelectedService(match);
          trackEvent('service_open', { target: match.name });
          updatePageSEO({
            title: `${match.name} - Application & Official Portal - JanSeva Finder`,
            description: match.shortDescription || match.description,
            canonicalPath: `/services/${match.id}`,
            breadcrumbs: [
              { name: 'Government Services', path: '/services' },
              { name: match.categoryLabel || 'Service', path: `/services?cat=${match.category}` },
              { name: match.name, path: `/services/${match.id}` },
            ],
          });
          return;
        }
      }

      setSelectedService(null);
      trackEvent('page_view', { target: path });

      // 2. Specific State Detail: /states/:slug
      if (path.startsWith('/states/') && path.length > '/states/'.length) {
        const stateSlug = path.replace('/states/', '').split('?')[0].split('/')[0];
        const stateObj = STATES_AND_UTS.find(
          (s) => s.name.toLowerCase().replace(/\s+/g, '-') === stateSlug.toLowerCase() ||
                 s.code.toLowerCase() === stateSlug.toLowerCase()
        );
        const stateName = stateObj ? stateObj.name : stateSlug;
        updatePageSEO({
          title: `${stateName} Citizen Services & Portals - JanSeva Finder`,
          description: `Access official citizen services, e-District portals, certificates, and welfare applications for ${stateName}.`,
          canonicalPath: `/states/${stateSlug}`,
          breadcrumbs: [
            { name: 'State Services', path: '/states' },
            { name: stateName, path: `/states/${stateSlug}` },
          ],
        });
        return;
      }

      // 3. Main Sections
      switch (path) {
        case '/services':
          updatePageSEO({
            title: 'Government Services - JanSeva Finder',
            description: 'Explore verified central and state public services across India. Direct links to official government portals with requirements and fee details.',
            canonicalPath: '/services',
            breadcrumbs: [{ name: 'Government Services', path: '/services' }],
          });
          break;

        case '/schemes':
          updatePageSEO({
            title: 'Government Schemes - JanSeva Finder',
            description: 'Directory of verified Central and State Government welfare schemes across agriculture, health, housing, financial inclusion, and citizen welfare.',
            canonicalPath: '/schemes',
            breadcrumbs: [{ name: 'Government Schemes', path: '/schemes' }],
          });
          break;

        case '/scholarships':
          updatePageSEO({
            title: 'Government Scholarships - JanSeva Finder',
            description: 'Discover verified national and state scholarships, higher education grants, and DBT student aid across India for Academic Year 2026-27.',
            canonicalPath: '/scholarships',
            breadcrumbs: [{ name: 'Government Scholarships', path: '/scholarships' }],
          });
          break;

        case '/jobs':
          updatePageSEO({
            title: 'Government Jobs - JanSeva Finder',
            description: 'Directory of verified central and state government recruitment portals including NCS, SSC, UPSC, and Railways RRB. No fees or intermediaries.',
            canonicalPath: '/jobs',
            breadcrumbs: [{ name: 'Government Jobs', path: '/jobs' }],
          });
          break;

        case '/internships':
          updatePageSEO({
            title: 'Government Internships - JanSeva Finder',
            description: 'Verified public sector internships and fellowships across Central Ministries, NITI Aayog, AICTE, and municipal bodies with official application details.',
            canonicalPath: '/internships',
            breadcrumbs: [{ name: 'Government Internships', path: '/internships' }],
          });
          break;

        case '/documents':
          updatePageSEO({
            title: 'Government Documents & Certificates - JanSeva Finder',
            description: 'Access official portals for DigiLocker, Aadhaar updates, instant e-PAN, driving licences, passports, and civil registration certificates.',
            canonicalPath: '/documents',
            breadcrumbs: [{ name: 'Government Documents', path: '/documents' }],
          });
          break;

        case '/states':
          updatePageSEO({
            title: 'State Citizen Services & e-District Portals - JanSeva Finder',
            description: 'Comprehensive directory of 36 State and Union Territory official citizen service portals, MeeSeva, Seva Sindhu, RTPS, and e-District systems.',
            canonicalPath: '/states',
            breadcrumbs: [{ name: 'State Services', path: '/states' }],
          });
          break;

        case '/about':
          updatePageSEO({
            title: 'About JanSeva Finder - Independent Civic Directory',
            description: 'Learn about the mission, verification standards, and editorial integrity of JanSeva Finder, an independent citizen resource directory.',
            canonicalPath: '/about',
            breadcrumbs: [{ name: 'About', path: '/about' }],
          });
          break;

        case '/privacy':
          updatePageSEO({
            title: 'Privacy Policy - JanSeva Finder',
            description: 'Read JanSeva Finder privacy commitment: no user accounts, no login required, and zero collection of personal or financial credentials.',
            canonicalPath: '/privacy',
            breadcrumbs: [{ name: 'Privacy Policy', path: '/privacy' }],
          });
          break;

        case '/terms':
          updatePageSEO({
            title: 'Terms of Use - JanSeva Finder',
            description: 'Terms of use and public directory policies for JanSeva Finder, an independent civic information index.',
            canonicalPath: '/terms',
            breadcrumbs: [{ name: 'Terms of Use', path: '/terms' }],
          });
          break;

        case '/disclaimer':
          updatePageSEO({
            title: 'Disclaimer & Official Non-Affiliation - JanSeva Finder',
            description: 'Important legal disclosure: JanSeva Finder is an independent directory and is not affiliated with, operated by, or endorsed by the Government of India.',
            canonicalPath: '/disclaimer',
            breadcrumbs: [{ name: 'Disclaimer', path: '/disclaimer' }],
          });
          break;

        case '/contact':
          updatePageSEO({
            title: 'Contact & Feedback - JanSeva Finder',
            description: 'Contact JanSeva Finder to report broken official links, suggest verified government portals, or share citizen feedback.',
            canonicalPath: '/contact',
            breadcrumbs: [{ name: 'Contact', path: '/contact' }],
          });
          break;

        case '/analytics':
          updatePageSEO({
            title: 'Directory Insights - JanSeva Finder',
            description: 'Anonymous telemetry and directory health stats.',
            canonicalPath: '/analytics',
          });
          break;

        case '/':
        case '':
          updatePageSEO({
            title: 'JanSeva Finder - Government Services, Schemes, Scholarships & Jobs',
            description: 'Search verified Indian government schemes, scholarships, civil recruitment, digital documents, and citizen services from one independent discovery directory.',
            canonicalPath: '/',
          });
          break;

        default:
          updatePageSEO({
            title: 'Page Not Found - JanSeva Finder',
            description: 'The requested page could not be found on JanSeva Finder.',
            canonicalPath: path,
          });
          break;
      }
    };

    handleRouteChange();
    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('hashchange', handleRouteChange);
    };
  }, []);

  // View Renderer
  const renderCurrentView = () => {
    const rawPath = currentPath || '/';
    const [path, queryString] = rawPath.split('?');
    const params = new URLSearchParams(queryString || '');
    const qParam = params.get('q') || '';
    const catParam = params.get('cat') || '';

    // 1. Service Detail View
    const servicePrefixes = ['/services/', '/service/', '/scholarships/'];
    const matchedPrefix = servicePrefixes.find((p) => path.startsWith(p) && path.length > p.length);
    if (matchedPrefix) {
      const serviceId = path.replace(matchedPrefix, '').split('?')[0].split('/')[0];
      const match = selectedService || SERVICES.find((s) => s.id === serviceId);
      if (match) {
        return (
          <ServiceDetails
            service={match}
            onBack={() => navigateTo('/services')}
            onSelectRelated={(s) => handleSelectService(s)}
            onNavigate={navigateTo}
          />
        );
      }
    }

    // 2. State-specific route: /states/:state (e.g. /states/delhi)
    if (path.startsWith('/states/') && path.length > '/states/'.length) {
      const stateSlug = path.replace('/states/', '').split('?')[0].split('/')[0];
      return (
        <StatesPage
          activeStateSlug={stateSlug}
          onSelectState={(slug) => navigateTo(`/states/${slug}`)}
          onSelectService={handleSelectService}
          onNavigate={navigateTo}
        />
      );
    }

    // 3. Path dispatch
    switch (path) {
      case '/':
      case '':
        return (
          <HomePage
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
          />
        );

      case '/services':
        return (
          <DirectoryPage
            initialQuery={qParam}
            initialCategory={catParam}
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/schemes':
        return (
          <DirectoryPage
            initialQuery={qParam}
            initialCategory="schemes"
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/scholarships':
        return (
          <StudentsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/jobs':
        return (
          <JobsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/internships':
        return (
          <InternshipsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/documents':
        return (
          <DocumentsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/states':
        return (
          <StatesPage
            onSelectState={(slug) => navigateTo(`/states/${slug}`)}
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '/about':
        return <LegalPages pageType="about" />;

      case '/privacy':
        return <LegalPages pageType="privacy" />;

      case '/terms':
        return <LegalPages pageType="terms" />;

      case '/disclaimer':
        return <LegalPages pageType="disclaimer" />;

      case '/contact':
        return <LegalPages pageType="contact" />;

      case '/analytics':
        return <AnalyticsPage />;

      default:
        return <NotFoundPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* High-visibility Disclaimer Banner at the very top */}
      <DisclaimerBanner condensed />

      {/* Header with crawlable links */}
      <Header
        currentPath={currentPath}
        onNavigate={navigateTo}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Dynamic Main Body Content */}
      <main className="flex-1 pb-16 md:pb-0" id="main-content">
        {renderCurrentView()}
      </main>

      {/* Comprehensive Footer with crawlable links */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile-first bottom quick nav for small screens */}
      <MobileNav currentPath={currentPath} onNavigate={navigateTo} />
    </div>
  );
}

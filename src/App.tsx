import React, { useState, useEffect } from 'react';
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
import { Service } from './types/service';
import { trackEvent } from './utils/analytics';
import { updatePageSEO } from './utils/seo';

function getNormalizedRoute(): string {
  if (typeof window === 'undefined') return '#/';
  const hash = window.location.hash;
  if (hash && hash !== '#' && hash !== '#/') {
    return hash;
  }
  const pathname = window.location.pathname;
  if (pathname && pathname !== '/' && pathname !== '/index.html' && pathname !== '/200.html') {
    return `#${pathname}${window.location.search || ''}`;
  }
  return '#/';
}

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(() => getNormalizedRoute());
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

  // Listen to hash and pathname changes (browser back/forward & internal navigation)
  useEffect(() => {
    const handleRouteChange = () => {
      const route = getNormalizedRoute();
      setCurrentHash(route);

      // Check if route matches /services/:id or /service/:id or /scholarships/:id
      const serviceMatchPrefix = ['#/service/', '#/services/', '#/scholarships/'].find((p) =>
        route.startsWith(p) && route.length > p.length
      );

      if (serviceMatchPrefix) {
        const serviceId = route.replace(serviceMatchPrefix, '').split('?')[0];
        const match = SERVICES.find((s) => s.id === serviceId);
        if (match) {
          setSelectedService(match);
          trackEvent('service_open', { target: match.name });
          updatePageSEO({
            title: match.name,
            description: match.shortDescription || match.description,
            canonicalPath: `/services/${match.id}`,
          });
          return;
        }
      }

      setSelectedService(null);
      trackEvent('page_view', { target: route });

      // Dynamic SEO per page
      if (route.startsWith('#/scholarships')) {
        updatePageSEO({
          title: 'Scholarships & Higher Education Portals AY 2026-27',
          description: 'Discover national and state scholarships, grants, and higher education financial aid for students in India.',
          canonicalPath: '/scholarships',
        });
      } else if (route.startsWith('#/internships')) {
        updatePageSEO({
          title: 'Government Internships & Research Fellowships Directory',
          description: 'Verified public sector internships across Central Ministries, NITI Aayog, and AICTE.',
          canonicalPath: '/internships',
        });
      } else if (route.startsWith('#/jobs')) {
        updatePageSEO({
          title: 'Government Jobs & Public Sector Recruitment Directory',
          description: 'Verified central and state government recruitment portals including NCS, SSC, UPSC, and Railways RRB.',
          canonicalPath: '/jobs',
        });
      } else if (route.startsWith('#/documents')) {
        updatePageSEO({
          title: 'Digital Documents, Aadhaar, PAN & DigiLocker Portal',
          description: 'Access official portals for Aadhaar updates, instant e-PAN, driving licences, passports, and DigiLocker documents.',
          canonicalPath: '/documents',
        });
      } else if (route.startsWith('#/states')) {
        updatePageSEO({
          title: '36 State & Union Territory Citizen Services Portals',
          description: 'Directory of official state citizen service portals, MeeSeva, Seva Sindhu, and e-District services across India.',
          canonicalPath: '/states',
        });
      } else if (route.startsWith('#/services')) {
        updatePageSEO({
          title: 'Public Services & Citizen Portals Directory',
          description: 'Search verified government portals, citizen service centers, and public utilities across India.',
          canonicalPath: '/services',
        });
      } else if (route.startsWith('#/schemes')) {
        updatePageSEO({
          title: 'Government Schemes & Citizen Welfare Directory',
          description: 'Search verified central and state government welfare schemes across India.',
          canonicalPath: '/schemes',
        });
      } else if (route.startsWith('#/about')) {
        updatePageSEO({
          title: 'About JanSeva Finder – Independent Civic Directory',
          description: 'Learn about the mission, verification standards, and editorial integrity of JanSeva Finder.',
          canonicalPath: '/about',
        });
      } else if (route.startsWith('#/privacy')) {
        updatePageSEO({
          title: 'Privacy Policy – Zero User Accounts & No PII',
          description: 'JanSeva Finder privacy commitment: no user accounts, no login required, zero tracking of sensitive data.',
          canonicalPath: '/privacy',
        });
      } else if (route.startsWith('#/disclaimer')) {
        updatePageSEO({
          title: 'Disclaimer & Government Non-Affiliation Statement',
          description: 'Important legal disclosure: JanSeva Finder is an independent platform and not endorsed by the Government of India.',
          canonicalPath: '/disclaimer',
        });
      } else if (route.startsWith('#/terms')) {
        updatePageSEO({
          title: 'Terms of Use – JanSeva Finder',
          description: 'Terms of use and public directory policies for JanSeva Finder.',
          canonicalPath: '/terms',
        });
      } else if (route.startsWith('#/contact')) {
        updatePageSEO({
          title: 'Contact & Feedback – JanSeva Finder',
          description: 'Report broken official links or suggest verified public portals.',
          canonicalPath: '/contact',
        });
      } else {
        updatePageSEO({
          title: 'JanSeva Finder – Official Indian Public Services, Schemes & Portals',
          description: 'Search verified government schemes, scholarships, jobs, internships, documents and public services across India from one independent directory.',
          canonicalPath: '/',
        });
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);

    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    const normalized = path.startsWith('#') ? path : `#${path}`;
    window.location.hash = normalized;
    setCurrentHash(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    navigateTo(`#/services/${service.id}`);
  };

  // Route resolver helper
  const renderCurrentView = () => {
    const rawHash = currentHash || '#/';
    const [path, queryString] = rawHash.split('?');
    const params = new URLSearchParams(queryString || '');
    const qParam = params.get('q') || '';
    const catParam = params.get('cat') || '';

    // Service Detail View (routes: #/service/:id or #/services/:id)
    if (
      (path.startsWith('#/service/') || path.startsWith('#/services/')) &&
      selectedService
    ) {
      return (
        <ServiceDetails
          service={selectedService}
          onBack={() => navigateTo('#/services')}
          onSelectRelated={(s) => handleSelectService(s)}
          onNavigate={navigateTo}
        />
      );
    }

    // State specific route: #/states/:state (e.g. #/states/telangana)
    if (path.startsWith('#/states/') && path.length > '#/states/'.length) {
      const stateSlug = path.replace('#/states/', '');
      return (
        <StatesPage
          activeStateSlug={stateSlug}
          onSelectState={(slug) => navigateTo(`#/states/${slug}`)}
          onSelectService={handleSelectService}
          onNavigate={navigateTo}
        />
      );
    }

    // Route matching
    switch (path) {
      case '#/':
      case '#':
      case '':
        return (
          <HomePage
            onNavigate={navigateTo}
            onSelectService={handleSelectService}
          />
        );

      case '#/services':
        return (
          <DirectoryPage
            initialQuery={qParam}
            initialCategory={catParam}
            onSelectService={handleSelectService}
          />
        );

      case '#/schemes':
        return (
          <DirectoryPage
            initialQuery={qParam}
            initialCategory="schemes"
            onSelectService={handleSelectService}
          />
        );

      case '#/scholarships':
        return (
          <StudentsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '#/jobs':
        return (
          <JobsPage
            onSelectService={handleSelectService}
          />
        );

      case '#/internships':
        return (
          <InternshipsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '#/documents':
        return (
          <DocumentsPage
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '#/states':
        return (
          <StatesPage
            onSelectState={(slug) => navigateTo(`#/states/${slug}`)}
            onSelectService={handleSelectService}
            onNavigate={navigateTo}
          />
        );

      case '#/about':
        return <LegalPages pageType="about" />;

      case '#/privacy':
        return <LegalPages pageType="privacy" />;

      case '#/terms':
        return <LegalPages pageType="terms" />;

      case '#/disclaimer':
        return <LegalPages pageType="disclaimer" />;

      case '#/contact':
        return <LegalPages pageType="contact" />;

      case '#/analytics':
        return <AnalyticsPage />;

      default:
        return <NotFoundPage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* High-visibility Disclaimer Banner at the very top */}
      <DisclaimerBanner condensed />

      {/* Header */}
      <Header
        currentPath={currentHash}
        onNavigate={navigateTo}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Dynamic Main Body Content */}
      <main className="flex-1 pb-16 md:pb-0" id="main-content">
        {renderCurrentView()}
      </main>

      {/* Comprehensive Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Mobile-first bottom quick nav for small screens */}
      <MobileNav currentPath={currentHash} onNavigate={navigateTo} />
    </div>
  );
}

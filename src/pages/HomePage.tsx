import React, { useState } from 'react';
import {
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  Compass,
} from 'lucide-react';
import { CATEGORIES } from '../data/categoriesData';
import { SERVICES } from '../data/services';
import { STATES_AND_UTS } from '../data/statesData';
import { ServiceCard } from '../components/ServiceCard';
import { Service } from '../types/service';
import { SearchBar } from '../components/SearchBar';
import { CategoryCard } from '../components/CategoryCard';
import { trackEvent } from '../utils/analytics';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectService: (service: Service) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onSelectService }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackEvent('search', { query: searchQuery.trim() });
      onNavigate(`#/services?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      onNavigate('#/services');
    }
  };

  const handlePopularSelect = (term: string) => {
    trackEvent('search', { query: term });
    onNavigate(`#/services?q=${encodeURIComponent(term)}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    trackEvent('category_open', { target: categoryId });
    if (categoryId === 'scholarships') onNavigate('#/scholarships');
    else if (categoryId === 'jobs') onNavigate('#/jobs');
    else if (categoryId === 'internships') onNavigate('#/internships');
    else if (categoryId === 'documents') onNavigate('#/documents');
    else if (categoryId === 'state-services') onNavigate('#/states');
    else onNavigate(`#/services?cat=${categoryId}`);
  };

  const getCategoryCount = (catId: string) => {
    if (catId === 'state-services') return STATES_AND_UTS.length;
    return SERVICES.filter((s) => s.category === catId).length;
  };

  const featuredServices = SERVICES.filter((s) => s.isPopular).slice(0, 6);
  const recentlyVerified = SERVICES.slice(0, 4);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 rounded-md border border-indigo-100 dark:border-indigo-900/60 mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Independent Citizen Directory · No Login Required · Verified Oct 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display text-balance leading-tight">
          Find Government Services.{' '}
          <span className="text-indigo-600 dark:text-indigo-400">One Simple Search.</span>
        </h1>

        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed text-balance">
          Discover useful government services, schemes, scholarships, jobs, internships and public resources in one place.
        </p>

        {/* Large Search Box */}
        <div className="mt-8">
          <SearchBar
            value={searchQuery}
            onChange={(val) => setSearchQuery(val)}
            onSubmit={handleSearchSubmit}
            showPopularChips
            onPopularSelect={handlePopularSelect}
            placeholder="Search for a service, scheme, scholarship, job or document..."
          />
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Browse by Category
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Explore 12 domains of public services, welfare schemes, digital certificates, and citizen infrastructure.
            </p>
          </div>
          <button
            onClick={() => onNavigate('#/services')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              count={getCategoryCount(category.id)}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>
      </section>

      {/* Featured / Popular Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              Top Public Resources
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Popular Government Portals & Services
            </h2>
          </div>
          <button
            onClick={() => onNavigate('#/services')}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>Explore All 20+ Portals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </section>

      {/* How It Works (Strict 3-step guide) */}
      <section className="bg-slate-100/80 dark:bg-slate-800/40 border-y border-slate-200/80 dark:border-slate-800 py-14 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
              How JanSeva Finder Works
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
              A simple discovery layer bridging citizens to genuine government portals.
              JanSeva Finder does not collect sensitive credentials or process government applications itself.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold font-mono text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                1. Search
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Search for the service, scheme, scholarship, or certificate you need without creating an account or logging in.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold font-mono text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                2. Compare Information
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Read plain-language eligibility, required documents, fee structures, and application guidelines in one structured view.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 relative">
              <div className="w-9 h-9 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold font-mono text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                3. Visit Official Website
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Use verified official links to open the genuine government portal (.gov.in / .nic.in) in a new tab to complete your actual submission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links: Popular Official Portals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
            Direct Access: Official Apex Portals
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real government portals. Opens directly in a new browser tab.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { name: 'India.gov.in', desc: 'National Portal of India', url: 'https://www.india.gov.in/' },
            { name: 'UMANG', desc: '1,700+ e-Gov Services', url: 'https://web.umang.gov.in/' },
            { name: 'DigiLocker', desc: 'Paperless Digital Documents', url: 'https://www.digilocker.gov.in/' },
            { name: 'National Scholarship Portal', desc: 'Central & State Scholarships', url: 'https://scholarships.gov.in/' },
            { name: 'National Career Service', desc: 'Employment & Government Jobs', url: 'https://www.ncs.gov.in/' },
            { name: 'myScheme', desc: 'Government Scheme Discovery', url: 'https://www.myscheme.gov.in/' },
            { name: 'Skill India Digital', desc: 'Vocational Training & PMKVY', url: 'https://www.skillindiadigital.gov.in/' },
            { name: 'Parivahan Sewa', desc: 'Driving Licence & RC Portal', url: 'https://parivahan.gov.in/' },
          ].map((portal) => (
            <a
              key={portal.url}
              href={portal.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('official_link_click', { target: `${portal.name} QuickLink` })}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-slate-400 mb-1.5">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="font-semibold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {portal.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                  {portal.desc}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Recruitment Warning */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl p-5 text-slate-800 dark:text-slate-200">
          <div className="flex items-start gap-3">
            <div className="text-rose-600 dark:text-rose-400 mt-0.5 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="text-sm font-bold text-rose-900 dark:text-rose-300">
                Official Recruitment Safety Warning
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>Never pay money to someone claiming they can guarantee a government job.</strong> Recruitment in Union and State Government services (such as UPSC, SSC, Railways RRB, Banking IBPS, and State PSCs) is conducted solely via competitive examinations and official notifications. Always verify recruitment notices directly on official government websites (.gov.in or .nic.in).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Verified Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
              Directory Freshness
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
              Recently Verified Resources
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Audited against official government gazettes and ministry portals.
            </p>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Audited: October 2026
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyVerified.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="p-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified October 2026</span>
                </div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 mb-1">
                  {service.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {service.shortDescription || service.description}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                <span>View guidelines</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

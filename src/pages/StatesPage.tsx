import React, { useState, useMemo } from 'react';
import {
  Search,
  ExternalLink,
  MapPin,
  PhoneCall,
  ShieldCheck,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { STATES_AND_UTS } from '../data/statesData';
import { SERVICES } from '../data/services';
import { Service } from '../types/service';
import { trackEvent } from '../utils/analytics';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { OfficialButton } from '../components/OfficialButton';
import { ServiceCard } from '../components/ServiceCard';

interface StatesPageProps {
  activeStateSlug?: string;
  onSelectState?: (stateSlug: string) => void;
  onSelectService?: (service: Service) => void;
  onNavigate?: (path: string) => void;
}

export const StatesPage: React.FC<StatesPageProps> = ({
  activeStateSlug,
  onSelectState,
  onSelectService,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'State' | 'Union Territory'>('All');

  const slugify = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const activeState = useMemo(() => {
    if (!activeStateSlug) return null;
    const cleanSlug = activeStateSlug.toLowerCase();
    return STATES_AND_UTS.find(
      (s) => slugify(s.name) === cleanSlug || s.code.toLowerCase() === cleanSlug
    );
  }, [activeStateSlug]);

  const filteredStates = useMemo(() => {
    return STATES_AND_UTS.filter((item) => {
      if (filterType !== 'All' && item.type !== filterType) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.citizenPortalName.toLowerCase().includes(q) ||
          item.capital.toLowerCase().includes(q) ||
          item.keyServices.some((k) => k.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, filterType]);

  const handleStateClick = (stateName: string) => {
    const slug = slugify(stateName);
    if (onSelectState) {
      onSelectState(slug);
    } else if (onNavigate) {
      onNavigate(`/states/${slug}`);
    }
  };

  // State-specific services
  const stateServices = useMemo(() => {
    if (!activeState) return [];
    return SERVICES.filter(
      (s) =>
        s.state === activeState.name ||
        s.state === 'All India' ||
        (s.keywords || s.tags || []).some((k) => k.toLowerCase().includes(activeState.name.toLowerCase()))
    );
  }, [activeState]);

  // SINGLE STATE DETAIL VIEW
  if (activeState) {
    const breadcrumbs = [
      { label: 'State Services', path: '/states' },
      { label: activeState.name },
    ];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        {/* Back Button */}
        <div>
          <a
            href="/states"
            onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate('/states');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View All 36 States & UTs</span>
          </a>
        </div>

        {/* State Banner Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-sky-600 dark:text-sky-400">
              {activeState.type} · Capital: {activeState.capital}
            </span>
            <span className="font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-700 dark:text-slate-300">
              {activeState.code}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            {activeState.name} Public Services & Portals
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {activeState.description}
          </p>

          <div className="bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/80 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold text-sky-900 dark:text-sky-300 uppercase tracking-wider mb-1">
                Official Designated Citizen Portal
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white font-display">
                {activeState.citizenPortalName}
              </div>
              {activeState.helpline && (
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 mt-1">
                  <PhoneCall className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Citizen Helpline: <strong className="font-mono text-slate-800 dark:text-slate-200">{activeState.helpline}</strong></span>
                </div>
              )}
            </div>

            <OfficialButton
              url={activeState.officialPortalUrl}
              serviceName={`${activeState.name} - ${activeState.citizenPortalName}`}
              size="md"
              label={`Open ${activeState.citizenPortalName} →`}
            />
          </div>

          {/* Key Available Services in State */}
          <div className="pt-2">
            <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Statutory Online Certificates & Applications Available:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {activeState.keyServices.map((svc, i) => (
                <div
                  key={i}
                  className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 p-2.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{svc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relevant Public Resources for this state */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Public Resources & Schemes for Residents of {activeState.name}
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {stateServices.length} Resources
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {stateServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={(svc) => onSelectService && onSelectService(svc)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ALL STATES DIRECTORY VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Directory', path: '/services' }, { label: 'State Services' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1 text-xs font-semibold text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 rounded px-2.5 py-1 mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Pan-India Decentralized E-Governance</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          State & Union Territory Services
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Select any state or union territory to access its verified citizen service portal (MeeSeva, Seva Sindhu, Aaple Sarkar, e-District), certified local certificates, and welfare resources.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search state name, capital, or portal (e.g. Telangana, MeeSeva, UP)..."
            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-900 dark:text-white"
          />
        </div>

        {/* Filter Segment */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-medium">
          {(['All', 'State', 'Union Territory'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                filterType === type
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {type === 'All' ? 'All (36)' : type === 'State' ? 'States (28)' : 'UTs (8)'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of States */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStates.map((st) => {
          const stateSlug = st.name.toLowerCase().replace(/\s+/g, '-');
          return (
            <a
              key={st.code}
              href={`/states/${stateSlug}`}
              onClick={(e) => {
                e.preventDefault();
                handleStateClick(st.name);
              }}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group text-left no-underline"
            >
              <div>
                {/* Header line */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    {st.type} · Capital: {st.capital}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                    {st.code}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                  {st.name}
                </h2>

                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                  {st.citizenPortalName}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-2">
                  {st.description}
                </p>

                {/* Key Services List */}
                <div className="mb-4">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Available Online Certificates:
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    {st.keyServices.slice(0, 3).map((svc, i) => (
                      <li key={i} className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                        <span className="truncate">{svc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                {st.helpline && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <PhoneCall className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Helpline: <strong className="font-mono text-slate-700 dark:text-slate-200">{st.helpline}</strong></span>
                  </div>
                )}

                <div className="pt-1 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline flex items-center gap-1">
                    <span>Explore Resources</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>

                  <OfficialButton
                    url={st.officialPortalUrl}
                    serviceName={`${st.name} Portal`}
                    size="sm"
                  label="Official Portal"
                />
              </div>
            </div>
          </a>
        );
      })}
      </div>

      {filteredStates.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
          <p className="text-sm text-slate-500">No state or territory matched “{search}”.</p>
          <button
            onClick={() => { setSearch(''); setFilterType('All'); }}
            className="mt-3 text-xs font-semibold text-indigo-600 hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

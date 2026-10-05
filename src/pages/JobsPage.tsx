import React, { useState } from 'react';
import {
  Briefcase,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Search,
  Building,
  GraduationCap,
  MapPin,
  Calendar,
} from 'lucide-react';
import { VERIFIED_SERVICES } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types/service';
import { trackEvent } from '../utils/analytics';

interface Props {
  onSelectService: (service: ServiceItem) => void;
  onNavigate?: (path: string) => void;
}

export const JobsPage: React.FC<Props> = ({ onSelectService, onNavigate }) => {
  const [filterType, setFilterType] = useState<'All' | 'Apex' | 'Defence' | 'Railways'>('All');

  const jobServices = VERIFIED_SERVICES.filter(
    (s) => s.category === 'jobs' || (s.tags && s.tags.includes('recruitment')) || (s.keywords && s.keywords.includes('recruitment'))
  );

  const officialRecruitmentPortals = [
    {
      title: 'National Career Service (NCS)',
      department: 'Ministry of Labour & Employment',
      qualification: '8th Pass to PhD (All Disciplines)',
      location: 'All India & Overseas',
      cycle: 'Continuous Year-Round Openings',
      url: 'https://www.ncs.gov.in/',
      description: 'Apex national employment directory listing central and state government vacancies, public sector undertakings (PSUs), and certified career counselors.',
    },
    {
      title: 'Staff Selection Commission (SSC)',
      department: 'Department of Personnel & Training (DoPT)',
      qualification: '10th (MTS), 12th (CHSL), Degree (CGL/CPO/JE)',
      location: 'Central Ministries Across India',
      cycle: 'Annual Calendar (CGL, CHSL, MTS, GD)',
      url: 'https://ssc.gov.in/',
      description: 'Conducts examinations for recruitment to Group B (Non-Gazetted) and Group C (Non-Technical) posts in Government of India ministries and subordinate offices.',
    },
    {
      title: 'Union Public Service Commission (UPSC)',
      department: 'Constitutional Body (Article 315)',
      qualification: 'Bachelor\'s Degree in Any Discipline',
      location: 'All India Services (Cadre Allocation)',
      cycle: 'Civil Services, CDS, NDA, CAPF',
      url: 'https://upsconline.nic.in/',
      description: 'Conducts prestigious constitutional examinations including Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), and Defence.',
    },
    {
      title: 'Railway Recruitment Boards (RRB)',
      department: 'Ministry of Railways',
      qualification: '10th / ITI / Diploma / Degree',
      location: '21 Regional Railway Zones Nationwide',
      cycle: 'CEN Notices (NTPC, ALP, Group D, JE)',
      url: 'https://www.rrbapply.gov.in/',
      description: 'Single-window computer-based testing portal for Non-Technical Popular Categories, Assistant Loco Pilots, Technicians, and Level-1 Indian Railway operations.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Directory', path: '/services' }, { label: 'Government Jobs' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded px-2.5 py-1 mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Verified Central & State Public Employment</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Government Jobs & Recruitment Directory
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Authoritative portal to genuine government recruitments, civil services, railways, and public sector employment notifications in India.
        </p>
      </div>

      {/* Mandatory Prominent Recruitment Fraud Warning Banner */}
      <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 sm:p-7 text-slate-900 dark:text-slate-100 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 dark:bg-red-950/60 rounded-xl text-red-600 dark:text-red-400 shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-red-900 dark:text-red-300">
              Important Public Warning on Government Recruitment
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              <strong>Always verify recruitment information through the official source. Never pay anyone who promises to guarantee a government job.</strong> Government appointments are made strictly on merit through competitive examinations and transparent interview processes conducted by statutory bodies like UPSC, SSC, RRB, and State PSCs.
            </p>
            <div className="text-xs text-slate-600 dark:text-slate-400 pt-1">
              Verify recruitment notifications and submit applications solely through genuine domains ending in <strong className="font-mono text-slate-900 dark:text-white">.gov.in</strong> or <strong className="font-mono text-slate-900 dark:text-white">.nic.in</strong>. Report fraud immediately to National Cyber Crime Reporting Portal (cybercrime.gov.in) or call helpline 1930.
            </div>
          </div>
        </div>
      </div>

      {/* Verified Recruitment Apex Portals (Table / Detailed Grid) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
            Apex Government Recruiting Agencies
          </h2>
          <span className="text-xs text-slate-400 font-mono">Real Official Portals</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {officialRecruitmentPortals.map((portal) => (
            <div
              key={portal.title}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">{portal.department}</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Verified Oct 2026</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                  {portal.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {portal.description}
                </p>

                {/* Pill-Free Metadata Grid */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong className="text-slate-500 dark:text-slate-400">Eligibility:</strong> {portal.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong className="text-slate-500 dark:text-slate-400">Jurisdiction:</strong> {portal.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong className="text-slate-500 dark:text-slate-400">Schedule:</strong> {portal.cycle}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">Domain: {new URL(portal.url).hostname}</span>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('official_link_click', { target: `Recruitment: ${portal.title}` })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Employment Services in Directory */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          All Employment & Career Portals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={onSelectService}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

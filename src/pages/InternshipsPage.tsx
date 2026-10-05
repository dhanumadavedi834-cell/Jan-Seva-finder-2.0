import React, { useState } from 'react';
import {
  Rocket,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  GraduationCap,
  MapPin,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Service } from '../types/service';
import { SERVICES } from '../data/services';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { OfficialButton } from '../components/OfficialButton';

interface InternshipsPageProps {
  onSelectService: (service: Service) => void;
  onNavigate: (path: string) => void;
}

export interface VerifiedInternship {
  id: string;
  name: string;
  organization: string;
  eligibility: string;
  location: string;
  deadline: string;
  officialUrl: string;
  stipend: string;
  description: string;
  lastVerified: string;
}

export const VERIFIED_INTERNSHIPS: VerifiedInternship[] = [
  {
    id: 'aicte-internship-portal',
    name: 'AICTE & TULIP Government Internship Portal',
    organization: 'All India Council for Technical Education & MoHUA',
    eligibility: 'B.Tech / B.E / B.Arch / B.Plan / Degree / Diploma students & fresh graduates',
    location: 'Urban Local Bodies & Smart Cities Nationwide',
    deadline: 'Rolling Intake (Year-Round)',
    officialUrl: 'https://internship.aicte-india.org/',
    stipend: '₹5,000 – ₹20,000 / month (varies by municipality)',
    description: 'Unified national internship portal hosting municipal corporation projects (TULIP), smart city missions, NHAI, and central ministry technical assignments.',
    lastVerified: '2026-10-03',
  },
  {
    id: 'niti-aayog-internship',
    name: 'NITI Aayog Official Internship Scheme',
    organization: 'NITI Aayog (National Institution for Transforming India)',
    eligibility: 'Undergraduate (min 85% in 12th) & Postgraduate/Research scholars (min 70% in degree)',
    location: 'New Delhi (NITI Bhawan) / Remote Policy Wings',
    deadline: '1st to 10th of every calendar month',
    officialUrl: 'https://www.niti.gov.in/internship',
    stipend: 'Unpaid policy training (Official Government of India Experience Certificate)',
    description: 'Work directly with vertical advisory divisions including Public Health, Green Energy, AI Governance, Agriculture, and Infrastructure.',
    lastVerified: '2026-10-03',
  },
  {
    id: 'mea-internship-programme',
    name: 'Ministry of External Affairs (MEA) Internship',
    organization: 'Ministry of External Affairs, Government of India',
    eligibility: 'Graduate degree or final-year students of recognized universities (Max age 25 years)',
    location: 'New Delhi (Jawaharlal Nehru Bhawan)',
    deadline: 'Two terms per year (April–Sept & Oct–March)',
    officialUrl: 'https://internship.mea.gov.in/',
    stipend: '₹10,000 / month honorarium + airfare conveyance',
    description: 'Hands-on exposure to foreign policy, diplomatic missions, bilateral agreements, and multilateral forums like the United Nations and G20.',
    lastVerified: '2026-10-03',
  },
  {
    id: 'digital-india-internship',
    name: 'Digital India Internship Scheme',
    organization: 'Ministry of Electronics & Information Technology (MeitY)',
    eligibility: 'B.E. / B.Tech / M.E. / M.Tech / MCA / M.Sc (Computer Science / IT / Electronics) with min 60%',
    location: 'Electronics Niketan, New Delhi',
    deadline: 'Summer (May–July) & Winter (Dec–Jan) Cycles',
    officialUrl: 'https://www.meity.gov.in/digital-india-internship-scheme',
    stipend: '₹10,000 / month stipend',
    description: 'Engage in sovereign digital initiatives, cyber security frameworks, semiconductor missions, and AI governance policies under MeitY mentors.',
    lastVerified: '2026-10-03',
  },
  {
    id: 'rbi-summer-internship',
    name: 'Reserve Bank of India (RBI) Summer Placement',
    organization: 'Reserve Bank of India (Central Bank)',
    eligibility: 'Students pursuing Post-Graduation in Economics, Finance, MBA, Law, or 5-year Integrated Law',
    location: 'RBI Central Office (Mumbai) & Regional Offices',
    deadline: 'Annual October–December Window',
    officialUrl: 'https://opportunities.rbi.org.in/',
    stipend: '₹20,000 / month stipend',
    description: 'Premier central banking internship focusing on monetary policy analysis, banking supervision, financial technology, and economic research.',
    lastVerified: '2026-10-03',
  },
];

export const InternshipsPage: React.FC<InternshipsPageProps> = ({
  onSelectService,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');

  const filteredInternships = VERIFIED_INTERNSHIPS.filter((item) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.organization.toLowerCase().includes(q) ||
      item.eligibility.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Directory', path: '/services' }, { label: 'Government Internships' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 rounded px-2.5 py-1 mb-2">
          <Rocket className="w-3.5 h-3.5" />
          <span>Verified Public Sector & Ministry Internships</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Government Internships Directory
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Official internships across Central Ministries, NITI Aayog, AICTE, RBI, and municipal corporations. Gain recognized civic experience, stipends, and government certifications.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search internship by ministry, skill, or location..."
          className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-900 dark:text-white"
        />
      </div>

      {/* Verified Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredInternships.map((internship) => {
          const serviceMatch = SERVICES.find((s) => s.id === internship.id);
          return (
            <div
              key={internship.id}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {internship.organization}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Verified {internship.lastVerified}
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                  {internship.name}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {internship.description}
                </p>

                {/* Structured Metadata Box */}
                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800 mb-4">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong className="text-slate-500 dark:text-slate-400">Eligibility:</strong> {internship.eligibility}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong className="text-slate-500 dark:text-slate-400">Location:</strong> {internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span><strong className="text-slate-500 dark:text-slate-400">Application Cycle:</strong> {internship.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-semibold pt-0.5">
                    <span>Stipend: {internship.stipend}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                {serviceMatch && (
                  <button
                    onClick={() => onSelectService(serviceMatch)}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View Full Details
                  </button>
                )}

                <OfficialButton
                  url={internship.officialUrl}
                  serviceName={internship.name}
                  size="sm"
                  label="Apply on Official Portal →"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

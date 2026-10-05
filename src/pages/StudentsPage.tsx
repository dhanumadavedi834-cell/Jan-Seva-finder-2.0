import React, { useState } from 'react';
import {
  GraduationCap,
  Rocket,
  Wrench,
  BookOpen,
  Landmark,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Search,
  MapPin,
} from 'lucide-react';
import { SERVICES } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { Service } from '../types/service';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { OfficialButton } from '../components/OfficialButton';
import { trackEvent } from '../utils/analytics';

interface StudentsPageProps {
  onSelectService: (service: Service) => void;
  onNavigate: (path: string) => void;
}

export interface VerifiedScholarship {
  id: string;
  name: string;
  eligibility: string;
  state: string;
  educationLevel: string;
  officialWebsite: string;
  deadline: string;
  lastVerified: string;
  description: string;
}

export const VERIFIED_SCHOLARSHIPS: VerifiedScholarship[] = [
  {
    id: 'national-scholarship-portal',
    name: 'National Scholarship Portal (Central Sector Schemes)',
    eligibility: 'Merit-based & low income (< ₹2.5–₹8 Lakh/year depending on ministry scheme)',
    state: 'All India',
    educationLevel: 'Pre-Matric, Post-Matric, College & University Undergrad/Postgrad',
    officialWebsite: 'https://scholarships.gov.in/',
    deadline: 'Active for Academic Year 2026–27',
    lastVerified: 'October 2026',
    description: 'Direct Benefit Transfer (DBT) scholarships sponsored by Ministry of Minority Affairs, Social Justice, Tribal Affairs, and Higher Education.',
  },
  {
    id: 'pm-yasasvi-scholarship',
    name: 'PM YASASVI Scheme for OBC, EBC & DNT Students',
    eligibility: 'OBC/EBC/DNT students with annual family income not exceeding ₹2.5 Lakh',
    state: 'All India',
    educationLevel: 'Classes 9, 10, 11, 12 and Top-Class College Education',
    officialWebsite: 'https://yet.nta.ac.in/',
    deadline: 'Annual NTA Test / Merit Allocation Cycle',
    lastVerified: 'October 2026',
    description: 'National Testing Agency scholarship award offering up to ₹1,25,000/year for school and college fees.',
  },
  {
    id: 'aicte-pragati-saksham',
    name: 'AICTE Pragati & Saksham Scholarships',
    eligibility: 'Girl students (Pragati) and differently-abled students (Saksham) admitted to AICTE approved technical programs',
    state: 'All India',
    educationLevel: 'Technical Diploma & Degree (Engineering, Technology, Pharmacy)',
    officialWebsite: 'https://www.aicte-pragati-saksham-gov.in/',
    deadline: 'Annual Intake aligned with AICTE admissions',
    lastVerified: 'October 2026',
    description: 'Financial grant of ₹50,000 per annum towards tuition fee, computer purchase, books, and stationeries.',
  },
  {
    id: 'central-sector-scheme-csss',
    name: 'Central Sector Scheme of Scholarship for College and University Students (CSSS)',
    eligibility: 'Students above 80th percentile in Class 12 board exams with family income below ₹4.5 Lakh',
    state: 'All India',
    educationLevel: 'Undergraduate (3 years) & Postgraduate (2 years) regular degrees',
    officialWebsite: 'https://scholarships.gov.in/',
    deadline: 'Integrated on National Scholarship Portal',
    lastVerified: 'October 2026',
    description: 'Ministry of Education grant: ₹12,000/year for undergraduate study and ₹20,000/year for postgraduate education.',
  },
  {
    id: 'begum-hazrat-mahal-scholarship',
    name: 'Begum Hazrat Mahal National Scholarship',
    eligibility: 'Meritorious girl students belonging to 6 notified minority communities (income below ₹2 Lakh)',
    state: 'All India',
    educationLevel: 'Classes 9 to 12 in recognized schools',
    officialWebsite: 'https://scholarships.gov.in/',
    deadline: 'Managed via NSP National Portal',
    lastVerified: 'October 2026',
    description: 'Disbursed by Maulana Azad Education Foundation for female minority students.',
  },
];

export const StudentsPage: React.FC<StudentsPageProps> = ({
  onSelectService,
  onNavigate,
}) => {
  const [scholarshipSearch, setScholarshipSearch] = useState('');

  const filteredScholarships = VERIFIED_SCHOLARSHIPS.filter((s) => {
    if (!scholarshipSearch.trim()) return true;
    const q = scholarshipSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.educationLevel.toLowerCase().includes(q) ||
      s.eligibility.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q)
    );
  });

  const nspService = SERVICES.find((s) => s.id === 'national-scholarship-portal');

  const studentServices = SERVICES.filter(
    (s) =>
      s.audience.includes('Students') ||
      s.category === 'scholarships' ||
      s.category === 'education'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Directory', path: '/services' }, { label: 'Government Scholarships' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded px-2.5 py-1 mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Higher Education & National Financial Grants</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
            Government Scholarships & Student Portals
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Verified scholarships, DBT educational grants, and higher education portals for students across India. Public information for Academic Year 2026–27.
          </p>
        </div>

        <a
          href="/internships"
          onClick={(e) => {
            e.preventDefault();
            onNavigate && onNavigate('/internships');
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 rounded-xl text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <Rocket className="w-3.5 h-3.5" />
          <span>Explore Government Internships →</span>
        </a>
      </div>

      {/* Spotlight: NSP AY 2026-27 */}
      {nspService && (
        <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-md border border-blue-800/40">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 rounded px-2.5 py-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Academic Year 2026–27 Active Applications</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display">
              National Scholarship Portal (NSP)
            </h2>

            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              The National Scholarship Portal currently provides public information and scholarship-related application services for the 2026–27 academic year. Students can apply for pre-matric, post-matric, merit-cum-means, and top-class college scholarships across multiple central ministries.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <OfficialButton
                url={nspService.officialUrl}
                serviceName="National Scholarship Portal (scholarships.gov.in)"
                size="md"
                label="Open scholarships.gov.in →"
                className="!bg-white !text-blue-950 hover:!bg-blue-50"
              />

              <button
                onClick={() => onSelectService(nspService)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-blue-800/60 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors border border-blue-700/60"
              >
                <span>View Requirements & Documents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Input for Scholarships */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={scholarshipSearch}
            onChange={(e) => setScholarshipSearch(e.target.value)}
            placeholder="Search scholarship by course, merit, or category..."
            className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-900 dark:text-white"
          />
        </div>

        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          Showing {filteredScholarships.length} Verified Scholarships
        </div>
      </div>

      {/* Dedicated Section 14 Schema Cards for Scholarships */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredScholarships.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {item.educationLevel}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Verified {item.lastVerified}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display mb-2">
                {item.name}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Exact Metadata Grid Required in Section 14 */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 text-xs space-y-1.5 border border-slate-100 dark:border-slate-800 mb-4">
                <div className="flex items-start gap-2 text-slate-700 dark:text-slate-200">
                  <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span><strong className="text-slate-500 dark:text-slate-400">Eligibility:</strong> {item.eligibility}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong className="text-slate-500 dark:text-slate-400">State:</strong> {item.state}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span><strong className="text-slate-500 dark:text-slate-400">Application Window:</strong> {item.deadline}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono truncate max-w-[140px] sm:max-w-xs">
                {item.officialWebsite}
              </span>

              <OfficialButton
                url={item.officialWebsite}
                serviceName={item.name}
                size="sm"
                label="Official Portal →"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Directory Cards for Student Services */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          All Student Schemes & University Portals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studentServices.map((service) => (
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

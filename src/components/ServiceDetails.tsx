import React, { useState } from 'react';
import {
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Clock,
  Banknote,
  Calendar,
  Share2,
  Check,
  Building2,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  HelpCircle,
} from 'lucide-react';
import { Service } from '../types/service';
import { SERVICES } from '../data/services';
import { Breadcrumbs } from './Breadcrumbs';
import { OfficialButton } from './OfficialButton';

interface ServiceDetailsProps {
  service: Service;
  onBack: () => void;
  onSelectRelated: (service: Service) => void;
  onNavigate?: (path: string) => void;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({
  service,
  onBack,
  onSelectRelated,
  onNavigate,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const url = `${window.location.origin}/services/${service.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const relatedServices = SERVICES.filter(
    (s) => s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  const breadcrumbs = [
    { label: 'Directory', path: '/services' },
    { label: service.categoryLabel || service.category, path: `/services?cat=${service.category}` },
    { label: service.name },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Bar with Breadcrumbs & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
        <Breadcrumbs items={breadcrumbs} onNavigate={onNavigate} />

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 py-1.5 px-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Results</span>
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Service</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
        {/* Unboxed Metadata Line */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-indigo-700 dark:text-indigo-400">
            {service.categoryLabel || service.category}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span>Jurisdiction: {service.state}</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified {service.lastVerified.startsWith('2026') ? 'October 2026' : service.lastVerified}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white font-display leading-tight">
          {service.name}
        </h1>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Department / Authority: <strong className="font-medium text-slate-900 dark:text-white">{service.department}</strong></span>
        </div>

        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
          {service.detailedDescription || service.description}
        </p>

        {/* Quick Facts Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <Banknote className="w-3.5 h-3.5 text-indigo-500" />
              <span>Official Fees</span>
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              {service.fees || 'Free of cost / Standard portal charges'}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Processing Timeline</span>
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              {service.processingTime || 'Varies by application type & verification'}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              <span>Important Dates</span>
            </div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">
              {service.importantDates || 'Continuous Online Service'}
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Verified Official Government Domain (.gov.in / .nic.in)</span>
          </div>

          <OfficialButton
            url={service.officialUrl}
            serviceName={service.name}
            size="md"
          />
        </div>
      </div>

      {/* Middle Grid: Eligibility & Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Eligibility Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2>Who Can Use It & Eligibility</h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {service.eligibility && service.eligibility.length > 0 ? (
              service.eligibility.map((criterion, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{criterion}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500">
                Open to eligible Indian citizens meeting respective departmental guidelines. Verify criteria on official website.
              </li>
            )}
          </ul>
        </section>

        {/* Required Documents Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2>Required Documents & Requirements</h2>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            {service.requiredDocuments && service.requiredDocuments.length > 0 ? (
              service.requiredDocuments.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{doc}</span>
                </li>
              ))
            ) : (
              <li className="text-slate-500">
                Standard identification documents (Aadhaar, address proof, photograph). Please verify exact list on the official portal.
              </li>
            )}
          </ul>
        </section>
      </div>

      {/* Application Process Steps */}
      {service.applicationSteps && service.applicationSteps.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
              Step-by-Step Official Application Process
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Follow these official guidelines when submitting your application on the official portal.
            </p>
          </div>

          <ol className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            {service.applicationSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Official Helpline / Support */}
      {service.helpline && (
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <PhoneCall className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white">Official Support & Helpline:</span>{' '}
              <span className="text-slate-600 dark:text-slate-300 font-mono">{service.helpline}</span>
            </div>
          </div>
          <span className="text-[11px] text-slate-400">Department Assisted</span>
        </div>
      )}

      {/* Frequently Asked Questions */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-display text-lg font-bold text-slate-900 dark:text-white">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2>Important Questions & Answers</h2>
          </div>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white mb-1">
                  {faq.question}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Security & Anti-Fraud Advisory */}
      <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-5 text-xs text-slate-800 dark:text-slate-200 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Security & Anti-Fraud Advisory</span>
        </div>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          Never share confidential OTPs, passwords, Aadhaar numbers, or bank PINs on third-party websites or with agents.
          JanSeva Finder does not ask for or store sensitive credentials.
          Always confirm URL ends with <strong className="font-mono text-slate-900 dark:text-white">.gov.in</strong> or <strong className="font-mono text-slate-900 dark:text-white">.nic.in</strong> before entering personal details.
        </p>
      </div>

      {/* Bottom Official Website CTA Container (Exact Prompt Specification) */}
      <section className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-md">
        <h3 className="text-xl sm:text-2xl font-bold font-display">
          Official Website
        </h3>
        <p className="text-xs sm:text-sm text-indigo-100 max-w-xl mx-auto leading-relaxed font-medium">
          Always verify the latest information on the official government website before applying.
        </p>

        <div className="pt-2">
          <OfficialButton
            url={service.officialUrl}
            serviceName={service.name}
            size="lg"
            label="Visit Official Website →"
            className="!bg-white !text-indigo-950 hover:!bg-indigo-50 active:!bg-slate-200"
          />
        </div>

        <div className="text-[11px] text-indigo-300 font-mono pt-1">
          Target URL: {service.officialUrl}
        </div>
      </section>

      {/* Related Services in the Same Category */}
      {relatedServices.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
              Related {service.categoryLabel || service.category} Resources
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedServices.map((rel) => (
              <a
                key={rel.id}
                href={`/services/${rel.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectRelated(rel);
                }}
                className="p-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between text-left no-underline group"
              >
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {rel.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {rel.shortDescription || rel.description}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

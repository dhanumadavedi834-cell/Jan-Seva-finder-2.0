import React from 'react';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Lock,
  Smartphone,
  Award,
  Layers,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import { VERIFIED_SERVICES } from '../data/servicesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceItem } from '../types/service';
import { trackEvent } from '../utils/analytics';

interface Props {
  onSelectService: (service: ServiceItem) => void;
  onNavigate: (path: string) => void;
}

export const DocumentsPage: React.FC<Props> = ({ onSelectService, onNavigate }) => {
  const docServices = VERIFIED_SERVICES.filter(
    (s) => s.category === 'documents' || s.category === 'transport'
  );

  const digilockerService = VERIFIED_SERVICES.find((s) => s.id === 'digilocker');

  const essentialDocuments = [
    {
      name: 'Aadhaar Card (UIDAI)',
      desc: '12-digit biometric identity card. Download e-Aadhaar, order durable PVC card, and lock biometrics online.',
      serviceId: 'uidai-myaadhaar',
      officialUrl: 'https://myaadhaar.uidai.gov.in/',
    },
    {
      name: 'Permanent Account Number (PAN)',
      desc: '10-character financial alphanumeric identifier. Get instant digital e-PAN in 10 minutes via Aadhaar OTP.',
      serviceId: 'income-tax-pan',
      officialUrl: 'https://www.incometax.gov.in/iec/fposervices/',
    },
    {
      name: 'Driving Licence & Vehicle RC',
      desc: 'Contactless Learner Licence and Driving Licence issuance via Aadhaar e-KYC on Sarathi Parivahan.',
      serviceId: 'parivahan-sewa',
      officialUrl: 'https://parivahan.gov.in/',
    },
    {
      name: 'Passport (Passport Seva)',
      desc: 'Ministry of External Affairs official portal for ordinary, official passports and Police Clearance (PCC).',
      serviceId: 'passport-seva',
      officialUrl: 'https://www.passportindia.gov.in/',
    },
    {
      name: 'Birth & Death Certificates',
      desc: 'Statutory civil registrations through Office of Registrar General of India (CRS) and state urban bodies.',
      serviceId: 'crs-birth-death-certificates',
      officialUrl: 'https://crsorgi.gov.in/',
    },
    {
      name: 'Caste, Income & Domicile Certificates',
      desc: 'State government revenue certificates for academic reservations, scholarships, and government subsidies.',
      actionPath: '/states',
      officialUrl: 'https://www.india.gov.in/my-government/services',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[{ label: 'Directory', path: '/services' }, { label: 'Government Documents & Certificates' }]}
        onNavigate={onNavigate}
      />

      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 rounded px-2.5 py-1 mb-2">
          <FileText className="w-3.5 h-3.5" />
          <span>Statutory Identity & Digital Document Infrastructure</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Government Documents & Certificates
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Access official application and verification portals for Aadhaar, PAN, Driving Licence, Passport, Birth Certificates, and state-issued Caste, Income, and Domicile documents.
        </p>
      </div>

      {/* DigiLocker Spotlight Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-lg border border-indigo-800/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded px-2.5 py-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Legally Valid Under Rule 9A of IT Act 2000</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold font-display">
            DigiLocker: Your Official Paperless Document Wallet
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            DigiLocker is a flagship initiative of the Ministry of Electronics & IT (MeitY) under the Digital India programme. Electronic documents issued into your DigiLocker account (such as Driving Licences, Vehicle Registration Certificates, Insurance policies, and CBSE Marksheets) are treated <strong className="text-white">on par with original physical documents</strong> by law.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="bg-white/10 rounded-lg p-3 border border-white/10">
              <div className="font-semibold text-white mb-0.5">1 GB Cloud Storage</div>
              <div className="text-slate-300 text-[11px]">Free, secure, and Aadhaar-linked for every Indian citizen.</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/10">
              <div className="font-semibold text-white mb-0.5">Accepted by Traffic Police</div>
              <div className="text-slate-300 text-[11px]">Valid across all states under MoRTH official notifications.</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border border-white/10">
              <div className="font-semibold text-white mb-0.5">3,000+ Issuers</div>
              <div className="text-slate-300 text-[11px]">Direct electronic fetch from universities, boards, and ministries.</div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href="https://www.digilocker.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('official_link_click', { target: 'DigiLocker Spotlight' })}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-950 font-bold text-xs sm:text-sm rounded-xl hover:bg-slate-100 transition-colors shadow-sm"
            >
              <span>Open digilocker.gov.in</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {digilockerService && (
              <button
                onClick={() => onSelectService(digilockerService)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors border border-white/20"
              >
                <span>Read Full DigiLocker Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Essential Certificates Directory */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          Core Indian Identity & Public Certificates
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {essentialDocuments.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                  {doc.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {doc.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {doc.serviceId ? (
                  <button
                    onClick={() => {
                      const svc = VERIFIED_SERVICES.find((s) => s.id === doc.serviceId);
                      if (svc) onSelectService(svc);
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    View Guidelines
                  </button>
                ) : (
                  <a
                    href="/states"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/states');
                    }}
                    className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Select State Portal
                  </a>
                )}

                <a
                  href={doc.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('official_link_click', { target: `Document: ${doc.name}` })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-lg shadow-sm transition-colors whitespace-nowrap"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Document Services in Directory */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-display">
          All Verified Document & Transport Portals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {docServices.map((service) => (
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

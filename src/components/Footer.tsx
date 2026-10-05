import React from 'react';
import { ExternalLink, ShieldCheck, HeartHandshake, FileCheck, HelpCircle } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  const handleNav = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const officialPortals = [
    { name: 'India.gov.in (National Portal)', url: 'https://www.india.gov.in/' },
    { name: 'UMANG (Unified e-Gov Services)', url: 'https://web.umang.gov.in/' },
    { name: 'DigiLocker (Digital Wallet)', url: 'https://www.digilocker.gov.in/' },
    { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in/' },
    { name: 'National Career Service (Jobs)', url: 'https://www.ncs.gov.in/' },
    { name: 'myScheme (Scheme Discovery)', url: 'https://www.myscheme.gov.in/' },
    { name: 'Skill India Digital Hub', url: 'https://www.skillindiadigital.gov.in/' },
    { name: 'Parivahan Sewa (Transport)', url: 'https://parivahan.gov.in/' },
    { name: 'UIDAI myAadhaar Portal', url: 'https://myaadhaar.uidai.gov.in/' },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/janseva-logo.png"
                alt="SevaKhoj India logo"
                className="w-8 h-8 rounded-lg object-contain shrink-0 bg-white p-0.5 border border-slate-800 shadow-sm"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
              />
              <span className="text-xl font-bold tracking-tight text-white font-display">
                SevaKhoj<span className="text-indigo-400 ml-1">India</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Find public services and official resources in one place. A clean, independent discovery directory designed for ordinary citizens in India.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero user tracking · No login required</span>
              </div>
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Verified genuine government URLs (.gov.in & .nic.in)</span>
              </div>
            </div>
          </div>

          {/* Col 3: Directory Sections */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Explore Directory
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/services" onClick={(e) => handleNav('/services', e)} className="hover:text-white transition-colors">
                  All Services
                </a>
              </li>
              <li>
                <a href="/schemes" onClick={(e) => handleNav('/schemes', e)} className="hover:text-white transition-colors">
                  Government Schemes
                </a>
              </li>
              <li>
                <a href="/scholarships" onClick={(e) => handleNav('/scholarships', e)} className="hover:text-white transition-colors">
                  Student Scholarships
                </a>
              </li>
              <li>
                <a href="/jobs" onClick={(e) => handleNav('/jobs', e)} className="hover:text-white transition-colors">
                  Government Jobs (NCS)
                </a>
              </li>
              <li>
                <a href="/internships" onClick={(e) => handleNav('/internships', e)} className="hover:text-white transition-colors">
                  Ministry Internships
                </a>
              </li>
              <li>
                <a href="/documents" onClick={(e) => handleNav('/documents', e)} className="hover:text-white transition-colors">
                  Documents & DigiLocker
                </a>
              </li>
              <li>
                <a href="/states" onClick={(e) => handleNav('/states', e)} className="hover:text-white transition-colors">
                  36 States & UT Portals
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Official Portals */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Popular Official Portals
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {officialPortals.slice(0, 7).map((portal) => (
                <li key={portal.url}>
                  <a
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:text-indigo-400 transition-colors"
                  >
                    <span>{portal.name}</span>
                    <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Trust & Governance */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Trust & Legal
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <a href="/about" onClick={(e) => handleNav('/about', e)} className="hover:text-white transition-colors">
                  About SevaKhoj India
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleNav('/privacy', e)} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleNav('/terms', e)} className="hover:text-white transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="/disclaimer" onClick={(e) => handleNav('/disclaimer', e)} className="hover:text-white transition-colors">
                  Official Disclaimer
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleNav('/contact', e)} className="hover:text-white transition-colors">
                  Contact & Feedback
                </a>
              </li>
              <li>
                <a href="/analytics" onClick={(e) => handleNav('/analytics', e)} className="hover:text-white transition-colors text-xs text-slate-400">
                  Directory Insights (Logs)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Prominent Statutory Non-Affiliation Disclaimer */}
        <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80 text-xs text-slate-300 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-white">
            <HeartHandshake className="w-4 h-4 text-indigo-400" />
            <span>Public Trust Notice & Non-Government Disclaimer</span>
          </div>
          <p className="leading-relaxed text-slate-300">
            SevaKhoj India is an independent information platform and is not affiliated with, operated by, or endorsed by the Government of India or any government department. Information may change. Always verify eligibility, fees, deadlines and requirements on the official website before taking action.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} SevaKhoj India. Independent Public Resource Directory.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified October 2026</span>
            <span aria-hidden="true">·</span>
            <span>No Account Required</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.1 AA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

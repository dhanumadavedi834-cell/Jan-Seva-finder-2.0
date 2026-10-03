import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Mail,
  Send,
  CheckCircle2,
  Lock,
  Globe,
  HeartHandshake,
} from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

interface LegalPageProps {
  pageType: 'about' | 'privacy' | 'terms' | 'disclaimer' | 'contact';
}

export const LegalPages: React.FC<LegalPageProps> = ({ pageType }) => {
  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Report Broken Official Link',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (pageType === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            About JanSeva Finder
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            An independent civic discovery directory created for citizens of India to find authoritative public resources and schemes easily.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p>
            India possesses one of the world's most advanced digital public infrastructures, spanning DigiLocker, the National Scholarship Portal, UPI, myAadhaar, and thousands of central and state e-governance services. However, everyday citizens often struggle to distinguish official government portals from unauthorized third-party imitators or phishing sites.
          </p>
          <p>
            <strong>JanSeva Finder</strong> was built to solve this challenge by providing one clean, trustworthy, and non-commercial discovery directory. We organize official public services into simple plain-language guides, checklists of required documents, and direct links to the genuine government domains ending in <code>.gov.in</code> or <code>.nic.in</code>.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">Strict Editorial Principles</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>No User Login or Accounts:</strong> We believe public directory information should be immediately accessible to all citizens without requiring registration or passwords.</li>
            <li><strong>Zero Sensitivity Rule:</strong> We never ask for or store Aadhaar numbers, PAN numbers, OTPs, bank credentials, or passwords.</li>
            <li><strong>Real Official Links Only:</strong> Every listing connects directly to the genuine government department portal. We do not invent URLs or publish unverified links.</li>
            <li><strong>Independent & Transparent:</strong> We clearly disclose that we are an independent platform, not a government website.</li>
          </ul>
        </div>

        <AdBanner slot="footer" />
      </div>
    );
  }

  if (pageType === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Last Updated & Verified: October 3, 2026
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 text-emerald-950 dark:text-emerald-200">
            <strong>Privacy Guarantee:</strong> JanSeva Finder does NOT require you to create an account, log in, or provide sensitive personally identifiable information (PII).
          </div>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Information We Do NOT Collect</h2>
          <p>
            Unlike many commercial platforms, JanSeva Finder is intentionally architected to minimize data footprint:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do NOT collect or store <strong>Aadhaar numbers</strong> or <strong>Virtual IDs (VID)</strong>.</li>
            <li>We do NOT collect or store <strong>PAN numbers</strong> or tax filings.</li>
            <li>We do NOT collect <strong>OTPs</strong>, security MPINs, or passwords.</li>
            <li>We do NOT collect <strong>bank account numbers</strong>, credit/debit card numbers, or UPI PINs.</li>
            <li>We do NOT store user identity profiles, uploaded documents, or government certificates.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. Non-Sensitive Privacy-Safe Analytics</h2>
          <p>
            To help our editorial team understand which categories and public resources are most helpful, we record non-sensitive aggregated interaction metrics locally in your browser. These include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Search terms queried (automatically sanitized to scrub any accidental 12-digit number inputs)</li>
            <li>Category views (e.g. "Scholarships", "Documents")</li>
            <li>Clicks on "Visit Official Website" buttons</li>
          </ul>
          <p>
            No third-party cross-site behavioral tracking cookies are used to monitor you across the web.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. External Government Links</h2>
          <p>
            When you click "Visit Official Website", you leave JanSeva Finder and enter the external official portal operated by the respective Government ministry or department. The privacy practices and terms of that government website govern your interaction on their platform.
          </p>
        </div>

        <AdBanner slot="footer" />
      </div>
    );
  }

  if (pageType === 'disclaimer') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Official Non-Affiliation Disclaimer
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Important Statutory Information for Citizens
          </p>
        </div>

        <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-6 text-slate-800 dark:text-slate-200 space-y-3">
          <div className="flex items-center gap-2.5 font-bold text-amber-900 dark:text-amber-300 text-base">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <span>Statutory Non-Government Disclosure</span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-200">
            JanSeva Finder is an independent information platform and is not affiliated with, operated by, or endorsed by the Government of India or any government department. Information may change. Always verify eligibility, fees, deadlines and requirements on the official website before taking action.
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Nature of the Service</h2>
          <p>
            JanSeva Finder operates solely as a public indexing and information discovery directory. We do not act as government agents, representatives, intermediaries, or processing entities. We do not issue statutory certificates, process welfare scheme disbursements, register land records, or schedule passport appointments directly.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. Accuracy of Information</h2>
          <p>
            While our editorial staff rigorously verifies all official links and department details against published gazettes and government press releases as of October 2026, government schemes, eligibility parameters, application windows, and statutory fees are subject to periodic administrative amendment.
          </p>
          <p>
            Users are strictly advised to verify all terms directly on the official portal (ending in <code>.gov.in</code> or <code>.nic.in</code>) before filing any official document or making statutory fee payments.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Recruitment & Employment Advisory</h2>
          <p>
            <strong>Never pay money to anyone claiming they can guarantee you a government job.</strong> Recruitment to the Union and State civil services, defence, railways, and public sector undertakings is conducted solely through competitive examinations announced on verified government domains.
          </p>
        </div>

        <AdBanner slot="footer" />
      </div>
    );
  }

  if (pageType === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Terms of Use
          </h1>
          <p className="text-xs text-slate-400 font-mono mt-1">Effective October 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none text-sm space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing JanSeva Finder, you agree to be bound by these Terms of Use. If you do not agree with these terms, please discontinue use of this directory.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">2. Permitted Use</h2>
          <p>
            JanSeva Finder is provided free of charge for personal, non-commercial public discovery purposes. You may use our search utilities, read eligibility guidelines, and follow verified official links to complete government applications.
          </p>

          <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-4">3. Limitation of Liability</h2>
          <p>
            In no event shall JanSeva Finder, its creators, or contributors be held liable for any decisions made, rejections incurred, fees paid to official portals, or discrepancies arising from changes made to government schemes by respective departments.
          </p>
        </div>

        <AdBanner slot="footer" />
      </div>
    );
  }

  // Contact Page
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white font-display">
          Contact & Community Feedback
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
          Help us maintain accuracy. Report broken official links, notify us of updated government schemes, or suggest verified public portals.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-200">
            Thank you for your report!
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto">
            Our editorial team will audit the reported link against the official government registry and update the directory.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Submit Another Note
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Your Name (Optional)
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Ramesh Kumar"
              className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="For follow-up on reported link corrections"
              className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Subject
            </label>
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="Report Broken Official Link">Report Broken Official Link</option>
              <option value="Suggest New Verified Government Portal">Suggest New Verified Government Portal</option>
              <option value="Scheme Information Correction">Scheme Information Correction</option>
              <option value="General Feedback">General Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Message & Official URL Details *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Provide the service name and the official government portal URL (.gov.in / .nic.in)..."
              className="w-full text-xs sm:text-sm bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Note: Do not send sensitive personal details, passwords, or grievance complaints intended for government departments. We cannot process official grievances on your behalf.
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
          >
            <span>Submit Feedback</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}

      <AdBanner slot="footer" />
    </div>
  );
};

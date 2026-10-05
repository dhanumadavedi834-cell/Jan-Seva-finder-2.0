import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface Props {
  condensed?: boolean;
}

export const DisclaimerBanner: React.FC<Props> = ({ condensed = false }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed && condensed) return null;

  return (
    <div
      role="region"
      aria-label="Official Website Disclaimer"
      className="bg-amber-500/10 border-b border-amber-500/20 text-slate-800 dark:text-slate-200 text-xs sm:text-sm py-2.5 px-4 sm:px-6 transition-all"
    >
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="mt-0.5 sm:mt-0 text-amber-600 dark:text-amber-400 shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="leading-relaxed">
            <span className="font-semibold text-slate-900 dark:text-white">Independent Information Platform:</span>{' '}
            SevaKhoj India is <span className="font-medium">not affiliated with or endorsed by the Government of India</span>.
            Always verify details on the official website before submitting personal information or making payments.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official .gov.in links only
          </span>
          {condensed && (
            <button
              onClick={() => setDismissed(true)}
              className="p-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-100 rounded focus:outline-none"
              aria-label="Dismiss notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

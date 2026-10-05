import React, { useState } from 'react';
import { ExternalLink, CheckCircle2, ChevronRight, Share2, Check } from 'lucide-react';
import { ServiceItem } from '../types/service';
import { trackEvent } from '../utils/analytics';

interface Props {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

export const ServiceCard: React.FC<Props> = ({ service, onSelect }) => {
  const [copied, setCopied] = useState(false);

  const handleOfficialClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('official_link_click', {
      target: `${service.name} (${service.officialUrl})`,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/services/${service.id}`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  return (
    <article
      onClick={() => onSelect(service)}
      className="group flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-150 cursor-pointer"
    >
      <div>
        {/* Unboxed Metadata Line (No static pills as per design constitution) */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
          <span className="font-medium text-indigo-700 dark:text-indigo-400">
            {service.categoryLabel}
          </span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span>{service.state}</span>
          <span aria-hidden="true" className="text-slate-300 dark:text-slate-600">·</span>
          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Oct 2026
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug mb-1.5">
          {service.name}
        </h3>

        {/* Department */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          {service.department}
        </p>

        {/* Short Description */}
        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {service.shortDescription}
        </p>

        {/* Eligibility Brief */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-100 dark:border-slate-800/80 mb-4">
          <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Eligibility Highlights
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-200 line-clamp-1">
            {service.eligibility?.[0] || 'Open to eligible Indian citizens'}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <a
            href={`/services/${service.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onSelect(service);
            }}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1.5 px-2.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <span>View Details</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleShare}
            aria-label="Copy direct service link"
            title={copied ? 'Link copied!' : 'Share service link'}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Visit Official Website Button */}
        <a
          href={service.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleOfficialClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-medium rounded-lg shadow-sm transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-indigo-600"
          title={`Opens ${service.officialUrl} in a new tab`}
        >
          <span>Visit Official Website</span>
          <ExternalLink className="w-3 h-3 shrink-0" />
        </a>
      </div>
    </article>
  );
};

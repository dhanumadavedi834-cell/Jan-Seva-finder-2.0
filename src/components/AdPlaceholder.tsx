import React from 'react';

interface AdPlaceholderProps {
  position: 'header' | 'in-content' | 'sidebar' | 'footer';
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  position,
  className = '',
}) => {
  return (
    <div
      role="complementary"
      aria-label="Advertisement Space"
      className={`border border-dashed border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/40 rounded-xl p-4 text-center select-none ${className}`}
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-bold mb-1.5">
        <span className="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
          Advertisement
        </span>
        <span className="text-[10px] text-slate-400">
          Reserved Sponsor Placement ({position})
        </span>
      </div>

      <div className="py-2 px-3">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Non-government commercial or civic advertisement area.
        </p>
        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
          Notice: Advertisements are strictly separated and are not official government services.
        </p>
      </div>
    </div>
  );
};

// Backwards compatibility alias
export const AdBanner = ({ slot, className }: { slot: string; className?: string }) => (
  <AdPlaceholder position={slot as any} className={className} />
);

import React from 'react';

interface LoadingStateProps {
  message?: string;
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Searching verified official resources...',
  count = 6,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center py-4">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <span>{message}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: count }).map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 animate-pulse"
          >
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
            <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-100 dark:bg-slate-800/80 rounded w-1/2" />
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded" />
              <div className="h-3 bg-slate-100 dark:bg-slate-800/60 rounded w-5/6" />
            </div>
            <div className="h-10 bg-slate-100 dark:bg-slate-800/40 rounded-lg" />
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

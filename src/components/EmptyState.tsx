import React from 'react';
import { Search, RotateCcw, Compass } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  suggestions?: string[];
  onSelectSuggestion?: (term: string) => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No matching government resources found',
  description = 'We couldn’t find any official listings matching your query. Try broader keywords or clear your active filters.',
  onReset,
  suggestions = ['Aadhaar', 'Scholarship', 'DigiLocker', 'PAN Card', 'Driving Licence', 'PM Kisan'],
  onSelectSuggestion,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
        <Search className="w-6 h-6" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white font-display">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      </div>

      {suggestions && suggestions.length > 0 && onSelectSuggestion && (
        <div className="pt-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Try searching for:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {suggestions.map((term) => (
              <button
                key={term}
                onClick={() => onSelectSuggestion(term)}
                className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {onReset && (
        <div className="pt-2">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
};

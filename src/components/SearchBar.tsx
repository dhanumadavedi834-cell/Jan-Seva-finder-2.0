import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  showPopularChips?: boolean;
  onPopularSelect?: (term: string) => void;
  className?: string;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search for a service, scheme, scholarship, job or document...',
  showPopularChips = false,
  onPopularSelect,
  className = '',
  autoFocus = false,
}) => {
  const popularTerms = [
    'Aadhaar',
    'Scholarship',
    'Government job',
    'Internship',
    'DigiLocker',
    'PAN',
    'Driving licence',
    'Pension',
    'Certificate',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  return (
    <div className={`w-full max-w-3xl mx-auto space-y-3 ${className}`}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-700 shadow-md focus-within:ring-2 focus-within:ring-indigo-600 focus-within:border-transparent transition-all p-1.5 sm:p-2">
          <div className="pl-3.5 pr-2 text-slate-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label="Search government services, schemes, scholarships, jobs"
            className="w-full px-2 py-2.5 sm:py-3 text-sm sm:text-base bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg mr-1 focus:outline-none"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            className="px-5 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shrink-0 shadow-sm"
          >
            Search
          </button>
        </div>
      </form>

      {showPopularChips && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-700 dark:text-slate-300 mr-1">Popular:</span>
          {popularTerms.map((term, idx) => (
            <React.Fragment key={term}>
              <button
                type="button"
                onClick={() => onPopularSelect && onPopularSelect(term)}
                className="hover:text-indigo-600 dark:hover:text-indigo-400 underline decoration-slate-300 dark:decoration-slate-700 underline-offset-2 py-0.5 px-1 rounded transition-colors"
              >
                {term}
              </button>
              {idx < popularTerms.length - 1 && (
                <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

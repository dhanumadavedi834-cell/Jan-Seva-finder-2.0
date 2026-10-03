import React from 'react';
import { Compass, ArrowLeft, Search, Home } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const NotFoundPage: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
        <Compass className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
          404 Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-display">
          Page or Portal Not Located
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The requested section does not exist or may have been reorganized. Use our directory to find the verified government resource you need.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          onClick={() => onNavigate('#/')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Go to Homepage</span>
        </button>

        <button
          onClick={() => onNavigate('#/services')}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm rounded-xl transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Browse All Services</span>
        </button>
      </div>
    </div>
  );
};

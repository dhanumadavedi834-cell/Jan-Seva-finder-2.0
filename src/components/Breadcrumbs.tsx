import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (path: string) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className = '',
}) => {
  const handleClick = (path?: string) => {
    if (path && onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-slate-500 dark:text-slate-400 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        <li>
          <button
            onClick={() => handleClick('#/')}
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </button>
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <li aria-hidden="true" className="text-slate-300 dark:text-slate-600">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                {item.path && !isLast ? (
                  <button
                    onClick={() => handleClick(item.path)}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate max-w-[150px] sm:max-w-none"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={`font-semibold truncate max-w-[200px] sm:max-w-none ${
                      isLast ? 'text-slate-900 dark:text-white' : ''
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

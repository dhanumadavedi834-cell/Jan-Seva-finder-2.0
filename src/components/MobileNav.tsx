import React from 'react';
import { Home, Search, FileText, MapPin, GraduationCap } from 'lucide-react';

interface Props {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const MobileNav: React.FC<Props> = ({ currentPath, onNavigate }) => {
  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/services', icon: Search },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'States', path: '/states', icon: MapPin },
    { label: 'Students', path: '/scholarships', icon: GraduationCap },
  ];

  const isActive = (path: string) => {
    const cleanCurrent = currentPath.split('?')[0];
    if (path === '/' && (cleanCurrent === '/' || cleanCurrent === '' || cleanCurrent === '/index.html')) {
      return true;
    }
    return cleanCurrent.startsWith(path) && path !== '/';
  };

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 shadow-lg"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {items.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;
          return (
            <a
              key={item.path}
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.path);
              }}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                active
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${active ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  isDarkMode,
  onToggleDarkMode,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Schemes', path: '/schemes' },
    { label: 'Scholarships', path: '/scholarships' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Internships', path: '/internships' },
    { label: 'Documents', path: '/documents' },
    { label: 'State Services', path: '/states' },
    { label: 'About', path: '/about' },
  ];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    const cleanCurrent = currentPath.split('?')[0];
    if (path === '/' && (cleanCurrent === '/' || cleanCurrent === '' || cleanCurrent === '/index.html')) {
      return true;
    }
    return cleanCurrent.startsWith(path) && path !== '/';
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element Brand Zone */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className="flex items-center gap-2.5 group shrink-0 focus-visible:outline-2 focus-visible:outline-indigo-600 rounded"
          aria-label="JanSeva Finder - Back to homepage"
        >
          <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm shadow-indigo-600/20 group-hover:bg-indigo-700 transition-colors">
            <span className="text-base tracking-tight font-display">JS</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-display">
            JanSeva<span className="text-indigo-600 dark:text-indigo-400">Finder</span>
          </span>
        </a>

        {/* Zone 2: Clean text navigation links (Hidden on mobile/tablet) */}
        <nav
          className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                className={`transition-colors whitespace-nowrap py-1 relative ${
                  active
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Fallback for medium screens (lg:flex, xl:hidden compact menu) */}
        <div className="hidden lg:flex xl:hidden items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/services');
            }}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            Services
          </a>
          <a
            href="/scholarships"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/scholarships');
            }}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            Scholarships
          </a>
          <a
            href="/jobs"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/jobs');
            }}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            Jobs
          </a>
          <a
            href="/documents"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/documents');
            }}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            Documents
          </a>
          <a
            href="/states"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/states');
            }}
            className="hover:text-slate-900 dark:hover:text-white"
          >
            States
          </a>
        </div>

        {/* Zone 3: Actions - Search quick trigger, Dark mode toggle, Mobile menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/services');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700"
            aria-label="Quick search all services"
          >
            <Search className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Search Portals</span>
            <kbd className="hidden md:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-slate-500">
              /
            </kbd>
          </a>

          <button
            onClick={onToggleDarkMode}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-2 focus-visible:outline-indigo-600"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-2">
            Navigation Menu
          </div>
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.path);
                }}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>{link.label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />}
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="text-xs text-slate-500 dark:text-slate-400 px-3 py-1">
              Independent Directory · Real Official Links Only
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

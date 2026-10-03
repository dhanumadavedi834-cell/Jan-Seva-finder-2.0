import React, { useState, useMemo, useEffect } from 'react';
import { SERVICES } from '../data/services';
import { ServiceCard } from '../components/ServiceCard';
import { ServiceGrid } from '../components/ServiceGrid';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Service } from '../types/service';
import { trackEvent } from '../utils/analytics';

interface DirectoryPageProps {
  initialQuery?: string;
  initialCategory?: string;
  onSelectService: (service: Service) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  initialQuery = '',
  initialCategory = '',
  onSelectService,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedAudience, setSelectedAudience] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'verified' | 'popular' | 'name-asc'>('verified');

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
  }, [initialCategory]);

  // Filtering & Search
  const filteredServices = useMemo(() => {
    const q = query.toLowerCase().trim();

    return SERVICES.filter((item) => {
      // Keyword match
      if (q) {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesShort = (item.shortDescription || item.description || '').toLowerCase().includes(q);
        const matchesDetailed = (item.detailedDescription || '').toLowerCase().includes(q);
        const matchesDept = item.department.toLowerCase().includes(q);
        const matchesCategory = (item.categoryLabel || item.category).toLowerCase().includes(q);
        const matchesKeywords = (item.keywords || item.tags || []).some((k) => k.toLowerCase().includes(q));
        const matchesAudience = item.audience.some((a) => a.toLowerCase().includes(q));
        const matchesEligibility = (item.eligibility || []).some((e) => e.toLowerCase().includes(q));

        if (
          !matchesName &&
          !matchesShort &&
          !matchesDetailed &&
          !matchesDept &&
          !matchesCategory &&
          !matchesKeywords &&
          !matchesAudience &&
          !matchesEligibility
        ) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // State filter
      if (selectedState !== 'All' && item.state !== 'All India' && item.state !== selectedState) {
        return false;
      }

      // Audience filter
      if (selectedAudience !== 'All') {
        if (!item.audience.includes(selectedAudience as any)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'popular') {
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
      // 'verified' (recently verified first)
      return new Date(b.lastVerified).getTime() - new Date(a.lastVerified).getTime();
    });
  }, [query, selectedCategory, selectedState, selectedAudience, sortBy]);

  const handleResetFilters = () => {
    setQuery('');
    setSelectedCategory('all');
    setSelectedState('All');
    setSelectedAudience('All');
    setSortBy('verified');
  };

  const handleSearchChange = (val: string) => {
    setQuery(val);
    if (val.length > 2) {
      trackEvent('search', { query: val });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Public Services & Schemes Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search verified government portals, schemes, scholarships, and documents without logging in.
          </p>
        </div>

        {/* Live Result Count as specified in Section 7: "X results found" */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="px-3.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-xs font-bold text-indigo-700 dark:text-indigo-300">
            <span className="font-mono tabular-nums">{filteredServices.length}</span> results found
          </div>
        </div>
      </div>

      {/* Main Search Input */}
      <SearchBar
        value={query}
        onChange={handleSearchChange}
        placeholder="Search by service name, scheme, keyword, department, or state..."
        showPopularChips
        onPopularSelect={(term) => setQuery(term)}
      />

      {/* Filter Bar Controls */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        selectedState={selectedState}
        onSelectState={(st) => setSelectedState(st)}
        selectedAudience={selectedAudience}
        onSelectAudience={(aud) => setSelectedAudience(aud)}
        sortBy={sortBy}
        onSelectSortBy={(sort) => setSortBy(sort)}
        onReset={handleResetFilters}
        totalResults={filteredServices.length}
      />

      {/* Grid of Results */}
      <div className="pt-2">
        <ServiceGrid
          services={filteredServices}
          onSelectService={onSelectService}
          onResetFilters={handleResetFilters}
          onSelectSuggestion={(term) => setQuery(term)}
          emptyTitle="No matching government resources found"
          emptyDescription={`We couldn't find any official listings matching "${query}" with your active filters. Try searching for "Aadhaar", "scholarship", or reset your filters.`}
        />
      </div>

      {/* In-content Advertisement Placement */}
      <AdPlaceholder position="in-content" />
    </div>
  );
};

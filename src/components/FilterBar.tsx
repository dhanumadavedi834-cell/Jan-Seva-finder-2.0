import React from 'react';
import { RefreshCw, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/categoriesData';
import { STATES_AND_UTS } from '../data/statesData';
import { AudienceType } from '../types/service';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedState: string;
  onSelectState: (state: string) => void;
  selectedAudience: string;
  onSelectAudience: (aud: string) => void;
  sortBy: 'verified' | 'popular' | 'name-asc';
  onSelectSortBy: (sort: 'verified' | 'popular' | 'name-asc') => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedState,
  onSelectState,
  selectedAudience,
  onSelectAudience,
  sortBy,
  onSelectSortBy,
  onReset,
  totalResults,
}) => {
  const audienceOptions: AudienceType[] = [
    'Students',
    'Job Seekers',
    'Farmers',
    'Women',
    'Senior Citizens',
    'General Citizens',
    'Entrepreneurs/Business',
    'Youth',
  ];

  return (
    <div className="space-y-3">
      {/* Category Tabs (Segmented Buttons) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          onClick={() => onSelectCategory('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            selectedCategory === 'all' || !selectedCategory
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          All Categories
        </button>
        {CATEGORIES.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                active
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Dropdown Filters & Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 pt-1">
        {/* State Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            State / Territory
          </label>
          <select
            value={selectedState}
            onChange={(e) => onSelectState(e.target.value)}
            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="All">All India (National & All States)</option>
            {STATES_AND_UTS.map((st) => (
              <option key={st.code} value={st.name}>
                {st.name} ({st.type === 'Union Territory' ? 'UT' : 'State'})
              </option>
            ))}
          </select>
        </div>

        {/* Audience Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Audience / Target Group
          </label>
          <select
            value={selectedAudience}
            onChange={(e) => onSelectAudience(e.target.value)}
            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="All">All Audiences</option>
            {audienceOptions.map((aud) => (
              <option key={aud} value={aud}>
                {aud}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
            Sort Order
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSelectSortBy(e.target.value as any)}
            className="w-full text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            <option value="verified">Recently Verified (Oct 2026)</option>
            <option value="popular">Most Popular Portals</option>
            <option value="name-asc">Alphabetical (A to Z)</option>
          </select>
        </div>

        {/* Reset Action */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            className="w-full py-2.5 px-3 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

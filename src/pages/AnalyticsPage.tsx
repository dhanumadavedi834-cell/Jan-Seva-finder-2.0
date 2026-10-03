import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Search,
  ExternalLink,
  ShieldCheck,
  Trash2,
  RefreshCw,
  Eye,
  Layers,
  Activity,
} from 'lucide-react';
import { getAnalyticsSummary, clearAnalyticsLogs } from '../utils/analytics';

export const AnalyticsPage: React.FC = () => {
  const [summary, setSummary] = useState(getAnalyticsSummary());

  const handleRefresh = () => {
    setSummary(getAnalyticsSummary());
  };

  const handleClear = () => {
    if (window.confirm('Clear all local directory interaction logs?')) {
      clearAnalyticsLogs();
      handleRefresh();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 rounded px-2.5 py-1 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Privacy-Preserving · Zero PII Collected</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-display">
            Directory Usage Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Non-sensitive metrics showing search trends and popular official government resources.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleRefresh}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-slate-200 dark:border-slate-800"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleClear}
            className="p-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-xs font-medium flex items-center gap-1.5 border border-rose-200 dark:border-rose-900/60"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Activity className="w-3.5 h-3.5 text-indigo-500" />
            <span>Total Events</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {summary.totalEvents}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Search className="w-3.5 h-3.5 text-blue-500" />
            <span>Searches Logged</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {summary.eventBreakdown['search'] || 0}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
            <span>Official Clicks</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {summary.eventBreakdown['official_link_click'] || 0}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
            <Eye className="w-3.5 h-3.5 text-purple-500" />
            <span>Detail Views</span>
          </div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
            {summary.eventBreakdown['service_open'] || 0}
          </div>
        </div>
      </div>

      {/* Breakdowns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Search Terms */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Popular Citizen Search Terms</span>
          </h2>
          {summary.recentSearches.length > 0 ? (
            <div className="space-y-2">
              {summary.recentSearches.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <span className="font-mono text-slate-700 dark:text-slate-200 truncate pr-2">“{item.query}”</span>
                  <span className="font-mono font-semibold text-slate-500 shrink-0">{item.count} query{item.count > 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4">No search events recorded yet in this session.</p>
          )}
        </div>

        {/* Most Visited Resources */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Top Accessed Government Portals</span>
          </h2>
          {summary.popularServices.length > 0 ? (
            <div className="space-y-2">
              {summary.popularServices.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
                  <span className="text-slate-700 dark:text-slate-200 truncate pr-2">{item.target}</span>
                  <span className="font-mono font-semibold text-slate-500 shrink-0">{item.count} clicks</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 py-4">No portal clicks recorded yet in this session.</p>
          )}
        </div>
      </div>

      {/* Raw Non-Sensitive Event Feed */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-5 space-y-3">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Recent Event Activity (Latest 20)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="py-2 pr-3">Time</th>
                <th className="py-2 pr-3">Type</th>
                <th className="py-2">Context</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
              {summary.events.slice(0, 20).map((e) => (
                <tr key={e.id} className="text-slate-600 dark:text-slate-300">
                  <td className="py-2 pr-3 text-slate-400 whitespace-nowrap">
                    {new Date(e.timestamp).toLocaleTimeString()}
                  </td>
                  <td className="py-2 pr-3 font-semibold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">
                    {e.type}
                  </td>
                  <td className="py-2 truncate max-w-md">
                    {e.query ? `Query: "${e.query}"` : e.target || 'General interaction'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

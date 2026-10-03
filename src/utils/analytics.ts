import { AnalyticsEvent } from '../types/service';

const STORAGE_KEY = 'janseva_privacy_analytics_v1';
const MAX_EVENTS = 200;

export function trackEvent(
  type: AnalyticsEvent['type'],
  payload?: { target?: string; query?: string }
): void {
  try {
    // Sanitize query to ensure no accidental sensitive digits (e.g. 12-digit Aadhaar or 10-char PAN)
    let sanitizedQuery = payload?.query?.trim();
    if (sanitizedQuery) {
      // Redact potential 12-digit numbers (Aadhaar format)
      sanitizedQuery = sanitizedQuery.replace(/\b\d{4}\s?\d{4}\s?\d{4}\b/g, '[REDACTED_NUMBER]');
      // Redact potential 10-character alphanumeric PAN formats
      sanitizedQuery = sanitizedQuery.replace(/\b[A-Z]{5}[0-9]{4}[A-Z]\b/gi, '[REDACTED_ID]');
      // Truncate query length for privacy
      sanitizedQuery = sanitizedQuery.slice(0, 60);
    }

    const event: AnalyticsEvent = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      target: payload?.target?.slice(0, 80),
      query: sanitizedQuery,
      timestamp: new Date().toISOString(),
    };

    const existingRaw = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = existingRaw ? JSON.parse(existingRaw) : [];
    events.unshift(event);

    // Keep ring buffer of non-sensitive events
    if (events.length > MAX_EVENTS) {
      events.length = MAX_EVENTS;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch {
    // Fail silent, non-blocking
  }
}

export function getAnalyticsSummary(): {
  totalEvents: number;
  recentSearches: { query: string; count: number }[];
  popularServices: { target: string; count: number }[];
  eventBreakdown: Record<string, number>;
  events: AnalyticsEvent[];
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];

    const eventBreakdown: Record<string, number> = {};
    const searchMap = new Map<string, number>();
    const serviceMap = new Map<string, number>();

    for (const e of events) {
      eventBreakdown[e.type] = (eventBreakdown[e.type] || 0) + 1;

      if (e.type === 'search' && e.query) {
        const q = e.query.toLowerCase();
        searchMap.set(q, (searchMap.get(q) || 0) + 1);
      }
      if ((e.type === 'service_open' || e.type === 'official_link_click') && e.target) {
        serviceMap.set(e.target, (serviceMap.get(e.target) || 0) + 1);
      }
    }

    const recentSearches = Array.from(searchMap.entries())
      .map(([query, count]) => ({ query, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const popularServices = Array.from(serviceMap.entries())
      .map(([target, count]) => ({ target, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalEvents: events.length,
      recentSearches,
      popularServices,
      eventBreakdown,
      events,
    };
  } catch {
    return {
      totalEvents: 0,
      recentSearches: [],
      popularServices: [],
      eventBreakdown: {},
      events: [],
    };
  }
}

export function clearAnalyticsLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silent
  }
}

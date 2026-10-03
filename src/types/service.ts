export type CategoryId =
  | 'services'
  | 'schemes'
  | 'scholarships'
  | 'jobs'
  | 'internships'
  | 'documents'
  | 'transport'
  | 'financial'
  | 'health'
  | 'education'
  | 'skills'
  | 'state-services';

export type AudienceType =
  | 'Students'
  | 'Farmers'
  | 'Job Seekers'
  | 'Women'
  | 'Senior Citizens'
  | 'General Citizens'
  | 'Entrepreneurs/Business'
  | 'Youth';

export interface Service {
  id: string;
  name: string;
  category: string;
  categoryLabel?: string;
  description?: string;
  shortDescription?: string;
  detailedDescription?: string;
  department: string;
  state: string; // 'All India' or specific state name
  audience: AudienceType[] | string[];
  keywords?: string[];
  tags?: string[];
  officialUrl: string;
  directServiceUrl?: string;
  sourceName?: string;
  lastVerified: string; // YYYY-MM-DD
  status: 'active' | 'inactive' | 'seasonal' | 'maintenance';
  isPopular?: boolean;
  isRecentlyVerified?: boolean;
  eligibility?: string[];
  requiredDocuments?: string[];
  applicationSteps?: string[];
  fees?: string;
  processingTime?: string;
  importantDates?: string;
  helpline?: string;
  portalBadge?: string;
  faqs?: { question: string; answer: string }[];
  qualification?: string;
  organization?: string;
  location?: string;
  deadline?: string;
}

export type ServiceItem = Service;

export interface StatePortal {
  code: string;
  name: string;
  type: 'State' | 'Union Territory';
  capital: string;
  citizenPortalName: string;
  officialPortalUrl: string;
  eDistrictUrl?: string;
  description: string;
  keyServices: string[];
  helpline?: string;
}

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  iconName: string;
  shortDescription: string;
  colorScheme: string;
}

export interface AnalyticsEvent {
  id: string;
  type: 'page_view' | 'search' | 'category_open' | 'service_open' | 'official_link_click';
  target?: string;
  query?: string;
  timestamp: string;
}

import { Service } from '../types/service';
import { VERIFIED_SERVICES } from './servicesData';

export const SERVICES: Service[] = VERIFIED_SERVICES.map((item) => ({
  id: item.id,
  name: item.name,
  category: item.category,
  categoryLabel: item.categoryLabel || item.category,
  description: item.shortDescription || item.detailedDescription || item.description || '',
  shortDescription: item.shortDescription || item.description,
  detailedDescription: item.detailedDescription || item.shortDescription || item.description,
  department: item.department,
  state: item.state,
  audience: item.audience,
  keywords: item.keywords || item.tags || [],
  tags: item.tags || item.keywords || [],
  officialUrl: item.officialUrl,
  directServiceUrl: item.directServiceUrl,
  sourceName: item.department,
  lastVerified: item.lastVerified,
  status: item.status === 'active' ? 'active' : 'inactive',
  isPopular: item.isPopular,
  isRecentlyVerified: item.isRecentlyVerified,
  eligibility: item.eligibility || [],
  requiredDocuments: item.requiredDocuments || [],
  applicationSteps: item.applicationSteps || [],
  fees: item.fees || '',
  processingTime: item.processingTime || '',
  importantDates: item.importantDates,
  helpline: item.helpline,
  portalBadge: item.portalBadge,
  faqs: item.faqs,
}));

export default SERVICES;

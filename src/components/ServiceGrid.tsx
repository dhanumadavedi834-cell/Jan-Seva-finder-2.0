import React from 'react';
import { Service } from '../types/service';
import { ServiceCard } from './ServiceCard';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

interface ServiceGridProps {
  services: Service[];
  isLoading?: boolean;
  onSelectService: (service: Service) => void;
  onResetFilters?: () => void;
  onSelectSuggestion?: (term: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({
  services,
  isLoading = false,
  onSelectService,
  onResetFilters,
  onSelectSuggestion,
  emptyTitle,
  emptyDescription,
  className = '',
}) => {
  if (isLoading) {
    return <LoadingState count={6} />;
  }

  if (services.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        onReset={onResetFilters}
        onSelectSuggestion={onSelectSuggestion}
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ${className}`}>
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onSelect={onSelectService}
        />
      ))}
    </div>
  );
};

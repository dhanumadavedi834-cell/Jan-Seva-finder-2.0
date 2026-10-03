import React from 'react';
import { ServiceDetails } from '../components/ServiceDetails';
import { Service } from '../types/service';

interface Props {
  service: Service;
  onBack: () => void;
  onSelectRelated: (service: Service) => void;
  onNavigate?: (path: string) => void;
}

export const ServiceDetailPage: React.FC<Props> = (props) => {
  return <ServiceDetails {...props} />;
};

export default ServiceDetailPage;

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface OfficialButtonProps {
  url: string;
  label?: string;
  serviceName?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const OfficialButton: React.FC<OfficialButtonProps> = ({
  url,
  label = 'Visit Official Website',
  serviceName,
  size = 'md',
  className = '',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    trackEvent('official_link_click', {
      target: `${serviceName || 'Unknown Service'} (${url})`,
    });
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
    md: 'px-4 py-2 text-xs sm:text-sm gap-2 rounded-xl',
    lg: 'px-6 py-3.5 text-sm sm:text-base gap-2.5 rounded-xl font-bold shadow-md',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`inline-flex items-center justify-center font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 transition-all hover:shadow-sm whitespace-nowrap focus-visible:outline-2 focus-visible:outline-indigo-600 ${sizeClasses[size]} ${className}`}
      title={`Opens ${url} in a new tab`}
    >
      <span>{label}</span>
      <ExternalLink className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
    </a>
  );
};

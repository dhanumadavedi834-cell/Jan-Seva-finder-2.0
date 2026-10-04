import React from 'react';

interface AdPlaceholderProps {
  position?: 'header' | 'in-content' | 'sidebar' | 'footer' | string;
  className?: string;
  slot?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = () => null;

// Backwards compatibility alias
export const AdBanner: React.FC<{ slot?: string; className?: string }> = () => null;

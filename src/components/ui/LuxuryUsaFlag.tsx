import React from 'react';

interface LuxuryUsaFlagProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  withGoldBorder?: boolean;
}

export const LuxuryUsaFlag: React.FC<LuxuryUsaFlagProps> = ({
  className = '',
  size = 'md',
}) => {
  // Aspect ratio is ~1.61:1 (gold badge 1095x680)
  const sizeClasses = {
    xs: 'w-4 h-2.5',
    sm: 'w-5 h-3.5',
    md: 'w-6 h-4',
    lg: 'w-8 h-5',
    xl: 'w-10 h-6',
  };

  return (
    <span
      className={`inline-flex items-center justify-center relative shrink-0 select-none ${sizeClasses[size]} ${className}`}
    >
      <img
        src="/images/usa-flag-gold-badge.png"
        alt="USA Flag"
        className="w-full h-full object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] hover:scale-105 transition-transform"
      />
    </span>
  );
};

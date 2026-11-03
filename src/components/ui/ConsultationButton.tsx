'use client';

import React from 'react';
import { useConsultation } from '@/context/ConsultationContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight } from 'lucide-react';

interface ConsultationButtonProps {
  serviceCategory?: string;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

export const ConsultationButton: React.FC<ConsultationButtonProps> = ({
  serviceCategory,
  className,
  children,
  icon,
  showIcon = true,
}) => {
  const { openConsultation } = useConsultation();
  const { t } = useLanguage();

  const handleClick = () => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'consultation_modal_open', {
        event_category: 'consultation',
        event_label: serviceCategory || 'generic',
      });
    }
    openConsultation(serviceCategory);
  };

  const defaultClasses =
    'inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#DFBA73] hover:bg-[#cfab5b] text-[#080B11] text-xs font-bold uppercase tracking-wider rounded-md border border-[#FFE8A3]/40 shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || defaultClasses}
    >
      <span>{children || t('nav', 'bookConsultation')}</span>
      {showIcon && (icon || <ArrowRight size={15} />)}
    </button>
  );
};

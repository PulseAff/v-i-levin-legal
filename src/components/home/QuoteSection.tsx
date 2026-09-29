'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const QuoteSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-[#05070B] py-10 border-b border-[#1A2230]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-md border border-[#1A2230] p-6 lg:p-8 overflow-hidden bg-gradient-to-r from-black via-[#0B0F15] to-black text-center space-y-2">
          <p className="text-sm sm:text-base font-serif italic text-white leading-relaxed max-w-xl mx-auto">
            {t('quote', 'text')}
          </p>
          <div className="text-xs text-gold-400 font-sans tracking-wider">
            {t('quote', 'author')}
          </div>
        </div>
      </div>
    </section>
  );
};

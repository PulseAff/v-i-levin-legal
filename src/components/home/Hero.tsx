'use client';

import React from 'react';
import { Send, Shield } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useLanguage } from '@/context/LanguageContext';
import { useConsultation } from '@/context/ConsultationContext';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { t } = useLanguage();
  const { openConsultation } = useConsultation();

  const handleOpen = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultation('Иммиграция и Green Card США');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#000000] border-b border-[#181818] min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* 1. HERO VISUAL BACKGROUND — Luminous, vivid planet and skyline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[28%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-400/35 via-blue-400/25 to-transparent blur-[85px] pointer-events-none mix-blend-screen" />

        <div className="absolute inset-0 flex items-center justify-end">
          <img
            src="/images/Hero_zoomed_out_12pct.png"
            alt="V. I. LEVIN - International Legal Solutions"
            className="w-full h-full object-cover object-right contrast-[1.08] brightness-[1.25] saturate-[1.2]"
          />
        </div>

        {/* Cinematic OLED Black scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 via-[42%] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/50 to-transparent" />
      </div>

      {/* 2. EDITORIAL CONTENT EXACTLY MATCHING USER SCREENSHOT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
        <div className="max-w-xl space-y-4">
          
          {/* Pre-title on the LEFT directly above headline */}
          <div className="text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
            {t('hero', 'badge')}
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-serif text-white font-bold leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            {t('hero', 'title1')}{' '}
            <span className="font-normal italic text-[#FFE29A] drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              {t('hero', 'title2')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed max-w-lg pt-1">
            {t('hero', 'desc')}
          </p>

          {/* Credibility Badge */}
          <div className="pt-2">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/85 border border-[#2A2A2A] text-xs text-gray-200 shadow-xl backdrop-blur-md">
              <span className="font-semibold flex items-center gap-1.5 text-white whitespace-nowrap">
                <LuxuryUsaFlag size="sm" />
                <span>{t('hero', 'badgeNy')}</span>
              </span>
              <span className="text-gray-500 font-mono">·</span>
              <span className="text-gray-200 font-medium whitespace-nowrap">{t('hero', 'badgeCitizen')}</span>
              <span className="text-gray-500 font-mono">·</span>
              <span className="text-gold-300 font-medium flex items-center gap-1 whitespace-nowrap">
                <Shield size={12} className="text-gold-400" />
                <span>Attorney-Client Privilege</span>
              </span>
            </div>
          </div>

          {/* Action Buttons: Gold Primary CTA + Telegram Button */}
          <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={handleOpen}
              className="px-7 py-3 rounded-full text-[#000000] font-bold text-xs sm:text-sm tracking-wider uppercase hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.45)] border border-[#FFE8A3] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
              }}
            >
              {t('hero', 'ctaConsultation')}
            </button>

            <a
              href="https://t.me/VILEVIN_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-full bg-black/80 hover:bg-black text-white border border-[#2A2A2A] hover:border-gold-500/40 text-xs font-semibold backdrop-blur-md transition-all shadow-md cursor-pointer"
            >
              <span className="w-5 h-5 rounded-full bg-[#0088cc] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Send size={10} className="-translate-x-0.2" />
              </span>
              <span className="tracking-wide">Быстрая связь через Telegram</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

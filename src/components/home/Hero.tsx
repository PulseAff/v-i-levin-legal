'use client';

import React from 'react';
import { Send, Scale } from 'lucide-react';
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
    <section className="relative overflow-hidden bg-[#000000] border-b border-[#181818] min-h-[580px] lg:min-h-[660px] flex items-center">
      
      {/* 1. HERO VISUAL BACKGROUND — Luminous planet, Lady Justice with scales and city skyline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric golden-blue glow behind the planet */}
        <div className="absolute top-[28%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-400/35 via-blue-400/25 to-transparent blur-[85px] pointer-events-none mix-blend-screen" />

        <div className="absolute inset-0 flex items-center justify-end">
          <img
            src="/images/Hero_zoomed_out_12pct.png"
            alt="V. I. LEVIN - International Legal Solutions"
            className="w-full h-full object-cover object-right contrast-[1.08] brightness-[1.25] saturate-[1.2]"
          />
        </div>

        {/* Cinematic OLED Black scrims matching screenshot */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/55 via-[42%] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 via-[15%] to-transparent" />
        <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* 2. EDITORIAL CONTENT EXACTLY MATCHING USER SCREENSHOT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full z-10">
        <div className="max-w-xl space-y-4 sm:space-y-4.5">
          
          {/* Pre-title with Scales Icon on the LEFT directly above headline */}
          <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono uppercase tracking-[0.24em] text-[#D4AF37] font-semibold">
            <Scale size={14} className="text-[#D4AF37] shrink-0" />
            <span>{t('hero', 'badge')}</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-serif text-white font-bold leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            {t('hero', 'title1')}{' '}
            <span className="font-normal italic text-[#FFE29A] drop-shadow-[0_2px_10px_rgba(0,0,0,1)]">
              {t('hero', 'title2')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed max-w-lg">
            {t('hero', 'desc')}
          </p>

          {/* 4-Step Flow Badges: [Сложная ситуация] → [Точный анализ] → [Стратегия] → [Решение] */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 pb-1">
            <span className="px-3 py-1.5 rounded-lg bg-[#0E1524]/90 border border-[#2B3E5C] text-white font-medium text-xs shadow-md">
              {t('hero', 'flow1')}
            </span>
            <span className="text-[#E5C37A] text-sm font-bold drop-shadow-[0_0_8px_rgba(229,195,122,0.8)]">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#0E1524]/90 border border-[#2B3E5C] text-white font-medium text-xs shadow-md">
              {t('hero', 'flow2')}
            </span>
            <span className="text-[#E5C37A] text-sm font-bold drop-shadow-[0_0_8px_rgba(229,195,122,0.8)]">→</span>
            <span className="px-3 py-1.5 rounded-lg bg-[#0E1524]/90 border border-[#2B3E5C] text-white font-medium text-xs shadow-md">
              {t('hero', 'flow3')}
            </span>
            <span className="text-[#E5C37A] text-sm font-bold drop-shadow-[0_0_8px_rgba(229,195,122,0.8)]">→</span>
            <span className="px-3.5 py-1.5 rounded-lg bg-[#0E1524]/90 border border-[#D4AF37] text-[#FFE8A3] font-bold text-xs shadow-[0_0_15px_rgba(212,175,55,0.35)]">
              {t('hero', 'flow4')}
            </span>
          </div>

          {/* Credibility Badge */}
          <div className="pt-0.5">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg bg-black/85 border border-[#2A2A2A] text-xs text-gray-200 shadow-xl backdrop-blur-md">
              <span className="font-semibold flex items-center gap-1.5 text-white whitespace-nowrap">
                <LuxuryUsaFlag size="sm" />
                <span>{t('hero', 'badgeNy')}</span>
              </span>
              <span className="text-[#D4AF37]/60 font-mono">·</span>
              <span className="text-gray-200 font-medium whitespace-nowrap">{t('hero', 'badgeCitizen')}</span>
            </div>
          </div>

          {/* Action Buttons: Gold Primary CTA + Быстрая связь (Telegram + WhatsApp) */}
          <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleOpen}
              className="w-full sm:w-auto px-7 py-3 rounded-full text-[#000000] font-bold text-xs sm:text-sm tracking-wider uppercase hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_25px_rgba(212,175,55,0.45)] border border-[#FFE8A3] cursor-pointer shrink-0"
              style={{
                background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
              }}
            >
              {t('hero', 'ctaConsultation')}
            </button>

            {/* Быстрая связь с круглыми иконками Telegram и WhatsApp точно по скриншоту */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black/85 border border-[#2A2A2A] text-xs text-gray-200 backdrop-blur-md shadow-md">
              <span className="font-mono text-xs text-gray-200 font-medium whitespace-nowrap">{t('hero', 'fastContact')}</span>
              <div className="flex items-center justify-center gap-2">
                <a
                  href="https://t.me/VILEVIN_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Telegram"
                  className="w-8 h-8 rounded-full bg-[#0088cc] hover:brightness-110 active:scale-95 flex items-center justify-center text-white shadow-md shadow-[#0088cc]/30 transition-all cursor-pointer"
                >
                  <Send size={13} className="-translate-x-0.2" />
                </a>

                <a
                  href="https://wa.me/19175550199"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="WhatsApp"
                  className="w-8 h-8 rounded-full bg-[#25D366] hover:brightness-110 active:scale-95 flex items-center justify-center text-white shadow-md shadow-[#25D366]/30 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

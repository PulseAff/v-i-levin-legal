'use client';

import React from 'react';
import { Send, Shield, Scale } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useLanguage } from '@/context/LanguageContext';
import { useConsultation } from '@/context/ConsultationContext';

interface HeroProps {
  onOpenConsultation?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const { t, currentLang } = useLanguage();
  const { openConsultation } = useConsultation();

  const metrics = {
    ru: {
      m1Val: '15+ лет', m1Sub: 'в Нью-Йорке', m1Desc: 'контекст американской среды',
      m2Val: 'U.S. Citizen', m2Sub: 'Гражданин США', m2Desc: 'личное знание системы изнутри',
      m3Val: 'International', m3Sub: 'Трансграничные дела', m3Desc: 'США · Европа · ОАЭ · СНГ',
      m4Val: '100%', m4Sub: 'Конфиденциальность', m4Desc: 'Правовая тайна Rule 1.6',
    },
    en: {
      m1Val: '15+ Years', m1Sub: 'in New York', m1Desc: 'native US legal environment',
      m2Val: 'U.S. Citizen', m2Sub: 'United States Citizen', m2Desc: 'insider statutory acumen',
      m3Val: 'International', m3Sub: 'Cross-Border Practice', m3Desc: 'USA · Europe · UAE · Global',
      m4Val: '100%', m4Sub: 'Confidentiality', m4Desc: 'Attorney-Client Privilege (Rule 1.6)',
    },
    uk: {
      m1Val: '15+ років', m1Sub: 'у Нью-Йорку', m1Desc: 'контекст американського середовища',
      m2Val: 'U.S. Citizen', m2Sub: 'Громадянин США', m2Desc: 'особисте знання системи зсередини',
      m3Val: 'International', m3Sub: 'Транскордонні справи', m3Desc: 'США · Європа · ОАЕ · Світ',
      m4Val: '100%', m4Sub: 'Конфіденційність', m4Desc: 'Правова таємниця Rule 1.6',
    },
    es: {
      m1Val: '15+ años', m1Sub: 'en Nueva York', m1Desc: 'entorno jurídico estadounidense',
      m2Val: 'U.S. Citizen', m2Sub: 'Ciudadano de EE. UU.', m2Desc: 'conocimiento del sistema desde dentro',
      m3Val: 'International', m3Sub: 'Práctica transfronteriza', m3Desc: 'EE. UU. · Europa · EAU · Global',
      m4Val: '100%', m4Sub: 'Confidencialidad', m4Desc: 'Secreto profesional Rule 1.6',
    },
    it: {
      m1Val: '15+ anni', m1Sub: 'a New York', m1Desc: 'contesto giuridico statunitense',
      m2Val: 'U.S. Citizen', m2Sub: 'Cittadino USA', m2Desc: 'conoscenza diretta delle istituzioni',
      m3Val: 'International', m3Sub: 'Pratica transfrontaliera', m3Desc: 'USA · Europa · EAU · Globale',
      m4Val: '100%', m4Sub: 'Riservatezza', m4Desc: 'Segreto professionale Rule 1.6',
    },
    fr: {
      m1Val: '15+ ans', m1Sub: 'à New York', m1Desc: 'immersion dans le droit américain',
      m2Val: 'U.S. Citizen', m2Sub: 'Citoyen américain', m2Desc: 'maîtrise des rouages institutionnels',
      m3Val: 'International', m3Sub: 'Pratique transfrontalière', m3Desc: 'USA · Europe · Émirats · International',
      m4Val: '100%', m4Sub: 'Confidentialité', m4Desc: 'Secret professionnel Rule 1.6',
    },
  };
  const m = metrics[currentLang] || metrics.ru;

  const handleOpen = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultation('Иммиграция и Green Card США');
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#000000] border-b border-[#181818] min-h-[540px] lg:min-h-[600px] xl:min-h-[650px] flex flex-col justify-between">
      
      {/* 1. HERO VISUAL BACKGROUND — Luminous, vivid planet and skyline */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft atmospheric golden-blue glow behind the planet for extra depth & vibrance */}
        <div className="absolute top-[28%] left-[46%] -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-amber-400/35 via-blue-400/25 to-transparent blur-[85px] pointer-events-none mix-blend-screen" />

        <div className="absolute inset-0 flex items-center justify-end">
          <img
            src="/images/Hero_zoomed_out_12pct.png"
            alt="V. I. LEVIN - International Legal Solutions"
            className="w-full h-full object-cover object-right contrast-[1.08] brightness-[1.25] saturate-[1.2]"
          />
        </div>

        {/* Cinematic OLED Black scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 via-[35%] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 via-[10%] to-transparent" />
        <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* 2. COMPACT, ELEGANT EDITORIAL CONTENT */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-1.5 sm:pt-2 lg:pt-2.5 pb-6 sm:pb-8 lg:pb-10 w-full z-10">
        
        {/* Noble Pre-Title directly under header aligned to the RIGHT edge */}
        <div className="flex justify-end w-full">
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-mono uppercase tracking-[0.26em] font-semibold bg-black/40 px-3 py-1 rounded-md backdrop-blur-sm border border-white/5 shadow-sm">
            <Scale size={15} className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] shrink-0" />
            <span className="text-[#D4AF37]">{t('hero', 'badge')}</span>
          </div>
        </div>

        {/* Entire content block */}
        <div className="max-w-xl space-y-4 sm:space-y-4.5 mt-20 sm:mt-28 lg:mt-32">
          {/* Majestic Serif Headline in ONE LINE */}
          <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif text-white font-bold leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
            {t('hero', 'title1')}{' '}
            <span className="font-normal italic text-[#FFE29A] drop-shadow-[0_2px_10px_rgba(0,0,0,1)] [text-shadow:_0_2px_8px_rgba(0,0,0,1),_0_0_20px_rgba(0,0,0,0.9)]">
              {t('hero', 'title2')}
            </span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed max-w-lg pt-6 sm:pt-8">
            {t('hero', 'desc')}
          </p>

          {/* Structured 4-Step Action Flow */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 pb-0.5">
            <span className="px-3 py-1.5 rounded-md bg-[#0E1524] border border-[#2B3E5C] text-white font-medium text-xs shadow-md">
              {t('hero', 'flow1')}
            </span>
            <span className="text-[#E5C37A] text-sm font-bold drop-shadow-[0_0_8px_rgba(229,195,122,0.8)]">→</span>
            <span className="px-3 py-1.5 rounded-md bg-[#0E1524] border border-[#2B3E5C] text-white font-medium text-xs shadow-md">
              {t('hero', 'flow2')}
            </span>
            <span className="text-[#E5C37A] text-sm font-bold drop-shadow-[0_0_8px_rgba(229,195,122,0.8)]">→</span>
            <span className="px-3 py-1.5 rounded-md bg-[#0E1524] border border-[#2B3E5C] text-white font-medium text-xs shadow-md">
              {t('hero', 'flow3')}
            </span>
            <span className="text-[#E5C37A] text-sm font-bold drop-shadow-[0_0_8px_rgba(229,195,122,0.8)]">→</span>
            <span className="px-3.5 py-1.5 rounded-md bg-gradient-to-r from-[#D4AF37]/30 to-[#99742B]/30 border border-[#D4AF37] text-[#FFE8A3] font-bold text-xs shadow-[0_0_15px_rgba(212,175,55,0.35)]">
              {t('hero', 'flow4')}
            </span>
          </div>

          {/* Credibility Badge */}
          <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 py-1.5 rounded-md bg-black/85 border border-[#2A2A2A] text-xs text-gray-200 shadow-xl backdrop-blur-md">
            <span className="font-semibold flex items-center gap-1.5 text-white whitespace-nowrap">
              <LuxuryUsaFlag size="sm" />
              <span>{t('hero', 'badgeNy')}</span>
            </span>
            <span className="text-[#D4AF37]/60 font-mono">·</span>
            <span className="text-gold-300 font-medium whitespace-nowrap">{t('hero', 'badgeCitizen')}</span>
            <span className="text-[#D4AF37]/60 font-mono">·</span>
            <span className="text-[#FFE29A] font-semibold whitespace-nowrap">{t('hero', 'badgeLawyer')}</span>
          </div>

          {/* Action Button: Gold Primary CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handleOpen}
              className="w-full sm:w-auto px-6 py-3 rounded-md text-[#080B11] font-bold text-xs tracking-wider uppercase hover:brightness-105 active:scale-[0.98] transition-all shadow-md border border-[#FFE8A3]/50 cursor-pointer shrink-0"
              style={{
                background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
              }}
            >
              {t('hero', 'ctaConsultation')}
            </button>
          </div>
        </div>
      </div>

      {/* 3. COMPACT 4-COLUMN NUMBERS BAR (ANCHORED AT BOTTOM OF FIRST SCREEN) */}
      <div className="border-t border-[#1C1C1C] bg-black/90 backdrop-blur-md relative z-10 py-3 sm:py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            
            <div className="border-r border-[#1C1C1C] last:border-none pr-3">
              <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#D4AF37] font-bold tracking-tight">{m.m1Val}</div>
              <div className="text-xs font-semibold text-white mt-0.5">{m.m1Sub}</div>
              <div className="text-[10.5px] text-gray-400 mt-0.5 font-light">{m.m1Desc}</div>
            </div>

            <div className="border-r border-[#1C1C1C] last:border-none pr-3">
              <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#D4AF37] font-bold tracking-tight">{m.m2Val}</div>
              <div className="text-xs font-semibold text-white mt-0.5">{m.m2Sub}</div>
              <div className="text-[10.5px] text-gray-400 mt-0.5 font-light">{m.m2Desc}</div>
            </div>

            <div className="border-r border-[#1C1C1C] last:border-none pr-3">
              <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#D4AF37] font-bold tracking-tight">{m.m3Val}</div>
              <div className="text-xs font-semibold text-white mt-0.5">{m.m3Sub}</div>
              <div className="text-[10.5px] text-gray-400 mt-0.5 font-light">{m.m3Desc}</div>
            </div>

            <div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-serif text-[#D4AF37] font-bold tracking-tight">{m.m4Val}</div>
              <div className="text-xs font-semibold text-white mt-0.5">{m.m4Sub}</div>
              <div className="text-[10.5px] text-gray-400 mt-0.5 font-light">{m.m4Desc}</div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
};

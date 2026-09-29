'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Shield, 
  CheckCircle2, 
  ArrowRight,
  FileCheck,
  Send
} from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useConsultation } from '@/context/ConsultationContext';
import { useLanguage } from '@/context/LanguageContext';

export const GreenCardSpecial: React.FC = () => {
  const { openConsultation } = useConsultation();
  const { t, currentLang } = useLanguage();

  const usPracticeCards = [
    {
      code: t('greenCard', 'gc1Code') || '#GREEN CARD',
      title: t('greenCard', 'c1Title'),
      desc: t('greenCard', 'c1Desc'),
      href: '/usa/green-card',
      image: '/images/gc-card-greencard-v1.jpg',
      tag: t('greenCard', 'c1Tag'),
      tagColor: 'bg-gold-500/20 text-[#FFE8A3] border-[#FFE8A3]/30',
      highlight: false,
    },
    {
      code: t('greenCard', 'gc2Code') || '#CITIZENSHIP',
      title: t('greenCard', 'c2Title'),
      desc: t('greenCard', 'c2Desc'),
      href: '/usa',
      image: '/images/gc-card-citizenship-v2.jpg',
      tag: t('greenCard', 'c2Tag'),
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      highlight: true,
    },
    {
      code: t('greenCard', 'gc3Code') || '#CIVICS TEST',
      title: t('greenCard', 'c3Title'),
      desc: t('greenCard', 'c3Desc'),
      href: '/usa/immigration-test',
      image: '/images/gc-card-civics-cards.jpg',
      tag: t('greenCard', 'c3Tag'),
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      highlight: false,
    },
    {
      code: t('greenCard', 'gc4Code') || '#USCIS INTERVIEW',
      title: t('greenCard', 'c4Title'),
      desc: t('greenCard', 'c4Desc'),
      href: '/usa/interview',
      image: '/images/gc-card-interview-v1.jpg',
      tag: t('greenCard', 'c4Tag'),
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      highlight: false,
    },
    {
      code: t('greenCard', 'gc5Code') || '#N-400 AUDIT',
      title: t('greenCard', 'c5Title'),
      desc: t('greenCard', 'c5Desc'),
      href: '/usa',
      image: '/images/gc-card-n400-v1.jpg',
      tag: t('greenCard', 'c5Tag'),
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      highlight: false,
    },
    {
      code: t('greenCard', 'gc6Code') || '#STRATEGY',
      title: t('greenCard', 'c6Title'),
      desc: t('greenCard', 'c6Desc'),
      href: '/contacts',
      image: '/images/gc-card-strategy-v3.jpg',
      tag: t('greenCard', 'c6Tag'),
      tagColor: 'bg-gold-500/20 text-[#FFE8A3] border-[#FFE8A3]/30',
      highlight: true,
    },
  ];

  // 7-Stage US Citizenship Preparation Process (No leading zeros)
  const citizenshipStages = [
    {
      step: '1',
      title: t('greenCard', 's1Title'),
      desc: t('greenCard', 's1Desc'),
    },
    {
      step: '2',
      title: t('greenCard', 's2Title'),
      desc: t('greenCard', 's2Desc'),
    },
    {
      step: '3',
      title: t('greenCard', 's3Title'),
      desc: t('greenCard', 's3Desc'),
    },
    {
      step: '4',
      title: t('greenCard', 's4Title'),
      desc: t('greenCard', 's4Desc'),
    },
    {
      step: '5',
      title: t('greenCard', 's5Title'),
      desc: t('greenCard', 's5Desc'),
    },
    {
      step: '6',
      title: t('greenCard', 's6Title'),
      desc: t('greenCard', 's6Desc'),
    },
    {
      step: '7',
      title: t('greenCard', 's7Title'),
      desc: t('greenCard', 's7Desc'),
    },
  ];

  const learnMoreText =
    currentLang === 'en'
      ? 'Learn more'
      : currentLang === 'uk'
      ? 'Дізнатися більше'
      : currentLang === 'es'
      ? 'Más información'
      : currentLang === 'it'
      ? 'Maggiori dettagli'
      : currentLang === 'fr'
      ? 'En savoir plus'
      : 'Узнать подробнее';

  const tgReviewText =
    currentLang === 'en'
      ? 'Telegram Review'
      : currentLang === 'uk'
      ? 'Telegram-аналіз'
      : currentLang === 'es'
      ? 'Consulta por Telegram'
      : currentLang === 'it'
      ? 'Analisi Telegram'
      : currentLang === 'fr'
      ? 'Audit Telegram'
      : 'Telegram-разбор';

  return (
    <section className="relative bg-[#04060C] scroll-mt-20 pt-14 pb-20 lg:pt-16 lg:pb-24 border-t border-b border-[#1A2538] overflow-hidden" id="greencard">
      {/* Background with user's Passport.jpg from Downloads */}
      <div className="absolute top-0 left-0 right-0 h-[580px] lg:h-[640px] pointer-events-none overflow-hidden select-none">
        <img
          src="/images/user-passport-bg.jpg"
          alt="Official US Passport"
          className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-90 contrast-[1.08] brightness-[0.98]"
        />
        {/* Dark vignette gradient on the left to make text 100% crisp and readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060C] via-[#04060C]/80 via-45% to-transparent" />
        {/* Smooth bottom fade into the dark section cards */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04060C] via-[#04060C]/85 to-transparent" />
        {/* Top ambient soft tint */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#04060C]/60 to-transparent" />
      </div>

      {/* Dynamic ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-gradient-to-b from-blue-900/15 via-transparent to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block — Headline, description, and trust markers */}
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-7 space-y-4">
            {/* Badge on its own line higher up with generous breathing room to the text below */}
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0E1624]/90 backdrop-blur-md border border-gold-500/50 text-gold-300 text-[11px] font-mono uppercase tracking-[0.2em] shadow-lg shadow-black/60">
                <LuxuryUsaFlag size="xs" />
                <span>{t('greenCard', 'badge')}</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight drop-shadow-md">
              {t('greenCard', 'title1')} <br />
              <span className="text-[#FFE29A] italic font-normal drop-shadow-[0_2px_12px_rgba(255,226,154,0.3)]">
                {t('greenCard', 'title2')}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed max-w-xl drop-shadow-sm">
              {t('greenCard', 'desc')}
            </p>

            <div className="pt-2">
              <button
                onClick={() => openConsultation('Иммиграция и Green Card США')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#DFBA73] hover:bg-[#cfab5b] text-[#080B11] font-bold text-xs tracking-wider uppercase hover:brightness-105 active:scale-[0.98] transition-all shadow-md border border-[#FFE8A3]/40 cursor-pointer"
              >
                <FileCheck size={15} />
                <span>{t('greenCard', 'ctaAudit')}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean area framing the authentic US Passport on dark wood */}
          <div className="lg:col-span-5 hidden lg:block min-h-[260px] pointer-events-none" />
        </div>

        {/* 6 USA Product Cards Grid — 15% narrower */}
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {usPracticeCards.map((card) => {
            return (
              <Link
                key={card.code}
                href={card.href}
                className="group relative rounded-md bg-[#090E1A] border border-[#1A2840] hover:border-[#2B3F63] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col justify-between hover:-translate-y-[3.8px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.6)] transform-gpu backface-hidden will-change-transform"
              >
                {/* Photographic Cover — Clear, crisp, scaled proportionally */}
                <div className="relative h-44 w-full overflow-hidden bg-black border-b border-[#1A2840]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.03]"
                  />
                  
                  {/* Top Hashtag: Luminous Light Champagne Gold Tone */}
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#050810]/90 border border-[#FFE8A3]/30 text-[#FFE8A3] uppercase tracking-wider backdrop-blur-md shadow-sm font-semibold">
                      {card.code}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-[19px] font-serif font-bold text-white group-hover:text-gold-200 transition-colors leading-snug drop-shadow-sm">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-gray-300 font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  {/* Bottom link: Expressive font-serif typography & matching champagne tone */}
                  <div className="pt-3 border-t border-[#141F32] flex items-center justify-between text-[#FFE8A3] group-hover:text-white transition-colors">
                    <span className="text-[12.5px] font-serif tracking-[0.07em] font-semibold uppercase">{learnMoreText}</span>
                    <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out text-[#FFE8A3] group-hover:text-white" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 7-Stage US Citizenship Preparation Strip — 15% narrower */}
        <div className="max-w-[1060px] mx-auto rounded-md bg-[#080D18] border border-gold-500/30 p-6 lg:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A2942] pb-4">
            <div>
              <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                CIVICS & N-400 METHODOLOGY
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                {t('greenCard', 'stageTitle')}
              </h3>
            </div>
            <div className="text-xs text-gray-400 max-w-sm font-light">
              Analyze → Pre-audit → Stress Interview → Oath Ceremony
            </div>
          </div>

          {/* Вариант 2: Ромбовидный трек (центрированный, без нулей) */}
          <div className="relative pt-2">
            <div className="hidden lg:block absolute top-10 left-10 right-10 h-[1px] bg-gradient-to-r from-gold-500/10 via-gold-500/40 to-gold-500/10 pointer-events-none z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative z-10">
              {citizenshipStages.map((stg) => (
                <div
                  key={stg.step}
                  className="p-4 rounded-md bg-[#0A101C] border border-[#18263B] hover:border-[#283e60] transition-all duration-200 ease-out group flex flex-col items-center text-center shadow-md hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rotate-45 flex items-center justify-center bg-[#070B14] border border-gold-400/80 mb-4 shadow-[0_0_12px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-all shrink-0">
                    <span className="-rotate-45 font-mono font-black text-xs text-gold-300">
                      {stg.step}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-gray-100 group-hover:text-gold-300 transition-colors mb-1.5 leading-snug">
                    {stg.title}
                  </div>
                  <div className="text-[11px] text-gray-400 font-light leading-snug">
                    {stg.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

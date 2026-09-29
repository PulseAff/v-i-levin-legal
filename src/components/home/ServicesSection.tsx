'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useSiteTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export const ServicesSection: React.FC = () => {
  const { currentTheme } = useSiteTheme();
  const { t, currentLang } = useLanguage();

  const practices = [
    {
      title: t('services', 'c1Title'),
      code: t('services', 'c1Code'),
      desc: t('services', 'c1Desc'),
      image: '/images/card-usa-v2.jpg',
      href: '/usa/green-card',
      highlight: true,
      num: '01',
    },
    {
      title: t('services', 'c2Title'),
      code: t('services', 'c2Code'),
      desc: t('services', 'c2Desc'),
      image: '/images/card-biz-v1.jpg',
      href: '/services/business',
      num: '02',
    },
    {
      title: t('services', 'c3Title'),
      code: t('services', 'c3Code'),
      desc: t('services', 'c3Desc'),
      image: '/images/card-wealth-obsidian.jpg',
      href: '/services/legal-consultation',
      num: '03',
    },
    {
      title: t('services', 'c4Title'),
      code: t('services', 'c4Code'),
      desc: t('services', 'c4Desc'),
      image: '/images/card-arb-v2.jpg',
      href: '/services/representation',
      num: '04',
    },
    {
      title: t('services', 'c5Title'),
      code: t('services', 'c5Code'),
      desc: t('services', 'c5Desc'),
      image: '/images/card-audit-modern.jpg',
      href: '/services/legal-consultation',
      num: '05',
    },
    {
      title: t('services', 'c6Title'),
      code: t('services', 'c6Code'),
      desc: t('services', 'c6Desc'),
      image: '/images/card-strat-v2.jpg',
      href: '/contacts',
      num: '06',
    },
  ];

  const exploreText =
    currentLang === 'en'
      ? 'Explore practice'
      : currentLang === 'uk'
      ? 'Перейти до напрямку'
      : currentLang === 'es'
      ? 'Ver área de práctica'
      : currentLang === 'it'
      ? 'Dettagli pratica'
      : currentLang === 'fr'
      ? 'Consulter la pratique'
      : 'Перейти к направлению';

  const flagshipBadge =
    currentLang === 'en'
      ? 'Flagship'
      : currentLang === 'uk'
      ? 'Флагман'
      : currentLang === 'es'
      ? 'Principal'
      : currentLang === 'it'
      ? 'Di punta'
      : currentLang === 'fr'
      ? 'Excellence'
      : 'Флагман';

  return (
    <section className="relative py-16 lg:py-20 bg-[#05070E] border-b border-[#1A2538] overflow-hidden" id="services">
      {/* Ambient backdrop glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[140px] pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle, ${currentTheme.accentGold} 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-[1060px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight">
              {t('services', 'title1')}{' '}
              <span className="font-normal italic text-[#FFE29A] drop-shadow-[0_2px_10px_rgba(255,226,154,0.25)]">
                {t('services', 'title2')}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              {t('services', 'desc')}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0D1524] hover:bg-[#162238] text-gray-200 hover:text-white border border-[#23334A] hover:border-[#334664] text-xs font-semibold uppercase tracking-wider transition-all shadow-md shrink-0 self-start lg:self-end"
          >
            <span>{t('services', 'btnAll')}</span>
            <ArrowRight size={14} className="text-gold-400" />
          </Link>
        </div>

        {/* Clean, Editorial 6-Card Grid (15% narrower) */}
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {practices.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative rounded-md bg-[#090E1A] border border-[#1A2840] hover:border-[#2B3F63] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col justify-between hover:-translate-y-[3.8px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.6)] transform-gpu backface-hidden will-change-transform"
            >
              {/* Image Container — Clear, crisp, scaled proportionally */}
              <div className="relative h-44 w-full overflow-hidden bg-black border-b border-[#1A2840]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.03]"
                />
                
                {/* Top Badges: Luminous Light Champagne Gold Tone */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md bg-[#070B14]/90 border border-[#FFE8A3]/30 text-[10px] font-mono font-semibold text-[#FFE8A3] uppercase tracking-wider backdrop-blur-md shadow-sm">
                    {item.code}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="text-lg sm:text-[19px] font-serif font-bold text-white group-hover:text-gold-200 transition-colors leading-snug drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-300 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom link: Expressive font-serif typography & matching champagne tone */}
                <div className="pt-3 border-t border-[#141F32] flex items-center justify-between text-[#FFE8A3] group-hover:text-white transition-colors">
                  <span className="text-[12.5px] font-serif tracking-[0.07em] font-semibold uppercase">{exploreText}</span>
                  <ArrowRight size={15} className="transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out text-[#FFE8A3] group-hover:text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

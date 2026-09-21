'use client';

import React, { useState } from 'react';
import { Globe2, ShieldCheck, Award, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useSiteTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { currentTheme } = useSiteTheme();
  const { t } = useLanguage();

  const pillars = [
    {
      roman: 'I',
      num: '01',
      icon: Award,
      title: t('about', 'p1Title'),
      desc: t('about', 'p1Desc'),
      note: t('about', 'p1Note'),
    },
    {
      roman: 'II',
      num: '02',
      icon: Lock,
      title: t('about', 'p2Title'),
      desc: t('about', 'p2Desc'),
      note: t('about', 'p2Note'),
    },
    {
      roman: 'III',
      num: '03',
      icon: Globe2,
      title: t('about', 'p3Title'),
      desc: t('about', 'p3Desc'),
      note: t('about', 'p3Note'),
    },
    {
      roman: 'IV',
      num: '04',
      icon: ShieldCheck,
      title: t('about', 'p4Title'),
      desc: t('about', 'p4Desc'),
      note: t('about', 'p4Note'),
    },
  ];

  return (
    <section className="relative bg-[#050811] py-10 lg:py-14 border-b border-[#1A2538] overflow-hidden" id="about">
      {/* Background Transnational Map — natural scale across full section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/images/user-transnational-bg.jpg"
          alt="Transnational Legal Matrix"
          className="w-full h-full object-cover object-[70%_center] lg:object-[65%_center] opacity-80 contrast-[1.06] brightness-[1.02]"
        />
        {/* Soft atmospheric gradient: deep obsidian on the left for maximum text contrast, fading out to reveal the glowing global hubs on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/92 via-40% to-[#050811]/20 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050811] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050811] to-transparent" />
      </div>

      {/* Dynamic ambient gold glow */}
      <div 
        className="absolute top-1/2 right-1/4 w-[350px] h-[350px] blur-[130px] pointer-events-none opacity-15"
        style={{
          background: `radial-gradient(circle, ${currentTheme.accentGold} 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Lead & Compact 2x2 Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-white font-bold tracking-tight leading-tight">
                {t('about', 'title1')}{' '}
                <span 
                  className="font-normal italic transition-colors duration-500"
                  style={{ color: currentTheme.accentGold }}
                >
                  {t('about', 'title2')}
                </span>
              </h2>

              <p className="mt-2 text-xs sm:text-[13.5px] text-gray-300 font-light leading-relaxed max-w-2xl">
                {t('about', 'desc')}
              </p>
            </div>

            {/* Compact 2x2 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {pillars.map((p) => {
                const Icon = p.icon;
                return (
                  <div 
                    key={p.num} 
                    className="p-3.5 sm:p-4 rounded-xl bg-[#080D18]/90 backdrop-blur-md border border-[#1A2840] border-l-2 border-l-gold-500/70 hover:border-l-gold-400 hover:border-[#223552] hover:bg-[#0C1526] transition-all duration-300 space-y-2 shadow-lg group hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-gold-400 font-bold text-xs tracking-wider">
                          {p.roman}.
                        </span>
                        <h4 className="text-xs sm:text-[13px] font-medium text-white group-hover:text-gold-200 transition-colors leading-snug">
                          {p.title}
                        </h4>
                      </div>
                      <div className="w-6 h-6 rounded-md bg-[#0F1728] border border-[#22354E] flex items-center justify-center text-gold-300 group-hover:border-gold-500/40 shrink-0">
                        <Icon size={12} />
                      </div>
                    </div>

                    <p className="text-[11px] text-gray-300/90 font-light leading-relaxed">
                      {p.desc}
                    </p>

                    <div className="pt-1.5 border-t border-[#141F32] flex items-center gap-1.5 text-[9.5px] font-mono text-gold-400/80">
                      <span className="w-1 h-1 rounded-full bg-gold-400/80" />
                      <span>{p.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-[11.5px] font-mono text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider group"
              >
                <span>{t('about', 'linkMore')}</span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Natural open viewport for Transnational Map hubs */}
          <div className="lg:col-span-4 hidden lg:block min-h-[360px] pointer-events-none" />

        </div>
      </div>
    </section>
  );
};

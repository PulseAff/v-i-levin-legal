'use client';

import React from 'react';
import Link from 'next/link';
import { Globe2, ShieldCheck, ArrowRight, Landmark, Compass, Sparkles } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useSiteTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export const CountriesSection: React.FC = () => {
  const { currentTheme } = useSiteTheme();
  const { t } = useLanguage();

  const primaryHubs = [
    {
      country: t('countries', 'hub1Name'),
      code: 'USA · FEDERAL',
      flagComponent: <LuxuryUsaFlag size="sm" />,
      system: t('countries', 'hub1System'),
      desc: t('countries', 'hub1Desc'),
      badge: t('countries', 'hub1Badge'),
      badgeColor: 'bg-gold-500/15 text-gold-300 border-gold-500/40 shadow-sm',
      corridor: t('countries', 'hub1Corridor'),
    },
    {
      country: t('countries', 'hub2Name'),
      code: 'UAE · DIFC',
      flagUrl: '/images/flags/ae.svg',
      system: t('countries', 'hub2System'),
      desc: t('countries', 'hub2Desc'),
      badge: t('countries', 'hub2Badge'),
      badgeColor: 'bg-emerald-950/50 text-emerald-300 border-emerald-500/40 shadow-sm',
      corridor: t('countries', 'hub2Corridor'),
    },
    {
      country: t('countries', 'hub3Name'),
      code: 'UK · COMMON LAW',
      flagUrl: '/images/flags/gb.svg',
      system: t('countries', 'hub3System'),
      desc: t('countries', 'hub3Desc'),
      badge: t('countries', 'hub3Badge'),
      badgeColor: 'bg-blue-950/50 text-sky-300 border-sky-500/40 shadow-sm',
      corridor: t('countries', 'hub3Corridor'),
    },
    {
      country: t('countries', 'hub4Name'),
      code: 'EU · CIVIL LAW',
      flagUrl: '/images/flags/eu.svg',
      system: t('countries', 'hub4System'),
      desc: t('countries', 'hub4Desc'),
      badge: t('countries', 'hub4Badge'),
      badgeColor: 'bg-indigo-950/50 text-indigo-200 border-indigo-500/40 shadow-sm',
      corridor: t('countries', 'hub4Corridor'),
    },
  ];

  const corridors = [
    { from: 'США', to: 'Европейский Союз', focus: 'Релокация бизнеса, двойное налогообложение, трансграничные соглашения' },
    { from: 'США', to: 'ОАЭ (DIFC)', focus: 'Холдинговые структуры, защита активов, венчурный капитал' },
    { from: 'США', to: 'СНГ / Грузия', focus: 'Смена статуса, визы талантов, подтверждение легальности капитала' },
    { from: 'Великобритания', to: 'США', focus: 'Синхронизация английского и американского корпоративного права' },
  ];

  return (
    <section className="relative bg-[#05070E] py-14 lg:py-20 border-b border-[#1A2538] overflow-hidden" id="countries">
      {/* Background with Diplomatic International Flags */}
      <div className="absolute top-0 left-0 right-0 h-[520px] lg:h-[600px] pointer-events-none overflow-hidden select-none">
        <img
          src="/images/countries-flags-bg.jpg"
          alt="International Diplomatic Flags"
          className="w-full h-full object-cover object-center opacity-65 contrast-[1.08] brightness-[0.92]"
        />
        {/* Dark radial and gradient overlays to keep text and cards 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05070E] via-[#05070E]/85 via-45% to-[#05070E]/70" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#05070E] via-[#05070E]/90 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#05070E]/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0D1524] border border-gold-500/35 text-gold-300 text-[11px] font-mono uppercase tracking-[0.2em] shadow-md">
              <Globe2 size={13} className="text-gold-400" />
              <span>{t('countries', 'badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight">
              {t('countries', 'title1')}{' '}
              <span className="font-normal italic text-[#FFE29A] drop-shadow-[0_2px_10px_rgba(255,226,154,0.25)]">
                {t('countries', 'title2')}
              </span>
            </h2>

            <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
              {t('countries', 'desc')}
            </p>
          </div>

          <Link
            href="/countries"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0D1524] hover:bg-[#162238] text-gray-200 hover:text-white border border-[#23334A] hover:border-[#334664] text-xs font-semibold uppercase tracking-wider transition-all shadow-md shrink-0 self-start lg:self-end"
          >
            <span>{t('countries', 'btnAll')}</span>
            <ArrowRight size={14} className="text-gold-400" />
          </Link>
        </div>

        {/* 4 Main Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {primaryHubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-md bg-gradient-to-b from-[#0A1120] to-[#060A14] border border-[#1A2840] hover:border-[#2F4468] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[3.8px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.65)] flex flex-col justify-between group space-y-3.5 transform-gpu backface-hidden will-change-transform"
            >
              <div>
                {/* 1. Top Meta Header: Status & Legal Badge */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-[0_0_6px_rgba(223,186,115,0.8)]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-semibold">
                      {hub.code}
                    </span>
                  </div>
                  <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded border ${hub.badgeColor}`}>
                    {hub.badge}
                  </span>
                </div>

                {/* 2. Flag + Country Title: Clean 1-line alignment */}
                <div className="flex items-center gap-2.5 h-8">
                  {hub.flagComponent || (
                    <span className="w-5 h-3.5 inline-flex items-center justify-center shrink-0 rounded-sm overflow-hidden shadow-sm border border-white/20 bg-[#0D1524]">
                      <img src={hub.flagUrl} alt={hub.country} className="w-full h-full object-cover" />
                    </span>
                  )}
                  <h3 className="font-serif font-bold text-white text-[17px] group-hover:text-gold-200 transition-colors leading-none truncate">
                    {hub.country}
                  </h3>
                </div>

                {/* 3. Legal System Subtitle: Fixed height baseline */}
                <div className="h-8 flex items-center my-1.5 border-t border-b border-white/[0.04]">
                  <p className="text-[10.5px] font-mono text-gold-400/90 uppercase tracking-wider line-clamp-1">
                    {hub.system}
                  </p>
                </div>

                {/* 4. Description: Clean aligned block */}
                <p className="text-xs text-gray-300 font-light leading-relaxed min-h-[66px] line-clamp-4 pt-1">
                  {hub.desc}
                </p>
              </div>

              {/* 5. Corridor Footer */}
              <div className="pt-3 border-t border-[#162338] flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span className="uppercase tracking-wider text-gray-500">{t('countries', 'corridorLabel')}</span>
                <span className="text-gold-300 font-semibold">{hub.corridor}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Border Legal Corridors Strip */}
        <div className="rounded-md bg-[#080E1A] border border-[#1C2C45] p-6 lg:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#16243A] pb-4">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-gold-400" />
              <h3 className="text-base sm:text-lg font-serif font-bold text-white">
                Ключевые трансграничные правовые коридоры
              </h3>
            </div>
            <span className="text-[11px] font-mono text-gray-400">
              CROSS-BORDER PROTOCOLS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {corridors.map((c, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md bg-[#050810] border border-[#141F32] hover:border-[#22334c] transition-all duration-200 ease-out space-y-2"
              >
                <div className="text-xs font-bold text-white font-mono flex items-center gap-2">
                  <span className="text-gold-400">{c.from}</span>
                  <span className="text-gray-500">⇄</span>
                  <span className="text-gold-300">{c.to}</span>
                </div>
                <p className="text-[11px] text-gray-300 font-light leading-relaxed">
                  {c.focus}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

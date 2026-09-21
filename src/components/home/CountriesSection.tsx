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
      flagComponent: <LuxuryUsaFlag size="md" />,
      system: t('countries', 'hub1System'),
      desc: t('countries', 'hub1Desc'),
      badge: t('countries', 'hub1Badge'),
      badgeColor: 'bg-gold-500/20 text-gold-300 border-gold-500/40',
      corridor: t('countries', 'hub1Corridor'),
    },
    {
      country: t('countries', 'hub2Name'),
      flagUrl: '/images/flags/ae.svg',
      system: t('countries', 'hub2System'),
      desc: t('countries', 'hub2Desc'),
      badge: t('countries', 'hub2Badge'),
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      corridor: t('countries', 'hub2Corridor'),
    },
    {
      country: t('countries', 'hub3Name'),
      flagUrl: '/images/flags/gb.svg',
      system: t('countries', 'hub3System'),
      desc: t('countries', 'hub3Desc'),
      badge: t('countries', 'hub3Badge'),
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      corridor: t('countries', 'hub3Corridor'),
    },
    {
      country: t('countries', 'hub4Name'),
      flagUrl: '/images/flags/eu.svg',
      system: t('countries', 'hub4System'),
      desc: t('countries', 'hub4Desc'),
      badge: t('countries', 'hub4Badge'),
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
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
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0D1524] border border-gold-500/35 text-gold-300 text-[11px] font-mono uppercase tracking-[0.2em] shadow-md">
              <Globe2 size={13} className="text-gold-400" />
              <span>{t('countries', 'badge')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight">
              {t('countries', 'title1')}{' '}
              <span 
                className="font-normal italic transition-colors duration-500"
                style={{ color: currentTheme.accentGold }}
              >
                {t('countries', 'title2')}
              </span>
            </h2>

            <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
              {t('countries', 'desc')}
            </p>
          </div>

          <Link
            href="/countries"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D1524] hover:bg-[#162238] text-gray-200 hover:text-white border border-[#23334A] hover:border-gold-500/50 text-xs font-semibold uppercase tracking-wider transition-all shadow-md shrink-0 self-start lg:self-end"
          >
            <span>{t('countries', 'btnAll')}</span>
            <ArrowRight size={14} className="text-gold-400" />
          </Link>
        </div>

        {/* 4 Main Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {primaryHubs.map((hub, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-[#0A1120] to-[#060A14] border border-[#1A2840] hover:border-gold-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {hub.flagComponent || (
                      <span className="w-6 h-4 inline-flex items-center justify-center shrink-0 rounded-sm overflow-hidden shadow-sm border border-white/20 bg-[#0D1524]">
                        <img src={hub.flagUrl} alt={hub.country} className="w-full h-full object-cover" />
                      </span>
                    )}
                    <span className="font-serif font-bold text-white text-lg group-hover:text-gold-300 transition-colors">
                      {hub.country}
                    </span>
                  </div>
                  <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded-full border ${hub.badgeColor}`}>
                    {hub.badge}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-gold-400/80 uppercase tracking-wider">
                  {hub.system}
                </div>

                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {hub.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#162338] flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>{t('countries', 'corridorLabel')}</span>
                <span className="text-gold-300 font-semibold">{hub.corridor}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cross-Border Legal Corridors Strip */}
        <div className="rounded-2xl bg-[#080E1A] border border-[#1C2C45] p-6 lg:p-8 space-y-5 shadow-2xl">
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
                className="p-4 rounded-xl bg-[#050810] border border-[#141F32] hover:border-gold-500/40 transition-colors space-y-2"
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

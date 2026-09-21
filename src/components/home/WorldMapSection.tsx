'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, ArrowUpRight, Shield } from 'lucide-react';
import { countriesData } from '@/data/countriesData';

export const WorldMapSection: React.FC = () => {
  const [activeCode, setActiveCode] = useState<string>('usa');
  const activeCountry = countriesData.find((c) => c.code === activeCode) || countriesData[0];

  return (
    <section className="py-20 lg:py-28 bg-navy-950 border-b border-surface-border" id="countries">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
            География практики
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold">
            Страны и юрисдикции
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-2">
            Юридическая поддержка в ведущих финансовых и миграционных центрах мира. Точечная работа с реальной правовой компетенцией.
          </p>
        </div>

        {/* Country Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {countriesData.map((country) => (
            <button
              key={country.code}
              onClick={() => setActiveCode(country.code)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeCode === country.code
                  ? 'bg-gold-500 text-navy-950 font-semibold shadow-gold-sm'
                  : 'bg-navy-900 text-gray-300 hover:text-white hover:bg-navy-850 border border-surface-border'
              }`}
            >
              <span className="text-base">{country.flag}</span>
              <span>{country.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Active Country Detail Showcase */}
        <div className="bg-navy-900 border border-gold-500/30 rounded-2xl p-6 lg:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeCountry.flag}</span>
                <div>
                  <h3 className="text-2xl font-serif text-white font-bold">
                    {activeCountry.name}
                  </h3>
                  <span className="text-xs text-gold-400 uppercase tracking-wider font-semibold">
                    {activeCountry.region} • Столица: {activeCountry.capital}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {activeCountry.shortOverview}
              </p>

              <div>
                <h4 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">
                  Ключевые направления анализа:
                </h4>
                <ul className="space-y-1.5">
                  {activeCountry.scopeAnalysis.map((scope, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-gold-500 font-bold mt-0.5">•</span>
                      <span>{scope}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 bg-navy-950 border border-surface-border rounded text-[11px] text-gray-400 flex items-start gap-2.5">
                <Shield size={16} className="text-gold-500 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gray-200">Процессуальное разграничение:</strong> {activeCountry.localCounselRequirement}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between h-full bg-navy-950/80 p-6 rounded-xl border border-surface-border space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                  Фокусные практики в регионе
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeCountry.keyPracticeAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded bg-navy-850 border border-gold-500/20 text-gold-300 text-xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs text-gray-400">
                  Нужен разбор вопроса в юрисдикции <strong className="text-white">{activeCountry.name}</strong>?
                </div>
                <Link
                  href={`/countries/${activeCountry.code}`}
                  className="w-full py-3 px-4 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold tracking-wider uppercase rounded hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>Полный профиль юрисдикции</span>
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { countriesData } from '@/data/countriesData';
import { ArrowUpRight, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Страны и юрисдикции практики | V. I. LEVIN',
  description: 'География юридической практики V. I. LEVIN: правовая помощь в США, Германии, ОАЭ, Грузии, Турции, на Кипре.',
};

export default function CountriesPage() {
  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
            География и компетенция
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Страны и юрисдикции
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Мы не создаем сотни пустых страниц. Каждая представленная юрисдикция опирается на подтвержденный практический опыт, четкие границы компетенции и партнерство с местными лицензированными адвокатами.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countriesData.map((country) => (
            <div
              key={country.code}
              className="bg-navy-900 border border-surface-border hover:border-gold-500/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{country.flag}</span>
                  <span className="text-[10px] text-gold-400 uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-navy-850 border border-gold-500/20">
                    {country.region}
                  </span>
                </div>

                <h2 className="text-xl font-serif text-white font-bold group-hover:text-gold-300 transition-colors mb-2">
                  {country.name}
                </h2>

                <p className="text-xs text-gray-400 font-light leading-relaxed mb-4 line-clamp-3">
                  {country.shortOverview}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {country.keyPracticeAreas.slice(0, 3).map((area, idx) => (
                    <span key={idx} className="text-[10px] text-gray-300 px-2 py-0.5 rounded bg-navy-950 border border-surface-border">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">Столица: {country.capital}</span>
                <Link
                  href={`/countries/${country.code}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 group-hover:text-gold-300 transition-colors"
                >
                  Юрисдикция <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

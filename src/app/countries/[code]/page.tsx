import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { countriesData } from '@/data/countriesData';
import { Shield, CheckCircle2, ArrowRight, MessageSquare, ChevronDown } from 'lucide-react';

interface PageProps {
  params: { code: string };
}

export function generateStaticParams() {
  return countriesData.map((c) => ({ code: c.code }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const country = countriesData.find((c) => c.code === params.code);
  if (!country) return { title: 'Страна не найдена' };

  return {
    title: `Юрисдикция ${country.name} | V. I. LEVIN Practice`,
    description: country.shortOverview,
  };
}

export default function CountryDetailPage({ params }: PageProps) {
  const country = countriesData.find((c) => c.code === params.code);
  if (!country) notFound();

  return (
    <div className="py-12 lg:py-20 bg-navy-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <Link href="/countries" className="hover:text-gray-300">Страны</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">{country.name}</span>
        </nav>

        <div className="space-y-4 border-b border-surface-border pb-8">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold">
                {country.name}
              </h1>
              <p className="text-xs text-gold-400 uppercase tracking-wider font-semibold">
                {country.region} • Столица: {country.capital}
              </p>
            </div>
          </div>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light max-w-3xl">
            {country.shortOverview}
          </p>
        </div>

        {/* Scope of practice */}
        <div className="bg-navy-900 border border-surface-border rounded-md p-6 lg:p-8 space-y-4">
          <h2 className="text-xl font-serif text-white font-bold">
            Какие вопросы мы анализируем и сопровождаем
          </h2>
          <ul className="space-y-3">
            {country.scopeAnalysis.map((scope, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 font-light">
                <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
                <span>{scope}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Procedural Boundary / Local counsel notice */}
        <div className="p-5 rounded-md bg-navy-900 border border-gold-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-400 uppercase tracking-wider">
            <Shield size={16} /> Профессиональное разграничение полномочий
          </div>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            {country.localCounselRequirement}
          </p>
        </div>

        {/* FAQs */}
        {country.faq && country.faq.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white font-bold">
              Вопросы по юрисдикции {country.name}
            </h2>
            <div className="space-y-3">
              {country.faq.map((item, idx) => (
                <div key={idx} className="p-5 rounded-md bg-navy-900 border border-surface-border space-y-2">
                  <h3 className="text-sm font-serif text-white font-semibold">{item.q}</h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-8 rounded-md bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 space-y-3">
          <h3 className="text-xl font-serif text-white font-bold">
            Нужна помощь по праву {country.name}?
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Опишите обстоятельства задачи. Мы оценим трансграничные коллизии и поможем найти оптимальное решение.
          </p>
          <div className="pt-2">
            <a
              href={`https://t.me/VILEVIN_bot?start=country_${country.code}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DFBA73] hover:bg-[#cfab5b] text-[#080B11] text-xs font-bold uppercase tracking-wider rounded-md border border-[#FFE8A3]/40 shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageSquare size={15} /> Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

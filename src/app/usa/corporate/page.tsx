import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Building2, FileCheck, ArrowRight } from 'lucide-react';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

export const metadata: Metadata = {
  title: 'Регистрация Delaware C-Corp для нерезидентов | Договоры SAFE | V. I. LEVIN',
  description: 'Юридическое сопровождение стартапов в США: инкорпорация Delaware C-Corp, выпуск акций фаундеров, выборы 83(b), оформление инвестиций SAFE и передача интеллектуальной собственности.',
  alternates: {
    canonical: 'https://vilevin.com/usa/corporate/',
  },
};

export default function UsaCorporatePage() {
  return (
    <div className="py-12 lg:py-20 bg-navy-950 text-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <Link href="/usa" className="hover:text-gray-300">США</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">Delaware C-Corp & SAFE</span>
        </nav>

        <header className="space-y-4 border-b border-surface-border pb-8">
          <span className="px-3 py-1 rounded-md bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-semibold uppercase tracking-wider">
            Корпоративная практика США
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
            Инкорпорация Delaware C-Corp и юридическое сопровождение сделок SAFE
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Структурирование американских юридических лиц для международных фаундеров, привлечение венчурных раундов и защита долей основателей.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-md bg-navy-900 border border-surface-border space-y-3">
            <Building2 className="text-gold-400" size={28} />
            <h3 className="text-lg font-serif text-white font-semibold">Delaware C-Corp «под ключ»</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Подготовка Certificate of Incorporation, Bylaws, Action of Incorporator, назначение директоров и выпуск акций основателей.
            </p>
          </div>
          <div className="p-6 rounded-md bg-navy-900 border border-surface-border space-y-3">
            <FileCheck className="text-gold-400" size={28} />
            <h3 className="text-lg font-serif text-white font-semibold">Договоры SAFE (Y Combinator)</h3>
            <p className="text-xs text-gray-400 leading-relaxed font-light">
              Составление и правовой аудит инвестиционных документов: Post-Money SAFE, Valuation Cap, Discount, MFN-соглашения.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-md bg-navy-900 border border-gold-500/30 text-center space-y-4">
          <h3 className="text-xl font-serif text-white font-bold">Нужен юридический аудит корпоративной структуры?</h3>
          <p className="text-xs text-gray-400 max-w-lg mx-auto font-light">
            Обсудите детали инкорпорации и структурирования сделки напрямую с ведущим международным юристом.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <ConsultationButton serviceCategory="Delaware C-Corp & SAFE">
              Получить консультацию
            </ConsultationButton>
            <a
              href="https://t.me/VILEVIN_bot?start=corp_delaware"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white bg-[#101524] border border-white/20 hover:border-[#DFBA73]/50 transition-all cursor-pointer"
            >
              <span>✈️ Бот Telegram</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

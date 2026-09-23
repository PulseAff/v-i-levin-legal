'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight,
  FileCheck,
  Send
} from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useConsultation } from '@/context/ConsultationContext';
import { useLanguage } from '@/context/LanguageContext';

export const GreenCardSpecial: React.FC = () => {
  const { openConsultation } = useConsultation();
  const { dict } = useLanguage();
  const gc = dict.greencard || {};

  const cardImages = [
    '/images/gc-card-greencard-v1.jpg',
    '/images/gc-card-citizenship-v2.jpg',
    '/images/gc-card-civics-cards.jpg',
    '/images/gc-card-interview-v1.jpg',
    '/images/gc-card-n400-v1.jpg',
    '/images/gc-card-strategy-v3.jpg',
  ];

  const cardHrefs = [
    '/usa/green-card',
    '/usa',
    '/usa/immigration-test',
    '/usa/interview',
    '/usa',
    '/contacts',
  ];

  const defaultCards = [
    {
      code: 'GREEN CARD',
      title: 'Green Card & Иммиграция',
      desc: 'Индивидуальная стратегия получения статуса резидента: визы талантов EB-1A / EB-2 NIW, смена статуса и семейные петиции.',
      tag: 'Популярное',
      tagColor: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
      highlight: false,
    },
    {
      code: 'CITIZENSHIP',
      title: 'Гражданство США',
      desc: 'Комплексный юридический трекинг заявителя до принятия присяги и получения американского паспорта.',
      tag: 'Флагман',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      highlight: true,
    },
    {
      code: 'CIVICS TEST',
      title: 'Civics Test 2026',
      desc: 'Подготовка к актуальному тесту 2026 года на 128 вопросов: история США, Конституция, устройство органов власти и языковой минимум.',
      tag: '2026 Test',
      tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      highlight: false,
    },
    {
      code: 'INTERVIEW',
      title: 'Подготовка к интервью USCIS',
      desc: 'Репетиция стресс-собеседований с американским офицером: что спрашивают, как отвечать и как устранить двусмысленности.',
      tag: 'Mock Interview',
      tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      highlight: false,
    },
    {
      code: 'N-400 AUDIT',
      title: 'Аудит заявления N-400',
      desc: 'Построчный юридический разбор анкеты на натурализацию до её подачи для исключения скрытых процессуальных ловушек.',
      tag: 'Аудит рисков',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      highlight: false,
    },
    {
      code: 'STRATEGY',
      title: 'Индивидуальный аудит и стратегия',
      desc: 'Персональная оценка шансов на гражданство или Green Card с моделированием критических зон вашего дела.',
      tag: 'Bespoke',
      tagColor: 'bg-gold-500/20 text-gold-300 border-gold-500/30',
      highlight: true,
    },
  ];

  const cards = gc.cards && gc.cards.length === 6 ? gc.cards.map((c: any, i: number) => ({
    ...defaultCards[i],
    ...c,
  })) : defaultCards;

  const defaultStages = [
    { step: '1', title: 'Анализ N-400', desc: 'Построчный разбор анкеты и выявление потенциально проблемных мест до отправки.' },
    { step: '2', title: 'Вопросы офицера', desc: 'Что спрашивает офицер, как корректно формулировать ответы по вашей ситуации.' },
    { step: '3', title: '2026 Civics Test', desc: 'Отработка 128 вопросов по истории и устройству США (до 20 задают, 12 для зачета).' },
    { step: '4', title: 'English Component', desc: 'Подготовка к языковой части интервью: чтение, письмо и разговорные команды.' },
    { step: '5', title: 'Mock Interview', desc: 'Полная имитация настоящего собеседования в формате стресс-тестирования.' },
    { step: '6', title: 'Разбор ошибок', desc: 'Устранение нестыковок и двусмысленностей, вызывающих подозрения офицера.' },
    { step: '7', title: 'Индивидуальная стратегия', desc: 'Финальная подгонка под персональный бэкграунд заявителя.' },
  ];

  const stages = gc.stages && gc.stages.length === 7 ? gc.stages : defaultStages;

  return (
    <section className="relative bg-[#04060C] scroll-mt-20 pt-14 pb-20 lg:pt-16 lg:pb-24 border-t border-b border-[#1A2538] overflow-hidden" id="greencard">
      {/* Background with user's Passport */}
      <div className="absolute top-0 left-0 right-0 h-[580px] lg:h-[640px] pointer-events-none overflow-hidden select-none">
        <img
          src="/images/user-passport-bg.jpg"
          alt="Official US Passport"
          className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-90 contrast-[1.08] brightness-[0.98]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#04060C] via-[#04060C]/80 via-45% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04060C] via-[#04060C]/85 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#04060C]/60 to-transparent" />
      </div>

      <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-gradient-to-b from-blue-900/15 via-transparent to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Block */}
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E1624]/90 backdrop-blur-md border border-gold-500/50 text-gold-300 text-[11px] font-mono uppercase tracking-[0.2em] shadow-lg shadow-black/60">
                <LuxuryUsaFlag size="xs" />
                <span>{gc.badge || 'КЛЮЧЕВАЯ ВЕРТИКАЛЬНАЯ ПРАКТИКА'}</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight drop-shadow-md">
              {gc.title1 || 'США: Иммиграция, Гражданство'} <br />
              <span className="text-[#E5C37A] italic font-normal drop-shadow-[0_2px_12px_rgba(229,195,122,0.25)]">
                {gc.title2 || 'и Защита статуса'}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed max-w-xl drop-shadow-sm">
              {gc.desc || 'Не «репетиторство» и не конвейерное заполнение форм. Мы готовим к прохождению реального американского процесса натурализации с глубоким пониманием системы изнутри.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openConsultation('Иммиграция и Green Card США')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#F3E2B8] via-[#D8B467] to-[#A0782A] text-[#070A0F] font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_15px_rgba(216,180,103,0.3)] border border-[#FFE8A3] cursor-pointer"
              >
                <FileCheck size={14} />
                <span>{gc.btnEvaluate || 'Оценить шансы на Green Card'}</span>
              </button>

              <a
                href="https://t.me/V_I_Levin_bot?start=usa_greencard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/90 text-gold-300 border border-gold-500/30 text-xs font-semibold tracking-wide backdrop-blur-md transition-all cursor-pointer"
              >
                <Send size={13} />
                <span>{gc.btnTelegram || 'Telegram-разбор'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 hidden lg:block min-h-[260px] pointer-events-none" />
        </div>

        {/* 6 USA Practice Cards Grid */}
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {cards.map((card: any, idx: number) => {
            return (
              <Link
                key={card.code || idx}
                href={cardHrefs[idx] || '/usa'}
                className="group relative rounded-xl bg-[#090E1A] border border-[#1A2840] hover:border-gold-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
              >
                <div className="relative h-44 w-full overflow-hidden bg-black border-b border-[#1A2840]">
                  <img
                    src={cardImages[idx] || cardImages[0]}
                    alt={card.title}
                    className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.03]"
                  />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[9.5px] font-mono px-2.5 py-1 rounded bg-[#050810]/90 border border-[#203048] text-gold-300 uppercase tracking-widest backdrop-blur-md">
                      {card.code}
                    </span>
                    <span className={`text-[9.5px] font-mono px-2 py-0.5 rounded border backdrop-blur-md ${card.tagColor || 'bg-gold-500/20 text-gold-300 border-gold-500/30'}`}>
                      {card.tag}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <h3 className="text-lg sm:text-[19px] font-serif font-bold text-white group-hover:text-gold-300 transition-colors leading-snug drop-shadow-sm">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-gray-300 font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#141F32] flex items-center justify-between text-xs text-gold-400 font-medium group-hover:text-gold-300">
                    <span className="tracking-wide uppercase text-[11px] font-mono">{gc.cardAction || 'Узнать подробнее'}</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* 7-Stage Naturalization Architecture Strip */}
        <div className="max-w-[1060px] mx-auto rounded-2xl bg-[#080D18] border border-gold-500/30 p-6 lg:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A2942] pb-4">
            <div>
              <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                {gc.methodologyBadge || 'ФИРМЕННАЯ МЕТОДОЛОГИЯ ПОДГОТОВКИ'}
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                {gc.methodologyTitle || '7 этапов подготовки к гражданству США'}
              </h3>
            </div>
            <div className="text-xs text-gray-400 max-w-sm font-light">
              {gc.methodologyDesc || 'Не просто заучивание вопросов, а системное устранение слабых мест заявителя до визита в USCIS.'}
            </div>
          </div>

          <div className="relative pt-2">
            <div className="hidden lg:block absolute top-10 left-10 right-10 h-[1px] bg-gradient-to-r from-gold-500/10 via-gold-500/40 to-gold-500/10 pointer-events-none z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative z-10">
              {stages.map((stg: any) => (
                <div
                  key={stg.step}
                  className="p-4 rounded-xl bg-[#0A101C] border border-[#18263B] hover:border-gold-400/70 hover:bg-[#0F182A] transition-all group flex flex-col items-center text-center shadow-md hover:-translate-y-1"
                >
                  <div className="w-8 h-8 rotate-45 flex items-center justify-center bg-[#070B14] border border-gold-400/80 mb-4 shadow-[0_0_12px_rgba(212,175,55,0.25)] group-hover:border-gold-300 group-hover:scale-110 transition-all shrink-0">
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

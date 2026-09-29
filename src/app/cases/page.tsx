'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { casesData } from '@/data/casesData';
import { ArrowRight, MessageSquare, Shield } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function CasesPage() {
  const [filter, setFilter] = useState<'all' | 'immigration' | 'corporate' | 'litigation' | 'private'>('all');
  const { currentLang } = useLanguage();

  const labels: Record<string, {
    badge: string;
    title: string;
    desc: string;
    filters: Record<string, string>;
    clientPrefix: string;
    situationLabel: string;
    problemLabel: string;
    strategyLabel: string;
    actionsLabel: string;
    resultLabel: string;
    riskLabel: string;
    similarSituation: string;
    reviewBtn: string;
  }> = {
    ru: {
      badge: 'Реальная практика',
      title: 'Практические кейсы',
      desc: 'Каждый кейс публикуется строго в анонимизированном виде с согласия доверителей. Мы показываем юридическую проблему, анализ коллизий, конкретные процессуальные шаги и достигнутый результат.',
      filters: {
        all: 'Все кейсы',
        immigration: 'Иммиграция США',
        corporate: 'Бизнес и холдинги',
        litigation: 'Споры и арбитраж',
        private: 'Семейное и частное право',
      },
      clientPrefix: 'Доверитель:',
      situationLabel: 'Исходная ситуация:',
      problemLabel: 'Юридическая проблема',
      strategyLabel: 'Стратегия и анализ',
      actionsLabel: 'Предпринятые процессуальные действия:',
      resultLabel: 'Достигнутый результат:',
      riskLabel: 'Предотвращен риск:',
      similarSituation: 'У вас похожая ситуация?',
      reviewBtn: 'Разобрать ситуацию по аналогии с',
    },
    en: {
      badge: 'Actual Practice',
      title: 'Practice Case Studies',
      desc: 'Every case study is published strictly in anonymized format with client consent. We demonstrate the underlying legal dispute, statutory conflict analysis, procedural actions taken, and the verified resolution achieved.',
      filters: {
        all: 'All Cases',
        immigration: 'US Immigration',
        corporate: 'Corporate & Holdings',
        litigation: 'Disputes & Arbitration',
        private: 'Private & Family Law',
      },
      clientPrefix: 'Client:',
      situationLabel: 'Initial Situation:',
      problemLabel: 'Legal Conflict',
      strategyLabel: 'Strategy & Analysis',
      actionsLabel: 'Procedural Steps Executed:',
      resultLabel: 'Achieved Resolution:',
      riskLabel: 'Mitigated Risk:',
      similarSituation: 'Facing a similar legal challenge?',
      reviewBtn: 'Review similar case strategy for',
    },
    uk: {
      badge: 'Реальна практика',
      title: 'Практичні кейси',
      desc: 'Кожен кейс публікується виключно в анонімізованому вигляді за згодою клієнтів. Ми демонструємо правову проблему, аналіз колізій, процесуальні дії та отриманий результат.',
      filters: {
        all: 'Усі кейси',
        immigration: 'Імміграція США',
        corporate: 'Бізнес і холдинги',
        litigation: 'Спори та арбітраж',
        private: 'Сімейне та приватне право',
      },
      clientPrefix: 'Клієнт:',
      situationLabel: 'Вихідна ситуація:',
      problemLabel: 'Правова проблема',
      strategyLabel: 'Стратегія та аналіз',
      actionsLabel: 'Здійснені процесуальні дії:',
      resultLabel: 'Досягнутий результат:',
      riskLabel: 'Запобігли ризику:',
      similarSituation: 'У вас схожа ситуація?',
      reviewBtn: 'Розібрати ситуацію за аналогією з',
    },
    es: {
      badge: 'Práctica real',
      title: 'Casos y precedentes',
      desc: 'Todos los casos se presentan de forma anónima con la autorización del cliente. Exponemos el conflicto normativo, el análisis estratégico, las actuaciones procesales y el resultado jurídico favorable obtenido.',
      filters: {
        all: 'Todos los casos',
        immigration: 'Inmigración EE.UU.',
        corporate: 'Corporativo y Holdings',
        litigation: 'Litigios y Arbitraje',
        private: 'Derecho Privado y Familia',
      },
      clientPrefix: 'Cliente:',
      situationLabel: 'Situación inicial:',
      problemLabel: 'Conflicto jurídico',
      strategyLabel: 'Estrategia y análisis',
      actionsLabel: 'Actuaciones procesales ejecutadas:',
      resultLabel: 'Resultado obtenido:',
      riskLabel: 'Riesgo mitigado:',
      similarSituation: '¿Se encuentra en una situación análoga?',
      reviewBtn: 'Analizar situación por analogía con',
    },
    it: {
      badge: 'Prassi dello studio',
      title: 'Casi risolti',
      desc: 'Ogni caso è pubblicato in forma strettamente anonimizzata con il consenso del cliente. Illustriamo la criticità legale, l’analisi delle norme, le azioni procedurali intraprese e il risultato conseguito.',
      filters: {
        all: 'Tutti i casi',
        immigration: 'Immigrazione USA',
        corporate: 'Imprese e Holding',
        litigation: 'Contenzioso e Arbitrato',
        private: 'Diritto Privato e Famiglia',
      },
      clientPrefix: 'Cliente:',
      situationLabel: 'Situazione iniziale:',
      problemLabel: 'Criticità legale',
      strategyLabel: 'Strategia e analisi',
      actionsLabel: 'Atti procedurali eseguiti:',
      resultLabel: 'Esito conseguito:',
      riskLabel: 'Rischio scongiurato:',
      similarSituation: 'Ha una problematica analoga?',
      reviewBtn: 'Esamina il caso per analogia con',
    },
    fr: {
      badge: 'Pratique concrète',
      title: 'Dossiers et précédents',
      desc: 'Chaque dossier est publié sous anonymat strict avec l’accord préalable du client. Nous exposons la problématique de droit, l’analyse des conflits, les diligences accomplies et le résultat juridique obtenu.',
      filters: {
        all: 'Tous les dossiers',
        immigration: 'Immigration USA',
        corporate: 'Affaires & Holdings',
        litigation: 'Contentieux & Arbitrage',
        private: 'Droit privé & Famille',
      },
      clientPrefix: 'Client :',
      situationLabel: 'Situation initiale :',
      problemLabel: 'Problématique juridique',
      strategyLabel: 'Stratégie et analyse',
      actionsLabel: 'Diligences procédurales accomplies :',
      resultLabel: 'Résultat obtenu :',
      riskLabel: 'Risque écarté :',
      similarSituation: 'Votre situation présente des similitudes ?',
      reviewBtn: 'Évaluer votre cas par analogie avec',
    },
  };

  const l = labels[currentLang] || labels.ru;
  const filtered = filter === 'all' ? casesData : casesData.filter((c) => c.category === filter);

  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
            {l.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            {l.title}
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            {l.desc}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: l.filters.all },
            { id: 'immigration', label: l.filters.immigration },
            { id: 'corporate', label: l.filters.corporate },
            { id: 'litigation', label: l.filters.litigation },
            { id: 'private', label: l.filters.private },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                filter === item.id
                  ? 'bg-gold-500 text-navy-950 font-semibold shadow-gold-sm'
                  : 'bg-navy-900 text-gray-300 hover:text-white border border-surface-border'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* List of Detailed Cases */}
        <div className="space-y-8">
          {filtered.map((c) => (
            <div
              key={c.id}
              id={c.id}
              className="bg-navy-900 border border-surface-border rounded-md p-6 lg:p-10 space-y-6 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-mono font-semibold">
                    {c.caseNumber}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{c.jurisdiction}</span>
                </div>
                <span className="text-xs text-gray-500 font-light">
                  {l.clientPrefix} {c.clientProfile}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-white font-bold mb-3">
                  {c.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  <strong className="text-white font-medium">{l.situationLabel}</strong> {c.situation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-navy-950/80 p-5 rounded-md border border-surface-border">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                    {l.problemLabel}
                  </span>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {c.problem}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                    {l.strategyLabel}
                  </span>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {c.legalAnalysis}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">
                  {l.actionsLabel}
                </h3>
                <ul className="space-y-1.5">
                  {c.actionsTaken.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                      <span className="text-gold-500 font-bold">•</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-md bg-navy-950 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-semibold tracking-wider block">
                    {l.resultLabel}
                  </span>
                  <p className="text-xs text-white font-medium mt-0.5">{c.result}</p>
                </div>

                <div className="text-[11px] text-gray-400 shrink-0">
                  🛡️ {l.riskLabel} {c.riskAvoided}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">{l.similarSituation}</span>
                <a
                  href={`https://t.me/VILEVIN_bot?start=${c.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <MessageSquare size={14} /> {l.reviewBtn} {c.caseNumber}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { casesData } from '@/data/casesData';
import { ArrowRight, MessageSquare, Shield } from 'lucide-react';

export default function CasesPage() {
  const [filter, setFilter] = useState<'all' | 'immigration' | 'corporate' | 'litigation' | 'private'>('all');

  const filtered = filter === 'all' ? casesData : casesData.filter((c) => c.category === filter);

  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
            Реальная практика
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Практические кейсы
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Каждый кейс публикуется строго в анонимизированном виде с согласия доверителей. Мы показываем юридическую проблему, анализ коллизий, конкретные процессуальные шаги и достигнутый результат.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'Все кейсы' },
            { id: 'immigration', label: 'Иммиграция США' },
            { id: 'corporate', label: 'Бизнес и холдинги' },
            { id: 'litigation', label: 'Споры и арбитраж' },
            { id: 'private', label: 'Семейное и частное право' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
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
              className="bg-navy-900 border border-surface-border rounded-2xl p-6 lg:p-10 space-y-6 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-mono font-semibold">
                    {c.caseNumber}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">{c.jurisdiction}</span>
                </div>
                <span className="text-xs text-gray-500 font-light">
                  Доверитель: {c.clientProfile}
                </span>
              </div>

              <div>
                <h2 className="text-2xl font-serif text-white font-bold mb-3">
                  {c.title}
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                  <strong className="text-white font-medium">Исходная ситуация:</strong> {c.situation}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-navy-950/80 p-5 rounded-xl border border-surface-border">
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">
                    Юридическая проблема
                  </span>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {c.problem}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                    Стратегия и анализ
                  </span>
                  <p className="text-xs text-gray-300 font-light leading-relaxed">
                    {c.legalAnalysis}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">
                  Предпринятые процессуальные действия:
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

              <div className="p-4 rounded-lg bg-navy-950 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] text-emerald-400 uppercase font-semibold tracking-wider block">
                    Достигнутый результат:
                  </span>
                  <p className="text-xs text-white font-medium mt-0.5">{c.result}</p>
                </div>

                <div className="text-[11px] text-gray-400 shrink-0">
                  🛡️ Предотвращен риск: {c.riskAvoided}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">У вас похожая ситуация?</span>
                <a
                  href={`https://t.me/V_I_Levin_bot?start=${c.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  <MessageSquare size={14} /> Разобрать ситуацию по аналогии с {c.caseNumber}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, ArrowUpRight } from 'lucide-react';
import { casesData } from '@/data/casesData';

export const CasesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-navy-900 border-b border-surface-border" id="cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16">
          <div>
            <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
              Практика и результаты
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold">
              Реальные кейсы
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-xl">
              Анонимизированные истории доверителей. Анализ проблемы, выработанная стратегия, конкретные процессуальные шаги и достигнутый результат.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              href="/cases"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider transition-colors"
            >
              Смотреть все кейсы <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {casesData.map((c) => (
            <div
              key={c.id}
              className="bg-navy-950 border border-surface-border hover:border-gold-500/40 rounded-xl p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-sm"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-mono font-semibold">
                    {c.caseNumber}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {c.jurisdiction}
                  </span>
                </div>

                <h3 className="text-lg font-serif text-white font-bold leading-snug">
                  {c.title}
                </h3>

                <div className="space-y-2.5 text-xs text-gray-300 leading-relaxed">
                  <div>
                    <span className="text-gold-500 font-semibold uppercase text-[10px] tracking-wider block">
                      Юридическая проблема:
                    </span>
                    <p className="text-gray-400 mt-0.5">{c.problem}</p>
                  </div>

                  <div>
                    <span className="text-gold-500 font-semibold uppercase text-[10px] tracking-wider block">
                      Выработанная стратегия:
                    </span>
                    <p className="text-gray-400 mt-0.5">{c.strategy}</p>
                  </div>

                  <div className="p-3 bg-navy-900 rounded border border-surface-border">
                    <span className="text-white font-semibold uppercase text-[10px] tracking-wider block">
                      Результат:
                    </span>
                    <p className="text-emerald-400 mt-0.5 font-medium">{c.result}</p>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-6 border-t border-surface-border flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Опубликовано в обезличенном виде
                </span>
                <Link
                  href={`/cases#${c.id}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors"
                >
                  У вас похожая ситуация? <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

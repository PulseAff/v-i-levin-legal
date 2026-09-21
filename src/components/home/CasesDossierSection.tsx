'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';

export const CasesDossierSection: React.FC = () => {
  const dossiers = [
    {
      id: 'case-017',
      number: 'ДОСЬЕ #017',
      jurisdiction: 'США · USCIS TEXAS SERVICE CENTER',
      title: 'Одобрение петиции EB-1A после критического RFE за 14 дней',
      problem: 'Клиент обратился после самостоятельной подачи петиции EB-1A и получения жесткого Request for Evidence (RFE) с угрозой отказа по критериям вклада и авторства.',
      strategy: 'Полная пересборка петиции: замена слабых отзывов на 5 экспертных писем от топ-лидеров индустрии США, процессуальное доказательство существенного влияния на сферу.',
      result: 'USCIS одобрил петицию по премиальной процедуре за 14 календарных дней. Green Card получена для заявителя и семьи.',
    },
    {
      id: 'case-024',
      number: 'ДОСЬЕ #024',
      jurisdiction: 'ЕС · КИПР / БАНКОВСКИЙ АРБИТРАЖ',
      title: 'Снятие ареста со счёта $1.4M и закрытие претензий регулятора',
      problem: 'Европейский банк заблокировал счета холдинга в связи с изменениями правил санкционного мониторинга и требованиями AML/KYC регулятора.',
      strategy: 'Подготовка развернутого legal opinion с доказательством чистоты источников происхождения средств и подготовка досудебной претензии Совету директоров банка.',
      result: 'Счёт разблокирован в полном объеме, транзакции возобновлены без судебных издержек и штрафов.',
    },
    {
      id: 'case-031',
      number: 'ДОСЬЕ #031',
      jurisdiction: 'ОАЭ · DIFC COMMON LAW',
      title: 'Структурирование международного холдинга и защита активов $5M+',
      problem: 'Угроза трансграничных претензий к бизнесу и личным активам доверителя из-за коллизии юрисдикций в нескольких странах.',
      strategy: 'Перевод корпоративной структуры в юрисдикцию DIFC с английским прецедентным правом, создание трастовой защиты и оформление 10-летних резидентских виз.',
      result: 'Создана защищенная структура, исключающая риски субсидиарной ответственности и обеспечивающая налоговую прозрачность.',
    },
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#070A10] border-b border-[#1A2230]" id="cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#162032] pb-6">
          <div>
            <div className="text-[11px] font-mono text-gold-400 tracking-[0.25em] uppercase mb-1.5">
              ПРЕЦЕДЕНТЫ & ДОКАЗАТЕЛЬНАЯ БАЗА
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold tracking-tight">
              Анонимизированные кейсы практики
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl font-light leading-relaxed">
              Публикуются строго в обезличенном виде в соответствии со стандартами конфиденциальности и защитой персональных данных доверителей.
            </p>
          </div>

          <Link
            href="/cases"
            className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 font-semibold tracking-wider uppercase mt-4 md:mt-0 transition-colors"
          >
            <span>Смотреть реестр дел</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        {/* 3 Dossiers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {dossiers.map((d) => (
            <div
              key={d.id}
              className="rounded-xl bg-[#0A0F19] border border-[#1A2538] hover:border-gold-500/40 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-gold-sm relative group"
            >
              <div className="space-y-4">
                {/* Header with Case # and Jurisdiction */}
                <div className="flex items-center justify-between border-b border-[#162135] pb-3">
                  <span className="px-2.5 py-1 rounded bg-[#121B2C] text-gold-400 border border-gold-500/20 text-[11px] font-mono font-semibold">
                    {d.number}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">
                    {d.jurisdiction}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-white leading-snug group-hover:text-gold-300 transition-colors">
                  {d.title}
                </h3>

                <div className="space-y-3 text-xs text-gray-300 leading-relaxed font-light">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block font-medium">
                      Юридическая проблема:
                    </span>
                    <p className="text-gray-400 mt-1">{d.problem}</p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-mono text-gold-400 tracking-wider block font-medium">
                      Выработанная стратегия:
                    </span>
                    <p className="text-gray-400 mt-1">{d.strategy}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#0E1624] border border-[#1E2C44]">
                    <span className="text-[10px] uppercase font-mono text-emerald-400 tracking-wider block font-medium">
                      Процессуальный результат:
                    </span>
                    <p className="text-gray-200 mt-1 text-[11px]">{d.result}</p>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-5 mt-5 border-t border-[#162135] flex items-center justify-between text-xs">
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Lock size={11} /> Обезличенное досье
                </span>
                <Link
                  href={`/cases#${d.id}`}
                  className="text-gold-400 hover:text-gold-300 font-medium inline-flex items-center gap-1"
                >
                  У вас похожая ситуация? <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

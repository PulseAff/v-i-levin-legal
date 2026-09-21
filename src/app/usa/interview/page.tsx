import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Подготовка к иммиграционному интервью в консульстве США | V. I. LEVIN',
  description: 'Как пройти собеседование на иммиграционную визу США после одобрения петиции I-140/I-130. Чек-лист документов, типовые вопросы и действия при 221(g).',
};

export default function InterviewPrepPage() {
  return (
    <div className="py-12 lg:py-20 bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <Link href="/usa/green-card" className="hover:text-gray-300">США / Green Card</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">Подготовка к интервью</span>
        </nav>

        <div className="space-y-4 border-b border-surface-border pb-8">
          <span className="px-3 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-semibold uppercase tracking-wider">
            Consular Processing
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold leading-tight">
            Подготовка к иммиграционному интервью в посольстве США
          </h1>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
            Собеседование с консульским офицером — финальный и наиболее психологически напряженный этап получения иммиграционной визы. Ошибка в одном ответе может повлечь административную проверку на несколько месяцев.
          </p>
        </div>

        {/* 3 Pillars of Interview */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-white font-bold">
            Что проверяет консульский офицер
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-navy-900 border border-surface-border space-y-2">
              <h3 className="text-base font-serif text-gold-400 font-bold">1. Непротиворечивость</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Сверка данных петиции I-140 с анкетами DS-260 и всеми вашими старыми туристическими анкетами DS-160 за прошлые годы.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-navy-900 border border-surface-border space-y-2">
              <h3 className="text-base font-serif text-gold-400 font-bold">2. Inadmissibility</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Проверка на отсутствие оснований для отказа по закону INA: военная служба, судимости, предыдущие оверстеи, связи с санкциями.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-navy-900 border border-surface-border space-y-2">
              <h3 className="text-base font-serif text-gold-400 font-bold">3. Реальность намерений</h3>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Четкое понимание того, чем заявитель планирует заниматься в Соединенных Штатах в рамках заявленной сферы экспертизы.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="bg-navy-900 border border-surface-border rounded-xl p-6 lg:p-8 space-y-4">
          <h2 className="text-xl font-serif text-white font-bold">
            Обязательный пакет документов на собеседование
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300 font-light">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <span>Оригинал приглашения на интервью (Interview Appointment Letter) и подтверждение анкеты DS-260</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <span>Оригинал одобрения петиции I-797 (Notice of Action)</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <span>Действующие загранпаспорта со сроком действия не менее 8 месяцев</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <span>Справки об отсутствии судимости из всех стран проживания старше 16 лет с апостилями/переводами</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
              <span>Результаты медицинского обследования в сертифицированной клинике (IOM / Panel Physician)</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 space-y-4">
          <h3 className="text-xl font-serif text-white font-bold">
            Пройдите симуляцию интервью с юристом
          </h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto font-light">
            Мы проведем 60-минутный тренировочный опрос на английском или русском языке, выявим уязвимые места и научим давать юридически точные ответы.
          </p>
          <div className="pt-2">
            <a
              href="https://t.me/V_I_Levin_bot?start=usa_interview"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold uppercase tracking-wider rounded shadow-gold-sm"
            >
              <MessageSquare size={15} /> Записаться на симуляцию
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

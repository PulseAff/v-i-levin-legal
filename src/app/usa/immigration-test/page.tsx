'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, MessageSquare, RefreshCw, Award } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  criterion: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: 'Имеются ли у вас национальные или международные награды, премии или дипломы за выдающиеся успехи в вашей профессиональной области?',
    criterion: 'Prizes & Awards'
  },
  {
    id: 2,
    text: 'Состоите ли вы в профессиональных ассоциациях или организациях, членство в которых требует подтвержденных выдающихся достижений?',
    criterion: 'Membership'
  },
  {
    id: 3,
    text: 'Были ли публикации о вас или вашей работе в профессиональных журналах, ведущих СМИ или авторитетных отраслевых изданиях?',
    criterion: 'Published Material'
  },
  {
    id: 4,
    text: 'Привлекались ли вы в качестве эксперта, судьи или рецензента для оценки работы других специалистов (хакатоны, диссертационные советы, научные журналы)?',
    criterion: 'Judging'
  },
  {
    id: 5,
    text: 'Создали ли вы оригинальный научно-технический, предпринимательский или авторский вклад существенной значимости для индустрии?',
    criterion: 'Original Contribution'
  },
  {
    id: 6,
    text: 'Являетесь ли вы автором научных статей, монографий или профильных аналитических публикаций?',
    criterion: 'Scholarly Articles'
  },
  {
    id: 7,
    text: 'Участвовали ли ваши работы в признанных выставках или показах (актуально для сферы искусства/дизайна)?',
    criterion: 'Display of Work'
  },
  {
    id: 8,
    text: 'Играли ли вы ключевую или лидирующую роль в известной компании, стартапе или организации с высокой репутацией?',
    criterion: 'Leading / Critical Role'
  },
  {
    id: 9,
    text: 'Превышает ли ваш доход или вознаграждение средний уровень по вашей специальности в вашей стране?',
    criterion: 'High Remuneration'
  },
  {
    id: 10,
    text: 'Имеются ли у вас подтвержденные успехи в коммерческой реализации ваших продуктов (кассовые сборы, продажи лицензий, контракты)?',
    criterion: 'Commercial Success'
  }
];

export default function ImmigrationTestPage() {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelect = (id: number, val: boolean) => {
    setAnswers((prev) => ({ ...prev, [id]: val }));
  };

  const calculateScore = () => {
    return Object.values(answers).filter(Boolean).length;
  };

  const answeredCount = Object.keys(answers).length;
  const score = calculateScore();

  return (
    <div className="py-12 lg:py-20 bg-navy-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <Link href="/usa/green-card" className="hover:text-gray-300">США / Green Card</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">Опросник EB-1A / NIW</span>
        </nav>

        <div className="border-b border-surface-border pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award size={14} /> Интерактивная экспресс-оценка
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-white font-bold">
            Тест соответствия критериям Green Card EB-1A
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-3 leading-relaxed font-light">
            Для подачи петиции EB-1A требуется формально соответствовать минимум 3 из 10 критериев USCIS. Ответьте на 10 контрольных вопросов, чтобы получить предварительную оценку перспектив кейса.
          </p>
        </div>

        {!isCompleted ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-gray-400 border-b border-surface-border pb-3">
              <span>Отвечено: {answeredCount} из 10</span>
              <span>Минимум для EB-1A: 3 критерия</span>
            </div>

            <div className="space-y-4">
              {questions.map((q) => {
                const ans = answers[q.id];
                return (
                  <div
                    key={q.id}
                    className="p-5 rounded-xl bg-navy-900 border border-surface-border space-y-3"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-mono text-gold-400 font-semibold">Вопрос {q.id}</span>
                      <span className="text-gray-500 uppercase">{q.criterion}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-200 font-light leading-relaxed">
                      {q.text}
                    </p>
                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleSelect(q.id, true)}
                        className={`px-4 py-2 rounded text-xs font-semibold transition-all ${
                          ans === true
                            ? 'bg-gold-500 text-navy-950 font-bold shadow-gold-sm'
                            : 'bg-navy-950 text-gray-400 hover:text-white border border-surface-border'
                        }`}
                      >
                        ✓ Да, есть подтверждения
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSelect(q.id, false)}
                        className={`px-4 py-2 rounded text-xs font-semibold transition-all ${
                          ans === false
                            ? 'bg-navy-800 text-gray-300 border border-surface-border'
                            : 'bg-navy-950 text-gray-400 hover:text-white border border-surface-border'
                        }`}
                      >
                        ✕ Нет / не применимо
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 text-center">
              <button
                type="button"
                disabled={answeredCount < 10}
                onClick={() => setIsCompleted(true)}
                className={`px-8 py-3.5 rounded text-xs font-semibold tracking-wider uppercase transition-all ${
                  answeredCount === 10
                    ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 hover:brightness-110 shadow-gold-sm'
                    : 'bg-navy-900 text-gray-500 cursor-not-allowed border border-surface-border'
                }`}
              >
                {answeredCount === 10 ? 'Посмотреть расчет перспектив' : `Ответьте на все вопросы (${answeredCount}/10)`}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-navy-900 border border-gold-500/30 rounded-2xl p-8 lg:p-10 space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-full bg-navy-950 border-2 border-gold-500 flex items-center justify-center text-3xl font-serif font-bold text-gold-400">
              {score}/10
            </div>

            <h2 className="text-2xl font-serif text-white font-bold">
              {score >= 4
                ? 'Высокий потенциал для петиции EB-1A / EB-2 NIW'
                : score === 3
                ? 'Базовое соответствие порогу EB-1A'
                : 'Рекомендуется усиление профиля или трек EB-2 NIW'}
            </h2>

            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
              {score >= 3
                ? `Вы отметили ${score} критериев из 10. Это превышает формальный минимум USCIS (3 критерия). Следующий ключевой шаг — формирование независимой доказательной базы и писем признанных экспертов.`
                : `Вы отметили ${score} критериев из 10. Для категории EB-1A требуется минимум 3 подтвержденных критерия. Рекомендуется рассмотреть альтернативный трек EB-2 NIW (National Interest Waiver) либо подготовить стратегию доращивания критериев.`}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://t.me/V_I_Levin_bot?start=test_score_${score}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold tracking-wider uppercase rounded hover:brightness-110 shadow-gold-sm flex items-center justify-center gap-2"
              >
                <MessageSquare size={16} />
                <span>Отправить результат юристу в Telegram</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setAnswers({});
                  setIsCompleted(false);
                }}
                className="w-full sm:w-auto px-5 py-3.5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1.5"
              >
                <RefreshCw size={14} /> Пройти заново
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

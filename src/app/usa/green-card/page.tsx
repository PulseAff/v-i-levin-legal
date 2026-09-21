import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Compass, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, Award, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Green Card в США: EB-1A, EB-2 NIW, семейные основания | V. I. LEVIN',
  description: 'Комплексный юридический разбор программ получения постоянного вида на жительство (Green Card) в США: EB-1A для выдающихся специалистов, EB-2 National Interest Waiver, снятие отказов 221(g).',
};

export default function GreenCardPage() {
  return (
    <div className="py-12 lg:py-20 bg-navy-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">США / Green Card</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-surface-border pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-semibold uppercase tracking-wider">
            <Compass size={14} /> Флагманская вертикаль практики
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Грин-карта в США: профессиональные и семейные треки
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl">
            Стратегическое юридическое сопровождение получения иммиграционного статуса резидента США (Lawful Permanent Resident). Мы работаем с основаниями для специалистов экстра-класса (EB-1A), национального интереса (EB-2 NIW) и сложными семейными случаями.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="https://t.me/V_I_Levin_bot?start=usa_greencard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold tracking-wider uppercase rounded hover:brightness-110 transition-all flex items-center gap-2 shadow-gold-sm"
            >
              <MessageSquare size={16} /> Оценить шансы в Telegram
            </a>
            <Link
              href="/usa/immigration-test"
              className="px-6 py-3.5 bg-navy-850 hover:bg-navy-800 text-gold-300 border border-gold-500/30 text-xs font-semibold tracking-wider uppercase rounded transition-colors flex items-center gap-2"
            >
              <span>Интерактивный тест EB-1A / NIW</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* The 2 Major Tracks Comparison */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-white font-bold">
            Ключевые иммиграционные категории без работодателя
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EB-1A */}
            <div className="bg-navy-900 border border-gold-500/30 rounded-xl p-6 lg:p-8 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold px-2.5 py-1 rounded bg-gold-500/10 text-gold-400 border border-gold-500/30">
                  Высший приоритет (EB-1)
                </span>
                <span className="text-xs text-gray-400">Нет очередей</span>
              </div>
              <h3 className="text-xl font-serif text-white font-bold">
                EB-1A: Extraordinary Ability
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Для признанных лидеров в науке, технологиях, бизнесе или искусстве. Требуется соответствие минимум 3 из 10 критериев USCIS и прохождение теста Kazarian.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>Подача напрямую заявителем (Self-petition)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>Доступен Premium Processing (решение за 15 календарных дней)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>Грин-карта для заявителя, супруга/супруги и детей до 21 года</span>
                </li>
              </ul>
            </div>

            {/* EB-2 NIW */}
            <div className="bg-navy-900 border border-surface-border rounded-xl p-6 lg:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold px-2.5 py-1 rounded bg-navy-800 text-gray-300 border border-surface-border">
                  Второй приоритет (EB-2)
                </span>
                <span className="text-xs text-gray-400">Прецедент Dhanasar</span>
              </div>
              <h3 className="text-xl font-serif text-white font-bold">
                EB-2 NIW: National Interest Waiver
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                Для специалистов с продвинутым образованием (Advanced Degree) или исключительными способностями, чья деятельность представляет национальный интерес для США.
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>Освобождение от трудовой сертификации PERM</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>Мягче критерии признания по сравнению с EB-1A</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>Доступен Premium Processing (решение за 45 календарных дней)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps to Green Card */}
        <div className="bg-navy-900 border border-surface-border rounded-xl p-6 lg:p-8 space-y-6">
          <h2 className="text-2xl font-serif text-white font-bold">
            Этапы сопровождения в практике V. I. LEVIN
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-navy-950 rounded-lg border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">01</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">Аудит портфолио и выбор стратегии</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Изучаем публикации, патенты, руководящий опыт, уровень дохода и медийные упоминания. Определяем, по какому треку шанс одобрения максимален.
                </p>
              </div>
            </div>

            <div className="p-4 bg-navy-950 rounded-lg border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">02</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">Сбор доказательной базы и писем независимых экспертов</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Формулируем драфты рекомендательных писем от независимых профессоров и индустриальных лидеров из США и других стран. Собираем подтверждения оригинального вклада.
                </p>
              </div>
            </div>

            <div className="p-4 bg-navy-950 rounded-lg border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">03</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">Подготовка петиции I-140 и юридического меморандума</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Составляем аргументированный 200–300 страничный петиционный пакет со ссылками на прецедентное право USCIS. Реагируем на запросы офицера (RFE), если они возникают.
                </p>
              </div>
            </div>

            <div className="p-4 bg-navy-950 rounded-lg border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">04</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">Consular Processing и подготовка к собеседованию</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Заполнение анкеты DS-260, подготовка финансового аффидевита, сбор гражданских документов и проведение персональной симуляции консульского интервью.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links to interview and test */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/usa/interview"
            className="p-6 rounded-xl bg-navy-900 border border-surface-border hover:border-gold-500/40 transition-colors group block"
          >
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Подготовка к консульству</span>
            <h3 className="text-lg font-serif text-white font-bold group-hover:text-gold-300 transition-colors mt-2">
              Гид по интервью в посольстве США →
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Типичные вопросы офицера, проверка анкет DS-260, отработка сложных моментов биографии.
            </p>
          </Link>

          <Link
            href="/usa/immigration-test"
            className="p-6 rounded-xl bg-navy-900 border border-surface-border hover:border-gold-500/40 transition-colors group block"
          >
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">Экспресс-тестирование</span>
            <h3 className="text-lg font-serif text-white font-bold group-hover:text-gold-300 transition-colors mt-2">
              Опросник соответствия критериям EB-1A →
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              10 вопросов по критериям USCIS с моментальным расчетом баллов готовности.
            </p>
          </Link>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="p-4 rounded-lg bg-navy-900 border border-surface-border text-xs text-gray-400 leading-relaxed flex items-start gap-3">
          <ShieldCheck size={18} className="text-gold-500 shrink-0 mt-0.5" />
          <span>
            <strong>Юридический дисклеймер:</strong> Практика V. I. LEVIN не гарантирует выдачу визы или одобрение петиции суверенными органами власти США (USCIS, Department of State). Все решения принимаются исключительно уполномоченными иммиграционными офицерами. Дата актуализации информации: сентябрь 2026 года.
          </span>
        </div>
      </div>
    </div>
  );
}

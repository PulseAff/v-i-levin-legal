import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { servicesData } from '@/data/servicesData';
import { casesData } from '@/data/casesData';
import { ShieldCheck, CheckCircle2, AlertTriangle, Clock, DollarSign, ArrowRight, MessageSquare } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) return { title: 'Услуга не найдена' };

  return {
    title: `${service.title} | V. I. LEVIN Practice`,
    description: service.shortDesc,
    openGraph: {
      title: `${service.title} | V. I. LEVIN`,
      description: service.shortDesc,
    },
  };
}

export default function ServiceDetailPage({ params }: PageProps) {
  const service = servicesData.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const relatedCases = casesData.filter(
    (c) => c.category === service.category || service.category === 'immigration'
  ).slice(0, 2);

  return (
    <div className="py-12 lg:py-20 bg-navy-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-gray-300">Услуги</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium">{service.title}</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-surface-border pb-10">
          <span className="px-3 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 text-xs font-semibold uppercase tracking-wider">
            {service.heroBadge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
            {service.title}
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-light max-w-3xl">
            {service.heroDesc}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href={`https://t.me/V_I_Levin_bot?start=${service.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold tracking-wider uppercase rounded hover:brightness-110 transition-all flex items-center gap-2 shadow-gold-sm"
            >
              <MessageSquare size={16} /> Разобрать мою ситуацию
            </a>
          </div>
        </div>

        {/* Section: For Whom & What is included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-navy-900 border border-surface-border rounded-xl p-6 lg:p-8 space-y-4">
            <h2 className="text-lg font-serif text-white font-bold">Кому подходит услуга</h2>
            <ul className="space-y-3">
              {service.forWhom.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 font-light">
                  <CheckCircle2 size={16} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy-900 border border-surface-border rounded-xl p-6 lg:p-8 space-y-4">
            <h2 className="text-lg font-serif text-white font-bold">Что входит в работу</h2>
            <ul className="space-y-3">
              {service.included.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 font-light">
                  <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section: Process Steps 1-2-3-4 */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-white font-bold">
            Как проходит процесс (1 — 2 — 3 — 4)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.steps.map((st) => (
              <div
                key={st.step}
                className="bg-navy-900 border border-surface-border rounded-xl p-5 space-y-2 relative group hover:border-gold-500/30 transition-colors"
              >
                <div className="text-2xl font-serif font-bold text-gold-500/80">
                  {st.step}
                </div>
                <h3 className="text-sm font-serif text-white font-semibold">
                  {st.title}
                </h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Docs & Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-navy-900 border border-surface-border rounded-xl p-6 lg:p-8 space-y-4">
            <h2 className="text-lg font-serif text-white font-bold">Какие документы обычно нужны</h2>
            <ul className="space-y-2.5">
              {service.requiredDocs.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                  <span className="text-gold-500">•</span>
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-navy-900 border border-red-950/60 rounded-xl p-6 lg:p-8 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 text-sm font-semibold uppercase tracking-wider">
              <AlertTriangle size={17} /> Риски и типичные ошибки
            </div>
            <ul className="space-y-2.5">
              {service.risksAndMistakes.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-light">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Timeline & Pricing Model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-xl bg-navy-900 border border-surface-border">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded bg-navy-850 border border-gold-500/20 text-gold-400">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Ориентировочные сроки</h3>
              <p className="text-xs text-gray-400 mt-1">{service.timeline}</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded bg-navy-850 border border-gold-500/20 text-gold-400">
              <DollarSign size={20} />
            </div>
            <div>
              <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Модель стоимости</h3>
              <p className="text-xs text-gray-400 mt-1">{service.pricingModel}</p>
            </div>
          </div>
        </div>

        {/* Related Case Studies */}
        {relatedCases.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif text-white font-bold">
              Анонимизированные кейсы по направлению
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCases.map((c) => (
                <div key={c.id} className="bg-navy-900 border border-surface-border rounded-xl p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gold-400 font-mono font-semibold">{c.caseNumber}</span>
                    <span className="text-gray-400">{c.jurisdiction}</span>
                  </div>
                  <h3 className="text-base font-serif text-white font-bold">{c.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-3">{c.situation}</p>
                  <div className="pt-2 text-xs text-emerald-400 font-medium">
                    Итог: {c.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-lg bg-navy-900 border border-surface-border text-xs text-gray-400 leading-relaxed flex items-start gap-3">
          <ShieldCheck size={18} className="text-gold-500 shrink-0 mt-0.5" />
          <span>{service.disclaimer}</span>
        </div>

        {/* CTA Bottom Banner */}
        <div className="text-center p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
            Готовы обсудить ваш вопрос?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto font-light">
            Опишите обстоятельства ситуации. Мы проведем предварительный анализ и сообщим, сможем ли помочь в решении задачи.
          </p>
          <div className="pt-2">
            <a
              href={`https://t.me/V_I_Levin_bot?start=${service.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold tracking-wider uppercase rounded hover:brightness-110 transition-all shadow-gold-sm"
            >
              <span>Начать разбор в Telegram-боте</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

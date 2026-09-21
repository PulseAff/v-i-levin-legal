import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { servicesData } from '@/data/servicesData';
import { Compass, ShieldCheck, Scale, Briefcase, FileText, Users, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Юридические услуги | V. I. LEVIN Practice',
  description: 'Каталог юридических услуг международной практики V. I. LEVIN: иммиграция в США, корпоративное право, международные контракты, судебные споры.',
};

const iconMap: Record<string, React.ElementType> = {
  Compass,
  ShieldCheck,
  Scale,
  Briefcase,
  FileText,
  Users,
};

export default function ServicesIndexPage() {
  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
            Каталог направлений
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Юридические услуги практики
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Каждое направление ведется на стыке национального и международного права. Мы не предлагаем шаблонных услуг, а выстраиваем индивидуальную доказательную и процессуальную стратегию.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesData.map((service) => {
            const Icon = iconMap[service.iconName] || Scale;
            return (
              <div
                key={service.slug}
                className="bg-navy-900 border border-surface-border hover:border-gold-500/40 rounded-xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-lg bg-navy-850 border border-gold-500/20 text-gold-400 group-hover:border-gold-500/40 transition-colors">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded bg-navy-800 text-gold-400 border border-gold-500/20">
                      {service.heroBadge}
                    </span>
                  </div>

                  <h2 className="text-xl font-serif text-white font-bold group-hover:text-gold-300 transition-colors mb-3">
                    {service.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6 font-light">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border/60 flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">
                    {service.timeline.split(' ')[0]} {service.timeline.split(' ')[1]} {service.timeline.split(' ')[2]}
                  </span>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold-400 group-hover:text-gold-300 transition-colors"
                  >
                    Подробнее об услуге <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Scale, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'О практике V. I. LEVIN | Конфиденциальность и принципы',
  description: 'Манифест закрытой международной юридической практики V. I. LEVIN. Осознанная приватность, отсутствие публичных лиц и персональная ответственность.',
};

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 border-b border-surface-border pb-8">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase">
            Манифест практики
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Осознанная конфиденциальность. Результат важнее медийности.
          </h1>
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            Международная юридическая практика V. I. LEVIN создана для доверителей, которым требуется глубокое правовое решение без публичной огласки и лишнего внимания.
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          <h2 className="text-2xl font-serif text-white font-bold">
            Принципы ведения международных дел
          </h2>
          <p>
            Деятельность практики построена на стандартах американского и международного консалтинга, где ключевым критерием эффективности является чистота правовой позиции и защита интересов доверителя:
          </p>
          <ul className="space-y-4 pl-1">
            <li className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220] border border-[#1C2C45]">
              <Shield size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block text-base mb-1">Абсолютная защита данных и активов</strong>
                <span>Трансграничная релокация, структурирование семейного капитала и защита бизнеса ведутся с соблюдением строгих соглашений о неразглашении (NDA).</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220] border border-[#1C2C45]">
              <Lock size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block text-base mb-1">Независимость и закрытый формат</strong>
                <span>Практика работает в формате бутикового юридического консалтинга, что гарантирует прямое взаимодействие и отсутствие бюрократических проволочек.</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-xl bg-[#0B1220] border border-[#1C2C45]">
              <Scale size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block text-base mb-1">Правовая стратегия и доказательная база</strong>
                <span>Каждый кейс оценивается на основе прецедентных норм и глубокого анализа американского и международного законодательства.</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-navy-900 border border-gold-500/30 space-y-4">
          <h3 className="text-xl font-serif text-white font-bold">
            Свяжитесь с практикой
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            Опишите суть вашей ситуации в конфиденциальном Telegram-боте. Первичная классификация занимает несколько минут, после чего специалист подтвердит возможность работы.
          </p>
          <div className="pt-2">
            <a
              href="https://t.me/V_I_Levin_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold uppercase tracking-wider rounded shadow-gold-sm"
            >
              <span>Перейти в Telegram-бот</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

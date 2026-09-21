'use client';

import React from 'react';
import { Send, ArrowUpRight, MessageSquareQuote } from 'lucide-react';

export const ThreadsSection: React.FC = () => {
  return (
    <section className="py-16 bg-[#05080E] border-b border-[#1A2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="text-[10px] font-mono text-gold-400 tracking-[0.25em] uppercase">
              ЭКСПЕРТНЫЙ ЛИЧНЫЙ БЛОГ · THREADS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
              Право без глянца: реальная юридическая практика
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              В Threads я делюсь реальными разборами прецедентов, неочевидными ошибками при подаче на Green Card и тем, как формулировки в контрактах определяют исход споров на миллионы долларов.
            </p>
            <div className="pt-2">
              <a
                href="https://threads.net/@vilevin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider"
              >
                <span>Читать блог V. I. Levin в Threads</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Threads Profile Card Mockup */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md p-6 rounded-2xl bg-[#090E17] border border-gold-500/30 shadow-xl space-y-4">
              
              {/* Header: Black Circle Avatar with Gold Monogram */}
              <div className="flex items-center gap-4 border-b border-[#182438] pb-4">
                <div className="w-14 h-14 rounded-full bg-black border-2 border-gold-500/60 flex items-center justify-center text-gold-400 font-serif font-bold text-lg shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover opacity-20 mix-blend-luminosity pointer-events-none" style={{ backgroundImage: "url('/about-office-bg.jpg')" }} />
                  <span className="relative z-10">VL</span>
                </div>
                <div>
                  <div className="text-base font-serif font-bold text-white">V. I. Levin</div>
                  <div className="text-xs text-gold-400 font-mono">@vilevin · Международный юрист</div>
                </div>
              </div>

              {/* Exact Bio requested by User */}
              <div className="text-xs text-gray-300 space-y-1 font-light leading-relaxed">
                <div className="font-semibold text-white">V. I. Levin</div>
                <div className="text-gray-400">Международный юрист</div>
                <div className="text-gray-300">Сложные юридические вопросы — от иммиграции до международных споров.</div>
                <div className="text-gold-400 pt-1">🇺🇸 США · 🌍 Международные вопросы</div>
                <div className="text-gray-300">⚖️ Консультации · сопровождение · стратегия</div>
                <div className="text-gray-400 italic pt-1">«Пишу о праве, реальных кейсах и том, что происходит за пределами заголовков.»</div>
              </div>

              <div className="pt-2 border-t border-[#182438] flex items-center justify-between">
                <a
                  href="https://t.me/V_I_Levin_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gold-400 hover:text-white font-medium inline-flex items-center gap-1.5"
                >
                  <Send size={12} /> Консультация в Telegram ↓
                </a>
                <span className="text-[10px] font-mono text-gray-500">Threads Verified</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { ShieldCheck, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 border-t border-surface-border pt-16 pb-12 text-gray-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-border/60">
          {/* Column 1: Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-gray-300 leading-relaxed max-w-sm text-sm font-light mt-4">
              Международная юридическая практика для сложных задач. Защита интересов частных доверителей и бизнеса без границ и географических барьеров.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-navy-850 hover:bg-navy-800 text-gold-400 border border-gold-500/30 rounded text-xs transition-colors"
              >
                <MessageSquare size={14} /> Telegram: @VILEVIN_bot
              </a>
              <a
                href="https://threads.net/@v.i.levin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Threads <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* Column 2: Key Services */}
          <div className="space-y-3">
            <h4 className="font-serif text-white uppercase tracking-wider text-xs font-semibold">
              Направления
            </h4>
            <ul className="space-y-2">
              <li><Link href="/services/immigration" className="hover:text-gold-400 transition-colors">Иммиграция и Green Card</Link></li>
              <li><Link href="/services/legal-consultation" className="hover:text-gold-400 transition-colors">Правовой аудит</Link></li>
              <li><Link href="/services/business" className="hover:text-gold-400 transition-colors">Корпоративное право</Link></li>
              <li><Link href="/services/contracts" className="hover:text-gold-400 transition-colors">Международные контракты</Link></li>
              <li><Link href="/services/family-law" className="hover:text-gold-400 transition-colors">Семейное и наследственное</Link></li>
              <li><Link href="/services/representation" className="hover:text-gold-400 transition-colors">Судебные споры</Link></li>
            </ul>
          </div>

          {/* Column 3: USA & Jurisdictions */}
          <div className="space-y-3">
            <h4 className="font-serif text-white uppercase tracking-wider text-xs font-semibold">
              США и Страны
            </h4>
            <ul className="space-y-2">
              <li><Link href="/usa/green-card" className="text-gold-400/90 hover:text-gold-300 transition-colors font-medium">Green Card США (EB-1 / NIW)</Link></li>
              <li><Link href="/usa/interview" className="hover:text-gold-400 transition-colors">Консульское интервью</Link></li>
              <li><Link href="/usa/immigration-test" className="hover:text-gold-400 transition-colors">Тест на иммиграцию</Link></li>
              <li><Link href="/countries/usa" className="hover:text-gold-400 transition-colors">Юрисдикция США</Link></li>
              <li><Link href="/countries/germany" className="hover:text-gold-400 transition-colors">Германия и ЕС</Link></li>
              <li><Link href="/countries/uae" className="hover:text-gold-400 transition-colors">ОАЭ (Дубай / Абу-Даби)</Link></li>
              <li><Link href="/countries/cyprus" className="hover:text-gold-400 transition-colors">Кипр (Common Law)</Link></li>
            </ul>
          </div>

          {/* Column 4: Practice & Trust */}
          <div className="space-y-3">
            <h4 className="font-serif text-white uppercase tracking-wider text-xs font-semibold">
              Практика
            </h4>
            <ul className="space-y-2">
              <li><Link href="/cases" className="hover:text-gold-400 transition-colors">Анонимизированные кейсы</Link></li>
              <li><Link href="/articles" className="hover:text-gold-400 transition-colors">Статьи и правовой анализ</Link></li>
              <li><Link href="/about" className="hover:text-gold-400 transition-colors">Манифест конфиденциальности</Link></li>
              <li><Link href="/contacts" className="hover:text-gold-400 transition-colors">Контакты</Link></li>
              <li><Link href="/admin/leads" className="text-gray-500 hover:text-gold-500 transition-colors">Внутренний реестр</Link></li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Strip */}
        <div className="pt-8 space-y-4">
          <div className="p-4 rounded bg-navy-900 border border-surface-border/50 text-[11px] leading-relaxed text-gray-400">
            <div className="flex items-center gap-2 text-gold-500 font-semibold mb-1">
              <ShieldCheck size={14} /> Юридический дисклеймер и ограничения ответственности:
            </div>
            Материалы, опубликованные на данном сайте, носят исключительно информационно-аналитический характер и не являются индивидуальной юридической консультацией или прямым предложением юридических услуг в юрисдикциях, где деятельность требует специальной государственной аккредитации. Мы не даем обещаний 100% гарантии положительного исхода дел и не используем формулировки «гарантия получения визы или Green Card». В случаях, требующих судебного представительства в конкретных национальных судах, привлекаются локальные лицензированные адвокаты соответствующей коллегии (Bar Association / Rechtsanwaltskammer).
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
            <p>© {new Date().getFullYear()} V. I. LEVIN. International Legal Solutions. Все права защищены.</p>
            <p className="mt-2 sm:mt-0 font-serif italic text-gold-500/80">«Ваши права — без границ.»</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

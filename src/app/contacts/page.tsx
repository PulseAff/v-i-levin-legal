import React from 'react';
import { Metadata } from 'next';
import { MessageSquare, Shield, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Контакты | V. I. LEVIN Practice',
  description: 'Каналы связи с международной юридической практикой V. I. LEVIN: Telegram-бот квалификации, Threads, защищенная почта.',
};

export default function ContactsPage() {
  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 border-b border-surface-border pb-8">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase">
            Связь с практикой
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Контакты и первичное обращение
          </h1>
          <p className="text-base text-gray-300 font-light leading-relaxed">
            Для обеспечения защиты персональных данных и мгновенной классификации обращений первичный прием ведется через автоматизированного Telegram-бота практики.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram Channel */}
          <div className="p-6 lg:p-8 rounded-xl bg-navy-900 border border-gold-500/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-navy-850 text-gold-400 border border-gold-500/30 flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-xl font-serif text-white font-bold">Telegram-бот</h2>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Основной канал получения и первичной квалификации обращений. Позволяет описать ситуацию, указать юрисдикцию и передать контакты.
              </p>
            </div>
            <a
              href="https://t.me/V_I_Levin_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold uppercase tracking-wider rounded text-center block shadow-gold-sm hover:brightness-110 transition-all"
            >
              @V_I_Levin_bot
            </a>
          </div>

          {/* Threads Channel */}
          <div className="p-6 lg:p-8 rounded-xl bg-navy-900 border border-surface-border space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-lg bg-navy-850 text-gold-400 border border-surface-border flex items-center justify-center">
                <Globe size={24} />
              </div>
              <h2 className="text-xl font-serif text-white font-bold">Threads</h2>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                Экспертный канал V. I. LEVIN: правовой анализ прецедентов, новости законодательства, разборы ошибок и закрытая практика.
              </p>
            </div>
            <a
              href="https://threads.net/@v.i.levin"
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 bg-navy-850 hover:bg-navy-800 text-gold-400 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider rounded text-center block transition-colors"
            >
              threads.net/@v.i.levin
            </a>
          </div>
        </div>

        {/* Security Alert */}
        <div className="p-5 rounded-xl bg-navy-900 border border-surface-border text-xs text-gray-400 leading-relaxed flex items-start gap-3">
          <Shield size={18} className="text-gold-500 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">Безопасность связи:</strong> никогда не передавайте в первичных сообщениях пароли, номера банковских карт или реквизиты доступа к криптокошелькам. Конфиденциальные коммерческие документы передаются только после согласования условий и заключения соглашения о неразглашении (NDA).
          </span>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { MessageSquare, Shield, Globe, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactsPage() {
  const { currentLang } = useLanguage();

  const labels: Record<string, {
    badge: string;
    title: string;
    desc: string;
    botTitle: string;
    botDesc: string;
    botBtn: string;
    threadsTitle: string;
    threadsDesc: string;
    threadsBtn: string;
    secTitle: string;
    secDesc: string;
  }> = {
    ru: {
      badge: 'Связь с практикой',
      title: 'Контакты и первичное обращение',
      desc: 'Для обеспечения защиты персональных данных и мгновенной классификации обращений первичный прием ведется через официальные защищенные каналы практики.',
      botTitle: 'Telegram-бот практики',
      botDesc: 'Основной канал получения и первичной квалификации обращений. Позволяет описать ситуацию, указать юрисдикцию и передать контакты.',
      botBtn: 'Перейти в @VILEVIN_bot',
      threadsTitle: 'Экспертный канал Threads',
      threadsDesc: 'Официальный канал V. I. LEVIN: правовой анализ прецедентов, новости международного законодательства, разборы ошибок и закрытая практика.',
      threadsBtn: 'threads.net/@v.i.levin',
      secTitle: 'Безопасность связи:',
      secDesc: 'Никогда не передавайте в первичных сообщениях пароли, номера банковских карт или реквизиты доступа к криптокошелькам. Конфиденциальные коммерческие документы передаются только после согласования условий в защищенном режиме строгой конфиденциальности (Attorney-Client Privilege).',
    },
    en: {
      badge: 'Practice Communication',
      title: 'Contacts & Initial Case Intake',
      desc: 'To guarantee data protection and rapid case classification, initial triage is conducted via our official secured practice channels.',
      botTitle: 'Official Telegram Bot',
      botDesc: 'Primary channel for initial intake and inquiry triage. Enables describing your situation, specifying jurisdictions, and providing secure contact details.',
      botBtn: 'Open @VILEVIN_bot',
      threadsTitle: 'Expert Threads Channel',
      threadsDesc: 'Official channel of V. I. LEVIN: legal precedent analysis, international statutory updates, risk teardowns, and practice insights.',
      threadsBtn: 'threads.net/@v.i.levin',
      secTitle: 'Communication Security:',
      secDesc: 'Never disclose passwords, payment card numbers, or cryptocurrency credentials in initial messages. Confidential legal documents are shared exclusively under established Attorney-Client Privilege via secured channels.',
    },
    uk: {
      badge: "Зв'язок з практикою",
      title: 'Контакти та первинне звернення',
      desc: 'Для забезпечення захисту персональних даних та миттєвої класифікації звернень первинний прийом ведеться через офіційні захищені канали практики.',
      botTitle: 'Telegram-бот практики',
      botDesc: 'Основний канал отримання та первинної кваліфікації звернень. Дозволяє описати ситуацію, вказати юрисдикцію та передати контакти.',
      botBtn: 'Перейти в @VILEVIN_bot',
      threadsTitle: 'Експертний канал Threads',
      threadsDesc: 'Офіційний канал V. I. LEVIN: правовий аналіз прецедентів, новини міжнародного законодавства, розбори помилок та закрита практика.',
      threadsBtn: 'threads.net/@v.i.levin',
      secTitle: "Безпека зв'язку:",
      secDesc: 'Ніколи не передавайте в первинних повідомленнях паролі, номери банківських карток або реквізити криптогаманців. Конфіденційні документи передаються виключно після узгодження умов під захистом суворої конфіденційності (Attorney-Client Privilege).',
    },
    es: {
      badge: 'Contacto con la práctica',
      title: 'Contacto y recepción de consultas',
      desc: 'Para garantizar la máxima protección de datos y la clasificación inmediata, la recepción inicial se realiza a través de nuestros canales oficiales seguros.',
      botTitle: 'Bot oficial de Telegram',
      botDesc: 'Canal principal para la presentación de casos y análisis inicial. Le permite describir su asunto, especificar jurisdicciones y aportar sus datos de contacto.',
      botBtn: 'Abrir @VILEVIN_bot',
      threadsTitle: 'Canal de análisis Threads',
      threadsDesc: 'Canal oficial de V. I. LEVIN: jurisprudencia, novedades regulatorias internacionales, análisis de casos y perspectiva legal.',
      threadsBtn: 'threads.net/@v.i.levin',
      secTitle: 'Seguridad de comunicaciones:',
      secDesc: 'Nunca envíe contraseñas, números de tarjetas bancarias o claves cripto en mensajes iniciales. Los documentos confidenciales se transmiten únicamente tras fijar los términos bajo secreto profesional (Attorney-Client Privilege).',
    },
    it: {
      badge: 'Contatto con lo studio',
      title: 'Contatti e primo colloquio',
      desc: 'Per garantire la massima protezione dei dati e una rapida qualificazione del caso, la ricezione preliminare avviene tramite i nostri canali protetti ufficiali.',
      botTitle: 'Bot Telegram ufficiale',
      botDesc: 'Canale principale per la ricezione e la valutazione preliminare del caso. Permette di descrivere la situazione, indicare la giurisdizione e lasciare i recapiti.',
      botBtn: 'Apri @VILEVIN_bot',
      threadsTitle: 'Canale specialistico Threads',
      threadsDesc: 'Canale ufficiale V. I. LEVIN: analisi di precedenti legali, aggiornamenti normativi internazionali e prassi dello studio.',
      threadsBtn: 'threads.net/@v.i.levin',
      secTitle: 'Sicurezza delle comunicazioni:',
      secDesc: 'Non trasmettere mai password, coordinate bancarie o credenziali nei messaggi iniziali. I documenti riservati vengono scambiati solo dopo accordo formale sotto segreto professionale (Attorney-Client Privilege).',
    },
    fr: {
      badge: 'Contacter le cabinet',
      title: 'Contacts et première prise de contact',
      desc: 'Pour assurer la protection des données et une qualification immédiate, l’accueil initial est géré via les canaux officiels sécurisés du cabinet.',
      botTitle: 'Bot Telegram officiel',
      botDesc: 'Canal principal de réception et d’évaluation préliminaire des dossiers. Permet de décrire la situation, préciser les juridictions et transmettre vos coordonnées.',
      botBtn: 'Ouvrir @VILEVIN_bot',
      threadsTitle: 'Canal d’analyse Threads',
      threadsDesc: 'Canal officiel V. I. LEVIN : analyse des précédents légaux, actualités réglementaires internationales et retours d’expérience.',
      threadsBtn: 'threads.net/@v.i.levin',
      secTitle: 'Sécurité des échanges :',
      secDesc: 'Ne transmettez jamais de mots de passe, numéros bancaires ou clés crypto dans les premiers messages. Les documents confidentiels sont partagés sous le secret professionnel d’avocat (Attorney-Client Privilege).',
    },
  };

  const l = labels[currentLang] || labels.ru;

  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 border-b border-surface-border pb-8">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase">
            {l.badge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            {l.title}
          </h1>
          <p className="text-base text-gray-300 font-light leading-relaxed">
            {l.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Telegram Bot */}
          <div className="p-6 lg:p-8 rounded-md bg-navy-900 border border-gold-500/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-md bg-navy-850 text-gold-400 border border-gold-500/30 flex items-center justify-center">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-xl font-serif text-white font-bold">{l.botTitle}</h2>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {l.botDesc}
              </p>
            </div>
            <a
              href="https://t.me/VILEVIN_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-5 rounded-md bg-[#DFBA73] hover:bg-[#cfab5b] text-[#080B11] text-xs font-bold uppercase tracking-wider text-center block border border-[#FFE8A3]/40 shadow-md hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              {l.botBtn}
            </a>
          </div>

          {/* Threads Channel */}
          <div className="p-6 lg:p-8 rounded-md bg-navy-900 border border-surface-border space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-md bg-navy-850 text-gold-400 border border-surface-border flex items-center justify-center">
                <Globe size={24} />
              </div>
              <h2 className="text-xl font-serif text-white font-bold">{l.threadsTitle}</h2>
              <p className="text-xs text-gray-300 font-light leading-relaxed">
                {l.threadsDesc}
              </p>
            </div>
            <a
              href="https://threads.net/@v.i.levin"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-4 bg-navy-850 hover:bg-navy-800 text-gold-400 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider rounded-md text-center block transition-colors"
            >
              {l.threadsBtn}
            </a>
          </div>
        </div>

        {/* Security Alert */}
        <div className="p-5 rounded-md bg-navy-900 border border-surface-border text-xs text-gray-400 leading-relaxed flex items-start gap-3">
          <Shield size={18} className="text-gold-500 shrink-0 mt-0.5" />
          <span>
            <strong className="text-white">{l.secTitle}</strong> {l.secDesc}
          </span>
        </div>
      </div>
    </div>
  );
}

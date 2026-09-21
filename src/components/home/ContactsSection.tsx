'use client';

import React from 'react';
import { Send, Zap, Shield, Clock, FileText } from 'lucide-react';
import { useConsultation } from '@/context/ConsultationContext';
import { useLanguage } from '@/context/LanguageContext';

export const ContactsSection: React.FC = () => {
  const { openConsultation } = useConsultation();
  const { currentLang } = useLanguage();

  const labels = {
    ru: {
      title: 'Контакты',
      desc: 'Для получения юридической помощи и правового аудита ситуации отправьте форму или напишите в Telegram.',
      btnForm: 'Заполнить форму на сайте',
      btnTg: 'Написать в Telegram',
      fast: 'Быстрая связь',
      confidential: 'Конфиденциально (ваши данные под защитой)',
      avail: 'Доступно 24/7 (в экстренных случаях)',
    },
    en: {
      title: 'Contacts',
      desc: 'For strategic legal assistance and confidential risk assessment, submit an inquiry or message us on Telegram.',
      btnForm: 'Submit Online Inquiry',
      btnTg: 'Message on Telegram',
      fast: 'Direct Communication',
      confidential: 'Strict Confidentiality (Attorney-Client Privilege)',
      avail: 'Available 24/7 (for critical matters)',
    },
    uk: {
      title: 'Контакти',
      desc: 'Для отримання правової допомоги та аудиту ситуації надішліть запит через сайт або зв’яжіться в Telegram.',
      btnForm: 'Заповнити форму на сайті',
      btnTg: 'Написати в Telegram',
      fast: 'Швидкий зв’язок',
      confidential: 'Конфіденційно (адвокатська таємниця)',
      avail: 'Доступно 24/7 (в екстрених випадках)',
    },
    es: {
      title: 'Contacto',
      desc: 'Para asistencia jurídica estratégica y auditoría de riesgos, envíe el formulario o escríbanos por Telegram.',
      btnForm: 'Completar formulario web',
      btnTg: 'Escribir por Telegram',
      fast: 'Comunicación directa',
      confidential: 'Confidencialidad absoluta (Secreto profesional)',
      avail: 'Disponible 24/7 (asuntos urgentes)',
    },
    it: {
      title: 'Contatti',
      desc: 'Per assistenza legale internazionale e analisi riservata del caso, compili il modulo o ci scriva su Telegram.',
      btnForm: 'Compila il modulo online',
      btnTg: 'Scrivi su Telegram',
      fast: 'Contatto diretto',
      confidential: 'Riservatezza assoluta (Segreto professionale)',
      avail: 'Reperibilità 24/7 (casi urgenti)',
    },
    fr: {
      title: 'Contacts',
      desc: 'Pour toute assistance juridique internationale et analyse confidentielle, remplissez le formulaire ou écrivez-nous sur Telegram.',
      btnForm: 'Remplir le formulaire en ligne',
      btnTg: 'Écrire sur Telegram',
      fast: 'Communication directe',
      confidential: 'Confidentialité stricte (Secret professionnel)',
      avail: 'Disponible 24/7 (cas d’urgence)',
    },
  };

  const c = labels[currentLang] || labels.ru;

  return (
    <section className="relative bg-[#070A0F] py-14 border-b border-[#1A2230] overflow-hidden" id="contacts">
      {/* City skyline background on right */}
      <div
        className="absolute inset-0 bg-cover bg-right opacity-30 pointer-events-none mix-blend-luminosity"
        style={{ backgroundImage: "url('/contacts-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#070A0F] via-[#070A0F]/90 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold">
              {c.title}
            </h2>
            <p className="text-xs text-gray-300 font-light max-w-md">
              {c.desc}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openConsultation('Индивидуальный аудит')}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#F3E2B8] via-[#D8B467] to-[#A0782A] text-[#070A0F] font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(216,180,103,0.35)] border border-[#FFE8A3] cursor-pointer"
              >
                <FileText size={14} />
                <span>{c.btnForm}</span>
              </button>
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#111927] hover:bg-[#182337] text-gold-300 border border-gold-500/30 text-xs font-semibold tracking-wide transition-all shadow"
              >
                <Send size={13} />
                <span>{c.btnTg}</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 space-y-3 z-10">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                <Zap size={14} />
              </div>
              <div className="text-xs text-gray-300 font-light">
                <strong className="text-white font-medium">{c.fast}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                <Shield size={14} />
              </div>
              <div className="text-xs text-gray-300 font-light">
                <strong className="text-white font-medium">{c.confidential}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                <Clock size={14} />
              </div>
              <div className="text-xs text-gray-300 font-light">
                <strong className="text-white font-medium">{c.avail}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

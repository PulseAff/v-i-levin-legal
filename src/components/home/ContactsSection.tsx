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
      title: 'Контакты и прием обращений',
      desc: 'Все обращения доверителей рассматриваются в строгом соответствии со стандартами конфиденциальности. Заполните форму для проведения правового анализа вашей ситуации.',
      btnForm: 'Записаться на консультацию',
      botNote: 'Для экспресс-квалификации вашего дела доступен официальный бот-ассистент',
      botLink: '@VILEVIN_bot',
      feature1: 'Индивидуальный правовой аудит ситуации экспертом практики',
      feature2: 'Конфиденциальность и защита переданных сведений (Rule 1.6 Attorney-Client Privilege)',
      feature3: 'Регистрация обращения и подготовка позиции в течение 24 часов',
    },
    en: {
      title: 'Contacts & Client Intake',
      desc: 'All inquiries are reviewed in strict compliance with attorney-client privilege. Complete the form to initiate an in-depth legal analysis of your situation.',
      btnForm: 'Request Legal Consultation',
      botNote: 'For automated preliminary case triage, our official bot is available',
      botLink: '@VILEVIN_bot',
      feature1: 'Direct senior risk evaluation and case roadmap',
      feature2: 'Strict Attorney-Client Privilege & confidentiality (Rule 1.6)',
      feature3: 'Case registration and initial legal feedback within 24 hours',
    },
    uk: {
      title: 'Контакти та прийом звернень',
      desc: 'Усі звернення розглядаються з дотриманням повної конфіденційності. Заповніть форму для правового аудиту вашої справи.',
      btnForm: 'Записатися на консультацію',
      botNote: 'Для експрес-кваліфікації доступний офіційний бот-асистент',
      botLink: '@VILEVIN_bot',
      feature1: 'Персональний правовий аудит ситуації провідним юристом',
      feature2: 'Повна конфіденційність та захист даних (Rule 1.6 Attorney-Client Privilege)',
      feature3: 'Реєстрація звернення та підготовка позиції протягом 24 годин',
    },
    es: {
      title: 'Contacto y recepción de casos',
      desc: 'Todas las consultas se tramitan bajo estricto secreto profesional. Complete el formulario para iniciar la auditoría legal de su caso.',
      btnForm: 'Solicitar consulta legal',
      botNote: 'Para cualificación previa automatizada, está disponible el bot oficial',
      botLink: '@VILEVIN_bot',
      feature1: 'Evaluación jurídica personalizada por abogado',
      feature2: 'Secreto profesional y confidencialidad absoluta (Rule 1.6)',
      feature3: 'Registro del expediente y respuesta en 24 horas',
    },
    it: {
      title: 'Contatti e ricezione incarichi',
      desc: 'Tutte le richieste sono gestite nel rispetto del segreto professionale. Compili il modulo per una valutazione legale riservata del caso.',
      btnForm: 'Richiedi consulenza legale',
      botNote: 'Per una pre-qualificazione immediata è disponibile il bot ufficiale',
      botLink: '@VILEVIN_bot',
      feature1: 'Analisi strategica del caso da parte dell’avvocato',
      feature2: 'Segreto professionale e massima tutela dei dati (Rule 1.6)',
      feature3: 'Apertura fascicolo e primo riscontro entro 24 ore',
    },
    fr: {
      title: 'Contacts & Réception des dossiers',
      desc: 'Toutes les demandes sont traitées sous le sceau du secret professionnel. Remplissez le formulaire pour obtenir une analyse juridique approfondie.',
      btnForm: 'Demander une consultation',
      botNote: 'Pour une qualification préliminaire de votre dossier, le bot officiel est disponible',
      botLink: '@VILEVIN_bot',
      feature1: 'Audit juridique direct et feuille de route par l’avocat',
      feature2: 'Secret professionnel et confidentialité absolue (Rule 1.6)',
      feature3: 'Enregistrement du dossier et retour sous 24 heures',
    },
  };

  const c = labels[currentLang] || labels.ru;

  return (
    <section className="relative bg-[#070A0F] py-16 border-b border-[#1A2230] overflow-hidden" id="contacts">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />


      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold tracking-tight">
              {c.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light max-w-lg leading-relaxed">
              {c.desc}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                onClick={() => openConsultation('Индивидуальный аудит')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.35)] border border-[#FFE8A3] cursor-pointer"
              >
                <FileText size={14} />
                <span>{c.btnForm}</span>
              </button>
            </div>
            <p className="text-[11px] text-gray-400 font-light pt-1">
              {c.botNote}{' '}
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-gold-300 font-mono underline underline-offset-2"
              >
                {c.botLink}
              </a>
            </p>
          </div>

          <div className="md:col-span-5 space-y-3.5 z-10">
            <div className="flex items-center gap-3 p-3 rounded-md bg-[#0A0F1A]/80 border border-[#1C273B]">
              <div className="w-8 h-8 rounded-md bg-[#121B2C] border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                <FileText size={15} />
              </div>
              <div className="text-xs text-gray-300 font-light leading-snug">
                <strong className="text-white font-medium block">{c.feature1}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-[#0A0F1A]/80 border border-[#1C273B]">
              <div className="w-8 h-8 rounded-md bg-[#121B2C] border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                <Shield size={15} />
              </div>
              <div className="text-xs text-gray-300 font-light leading-snug">
                <strong className="text-white font-medium block">{c.feature2}</strong>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-md bg-[#0A0F1A]/80 border border-[#1C273B]">
              <div className="w-8 h-8 rounded-md bg-[#121B2C] border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                <Clock size={15} />
              </div>
              <div className="text-xs text-gray-300 font-light leading-snug">
                <strong className="text-white font-medium block">{c.feature3}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

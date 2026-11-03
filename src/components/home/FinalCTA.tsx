'use client';

import React from 'react';
import { ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { useConsultation } from '@/context/ConsultationContext';
import { useLanguage } from '@/context/LanguageContext';

interface FinalCTAProps {
  onOpenConsultation?: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenConsultation }) => {
  const { openConsultation } = useConsultation();
  const { currentLang } = useLanguage();

  const handleOpen = () => {
    if (onOpenConsultation) {
      onOpenConsultation();
    } else {
      openConsultation('Индивидуальный аудит');
    }
  };

  const labels = {
    ru: {
      badge: 'Начните с конфиденциального разбора',
      title: 'Опишите ситуацию. Мы определим, есть ли правовое решение.',
      desc: 'Каждое обращение изучается ведущим специалистом практики. Мы оценим риски, определим применимые правовые механизмы и предложим рациональный план действий.',
      btnReview: 'Получить консультацию',
      btnBot: 'Запустить защищенный Telegram-бот',
    },
    en: {
      badge: 'Begin with a confidential assessment',
      title: 'Describe your situation. We will determine if a viable legal remedy exists.',
      desc: 'Every matter is directly appraised by our senior counsel. We evaluate jurisdictional risks, procedural avenues, and deliver an actionable strategic roadmap.',
      btnReview: 'Get Consultation',
      btnBot: 'Launch Secure Telegram Bot',
    },
    uk: {
      badge: 'Почніть із конфіденційного аудиту',
      title: 'Опишіть ситуацію. Ми визначимо наявність ефективного правового рішення.',
      desc: 'Кожне звернення вивчається провідним юристом практики. Ми оцінимо ризики, визначимо норми права та сформуємо чіткий план дій.',
      btnReview: 'Отримати консультацію',
      btnBot: 'Запустити захищений Telegram-бот',
    },
    es: {
      badge: 'Comience con una auditoría confidencial',
      title: 'Describa su situación. Determinaremos la viabilidad jurídica de su caso.',
      desc: 'Cada consulta es evaluada personalmente por el titular del despacho. Analizamos riesgos jurisdiccionales y trazamos un plan de acción concreto.',
      btnReview: 'Obtener consulta',
      btnBot: 'Iniciar bot de Telegram seguro',
    },
    it: {
      badge: 'Inizi con un’analisi riservata',
      title: 'Descriva la Sua situazione. Valuteremo la sussistenza di un rimedio legale.',
      desc: 'Ogni fascicolo è esaminato direttamente dal professionista titolare. Identifichiamo i profili di rischio e formuliamo una strategia su misura.',
      btnReview: 'Richiedi consulenza',
      btnBot: 'Avvia bot protetto Telegram',
    },
    fr: {
      badge: 'Commencez par une analyse confidentielle',
      title: 'Décrivez votre situation. Nous déterminerons si une voie de droit existe.',
      desc: 'Chaque dossier est directement analysé par l’associé gérant. Nous apprécions les risques et définissons un plan d’action pragmatique.',
      btnReview: 'Obtenir une consultation',
      btnBot: 'Lancer le bot Telegram sécurisé',
    },
  };

  const l = labels[currentLang] || labels.ru;

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-b from-[#070B14] via-[#05080E] to-[#05080E] border-b border-[#1A2230] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs uppercase tracking-wider font-semibold">
          <ShieldCheck size={14} /> <span>{l.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight max-w-3xl mx-auto">
          {l.title}
        </h2>

        <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto font-light leading-relaxed">
          {l.desc}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleOpen}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-bold text-xs uppercase tracking-wider rounded-md hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.35)] border border-[#FFE8A3] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{l.btnReview}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

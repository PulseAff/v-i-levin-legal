'use client';

import React from 'react';
import { Shield, Lock, Scale, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { currentLang } = useLanguage();

  const labels: Record<string, {
    badge: string;
    title: string;
    desc: string;
    subHeading: string;
    subDesc: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
    cardTitle: string;
    cardDesc: string;
    cardBtn: string;
  }> = {
    ru: {
      badge: 'Манифест практики',
      title: 'Осознанная конфиденциальность. Результат важнее медийности.',
      desc: 'Международная юридическая практика V. I. LEVIN создана для доверителей, которым требуется глубокое правовое решение без публичной огласки и лишнего внимания.',
      subHeading: 'Принципы ведения международных дел',
      subDesc: 'Деятельность практики построена на стандартах американского и международного консалтинга, где ключевым критерием эффективности является чистота правовой позиции и защита интересов доверителя:',
      p1Title: 'Абсолютная защита данных и активов',
      p1Desc: 'Трансграничная релокация, структурирование семейного капитала и защита бизнеса ведутся в строгом режиме профессиональной тайны (Attorney-Client Privilege).',
      p2Title: 'Независимость и закрытый формат',
      p2Desc: 'Практика работает в формате бутикового юридического консалтинга, что гарантирует прямое взаимодействие и отсутствие бюрократических проволочек.',
      p3Title: 'Правовая стратегия и доказательная база',
      p3Desc: 'Каждый кейс оценивается на основе прецедентных норм и глубокого анализа американского и международного законодательства.',
      cardTitle: 'Свяжитесь с практикой',
      cardDesc: 'Опишите суть вашей ситуации в конфиденциальном Telegram-боте. Первичная классификация занимает несколько минут, после чего специалист подтвердит возможность работы.',
      cardBtn: 'Перейти в Telegram-бот',
    },
    en: {
      badge: 'Practice Manifesto',
      title: 'Conscious Confidentiality. Results Above Publicity.',
      desc: 'The international legal practice of V. I. LEVIN is built for clients who demand rigorous legal solutions without public exposure or unnecessary scrutiny.',
      subHeading: 'Principles of International Legal Representation',
      subDesc: 'Our operations adhere to the highest American and global legal consulting standards, where uncompromising legal precision and client protection are paramount:',
      p1Title: 'Absolute Data and Asset Protection',
      p1Desc: 'Cross-border relocation, family office capital structuring, and corporate protection are conducted under strict professional secrecy (Attorney-Client Privilege).',
      p2Title: 'Independence & Boutique Exclusivity',
      p2Desc: 'We operate as a private boutique consultancy, guaranteeing direct partner-level counsel and eliminating administrative bureaucracy.',
      p3Title: 'Evidence-Based Legal Strategy',
      p3Desc: 'Every case is architected upon established judicial precedents and comprehensive statutory analysis under US and international legal regimes.',
      cardTitle: 'Contact the Practice',
      cardDesc: 'Outline your situation via our confidential Telegram bot. Initial triage takes only a few minutes, following which our counsel will confirm engagement viability.',
      cardBtn: 'Proceed to Telegram Bot',
    },
    uk: {
      badge: 'Маніфест практики',
      title: 'Усвідомлена конфіденційність. Результат понад публічність.',
      desc: 'Міжнародна юридична практика V. I. LEVIN створена для довірителів, які потребують глибокого правового рішення без публічного розголосу та зайвої уваги.',
      subHeading: 'Принципи ведення міжнародних справ',
      subDesc: 'Діяльність практики побудована на стандартах американського та міжнародного консалтингу, де ключовим критерієм є чистота правової позиції та захист інтересів довірителя:',
      p1Title: 'Абсолютний захист даних та активів',
      p1Desc: 'Транскордонна релокація, структурування сімейного капіталу та захист бізнесу здійснюються у суворому режимі професійної таємниці (Attorney-Client Privilege).',
      p2Title: 'Незалежність та закритий формат',
      p2Desc: 'Практика працює у форматі бутикового юридичного консалтингу, що гарантує пряму взаємодію та відсутність бюрократичних затримок.',
      p3Title: 'Правова стратегія та доказова база',
      p3Desc: 'Кожна справа оцінюється на основі прецедентних норм та глибокого аналізу американського і міжнародного законодавства.',
      cardTitle: "Зв'яжіться з практикою",
      cardDesc: 'Опишіть суть вашої ситуації в конфіденційному Telegram-боті. Первинна класифікація триває кілька хвилин, після чого юрист підтвердить можливість роботи.',
      cardBtn: 'Перейти в Telegram-бот',
    },
    es: {
      badge: 'Manifiesto de la práctica',
      title: 'Confidencialidad consciente. Los resultados priman sobre la notoriedad.',
      desc: 'La práctica jurídica internacional de V. I. LEVIN está diseñada para clientes que exigen soluciones legales de alto nivel sin exposición pública.',
      subHeading: 'Principios de actuación internacional',
      subDesc: 'Nuestra actividad se rige por los estándares del asesoramiento jurídico estadounidense e internacional, donde priman la solidez y la protección del cliente:',
      p1Title: 'Protección absoluta de datos y patrimonios',
      p1Desc: 'La reubicación transfronteriza, la estructuración de capital familiar y la protección de empresas se gestionan bajo estricto secreto profesional (Attorney-Client Privilege).',
      p2Title: 'Independencia y formato boutique',
      p2Desc: 'Operamos como un despacho boutique exclusivo, lo que garantiza trato directo con el abogado y la máxima agilidad procesal.',
      p3Title: 'Estrategia legal basada en precedentes',
      p3Desc: 'Cada asunto se fundamenta en la jurisprudencia aplicable y un análisis exhaustivo del derecho estadounidense e internacional.',
      cardTitle: 'Contacte con el despacho',
      cardDesc: 'Exponga los detalles de su caso en nuestro bot confidencial de Telegram. La clasificación inicial tarda solo unos minutos tras los cuales confirmamos disponibilidad.',
      cardBtn: 'Acceder al bot de Telegram',
    },
    it: {
      badge: 'Manifesto dello studio',
      title: 'Riservatezza consapevole. I risultati prima della visibilità.',
      desc: 'Lo studio legale internazionale V. I. LEVIN è dedicato a clienti che richiedono soluzioni giuridiche approfondite senza alcuna esposizione mediatica.',
      subHeading: 'Principi di consulenza legale internazionale',
      subDesc: 'La nostra attività adotta gli standard della consulenza statunitense e internazionale, fondata sul massimo rigore e sulla difesa intransigente del cliente:',
      p1Title: 'Tutela assoluta dei dati e del patrimonio',
      p1Desc: 'Il trasferimento transfrontaliero, la strutturazione di patrimoni familiari e la tutela d’impresa avvengono sotto il più rigoroso segreto professionale (Attorney-Client Privilege).',
      p2Title: 'Indipendenza e dimensione boutique',
      p2Desc: 'Lavoriamo come boutique legale esclusiva, garantendo un rapporto diretto con l’avvocato e l’azzeramento dei tempi burocratici.',
      p3Title: 'Strategia fondata sui precedenti',
      p3Desc: 'Ogni dossier viene sviluppato sull’analisi meticolosa della giurisprudenza e delle normative vigenti negli USA e a livello internazionale.',
      cardTitle: 'Contatti lo studio',
      cardDesc: 'Descriva il Suo caso tramite il nostro bot Telegram riservato. La pre-qualificazione richiede pochi minuti, dopodiché confermeremo la presa in carico.',
      cardBtn: 'Apri il bot Telegram',
    },
    fr: {
      badge: 'Manifeste du cabinet',
      title: 'Confidentialité absolue. Les résultats avant la notoriété.',
      desc: 'Le cabinet juridique international V. I. LEVIN s’adresse aux clients recherchant des solutions juridiques d’excellence à l’abri de toute exposition médiatique.',
      subHeading: 'Principes de pratique internationale',
      subDesc: 'Notre démarche s’aligne sur les standards d’élite du conseil américain et international, privilégiant la précision doctrinale et la protection des intérêts du client :',
      p1Title: 'Protection absolue des données et actifs',
      p1Desc: 'La relocalisation transfrontalière, la structuration patrimoniale et la protection d’entreprises relèvent du strict secret professionnel d’avocat (Attorney-Client Privilege).',
      p2Title: 'Indépendance et modèle boutique',
      p2Desc: 'Notre statut de cabinet boutique garantit une relation directe avec l’avocat sans lourdeurs administratives ni intermédiaires.',
      p3Title: 'Stratégie juridique et analyse des précédents',
      p3Desc: 'Chaque dossier s’appuie sur les précédents jurisprudentiels pertinents et une analyse rigoureuse du droit américain et international.',
      cardTitle: 'Contacter le cabinet',
      cardDesc: 'Exposez les grandes lignes de votre situation via notre bot Telegram confidentiel. L’analyse préliminaire est traitée rapidement afin de confirmer l’intervention.',
      cardBtn: 'Accéder au bot Telegram',
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
          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            {l.desc}
          </p>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
          <h2 className="text-2xl font-serif text-white font-bold">
            {l.subHeading}
          </h2>
          <p>
            {l.subDesc}
          </p>
          <ul className="space-y-4 pl-1">
            <li className="flex items-start gap-3 p-4 rounded-md bg-[#0B1220] border border-[#1C2C45]">
              <Shield size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block text-base mb-1">{l.p1Title}</strong>
                <span>{l.p1Desc}</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-md bg-[#0B1220] border border-[#1C2C45]">
              <Lock size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block text-base mb-1">{l.p2Title}</strong>
                <span>{l.p2Desc}</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-4 rounded-md bg-[#0B1220] border border-[#1C2C45]">
              <Scale size={20} className="text-gold-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white font-medium block text-base mb-1">{l.p3Title}</strong>
                <span>{l.p3Desc}</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-md bg-navy-900 border border-gold-500/30 space-y-4">
          <h3 className="text-xl font-serif text-white font-bold">
            {l.cardTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
            {l.cardDesc}
          </p>
          <div className="pt-2">
            <a
              href="https://t.me/VILEVIN_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-[#DFBA73] hover:bg-[#cfab5b] text-[#080B11] text-xs font-bold uppercase tracking-wider border border-[#FFE8A3]/40 shadow-md hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <span>{l.cardBtn}</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

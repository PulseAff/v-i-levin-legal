'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  ShieldCheck, 
  Scale, 
  Briefcase, 
  FileText, 
  Users, 
  ArrowRight, 
  Check, 
  Shield, 
  Clock, 
  Building2, 
  Globe2, 
  Send, 
  Award,
  Sparkles
} from 'lucide-react';
import { servicesData } from '@/data/servicesData';
import { LuxuryUsaFlag } from '@/components/ui/LuxuryUsaFlag';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import { useConsultation } from '@/context/ConsultationContext';

const iconMap: Record<string, React.ElementType> = {
  Compass,
  ShieldCheck,
  Scale,
  Briefcase,
  FileText,
  Users,
};

const serviceImages: Record<string, string> = {
  immigration: '/images/card-usa-v2.jpg',
  'legal-consultation': '/images/card-audit-modern.jpg',
  representation: '/images/card-arb-v2.jpg',
  business: '/images/card-biz-v1.jpg',
  contracts: '/images/card-strat-v2.jpg',
  'family-law': '/images/card-wealth-obsidian.jpg',
};

const PAGE_DICT: Record<LanguageCode, any> = {
  ru: {
    breadcrumbHome: 'Главная',
    breadcrumbServices: 'Практика & Услуги',
    pageTitle: 'Профессиональная юридическая поддержка',
    pageDesc: 'Индивидуальная стратегия, трансграничные процессуальные алгоритмы и построчный аудит рисков на стыке законодательства США, Великобритании, ЕС и стран Ближнего Востока. Никаких шаблонных решений.',
    badgeYears: '15+ лет в Нью-Йорке',
    badgePrivilege: 'Attorney-Client Privilege · Rule 1.6',
    badgeAudit: 'Zero-Reject Audit Methodology',
    categories: {
      all: 'Все направления (6)',
      immigration: 'США & Green Card',
      corporate: 'Корпоративное право',
      litigation: 'Арбитраж и споры',
      private: 'Частный капитал',
    },
    flagshipPractice: 'ФЛАГМАНСКАЯ ПРАКТИКА',
    deliverablesLabel: 'Ключевые блоки работы:',
    timelineLabel: 'Срок:',
    exploreDetails: 'Детали направления',
    standardsBadge: 'ИНСТИТУЦИОНАЛЬНЫЙ СТАНДАРТ',
    standardsTitle: 'Принципы ведения каждого дела',
    standards: [
      {
        title: 'Строгая конфиденциальность (Rule 1.6)',
        desc: 'Все материалы и переписка защищены режимом Attorney-Client Privilege. Ваши данные не подлежат раскрытию третьим лицам.',
      },
      {
        title: '15 лет практики в США',
        desc: 'Глубокое знание американской прецедентной системы изнутри: федеральные суды, правила USCIS и требования консульств.',
      },
      {
        title: 'Zero-Reject Audit',
        desc: 'Построчная проверка каждого доказательства и формы до официальной подачи исключает двусмысленности и процессуальные отказы.',
      },
      {
        title: 'Трансграничный охват',
        desc: 'Синхронизация правовых норм США, ЕС, Великобритании и стран Ближнего Востока в единую безопасную систему владения и защиты.',
      },
    ],
    ctaBadge: 'ПЕРСОНАЛЬНЫЙ РАЗБОР ОБСТОЯТЕЛЬСТВ',
    ctaTitle: 'Не уверены, какое направление подходит под вашу ситуацию?',
    ctaDesc: 'Опишите ключевые факты дела на первичной конфиденциальной сессии. Мы подготовим правовую оценку рисков и пошаговый маршрут действий.',
    ctaBtn: 'Записаться на консультацию',
    disclaimer: 'Attorney-Client Privilege · Rule 1.6 · Ответ в течение 24 часов',
    timelines: {
      immigration: '4–18 мес.',
      'legal-consultation': '24–48 ч.',
      representation: '2–6 нед.',
      business: '5–14 дней',
      contracts: '2–4 дня',
      'family-law': '5–10 дней',
    },
  },
  en: {
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Practice Areas',
    pageTitle: 'Professional Legal Support',
    pageDesc: 'Bespoke procedural strategy, line-by-line risk audits, and cross-border synchronization bridging the US, UK, EU, and Middle East jurisdictions. No templated solutions.',
    badgeYears: '15+ years in New York',
    badgePrivilege: 'Attorney-Client Privilege · Rule 1.6',
    badgeAudit: 'Zero-Reject Audit Methodology',
    categories: {
      all: 'All Practices (6)',
      immigration: 'USA & Green Card',
      corporate: 'Corporate & Contracts',
      litigation: 'Disputes & Litigation',
      private: 'Private Wealth & Family',
    },
    flagshipPractice: 'FLAGSHIP PRACTICE',
    deliverablesLabel: 'Core Deliverables:',
    timelineLabel: 'Timeline:',
    exploreDetails: 'Explore Details',
    standardsBadge: 'INSTITUTIONAL STANDARD',
    standardsTitle: 'Principles Governing Every Engagement',
    standards: [
      {
        title: 'Attorney-Client Privilege (Rule 1.6)',
        desc: 'All materials and correspondence are guarded under strict confidentiality privilege. Information is never disclosed to third parties.',
      },
      {
        title: '15 Years US Practice',
        desc: 'Deep insider mastery of US common law: federal courts, USCIS administrative precedent, and consular protocols.',
      },
      {
        title: 'Zero-Reject Audit',
        desc: 'Pre-filing line-by-line evidentiary scrutiny eliminates factual ambiguities and prevents administrative procedural denials.',
      },
      {
        title: 'Cross-Border Reach',
        desc: 'Harmonizing US, EU, UK, and Middle Eastern legal frameworks into a cohesive, secure asset and residency architecture.',
      },
    ],
    ctaBadge: 'CONFIDENTIAL CASE TRIAGE',
    ctaTitle: 'Uncertain which legal avenue best fits your scenario?',
    ctaDesc: 'Disclose key facts during a confidential intake session. We will formulate an authoritative risk analysis and tactical execution roadmap.',
    ctaBtn: 'Request Strategic Consultation',
    disclaimer: 'Attorney-Client Privilege · Rule 1.6 · Attorney response within 24 hours',
    timelines: {
      immigration: '4–18 mos.',
      'legal-consultation': '24–48 hrs.',
      representation: '2–6 wks.',
      business: '5–14 days',
      contracts: '2–4 days',
      'family-law': '5–10 days',
    },
  },
  uk: {
    breadcrumbHome: 'Головна',
    breadcrumbServices: 'Практика та послуги',
    pageTitle: 'Професійна правова підтримка',
    pageDesc: 'Індивідуальна стратегія, трансгранічні процесуальні алгоритми та детальний аудит ризиків на стику законодавства США, Великобританії, ЄС та Близького Сходу.',
    badgeYears: '15+ років у Нью-Йорку',
    badgePrivilege: 'Адвокатська таємниця · Rule 1.6',
    badgeAudit: 'Zero-Reject Audit Methodology',
    categories: {
      all: 'Усі напрямки (6)',
      immigration: 'США & Green Card',
      corporate: 'Корпоративне право',
      litigation: 'Арбітраж та спори',
      private: 'Приватний капітал',
    },
    flagshipPractice: 'ФЛАГМАНСЬКА ПРАКТИКА',
    deliverablesLabel: 'Ключові етапи роботи:',
    timelineLabel: 'Термін:',
    exploreDetails: 'Деталі напрямку',
    standardsBadge: 'ІНСТИТУЦІЙНИЙ СТАНДАРТ',
    standardsTitle: 'Принципи ведення кожної справи',
    standards: [
      {
        title: 'Сувора конфіденційність (Rule 1.6)',
        desc: 'Усі документи та листування захищені абсолютним режимом конфіденційності (Attorney-Client Privilege).',
      },
      {
        title: '15 років практики в США',
        desc: 'Глибоке знання американського прецедентного права, правил USCIS та консульських вимог.',
      },
      {
        title: 'Zero-Reject Audit',
        desc: 'Порядковий аудит доказів та форм виключає процесуальні відмови офіцерів.',
      },
      {
        title: 'Транскордонний захист',
        desc: 'Синхронізація норм США, ЄС, Великобританії та ОАЕ в єдину безпечну правову систему.',
      },
    ],
    ctaBadge: 'ПЕРСОНАЛЬНИЙ АНАЛІЗ ОБСТАВИН',
    ctaTitle: 'Не впевнені, який напрямок обрати під вашу ситуацію?',
    ctaDesc: 'Опишіть ключові обставини справи на конфіденційній сесії. Ми підготуємо правову оцінку ризиків та покроковий маршрут дій.',
    ctaBtn: 'Записатися на консультацію',
    disclaimer: 'Attorney-Client Privilege · Rule 1.6 · Відповідь протягом 24 годин',
    timelines: {
      immigration: '4–18 міс.',
      'legal-consultation': '24–48 год.',
      representation: '2–6 тиж.',
      business: '5–14 днів',
      contracts: '2–4 дні',
      'family-law': '5–10 днів',
    },
  },
  es: {
    breadcrumbHome: 'Inicio',
    breadcrumbServices: 'Áreas de práctica',
    pageTitle: 'Asistencia jurídica profesional',
    pageDesc: 'Estrategia procesal a medida, auditoría minuciosa de riesgos y sincronización legal transfronteriza entre EE.UU., Reino Unido, la UE y Oriente Medio.',
    badgeYears: '15+ años en Nueva York',
    badgePrivilege: 'Secreto profesional · Rule 1.6',
    badgeAudit: 'Metodología Zero-Reject Audit',
    categories: {
      all: 'Todas las áreas (6)',
      immigration: 'EE.UU. y Green Card',
      corporate: 'Derecho corporativo',
      litigation: 'Arbitraje y litigios',
      private: 'Patrimonio privado',
    },
    flagshipPractice: 'PRÁCTICA DESTACADA',
    deliverablesLabel: 'Entregables principales:',
    timelineLabel: 'Plazo:',
    exploreDetails: 'Ver detalles',
    standardsBadge: 'ESTÁNDAR INSTITUCIONAL',
    standardsTitle: 'Principios de cada expediente',
    standards: [
      {
        title: 'Secreto profesional (Rule 1.6)',
        desc: 'Todos los documentos y comunicaciones están blindados por el secreto profesional.',
      },
      {
        title: '15 años de práctica en EE.UU.',
        desc: 'Dominio exhaustivo del sistema judicial estadounidense, normativas USCIS y consulados.',
      },
      {
        title: 'Zero-Reject Audit',
        desc: 'Auditoría línea por línea antes de presentar para evitar denegaciones procesales.',
      },
      {
        title: 'Alcance transfronterizo',
        desc: 'Integración de las normativas de EE.UU., la UE, Reino Unido y EAU en una arquitectura jurídica blindada.',
      },
    ],
    ctaBadge: 'EVALUACIÓN CONFIDENCIAL',
    ctaTitle: '¿Tiene dudas sobre qué vía corresponde a su situación?',
    ctaDesc: 'Exponga los hechos clave durante una consulta estratégica inicial. Recibirá una valoración objetiva y un plan procesal claro.',
    ctaBtn: 'Solicitar consulta legal',
    disclaimer: 'Secreto profesional · Rule 1.6 · Respuesta de abogado en 24 horas',
    timelines: {
      immigration: '4–18 meses',
      'legal-consultation': '24–48 h',
      representation: '2–6 semanas',
      business: '5–14 días',
      contracts: '2–4 días',
      'family-law': '5–10 días',
    },
  },
  it: {
    breadcrumbHome: 'Home',
    breadcrumbServices: 'Pratiche e servizi',
    pageTitle: 'Consulenza legale strategica',
    pageDesc: 'Strategia su misura, audit rigoroso dei rischi e raccordo transfrontaliero tra gli ordinamenti di Stati Uniti, Regno Unito, Unione Europea e Medio Oriente.',
    badgeYears: '15+ anni a New York',
    badgePrivilege: 'Segreto professionale · Rule 1.6',
    badgeAudit: 'Metodologia Zero-Reject Audit',
    categories: {
      all: 'Tutte le aree (6)',
      immigration: 'USA & Green Card',
      corporate: 'Diritto societario',
      litigation: 'Arbitrato e contenzioso',
      private: 'Patrimonio privato',
    },
    flagshipPractice: 'PRATICA DI PUNTA',
    deliverablesLabel: 'Fasi operative chiave:',
    timelineLabel: 'Tempistiche:',
    exploreDetails: 'Dettagli pratica',
    standardsBadge: 'STANDARD ISTITUZIONALE',
    standardsTitle: 'Principi alla base di ogni incarico',
    standards: [
      {
        title: 'Segreto professionale (Rule 1.6)',
        desc: 'Tutti i fascicoli sono tutelati dal vincolo del segreto professionale e non sono accessibili a terzi.',
      },
      {
        title: '15 anni di attività negli Stati Uniti',
        desc: 'Conoscenza diretta del sistema giuridico americano, prassi USCIS e procedure consolari.',
      },
      {
        title: 'Zero-Reject Audit',
        desc: 'Revisione analitica di moduli e prove prima del deposito formale per prevenire rigetti.',
      },
      {
        title: 'Competenza transfrontaliera',
        desc: 'Sincronizzazione degli standard USA, UE, UK ed EAU in una struttura solida e conforme.',
      },
    ],
    ctaBadge: 'ANALISI PRELIMINARE RISERVATA',
    ctaTitle: 'Dubbi sulla procedura più idonea al vostro caso?',
    ctaDesc: 'Descrivete i punti cardine durante un colloquio iniziale riservato. Forniremo un quadro analitico dei rischi e una strategia d’azione.',
    ctaBtn: 'Richiedi consulenza strategica',
    disclaimer: 'Segreto professionale · Rule 1.6 · Riscontro dell’avvocato entro 24 ore',
    timelines: {
      immigration: '4–18 mesi',
      'legal-consultation': '24–48 ore',
      representation: '2–6 sett.',
      business: '5–14 giorni',
      contracts: '2–4 giorni',
      'family-law': '5–10 giorni',
    },
  },
  fr: {
    breadcrumbHome: 'Accueil',
    breadcrumbServices: 'Domaines d\'intervention',
    pageTitle: 'Conseil juridique professionnel',
    pageDesc: 'Stratégie sur mesure, audit préventif rigoureux des risques et coordination transfrontalière entre les juridictions des États-Unis, du Royaume-Uni, de l\'UE et du Moyen-Orient.',
    badgeYears: '15+ ans à New York',
    badgePrivilege: 'Secret professionnel · Rule 1.6',
    badgeAudit: 'Méthodologie Zero-Reject Audit',
    categories: {
      all: 'Tous les domaines (6)',
      immigration: 'USA & Green Card',
      corporate: 'Droit des affaires',
      litigation: 'Arbitrage & contentieux',
      private: 'Gestion de patrimoine',
    },
    flagshipPractice: 'DOMAINE D\'EXCELLENCE',
    deliverablesLabel: 'Livrables fondamentaux :',
    timelineLabel: 'Délais :',
    exploreDetails: 'Consulter la pratique',
    standardsBadge: 'EXIGENCE INSTITUTIONNELLE',
    standardsTitle: 'Principes directeurs de chaque dossier',
    standards: [
      {
        title: 'Secret professionnel (Rule 1.6)',
        desc: 'Toutes les correspondances et pièces sont couvertes par le secret professionnel absolu.',
      },
      {
        title: '15 ans de pratique aux États-Unis',
        desc: 'Connaissance intime de la jurisprudence américaine, de l\'USCIS et des consulats.',
      },
      {
        title: 'Zero-Reject Audit',
        desc: 'Vérification exhaustive de chaque formulaire et preuve avant soumission pour prévenir les refus.',
      },
      {
        title: 'Portée transfrontalière',
        desc: 'Coordination des règles juridiques USA, UE, Royaume-Uni et ÉAU dans une structure sécurisée.',
      },
    ],
    ctaBadge: 'AUDIT DE SITUATION CONFIDENTIEL',
    ctaTitle: 'Vous hésitez sur la démarche adaptée à votre situation ?',
    ctaDesc: 'Présentez les faits lors d\'une séance d\'évaluation confidentielle. Nous établirons un audit des risques et une stratégie claire.',
    ctaBtn: 'Demander une consultation',
    disclaimer: 'Secret professionnel · Rule 1.6 · Réponse d\'un avocat sous 24 heures',
    timelines: {
      immigration: '4–18 mois',
      'legal-consultation': '24–48 h',
      representation: '2–6 sem.',
      business: '5–14 jours',
      contracts: '2–4 jours',
      'family-law': '5–10 jours',
    },
  },
};

export default function ServicesIndexPage() {
  const { currentLang, t } = useLanguage();
  const { openConsultation } = useConsultation();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const p = PAGE_DICT[currentLang] || PAGE_DICT.ru;

  // Filter services
  const filteredServices = activeCategory === 'all'
    ? servicesData
    : servicesData.filter(s => s.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#05070E] text-gray-100 selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* 1. HERO HEADER WITH LUXURY EDITORIAL ATMOSPHERE */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-[#182336] overflow-hidden">
        {/* Background with Judicial Chamber & High-rise Skyline */}
        <div className="absolute top-0 left-0 right-0 h-[480px] lg:h-[540px] pointer-events-none overflow-hidden select-none">
          <img
            src="/images/services-hero-bg.jpg"
            alt="International Legal Services"
            className="w-full h-full object-cover object-center opacity-40 contrast-[1.08] brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#05070E]/80 via-[#05070E]/90 to-[#05070E]" />
        </div>

        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-900/15 via-transparent to-transparent blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Breadcrumb - Centered */}
          <nav className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400 mb-6">
            <Link href="/" className="hover:text-gold-300 transition-colors">
              {p.breadcrumbHome}
            </Link>
            <span className="text-gray-600">/</span>
            <span className="text-gold-400 font-semibold">
              {p.breadcrumbServices}
            </span>
          </nav>

          <div className="max-w-3xl space-y-4 flex flex-col items-center">
            {/* Page Headline - Centered & Updated */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-serif text-white font-bold tracking-tight leading-tight drop-shadow-md">
              {p.pageTitle}
            </h1>

            {/* Subtitle Manifesto - Centered */}
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl pt-1 drop-shadow-sm">
              {p.pageDesc}
            </p>

            {/* Credibility Key Metrics - Centered */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-300">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0B101D]/90 border border-[#1E2B42] backdrop-blur-md shadow-md">
                <LuxuryUsaFlag size="sm" />
                <span className="font-semibold text-white">{p.badgeYears}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0B101D]/90 border border-[#1E2B42] backdrop-blur-md shadow-md">
                <Shield size={13} className="text-gold-400" />
                <span>{p.badgePrivilege}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0B101D]/90 border border-[#1E2B42] backdrop-blur-md shadow-md">
                <Award size={13} className="text-gold-400" />
                <span>{p.badgeAudit}</span>
              </div>
            </div>

          </div>

          {/* 2. CATEGORY FILTER TABS */}
          <div className="mt-10 pt-6 border-t border-[#162030] w-full flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {Object.entries(p.categories).map(([key, labelText]) => {
              const isSelected = activeCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#DFBA73] to-[#B99245] text-black shadow-md shadow-gold-500/20 font-bold'
                      : 'bg-[#090F1C] text-gray-300 hover:text-white border border-[#1D2B40] hover:border-gold-500/40'
                  }`}
                >
                  {key === 'immigration' && <LuxuryUsaFlag size="xs" />}
                  <span>{labelText as string}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. DETAILED PRACTICE CARDS (Smooth elevation & GPU isolated) */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const Icon = iconMap[service.iconName] || Briefcase;
            const isUsa = service.slug === 'immigration';
            const cardImage = serviceImages[service.slug] || '/images/card-usa-v2.jpg';
            
            // Map 1:1 with t('services', 'c1Title') etc.
            const slugKeyMap: Record<string, string> = {
              immigration: 'c1',
              business: 'c2',
              'family-law': 'c3',
              representation: 'c4',
              'legal-consultation': 'c5',
              contracts: 'c6',
            };
            const cKey = slugKeyMap[service.slug] || 'c1';
            const displayTitle = t('services', `${cKey}Title`) || service.title;
            const displayDesc = t('services', `${cKey}Desc`) || service.shortDesc;
            const displayCode = t('services', `${cKey}Code`) || service.heroBadge;

            return (
              <div
                key={service.slug}
                className={`rounded-md border transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between group overflow-hidden transform-gpu backface-hidden will-change-transform ${
                  isUsa
                    ? 'bg-gradient-to-b from-[#061812] via-[#040F0B] to-[#030A07] border-[#10B981]/50 shadow-[0_8px_30px_rgba(6,95,70,0.25)] hover:-translate-y-[3.8px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.6)]'
                    : 'bg-[#080D17] border-[#182436] hover:border-[#2B3F63] shadow-xl hover:-translate-y-[3.8px] hover:shadow-[0_10px_24px_rgba(0,0,0,0.6)]'
                }`}
              >
                <div>
                  {/* Visual Card Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden border-b border-[#1A2538]">
                    <img
                      src={cardImage}
                      alt={displayTitle}
                      className="w-full h-full object-cover object-center brightness-[0.92] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080D17] via-black/40 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {isUsa ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#063321]/90 backdrop-blur-md border border-[#10B981]/60 text-emerald-200 text-[10.5px] font-bold font-mono tracking-wider shadow-md">
                          <LuxuryUsaFlag size="xs" />
                          <span>{p.flagshipPractice}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[#FFE8A3] border border-[#FFE8A3]/30 uppercase shadow-sm">
                          {displayCode}
                        </span>
                      )}

                      <span className="w-7 h-7 rounded-md bg-black/75 backdrop-blur-md border border-white/10 flex items-center justify-center text-gray-300 text-xs font-mono font-bold transition-colors">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Icon overlay at bottom left of image */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-md flex items-center justify-center shadow-lg ${
                        isUsa 
                          ? 'bg-[#09472E] text-emerald-200 border border-[#10B981]/60' 
                          : 'bg-[#0E1726] text-gold-300 border border-gold-500/40'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <span className="text-[10px] font-mono tracking-widest uppercase font-semibold text-gray-300 drop-shadow-md">
                        {service.category.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-4">
                    {/* Title */}
                    <h2 className="text-xl font-serif text-white font-bold group-hover:text-gold-200 transition-colors leading-snug">
                      {displayTitle}
                    </h2>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-gray-300 leading-relaxed font-light line-clamp-3">
                      {displayDesc}
                    </p>

                    {/* Deliverables Bullet Points */}
                    <div className="space-y-1.5 pt-2 border-t border-[#152032]">
                      <div className="text-[10px] font-mono uppercase tracking-widest text-[#FFE8A3] font-semibold">
                        {p.deliverablesLabel}
                      </div>
                      {service.included.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-gray-300/95 font-light">
                          <div className="w-3.5 h-3.5 rounded-full bg-gold-500/10 border border-gold-500/40 flex items-center justify-center shrink-0 mt-0.5 text-gold-400">
                            <Check size={9} />
                          </div>
                          <span className="line-clamp-1">{inc}</span>
                        </div>
                      ))}
                    </div>

                    {/* Target Audience Micro-Chips */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {service.forWhom.slice(0, 2).map((item, i) => (
                          <span 
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#0D1524] border border-[#1C2C44] text-[10.5px] text-gray-300 font-light truncate max-w-full"
                          >
                            {item.split('(')[0].trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-3 border-t border-[#152032] flex items-center justify-between bg-[#060A13]/60">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400">
                    <Clock size={12} className="text-[#FFE8A3]" />
                    <span>{p.timelineLabel} {p.timelines[service.slug] || '4–8 wks'}</span>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-[12px] font-serif font-semibold text-[#FFE8A3] group-hover:text-white transition-colors uppercase tracking-wider"
                  >
                    <span>{p.exploreDetails}</span>
                    <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-200 ease-out text-[#FFE8A3] group-hover:text-white" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. INSTITUTIONAL STANDARDS & GUARANTEES */}
      <section className="py-14 border-t border-[#182336] bg-[#070B14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-400 font-bold block mb-2">
              {p.standardsBadge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-white font-bold">
              {p.standardsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {p.standards.map((st: any, idx: number) => {
              const icons = [Shield, Building2, Award, Globe2];
              const StIcon = icons[idx] || Shield;
              return (
                <div key={idx} className="relative p-6 rounded-md bg-[#090F1C] border border-[#1E2E48] space-y-2 pr-14 transition-colors">
                  <div className="absolute top-5 right-5 w-8 h-8 rounded-md bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-300 shadow-sm">
                    <StIcon size={16} />
                  </div>
                  <h4 className="text-sm font-semibold text-white">{st.title}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. STRATEGIC CONSULTATION CTA BANNER */}
      <section className="py-14 border-t border-[#182336] bg-gradient-to-b from-[#070B14] to-[#04060B]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-mono uppercase tracking-wider">
            {p.ctaBadge}
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif text-white font-bold leading-tight">
            {p.ctaTitle}
          </h3>

          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto font-light leading-relaxed">
            {p.ctaDesc}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openConsultation('Юридические консультации и аудит')}
              className="w-full sm:w-auto px-6 py-3 rounded-md bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_4px_20px_rgba(212,175,55,0.35)] border border-[#FFE8A3] cursor-pointer"
            >
              {p.ctaBtn}
            </button>
          </div>

          <p className="text-[11px] text-gray-400 font-mono pt-2">
            {p.disclaimer}
          </p>
        </div>
      </section>

    </div>
  );
}

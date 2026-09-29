'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, MessageSquare, Award, Clock } from 'lucide-react';
import { LuxuryUsaFlag } from '@/components/ui/LuxuryUsaFlag';
import { useLanguage } from '@/context/LanguageContext';

export default function GreenCardPage() {
  const { currentLang } = useLanguage();

  const labels: Record<string, {
    home: string;
    breadcrumb: string;
    badge: string;
    title: string;
    desc: string;
    btnTg: string;
    btnTest: string;
    tracksHeading: string;
    eb1Priority: string;
    eb1Queue: string;
    eb1Title: string;
    eb1Desc: string;
    eb1Point1: string;
    eb1Point2: string;
    eb1Point3: string;
    eb2Priority: string;
    eb2Precedent: string;
    eb2Title: string;
    eb2Desc: string;
    eb2Point1: string;
    eb2Point2: string;
    eb2Point3: string;
    stepsHeading: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    step4Title: string;
    step4Desc: string;
    link1Badge: string;
    link1Title: string;
    link1Desc: string;
    link2Badge: string;
    link2Title: string;
    link2Desc: string;
    disclaimerTitle: string;
    disclaimerText: string;
  }> = {
    ru: {
      home: 'Главная',
      breadcrumb: 'США / Green Card',
      badge: 'Флагманская вертикаль практики',
      title: 'Грин-карта в США: профессиональные и семейные треки',
      desc: 'Стратегическое юридическое сопровождение получения иммиграционного статуса резидента США (Lawful Permanent Resident). Мы работаем с основаниями для специалистов экстра-класса (EB-1A), национального интереса (EB-2 NIW) и сложными семейными случаями.',
      btnTg: 'Оценить шансы в Telegram',
      btnTest: 'Интерактивный тест EB-1A / NIW',
      tracksHeading: 'Ключевые иммиграционные категории без работодателя',
      eb1Priority: 'Высший приоритет (EB-1)',
      eb1Queue: 'Нет очередей',
      eb1Title: 'EB-1A: Extraordinary Ability',
      eb1Desc: 'Для признанных лидеров в науке, технологиях, бизнесе или искусстве. Требуется соответствие минимум 3 из 10 критериев USCIS и прохождение теста Kazarian.',
      eb1Point1: 'Подача напрямую заявителем (Self-petition)',
      eb1Point2: 'Доступен Premium Processing (решение за 15 календарных дней)',
      eb1Point3: 'Грин-карта для заявителя, супруга/супруги и детей до 21 года',
      eb2Priority: 'Второй приоритет (EB-2)',
      eb2Precedent: 'Прецедент Dhanasar',
      eb2Title: 'EB-2 NIW: National Interest Waiver',
      eb2Desc: 'Для специалистов с продвинутым образованием (Advanced Degree) или исключительными способностями, чья деятельность представляет национальный интерес для США.',
      eb2Point1: 'Освобождение от трудовой сертификации PERM',
      eb2Point2: 'Мягче критерии признания по сравнению с EB-1A',
      eb2Point3: 'Доступен Premium Processing (решение за 45 календарных дней)',
      stepsHeading: 'Этапы сопровождения в практике V. I. LEVIN',
      step1Title: 'Аудит портфолио и выбор стратегии',
      step1Desc: 'Изучаем публикации, патенты, руководящий опыт, уровень дохода и медийные упоминания. Определяем, по какому треку шанс одобрения максимален.',
      step2Title: 'Сбор доказательной базы и писем независимых экспертов',
      step2Desc: 'Формулируем драфты рекомендательных писем от независимых профессоров и индустриальных лидеров из США и других стран. Собираем подтверждения оригинального вклада.',
      step3Title: 'Подготовка петиции I-140 и юридического меморандума',
      step3Desc: 'Составляем аргументированный 200–300 страничный петиционный пакет со ссылками на прецедентное право USCIS. Реагируем на запросы офицера (RFE), если они возникают.',
      step4Title: 'Consular Processing и подготовка к собеседованию',
      step4Desc: 'Заполнение анкеты DS-260, подготовка финансового аффидевита, сбор гражданских документов и проведение персональной симуляции консульского интервью.',
      link1Badge: 'Подготовка к консульству',
      link1Title: 'Гид по интервью в посольстве США →',
      link1Desc: 'Типичные вопросы офицера, проверка анкет DS-260, отработка сложных моментов биографии.',
      link2Badge: 'Экспресс-тестирование',
      link2Title: 'Опросник соответствия критериям EB-1A →',
      link2Desc: '10 вопросов по критериям USCIS с моментальным расчетом баллов готовности.',
      disclaimerTitle: 'Юридический дисклеймер:',
      disclaimerText: 'Практика V. I. LEVIN не гарантирует выдачу визы или одобрение петиции суверенными органами власти США (USCIS, Department of State). Все решения принимаются исключительно уполномоченными иммиграционными офицерами. Дата актуализации информации: сентябрь 2026 года.',
    },
    en: {
      home: 'Home',
      breadcrumb: 'USA / Green Card',
      badge: 'Flagship Practice Vertical',
      title: 'US Green Card: Professional & Family Pathways',
      desc: 'Strategic legal counsel for acquiring US Lawful Permanent Resident status. We specialize in petition pathways for individuals of Extraordinary Ability (EB-1A), National Interest Waivers (EB-2 NIW), and complex family immigration petitions.',
      btnTg: 'Evaluate Profile via Telegram',
      btnTest: 'Interactive EB-1A / NIW Test',
      tracksHeading: 'Key Self-Petition Immigration Categories',
      eb1Priority: 'First Preference (EB-1)',
      eb1Queue: 'Immediate Visa Numbers',
      eb1Title: 'EB-1A: Extraordinary Ability',
      eb1Desc: 'For recognized international leaders in sciences, arts, business, or athletics. Requires meeting at least 3 of 10 USCIS regulatory criteria and satisfying the two-step Kazarian framework.',
      eb1Point1: 'Direct self-petition without employer sponsorship',
      eb1Point2: 'Premium Processing available (decision within 15 calendar days)',
      eb1Point3: 'Permanent residency for applicant, spouse, and unmarried children under 21',
      eb2Priority: 'Second Preference (EB-2)',
      eb2Precedent: 'Matter of Dhanasar',
      eb2Title: 'EB-2 NIW: National Interest Waiver',
      eb2Desc: 'For professionals holding advanced degrees or exceptional abilities whose proposed endeavor possesses substantial merit and national importance to the United States.',
      eb2Point1: 'Waiver of tedious PERM labor certification requirement',
      eb2Point2: 'More flexible recognition thresholds than EB-1A standards',
      eb2Point3: 'Premium Processing available (decision within 45 calendar days)',
      stepsHeading: 'Stages of Representation at V. I. LEVIN',
      step1Title: 'Portfolio Audit & Strategic Track Selection',
      step1Desc: 'We evaluate publications, citations, patents, critical executive roles, compensation, and press mentions to determine optimal probability of approval.',
      step2Title: 'Evidence Compiling & Independent Expert Letters',
      step2Desc: 'We formulate authoritative recommendation letters from independent scholars and industry pioneers across the US and worldwide, substantiating your original contributions.',
      step3Title: 'I-140 Petition Filing & Legal Brief Drafting',
      step3Desc: 'We author a comprehensive 200-300 page legal petition brief grounded in binding AAO and federal judicial precedents, actively defending against Requests for Evidence (RFEs).',
      step4Title: 'Consular Processing & Interview Simulation',
      step4Desc: 'DS-260 preparation, financial affidavits, civil records authentication, and one-on-one consular interview cross-examination drills.',
      link1Badge: 'Consular Preparation',
      link1Title: 'US Embassy Interview Protocol Guide →',
      link1Desc: 'Typical officer lines of inquiry, DS-260 consistency checks, and resolving sensitive background flags.',
      link2Badge: 'Rapid Assessment',
      link2Title: 'EB-1A Regulatory Criteria Quiz →',
      link2Desc: '10-question USCIS criterion evaluation with real-time profile viability scoring.',
      disclaimerTitle: 'Legal Disclaimer:',
      disclaimerText: 'The legal practice of V. I. LEVIN does not guarantee visa issuance or petition approval by United States sovereign authorities (USCIS, Department of State). All adjudications are made exclusively by authorized consular and immigration officers. Information verified: September 2026.',
    },
    uk: {
      home: 'Головна',
      breadcrumb: 'США / Green Card',
      badge: 'Флагманська вертикаль практики',
      title: 'Грін-карта в США: професійні та сімейні треки',
      desc: 'Стратегічний юридичний супровід отримання статусу постійного резидента США (Lawful Permanent Resident). Спеціалізація на програмах для фахівців екстра-класу (EB-1A), національного інтересу (EB-2 NIW) та сімейних справах.',
      btnTg: 'Оцінити шанси в Telegram',
      btnTest: 'Інтерактивний тест EB-1A / NIW',
      tracksHeading: 'Ключові імміграційні категорії без роботодавця',
      eb1Priority: 'Вищий пріоритет (EB-1)',
      eb1Queue: 'Без черг',
      eb1Title: 'EB-1A: Extraordinary Ability',
      eb1Desc: 'Для лідерів у науці, технологіях, бізнесі чи мистецтві. Необхідна відповідність мінімум 3 з 10 критеріїв USCIS та проходження двоступеневого тесту Kazarian.',
      eb1Point1: 'Подання безпосередньо заявником (Self-petition)',
      eb1Point2: 'Доступний Premium Processing (рішення за 15 календарних днів)',
      eb1Point3: 'Грін-карта для заявника, подружжя та дітей до 21 року',
      eb2Priority: 'Другий пріоритет (EB-2)',
      eb2Precedent: 'Прецедент Dhanasar',
      eb2Title: 'EB-2 NIW: National Interest Waiver',
      eb2Desc: 'Для фахівців із вищою освітою (Advanced Degree) або винятковими здібностями, чия діяльність становить національний інтерес для США.',
      eb2Point1: 'Звільнення від трудової сертифікації PERM',
      eb2Point2: 'Гнучкіші критерії відповідності порівняно з EB-1A',
      eb2Point3: 'Доступний Premium Processing (рішення за 45 календарних днів)',
      stepsHeading: 'Етапи супроводу в практиці V. I. LEVIN',
      step1Title: 'Аудит портфоліо та вибір стратегії',
      step1Desc: 'Аналізуємо публікації, патенти, керівний досвід, рівень доходу та згадки в медіа для визначення треку з максимальною ймовірністю схвалення.',
      step2Title: 'Збір доказів та листів незалежних експертів',
      step2Desc: 'Готуємо драфти рекомендаційних листів від незалежних професорів і галузевих лідерів із США та світу, фіксуючи оригінальний внесок.',
      step3Title: 'Підготовка петиції I-140 та правового меморандуму',
      step3Desc: 'Складаємо детальний петиційний пакет на 200–300 сторінок із посиланням на прецедентне право USCIS та оперативно реагуємо на запити RFE.',
      step4Title: 'Consular Processing та підготовка до співбесіди',
      step4Desc: 'Заповнення DS-260, підготовка фінансових афідевітів, перевірка цивільних документів та моделювання консульського інтерв’ю.',
      link1Badge: 'Підготовка до консульства',
      link1Title: 'Гід з інтерв’ю в посольстві США →',
      link1Desc: 'Типові питання офіцера, звірка анкет DS-260, усунення складних моментів біографії.',
      link2Badge: 'Експрес-тестування',
      link2Title: 'Опитувальник відповідності критеріям EB-1A →',
      link2Desc: '10 запитань за стандартами USCIS із миттєвим розрахунком готовності кейсу.',
      disclaimerTitle: 'Юридичний дисклеймер:',
      disclaimerText: 'Практика V. I. LEVIN не гарантує видачу візи або схвалення петиції суверенними органами влади США (USCIS, Department of State). Усі рішення приймаються виключно уповноваженими імміграційними офіцерами. Дата актуалізації: вересень 2026 року.',
    },
    es: {
      home: 'Inicio',
      breadcrumb: 'EE.UU. / Green Card',
      badge: 'Área estratégica del despacho',
      title: 'Green Card en EE. UU.: Vías profesionales y familiares',
      desc: 'Asesoramiento jurídico estratégico para la obtención del estatus de residente permanente legal en EE. UU. (Lawful Permanent Resident). Tramitamos peticiones de Habilidad Extraordinaria (EB-1A), Exención por Interés Nacional (EB-2 NIW) y expedientes familiares complejos.',
      btnTg: 'Evaluar perfil en Telegram',
      btnTest: 'Test interactivo EB-1A / NIW',
      tracksHeading: 'Categorías migratorias clave sin patrocinador de empleo',
      eb1Priority: 'Primera preferencia (EB-1)',
      eb1Queue: 'Disponibilidad inmediata',
      eb1Title: 'EB-1A: Habilidad Extraordinaria',
      eb1Desc: 'Para líderes reconocidos en ciencias, tecnología, empresa o artes. Requiere acreditar al menos 3 de los 10 criterios normativos de USCIS y superar el estándar Kazarian.',
      eb1Point1: 'Petición directa por el propio solicitante (Self-petition)',
      eb1Point2: 'Tramitación prioritaria disponible (resolución en 15 días)',
      eb1Point3: 'Residencia permanente para solicitante, cónyuge e hijos menores de 21 años',
      eb2Priority: 'Segunda preferencia (EB-2)',
      eb2Precedent: 'Precedente Dhanasar',
      eb2Title: 'EB-2 NIW: Exención por Interés Nacional',
      eb2Desc: 'Para profesionales con titulación superior o aptitudes excepcionales cuya labor reviste interés sustancial e importancia nacional para los Estados Unidos.',
      eb2Point1: 'Exención de la certificación laboral PERM',
      eb2Point2: 'Criterios de acreditación más flexibles que en EB-1A',
      eb2Point3: 'Tramitación prioritaria disponible (resolución en 45 días)',
      stepsHeading: 'Fases de tramitación en V. I. LEVIN',
      step1Title: 'Auditoría de perfil y elección estratégica',
      step1Desc: 'Evaluamos publicaciones, patentes, trayectoria de dirección e ingresos para definir la vía con mayor probabilidad de éxito.',
      step2Title: 'Recopilación probatoria y cartas periciales',
      step2Desc: 'Redactamos cartas de apoyo pericial de académicos y líderes del sector en EE. UU. y a nivel internacional para respaldar su aportación original.',
      step3Title: 'Presentación de la petición I-140 y alegato jurídico',
      step3Desc: 'Elaboramos un expediente técnico de 200 a 300 páginas con fundamentación jurídica sólida ante USCIS y respuesta inmediata ante cualquier requerimiento (RFE).',
      step4Title: 'Trámite consular y simulación de entrevista',
      step4Desc: 'Cumplimentación de DS-260, afidávits de solvencia, legalización documental y simulacro personalizado de la entrevista consular.',
      link1Badge: 'Preparación consular',
      link1Title: 'Guía para la entrevista en la Embajada de EE. UU. →',
      link1Desc: 'Preguntas habituales de los funcionarios, consistencia de datos y resolución de discrepancias.',
      link2Badge: 'Evaluación rápida',
      link2Title: 'Cuestionario de idoneidad EB-1A →',
      link2Desc: '10 preguntas según los baremos de USCIS con puntuación inmediata de viabilidad.',
      disclaimerTitle: 'Aviso legal:',
      disclaimerText: 'El despacho V. I. LEVIN no garantiza la concesión de visados ni la aprobación de peticiones por parte de las autoridades soberanas de EE. UU. (USCIS, Departamento de Estado). Toda resolución corresponde en exclusiva a los funcionarios competentes. Información actualizada: septiembre 2026.',
    },
    it: {
      home: 'Home',
      breadcrumb: 'USA / Green Card',
      badge: 'Area di punta dello studio',
      title: 'Green Card USA: Percorsi professionali e familiari',
      desc: 'Consulenza legale strategica per l’acquisizione dello status di residente permanente negli Stati Uniti (Lawful Permanent Resident). Seguiamo le pratiche EB-1A (Extraordinary Ability), EB-2 NIW (National Interest Waiver) e i ricongiungimenti familiari complessi.',
      btnTg: 'Valuta il profilo su Telegram',
      btnTest: 'Test interattivo EB-1A / NIW',
      tracksHeading: 'Principali categorie di immigrazione senza sponsor datoriale',
      eb1Priority: 'Prima preferenza (EB-1)',
      eb1Queue: 'Nessuna attesa di visto',
      eb1Title: 'EB-1A: Abilità Straordinaria',
      eb1Desc: 'Dedicato a leader riconosciuti in campo scientifico, tecnologico, aziendale o artistico. Richiede la conformità ad almeno 3 dei 10 criteri USCIS e il superamento del test Kazarian.',
      eb1Point1: 'Domanda diretta presentata dal richiedente (Self-petition)',
      eb1Point2: 'Premium Processing disponibile (esito entro 15 giorni)',
      eb1Point3: 'Green Card per il richiedente, coniuge e figli minori di 21 anni',
      eb2Priority: 'Seconda preferenza (EB-2)',
      eb2Precedent: 'Precedente Dhanasar',
      eb2Title: 'EB-2 NIW: National Interest Waiver',
      eb2Desc: 'Per professionisti con titoli accademici avanzati o capacità eccezionali la cui attività rivesta un interesse nazionale strategico per gli Stati Uniti.',
      eb2Point1: 'Esenzione dalla certificazione del lavoro PERM',
      eb2Point2: 'Criteri di ammissione più flessibili rispetto a EB-1A',
      eb2Point3: 'Premium Processing disponibile (esito entro 45 giorni)',
      stepsHeading: 'Fasi operative dello studio V. I. LEVIN',
      step1Title: 'Analisi del dossier e impostazione strategica',
      step1Desc: 'Esaminiamo pubblicazioni, brevetti, incarichi apicali e riconoscimenti pubblici per identificare la procedura a più alta probabilità di accoglimento.',
      step2Title: 'Costruzione della prova e lettere di esperti terzi',
      step2Desc: 'Predisponiamo lettere di raccomandazione autorevoli da parte di accademici e dirigenti industriali negli USA e internazionali.',
      step3Title: 'Redazione della petizione I-140 e memoria legale',
      step3Desc: 'Elaboriamo una memoria giuridica articolata di 200–300 pagine basata su precedenti vincolanti USCIS, gestendo eventuali richieste di chiarimenti (RFE).',
      step4Title: 'Procedura consolare e simulazione del colloquio',
      step4Desc: 'Compilazione DS-260, verifiche fiscali e anagrafiche, conduzione di simulazioni mirate del colloquio presso il consolato statunitense.',
      link1Badge: 'Preparazione consolare',
      link1Title: 'Guida al colloquio presso l’Ambasciata USA →',
      link1Desc: 'Domande ricorrenti del console, coerenza dei formulari e chiarimento di punti critici.',
      link2Badge: 'Verifica preliminare',
      link2Title: 'Questionario di conformità EB-1A →',
      link2Desc: '10 parametri USCIS con calcolo immediato del punteggio di ammissibilità.',
      disclaimerTitle: 'Avvertenza legale:',
      disclaimerText: 'Lo studio V. I. LEVIN non garantisce il rilascio di visti o l’approvazione di istanze da parte delle autorità governative statunitensi (USCIS, Dipartimento di Stato). Ogni provvedimento è demandato esclusivamente agli ufficiali preposti. Aggiornamento dati: settembre 2026.',
    },
    fr: {
      home: 'Accueil',
      breadcrumb: 'USA / Green Card',
      badge: 'Pôle d’excellence du cabinet',
      title: 'Green Card USA : Voies professionnelles et familiales',
      desc: 'Accompagnement juridique de haut niveau pour l’obtention de la résidence permanente légale aux États-Unis (Lawful Permanent Resident). Expertise pointue en matière d’aptitudes extraordinaires (EB-1A), d’intérêt national (EB-2 NIW) et de dossiers familiaux complexes.',
      btnTg: 'Évaluer le dossier sur Telegram',
      btnTest: 'Test interactif EB-1A / NIW',
      tracksHeading: 'Catégories d’immigration clés sans sponsor employeur',
      eb1Priority: 'Première priorité (EB-1)',
      eb1Queue: 'Disponibilité immédiate',
      eb1Title: 'EB-1A: Extraordinary Ability',
      eb1Desc: 'Destiné aux figures majeures dans les sciences, les affaires, les technologies ou les arts. Exige la satisfaction d’au moins 3 des 10 critères de l’USCIS et l’évaluation Kazarian.',
      eb1Point1: 'Dépôt direct par le requérant (Self-petition)',
      eb1Point2: 'Premium Processing disponible (décision sous 15 jours calendaires)',
      eb1Point3: 'Green Card pour le requérant, le conjoint et les enfants de moins de 21 ans',
      eb2Priority: 'Deuxième priorité (EB-2)',
      eb2Precedent: 'Précédent Dhanasar',
      eb2Title: 'EB-2 NIW: National Interest Waiver',
      eb2Desc: 'Pour les diplômés de haut niveau ou les professionnels aux compétences exceptionnelles dont le projet présente un intérêt national stratégique pour les États-Unis.',
      eb2Point1: 'Dispense de la certification de travail PERM',
      eb2Point2: 'Critères de recevabilité plus souples qu’en catégorie EB-1A',
      eb2Point3: 'Premium Processing disponible (décision sous 45 jours calendaires)',
      stepsHeading: 'Étapes d’accompagnement par V. I. LEVIN',
      step1Title: 'Audit de profil et arbitrage stratégique',
      step1Desc: 'Examen des publications, brevets, postes de direction et distinctions afin d’opter pour la catégorie offrant le meilleur taux d’acceptation.',
      step2Title: 'Constitution du faisceau de preuves et lettres d’experts',
      step2Desc: 'Rédaction de lettres d’appui indépendantes émanant de sommités universitaires et sectorielles aux USA et à l’international.',
      step3Title: 'Dépôt du dossier I-140 et mémoire juridique',
      step3Desc: 'Élaboration d’un mémoire argumenté de 200 à 300 pages s’appuyant sur la doctrine de l’USCIS et défense active en cas de demande de preuves additionnelles (RFE).',
      step4Title: 'Consular Processing et préparation à l’entretien',
      step4Desc: 'Finalisation du DS-260, attestation financière, vérification d’état civil et simulations approfondies de l’entretien consulaire.',
      link1Badge: 'Préparation consulaire',
      link1Title: 'Guide de l’entretien à l’Ambassade des États-Unis →',
      link1Desc: 'Questions types de l’officier consulaire, mise en cohérence du DS-260 et anticipation des zones d’ombre.',
      link2Badge: 'Auto-évaluation rapide',
      link2Title: 'Questionnaire d’admissibilité EB-1A →',
      link2Desc: '10 critères réglementaires de l’USCIS avec scoring immédiat de viabilité.',
      disclaimerTitle: 'Avertissement juridique :',
      disclaimerText: 'Le cabinet V. I. LEVIN ne garantit ni la délivrance de visa ni l’approbation des requêtes par les autorités souveraines des États-Unis (USCIS, Département d’État). Toute décision relève de la compétence discrétionnaire des agents instructeurs. Informations vérifiées : septembre 2026.',
    },
  };

  const l = labels[currentLang] || labels.ru;

  return (
    <div className="relative py-12 lg:py-20 bg-navy-950 overflow-hidden">
      {/* Background with Authentic US Passport */}
      <div className="absolute top-0 left-0 right-0 h-[480px] lg:h-[540px] pointer-events-none overflow-hidden select-none">
        <img
          src="/images/user-passport-bg.jpg"
          alt="Official US Passport"
          className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-85 contrast-[1.08] brightness-[0.95]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/85 via-50% to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-navy-950 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-navy-950/70 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-200">{l.home}</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gold-400 font-medium">{l.breadcrumb}</span>
        </nav>

        {/* Hero Header */}
        <div className="space-y-4 border-b border-surface-border pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0E1624]/90 backdrop-blur-md text-gold-300 border border-gold-500/30 text-xs font-semibold uppercase tracking-wider shadow-md">
            <LuxuryUsaFlag size="xs" />
            <span>{l.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-white font-bold leading-tight drop-shadow-md">
            {l.title}
          </h1>

          <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-light max-w-3xl drop-shadow-sm">
            {l.desc}
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <a
              href="https://t.me/VILEVIN_bot?start=usa_greencard"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#DFBA73] hover:bg-[#cfab5b] text-[#080B11] text-xs font-bold tracking-wider uppercase rounded-md hover:brightness-105 active:scale-[0.98] transition-all flex items-center gap-2 border border-[#FFE8A3]/40 shadow-md cursor-pointer"
            >
              <MessageSquare size={16} /> {l.btnTg}
            </a>
            <Link
              href="/usa/immigration-test"
              className="px-5 py-2.5 bg-[#0B111E]/90 hover:bg-[#121B2C] text-gold-300 border border-gold-500/30 text-xs font-semibold tracking-wider uppercase rounded-md transition-colors flex items-center gap-2 backdrop-blur-md"
            >
              <span>{l.btnTest}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* The 2 Major Tracks Comparison */}
        <div className="space-y-6">
          <h2 className="text-2xl font-serif text-white font-bold">
            {l.tracksHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EB-1A */}
            <div className="bg-navy-900 border border-gold-500/30 rounded-md p-6 lg:p-8 space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold px-2.5 py-1 rounded-md bg-gold-500/10 text-gold-400 border border-gold-500/30">
                  {l.eb1Priority}
                </span>
                <span className="text-xs text-gray-400">{l.eb1Queue}</span>
              </div>
              <h3 className="text-xl font-serif text-white font-bold">
                {l.eb1Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {l.eb1Desc}
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{l.eb1Point1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{l.eb1Point2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{l.eb1Point3}</span>
                </li>
              </ul>
            </div>

            {/* EB-2 NIW */}
            <div className="bg-navy-900 border border-surface-border rounded-md p-6 lg:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-mono font-semibold px-2.5 py-1 rounded-md bg-navy-800 text-gray-300 border border-surface-border">
                  {l.eb2Priority}
                </span>
                <span className="text-xs text-gray-400">{l.eb2Precedent}</span>
              </div>
              <h3 className="text-xl font-serif text-white font-bold">
                {l.eb2Title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                {l.eb2Desc}
              </p>
              <ul className="space-y-2 text-xs text-gray-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{l.eb2Point1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{l.eb2Point2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-gold-400 shrink-0 mt-0.5" />
                  <span>{l.eb2Point3}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Steps to Green Card */}
        <div className="bg-navy-900 border border-surface-border rounded-md p-6 lg:p-8 space-y-6">
          <h2 className="text-2xl font-serif text-white font-bold">
            {l.stepsHeading}
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-navy-950 rounded-md border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">01</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">{l.step1Title}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {l.step1Desc}
                </p>
              </div>
            </div>

            <div className="p-4 bg-navy-950 rounded-md border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">02</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">{l.step2Title}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {l.step2Desc}
                </p>
              </div>
            </div>

            <div className="p-4 bg-navy-950 rounded-md border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">03</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">{l.step3Title}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {l.step3Desc}
                </p>
              </div>
            </div>

            <div className="p-4 bg-navy-950 rounded-md border border-surface-border flex items-start gap-4">
              <div className="text-xl font-serif font-bold text-gold-400">04</div>
              <div>
                <h4 className="text-sm font-serif text-white font-semibold">{l.step4Title}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {l.step4Desc}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links to interview and test */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            href="/usa/interview"
            className="p-6 rounded-md bg-navy-900 border border-surface-border transition-colors group block"
          >
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">{l.link1Badge}</span>
            <h3 className="text-lg font-serif text-white font-bold group-hover:text-gold-300 transition-colors mt-2">
              {l.link1Title}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              {l.link1Desc}
            </p>
          </Link>

          <Link
            href="/usa/immigration-test"
            className="p-6 rounded-md bg-navy-900 border border-surface-border transition-colors group block"
          >
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-wider">{l.link2Badge}</span>
            <h3 className="text-lg font-serif text-white font-bold group-hover:text-gold-300 transition-colors mt-2">
              {l.link2Title}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              {l.link2Desc}
            </p>
          </Link>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="p-4 rounded-md bg-navy-900 border border-surface-border text-xs text-gray-400 leading-relaxed flex items-start gap-3">
          <ShieldCheck size={18} className="text-gold-500 shrink-0 mt-0.5" />
          <span>
            <strong>{l.disclaimerTitle}</strong> {l.disclaimerText}
          </span>
        </div>
      </div>
    </div>
  );
}

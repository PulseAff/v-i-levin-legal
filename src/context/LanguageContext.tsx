'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'ru' | 'uk' | 'en' | 'es' | 'it' | 'fr';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  name: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ru', label: 'RU', name: 'Русский', flag: '/images/flags/ru.svg' },
  { code: 'en', label: 'EN', name: 'English', flag: '/images/flags/en.svg' },
  { code: 'uk', label: 'UA', name: 'Українська', flag: '/images/flags/ua.svg' },
  { code: 'es', label: 'ES', name: 'Español', flag: '/images/flags/es.svg' },
  { code: 'it', label: 'IT', name: 'Italiano', flag: '/images/flags/it.svg' },
  { code: 'fr', label: 'FR', name: 'Français', flag: '/images/flags/fr.svg' },
];

export const TRANSLATIONS: Record<LanguageCode, any> = {
  ru: {
    nav: {
      services: 'Услуги',
      usaGreenCard: 'США & GREEN CARD',
      jurisdictions: 'Юрисдикции',
      about: 'О практике',
      faq: 'Частые вопросы',
      contacts: 'Контакты',
      bookConsultation: 'Консультация',
      langTitle: 'Язык / Language',
    },
    hero: {
      badge: 'МЕЖДУНАРОДНАЯ ЮРИДИЧЕСКАЯ ПОМОЩЬ',
      title1: 'Ваши права —',
      title2: 'без границ',
      desc: 'Профессиональная юридическая поддержка для людей и бизнеса в США и по всему миру.',
      flow1: 'Сложная ситуация',
      flow2: 'Точный анализ',
      flow3: 'Стратегия',
      flow4: 'Решение',
      badgeNy: '15 лет в Нью-Йорке',
      badgeCitizen: 'Гражданин США',
      ctaConsultation: 'Стратегическая консультация',
      ctaUsa: 'Практика США & Green Card',
    },
    about: {
      title1: 'Международные юридические решения',
      title2: 'высокой точности',
      desc: 'Частная юридическая практика для кейсов повышенной сложности в США и глобальных финансовых центрах. Глубокий анализ федеральной правовой системы, нестандартная стратегия и построчная защита интересов доверителя.',
      p1Title: '15+ лет практики в США',
      p1Desc: 'Глубокая экспертиза в федеральном праве и USCIS. Личный статус гражданина США, опыт ведения комплексных иммиграционных кейсов.',
      p1Note: 'USCIS · Federal Courts · U.S. Citizen',
      p2Title: 'Адвокатская тайна',
      p2Desc: 'Институциональная конфиденциальность по стандарту Attorney-Client Privilege. Полная защита данных, документов и активов.',
      p2Note: 'Attorney-Client Privilege · Rule 1.6',
      p3Title: 'Синхронизация юрисдикций',
      p3Desc: 'Трансграничное структурирование: США (Delaware, Wyoming), ЕС, Великобритания и ОАЭ (DIFC). Нивелирование налоговых коллизий.',
      p3Note: 'USA · EU · UK · UAE (DIFC)',
      p4Title: 'Методология Analyze → Act',
      p4Desc: 'Построчный превентивный аудит юридических рисков до подачи любых форм. Выверенная пошаговая дорожная карта защиты интересов.',
      p4Note: 'Pre-filing risk audit · Zero reject strategy',
      linkMore: 'Подробнее о принципах практики',
    },
    countries: {
      badge: 'ГЕОГРАФИЯ И ПРАВОВЫЕ СИСТЕМЫ',
      title1: 'Международные юрисдикции',
      title2: 'практики',
      desc: 'Компетенции на стыке нескольких правовых систем. Мы синхронизируем процессуальные нормы разных стран для защиты ваших интересов.',
      btnAll: 'Все юрисдикции',
      hub1Name: 'США',
      hub1Badge: 'Ключевой фокус',
      hub1System: 'Федеральное право США & Право штатов',
      hub1Desc: 'Иммиграционный трекинг (EB-1A / NIW / Гражданство), корпоративное право Delaware и Wyoming, федеральный арбитраж и защита статуса.',
      hub1Corridor: 'NY · DE · FL · CA',
      hub2Name: 'ОАЭ (DIFC / ADGM)',
      hub2Badge: 'Трансграничный хаб',
      hub2System: 'DIFC Courts & English Common Law',
      hub2Desc: 'Структурирование международных компаний, релокация капитала, семейные офисы и защита активов в финансовой юрисдикции Дубая.',
      hub2Corridor: 'Dubai · Abu Dhabi',
      hub3Name: 'Великобритания',
      hub3Badge: 'Английское право',
      hub3System: 'English Common Law',
      hub3Desc: 'Коммерческие контракты по английскому праву, лондонский арбитраж, структурирование владения недвижимостью и трансграничные трасты.',
      hub3Corridor: 'London · Common Law',
      hub4Name: 'Европейский Союз (ЕС)',
      hub4Badge: 'Европейское право',
      hub4System: 'Civil Law & Регламенты ЕС',
      hub4Desc: 'Юридическое сопровождение в Германии, Франции, на Кипре и в Испании. Корпоративный комплаенс, санкционные риски и трансграничные активы.',
      hub4Corridor: 'DE · FR · CY · ES',
      corridorLabel: 'КОРИДОР:',
    },
  },

  en: {
    nav: {
      services: 'Services',
      usaGreenCard: 'USA & GREEN CARD',
      jurisdictions: 'Jurisdictions',
      about: 'About Practice',
      faq: 'FAQ',
      contacts: 'Contacts',
      bookConsultation: 'Consultation',
      langTitle: 'Language',
    },
    hero: {
      badge: 'INTERNATIONAL LEGAL PRACTICE',
      title1: 'Your rights —',
      title2: 'without borders',
      desc: 'Professional legal counsel and institutional defense for individuals and businesses in the US and worldwide.',
      flow1: 'Complex Case',
      flow2: 'Deep Analysis',
      flow3: 'Strategy',
      flow4: 'Protected Solution',
      badgeNy: '15 Years in New York',
      badgeCitizen: 'U.S. Citizen',
      ctaConsultation: 'Strategic Consultation',
      ctaUsa: 'USA Practice & Green Card',
    },
    about: {
      title1: 'International Legal Solutions',
      title2: 'of High Precision',
      desc: 'Private boutique practice for high-complexity legal matters in the United States and global financial capitals. Rigorous analysis of federal legal systems, custom strategy, and surgical defense of client interests.',
      p1Title: '15+ Years Practice in the US',
      p1Desc: 'Deep expertise in US federal law and USCIS regulations. Direct US citizen status, proven track record in complex immigration matters.',
      p1Note: 'USCIS · Federal Courts · U.S. Citizen',
      p2Title: 'Attorney-Client Privilege',
      p2Desc: 'Highest institutional confidentiality standard under Attorney-Client Privilege. Complete legal shield for data, records, and assets.',
      p2Note: 'Attorney-Client Privilege · Rule 1.6',
      p3Title: 'Jurisdiction Synchronization',
      p3Desc: 'Cross-border structuring across USA (Delaware, Wyoming), EU, UK, and UAE (DIFC). Eliminating tax and procedural collisions.',
      p3Note: 'USA · EU · UK · UAE (DIFC)',
      p4Title: 'Analyze → Act Methodology',
      p4Desc: 'Line-by-line pre-filing audit of legal vulnerabilities. Actionable roadmap and targeted execution at every stage.',
      p4Note: 'Pre-filing risk audit · Zero reject strategy',
      linkMore: 'Explore Practice Principles',
    },
    countries: {
      badge: 'GEOGRAPHY & LEGAL REGIMES',
      title1: 'International Jurisdictions',
      title2: 'of Practice',
      desc: 'Expertise at the crossroads of multiple legal traditions. Harmonizing procedural standards worldwide to secure client objectives.',
      btnAll: 'All Jurisdictions',
      hub1Name: 'United States',
      hub1Badge: 'Primary Focus',
      hub1System: 'US Federal & State Law',
      hub1Desc: 'Immigration pathways (EB-1A / NIW / Citizenship), Delaware & Wyoming corporate law, federal arbitration and status protection.',
      hub1Corridor: 'NY · DE · FL · CA',
      hub2Name: 'UAE (DIFC / ADGM)',
      hub2Badge: 'Global Hub',
      hub2System: 'DIFC Courts & English Common Law',
      hub2Desc: 'International corporate structuring, capital relocation, family offices, and asset protection within Dubai financial jurisdiction.',
      hub2Corridor: 'Dubai · Abu Dhabi',
      hub3Name: 'United Kingdom',
      hub3Badge: 'Common Law',
      hub3System: 'English Common Law',
      hub3Desc: 'Commercial contracts under English law, London arbitration, prime real estate structuring, and cross-border trusts.',
      hub3Corridor: 'London · Common Law',
      hub4Name: 'European Union (EU)',
      hub4Badge: 'European Law',
      hub4System: 'Civil Law & EU Directives',
      hub4Desc: 'Counsel across Germany, France, Cyprus, and Spain. Corporate compliance, regulatory risk mitigation, and international asset protection.',
      hub4Corridor: 'DE · FR · CY · ES',
      corridorLabel: 'CORRIDOR:',
    },
  },

  uk: {
    nav: {
      services: 'Послуги',
      usaGreenCard: 'США & GREEN CARD',
      jurisdictions: 'Юрисдикції',
      about: 'Про практику',
      faq: 'Часті питання',
      contacts: 'Контакти',
      bookConsultation: 'Консультація',
      langTitle: 'Мова / Language',
    },
    hero: {
      badge: 'МІЖНАРОДНА ЮРИДИЧНА ДОПОМОГА',
      title1: 'Ваші права —',
      title2: 'без кордонів',
      desc: 'Професійна юридична підтримка для людей та бізнесу в США і по всьому світу.',
      flow1: 'Складна справа',
      flow2: 'Глибокий аналіз',
      flow3: 'Стратегія',
      flow4: 'Рішення',
      badgeNy: '15 років у Нью-Йорку',
      badgeCitizen: 'Громадянин США',
      ctaConsultation: 'Стратегічна консультація',
      ctaUsa: 'Практика США & Green Card',
    },
    about: {
      title1: 'Міжнародні юридичні рішення',
      title2: 'високої точності',
      desc: 'Приватна практика для кейсів підвищеної складності в США та ключових фінансових центрах світу. Глибокий аналіз федерального права, нестандартна стратегія та покроковий захист інтересів клієнта.',
      p1Title: '15+ років практики в США',
      p1Desc: 'Глибока експертиза у федеральному праві та USCIS. Особистий статус громадянина США, досвід ведення складних імміграційних кейсів.',
      p1Note: 'USCIS · Federal Courts · U.S. Citizen',
      p2Title: 'Адвокатська таємниця',
      p2Desc: 'Інституційна конфіденційність найвищого рівня за стандартом Attorney-Client Privilege. Повний захист персональних даних та активів.',
      p2Note: 'Attorney-Client Privilege · Rule 1.6',
      p3Title: 'Синхронізація юрисдикцій',
      p3Desc: 'Транскордонне структурування: США (Delaware, Wyoming), ЄС, Велика Британія та ОАЕ (DIFC). Усунення правових конфліктів.',
      p3Note: 'USA · EU · UK · UAE (DIFC)',
      p4Title: 'Методологія Analyze → Act',
      p4Desc: 'Порядковий аудит юридичних ризиків до подання будь-яких форм. Вивірена дорожня карта захисту інтересів клієнта.',
      p4Note: 'Pre-filing risk audit · Zero reject strategy',
      linkMore: 'Детальніше про принципи практики',
    },
    countries: {
      badge: 'ГЕОГРАФІЯ ТА ПРАВОВІ СИСТЕМИ',
      title1: 'Міжнародні юрисдикції',
      title2: 'практики',
      desc: 'Компетенції на стику різних правових систем. Ми гармонізуємо процесуальні норми для захисту ваших інтересів.',
      btnAll: 'Всі юрисдикції',
      hub1Name: 'США',
      hub1Badge: 'Ключовий фокус',
      hub1System: 'Федеральне право США & Право штатів',
      hub1Desc: 'Імміграційний трекінг (EB-1A / NIW / Громадянство), корпоративне право Delaware і Wyoming, федеральний арбітраж.',
      hub1Corridor: 'NY · DE · FL · CA',
      hub2Name: 'ОАЕ (DIFC / ADGM)',
      hub2Badge: 'Транскордонний хаб',
      hub2System: 'DIFC Courts & English Common Law',
      hub2Desc: 'Структурування міжнародних компаній, релокація капіталу, сімейні офіси та захист активів у фінансовому центрі Дубая.',
      hub2Corridor: 'Dubai · Abu Dhabi',
      hub3Name: 'Велика Британія',
      hub3Badge: 'Англійське право',
      hub3System: 'English Common Law',
      hub3Desc: 'Комерційні контракти за англійським правом, лондонський арбітраж, структурування нерухомості та трасти.',
      hub3Corridor: 'London · Common Law',
      hub4Name: 'Європейський Союз (ЄС)',
      hub4Badge: 'Європейське право',
      hub4System: 'Civil Law & Регламенти ЄС',
      hub4Desc: 'Юридичний супровід у Німеччині, Франції, на Кіпрі та в Іспанії. Корпоративний комплаєнс та захист активів.',
      hub4Corridor: 'DE · FR · CY · ES',
      corridorLabel: 'КОРИДОР:',
    },
  },

  es: {
    nav: {
      services: 'Servicios',
      usaGreenCard: 'EE.UU. & GREEN CARD',
      jurisdictions: 'Jurisdicciones',
      about: 'Sobre el bufete',
      faq: 'Preguntas',
      contacts: 'Contactos',
      bookConsultation: 'Consulta',
      langTitle: 'Idioma / Language',
    },
    hero: {
      badge: 'ASISTENCIA LEGAL INTERNACIONAL',
      title1: 'Sus derechos —',
      title2: 'sin fronteras',
      desc: 'Asesoramiento legal profesional y defensa institucional para particulares y empresas en EE.UU. y en todo el mundo.',
      flow1: 'Caso complejo',
      flow2: 'Análisis preciso',
      flow3: 'Estrategia',
      flow4: 'Solución protegida',
      badgeNy: '15 años en Nueva York',
      badgeCitizen: 'Ciudadano de EE.UU.',
      ctaConsultation: 'Consulta estratégica',
      ctaUsa: 'Práctica EE.UU. & Green Card',
    },
    about: {
      title1: 'Soluciones legales internacionales',
      title2: 'de alta precisión',
      desc: 'Práctica privada para casos de alta complejidad en EE.UU. y principales centros financieros mundiales. Análisis exhaustivo del derecho federal y defensa rigurosa de los intereses del cliente.',
      p1Title: '15+ años de práctica en EE.UU.',
      p1Desc: 'Profundo conocimiento del derecho federal y normativa USCIS. Condición directa de ciudadano estadounidense con amplia trayectoria en inmigración.',
      p1Note: 'USCIS · Federal Courts · U.S. Citizen',
      p2Title: 'Secreto profesional absoluto',
      p2Desc: 'Confidencialidad institucional bajo el estándar Attorney-Client Privilege. Protección legal completa de datos, documentos y patrimonio.',
      p2Note: 'Attorney-Client Privilege · Rule 1.6',
      p3Title: 'Sincronización de jurisdicciones',
      p3Desc: 'Estructuración transfronteriza: EE.UU. (Delaware, Wyoming), UE, Reino Unido y EAU (DIFC). Prevención de colisiones fiscales y procesales.',
      p3Note: 'USA · EU · UK · UAE (DIFC)',
      p4Title: 'Metodología Analyze → Act',
      p4Desc: 'Auditoría preventiva línea por línea antes de presentar cualquier formulario oficial. Plan de acción preciso y eficaz.',
      p4Note: 'Pre-filing risk audit · Zero reject strategy',
      linkMore: 'Conozca los principios del bufete',
    },
    countries: {
      badge: 'GEOGRAFÍA Y SISTEMAS LEGALES',
      title1: 'Jurisdicciones internacionales',
      title2: 'de práctica',
      desc: 'Competencia en la intersección de múltiples sistemas jurídicos. Armonizamos normativas internacionales para proteger sus intereses.',
      btnAll: 'Todas las jurisdicciones',
      hub1Name: 'Estados Unidos',
      hub1Badge: 'Foco principal',
      hub1System: 'Derecho Federal y Estatal de EE.UU.',
      hub1Desc: 'Vías migratorias (EB-1A / NIW / Ciudadanía), derecho societario en Delaware y Wyoming, arbitraje federal y protección de estatus.',
      hub1Corridor: 'NY · DE · FL · CA',
      hub2Name: 'EAU (DIFC / ADGM)',
      hub2Badge: 'Hub global',
      hub2System: 'Tribunales DIFC & Common Law',
      hub2Desc: 'Estructuración corporativa internacional, relocalización de capital, oficinas familiares y protección de activos en Dubái.',
      hub2Corridor: 'Dubai · Abu Dhabi',
      hub3Name: 'Reino Unido',
      hub3Badge: 'Derecho inglés',
      hub3System: 'English Common Law',
      hub3Desc: 'Contratos comerciales según derecho inglés, arbitraje en Londres, tenencia de inmuebles y fideicomisos transfronterizos.',
      hub3Corridor: 'London · Common Law',
      hub4Name: 'Unión Europea (UE)',
      hub4Badge: 'Derecho europeo',
      hub4System: 'Civil Law y Reglamentos UE',
      hub4Desc: 'Asesoramiento en Alemania, Francia, Chipre y España. Cumplimiento normativo societario y gestión de activos internacionales.',
      hub4Corridor: 'DE · FR · CY · ES',
      corridorLabel: 'CORREDOR:',
    },
  },

  it: {
    nav: {
      services: 'Servizi',
      usaGreenCard: 'USA & GREEN CARD',
      jurisdictions: 'Giurisdizioni',
      about: 'Sullo studio',
      faq: 'Domande frequenti',
      contacts: 'Contatti',
      bookConsultation: 'Consulenza',
      langTitle: 'Lingua / Language',
    },
    hero: {
      badge: 'ASSISTENZA LEGALE INTERNAZIONALE',
      title1: 'I vostri diritti —',
      title2: 'senza confini',
      desc: 'Assistenza legale d’élite e difesa istituzionale per privati e aziende negli Stati Uniti e nel mondo.',
      flow1: 'Caso complesso',
      flow2: 'Analisi approfondita',
      flow3: 'Strategia',
      flow4: 'Soluzione solida',
      badgeNy: '15 anni a New York',
      badgeCitizen: 'Cittadino USA',
      ctaConsultation: 'Consulenza strategica',
      ctaUsa: 'Pratica USA & Green Card',
    },
    about: {
      title1: 'Soluzioni legali internazionali',
      title2: 'ad alta precisione',
      desc: 'Studio legale privato per questioni ad alta complessità negli Stati Uniti e nei principali centri finanziari globali. Analisi rigorosa del diritto federale e protezione dei patrimoni.',
      p1Title: '15+ anni di esperienza negli USA',
      p1Desc: 'Profonda competenza nel diritto federale statunitense e regolamenti USCIS. Status diretto di cittadino USA, comprovata esperienza.',
      p1Note: 'USCIS · Federal Courts · U.S. Citizen',
      p2Title: 'Segreto professionale assoluto',
      p2Desc: 'Massimo standard di riservatezza garantito dall’Attorney-Client Privilege. Totale tutela di dati, fascicoli e beni.',
      p2Note: 'Attorney-Client Privilege · Rule 1.6',
      p3Title: 'Sincronizzazione delle giurisdizioni',
      p3Desc: 'Strutturazione transfrontaliera tra USA (Delaware, Wyoming), UE, Regno Unito e EAU (DIFC). Risoluzione di conflitti normativi.',
      p3Note: 'USA · EU · UK · UAE (DIFC)',
      p4Title: 'Metodologia Analyze → Act',
      p4Desc: 'Audit preventivo riga per riga sui rischi prima del deposito di qualsiasi atto formale. Roadmap d’azione chirurgica.',
      p4Note: 'Pre-filing risk audit · Zero reject strategy',
      linkMore: 'Approfondisci i principi dello studio',
    },
    countries: {
      badge: 'GEOGRAFIA E SISTEMI GIURIDICI',
      title1: 'Giurisdizioni internazionali',
      title2: 'dello studio',
      desc: 'Competenza all’intersezione di molteplici ordinamenti. Armonizziamo le norme procedurali per salvaguardare i vostri interessi.',
      btnAll: 'Tutte le giurisdizioni',
      hub1Name: 'Stati Uniti',
      hub1Badge: 'Focus principale',
      hub1System: 'Diritto Federale e Statale USA',
      hub1Desc: 'Pratiche di immigrazione (EB-1A / NIW / Cittadinanza), diritto societario in Delaware e Wyoming, arbitrato federale.',
      hub1Corridor: 'NY · DE · FL · CA',
      hub2Name: 'EAU (DIFC / ADGM)',
      hub2Badge: 'Hub globale',
      hub2System: 'DIFC Courts & English Common Law',
      hub2Desc: 'Strutturazione societaria internazionale, rilocazione di capitali, family office e tutela patrimoniale a Dubai.',
      hub2Corridor: 'Dubai · Abu Dhabi',
      hub3Name: 'Regno Unito',
      hub3Badge: 'Diritto inglese',
      hub3System: 'English Common Law',
      hub3Desc: 'Contrattualistica commerciale sotto diritto inglese, arbitrato a Londra, detenzione immobiliare e trust transfrontalieri.',
      hub3Corridor: 'London · Common Law',
      hub4Name: 'Unione Europea (UE)',
      hub4Badge: 'Diritto europeo',
      hub4System: 'Civil Law & Direttive UE',
      hub4Desc: 'Assistenza legale in Germania, Francia, Cipro e Spagna. Compliance societaria, mitigazione dei rischi e beni internazionali.',
      hub4Corridor: 'DE · FR · CY · ES',
      corridorLabel: 'CORRIDOIO:',
    },
  },

  fr: {
    nav: {
      services: 'Services',
      usaGreenCard: 'USA & GREEN CARD',
      jurisdictions: 'Juridictions',
      about: 'Le cabinet',
      faq: 'FAQ',
      contacts: 'Contacts',
      bookConsultation: 'Consultation',
      langTitle: 'Langue / Language',
    },
    hero: {
      badge: 'ASSISTANCE JURIDIQUE INTERNATIONALE',
      title1: 'Vos droits —',
      title2: 'sans frontières',
      desc: 'Conseil juridique d’excellence et défense institutionnelle pour particuliers et entreprises aux États-Unis et dans le monde entier.',
      flow1: 'Dossier complexe',
      flow2: 'Analyse précise',
      flow3: 'Stratégie',
      flow4: 'Solution protégée',
      badgeNy: '15 ans à New York',
      badgeCitizen: 'Citoyen américain',
      ctaConsultation: 'Consultation stratégique',
      ctaUsa: 'Pratique USA & Green Card',
    },
    about: {
      title1: 'Solutions juridiques internationales',
      title2: 'de haute précision',
      desc: 'Cabinet privé dédié aux affaires de haute complexité aux États-Unis et dans les grands centres financiers mondiaux. Analyse rigoureuse du droit fédéral et défense ciblée des intérêts du client.',
      p1Title: '15+ ans d’exercice aux USA',
      p1Desc: 'Expertise approfondie en droit fédéral américain et procédures USCIS. Statut de citoyen américain, pratique chevronnée en immigration.',
      p1Note: 'USCIS · Federal Courts · U.S. Citizen',
      p2Title: 'Secret professionnel absolu',
      p2Desc: 'Norme de confidentialité institutionnelle la plus stricte (Attorney-Client Privilege). Protection totale des données et des actifs.',
      p2Note: 'Attorney-Client Privilege · Rule 1.6',
      p3Title: 'Synchronisation des juridictions',
      p3Desc: 'Structuration transfrontalière entre USA (Delaware, Wyoming), UE, Royaume-Uni et EAU (DIFC). Résolution des conflits de normes.',
      p3Note: 'USA · EU · UK · UAE (DIFC)',
      p4Title: 'Méthodologie Analyze → Act',
      p4Desc: 'Audit préventif ligne par ligne des risques avant tout dépôt officiel. Plan d’action stratégique et protection chirurgicale.',
      p4Note: 'Pre-filing risk audit · Zero reject strategy',
      linkMore: 'Découvrir les principes du cabinet',
    },
    countries: {
      badge: 'GÉOGRAPHIE ET SYSTÈMES JURIDIQUES',
      title1: 'Juridictions internationales',
      title2: 'du cabinet',
      desc: 'Expertise à la croisée de multiples ordres juridiques. Nous harmonisons les normes procédurales pour sécuriser vos intérêts.',
      btnAll: 'Toutes les juridictions',
      hub1Name: 'États-Unis',
      hub1Badge: 'Axe principal',
      hub1System: 'Droit fédéral et droit des États américains',
      hub1Desc: 'Parcours d’immigration (EB-1A / NIW / Citoyenneté), droit des sociétés au Delaware et Wyoming, arbitrage fédéral.',
      hub1Corridor: 'NY · DE · FL · CA',
      hub2Name: 'ÉAU (DIFC / ADGM)',
      hub2Badge: 'Hub mondial',
      hub2System: 'DIFC Courts & English Common Law',
      hub2Desc: 'Structuration internationale d’entreprises, relocalisation de capitaux, family offices et protection d’actifs à Dubaï.',
      hub2Corridor: 'Dubai · Abu Dhabi',
      hub3Name: 'Royaume-Uni',
      hub3Badge: 'Droit anglais',
      hub3System: 'English Common Law',
      hub3Desc: 'Contrats commerciaux de droit anglais, arbitrage londonien, structuration immobilière et trusts transfrontaliers.',
      hub3Corridor: 'London · Common Law',
      hub4Name: 'Union Européenne (UE)',
      hub4Badge: 'Droit européen',
      hub4System: 'Civil Law & Règlements européens',
      hub4Desc: 'Accompagnement en Allemagne, France, à Chypre et en Espagne. Conformité des entreprises et gestion des actifs internationaux.',
      hub4Corridor: 'DE · FR · CY · ES',
      corridorLabel: 'CORRIDOR :',
    },
  },
};

interface LanguageContextType {
  currentLang: LanguageCode;
  setLanguage: (code: LanguageCode) => void;
  t: (section: string, key: string) => string;
  dict: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('ru');

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('v_levin_lang') as LanguageCode;
      if (savedLang && ['ru', 'uk', 'en', 'es', 'it', 'fr'].includes(savedLang)) {
        setCurrentLang(savedLang);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (code: LanguageCode) => {
    setCurrentLang(code);
    try {
      localStorage.setItem('v_levin_lang', code);
    } catch {
      // ignore
    }
  };

  const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.ru;

  const t = (section: string, key: string): string => {
    const sec = dict[section];
    if (sec && sec[key]) {
      return sec[key];
    }
    const fallbackSec = TRANSLATIONS.ru[section];
    if (fallbackSec && fallbackSec[key]) {
      return fallbackSec[key];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, dict }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

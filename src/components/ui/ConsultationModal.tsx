'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ChevronDown, Lock, Send, Globe, Phone, Mail, MessageSquare, User, Shield } from 'lucide-react';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import { LuxuryUsaFlag } from '@/components/ui/LuxuryUsaFlag';
import { CountryFlagSvg } from '@/components/ui/CountryFlagSvg';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultService?: string;
}

interface JurisdictionOption {
  id: string;
  flag: string;
  title: string;
}

interface CategoryOption {
  id: string;
  icon: string;
  title: string;
  chips: string[];
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultCategory,
  defaultService,
}) => {
  const { currentLang, t } = useLanguage();

  // Form fields
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('usa');
  const [selectedCat, setSelectedCat] = useState<string>('usa');
  const [selectedChip, setSelectedChip] = useState<string>('EB-1A / EB-2 NIW');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [selectedCommLang, setSelectedCommLang] = useState<string>('ru');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Dropdown states
  const [jurDropdownOpen, setJurDropdownOpen] = useState(false);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  const jurRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (jurRef.current && !jurRef.current.contains(e.target as Node)) {
        setJurDropdownOpen(false);
      }
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setCatDropdownOpen(false);
      }
      if (topicRef.current && !topicRef.current.contains(e.target as Node)) {
        setTopicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) {
      setJurDropdownOpen(false);
      setCatDropdownOpen(false);
      setTopicDropdownOpen(false);
      return;
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setSelectedCommLang(currentLang || 'ru');
      setError('');
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'consultation_modal_open', {
          event_category: 'consultation',
          event_label: defaultService || defaultCategory || 'general',
        });
      }
      if (defaultCategory) {
        if (defaultCategory.toLowerCase().includes('green') || defaultCategory.toLowerCase().includes('usa') || defaultCategory.toLowerCase().includes('сша')) {
          setSelectedJurisdiction('usa');
          setSelectedCat('usa');
        } else if (defaultCategory.toLowerCase().includes('турц') || defaultCategory.toLowerCase().includes('turk')) {
          setSelectedJurisdiction('turkey');
          setSelectedCat('business');
        } else if (defaultCategory.toLowerCase().includes('оаэ') || defaultCategory.toLowerCase().includes('uae')) {
          setSelectedJurisdiction('uae');
          setSelectedCat('business');
        }
      }
      if (defaultService) {
        setSelectedChip(defaultService);
      }
    }
  }, [isOpen, defaultCategory, defaultService]);

  const JURISDICTIONS: Record<LanguageCode, JurisdictionOption[]> = {
    ru: [
      { id: 'usa', flag: '🇺🇸', title: 'США (United States)' },
      { id: 'turkey', flag: '🇹🇷', title: 'Турция (Turkey)' },
      { id: 'uae', flag: '🇦🇪', title: 'ОАЭ (DIFC / Dubai)' },
      { id: 'eu', flag: '🇪🇺', title: 'Европейский союз / Германия' },
      { id: 'cyprus', flag: '🇨🇾', title: 'Кипр (Common Law)' },
      { id: 'uk', flag: '🇬🇧', title: 'Великобритания (UK)' },
      { id: 'georgia', flag: '🇬🇪', title: 'Грузия' },
      { id: 'other', flag: '🌐', title: 'Иная юрисдикция / Трансграничный кейс' },
    ],
    en: [
      { id: 'usa', flag: '🇺🇸', title: 'United States (USA)' },
      { id: 'turkey', flag: '🇹🇷', title: 'Turkey' },
      { id: 'uae', flag: '🇦🇪', title: 'United Arab Emirates (DIFC / Dubai)' },
      { id: 'eu', flag: '🇪🇺', title: 'European Union / Germany' },
      { id: 'cyprus', flag: '🇨🇾', title: 'Cyprus (Common Law)' },
      { id: 'uk', flag: '🇬🇧', title: 'United Kingdom (UK)' },
      { id: 'georgia', flag: '🇬🇪', title: 'Georgia' },
      { id: 'other', flag: '🌐', title: 'Other Jurisdiction / Cross-Border' },
    ],
    uk: [
      { id: 'usa', flag: '🇺🇸', title: 'США (United States)' },
      { id: 'turkey', flag: '🇹🇷', title: 'Туреччина (Turkey)' },
      { id: 'uae', flag: '🇦🇪', title: 'ОАЕ (DIFC / Dubai)' },
      { id: 'eu', flag: '🇪🇺', title: 'Європейський союз / Німеччина' },
      { id: 'cyprus', flag: '🇨🇾', title: 'Кіпр (Common Law)' },
      { id: 'uk', flag: '🇬🇧', title: 'Велика Британія (UK)' },
      { id: 'georgia', flag: '🇬🇪', title: 'Грузія' },
      { id: 'other', flag: '🌐', title: 'Інша юрисдикція / Транскордонний кейс' },
    ],
    es: [
      { id: 'usa', flag: '🇺🇸', title: 'Estados Unidos (EE.UU.)' },
      { id: 'turkey', flag: '🇹🇷', title: 'Turquía (Turkey)' },
      { id: 'uae', flag: '🇦🇪', title: 'Emiratos Árabes Unidos (DIFC)' },
      { id: 'eu', flag: '🇪🇺', title: 'Unión Europea / Alemania' },
      { id: 'cyprus', flag: '🇨🇾', title: 'Chipre (Common Law)' },
      { id: 'uk', flag: '🇬🇧', title: 'Reino Unido (UK)' },
      { id: 'georgia', flag: '🇬🇪', title: 'Georgia' },
      { id: 'other', flag: '🌐', title: 'Otra jurisdicción / Transfronterizo' },
    ],
    it: [
      { id: 'usa', flag: '🇺🇸', title: 'Stati Uniti (USA)' },
      { id: 'turkey', flag: '🇹🇷', title: 'Turchia (Turkey)' },
      { id: 'uae', flag: '🇦🇪', title: 'Emirati Arabi Uniti (DIFC)' },
      { id: 'eu', flag: '🇪🇺', title: 'Unione Europea / Germania' },
      { id: 'cyprus', flag: '🇨🇾', title: 'Cipro (Common Law)' },
      { id: 'uk', flag: '🇬🇧', title: 'Regno Unito (UK)' },
      { id: 'georgia', flag: '🇬🇪', title: 'Georgia' },
      { id: 'other', flag: '🌐', title: 'Altra giurisdizione / Transfrontaliero' },
    ],
    fr: [
      { id: 'usa', flag: '🇺🇸', title: 'États-Unis (USA)' },
      { id: 'turkey', flag: '🇹🇷', title: 'Turquie (Turkey)' },
      { id: 'uae', flag: '🇦🇪', title: 'Émirats arabes unis (DIFC)' },
      { id: 'eu', flag: '🇪🇺', title: 'Union européenne / Allemagne' },
      { id: 'cyprus', flag: '🇨🇾', title: 'Chypre (Common Law)' },
      { id: 'uk', flag: '🇬🇧', title: 'Royaume-Uni (UK)' },
      { id: 'georgia', flag: '🇬🇪', title: 'Géorgie' },
      { id: 'other', flag: '🌐', title: 'Autre juridiction / Transfrontalier' },
    ],
  };

  const CHIPS_BY_LANG: Record<string, Record<LanguageCode, string[]>> = {
    usa: {
      ru: ['EB-1A / EB-2 NIW', 'Интервью USCIS', 'Аудит N-400', 'Смена статуса / Отказ', 'Иммиграционный кейс'],
      en: ['EB-1A / EB-2 NIW', 'USCIS Interview', 'N-400 Audit', 'Status Change / Denial', 'Custom US Case'],
      uk: ['EB-1A / EB-2 NIW', "Інтерв'ю USCIS", 'Аудит N-400', 'Зміна статусу / Відмова', 'Імміграційна справа'],
      es: ['EB-1A / EB-2 NIW', 'Entrevista USCIS', 'Auditoría N-400', 'Cambio de estatus / Rechazo', 'Caso migratorio'],
      it: ['EB-1A / EB-2 NIW', 'Colloquio USCIS', 'Audit N-400', 'Cambio status / Rigetto', 'Pratica immigrazione'],
      fr: ['EB-1A / EB-2 NIW', 'Entretien USCIS', 'Audit N-400', 'Changement de statut / Refus', 'Dossier immigration'],
    },
    business: {
      ru: ['Регистрация компании США / ОАЭ / Турция', 'Due Diligence & Экспертиза TAPU', 'Международные B2B-контракты', 'Открытие банковских счетов', 'Холдинги & Налоговый комплаенс'],
      en: ['Company Setup US / UAE / Turkey', 'Due Diligence & TAPU Audit', 'Cross-Border Contracts', 'Corporate Bank Account', 'Holdings & Taxes'],
      uk: ['Реєстрація компанії США / ОАЕ / Туреччина', 'Due Diligence та експертиза TAPU', 'Міжнародні договори', 'Банківський рахунок', 'Холдинги та податки'],
      es: ['Empresa EE.UU. / EAU / Turquía', 'Due Diligence & TAPU', 'Contratos internacionales', 'Cuenta bancaria corporativa', 'Holdings y fiscalidad'],
      it: ['Società USA / EAU / Turchia', 'Due Diligence & TAPU', 'Contratti transfrontalieri', 'Conto bancario aziendale', 'Holding & Fiscalità'],
      fr: ['Société USA / EAU / Turquie', 'Due Diligence & TAPU', 'Contrats internationaux', 'Compte bancaire pro', 'Holdings & Fiscalité'],
    },
    disputes: {
      ru: ['Международный арбитраж (LCIA, ICC)', 'Взыскание активов и долгов', 'Судебные споры США / ЕС', 'Досудебная претензия', 'Признание и исполнение решений'],
      en: ['International Arbitration (LCIA, ICC)', 'Asset & Debt Recovery', 'US / EU Litigation', 'Pre-Trial Legal Notice', 'Enforcement of Foreign Awards'],
      uk: ['Міжнародний арбітраж (LCIA, ICC)', 'Стягнення активів та боргів', 'Судові спори США / ЄС', 'Досудова претензія', 'Виконання іноземних рішень'],
      es: ['Arbitraje internacional (LCIA, ICC)', 'Recuperación de activos', 'Litigios EE.UU. / UE', 'Reclamación prejudicial', 'Ejecución de laudos'],
      it: ['Arbitrato internazionale (LCIA, ICC)', 'Recupero crediti e asset', 'Contenzioso USA / UE', 'Reclamo stragiudiziale', 'Esecuzione sentenze estere'],
      fr: ['Arbitrage international (LCIA, ICC)', 'Recouvrement d’actifs', 'Contentieux USA / UE', 'Mise en demeure', 'Exécution de jugements'],
    },
    wealth: {
      ru: ['Безотзывные трасты (Невада, Южная Дакота)', 'Защита от недружественных поглощений', 'Семейный капитал и фонды', 'Санкционный комплаенс', 'Швейцарские и Лихтенштейнские фонды'],
      en: ['Irrevocable Trusts (Nevada, SD)', 'Asset Protection from Creditors', 'Family Office & Private Wealth', 'Sanctions & Banking Compliance', 'Swiss & Liechtenstein Foundations'],
      uk: ['Безвідкличні трасти (Невада, Пд. Дакота)', 'Захист від недружніх дій', 'Сімейний капітал та фонди', 'Санкційний комплаєнс', 'Швейцарські фонди'],
      es: ['Fideicomisos irrevocables (Nevada, SD)', 'Blindaje frente a acreedores', 'Capital familiar y fondos', 'Compliance sancionatorio', 'Fundaciones suizas'],
      it: ['Trust irrevocabili (Nevada, SD)', 'Protezione da aggressioni patrimoniali', 'Family Capital & Fondazioni', 'Compliance sanzionatoria', 'Fondazioni svizzere'],
      fr: ['Trusts irrévocables (Nevada, SD)', 'Protection contre les créanciers', 'Capital familial & Fondations', 'Conformité sanctions', 'Fondations suisses'],
    },
    other: {
      ru: ['Гражданство за инвестиции', 'ВНЖ / Резидентство', 'Налоговый консалтинг', 'Срочный аудит рисков', 'Индивидуальное поручение'],
      en: ['Citizenship by Investment', 'Residency / Relocation', 'Tax & Legal Strategy', 'Urgent Risk Audit', 'Custom Mandate'],
      uk: ['Громадянство за інвестиції', 'ВНЖ / Резидентство', 'Податковий консалтинг', 'Терміновий аудит ризиків', 'Індивідуальне доручення'],
      es: ['Ciudadanía por inversión', 'Residencia legal / Visado', 'Estrategia fiscal', 'Auditoría urgente', 'Mandato especial'],
      it: ['Cittadinanza per investimento', 'Residenza / Visto', 'Consulenza fiscale', 'Audit urgente rischi', 'Mandato speciale'],
      fr: ['Nationalité par investissement', 'Titre de séjour / Résidence', 'Stratégie fiscale', 'Audit d’urgence', 'Mandat confidentiel'],
    },
  };

  const categoriesList: CategoryOption[] = [
    {
      id: 'usa',
      icon: '🇺🇸',
      title: t('modal', 'catUsa'),
      chips: CHIPS_BY_LANG.usa[currentLang] || CHIPS_BY_LANG.usa.ru,
    },
    {
      id: 'business',
      icon: '💼',
      title: t('modal', 'catBiz'),
      chips: CHIPS_BY_LANG.business[currentLang] || CHIPS_BY_LANG.business.ru,
    },
    {
      id: 'disputes',
      icon: '⚖️',
      title: t('modal', 'catDisp'),
      chips: CHIPS_BY_LANG.disputes[currentLang] || CHIPS_BY_LANG.disputes.ru,
    },
    {
      id: 'wealth',
      icon: '🛡️',
      title: t('modal', 'catWealth'),
      chips: CHIPS_BY_LANG.wealth[currentLang] || CHIPS_BY_LANG.wealth.ru,
    },
    {
      id: 'other',
      icon: '🌐',
      title: t('modal', 'catOther'),
      chips: CHIPS_BY_LANG.other[currentLang] || CHIPS_BY_LANG.other.ru,
    },
  ];

  const currentCategory = categoriesList.find((c) => c.id === selectedCat) || categoriesList[0];
  const jurisdictionsList = JURISDICTIONS[currentLang] || JURISDICTIONS.ru;
  const currentJurisdiction = jurisdictionsList.find((j) => j.id === selectedJurisdiction) || jurisdictionsList[0];

  const handleJurSelect = (jur: JurisdictionOption) => {
    setSelectedJurisdiction(jur.id);
    setJurDropdownOpen(false);
  };

  const handleCatSelect = (cat: CategoryOption) => {
    setSelectedCat(cat.id);
    setSelectedChip(cat.chips[0]);
    setCatDropdownOpen(false);
  };

  const handleTopicSelect = (chip: string) => {
    setSelectedChip(chip);
    setTopicDropdownOpen(false);
  };

  if (!isOpen) return null;

  // Localized microcopy
  const L = {
    modalTitle: currentLang === 'en' ? 'LEGAL CONSULTATION' : currentLang === 'uk' ? 'ЮРИДИЧНА КОНСУЛЬТАЦІЯ' : currentLang === 'es' ? 'CONSULTA JURÍDICA' : currentLang === 'it' ? 'CONSULENZA LEGALE' : currentLang === 'fr' ? 'CONSULTATION JURIDIQUE' : 'ЮРИДИЧЕСКАЯ КОНСУЛЬТАЦИЯ',
    modalSub: currentLang === 'en' ? 'Direct confidential case review by senior legal counsel.' : currentLang === 'uk' ? 'Конфіденційний розгляд вашої справи провідним юристом практики.' : currentLang === 'es' ? 'Revisión jurídica confidencial de su caso por el abogado titular.' : currentLang === 'it' ? 'Esame riservato del Suo caso da parte del legale titolare.' : currentLang === 'fr' ? 'Examen direct et confidentiel de votre dossier par l\'avocat.' : 'Конфиденциальный разбор вашей ситуации ведущим юристом практики.',
    jurLabel: currentLang === 'en' ? '1. JURISDICTION / COUNTRY:' : currentLang === 'uk' ? '1. ЮРИСДИКЦІЯ / КРАЇНА:' : currentLang === 'es' ? '1. JURISDICCIÓN / PAÍS:' : currentLang === 'it' ? '1. GIURISDIZIONE / PAESE:' : currentLang === 'fr' ? '1. JURIDICTION / PAYS :' : '1. ЮРИСДИКЦИЯ / СТРАНА:',
    catLabel: currentLang === 'en' ? '2. LEGAL PRACTICE AREA:' : currentLang === 'uk' ? '2. НАПРЯМОК ПИТАННЯ:' : currentLang === 'es' ? '2. ÁREA DEL DERECHO:' : currentLang === 'it' ? '2. AMBITO LEGALE:' : currentLang === 'fr' ? '2. DOMAINE JURIDIQUE :' : '2. НАПРАВЛЕНИЕ ВОПРОСА:',
    topicLabel: currentLang === 'en' ? '3. SPECIFIC TASK / SERVICE:' : currentLang === 'uk' ? '3. КОНКРЕТИЗАЦІЯ ЗАВДАННЯ:' : currentLang === 'es' ? '3. ASUNTO ESPECÍFICO:' : currentLang === 'it' ? '3. OGGETTO SPECIFICO:' : currentLang === 'fr' ? '3. OBJET SPÉCIFIQUE :' : '3. КОНКРЕТИЗАЦИЯ ЗАДАЧИ:',
    nameLabel: currentLang === 'en' ? 'YOUR NAME:' : currentLang === 'uk' ? 'ВАШЕ ІМ’Я:' : currentLang === 'es' ? 'SU NOMBRE:' : currentLang === 'it' ? 'IL SUO NOME:' : currentLang === 'fr' ? 'VOTRE NOM :' : 'ВАШЕ ИМЯ:',
    namePlaceholder: currentLang === 'en' ? 'Alexander / Company Representative' : currentLang === 'uk' ? 'Олександр / Представник компанії' : currentLang === 'es' ? 'Alejandro / Representante' : currentLang === 'it' ? 'Alessandro / Rappresentante' : currentLang === 'fr' ? 'Alexandre / Représentant' : 'Александр / Представитель компании',
    phoneLabel: currentLang === 'en' ? 'PHONE / WHATSAPP:' : currentLang === 'uk' ? 'ТЕЛЕФОН / WHATSAPP:' : currentLang === 'es' ? 'TELÉFONO / WHATSAPP:' : currentLang === 'it' ? 'TELEFONO / WHATSAPP:' : currentLang === 'fr' ? 'TÉLÉPHONE / WHATSAPP :' : 'ТЕЛЕФОН / WHATSAPP:',
    phonePlaceholder: '+1 (___) ___-____ или номер с кодом',
    tgLabel: currentLang === 'en' ? 'TELEGRAM USERNAME (OPTIONAL):' : currentLang === 'uk' ? 'TELEGRAM USERNAME (ОПЦІОНАЛЬНО):' : currentLang === 'es' ? 'TELEGRAM USERNAME (OPCIONAL):' : currentLang === 'it' ? 'TELEGRAM USERNAME (OPZIONALE):' : currentLang === 'fr' ? 'TELEGRAM USERNAME (OPTIONNEL) :' : 'TELEGRAM USERNAME (ПО ЖЕЛАНИЮ):',
    tgPlaceholder: '@username',
    emailLabel: currentLang === 'en' ? 'EMAIL ADDRESS:' : currentLang === 'uk' ? 'ЕЛЕКТРОННА ПОШТА (EMAIL):' : currentLang === 'es' ? 'CORREO ELECTRÓNICO (EMAIL):' : currentLang === 'it' ? 'INDIRIZZO EMAIL:' : currentLang === 'fr' ? 'ADRESSE EMAIL :' : 'ЭЛЕКТРОННАЯ ПОЧТА (EMAIL):',
    emailPlaceholder: 'name@example.com',
    noteLabel: currentLang === 'en' ? 'BRIEF SUMMARY OF YOUR SITUATION:' : currentLang === 'uk' ? 'СУТЬ ВАШОЇ СИТУАЦІЇ / ПИТАННЯ:' : currentLang === 'es' ? 'DESCRIPCIÓN DE SU SITUACIÓN:' : currentLang === 'it' ? 'SINTESI DELLA SUA SITUAZIONE:' : currentLang === 'fr' ? 'RÉSUMÉ DE VOTRE SITUATION :' : 'ОПИШИТЕ ВАШУ СИТУАЦИЮ:',
    notePlaceholder: currentLang === 'en' ? 'Key facts, deadlines, goals or existing documents...' : currentLang === 'uk' ? 'Ключові обставини, терміни, дедлайни...' : currentLang === 'es' ? 'Hechos clave, plazos, objetivos o documentos...' : currentLang === 'it' ? 'Fatti chiave, scadenze, obiettivi o documenti...' : currentLang === 'fr' ? 'Faits principaux, délais, objectifs ou pièces...' : 'Ключевые факты, юрисдикции, имеющиеся документы или дедлайны...',
    submitBtn: currentLang === 'en' ? 'SEND' : currentLang === 'uk' ? 'НАДІСЛАТИ' : currentLang === 'es' ? 'ENVIAR' : currentLang === 'it' ? 'INVIA' : currentLang === 'fr' ? 'ENVOYER' : 'ОТПРАВИТЬ',
    submitting: currentLang === 'en' ? 'Sending...' : currentLang === 'uk' ? 'Надсилання...' : currentLang === 'es' ? 'Enviando...' : currentLang === 'it' ? 'Invio...' : currentLang === 'fr' ? 'Envoi...' : 'Отправка...',
    errorMissingContact: currentLang === 'en' ? 'Please provide your Phone / WhatsApp, Telegram or Email.' : currentLang === 'uk' ? 'Будь ласка, вкажіть ваш телефон/WhatsApp, Telegram або Email.' : currentLang === 'es' ? 'Por favor proporcione su teléfono/WhatsApp, Telegram o Email.' : currentLang === 'it' ? 'Per favore indichi il Suo telefono/WhatsApp, Telegram o Email.' : currentLang === 'fr' ? 'Veuillez indiquer votre téléphone/WhatsApp, Telegram ou Email.' : 'Пожалуйста, укажите хотя бы один контакт: WhatsApp/телефон, Telegram или Email.',
    successTitle: currentLang === 'en' ? 'Inquiry Successfully Accepted' : currentLang === 'uk' ? 'Звернення успішно прийнято' : currentLang === 'es' ? 'Solicitud aceptada con éxito' : currentLang === 'it' ? 'Richiesta presa in carico' : currentLang === 'fr' ? 'Demande reçue avec succès' : 'Заявка успешно принята',
    successDesc: currentLang === 'en' ? 'Your matter details have been forwarded to legal counsel. We will contact you via WhatsApp, Telegram, or Email shortly.' : currentLang === 'uk' ? 'Деталі справи передані провідному юристу. Ми зв’яжемося з вами за вказаним контактом найближчим часом.' : currentLang === 'es' ? 'Los detalles han sido transmitidos al abogado. Nos pondremos en contacto con usted a la brevedad.' : currentLang === 'it' ? 'I dettagli sono stati inoltrati all’avvocato. La contatteremo a breve tramite i recapiti forniti.' : currentLang === 'fr' ? 'Votre dossier a été transmis à l’avocat. Nous vous contacterons rapidement selon vos coordonnées.' : 'Материалы переданы юристу практики. Мы свяжемся с вами по указанному контакту в течение рабочего дня.',
    closeBtn: currentLang === 'en' ? 'Close Window' : currentLang === 'uk' ? 'Закрити вікно' : currentLang === 'es' ? 'Cerrar ventana' : currentLang === 'it' ? 'Chiudi finestra' : currentLang === 'fr' ? 'Fermer la fenêtre' : 'Закрыть окно',
  };

  // Submit direct application to Lawyer and Admin Telegram
  const handleSubmitDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() && !email.trim() && !telegram.trim()) {
      setError(L.errorMissingContact);
      return;
    }

    setIsSubmitting(true);
    setError('');

    const botToken = '8805827853:AAGALkEhBOUTe2xNiKbehggEnC0cAKvwV-0';
    const recipients = ['7794422014', '1275663257'];

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '';
    const cleanTg = telegram.replace(/[@\s]/g, '');
    const tgLink = cleanTg ? `https://t.me/${cleanTg}` : '';

        const commLangLabels: Record<string, string> = {
      ru: '🇷🇺 Русский',
      en: '🇺🇸 English',
      tr: '🇹🇷 Türkçe',
      uk: '🇺🇦 Українська',
      es: '🇪🇸 Español',
      other: '🌐 Другой / Other',
    };

    const escapeHtml = (str: string = '') =>
      str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // High status clear card formatting
    const htmlMessage = [
      `🌐 <b>V. I. LEVIN | ЗАЯВКА С ВЕБ-САЙТА</b>`,
      `━━━━━━━━━━━━━━━━━━`,
      `Вам перенаправлено новое обращение с сайта vilevin.com:`,
      ``,
      `🌍 <b>Страна / Юрисдикция:</b> ${escapeHtml(currentJurisdiction.flag)} ${escapeHtml(currentJurisdiction.title)}`,
      `📁 <b>Направление:</b> ${escapeHtml(currentCategory.title)}`,
      `📌 <b>Подкатегория:</b> ${escapeHtml(selectedChip)}`,
      ``,
      clientName.trim() ? `👤 <b>Имя доверителя:</b> <code>${escapeHtml(clientName.trim())}</code>` : '',
      phone.trim() ? `🟢 <b>Телефон / WhatsApp:</b> <code>${escapeHtml(phone.trim())}</code>` : '',
      cleanTg ? `💬 <b>Telegram:</b> @${escapeHtml(cleanTg)}` : '',
      email.trim() ? `✉️ <b>Email:</b> <code>${escapeHtml(email.trim())}</code>` : '',
      ``,
      note.trim() ? `📝 <b>Суть ситуации:</b>\n<i>${escapeHtml(note.trim())}</i>\n` : '',
            `🗣️ <b>Язык общения:</b> <code>${escapeHtml(commLangLabels[selectedCommLang] || selectedCommLang)}</code>`,
      `🌐 <b>Язык сайта:</b> <code>${currentLang.toUpperCase()}</code>`,
      `🕒 <b>Время:</b> ${new Date().toLocaleString('ru-RU')}`,
    ].filter((line) => typeof line === 'string').join('\n');

    // ONLY valid https:// links permitted by Telegram in inline_keyboard
    const inlineKeyboard: Array<Array<{ text: string; url: string }>> = [];
    const actionRow: Array<{ text: string; url: string }> = [];
    if (waLink) {
      actionRow.push({ text: '🟢 Написать в WhatsApp', url: waLink });
    }
    if (tgLink) {
      actionRow.push({ text: '💬 Открыть Telegram', url: tgLink });
    }
    if (actionRow.length > 0) {
      inlineKeyboard.push(actionRow);
    }

    try {
      // Direct delivery to Telegram Bot API (Admin & Lawyer)
      await Promise.all(recipients.map(async (chatId) => {
        try {
          const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: htmlMessage,
              parse_mode: 'HTML',
              reply_markup: inlineKeyboard.length > 0 ? { inline_keyboard: inlineKeyboard } : undefined,
            }),
          });
          const data = await res.json();
          // Fallback to plain text without markup if HTML parsing ever fails
          if (!data.ok) {
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                chat_id: chatId,
                text: [
                  '🌐 V. I. LEVIN | ЗАЯВКА С ВЕБ-САЙТА',
                  '━━━━━━━━━━━━━━━━━━',
                  'Вам перенаправлено новое обращение с сайта:',
                  '',
                  `Страна/Юрисдикция: ${currentJurisdiction.title}`,
                  `Направление: ${currentCategory.title}`,
                  `Подкатегория: ${selectedChip}`,
                  clientName.trim() ? `Имя: ${clientName.trim()}` : '',
                  phone.trim() ? `WhatsApp/Телефон: ${phone.trim()}` : '',
                  cleanTg ? `Telegram: @${cleanTg}` : '',
                  email.trim() ? `Email: ${email.trim()}` : '',
                  note.trim() ? `Суть ситуации: ${note.trim()}` : '',
                  `Язык сайта: ${currentLang.toUpperCase()}`,
                  `Время: ${new Date().toLocaleString('ru-RU')}`,
                ].filter(Boolean).join('\n'),
              }),
            });
          }
        } catch {
          // ignore individual timeout
        }
      }));

      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'consultation',
          event_label: `${selectedJurisdiction}_${selectedChip}`,
          value: 1.0,
          currency: 'USD',
        });
        (window as any).gtag('event', 'consultation_submit', {
          jurisdiction: selectedJurisdiction,
          service: selectedChip,
        });
      }

      setIsSuccess(true);
    } catch {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'consultation',
          event_label: `${selectedJurisdiction}_${selectedChip}`,
          value: 1.0,
          currency: 'USD',
        });
        (window as any).gtag('event', 'consultation_submit', {
          jurisdiction: selectedJurisdiction,
          service: selectedChip,
        });
      }

      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/55 backdrop-blur-xs sm:backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-xl border border-white/[0.14] p-3.5 sm:p-4 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto scrollbar-none"
        style={{
          background: 'linear-gradient(180deg, #0A0F1D 0%, #060912 100%)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.95), 0 0 40px rgba(212, 175, 55, 0.1)',
        }}
      >
        {/* Subtle Radial Glow in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#DFBA73]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/10 z-20 cursor-pointer"
        >
          <X size={17} />
        </button>

        {isSuccess ? (
          /* SUCCESS STATE */
          <div className="py-8 px-4 text-center space-y-4 relative z-10 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle2 size={30} />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-serif font-bold text-white tracking-wide">
                {L.successTitle}
              </h3>
              <p className="text-xs text-gray-300 max-w-sm mx-auto font-light leading-relaxed">
                {L.successDesc}
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-md text-[#080B11] font-bold text-xs tracking-wider uppercase hover:brightness-105 active:scale-[0.98] transition-all shadow-md border border-[#FFE8A3]/50 cursor-pointer font-sans"
                style={{
                  background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
                }}
              >
                {L.closeBtn}
              </button>
            </div>
          </div>
        ) : (
          /* DIRECT HIGH-CONVERSION CONSULTATION FORM */
          <div className="space-y-3.5 relative z-10 animate-in fade-in duration-200">
            
            {/* Header: Seal + Title + Attorney Client Privilege Note */}
            <div className="flex items-center gap-3 pb-2 border-b border-white/[0.1] pr-6">
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#DFBA73]/25 blur-sm pointer-events-none" />
                <img
                  src="/images/v_levin_seal.png"
                  alt="V. I. LEVIN Legal Counsel"
                  className="relative w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] select-none"
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs sm:text-sm font-sans font-bold text-white tracking-wide flex items-center gap-1.5">
                  <span>{L.modalTitle}</span>
                </h3>
                <p className="text-[11px] font-sans text-gray-300 leading-tight">
                  {L.modalSub}
                </p>
                <div className="flex items-center gap-1 text-[9px] font-mono text-gold-400 uppercase tracking-widest pt-0.5">
                  <Shield size={10} className="text-gold-400" />
                  <span>Rule 1.6 Attorney-Client Privilege · Confidential</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmitDirect} className="space-y-2.5">
              {error && (
                <div className="p-2 rounded bg-red-950/80 border border-red-500/40 text-red-200 text-[11px] font-sans">
                  {error}
                </div>
              )}

              {/* 1 & 2: Compact 2-column row for Jurisdiction and Practice Area */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* 1. Country / Jurisdiction Dropdown */}
                <div ref={jurRef} className="relative">
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-0.5 uppercase flex items-center justify-between">
                    <span>{L.jurLabel}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setJurDropdownOpen(!jurDropdownOpen);
                      setCatDropdownOpen(false);
                      setTopicDropdownOpen(false);
                    }}
                    className="w-full h-8 px-2.5 rounded-md bg-[#101524] border border-white/[0.14] hover:border-white/30 focus:border-[#DFBA73] flex items-center justify-between text-left text-xs font-sans font-medium text-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <CountryFlagSvg code={currentJurisdiction.id} size="sm" />
                      <span className="truncate text-white text-[11.5px] font-medium">{currentJurisdiction.title}</span>
                    </div>
                    <ChevronDown
                      size={12}
                      className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                        jurDropdownOpen ? 'rotate-180 text-[#DFBA73]' : ''
                      }`}
                    />
                  </button>

                  {jurDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 p-1 bg-[#0D1220] border border-white/20 rounded-md shadow-2xl shadow-black space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150 max-h-48 overflow-y-auto scrollbar-none">
                      {jurisdictionsList.map((jur) => {
                        const isSelected = selectedJurisdiction === jur.id;
                        return (
                          <button
                            key={jur.id}
                            type="button"
                            onClick={() => handleJurSelect(jur)}
                            className={`w-full px-2 py-1.5 rounded text-xs font-sans text-left flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#DFBA73]/20 text-[#FFE8A3] border border-[#DFBA73]/40 font-semibold'
                                : 'text-gray-200 hover:bg-white/10 hover:text-white border border-transparent'
                            }`}
                          >
                            <CountryFlagSvg code={jur.id} size="sm" />
                            <span className="truncate text-[11.5px]">{jur.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Practice Direction Dropdown */}
                <div ref={catRef} className="relative">
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-0.5 uppercase">
                    {L.catLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCatDropdownOpen(!catDropdownOpen);
                      setJurDropdownOpen(false);
                      setTopicDropdownOpen(false);
                    }}
                    className="w-full h-8 px-2.5 rounded-md bg-[#101524] border border-white/[0.14] hover:border-white/30 focus:border-[#DFBA73] flex items-center justify-between text-left text-xs font-sans font-medium text-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1.5 overflow-hidden">
                      {currentCategory.id === 'usa' ? (
                        <LuxuryUsaFlag size="xs" />
                      ) : (
                        <span className="text-xs shrink-0">{currentCategory.icon}</span>
                      )}
                      <span className="truncate text-white text-[11.5px] font-medium">{currentCategory.title}</span>
                    </div>
                    <ChevronDown
                      size={12}
                      className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                        catDropdownOpen ? 'rotate-180 text-[#DFBA73]' : ''
                      }`}
                    />
                  </button>

                  {catDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 p-1 bg-[#0D1220] border border-white/20 rounded-md shadow-2xl shadow-black space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150">
                      {categoriesList.map((cat) => {
                        const isSelected = selectedCat === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCatSelect(cat)}
                            className={`w-full px-2 py-1.5 rounded text-xs font-sans text-left flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#DFBA73]/20 text-[#FFE8A3] border border-[#DFBA73]/40 font-semibold'
                                : 'text-gray-200 hover:bg-white/10 hover:text-white border border-transparent'
                            }`}
                          >
                            <span className="text-xs shrink-0">{cat.icon}</span>
                            <span className="truncate text-[11.5px]">{cat.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Specific Subcategory / Topic Dropdown */}
              <div ref={topicRef} className="relative">
                <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-0.5 uppercase">
                  {L.topicLabel}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTopicDropdownOpen(!topicDropdownOpen);
                    setJurDropdownOpen(false);
                    setCatDropdownOpen(false);
                  }}
                  className="w-full h-8 px-2.5 rounded-md bg-[#101524] border border-white/[0.14] hover:border-white/30 focus:border-[#DFBA73] flex items-center justify-between text-left text-xs font-sans font-medium text-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFBA73] shrink-0 shadow-[0_0_5px_rgba(223,186,115,0.7)]" />
                    <span className="truncate text-white font-medium">{selectedChip}</span>
                  </div>
                  <ChevronDown
                    size={13}
                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                      topicDropdownOpen ? 'rotate-180 text-[#DFBA73]' : ''
                    }`}
                  />
                </button>

                {topicDropdownOpen && (
                  <div className="absolute z-40 left-0 right-0 mt-1 p-1 bg-[#0D1220] border border-white/20 rounded-md shadow-2xl shadow-black space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150 max-h-44 overflow-y-auto scrollbar-none">
                    {currentCategory.chips.map((chip) => {
                      const isSelected = selectedChip === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleTopicSelect(chip)}
                          className={`w-full px-2.5 py-1.5 rounded text-xs font-sans text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#DFBA73]/20 text-[#FFE8A3] border border-[#DFBA73]/40 font-semibold'
                              : 'text-gray-200 hover:bg-white/10 hover:text-white border border-transparent'
                          }`}
                        >
                          <span className="truncate">{chip}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 4. Description Textarea */}
              <div className="rounded-md p-2 bg-[#101524] border border-white/[0.14] focus-within:border-white/30 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                  <label className="text-[10px] font-sans uppercase tracking-wider text-[#DFBA73] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFBA73]" />
                    {L.noteLabel}
                  </label>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock size={8} /> Confidential
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={L.notePlaceholder}
                  className="w-full bg-transparent text-white placeholder-gray-500 font-sans text-xs outline-none resize-none leading-relaxed"
                />
              </div>

              {/* 4. Preferred Communication Language (Язык общения) */}
              <div className="space-y-1 pt-0.5">
                <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block uppercase flex items-center justify-between">
                  <span>4. ЯЗЫК ОБЩЕНИЯ / PREFERRED LANGUAGE:</span>
                  <span className="text-[9px] text-gray-400 normal-case font-normal">для обратной связи</span>
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'ru', flag: 'ru', label: 'Русский' },
                    { id: 'en', flag: 'usa', label: 'English' },
                    { id: 'tr', flag: 'turkey', label: 'Türkçe' },
                    { id: 'uk', flag: 'other', label: 'Українська' },
                  ].map((item) => {
                    const isSelected = selectedCommLang === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedCommLang(item.id)}
                        className={`h-7 px-2 rounded-md flex items-center justify-center gap-1.5 text-[11px] font-medium transition-all cursor-pointer border select-none ${
                          isSelected
                            ? 'bg-[#DFBA73]/25 border-[#DFBA73] text-[#FFE8A3] shadow-[0_0_8px_rgba(223,186,115,0.3)] font-semibold'
                            : 'bg-[#101524] border-white/10 text-gray-300 hover:text-white hover:border-white/25'
                        }`}
                      >
                        <CountryFlagSvg code={item.flag} size="xs" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 5. Contact Information Grid with Clear Labels & Branded Icons */}
              <div className="space-y-2 pt-0.5">
                <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block uppercase flex items-center justify-between">
                  <span>5. КОНТАКТНЫЕ ДАННЫЕ ДЛЯ СВЯЗИ:</span>
                  <span className="text-[9px] text-emerald-400 normal-case font-normal">укажите удобный контакт</span>
                </label>

                {/* Row 1: Name & WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-sans font-medium text-gray-300 mb-0.5 flex items-center gap-1">
                      <User size={11} className="text-[#DFBA73]" />
                      <span>Ваше имя:</span>
                    </label>
                    <div className="relative">
                      <User size={12} className="text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      <input
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Александр"
                        className="w-full h-8 pl-7 pr-2.5 rounded-md bg-[#101524] border border-white/[0.14] focus:border-[#DFBA73] focus:bg-[#141b2e] text-white placeholder-gray-500 font-sans text-xs outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans font-medium text-gray-300 mb-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="text-[#25D366] font-semibold">WhatsApp / Телефон:</span>
                    </label>
                    <div className="relative">
                      <svg className="w-3.5 h-3.5 text-[#25D366] absolute left-2.5 top-2.5 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (___) ___-____ или с кодом"
                        className="w-full h-8 pl-7 pr-2.5 rounded-md bg-[#101524] border border-white/[0.14] focus:border-[#25D366] focus:bg-[#141b2e] text-white placeholder-gray-500 font-sans text-xs outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Telegram & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-sans font-medium text-gray-300 mb-0.5 flex items-center gap-1">
                      <svg className="w-3 h-3 text-[#2AABEE] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.922z"/>
                      </svg>
                      <span className="text-[#2AABEE] font-semibold">Telegram (@username):</span>
                    </label>
                    <div className="relative">
                      <svg className="w-3.5 h-3.5 text-[#2AABEE] absolute left-2.5 top-2.5 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.922z"/>
                      </svg>
                      <input
                        type="text"
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                        placeholder="@username"
                        className="w-full h-8 pl-7 pr-2.5 rounded-md bg-[#101524] border border-white/[0.14] focus:border-[#2AABEE] focus:bg-[#141b2e] text-white placeholder-gray-500 font-sans text-xs outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-sans font-medium text-gray-300 mb-0.5 flex items-center gap-1">
                      <Mail size={11} className="text-[#DFBA73]" />
                      <span>Электронная почта (Email):</span>
                    </label>
                    <div className="relative">
                      <Mail size={12} className="text-gray-400 absolute left-2.5 top-2.5 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full h-8 pl-7 pr-2.5 rounded-md bg-[#101524] border border-white/[0.14] focus:border-[#DFBA73] focus:bg-[#141b2e] text-white placeholder-gray-500 font-sans text-xs outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-1.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 rounded-md text-[#080B11] font-bold text-xs tracking-wider uppercase hover:brightness-105 active:scale-[0.98] transition-all shadow-md border border-[#FFE8A3]/50 cursor-pointer flex items-center justify-center gap-1.5 font-sans disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
                  }}
                >
                  <Send size={13} className="text-[#080B11]" />
                  <span>{isSubmitting ? L.submitting : L.submitBtn}</span>
                </button>
              </div>

              <div className="text-center pt-0.5">
                <p className="text-[10px] text-gray-400 font-light leading-tight">
                  Защищено сквозным шифрованием. Данные не передаются третьим лицам.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

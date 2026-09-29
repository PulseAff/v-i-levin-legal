'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ChevronDown, Lock } from 'lucide-react';
import { useLanguage, LanguageCode } from '@/context/LanguageContext';
import { LuxuryUsaFlag } from '@/components/ui/LuxuryUsaFlag';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  defaultService?: string;
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

  // No Telegram toggle: by default false (priority is Telegram)
  const [noTelegram, setNoTelegram] = useState(false);

  // Form fields for no-Telegram flow
  const [selectedCat, setSelectedCat] = useState<string>('usa');
  const [selectedChip, setSelectedChip] = useState<string>('EB-1A / EB-2 NIW');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Dropdown states
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  const catRef = useRef<HTMLDivElement>(null);
  const topicRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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
      setError('');
      setNoTelegram(false);
    }
  }, [isOpen]);

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
      ru: ['Компания в США / ОАЭ', 'Due Diligence', 'Международные договоры', 'Банковский счет', 'Холдинги & Налоги'],
      en: ['US / UAE Company', 'Due Diligence', 'Cross-Border Contracts', 'Corporate Bank Account', 'Holdings & Taxes'],
      uk: ['Компанія в США / ОАЕ', 'Due Diligence', 'Міжнародні договори', 'Банківський рахунок', 'Холдинги та податки'],
      es: ['Empresa en EE.UU. / EAU', 'Due Diligence', 'Contratos internacionales', 'Cuenta corporativa', 'Holdings y fiscalidad'],
      it: ['Società in USA / EAU', 'Due Diligence', 'Contratti transfrontalieri', 'Conto bancario', 'Holding & Fiscalità'],
      fr: ['Société USA / EAU', 'Due Diligence', 'Contrats internationaux', 'Compte bancaire pro', 'Holdings & Fiscalité'],
    },
    disputes: {
      ru: ['Международный арбитраж', 'Взыскание долгов', 'Суд в США / ЕС', 'Досудебная претензия', 'Исполнение решений'],
      en: ['International Arbitration', 'Debt Recovery', 'US / EU Litigation', 'Pre-Trial Claim', 'Enforcement of Awards'],
      uk: ['Міжнародний арбітраж', 'Стягнення боргів', 'Суд у США / ЄС', 'Досудова претензія', 'Виконання рішень'],
      es: ['Arbitraje internacional', 'Cobro de deudas', 'Litigios en EE.UU. / UE', 'Reclamación prejudicial', 'Ejecución de laudos'],
      it: ['Arbitrato internazionale', 'Recupero crediti', 'Contenzioso USA / UE', 'Reclamo stragiudiziale', 'Esecuzione sentenze'],
      fr: ['Arbitrage international', 'Recouvrement créances', 'Contentieux USA / UE', 'Mise en demeure', 'Exécution sentences'],
    },
    wealth: {
      ru: ['Безотзывные трасты', 'Защита от кредиторов', 'Семейный капитал', 'Налоговая защита', 'Фонды в Швейцарии'],
      en: ['Irrevocable Trusts', 'Asset Protection', 'Family Capital', 'Tax Shielding', 'Swiss Foundations'],
      uk: ['Безвідкличні трасти', 'Захист від кредиторів', 'Сімейний капітал', 'Податковий захист', 'Фонди у Швейцарії'],
      es: ['Fideicomisos irrevocables', 'Protección de activos', 'Capital familiar', 'Blindaje fiscal', 'Fundaciones suizas'],
      it: ['Trust irrevocabili', 'Protezione patrimoniale', 'Capitale familiare', 'Protezione fiscale', 'Fondazioni svizzere'],
      fr: ['Trusts irrévocables', "Protection d'actifs", 'Capital familial', 'Optimisation fiscale', 'Fondations suisses'],
    },
    other: {
      ru: ['Индивидуальный кейс', 'ВНЖ / Резидентство', 'Налоговый консалтинг', 'Срочный аудит', 'Иное поручение'],
      en: ['Custom Case', 'Residency / Relocation', 'Tax & Compliance', 'Urgent Legal Audit', 'Other Inquiry'],
      uk: ['Індивідуальний кейс', 'ВНЖ / Резидентство', 'Податковий консалтинг', 'Терміновий аудит', 'Інше доручення'],
      es: ['Caso personalizado', 'Residencia / Visado', 'Consultoría fiscal', 'Auditoría urgente', 'Otra consulta'],
      it: ['Caso personalizzato', 'Residenza / Visto', 'Consulenza fiscale', 'Audit urgente', 'Altro incarico'],
      fr: ['Dossier sur-mesure', 'Résidence / Titre de séjour', 'Conseil fiscal', 'Audit urgent', 'Autre demande'],
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

  // Synchronize category if passed via props
  useEffect(() => {
    if (!isOpen) return;
    const initial = (defaultCategory || defaultService || '').toLowerCase();
    if (initial.includes('usa') || initial.includes('иммиграц') || initial.includes('green') || initial.includes('eb-') || initial.includes('сша')) {
      setSelectedCat('usa');
      setSelectedChip(categoriesList[0].chips[0]);
    } else if (initial.includes('business') || initial.includes('бизнес') || initial.includes('корпор') || initial.includes('компан')) {
      setSelectedCat('business');
      setSelectedChip(categoriesList[1].chips[0]);
    } else if (initial.includes('dispute') || initial.includes('спор') || initial.includes('суд') || initial.includes('арбитраж')) {
      setSelectedCat('disputes');
      setSelectedChip(categoriesList[2].chips[0]);
    } else if (initial.includes('wealth') || initial.includes('траст') || initial.includes('актив') || initial.includes('капитал')) {
      setSelectedCat('wealth');
      setSelectedChip(categoriesList[3].chips[0]);
    } else if (initial) {
      setSelectedCat('other');
      setSelectedChip(categoriesList[4].chips[0]);
    }
  }, [isOpen, defaultCategory, defaultService]);

  const currentCategory = categoriesList.find((c) => c.id === selectedCat) || categoriesList[0];

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
    stepTitle: currentLang === 'en' ? 'For a faster response, send your inquiry via our Telegram bot' : currentLang === 'uk' ? 'Для швидшої відповіді надішліть вашу заявку через наш Telegram-бот' : currentLang === 'es' ? 'Para una respuesta más rápida, envíe su consulta a través de nuestro bot de Telegram' : currentLang === 'it' ? 'Per una risposta più rapida, invii la Sua richiesta tramite il nostro bot Telegram' : currentLang === 'fr' ? 'Pour une réponse plus rapide, envoyez votre demande via notre bot Telegram' : 'Для более быстрого ответа отправьте вашу заявку через наш Telegram-бот',
    stepSub: currentLang === 'en' ? 'Direct secure connection with legal counsel in one click.' : currentLang === 'uk' ? 'Прямий захищений зв’язок із юристом в один клік.' : currentLang === 'es' ? 'Conexión segura directa con el jurista en un clic.' : currentLang === 'it' ? 'Collegamento sicuro diretto con il giurista in un clic.' : currentLang === 'fr' ? 'Liaison sécurisée directe avec le juriste en un clic.' : 'Прямая защищенная связь с юристом в один клик.',
    tgBtn: currentLang === 'en' ? 'SEND VIA TELEGRAM BOT' : currentLang === 'uk' ? 'ВІДПРАВИТИ ЧЕРЕЗ TELEGRAM-БОТ' : currentLang === 'es' ? 'ENVIAR POR TELEGRAM BOT' : currentLang === 'it' ? 'INVIA TRAMITE BOT TELEGRAM' : currentLang === 'fr' ? 'ENVOYER VIA LE BOT TELEGRAM' : 'ОТПРАВИТЬ ЧЕРЕЗ TELEGRAM-БОТ',
    noTgCheckbox: currentLang === 'en' ? 'I do not have Telegram' : currentLang === 'uk' ? 'У мене немає Telegram' : currentLang === 'es' ? 'No tengo Telegram' : currentLang === 'it' ? 'Non ho Telegram' : currentLang === 'fr' ? 'Je n’ai pas Telegram' : 'У меня нет Telegram',
    catLabel: currentLang === 'en' ? 'LEGAL DIRECTION:' : currentLang === 'uk' ? 'НАПРЯМОК ПИТАННЯ:' : currentLang === 'es' ? 'ÁREA JURÍDICA:' : currentLang === 'it' ? 'AMBITO LEGALE:' : currentLang === 'fr' ? 'DOMAINE JURIDIQUE :' : 'НАПРАВЛЕНИЕ ВОПРОСА:',
    topicLabel: currentLang === 'en' ? 'SPECIFIC MATTER / SERVICE:' : currentLang === 'uk' ? 'КОНКРЕТИЗАЦІЯ ЗАВДАННЯ:' : currentLang === 'es' ? 'ASUNTO ESPECÍFICO:' : currentLang === 'it' ? 'OGGETTO SPECIFICO:' : currentLang === 'fr' ? 'OBJET SPÉCIFIQUE :' : 'КОНКРЕТИЗАЦИЯ ЗАДАЧИ:',
    waLabel: currentLang === 'en' ? 'WHATSAPP OR PHONE:' : currentLang === 'uk' ? 'WHATSAPP АБО ТЕЛЕФОН:' : currentLang === 'es' ? 'WHATSAPP O TELÉFONO:' : currentLang === 'it' ? 'WHATSAPP O TELEFONO:' : currentLang === 'fr' ? 'WHATSAPP OU TÉLÉPHONE :' : 'WHATSAPP ИЛИ ТЕЛЕФОН:',
    waPlaceholder: currentLang === 'en' ? '+1 (___) ___-____ or phone' : currentLang === 'uk' ? '+380 (__) ___-__-__ або телефон' : currentLang === 'es' ? '+34 (___) ___-___ o teléfono' : currentLang === 'it' ? '+39 (___) ___-___ o telefono' : currentLang === 'fr' ? '+33 (_) __ __ __ __ ou téléphone' : '+1 (___) ___-____ или номер с кодом',
    emailLabel: currentLang === 'en' ? 'EMAIL ADDRESS:' : currentLang === 'uk' ? 'ЕЛЕКТРОННА ПОШТА (EMAIL):' : currentLang === 'es' ? 'CORREO ELECTRÓNICO (EMAIL):' : currentLang === 'it' ? 'INDIRIZZO EMAIL:' : currentLang === 'fr' ? 'ADRESSE EMAIL :' : 'ЭЛЕКТРОННАЯ ПОЧТА (EMAIL):',
    emailPlaceholder: 'name@example.com',
    noteLabel: currentLang === 'en' ? 'BRIEF DETAILS (OPTIONAL):' : currentLang === 'uk' ? 'СУТЬ ПИТАННЯ (ОПЦІОНАЛЬНО):' : currentLang === 'es' ? 'DETALLES (OPCIONAL):' : currentLang === 'it' ? 'DETTAGLI (OPZIONALE):' : currentLang === 'fr' ? 'DÉTAILS (OPTIONNEL) :' : 'СУТЬ ВОПРОСА (ОПЦИОНАЛЬНО):',
    notePlaceholder: currentLang === 'en' ? 'Key facts, deadlines, notes...' : currentLang === 'uk' ? 'Ключові обставини, терміни...' : currentLang === 'es' ? 'Circunstancias clave, plazos...' : currentLang === 'it' ? 'Circostanze chiave, scadenze...' : currentLang === 'fr' ? 'Circonstances clés, délais...' : 'Ключевые обстоятельства, юрисдикции или дедлайны...',
    submitDirectBtn: currentLang === 'en' ? 'SUBMIT INQUIRY' : currentLang === 'uk' ? 'НАДІСЛАТИ ЗАЯВКУ' : currentLang === 'es' ? 'ENVIAR SOLICITUD' : currentLang === 'it' ? 'INVIA RICHIESTA' : currentLang === 'fr' ? 'ENVOYER LA DEMANDE' : 'ОТПРАВИТЬ ЗАЯВКУ',
    submitting: currentLang === 'en' ? 'Sending...' : currentLang === 'uk' ? 'Надсилання...' : currentLang === 'es' ? 'Enviando...' : currentLang === 'it' ? 'Invio in corso...' : currentLang === 'fr' ? 'Envoi...' : 'Отправка...',
    errorMissingContact: currentLang === 'en' ? 'Please specify your WhatsApp number or Email.' : currentLang === 'uk' ? 'Будь ласка, вкажіть ваш WhatsApp або Email.' : currentLang === 'es' ? 'Por favor indique su WhatsApp o Email.' : currentLang === 'it' ? 'Per favore indichi il Suo WhatsApp o Email.' : currentLang === 'fr' ? 'Veuillez indiquer votre WhatsApp ou Email.' : 'Пожалуйста, укажите WhatsApp или Email для связи.',
    successTitle: currentLang === 'en' ? 'Inquiry Successfully Received' : currentLang === 'uk' ? 'Заявку успішно прийнято' : currentLang === 'es' ? 'Solicitud recibida con éxito' : currentLang === 'it' ? 'Richiesta ricevuta con successo' : currentLang === 'fr' ? 'Demande reçue avec succès' : 'Заявка успешно принята',
    successDesc: currentLang === 'en' ? 'Details forwarded to legal counsel. We will contact you via WhatsApp or Email shortly.' : currentLang === 'uk' ? 'Деталі передано юристу практики. Ми зв’яжемося з вами за вказаним WhatsApp або Email.' : currentLang === 'es' ? 'Detalles enviados al jurista. Nos comunicaremos con usted por WhatsApp o Email en breve.' : currentLang === 'it' ? 'Dettagli inoltrati al giurista. La contatteremo a breve via WhatsApp o Email.' : currentLang === 'fr' ? 'Détails transmis au juriste. Nous vous contacterons rapidement par WhatsApp ou Email.' : 'Детали переданы юристу практики. Мы свяжемся с вами по указанному WhatsApp или Email в ближайшее время.',
    closeBtn: currentLang === 'en' ? 'Close' : currentLang === 'uk' ? 'Закрити' : currentLang === 'es' ? 'Cerrar' : currentLang === 'it' ? 'Chiudi' : currentLang === 'fr' ? 'Fermer' : 'Закрыть',
  };

  // Submit direct WhatsApp / Email application
  const handleSubmitDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsapp.trim() && !email.trim()) {
      setError(L.errorMissingContact);
      return;
    }

    setIsSubmitting(true);
    setError('');

    const botToken = '8805827853:AAGALkEhBOUTe2xNiKbehggEnC0cAKvwV-0';
    const recipients = ['7794422014', '6961207071'];

    const cleanPhone = whatsapp.replace(/[^0-9]/g, '');
    const waLink = cleanPhone ? `https://wa.me/${cleanPhone}` : '';

    const messageText = 
      `⚖️ *НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ (БЕЗ TELEGRAM)*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📂 *Направление:* ${currentCategory.icon} ${currentCategory.title}\n` +
      `📌 *Подкатегория:* ${selectedChip}\n\n` +
      (whatsapp.trim() ? `🟢 *WhatsApp:* \`${whatsapp.trim()}\`${waLink ? ` ([Открыть WhatsApp](${waLink}))` : ''}\n` : '') +
      (email.trim() ? `✉️ *Email:* \`${email.trim()}\`\n` : '') +
      (note.trim() ? `\n💬 *Суть вопроса:* ${note.trim()}\n` : '') +
      `\n🌐 *Язык сайта:* ${currentLang.toUpperCase()}\n` +
      `🕒 *Время:* ${new Date().toLocaleString('ru-RU')}`;

    const inlineKeyboard: Array<Array<{ text: string; url: string }>> = [];
    if (waLink) {
      inlineKeyboard.push([{ text: '🟢 Написать клиенту в WhatsApp', url: waLink }]);
    }
    if (email.trim()) {
      inlineKeyboard.push([{ text: '✉️ Отправить Email клиенту', url: `mailto:${email.trim()}` }]);
    }

    try {
      // Direct delivery to Telegram Bot API with quick action buttons
      await Promise.all(recipients.map(async (chatId) => {
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
              parse_mode: 'Markdown',
              reply_markup: inlineKeyboard.length > 0 ? { inline_keyboard: inlineKeyboard } : undefined,
            }),
          });
        } catch {
          // ignore individual timeout
        }
      }));

      // Background sync to /api/leads
      try {
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'Modal (No-Telegram direct)',
            serviceCategory: currentCategory.title,
            topic: selectedChip,
            contact: { whatsapp: whatsapp.trim(), email: email.trim() },
            description: note.trim(),
          }),
        }).catch(() => {});
      } catch {
        // ignore
      }

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] min-h-[100dvh] flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[390px] m-auto p-4 sm:p-5 rounded-xl bg-[#0B0F19] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-visible text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer z-30"
          aria-label="Закрыть"
        >
          <X size={15} />
        </button>

        {isSuccess ? (
          /* SUCCESS SCREEN (AFTER SUBMITTING WHATSAPP/EMAIL) */
          <div className="py-5 text-center space-y-3.5">
            <div className="w-11 h-11 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="text-base font-serif text-[#FFE8A3] font-bold tracking-tight">
                {L.successTitle}
              </h3>
              <p className="text-gray-300 text-xs max-w-xs mx-auto font-sans font-light leading-relaxed mt-1">
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
          /* SINGLE DIRECT SCREEN: TELEGRAM BOT PRIORITY OR EXPANDABLE WHATSAPP/EMAIL */
          <div className="space-y-3 relative z-10 animate-in fade-in duration-200">
            {/* Header */}
            <div className="text-center px-4 pt-1">
              <h3 className="text-xs sm:text-sm font-sans font-bold text-white leading-snug">
                {L.stepTitle}
              </h3>
              <p className="text-[11px] font-sans text-gray-400 mt-1 leading-tight">
                {L.stepSub}
              </p>
            </div>

            {/* Clickable Gold Seal Emblem (Direct link to Telegram Bot) */}
            <div className="flex justify-center py-1">
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                title="Перейти в Telegram-бот @VILEVIN_bot"
                className="group relative block rounded-full transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 rounded-full bg-[#DFBA73]/20 blur-md group-hover:bg-[#DFBA73]/40 transition-colors pointer-events-none" />
                <img
                  src="/images/v_levin_seal.png"
                  alt="V. I. LEVIN Legal Counsel"
                  className="relative w-20 h-20 sm:w-[88px] sm:h-[88px] object-contain drop-shadow-[0_4px_16px_rgba(212,175,55,0.3)] select-none pointer-events-none"
                />
              </a>
            </div>

            {/* Priority Channel: Telegram Bot Button (Clean gold button without white circle/emoji) */}
            <div className="pt-0.5">
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-md text-[#080B11] font-bold text-xs tracking-wider uppercase hover:brightness-105 active:scale-[0.98] transition-all shadow-md border border-[#FFE8A3]/50 cursor-pointer flex items-center justify-center font-sans"
                style={{
                  background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
                }}
              >
                <span>{L.tgBtn}</span>
              </a>
            </div>

            {/* Checkbox: "I don't have Telegram" */}
            <div className="pt-1 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer select-none group py-1">
                <input
                  type="checkbox"
                  checked={noTelegram}
                  onChange={(e) => {
                    setNoTelegram(e.target.checked);
                    setError('');
                  }}
                  className="w-3.5 h-3.5 rounded border-white/20 text-[#DFBA73] focus:ring-0 focus:ring-offset-0 bg-[#101524] cursor-pointer accent-[#DFBA73]"
                />
                <span className="text-[11px] font-sans text-gray-300 group-hover:text-white transition-colors font-medium">
                  {L.noTgCheckbox}
                </span>
              </label>
            </div>

            {/* Expandable Form: Directions, Subcategories, WhatsApp & Email */}
            {noTelegram && (
              <form onSubmit={handleSubmitDirect} className="space-y-2 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
                {error && (
                  <div className="p-2 rounded bg-red-950/80 border border-red-500/40 text-red-200 text-[11px] font-sans">
                    {error}
                  </div>
                )}

                {/* 1. Category Dropdown */}
                <div ref={catRef} className="relative">
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-1 uppercase">
                    {L.catLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCatDropdownOpen(!catDropdownOpen);
                      setTopicDropdownOpen(false);
                    }}
                    className="w-full h-8.5 px-3 rounded-md bg-[#101524] border border-white/[0.12] hover:border-white/25 focus:border-[#DFBA73] flex items-center justify-between text-left text-xs font-sans font-medium text-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      {currentCategory.id === 'usa' ? (
                        <LuxuryUsaFlag size="xs" />
                      ) : (
                        <span className="text-xs shrink-0">{currentCategory.icon}</span>
                      )}
                      <span className="truncate text-white font-medium">{currentCategory.title}</span>
                    </div>
                    <ChevronDown
                      size={13}
                      className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                        catDropdownOpen ? 'rotate-180 text-[#DFBA73]' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {catDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 p-1 bg-[#0D1220] border border-white/20 rounded-md shadow-2xl shadow-black space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150">
                      {categoriesList.map((cat) => {
                        const isSelected = selectedCat === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCatSelect(cat)}
                            className={`w-full px-2.5 py-1.5 rounded text-xs font-sans text-left flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#DFBA73]/20 text-[#FFE8A3] border border-[#DFBA73]/40 font-semibold'
                                : 'text-gray-200 hover:bg-white/10 hover:text-white border border-transparent'
                            }`}
                          >
                            {cat.id === 'usa' ? (
                              <LuxuryUsaFlag size="xs" />
                            ) : (
                              <span className="text-xs">{cat.icon}</span>
                            )}
                            <span className="truncate">{cat.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 2. Specific Topic Dropdown */}
                <div ref={topicRef} className="relative">
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-1 uppercase">
                    {L.topicLabel}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setTopicDropdownOpen(!topicDropdownOpen);
                      setCatDropdownOpen(false);
                    }}
                    className="w-full h-8.5 px-3 rounded-md bg-[#101524] border border-white/[0.12] hover:border-white/25 focus:border-[#DFBA73] flex items-center justify-between text-left text-xs font-sans font-medium text-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
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

                  {/* Dropdown Menu */}
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

                {/* 3. WhatsApp Row */}
                <div>
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-1 uppercase">
                    {L.waLabel}
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={L.waPlaceholder}
                    className="w-full h-8.5 px-3 rounded-md bg-[#101524] border border-white/[0.12] focus:border-[#DFBA73] focus:bg-[#141b2e] text-white placeholder-gray-500 font-sans text-xs outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* 4. Email Row */}
                <div>
                  <label className="text-[10px] font-sans font-semibold tracking-wider text-[#DFBA73] block mb-1 uppercase">
                    {L.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={L.emailPlaceholder}
                    className="w-full h-8.5 px-3 rounded-md bg-[#101524] border border-white/[0.12] focus:border-[#DFBA73] focus:bg-[#141b2e] text-white placeholder-gray-500 font-sans text-xs outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* 5. Note / Description Textarea */}
                <div className="rounded-md p-2 bg-[#101524] border border-white/[0.12] focus-within:border-white/25 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
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

                {/* Submit direct inquiry button */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 rounded-md text-[#080B11] font-bold text-xs tracking-wider uppercase hover:brightness-105 active:scale-[0.98] transition-all shadow-md border border-[#FFE8A3]/50 cursor-pointer flex items-center justify-center font-sans disabled:opacity-50"
                    style={{
                      background: 'linear-gradient(135deg, #F3E2B8 0%, #D4AF37 50%, #99742B 100%)',
                    }}
                  >
                    <span>{isSubmitting ? L.submitting : L.submitDirectBtn}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

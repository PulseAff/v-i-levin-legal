'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle2, ChevronDown, Lock } from 'lucide-react';
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
  const [selectedCat, setSelectedCat] = useState<string>('usa');
  const [selectedChip, setSelectedChip] = useState<string>('EB-1A / EB-2 NIW');
  const [contact, setContact] = useState('');
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
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

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
    } else if (initial.includes('bus') || initial.includes('бизнес') || initial.includes('контракт') || initial.includes('компан')) {
      setSelectedCat('business');
      setSelectedChip(categoriesList[1].chips[0]);
    } else if (initial.includes('dispute') || initial.includes('спор') || initial.includes('арбитраж') || initial.includes('суд') || initial.includes('долг')) {
      setSelectedCat('disputes');
      setSelectedChip(categoriesList[2].chips[0]);
    } else if (initial.includes('wealth') || initial.includes('траст') || initial.includes('актив') || initial.includes('капитал')) {
      setSelectedCat('wealth');
      setSelectedChip(categoriesList[3].chips[0]);
    } else if (initial.includes('other') || initial.includes('ин') || initial.includes('друг') || initial.includes('индивидуальн')) {
      setSelectedCat('other');
      setSelectedChip(categoriesList[4].chips[0]);
    }
  }, [isOpen, defaultCategory, defaultService, currentLang]);

  if (!isOpen) return null;

  const currentCategory = categoriesList.find(c => c.id === selectedCat) || categoriesList[0];

  const handleCatSelect = (cat: CategoryOption) => {
    setSelectedCat(cat.id);
    setSelectedChip(cat.chips[0]);
    setCatDropdownOpen(false);
  };

  const handleTopicSelect = (chip: string) => {
    setSelectedChip(chip);
    setTopicDropdownOpen(false);
  };

  const contactErrorMsg =
    currentLang === 'en'
      ? 'Please provide your Telegram, WhatsApp, or phone number.'
      : currentLang === 'uk'
      ? 'Будь ласка, вкажіть ваш Telegram, телефон або WhatsApp для зв’язку.'
      : currentLang === 'es'
      ? 'Por favor, indique su Telegram, teléfono o WhatsApp de contacto.'
      : currentLang === 'it'
      ? 'Per favore, indichi il Suo Telegram, telefono o WhatsApp per il contatto.'
      : currentLang === 'fr'
      ? 'Veuillez indiquer votre Telegram, téléphone ou WhatsApp pour vous contacter.'
      : 'Пожалуйста, укажите ваш Telegram, телефон или WhatsApp для связи.';

  const categoryStepLabel =
    currentLang === 'en'
      ? 'Legal Direction:'
      : currentLang === 'uk'
      ? 'Напрямок питання:'
      : currentLang === 'es'
      ? 'Área jurídica:'
      : currentLang === 'it'
      ? 'Ambito legale:'
      : currentLang === 'fr'
      ? 'Domaine juridique :'
      : 'Направление вопроса:';

  const topicStepLabel =
    currentLang === 'en'
      ? 'Specific Matter / Service:'
      : currentLang === 'uk'
      ? 'Конкретизація завдання:'
      : currentLang === 'es'
      ? 'Asunto específico:'
      : currentLang === 'it'
      ? 'Oggetto specifico:'
      : currentLang === 'fr'
      ? 'Objet spécifique :'
      : 'Конкретизация задачи:';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) {
      setError(contactErrorMsg);
      return;
    }

    setIsSubmitting(true);
    setError('');

    const botToken = '8805827853:AAGALkEhBOUTe2xNiKbehggEnC0cAKvwV-0';
    const recipients = ['7794422014', '6961207071'];

    const messageText = 
      `⚖️ *НОВАЯ ЗАЯВКА НА КОНСУЛЬТАЦИЮ*
` +
      `📂 *Направление:* ${currentCategory.icon} ${currentCategory.title}
` +
      `📌 *Тема / Вопрос:* ${selectedChip}
` +
      `📱 *Контакт:* \`${contact.trim()}\`
` +
      (note.trim() ? `💬 *Примечание:* ${note.trim()}
` : '') +
      `🌐 *Язык:* ${currentLang.toUpperCase()}
` +
      `🕒 *Время:* ${new Date().toLocaleString('ru-RU')}`;

    try {
      // Direct delivery to Telegram Bot API
      await Promise.all(recipients.map(async (chatId) => {
        try {
          await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: messageText,
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
            source: 'Liquid Glass Modal',
            serviceCategory: currentCategory.title,
            topic: selectedChip,
            contact: { contact: contact.trim() },
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
      className="fixed inset-0 z-[200] min-h-[100dvh] flex items-center justify-center p-3 sm:p-4 bg-black/40 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-[420px] m-auto p-4 sm:p-5 rounded-xl bg-[#0B0F19] border border-white/[0.12] hover:border-[#DFBA73]/35 transition-colors shadow-[0_25px_60px_rgba(0,0,0,0.95),inset_0_1px_1px_rgba(255,255,255,0.12)] overflow-visible text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer z-30"
          aria-label="Закрыть"
        >
          <X size={16} />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <CheckCircle2 size={26} />
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#FFE8A3] font-bold tracking-tight">
                {t('modal', 'successTitle')}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xs mx-auto font-serif font-light leading-relaxed mt-1">
                {t('modal', 'successDesc')}
              </p>
            </div>

            {/* Direct Telegram Connection Button */}
            <div className="pt-2 space-y-2">
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg font-serif font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#DFBA73] via-[#F4DEAA] to-[#C99C4B] text-black shadow-[0_4px_20px_rgba(223,186,115,0.3)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>💬</span>
                <span>
                  {currentLang === 'en'
                    ? 'Start dialogue with legal counsel in Telegram'
                    : currentLang === 'uk'
                    ? 'Розпочати діалог з юристом у Telegram'
                    : currentLang === 'es'
                    ? 'Iniciar diálogo con el jurista en Telegram'
                    : currentLang === 'it'
                    ? 'Avvia dialogo con il giurista su Telegram'
                    : currentLang === 'fr'
                    ? 'Démarrer le dialogue avec le juriste sur Telegram'
                    : 'Начать диалог с юристом в Telegram'}
                </span>
              </a>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-[11px] font-serif uppercase tracking-widest transition-colors cursor-pointer block mx-auto pt-1"
              >
                {t('modal', 'successBtn')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 relative z-10">
            
            {/* Modal Title */}
            <div className="pr-6">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-white tracking-tight leading-snug">
                {t('modal', 'title')}
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5">
              {error && (
                <div className="p-2 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-serif">
                  {error}
                </div>
              )}

              {/* 1. Category Dropdown (Выпадающий список направлений) */}
              <div ref={catRef} className="relative">
                <label className="text-[10.5px] font-serif uppercase tracking-wider text-[#DFBA73] block mb-1 font-semibold">
                  {categoryStepLabel}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCatDropdownOpen(!catDropdownOpen);
                    setTopicDropdownOpen(false);
                  }}
                  className="w-full h-9 sm:h-10 px-3 rounded-lg bg-[#101524] border border-white/[0.12] hover:border-white/25 focus:border-[#DFBA73]/70 flex items-center justify-between text-left text-xs sm:text-sm font-serif font-semibold text-white transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {currentCategory.id === 'usa' ? (
                      <LuxuryUsaFlag size="xs" />
                    ) : (
                      <span className="text-xs shrink-0">{currentCategory.icon}</span>
                    )}
                    <span className="truncate">{currentCategory.title}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                      catDropdownOpen ? 'rotate-180 text-[#DFBA73]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {catDropdownOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-1 p-1 bg-[#0D1220] border border-white/20 rounded-lg shadow-2xl shadow-black space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150">
                    {categoriesList.map((cat) => {
                      const isSelected = selectedCat === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCatSelect(cat)}
                          className={`w-full px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-serif text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#DFBA73]/15 text-[#FFE8A3] border border-[#DFBA73]/30 font-semibold'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
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

              {/* 2. Specific Topic Dropdown (Выпадающий список задач) */}
              <div ref={topicRef} className="relative">
                <label className="text-[10.5px] font-serif uppercase tracking-wider text-[#DFBA73] block mb-1 font-semibold">
                  {topicStepLabel}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setTopicDropdownOpen(!topicDropdownOpen);
                    setCatDropdownOpen(false);
                  }}
                  className="w-full h-9 sm:h-10 px-3 rounded-lg bg-[#101524] border border-white/[0.12] hover:border-white/25 focus:border-[#DFBA73]/70 flex items-center justify-between text-left text-xs sm:text-sm font-serif font-medium text-gray-200 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFBA73] shrink-0 shadow-[0_0_6px_rgba(223,186,115,0.6)]" />
                    <span className="truncate">{selectedChip}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-400 shrink-0 transition-transform duration-200 ${
                      topicDropdownOpen ? 'rotate-180 text-[#DFBA73]' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {topicDropdownOpen && (
                  <div className="absolute z-40 left-0 right-0 mt-1 p-1 bg-[#0D1220] border border-white/20 rounded-lg shadow-2xl shadow-black space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-150 max-h-48 overflow-y-auto scrollbar-none">
                    {currentCategory.chips.map((chip) => {
                      const isSelected = selectedChip === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleTopicSelect(chip)}
                          className={`w-full px-2.5 py-1.5 rounded-md text-xs sm:text-sm font-serif text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#DFBA73]/15 text-[#FFE8A3] border border-[#DFBA73]/30 font-semibold'
                              : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                          }`}
                        >
                          <span className="truncate">{chip}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Contact Input */}
              <div>
                <label className="text-[10.5px] font-serif uppercase tracking-wider text-[#DFBA73] block mb-1 font-semibold">
                  {t('modal', 'contactLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t('modal', 'contactPlaceholder')}
                  className="w-full h-9 sm:h-10 px-3 rounded-lg bg-[#101524] border border-white/[0.12] focus:border-[#DFBA73]/80 focus:bg-[#141b2e] text-white placeholder-gray-400 font-serif text-xs sm:text-sm outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"
                />
              </div>

              {/* 4. Note / Description Textarea */}
              <div className="rounded-lg p-2.5 bg-[#101524] border border-white/[0.12] focus-within:border-white/25 transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                  <label className="text-[10px] font-serif uppercase tracking-wider text-[#DFBA73] font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DFBA73]" />
                    {t('modal', 'noteLabel')}
                  </label>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock size={8.5} /> Confidential
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('modal', 'notePlaceholder')}
                  className="w-full bg-transparent text-white placeholder-gray-500 font-serif text-xs sm:text-sm outline-none resize-none leading-snug"
                />
              </div>

              {/* 5. Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 sm:h-11 px-4 rounded-lg bg-gradient-to-r from-[#DFBA73] via-[#F5E2B3] to-[#C99C4B] text-black font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(223,186,115,0.25),inset_0_1px_1px_rgba(255,255,255,0.6)] hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50 relative overflow-hidden"
                >
                  {/* Subtle Glass Shimmer Effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-glass-shimmer pointer-events-none" />
                  <Send size={13} className="relative z-10" />
                  <span className="relative z-10 font-black">
                    {isSubmitting ? t('modal', 'submitting') : t('modal', 'submitBtn')}
                  </span>
                </button>
              </div>

              {/* Direct Telegram Link Alternative */}
              <div className="pt-1 text-center">
                <a
                  href="https://t.me/VILEVIN_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-serif text-[#DFBA73]/80 hover:text-[#FFE8A3] transition-colors"
                >
                  <span>
                    {currentLang === 'en'
                      ? 'Or contact legal counsel directly in Telegram:'
                      : currentLang === 'uk'
                      ? 'Або напишіть юристу напряму в Telegram:'
                      : currentLang === 'es'
                      ? 'O escriba al jurista directamente en Telegram:'
                      : currentLang === 'it'
                      ? 'O scrivi direttamente al giurista su Telegram:'
                      : currentLang === 'fr'
                      ? 'Ou écrivez directement au juriste sur Telegram:'
                      : 'Или напишите юристу напрямую в Telegram:'}
                  </span>
                  <span className="font-semibold underline underline-offset-2">@VILEVIN_bot</span>
                </a>
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};

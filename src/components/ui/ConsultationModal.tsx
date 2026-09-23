'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, Shield, CheckCircle2, MessageSquare, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

const BOT_TOKEN = '8805827853:AAGALkEhBOUTe2xNiKbehggEnC0cAKvwV-0';
const ADMIN_CHAT_ID = '7794422014';
const LAWYER_CHAT_ID = '1275663257';

function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

interface CategoryOption {
  id: string;
  icon: string;
  name: Record<string, string>;
  questions: Record<string, string[]>;
}

const CATEGORIES: CategoryOption[] = [
  {
    id: 'usa',
    icon: '🇺🇸',
    name: {
      ru: 'Иммиграция США & Green Card',
      en: 'US Immigration & Green Card',
      uk: 'Імміграція США & Green Card',
      es: 'Inmigración EE.UU. & Green Card',
      it: 'Immigrazione USA & Green Card',
      fr: 'Immigration USA & Green Card',
    },
    questions: {
      ru: [
        'Оценка шансов EB-1A / EB-2 NIW',
        'Подготовка к консульскому интервью',
        'Отказ по визе / 221(g) / RFE',
        'Смена статуса / Green Card',
      ],
      en: [
        'EB-1A / EB-2 NIW eligibility check',
        'Consular interview prep',
        'Visa refusal / 221(g) / RFE defense',
        'Adjustment of status / Green Card',
      ],
      uk: [
        'Оцінка шансів EB-1A / EB-2 NIW',
        'Підготовка до консульського інтерв’ю',
        'Відмова у візі / 221(g) / RFE',
        'Зміна статусу / Green Card',
      ],
      es: [
        'Evaluación EB-1A / EB-2 NIW',
        'Preparación entrevista consular',
        'Rechazo de visa / 221(g) / RFE',
        'Ajuste de estatus / Green Card',
      ],
      it: [
        'Valutazione EB-1A / EB-2 NIW',
        'Preparazione colloquio consolare',
        'Rifiuto visto / 221(g) / RFE',
        'Modifica status / Green Card',
      ],
      fr: [
        'Évaluation EB-1A / EB-2 NIW',
        'Préparation entretien consulaire',
        'Refus de visa / 221(g) / RFE',
        'Changement de statut / Green Card',
      ],
    },
  },
  {
    id: 'business',
    icon: '💼',
    name: {
      ru: 'Международный бизнес',
      en: 'Cross-Border Business',
      uk: 'Міжнародний бізнес',
      es: 'Negocios internacionales',
      it: 'Business internazionale',
      fr: 'Affaires internationales',
    },
    questions: {
      ru: [
        'Регистрация компании США / ОАЭ / ЕС',
        'Международный контракт & комплаенс',
        'Защита сделки & аудит рисков',
        'Трансграничные расчеты (USDT / SWIFT)',
      ],
      en: [
        'Company setup USA / UAE / EU',
        'Cross-border contracts & compliance',
        'Deal security & risk audit',
        'Cross-border settlements (USDT/SWIFT)',
      ],
      uk: [
        'Реєстрація компанії США / ОАЕ / ЄС',
        'Міжнародний контракт & комплаєнс',
        'Захист угоди & аудит ризиків',
        'Транскордонні розрахунки (USDT/SWIFT)',
      ],
      es: [
        'Creación de empresa EE.UU. / EAU / UE',
        'Contratos transfronterizos',
        'Auditoría y protección de transacciones',
        'Liquidaciones internacionales (USDT)',
      ],
      it: [
        'Costituzione società USA / UAE / UE',
        'Contratti internazionali e conformità',
        'Sicurezza accordi e audit rischi',
        'Transazioni transfrontaliere (USDT)',
      ],
      fr: [
        'Création société USA / EAU / UE',
        'Contrats internationaux & conformité',
        'Audit des risques commerciaux',
        'Paiements transfrontaliers (USDT)',
      ],
    },
  },
  {
    id: 'disputes',
    icon: '⚖️',
    name: {
      ru: 'Суды & Арбитраж',
      en: 'Disputes & Arbitration',
      uk: 'Суди & Арбітраж',
      es: 'Litigios y arbitraje',
      it: 'Contenzioso e arbitrato',
      fr: 'Contentieux & Arbitrage',
    },
    questions: {
      ru: [
        'Международный арбитраж (DIFC/LCIA/ICC)',
        'Трансграничный спор с партнером',
        'Исполнение иностранного решения суда',
        'Досудебная претензия и урегулирование',
      ],
      en: [
        'International arbitration (DIFC/LCIA/ICC)',
        'Cross-border partner dispute',
        'Foreign judgment enforcement',
        'Pre-trial claims & settlement',
      ],
      uk: [
        'Міжнародний арбітраж (DIFC/LCIA/ICC)',
        'Транскордонний спір з партнером',
        'Виконання іноземного рішення суду',
        'Досудове врегулювання',
      ],
      es: [
        'Arbitraje internacional (DIFC/LCIA)',
        'Disputa comercial transfronteriza',
        'Ejecución de sentencia extranjera',
        'Negociación prejudicial',
      ],
      it: [
        'Arbitrato internazionale (DIFC/LCIA)',
        'Controversia transfrontaliera',
        'Esecuzione sentenze straniere',
        'Transazione stragiudiziale',
      ],
      fr: [
        'Arbitrage international (DIFC/LCIA)',
        'Litige commercial transfrontalier',
        'Exécution de décisions étrangères',
        'Règlement précontentieux',
      ],
    },
  },
  {
    id: 'assets',
    icon: '🛡',
    name: {
      ru: 'Защита активов & Счета',
      en: 'Asset Protection & Banking',
      uk: 'Захист активів & Рахунки',
      es: 'Protección de activos y cuentas',
      it: 'Protezione patrimoniale e conti',
      fr: 'Protection des actifs & Comptes',
    },
    questions: {
      ru: [
        'Трасты & структурирование капитала',
        'Открытие счетов в зарубежных банках',
        'Защита от субсидиарной ответственности',
        'Криптовалютный комплаенс (Cryptomus/USDT)',
      ],
      en: [
        'Trusts & wealth structuring',
        'Foreign bank account opening',
        'Liability shielding & asset shelter',
        'Crypto compliance (Cryptomus/USDT)',
      ],
      uk: [
        'Трасти & структурування капіталу',
        'Відкриття рахунків у закордонних банках',
        'Захист від субсидіарної відповідальності',
        'Криптовалютний комплаєнс (USDT)',
      ],
      es: [
        'Fideicomisos y estructuración',
        'Apertura de cuentas bancarias en el exterior',
        'Blindaje de activos',
        'Cumplimiento cripto (USDT)',
      ],
      it: [
        'Trust e strutturazione patrimoniale',
        'Apertura conti bancari esteri',
        'Protezione patrimoniale strategica',
        'Conformità crypto (USDT)',
      ],
      fr: [
        'Fiducies & structuration patrimoniale',
        'Ouverture de comptes bancaires étrangers',
        'Protection des actifs stratégiques',
        'Conformité crypto (USDT)',
      ],
    },
  },
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const { currentLang } = useLanguage();

  const langKey = (['ru', 'en', 'uk', 'es', 'it', 'fr'].includes(currentLang) ? currentLang : 'ru') as string;

  const [selectedCatId, setSelectedCatId] = useState<string>('usa');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [customDetails, setCustomDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Auto pick category if defaultService is passed
  useEffect(() => {
    if (defaultService) {
      if (defaultService.toLowerCase().includes('green card') || defaultService.toLowerCase().includes('иммиграц')) {
        setSelectedCatId('usa');
      } else if (defaultService.toLowerCase().includes('бизнес') || defaultService.toLowerCase().includes('контракт')) {
        setSelectedCatId('business');
      } else if (defaultService.toLowerCase().includes('спор') || defaultService.toLowerCase().includes('арбитраж')) {
        setSelectedCatId('disputes');
      } else if (defaultService.toLowerCase().includes('актив')) {
        setSelectedCatId('assets');
      }
    }
  }, [defaultService]);

  // Set default question when category changes
  useEffect(() => {
    const cat = CATEGORIES.find((c) => c.id === selectedCatId);
    if (cat) {
      const qList = cat.questions[langKey] || cat.questions.ru;
      if (qList && qList.length > 0 && !selectedQuestion) {
        setSelectedQuestion(qList[0]);
      }
    }
  }, [selectedCatId, langKey]);

  // Lock body scroll reliably on mobile and desktop
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setError('');
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];
  const questionsList = activeCategory.questions[langKey] || activeCategory.questions.ru;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!contact.trim()) {
      setError(
        langKey === 'en'
          ? 'Please enter your phone number or Telegram @username'
          : 'Пожалуйста, укажите телефон или Telegram @username'
      );
      return;
    }

    setIsSubmitting(true);

    const timeStr = new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
    });

    const categoryName = activeCategory.name[langKey] || activeCategory.name.ru;
    const finalQuestion = selectedQuestion || questionsList[0] || 'Общий правовой аудит';

    const msg = [
      `⚖️ <b>НОВАЯ ЗАЯВКА С САЙТА VILEVIN.COM</b>`,
      `━━━━━━━━━━━━━━━━━━`,
      `📁 <b>Категория:</b> ${activeCategory.icon} ${escapeHtml(categoryName)}`,
      `🎯 <b>Вопрос:</b> ${escapeHtml(finalQuestion)}`,
      customDetails.trim() ? `📝 <b>Уточнение:</b> <i>${escapeHtml(customDetails)}</i>` : '',
      `━━━━━━━━━━━━━━━━━━`,
      `👤 <b>Имя доверителя:</b> ${escapeHtml(name || 'Не указано')}`,
      `📱 <b>Контакт:</b> ${escapeHtml(contact)}`,
      `🌐 <b>Язык сайта:</b> ${langKey.toUpperCase()}`,
      `⏱ <b>Время:</b> ${timeStr}`,
      `━━━━━━━━━━━━━━━━━━`,
      `🔒 <i>Attorney-Client Privilege. Передано в работу.</i>`,
    ].filter(Boolean).join('\n');

    try {
      const sendToTelegram = async (chatId: string) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3800);
        try {
          const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: msg,
              parse_mode: 'HTML',
            }),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);
          return res;
        } catch {
          return null;
        }
      };

      // Send to both admin and lawyer concurrently
      await Promise.allSettled([
        sendToTelegram(ADMIN_CHAT_ID),
        sendToTelegram(LAWYER_CHAT_ID),
      ]);

      // Cache locally
      try {
        const existing = JSON.parse(localStorage.getItem('vilevin_leads') || '[]');
        existing.push({
          id: 'lead_' + Date.now(),
          category: categoryName,
          question: finalQuestion,
          name,
          contact,
          details: customDetails,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('vilevin_leads', JSON.stringify(existing));
      } catch {}

      setIsSuccess(true);
    } catch {
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[250] min-h-[100dvh] w-screen overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-lg my-auto mx-auto bg-[#090D14] border border-[#232F42] rounded-2xl shadow-2xl p-4 sm:p-6 text-left max-h-[92dvh] overflow-y-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer z-10"
          aria-label="Закрыть"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          /* Compact Success Card */
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/15 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 className="text-lg font-serif text-white font-bold">
                {langKey === 'en' ? 'Request Received' : 'Заявка принята'}
              </h3>
              <p className="text-gray-300 text-xs mt-1 max-w-xs mx-auto">
                {langKey === 'en'
                  ? 'We will review your inquiry and get back to you within 15 minutes.'
                  : 'Юрист изучит вопрос и свяжется с вами в течение 15 минут.'}
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-2.5">
              <button
                onClick={onClose}
                className="px-5 py-2 bg-gradient-to-r from-[#E5C37A] to-[#C9A45B] text-[#070A0F] font-bold text-xs rounded-full hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-sm"
              >
                {langKey === 'en' ? 'Close' : 'Закрыть'}
              </button>
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#101724] border border-[#23334A] text-gold-300 hover:text-white text-xs rounded-full transition-colors inline-flex items-center gap-1.5"
              >
                <MessageSquare size={13} /> Telegram
              </a>
            </div>
          </div>
        ) : (
          /* Form with Categories & Sub-questions */
          <>
            {/* Header */}
            <div className="mb-3.5 pr-6">
              <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gold-400 uppercase tracking-wider mb-1">
                <Shield size={11} />
                <span>{langKey === 'en' ? 'Confidential Legal Review' : 'Конфиденциально · Attorney-Client Privilege'}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-serif text-white font-bold">
                {langKey === 'en' ? 'Request Legal Consultation' : 'Запись на консультацию юриста'}
              </h2>
            </div>

            {error && (
              <div className="mb-3 p-2 bg-red-950/60 border border-red-500/40 rounded-lg text-red-200 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Category Pills (4 Options) */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                  {langKey === 'en' ? 'Select Category' : '1. Выберите направление'}:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const isSelected = cat.id === selectedCatId;
                    const cName = cat.name[langKey] || cat.name.ru;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          setSelectedCatId(cat.id);
                          const qList = cat.questions[langKey] || cat.questions.ru;
                          setSelectedQuestion(qList[0] || '');
                        }}
                        className={`p-2 rounded-xl text-left transition-all border flex items-center gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-[#152336] border-gold-500/70 text-white shadow-sm ring-1 ring-gold-500/30'
                            : 'bg-[#0E1522] border-[#1D293B] text-gray-300 hover:bg-[#141E2D]'
                        }`}
                      >
                        <span className="text-base shrink-0">{cat.icon}</span>
                        <span className="text-[11px] font-medium leading-tight line-clamp-2">
                          {cName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-questions chips */}
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                  {langKey === 'en' ? 'Specific Matter / Question' : '2. Тема обращения'}:
                </label>
                <div className="space-y-1">
                  {questionsList.map((q) => {
                    const isSelected = selectedQuestion === q;
                    return (
                      <button
                        type="button"
                        key={q}
                        onClick={() => setSelectedQuestion(q)}
                        className={`w-full text-left p-2 rounded-lg text-xs transition-all border flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-gold-500/15 border-gold-500/60 text-gold-200 font-medium'
                            : 'bg-[#0A101A] border-[#1C2738] text-gray-300 hover:text-white hover:bg-[#121A28]'
                        }`}
                      >
                        <span className="text-[11.5px] leading-snug">{q}</span>
                        {isSelected ? (
                          <Check size={13} className="text-gold-400 shrink-0" />
                        ) : (
                          <ChevronRight size={12} className="text-gray-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    {langKey === 'en' ? 'Your Name' : 'Ваше имя'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={langKey === 'en' ? 'Alexander' : 'Александр'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0E1522] border border-[#223044] text-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-gray-300 mb-1">
                    {langKey === 'en' ? 'Phone or Telegram' : 'Телефон или Telegram'}{' '}
                    <span className="text-gold-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+7 (999) 000-00-00 или @username"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-[#0E1522] border border-[#223044] text-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>

              {/* Custom Details (Optional) */}
              <div>
                <input
                  type="text"
                  placeholder={
                    langKey === 'en'
                      ? 'Additional note or detail (optional)...'
                      : 'Дополнительное примечание или вопрос (необязательно)...'
                  }
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  className="w-full bg-[#0A101A] border border-[#1C2738] text-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-gold-500 placeholder:text-gray-600 transition-colors"
                />
              </div>

              {/* Submit and Telegram Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row gap-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#E5C37A] via-[#C9A45B] to-[#99742B] text-[#070A0F] font-bold text-xs rounded-xl hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>
                    {isSubmitting
                      ? langKey === 'en'
                        ? 'Sending...'
                        : 'Отправка...'
                      : langKey === 'en'
                      ? 'Submit Request'
                      : 'Отправить заявку'}
                  </span>
                </button>

                <a
                  href="https://t.me/VILEVIN_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0E1522] hover:bg-[#152033] text-gold-300 border border-[#23334A] text-xs rounded-xl transition-colors shrink-0"
                >
                  <MessageSquare size={13} />
                  <span>Telegram</span>
                </a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

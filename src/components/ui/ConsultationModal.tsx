'use client';

import React, { useState, useEffect } from 'react';
import { X, Shield, Send, CheckCircle2, Lock } from 'lucide-react';
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

interface ModalVariant {
  id: number;
  name: string;
  subtitle: string;
  container: string;
  accentBar?: string;
  badgeStyle: string;
  titleStyle: string;
  categoryActive: string;
  categoryInactive: string;
  chipActive: string;
  chipInactive: string;
  inputStyle: string;
  noteWrapper: string;
  submitBtn: string;
  footerClass: string;
}

const MODAL_VARIANTS: ModalVariant[] = [
  {
    id: 1,
    name: 'Champagne Reserve',
    subtitle: 'Швейцарский слиток · Теплый обсидиан и 3D-золото',
    container: 'bg-gradient-to-b from-[#0E1524] via-[#090E1A] to-[#05070D] border-2 border-[#DFBA73]/60 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(223,186,115,0.18)] rounded-md',
    accentBar: 'bg-gradient-to-r from-transparent via-[#DFBA73] to-transparent h-[2px]',
    badgeStyle: 'text-[#E5C989] bg-[#DFBA73]/10 border border-[#DFBA73]/30',
    titleStyle: 'text-white font-serif tracking-tight',
    categoryActive: 'bg-[#DFBA73]/20 border-[#DFBA73] text-white shadow-md shadow-[#DFBA73]/10',
    categoryInactive: 'bg-[#0B101D] border-[#1C2840] text-gray-300 hover:border-[#DFBA73]/40 hover:text-white',
    chipActive: 'bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-bold border-[#FFE8A3] shadow-sm',
    chipInactive: 'bg-[#0E1524] text-gray-300 border-[#202E46] hover:border-[#DFBA73]/40 hover:text-white',
    inputStyle: 'bg-[#090E1A] border-[#1E2D44] focus:border-[#DFBA73] text-white placeholder-gray-500',
    noteWrapper: 'bg-[#090E1A] border-[#1E2D44] focus-within:border-[#DFBA73]/70 focus-within:shadow-[0_0_15px_rgba(223,186,115,0.15)]',
    submitBtn: 'bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-bold border border-[#FFE8A3] shadow-[0_4px_25px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-[0.99]',
    footerClass: 'text-gray-400',
  },
  {
    id: 2,
    name: 'Obsidian Frosted Glass',
    subtitle: 'Apple Vision Pro · Ультра-матовое стекло и сапфир',
    container: 'bg-[#0A0E18]/85 backdrop-blur-2xl border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.15)] rounded-lg',
    accentBar: 'bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent h-[1px]',
    badgeStyle: 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30',
    titleStyle: 'text-white font-sans font-semibold tracking-tight',
    categoryActive: 'bg-white/15 border-white/40 text-white shadow-lg backdrop-blur-md',
    categoryInactive: 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white',
    chipActive: 'bg-white text-black font-bold border-white shadow-md',
    chipInactive: 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white',
    inputStyle: 'bg-white/5 border-white/15 focus:border-cyan-400/60 text-white placeholder-gray-400 backdrop-blur-sm',
    noteWrapper: 'bg-white/5 border-white/15 focus-within:border-white/40 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-sm',
    submitBtn: 'bg-gradient-to-r from-gray-100 via-white to-gray-200 text-black font-bold border border-white/80 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:brightness-105 active:scale-[0.99]',
    footerClass: 'text-gray-400',
  },
  {
    id: 3,
    name: 'Diplomatic Seal',
    subtitle: 'Вашингтон & Герб · Двухконтурная золотая рамка',
    container: 'bg-[#090D16] border-2 border-[#DFBA73] outline outline-1 outline-offset-3 outline-[#DFBA73]/40 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_30px_rgba(223,186,115,0.15)] rounded-sm',
    accentBar: 'bg-[#DFBA73] h-[2px]',
    badgeStyle: 'text-[#DFBA73] bg-[#DFBA73]/15 border border-[#DFBA73]/40 uppercase',
    titleStyle: 'text-[#FFF2D4] font-serif tracking-normal uppercase text-center font-bold',
    categoryActive: 'bg-[#181F2E] border-2 border-[#DFBA73] text-[#FFE8B3] shadow-md',
    categoryInactive: 'bg-[#0E1524] border border-[#232F42] text-gray-300 hover:border-[#DFBA73]/50 hover:text-white',
    chipActive: 'bg-[#DFBA73] text-black font-bold border-2 border-[#FFE8A3] shadow-sm',
    chipInactive: 'bg-[#121A2A] text-gray-300 border border-[#26344A] hover:border-[#DFBA73]/40 hover:text-white',
    inputStyle: 'bg-[#0C121E] border border-[#26344A] focus:border-[#DFBA73] text-[#FFF2D4] placeholder-gray-500 rounded-sm',
    noteWrapper: 'bg-[#0C121E] border border-[#26344A] focus-within:border-[#DFBA73] rounded-sm',
    submitBtn: 'bg-[#DFBA73] text-black font-extrabold tracking-wider uppercase border-2 border-[#FFE8A3] shadow-[0_4px_20px_rgba(223,186,115,0.35)] hover:bg-[#EBD096] active:scale-[0.99] rounded-sm',
    footerClass: 'text-[#DFBA73]/80 font-serif',
  },
  {
    id: 4,
    name: 'Wall Street Monolith',
    subtitle: 'Bloomberg Elite · Графитовый монолит с золотой полосой',
    container: 'bg-[#0A0E15] border border-[#222B38] shadow-[0_30px_90px_rgba(0,0,0,0.98),inset_0_1px_0_rgba(255,255,255,0.06)] rounded-none relative overflow-hidden',
    accentBar: 'bg-gradient-to-r from-[#DFBA73] via-[#FFE8B3] to-[#DFBA73] h-[3px]',
    badgeStyle: 'text-[#DFBA73] bg-[#141A24] border border-[#2E3747] font-mono tracking-wider',
    titleStyle: 'text-white font-mono font-bold tracking-tight uppercase',
    categoryActive: 'bg-[#151D2A] border-l-[3px] border-l-[#DFBA73] border-t border-r border-b border-[#2C384C] text-[#FFE8B3] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_2px_8px_rgba(0,0,0,0.4)] font-mono',
    categoryInactive: 'bg-[#0B1017] border border-[#1A2330] text-gray-400 hover:border-[#DFBA73]/50 hover:bg-[#111722] hover:text-white font-mono transition-all',
    chipActive: 'bg-[#DFBA73] text-black font-mono font-bold border border-[#FFE8A3]',
    chipInactive: 'bg-[#111722] text-gray-400 border border-[#222B3A] font-mono hover:border-gray-400 hover:text-white',
    inputStyle: 'bg-[#0E141D] border border-[#202938] focus:border-[#DFBA73] text-white placeholder-gray-600 font-mono rounded-none',
    noteWrapper: 'bg-[#0E141D] border border-[#202938] focus-within:border-[#DFBA73] rounded-none',
    submitBtn: 'bg-gradient-to-r from-[#D4AF37] to-[#B8922C] text-black font-mono font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.99] rounded-none border border-[#FFE8A3]',
    footerClass: 'text-gray-500 font-mono',
  },
  {
    id: 5,
    name: 'Emerald Sovereign',
    subtitle: 'Green Card & Траст · Глубокий малахит с изумрудным неоном',
    container: 'bg-gradient-to-b from-[#031B14] via-[#02140F] to-[#010D09] border-2 border-emerald-500/50 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(16,185,129,0.18)] rounded-md',
    accentBar: 'bg-gradient-to-r from-transparent via-emerald-400 to-transparent h-[2px]',
    badgeStyle: 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/40',
    titleStyle: 'text-emerald-50 font-serif font-bold tracking-tight',
    categoryActive: 'bg-emerald-900/40 border-emerald-400 text-white shadow-md shadow-emerald-950/50',
    categoryInactive: 'bg-[#041D16]/60 border-emerald-900/40 text-emerald-200/80 hover:border-emerald-500/40 hover:text-white',
    chipActive: 'bg-emerald-400 text-black font-bold border-emerald-300 shadow-sm',
    chipInactive: 'bg-[#05251C]/60 text-emerald-200/70 border-emerald-900/50 hover:border-emerald-500/40 hover:text-white',
    inputStyle: 'bg-[#021510] border-emerald-900/60 focus:border-emerald-400 text-emerald-100 placeholder-emerald-800/80',
    noteWrapper: 'bg-[#021510] border-emerald-900/60 focus-within:border-emerald-400/80 focus-within:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
    submitBtn: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-600 text-black font-bold uppercase tracking-wider border border-emerald-200 shadow-[0_4px_25px_rgba(16,185,129,0.35)] hover:brightness-110 active:scale-[0.99]',
    footerClass: 'text-emerald-400/80',
  },
  {
    id: 6,
    name: 'Titanium Centurion',
    subtitle: 'American Express Centurion · Матовый оружейный титан',
    container: 'bg-gradient-to-b from-[#14171E] via-[#0E1117] to-[#0A0C10] border border-gray-400/40 shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.12)] rounded-sm',
    accentBar: 'bg-gradient-to-r from-transparent via-gray-300 to-transparent h-[1px]',
    badgeStyle: 'text-gray-200 bg-gray-800/80 border border-gray-500/40 font-mono tracking-widest',
    titleStyle: 'text-gray-100 font-sans font-semibold tracking-wide uppercase',
    categoryActive: 'bg-gradient-to-r from-gray-700/60 to-gray-800/60 border-gray-300 text-white shadow-md',
    categoryInactive: 'bg-[#12161E] border-gray-700/50 text-gray-300 hover:border-gray-500 hover:text-white',
    chipActive: 'bg-gradient-to-r from-gray-200 to-gray-400 text-black font-bold border-white',
    chipInactive: 'bg-[#12161E] text-gray-400 border-gray-700/50 hover:border-gray-400 hover:text-white',
    inputStyle: 'bg-[#0E1218] border-gray-700 focus:border-gray-300 text-gray-100 placeholder-gray-600 font-sans',
    noteWrapper: 'bg-[#0E1218] border-gray-700 focus-within:border-gray-300 focus-within:shadow-[0_0_15px_rgba(200,200,200,0.15)]',
    submitBtn: 'bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 text-black font-bold uppercase tracking-widest border border-white shadow-[0_4px_25px_rgba(255,255,255,0.15)] hover:brightness-105 active:scale-[0.99]',
    footerClass: 'text-gray-400 font-mono',
  },
  {
    id: 7,
    name: 'Geneva Private Vault',
    subtitle: 'Швейцарский сейф · Массивный безель и банковский металл',
    container: 'bg-[#090C12] border-4 border-[#252E3E] outline outline-1 outline-[#DFBA73]/30 shadow-[0_35px_100px_rgba(0,0,0,0.98),inset_0_2px_4px_rgba(255,255,255,0.06)] rounded-lg',
    accentBar: 'bg-[#DFBA73]/50 h-[2px]',
    badgeStyle: 'text-[#DFBA73] bg-[#141A25] border border-[#DFBA73]/30 font-semibold',
    titleStyle: 'text-[#EAEFF8] font-serif font-bold tracking-tight',
    categoryActive: 'bg-[#161F2E] border-2 border-[#DFBA73] text-white shadow-inner',
    categoryInactive: 'bg-[#0D131C] border border-[#222B3B] text-gray-300 hover:border-[#DFBA73]/40 hover:text-white',
    chipActive: 'bg-[#DFBA73] text-black font-bold border border-[#FFE8A3]',
    chipInactive: 'bg-[#101723] text-gray-300 border border-[#253043] hover:border-[#DFBA73]/30 hover:text-white',
    inputStyle: 'bg-[#080B10] border-2 border-[#20293A] focus:border-[#DFBA73] text-white placeholder-gray-500 rounded-md',
    noteWrapper: 'bg-[#080B10] border-2 border-[#20293A] focus-within:border-[#DFBA73] rounded-md',
    submitBtn: 'bg-gradient-to-r from-[#DFBA73] via-[#E8CD94] to-[#C99C4B] text-black font-extrabold uppercase tracking-wider border-2 border-[#FFF0C2] shadow-[0_4px_20px_rgba(223,186,115,0.3)] hover:brightness-110 active:scale-[0.99] rounded-md',
    footerClass: 'text-gray-400 font-serif',
  },
  {
    id: 8,
    name: 'Cyber-HUD Legal Tech',
    subtitle: 'Высокотехнологичный терминал · Угловые маркеры [ · ]',
    container: 'bg-[#050A12] border border-cyan-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_30px_rgba(6,182,212,0.15)] rounded-none relative',
    accentBar: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 h-[2px]',
    badgeStyle: 'text-cyan-400 bg-cyan-950/40 border border-cyan-500/50 font-mono tracking-widest',
    titleStyle: 'text-cyan-100 font-mono font-bold tracking-tight uppercase',
    categoryActive: 'bg-cyan-950/50 border border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.25)]',
    categoryInactive: 'bg-[#08101E] border border-[#16273E] text-gray-400 hover:border-cyan-500/50 hover:text-cyan-200',
    chipActive: 'bg-cyan-400 text-black font-mono font-bold border border-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.4)]',
    chipInactive: 'bg-[#091322] text-gray-400 border border-[#1A2D46] font-mono hover:border-cyan-400/40 hover:text-white',
    inputStyle: 'bg-[#050B14] border border-cyan-900/60 focus:border-cyan-400 text-cyan-100 placeholder-cyan-800/80 font-mono rounded-none',
    noteWrapper: 'bg-[#050B14] border border-cyan-900/60 focus-within:border-cyan-400 rounded-none',
    submitBtn: 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-black font-mono font-bold uppercase tracking-widest border border-cyan-200 shadow-[0_4px_25px_rgba(6,182,212,0.4)] hover:brightness-110 active:scale-[0.99] rounded-none',
    footerClass: 'text-cyan-500/80 font-mono',
  },
  {
    id: 9,
    name: 'London Chambers',
    subtitle: 'Королевский сапфир · Дипломатический индиго и золото',
    container: 'bg-gradient-to-b from-[#0B152A] via-[#070D1C] to-[#040812] border-2 border-[#385382] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(56,83,130,0.2)] rounded-md',
    accentBar: 'bg-gradient-to-r from-[#DFBA73] via-sky-300 to-[#DFBA73] h-[2px]',
    badgeStyle: 'text-amber-300 bg-blue-950/60 border border-amber-400/30',
    titleStyle: 'text-amber-100 font-serif font-bold tracking-tight',
    categoryActive: 'bg-[#182847] border border-amber-300 text-white shadow-md',
    categoryInactive: 'bg-[#0B1426] border border-[#1D2F4F] text-gray-300 hover:border-amber-400/40 hover:text-white',
    chipActive: 'bg-gradient-to-r from-[#DFBA73] to-[#C2933C] text-black font-bold border border-[#FFE8A3]',
    chipInactive: 'bg-[#0E1930] text-gray-300 border border-[#23375B] hover:border-amber-400/30 hover:text-white',
    inputStyle: 'bg-[#070E1C] border border-[#203456] focus:border-amber-300 text-amber-50 placeholder-blue-300/40',
    noteWrapper: 'bg-[#070E1C] border border-[#203456] focus-within:border-amber-300 focus-within:shadow-[0_0_15px_rgba(223,186,115,0.15)]',
    submitBtn: 'bg-gradient-to-r from-[#DFBA73] via-[#F0D597] to-[#D4AF37] text-black font-bold uppercase tracking-wider border border-[#FFF2CD] shadow-[0_4px_25px_rgba(223,186,115,0.35)] hover:brightness-110 active:scale-[0.99]',
    footerClass: 'text-blue-300/80 font-serif',
  },
  {
    id: 10,
    name: 'Art Deco Manhattan',
    subtitle: 'Манхэттен 1920 · Золотая геометрия Park Avenue',
    container: 'bg-[#0A0D14] border-2 border-[#C9A050] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_40px_rgba(201,160,80,0.2)] rounded-sm relative',
    accentBar: 'bg-gradient-to-r from-transparent via-[#C9A050] to-transparent h-[3px]',
    badgeStyle: 'text-[#FFE8B3] bg-[#211A0E] border border-[#C9A050]/60 uppercase tracking-widest font-serif',
    titleStyle: 'text-[#FFF5DC] font-serif font-bold tracking-wider uppercase text-center',
    categoryActive: 'bg-[#21190D] border-2 border-[#C9A050] text-[#FFF2D4] shadow-md',
    categoryInactive: 'bg-[#0F1420] border border-[#282116] text-gray-300 hover:border-[#C9A050]/50 hover:text-white',
    chipActive: 'bg-[#C9A050] text-black font-bold border-2 border-[#FFE8A3] uppercase tracking-wider text-[10px]',
    chipInactive: 'bg-[#121724] text-gray-300 border border-[#302617] hover:border-[#C9A050]/40 hover:text-white',
    inputStyle: 'bg-[#080B12] border border-[#3D301C] focus:border-[#C9A050] text-[#FFF2D4] placeholder-gray-500 rounded-sm font-serif',
    noteWrapper: 'bg-[#080B12] border border-[#3D301C] focus-within:border-[#C9A050] rounded-sm',
    submitBtn: 'bg-gradient-to-r from-[#D8B263] via-[#FFE2A4] to-[#C2933C] text-black font-serif font-black uppercase tracking-widest border border-[#FFF2CD] shadow-[0_4px_25px_rgba(201,160,80,0.35)] hover:brightness-110 active:scale-[0.99] rounded-sm',
    footerClass: 'text-[#C9A050]/80 font-serif',
  },
];

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
  // Locked to Variant 7: Geneva Private Vault
  const activeVariantId = 7;

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
      ru: ['EB-1A / EB-2 NIW', 'Интервью USCIS', 'Аудит N-400', 'Смена статуса / Отказ'],
      en: ['EB-1A / EB-2 NIW', 'USCIS Interview', 'N-400 Audit', 'Status Change / Denial'],
      uk: ['EB-1A / EB-2 NIW', "Інтерв'ю USCIS", 'Аудит N-400', 'Зміна статусу / Відмова'],
      es: ['EB-1A / EB-2 NIW', 'Entrevista USCIS', 'Auditoría N-400', 'Cambio de estatus / Rechazo'],
      it: ['EB-1A / EB-2 NIW', 'Colloquio USCIS', 'Audit N-400', 'Cambio status / Rigetto'],
      fr: ['EB-1A / EB-2 NIW', 'Entretien USCIS', 'Audit N-400', 'Changement de statut / Refus'],
    },
    business: {
      ru: ['Компания в США / ОАЭ', 'Due Diligence', 'Международные договоры', 'Банковский счет'],
      en: ['US / UAE Company', 'Due Diligence', 'Cross-Border Contracts', 'Corporate Bank Account'],
      uk: ['Компанія в США / ОАЕ', 'Due Diligence', 'Міжнародні договори', 'Банківський рахунок'],
      es: ['Empresa en EE.UU. / EAU', 'Due Diligence', 'Contratos internacionales', 'Cuenta corporativa'],
      it: ['Società in USA / EAU', 'Due Diligence', 'Contratti transfrontalieri', 'Conto bancario'],
      fr: ['Société USA / EAU', 'Due Diligence', 'Contrats internationaux', 'Compte bancaire pro'],
    },
    disputes: {
      ru: ['Международный арбитраж', 'Взыскание долгов', 'Суд в США / ЕС', 'Досудебная претензия'],
      en: ['International Arbitration', 'Debt Recovery', 'US / EU Litigation', 'Pre-Trial Claim'],
      uk: ['Міжнародний арбітраж', 'Стягнення боргів', 'Суд у США / ЄС', 'Досудова претензія'],
      es: ['Arbitraje internacional', 'Cobro de deudas', 'Litigios en EE.UU. / UE', 'Reclamación prejudicial'],
      it: ['Arbitrato internazionale', 'Recupero crediti', 'Contenzioso USA / UE', 'Reclamo stragiudiziale'],
      fr: ['Arbitrage international', 'Recouvrement créances', 'Contentieux USA / UE', 'Mise en demeure'],
    },
    wealth: {
      ru: ['Безотзывные трасты', 'Защита от кредиторов', 'Семейный капитал', 'Налоговая защита'],
      en: ['Irrevocable Trusts', 'Asset Protection', 'Family Capital', 'Tax Shielding'],
      uk: ['Безвідкличні трасти', 'Захист від кредиторів', 'Сімейний капітал', 'Податковий захист'],
      es: ['Fideicomisos irrevocables', 'Protección de activos', 'Capital familiar', 'Blindaje fiscal'],
      it: ['Trust irrevocabili', 'Protezione patrimoniale', 'Capitale familiare', 'Protezione fiscale'],
      fr: ['Trusts irrévocables', "Protection d'actifs", 'Capital familial', 'Optimisation fiscale'],
    },
    other: {
      ru: ['Индивидуальный кейс', 'ВНЖ / Резидентство', 'Налоговый консалтинг', 'Срочный аудит'],
      en: ['Custom Case', 'Residency / Relocation', 'Tax & Compliance', 'Urgent Legal Audit'],
      uk: ['Індивідуальний кейс', 'ВНЖ / Резидентство', 'Податковий консалтинг', 'Терміновий аудит'],
      es: ['Caso personalizado', 'Residencia / Visado', 'Consultoría fiscal', 'Auditoría urgente'],
      it: ['Caso personalizzato', 'Residenza / Visto', 'Consulenza fiscale', 'Audit urgente'],
      fr: ['Dossier sur-mesure', 'Résidence / Titre de séjour', 'Conseil fiscal', 'Audit urgent'],
    },
  };

  const categoriesList = [
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
      icon: '🛡',
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
  React.useEffect(() => {
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
  const variant = MODAL_VARIANTS.find(v => v.id === activeVariantId) || MODAL_VARIANTS[0];

  const handleCatSelect = (cat: typeof categoriesList[0]) => {
    setSelectedCat(cat.id);
    setSelectedChip(cat.chips[0]);
  };

  const tgBtnText =
    currentLang === 'en'
      ? 'Telegram Chat'
      : currentLang === 'uk'
      ? 'Чат у Telegram'
      : currentLang === 'es'
      ? 'Chat en Telegram'
      : currentLang === 'it'
      ? 'Chat Telegram'
      : currentLang === 'fr'
      ? 'Chat Telegram'
      : 'Чат в Telegram';

  const categoryStepLabel =
    currentLang === 'en'
      ? '1. Select inquiry category:'
      : currentLang === 'uk'
      ? '1. Оберіть категорію питання:'
      : currentLang === 'es'
      ? '1. Seleccione categoría:'
      : currentLang === 'it'
      ? '1. Selezioni categoria:'
      : currentLang === 'fr'
      ? '1. Choisissez la catégorie :'
      : '1. Выберите категорию вопроса:';

  const topicStepLabel =
    currentLang === 'en'
      ? '2. Select topic / question:'
      : currentLang === 'uk'
      ? '2. Оберіть тему / завдання:'
      : currentLang === 'es'
      ? '2. Especifique el asunto:'
      : currentLang === 'it'
      ? '2. Specifichi l’argomento:'
      : currentLang === 'fr'
      ? '2. Précisez le sujet :'
      : '2. Конкретизируйте задачу:';

  const footerSecurity =
    currentLang === 'en'
      ? 'Rule 1.6 Confidentiality · 256-bit Encrypted Protocol'
      : currentLang === 'uk'
      ? 'Конфіденційність Rule 1.6 · Протокол 256-біт шифрування'
      : currentLang === 'es'
      ? 'Confidencialidad Rule 1.6 · Protocolo cifrado de 256 bits'
      : currentLang === 'it'
      ? 'Riservatezza Rule 1.6 · Protocollo crittografato a 256 bit'
      : currentLang === 'fr'
      ? 'Confidentialité Rule 1.6 · Protocole chiffré 256 bits'
      : 'Конфиденциальность Rule 1.6 · Протокол 256-битного шифрования';

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
      `🎨 *Дизайн:* Вариант #${variant.id} (${variant.name})
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

      // Also attempt background post to /api/leads if server is online
      try {
        fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            source: 'Compact Modal',
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
    } catch (err) {
      // Even if network glitches, do not block the user
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[200] min-h-[100dvh] flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-[460px] m-auto p-3.5 sm:p-5 max-h-[96dvh] overflow-y-auto [&::-webkit-scrollbar]:hidden ${variant.container}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Optional top accent bar */}
        {variant.accentBar && (
          <div className={`absolute top-0 left-0 right-0 ${variant.accentBar}`} />
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer z-30"
          aria-label="Закрыть"
        >
          <X size={15} />
        </button>

        {isSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-900/30">
              <CheckCircle2 size={28} />
            </div>
            <h3 className="text-lg font-serif text-white font-bold">
              {t('modal', 'successTitle')}
            </h3>
            <p className="text-gray-300 text-xs max-w-xs mx-auto font-light leading-relaxed">
              {t('modal', 'successDesc')}
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className={`px-6 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider cursor-pointer ${variant.submitBtn}`}
              >
                {t('modal', 'successBtn')}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-1.5 sm:space-y-2">
            
            {/* Modal Header */}
            <div className="pr-6">
              <div className={`inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded text-[8.5px] font-mono font-semibold uppercase tracking-widest mb-0.5 ${variant.badgeStyle}`}>
                <Shield size={9} />
                <span>{t('modal', 'badge')}</span>
              </div>
              <h2 className={`text-base sm:text-lg font-bold tracking-tight leading-snug ${variant.titleStyle}`}>
                {t('modal', 'title')}
              </h2>
            </div>

            {/* 1. Category Selection - Sleek & Ultra-compact */}
            <div className="space-y-1">
              <label className="text-[9.5px] font-mono uppercase tracking-wider text-gray-400 block font-semibold">
                {categoryStepLabel}
              </label>
              <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
                {categoriesList.map((cat, idx) => {
                  const isSelected = selectedCat === cat.id;
                  const isLast = idx === categoriesList.length - 1;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCatSelect(cat)}
                      className={`h-[28px] sm:h-[30px] px-2 border text-left flex items-center gap-1.5 transition-all cursor-pointer select-none active:scale-[0.99] rounded ${isLast ? 'col-span-2' : ''} ${
                        isSelected ? variant.categoryActive : variant.categoryInactive
                      }`}
                    >
                      {cat.id === 'usa' ? (
                        <LuxuryUsaFlag size="xs" />
                      ) : (
                        <span className="text-xs shrink-0 leading-none">{cat.icon}</span>
                      )}
                      <span className="text-[10.5px] sm:text-[11px] font-semibold leading-none tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                        {cat.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Dynamic Sub-question Chips */}
            <div className="space-y-0.5">
              <label className="text-[9.5px] font-mono uppercase tracking-wider text-gray-400 block font-semibold">
                {topicStepLabel}
              </label>
              <div className="flex flex-wrap gap-1">
                {currentCategory.chips.map((chip) => {
                  const isChipSelected = selectedChip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setSelectedChip(chip)}
                      className={`px-2 py-0.5 border text-[10px] sm:text-[10.5px] font-medium transition-all cursor-pointer rounded-md ${
                        isChipSelected ? variant.chipActive : variant.chipInactive
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="space-y-1.5 pt-0.5">
              {error && (
                <div className="p-1.5 rounded-md bg-red-950/70 border border-red-500/50 text-red-200 text-xs">
                  {error}
                </div>
              )}

              {/* Contact field */}
              <div>
                <label className="text-[9.5px] font-mono uppercase tracking-wider text-gray-400 block mb-0.5 font-semibold">
                  {t('modal', 'contactLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder={t('modal', 'contactPlaceholder')}
                  className={`w-full px-2.5 py-1.5 rounded-md text-[11px] outline-none transition-colors border ${variant.inputStyle}`}
                />
              </div>

              {/* Note / Circumstances */}
              <div className={`rounded-md p-2 transition-all border ${variant.noteWrapper}`}>
                <div className="flex items-center justify-between pb-1 mb-1 border-b border-white/10">
                  <label className="text-[9px] font-mono uppercase tracking-wider text-gold-300 font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    {t('modal', 'noteLabel')}
                  </label>
                  <span className="text-[8.5px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock size={8.5} /> Confidential
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('modal', 'notePlaceholder')}
                  className="w-full bg-transparent text-white placeholder-gray-500 text-[11px] outline-none resize-none leading-snug"
                />
              </div>

              {/* Action Button */}
              <div className="pt-0.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-4 rounded-md text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 transition-all font-bold ${variant.submitBtn}`}
                >
                  <Send size={12} />
                  <span>{isSubmitting ? t('modal', 'submitting') : t('modal', 'submitBtn')}</span>
                </button>
              </div>

              <p className={`text-[8.5px] text-center font-mono pt-0.5 ${variant.footerClass}`}>
                {footerSecurity}
              </p>
            </form>

          </div>
        )}
      </div>
    </div>
  );
};

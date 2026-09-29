'use client';

import React, { useState, useEffect } from 'react';
import { Globe2, ShieldCheck, Award, Lock, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { useSiteTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export interface TabletVariantConfig {
  id: number;
  name: string;
  tag: string;
  desc: string;
}

export const TABLET_VARIANTS: TabletVariantConfig[] = [
  { id: 1, name: '1. Швейцарский слиток', tag: 'Слиток', desc: 'Золотая рамка-фаска, внутреннее золотое свечение, золотой слиток-бейдж' },
  { id: 2, name: '2. Монолит Уолл-Стрит', tag: 'Монолит', desc: 'Абсолютный графит, золотой hairline-бордер сверху, стиль Bloomberg' },
  { id: 3, name: '3. Дипломатический герб', tag: 'Герб', desc: 'Гербовые золотые уголки, двухконтурная рамка, сургучный медальон' },
  { id: 4, name: '4. Матовое стекло Vision', tag: 'Стекло', desc: 'Backdrop-blur 24px, стеклянные микро-грани, мягкие градиентные блики' },
  { id: 5, name: '5. Изумрудный траст', tag: 'Изумруд', desc: 'Стиль Green Card: глубокий малахит #041912, изумрудный неон, пульс' },
  { id: 6, name: '6. Архитектурная 3D-фаска', tag: '3D-Фаска', desc: 'Объемная рельефная фаска, скошенные грани, двойные металлические тени' },
  { id: 7, name: '7. Юридический фолиант', tag: 'Фолиант', desc: 'Ультра-чистая швейцарская верстка, водяной римский знак на фоне' },
  { id: 8, name: '8. Кибер-обсидиан HUD', tag: 'Кибер', desc: 'Лазерные угловые маркеры, моноширинный код юрисдикций, HUD-интерфейс' },
  { id: 9, name: '9. Сапфир & Палаты', tag: 'Сапфир', desc: 'Глубокий индиго-сапфир королевских палат, британский арбитраж' },
  { id: 10, name: '10. Черный титан Centurion', tag: 'Титан', desc: 'Фактура карты Centurion, матовый оружейный титан, платиново-золотой срез' },
];

export const AboutSection: React.FC = () => {
  const { currentTheme } = useSiteTheme();
  const { t } = useLanguage();
  const [selectedVariant, setSelectedVariant] = useState<number>(10);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vilevin_tablet_variant');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 10) setSelectedVariant(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSelectVariant = (id: number) => {
    setSelectedVariant(id);
    try {
      localStorage.setItem('vilevin_tablet_variant', id.toString());
    } catch {
      // ignore
    }
  };

  const pillars = [
    {
      roman: 'I',
      num: '01',
      code: 'USCIS · 15Y NY',
      hudTag: 'FED-BAR-15Y',
      icon: Award,
      title: t('about', 'p1Title'),
      desc: t('about', 'p1Desc'),
      note: t('about', 'p1Note'),
    },
    {
      roman: 'II',
      num: '02',
      code: 'RULE 1.6 · PRIVILEGE',
      hudTag: 'PRIVILEGE-SEC',
      icon: Lock,
      title: t('about', 'p2Title'),
      desc: t('about', 'p2Desc'),
      note: t('about', 'p2Note'),
    },
    {
      roman: 'III',
      num: '03',
      code: 'DELAWARE · UAE · EU',
      hudTag: 'SYNCHRO-HUB',
      icon: Globe2,
      title: t('about', 'p3Title'),
      desc: t('about', 'p3Desc'),
      note: t('about', 'p3Note'),
    },
    {
      roman: 'IV',
      num: '04',
      code: 'ZERO-REJECT · ACT',
      hudTag: 'PRE-AUDIT-ACT',
      icon: ShieldCheck,
      title: t('about', 'p4Title'),
      desc: t('about', 'p4Desc'),
      note: t('about', 'p4Note'),
    },
  ];

  // Render individual card based on selected variant
  const renderCard = (p: typeof pillars[0], variantId: number) => {
    const Icon = p.icon;

    switch (variantId) {
      // ==========================================
      // 1. ШВЕЙЦАРСКИЙ СЛИТОК (Swiss Gold Ingot)
      // ==========================================
      case 1:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-gradient-to-b from-[#0A101D] to-[#060A14] border border-[#D4AF37]/40 shadow-[inset_0_1px_2px_rgba(243,226,184,0.35),0_8px_24px_rgba(0,0,0,0.7)] transition-all duration-200 ease-out space-y-2.5 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-500/10 to-transparent pointer-events-none rounded-bl-full" />
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-[4px] bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-extrabold font-mono text-[10.5px] tracking-wider shadow-sm">
                  {p.roman}
                </span>
                <h4 className="text-xs sm:text-[13px] font-medium text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-[#0F1728] border border-gold-500/30 flex items-center justify-center text-gold-300 transition-colors shrink-0">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed relative z-10">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 2. МОНОЛИТ УОЛЛ-СТРИТ (Wall Street Monolith)
      // ==========================================
      case 2:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-[#070B13] border border-[#1E293B] border-t-2 border-t-[#D4AF37] transition-all duration-200 ease-out space-y-2.5 group shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-gold-400 font-mono font-bold text-xs tracking-wider">
                  [{p.roman}]
                </span>
                <h4 className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-gold-300 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#0F172A] border border-[#23334D] text-[9px] font-mono text-gold-400">
                {p.num}
              </span>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 3. ДИПЛОМАТИЧЕСКИЙ ГЕРБ (Diplomatic Seal & Crest)
      // ==========================================
      case 3:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-[#070A12] border border-[#C5A262]/40 ring-1 ring-gold-500/10 shadow-lg transition-all duration-200 ease-out space-y-2.5 group relative"
          >
            {/* Corner heraldic brackets */}
            <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-gold-400/70" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-gold-400/70" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-md border border-gold-400/70 bg-gradient-to-b from-[#1E170A] to-[#0A0D15] flex items-center justify-center font-serif text-gold-300 text-xs font-bold shadow-inner">
                  {p.roman}
                </div>
                <h4 className="text-xs sm:text-[13px] font-medium text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-[#121927] border border-[#2B3950] flex items-center justify-center text-gold-300">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-[#1C273C] flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/80">
              <Shield size={10} className="text-gold-400" />
              <span>{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 4. МАТОВОЕ СТЕКЛО (Executive Frosted Glass)
      // ==========================================
      case 4:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md backdrop-blur-2xl bg-white/[0.04] border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all duration-200 ease-out space-y-2.5 group relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md text-gold-300 text-[10.5px] font-semibold border border-white/15">
                  § {p.roman}
                </span>
                <h4 className="text-xs sm:text-[13px] font-medium text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-white/10 border border-white/20 flex items-center justify-center text-gold-300 transition-colors shrink-0">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-gray-200/90 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 5. ИЗУМРУДНЫЙ ТРАСТ (Emerald Green Card & Trust)
      // ==========================================
      case 5:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-gradient-to-b from-[#041912] via-[#03130D] to-[#020D09] border border-[#10B981]/40 shadow-[0_4px_20px_rgba(6,95,70,0.25)] transition-all duration-200 ease-out space-y-2.5 group relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#064E3B] border border-[#10B981]/60 text-emerald-200 font-bold font-mono text-[10.5px] shadow-sm">
                  {p.roman}
                </span>
                <h4 className="text-xs sm:text-[13px] font-medium text-emerald-100 group-hover:text-white transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-[#063321] border border-[#10B981]/50 flex items-center justify-center text-emerald-300 transition-colors shrink-0">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-emerald-100/80 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 6. АРХИТЕКТУРНАЯ 3D-ФАСКА (Prestige Bevel)
      // ==========================================
      case 6:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-[#090F1C] border border-[#2B3B54] shadow-[inset_0_2px_1px_rgba(255,255,255,0.12),0_10px_25px_rgba(0,0,0,0.8),inset_0_-2px_4px_rgba(0,0,0,0.6)] transition-all duration-200 ease-out space-y-2.5 group relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-gradient-to-b from-[#1C273D] to-[#0D1524] border border-[#3E5275] flex items-center justify-center font-serif text-gold-300 text-xs font-bold shadow-sm">
                  {p.roman}
                </span>
                <h4 className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-[#131E33] border border-[#304566] flex items-center justify-center text-gold-300 shadow-inner shrink-0">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 7. ЮРИДИЧЕСКИЙ ФОЛИАНТ (Minimalist Folio)
      // ==========================================
      case 7:
        return (
          <div
            key={p.num}
            className="p-4 rounded-r-md bg-[#060913]/95 border-l-2 border-l-[#D4AF37] border-y border-r border-[#151F30] transition-all duration-200 ease-out space-y-2 group relative overflow-hidden shadow-lg"
          >
            {/* Watermark Roman Numeral */}
            <span className="absolute right-2 bottom-0 text-6xl font-serif font-black text-white/[0.03] select-none pointer-events-none transition-colors">
              {p.roman}
            </span>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-gold-400 font-bold text-xs tracking-wider">
                  #{p.roman}.
                </span>
                <h4 className="text-xs sm:text-[13px] font-serif font-bold text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="text-gold-400/70 group-hover:text-gold-300 transition-colors">
                <Icon size={13} />
              </div>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed relative z-10">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-[#131C2D] flex items-center gap-1.5 text-[9.5px] font-mono text-gold-400/80 relative z-10">
              <span className="w-1 h-1 rounded-full bg-gold-400" />
              <span>{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 8. КИБЕР-ОБСИДИАН HUD (Cyber Obsidian Matrix)
      // ==========================================
      case 8:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-[#04070F] border border-[#1A2E4C] shadow-md transition-all duration-200 ease-out space-y-2 group relative"
          >
            {/* Tech HUD Corner Brackets */}
            <span className="absolute top-1 left-1 text-[8px] font-mono text-gold-500/60 leading-none">┌</span>
            <span className="absolute top-1 right-1 text-[8px] font-mono text-gold-500/60 leading-none">┐</span>
            <span className="absolute bottom-1 left-1 text-[8px] font-mono text-gold-500/60 leading-none">└</span>
            <span className="absolute bottom-1 right-1 text-[8px] font-mono text-gold-500/60 leading-none">┘</span>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-gold-500/10 border border-gold-500/30 text-gold-300 font-mono text-[10px] font-bold">
                  {p.hudTag}
                </span>
                <h4 className="text-xs sm:text-[13px] font-mono font-medium text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-5 h-5 rounded bg-[#091120] border border-[#213554] flex items-center justify-center text-cyan-300 group-hover:text-gold-300 shrink-0">
                <Icon size={11} />
              </div>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-[#132238] flex items-center justify-between text-[9px] font-mono text-gray-400">
              <span className="text-gold-400/90 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {p.note}
              </span>
              <span className="text-gray-400 font-mono">FIDELITY 99.8%</span>
            </div>
          </div>
        );

      // ==========================================
      // 9. САПФИР & ПАЛАТЫ (Royal Navy & Sapphire)
      // ==========================================
      case 9:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-gradient-to-br from-[#091428] via-[#060D1A] to-[#040810] border border-[#1E3A8A]/50 shadow-[0_4px_22px_rgba(30,58,138,0.25)] transition-all duration-200 ease-out space-y-2.5 group relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-md bg-[#1E3A8A]/40 border border-[#3B82F6]/60 flex items-center justify-center font-serif text-blue-200 text-xs font-bold shadow-sm">
                  {p.roman}
                </div>
                <h4 className="text-xs sm:text-[13px] font-medium text-white group-hover:text-blue-100 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-[#0F2042] border border-[#2B4E8C] flex items-center justify-center text-blue-300 group-hover:text-gold-300 transition-colors shrink-0">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-blue-100/80 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );

      // ==========================================
      // 10. ЧЕРНЫЙ ТИТАН CENTURION (Black Titanium)
      // ==========================================
      case 10:
      default:
        return (
          <div
            key={p.num}
            className="p-4 rounded-md bg-gradient-to-b from-[#101520] to-[#090D15] border border-[#2B3950] shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_10px_30px_rgba(0,0,0,0.85)] transition-all duration-200 ease-out space-y-2.5 group relative"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#182234] border border-[#3A4E6E] text-gray-200 font-mono font-bold text-[10.5px] shadow-sm tracking-wider">
                  {p.roman}
                </span>
                <h4 className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-gold-200 transition-colors leading-snug">
                  {p.title}
                </h4>
              </div>
              <div className="w-6 h-6 rounded-md bg-[#162032] border border-[#304462] flex items-center justify-center text-gold-400 transition-colors shrink-0">
                <Icon size={12} />
              </div>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-relaxed">
              {p.desc}
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center gap-1.5 text-[9.5px] font-mono text-gold-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              <span className="truncate">{p.note}</span>
            </div>
          </div>
        );
    }
  };

  const activeTablet = TABLET_VARIANTS.find((v) => v.id === selectedVariant) || TABLET_VARIANTS[0];

  return (
    <section className="relative bg-[#050811] py-10 lg:py-14 border-b border-[#1A2538] overflow-hidden" id="about">
      {/* Background Transnational Map — natural scale across full section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <img
          src="/images/user-transnational-bg.jpg"
          alt="Transnational Legal Matrix"
          className="w-full h-full object-cover object-[70%_center] lg:object-[65%_center] opacity-80 contrast-[1.06] brightness-[1.02]"
        />
        {/* Soft atmospheric gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050811] via-[#050811]/92 via-40% to-[#050811]/20 lg:to-transparent" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#050811] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#050811] to-transparent" />
      </div>

      {/* Dynamic ambient gold glow */}
      <div 
        className="absolute top-1/2 right-1/4 w-[350px] h-[350px] blur-[130px] pointer-events-none opacity-15"
        style={{
          background: `radial-gradient(circle, ${currentTheme.accentGold} 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading, Lead & Compact 2x2 Cards */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif text-white font-bold tracking-tight leading-tight">
                {t('about', 'title1')}{' '}
                <span className="font-normal italic text-[#FFE29A] drop-shadow-[0_2px_10px_rgba(255,226,154,0.25)]">
                  {t('about', 'title2')}
                </span>
              </h2>

              <p className="mt-2 text-xs sm:text-[13.5px] text-gray-300 font-light leading-relaxed max-w-2xl">
                {t('about', 'desc')}
              </p>
            </div>

            {/* Dynamic 2x2 Cards Grid rendering selected variation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {pillars.map((p) => renderCard(p, selectedVariant))}
            </div>

            <div className="pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-[11.5px] font-mono text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider group"
              >
                <span>{t('about', 'linkMore')}</span>
                <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Natural open viewport for Transnational Map hubs */}
          <div className="lg:col-span-4 hidden lg:block min-h-[360px] pointer-events-none" />

        </div>
      </div>
    </section>
  );
};

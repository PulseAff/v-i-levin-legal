'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { Menu, X, ChevronDown, Check, Globe, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useSiteTheme, THEMES } from '@/context/ThemeContext';
import { useLanguage, LANGUAGES, LanguageCode } from '@/context/LanguageContext';
import { useConsultation } from '@/context/ConsultationContext';

export { LuxuryUsaFlag, LuxuryUsaFlag as UsaFlagSvg };
const UsaFlagSvg = LuxuryUsaFlag;

export interface NavItem {
  name: string;
  href: string;
  isUSA?: boolean;
  badge?: string;
  dropdown?: {
    title: string;
    desc: string;
    href: string;
    tag?: string;
  }[];
}

export interface SegmentVariantConfig {
  id: number;
  name: string;
  shortName: string;
  theme: string;
  description: string;
}

export const SEGMENT_VARIANTS: SegmentVariantConfig[] = [
  {
    id: 1,
    name: '5.1: «Champagne Gold (Шампань и матовое золото)»',
    shortName: '5.1 Шампань',
    theme: 'Золото шампань, мягкая 3D-фаска, тактильная выпуклая кнопка',
    description: 'Теплый кремово-золотой градиент, внутренняя глубина, идеальный тактильный объем',
  },
  {
    id: 2,
    name: '5.2: «Platinum Reserve (Швейцарская платина / Холодный хром)»',
    shortName: '5.2 Платина',
    theme: 'Цюрих/Женева: полированная платина, холодное серебро, строгий хром',
    description: 'Предельная строгость банковских трастов, белое холодное свечение и хром',
  },
  {
    id: 3,
    name: '5.3: «Midnight Sapphire & Gold (Вашингтон & Уолл-стрит)»',
    shortName: '5.3 Сапфир',
    theme: 'Глубокий дипломатический индиго с золотым кантом и гербовым флагом',
    description: 'Стиль федеральных ведомств США: сапфировый градиент с чеканкой золотом',
  },
  {
    id: 4,
    name: '5.4: «Imperial Emerald (Изумруд и трастовый капитал)»',
    shortName: '5.4 Изумруд',
    theme: 'Темный малахит, благородный английский изумруд и шампанское',
    description: 'Британские юридические палаты, ассоциация с защитой и преумножением активов',
  },
  {
    id: 5,
    name: '5.5: «Frosted Glass Island (Ультра-матовое стекло / Apple Vision)»',
    shortName: '5.5 Матовое стекло',
    theme: 'Полупрозрачная стеклянная капсула, преломление света, золотой кант',
    description: 'Парящая призма из матового стекла с глубоким размытием фона и рельефом',
  },
  {
    id: 6,
    name: '5.6: «Titanium Carbon (Карбоновый титан с фрезеровкой)»',
    shortName: '5.6 Титан',
    theme: 'Оружейный титан, прецизионные тактильные клавиши с физическим микро-кликом',
    description: 'Высокотехнологичный монолитный карбон с рельефной титановой кнопкой США',
  },
  {
    id: 7,
    name: '5.7: «Dual-Tone Solid Inset (Контрастная чеканка во весь блок)»',
    shortName: '5.7 Dual-Tone',
    theme: 'Темный матовый сегмент + полностью золотой цельный монолитный блок США',
    description: 'Максимальный визуальный фокус: вкладка США занимает всю высоту сегмента как слиток золота',
  },
  {
    id: 8,
    name: '5.8: «Ultra-Compact Precision (Ювелирный микро-сегмент 52px)»',
    shortName: '5.8 Компакт 52px',
    theme: 'Сверхкомпактная высота 52px, филигранные отступы, легкость',
    description: 'Утонченный аккуратный профиль, не загромождает экран, максимальный воздух',
  },
  {
    id: 9,
    name: '5.9: «Interactive Mega-Segment (Сегмент с интерактивным хабом США)»',
    shortName: '5.9 Мега-сегмент',
    theme: 'Выпуклая клавиша США при наведении разворачивает 3D-карточку программ',
    description: 'Быстрый переход к экзамену на гражданство, EB-1A и стресс-интервью прямо из капсулы',
  },
  {
    id: 10,
    name: '5.10: «Emerald Green Card & Gold (Изумруд и золото)»',
    shortName: '5.10 Изумруд Green Card',
    theme: 'Глубокий благородный изумруд Green Card с золотой окантовкой и флагом США',
    description: 'Фирменный стиль флагманской американской практики и грин-карт',
  },
];

export const Header: React.FC = () => {
  const { activeThemeId, setThemeId, currentTheme: activeThemeConfig } = useSiteTheme();
  const activeVariantId = activeThemeId;
  const { currentLang, setLanguage, t } = useLanguage();
  const { openConsultation } = useConsultation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [usaDropdownOpen, setUsaDropdownOpen] = useState(false);
  const [showSwitcher, setShowSwitcher] = useState(false);

  const langRef = useRef<HTMLDivElement>(null);
  const usaDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const selectVariant = (id: number) => {
    setThemeId(id);
  };

  const selectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  const translatedNavItems: NavItem[] = [
    { name: t('nav', 'services'), href: '/services' },
    {
      name: t('nav', 'usaGreenCard'),
      href: '/usa',
      isUSA: true,
      badge: '15Y NY',
      dropdown: [
        {
          title: currentLang === 'en' ? 'Citizenship Exam Preparation' : 'Подготовка к экзамену на гражданство',
          desc: currentLang === 'en' ? '100 USCIS history & civics questions, English speech training' : '100 вопросов по истории и государственному устройству США, языковой тренинг',
          href: '/usa/immigration-test',
          tag: currentLang === 'en' ? 'Exam' : 'Экзамен',
        },
        {
          title: currentLang === 'en' ? 'Talent Visas (EB-1A / EB-2 NIW)' : 'Визы талантов (EB-1A / EB-2 NIW)',
          desc: currentLang === 'en' ? 'Green Card without employer sponsorship for professionals' : 'Оформление грин-карты без американского работодателя для профессионалов',
          href: '/usa/green-card',
          tag: 'EB-1A',
        },
        {
          title: currentLang === 'en' ? 'Consular Interview & Security' : 'Консульское интервью и безопасность',
          desc: currentLang === 'en' ? 'Background checks, cross-questioning simulations' : 'Стресс-интервью, проверка биографии и алгоритмы защиты статуса',
          href: '/usa/interview',
          tag: currentLang === 'en' ? 'Consul' : 'Консул',
        },
        {
          title: currentLang === 'en' ? 'Corporate & Federal Tax Law' : 'Корпоративное и налоговое право',
          desc: currentLang === 'en' ? 'Delaware & Wyoming registration, asset structuring' : 'Регистрация Delaware, Wyoming, структурирование владения',
          href: '/services/representation',
          tag: currentLang === 'en' ? 'Business' : 'Бизнес',
        },
      ],
    },
    { name: t('nav', 'jurisdictions'), href: '/#countries' },
    { name: t('nav', 'about'), href: '/#about' },
    { name: t('nav', 'faq'), href: '/#faq' },
    { name: t('nav', 'contacts'), href: '/#contacts' },
  ];

  const handleUsaMouseEnter = () => {
    if (usaDropdownTimeoutRef.current) clearTimeout(usaDropdownTimeoutRef.current);
    setUsaDropdownOpen(true);
  };

  const handleUsaMouseLeave = () => {
    usaDropdownTimeoutRef.current = setTimeout(() => {
      setUsaDropdownOpen(false);
    }, 200);
  };

  // Render the Volumetric USA button inside the Segment according to the 10 sub-variations of #5
  const renderUsaTab = (link: NavItem, variantId: number) => {
    switch (variantId) {
      case 1: // 5.1 Champagne Gold: Warm tactile 3D bevel with silk flag
        return (
          <Link
            key={link.name}
            href={link.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs text-[#070A0F] bg-gradient-to-b from-[#F9E8B6] via-[#D8B467] to-[#A0782A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_3px_10px_rgba(216,180,103,0.35)] border border-[#FFE8A3] transform hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0"
          >
            <LuxuryUsaFlag size="sm" />
            <span className="tracking-wide uppercase text-[11px] font-extrabold">{link.name}</span>
            <Star size={11} className="fill-[#070A0F] text-[#070A0F]" />
          </Link>
        );

      case 2: // 5.2 Platinum & Silver Reserve: Polished chrome bevel with Swiss bank precision
        return (
          <Link
            key={link.name}
            href={link.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs text-[#070A0F] bg-gradient-to-b from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_3px_10px_rgba(255,255,255,0.25)] border border-white transform hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0"
          >
            <LuxuryUsaFlag size="sm" />
            <span className="tracking-wide uppercase text-[11px] font-extrabold text-[#0B111A]">
              {link.name}
            </span>
            <Star size={11} className="fill-[#0B111A] text-[#0B111A]" />
          </Link>
        );

      case 3: // 5.3 Midnight Sapphire & Gold: Washington DC & Wall Street diplomat navy
        return (
          <Link
            key={link.name}
            href={link.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs text-white bg-gradient-to-b from-[#1E3A8A] via-[#172554] to-[#0A1128] border-2 border-gold-400 shadow-[inset_0_1px_2px_rgba(212,175,55,0.5),0_3px_12px_rgba(30,58,138,0.5)] transform hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0"
          >
            <LuxuryUsaFlag size="sm" />
            <span className="tracking-wide uppercase text-[11px] font-extrabold text-gold-300">
              {link.name}
            </span>
            <Star size={11} className="fill-gold-400 text-gold-400 drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]" />
          </Link>
        );

      case 4:
      case 10:
      default: // Luxury Emerald Green Card Style: Deep emerald silk with gold star and US flag
        return (
          <Link
            key={link.name}
            href={link.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs text-[#ECFDF5] bg-gradient-to-b from-[#0F5A3E] via-[#0A452F] to-[#04281B] border border-[#10B981]/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_3px_12px_rgba(16,185,129,0.35)] transform hover:scale-[1.03] active:scale-[0.98] transition-all shrink-0"
          >
            <LuxuryUsaFlag size="sm" />
            <span className="tracking-wide uppercase text-[11px] font-extrabold text-emerald-100">
              {link.name}
            </span>
            <Star size={11} className="fill-[#FDE047] text-[#FDE047] drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
          </Link>
        );
    }
  };

  // 6-Language Dropdown Component with High-Quality Flags
  const renderLanguageSelector = () => (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F1520] hover:bg-[#182232] border border-[#232F42] hover:border-gold-500/50 text-xs text-gray-200 transition-all cursor-pointer shadow-sm group"
        aria-label="Выбрать язык"
      >
        <span className="w-4 h-3 rounded-[2px] overflow-hidden inline-flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
          <img src={activeLangObj.flag} alt={activeLangObj.name} className="w-full h-full object-cover" />
        </span>
        <span className="font-bold text-[11px] tracking-wider text-gold-300 group-hover:text-white transition-colors">
          {activeLangObj.label}
        </span>
        <ChevronDown
          size={12}
          className={`text-gray-400 transition-transform duration-200 ${
            isLangOpen ? 'rotate-180 text-gold-400' : ''
          }`}
        />
      </button>

      {isLangOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-[#090D15] border border-gold-500/40 rounded-xl shadow-2xl shadow-black p-2 z-[160] animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2.5 py-1 text-[9px] font-mono text-gold-400/80 uppercase tracking-wider border-b border-[#1E293B] mb-1 flex items-center justify-between">
            <span>Язык / Language</span>
            <span className="text-gray-400">6 языков</span>
          </div>
          <div className="space-y-0.5">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === currentLang;
              return (
                <button
                  key={lang.code}
                  onClick={() => selectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors ${
                    isSelected
                      ? 'bg-gold-500/20 text-gold-300 font-semibold border border-gold-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-[#131A26]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4.5 h-3 rounded-[2px] overflow-hidden inline-flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
                      <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover" />
                    </span>
                    <span className="text-xs font-mono font-bold text-gold-400/90">{lang.label}</span>
                    <span className="text-gray-200">{lang.name}</span>
                  </div>
                  {isSelected && <Check size={13} className="text-gold-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  const currentVariant = SEGMENT_VARIANTS.find((v) => v.id === activeVariantId) || SEGMENT_VARIANTS[0];

  return (
    <>
      {/* 10 Full-Site Architectural & Visual Themes Interactive Switcher */}
      {showSwitcher && (
        <div className="bg-[#05080E]/98 border-b border-gold-500/40 text-xs px-3 py-2 z-[70] sticky top-0 backdrop-blur-xl shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 shrink-0">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-400"></span>
              </span>
              <span className="text-gray-300 font-bold uppercase tracking-wider text-[11px]">
                🎨 10 Вариаций сайта & графики:
              </span>
              <span className="text-gold-300 font-serif font-bold text-xs bg-gold-500/10 px-2 py-0.5 rounded border border-gold-500/30">
                {activeThemeConfig.name}
              </span>
            </div>

            {/* 10 pills row for full site themes */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full xl:w-auto pb-1 xl:pb-0 scrollbar-none">
              {THEMES.map((t) => {
                const isActive = t.id === activeThemeId;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectVariant(t.id)}
                    title={t.description}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#E5C37A] via-[#C9A45B] to-[#99742B] text-black font-extrabold shadow-lg shadow-gold-500/30 scale-105 border border-[#FFE8A3]'
                        : 'bg-[#0E1522] text-gray-300 hover:text-white hover:bg-[#182336] border border-[#23334A]'
                    }`}
                  >
                    <span>{t.tag}</span>
                  </button>
                );
              })}

              <button
                onClick={() => setShowSwitcher(false)}
                title="Скрыть панель"
                className="text-gray-400 hover:text-white p-1 text-xs ml-2 hover:bg-white/10 rounded transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header with Segmented Navigation */}
      <header
        className={`sticky ${showSwitcher ? 'top-[41px]' : 'top-0'} z-50 w-full transition-all duration-200 h-16 sm:h-18 bg-black/95 backdrop-blur-md border-b border-[#181818]`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo with 30px symbol matching the exact height of 2 text lines */}
          <Logo size={activeVariantId === 8 ? 'sm' : 'md'} className="shrink-0" />

          {/* Continuous Segmented Pill Container (Center Navigation) */}
          <nav
            className={`hidden lg:inline-flex items-center rounded-full transition-all ${
              activeVariantId === 2
                ? 'bg-[#0E1522] p-1.5 border border-[#2B3952] shadow-inner' // 5.2 Platinum
                : activeVariantId === 3
                ? 'bg-[#080E1C] p-1.5 border border-[#1E3A8A]/60 shadow-[0_0_15px_rgba(30,58,138,0.2)]' // 5.3 Sapphire
                : activeVariantId === 4
                ? 'bg-[#051410] p-1.5 border border-[#065F46]/60 shadow-[0_0_15px_rgba(6,95,70,0.2)]' // 5.4 Emerald
                : activeVariantId === 5
                ? 'bg-white/5 backdrop-blur-2xl p-1.5 border border-white/10 shadow-2xl' // 5.5 Frosted Glass
                : activeVariantId === 6
                ? 'bg-[#0A0E17] p-1.5 border border-[#222E42] shadow-inner' // 5.6 Titanium Carbon
                : activeVariantId === 8
                ? 'bg-[#0B101A] p-1 border border-[#1E293B]' // 5.8 Ultra-compact
                : activeVariantId === 10
                ? 'bg-[#100D0F] p-1.5 border border-[#3D2522]' // 5.10 Rose Gold
                : 'bg-[#0E1420] p-1.5 border border-[#1E293B] shadow-lg shadow-black/40' // 5.1 & 5.7 Default
            }`}
          >
            {translatedNavItems.map((link) => {
              if (link.isUSA) {
                return renderUsaTab(link, activeVariantId);
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs text-gray-300 hover:text-white transition-all whitespace-nowrap font-medium ${
                    activeVariantId === 2
                      ? 'hover:bg-[#1A253A] hover:text-cyan-200'
                      : activeVariantId === 3
                      ? 'hover:bg-[#122244] hover:text-blue-200'
                      : activeVariantId === 4
                      ? 'hover:bg-[#0A261E] hover:text-emerald-200'
                      : activeVariantId === 10
                      ? 'hover:bg-[#251A1D] hover:text-[#F2D0BE]'
                      : 'hover:bg-[#172132] hover:text-gold-300'
                  }`}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: Consultation CTA + 6-Language Switcher */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={() => openConsultation()}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#F3E2B8] via-[#D4AF37] to-[#A0782A] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_2px_12px_rgba(212,175,55,0.3)] cursor-pointer"
            >
              {t('nav', 'bookConsultation')}
            </button>
            {renderLanguageSelector()}
          </div>

          {/* Mobile hamburger & language toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden shrink-0">
            {renderLanguageSelector()}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Переключить мобильное меню"
              className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-[#0F1522] border border-[#23334A] text-gold-300 hover:text-white hover:border-gold-500/60 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Off-Canvas Sliding Drawer (like tatubatumi.com) */}
        {/* Backdrop Scrim */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[190] transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Sliding Panel */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-[100dvh] w-[88vw] max-w-sm bg-[#070B14] border-l border-gold-500/30 z-[200] shadow-[-10px_0_40px_rgba(0,0,0,0.95)] flex flex-col justify-between transition-transform duration-300 ease-out transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#182234] flex items-center justify-between bg-[#0A0F1D]/80">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Закрыть меню"
              className="w-9 h-9 rounded-full bg-[#111927] border border-[#23334A] text-gray-300 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Drawer Body - Scrollable Links */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {/* 6-Language Switcher Pills directly in drawer */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold-400/90 flex items-center justify-between">
                <span>Язык / Language</span>
                <span className="text-gray-400">6 языков</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {LANGUAGES.map((lang) => {
                  const isSelected = lang.code === currentLang;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => selectLanguage(lang.code)}
                      className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-semibold transition-all border ${
                        isSelected
                          ? 'bg-gold-500/20 text-gold-300 border-gold-500/60 shadow-sm'
                          : 'bg-[#0E1522] text-gray-300 border-[#1E2C42] hover:bg-[#162030]'
                      }`}
                    >
                      <span className="w-4 h-2.5 rounded-[2px] overflow-hidden inline-flex items-center justify-center shrink-0 border border-white/20">
                        <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover" />
                      </span>
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation links */}
            <div className="space-y-1 pt-2 border-t border-[#162030]">
              {translatedNavItems.map((link) => {
                if (link.isUSA) {
                  return (
                    <div key={link.name} className="py-1">
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/90 via-emerald-900/60 to-emerald-950/90 border border-emerald-500/50 text-emerald-300 font-bold text-xs shadow-md active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <LuxuryUsaFlag size="sm" />
                          <span className="tracking-wide uppercase">{link.name}</span>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold font-mono tracking-wider">
                          15Y NY
                        </span>
                      </Link>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xs font-medium text-gray-200 hover:text-gold-300 p-3 rounded-lg hover:bg-white/5 active:bg-white/10 transition-colors border-b border-white/[0.04]"
                  >
                    <span>{link.name}</span>
                    <span className="text-gray-500 text-xs">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Direct Telegram link */}
            <div className="pt-2">
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl bg-[#0D1522] border border-gold-500/20 text-gray-200 text-xs hover:border-gold-500/40 transition-colors"
              >
                <span className="text-gray-300">Telegram Bot</span>
                <span className="text-gold-400 font-mono font-bold">@VILEVIN_bot</span>
              </a>
            </div>
          </div>

          {/* Drawer Footer Actions */}
          <div className="p-5 border-t border-[#182234] bg-[#0A0F1D]/90 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#F3E2B8] via-[#D8B467] to-[#A0782A] text-[#070A0F] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-98 transition-all cursor-pointer border border-[#FFE8A3]"
            >
              <span>{t('nav', 'bookConsultation')}</span>
            </button>
            <p className="text-[10px] text-center text-gray-500 font-mono">
              Attorney-Client Privilege · Confidential
            </p>
          </div>
        </div>
      </header>
    </>
  );
};

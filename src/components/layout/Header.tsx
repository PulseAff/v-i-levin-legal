'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { Globe, ChevronDown, Check, Menu, X, Star } from 'lucide-react';
import { useLanguage, LANGUAGES, LanguageCode } from '@/context/LanguageContext';

interface NavItem {
  name: string;
  href: string;
  isUSA?: boolean;
}

export const Header: React.FC = () => {
  const { currentLang, setLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
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

  const selectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // EXACT navigation without cases and without faq: Услуги, США & GREEN CARD ⭐, Юрисдикции, О практике, Контакты
  const navLinks: NavItem[] = [
    { name: t('nav', 'services'), href: '/services' },
    { name: t('nav', 'usaGreenCard'), href: '/usa', isUSA: true },
    { name: t('nav', 'jurisdictions'), href: '/#countries' },
    { name: t('nav', 'about'), href: '/#about' },
    { name: t('nav', 'contacts'), href: '/#contacts' },
  ];

  // Language Dropdown with Globe Icon [ 🌐 RU ∨ ]
  const renderLanguageSelector = () => (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setIsLangOpen(!isLangOpen)}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D1520] hover:bg-[#152030] border border-[#232F42] hover:border-gold-500/50 text-xs text-gray-200 transition-colors cursor-pointer shadow-sm group select-none"
        aria-label="Выбрать язык"
      >
        <Globe size={13} className="text-gray-400 group-hover:text-gold-300 transition-colors" />
        <span className="font-bold text-[11px] tracking-wider text-gray-200 group-hover:text-white transition-colors">
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
        <div className="absolute right-0 mt-2 w-52 bg-[#090D15] border border-gold-500/40 rounded-xl shadow-2xl p-2 z-[160] animate-in fade-in slide-in-from-top-2 duration-150">
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
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-gold-500/20 text-gold-300 font-semibold border border-gold-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-[#131A26]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-4.5 h-3 rounded-[2px] overflow-hidden inline-flex items-center justify-center shrink-0 border border-white/20">
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 bg-[#05070D]/90 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" className="shrink-0" />

        {/* Center Continuous Segmented Capsule with Emerald Green Card Button & Gold Star ⭐ */}
        <nav className="hidden lg:inline-flex items-center rounded-full bg-[#0B1017] p-1.5 border border-[#1F2937] shadow-lg shadow-black/50">
          {navLinks.map((link) => {
            if (link.isUSA) {
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-bold text-xs text-[#ECFDF5] bg-gradient-to-b from-[#0F5A3E] via-[#0A452F] to-[#04281B] border border-[#10B981]/70 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_0_15px_rgba(16,185,129,0.35)] transform hover:scale-[1.03] active:scale-[0.98] transition-transform shrink-0 mx-1"
                >
                  <LuxuryUsaFlag size="xs" />
                  <span className="tracking-wide uppercase text-[11px] font-extrabold text-white">
                    {link.name}
                  </span>
                  <span className="text-amber-300 text-[11px] leading-none drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]">★</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right Area: Language Switcher Only (matching user screenshot) */}
        <div className="flex items-center gap-3">
          {renderLanguageSelector()}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            aria-label="Открыть меню"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#05070E]/98 backdrop-blur-xl border-t border-[#1C2638] flex flex-col justify-between p-6 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-3">
            <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest px-2 mb-2">
              Навигация
            </div>
            
            {/* USA Green Card Flagship in mobile */}
            <Link
              href="/usa"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/60 to-[#0A1A14] border border-emerald-500/40 text-white font-semibold text-sm shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <LuxuryUsaFlag size="sm" />
                <span className="uppercase tracking-wide text-xs font-bold">{t('nav', 'usaGreenCard')}</span>
              </div>
              <span className="text-amber-300 text-xs">★</span>
            </Link>

            {/* Other links */}
            {navLinks.filter(l => !l.isUSA).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-gray-200 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors"
              >
                <span>{link.name}</span>
                <span className="text-gray-400 text-xs font-mono">→</span>
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#182335] space-y-3">
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider px-1">
              Экстренная связь
            </div>
            <a
              href="https://t.me/VILEVIN_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500 text-black font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              <span>Telegram: @VILEVIN_bot</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

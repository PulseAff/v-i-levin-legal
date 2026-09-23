'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { Menu, X, ChevronDown, Check, Globe } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useLanguage, LANGUAGES, LanguageCode } from '@/context/LanguageContext';
import { useConsultation } from '@/context/ConsultationContext';

export interface NavItem {
  name: string;
  href: string;
  isUSA?: boolean;
}

export const Header: React.FC = () => {
  const { currentLang, setLanguage, t } = useLanguage();
  const { openConsultation } = useConsultation();

  const [isLangOpen, setIsLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

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

  const selectLanguage = (code: LanguageCode) => {
    setLanguage(code);
    setIsLangOpen(false);
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Navigation: Услуги, США & GREEN CARD*, Юрисдикции, О практике, FAQ, Контакты (без кейсов)
  const navLinks: NavItem[] = [
    { name: t('nav', 'services'), href: '/services' },
    { name: `${t('nav', 'usaGreenCard')}*`, href: '/usa', isUSA: true },
    { name: t('nav', 'jurisdictions'), href: '/#countries' },
    { name: t('nav', 'about'), href: '/#about' },
    { name: 'FAQ', href: '/#faq' },
    { name: t('nav', 'contacts'), href: '/#contacts' },
  ];

  // Language Dropdown with Globe Icon matching screenshot [ 🌐 RU ∨ ]
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
    /* Completely fixed at top: does not jump, shift, or animate on scroll */
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 bg-[#05070D]/90 backdrop-blur-md border-b border-white/[0.07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Logo size="md" className="shrink-0" />

        {/* Center Continuous Segmented Capsule with Emerald Green Card Button & TRUST badge */}
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
                  <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#04281B] border border-emerald-500/40 text-emerald-300 font-bold tracking-wider">
                    TRUST
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={link.name}
                href={link.href}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs text-gray-300 hover:text-white transition-colors whitespace-nowrap font-medium"
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: Language Selector ONLY (matches user screenshot) */}
        <div className="hidden lg:flex items-center shrink-0">
          {renderLanguageSelector()}
        </div>

        {/* Mobile hamburger & language */}
        <div className="flex items-center gap-2 lg:hidden shrink-0">
          {renderLanguageSelector()}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Переключить меню"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0F1522] border border-[#23334A] text-gold-300 hover:text-white active:scale-95 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Off-Canvas Sliding Drawer */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/80 backdrop-blur-md z-[190] transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      <div
        className={`lg:hidden fixed top-0 right-0 h-[100dvh] w-[85vw] max-w-sm bg-[#070A0F] border-l border-[#1A2230] z-[200] shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#1A2230] flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Закрыть"
            className="w-9 h-9 rounded-full bg-[#111927] border border-[#23334A] text-gray-300 hover:text-white flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Languages */}
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono uppercase tracking-widest text-gold-400/80">
              Язык / Language
            </div>
            <div className="grid grid-cols-3 gap-1.5 pt-1">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;
                return (
                  <button
                    key={lang.code}
                    onClick={() => selectLanguage(lang.code)}
                    className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
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

          {/* Nav links */}
          <div className="space-y-1 pt-3 border-t border-[#1A2230]">
            {navLinks.map((link) => {
              if (link.isUSA) {
                return (
                  <div key={link.name} className="py-1">
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-b from-[#0F5A3E] via-[#0A452F] to-[#04281B] border border-[#10B981]/70 text-emerald-200 font-bold text-xs shadow-md active:scale-[0.98] transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <LuxuryUsaFlag size="xs" />
                        <span className="tracking-wide uppercase text-white">{link.name}</span>
                      </div>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#04281B] border border-emerald-500/40 text-emerald-300 font-bold tracking-wider">
                        TRUST
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

          {/* Telegram bot */}
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

        {/* Drawer Footer */}
        <div className="p-5 border-t border-[#1A2230] bg-[#070A0F] space-y-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openConsultation();
            }}
            className="w-full py-3 rounded-full border border-gold-500/60 hover:border-gold-400 text-xs text-gold-300 hover:text-white transition-all tracking-wide bg-transparent hover:bg-gold-500/10 cursor-pointer font-medium"
          >
            {t('nav', 'bookConsultation')}
          </button>
          <p className="text-[10px] text-center text-gray-500 font-mono">
            Attorney-Client Privilege · Confidential
          </p>
        </div>
      </div>
    </header>
  );
};

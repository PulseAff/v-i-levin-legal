'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeConfig {
  id: number;
  name: string;
  tag: string;
  heroVisualType: 'manhattan' | 'lady_justice' | 'passport' | 'swiss' | 'heritage' | 'emerald' | 'cyber' | 'titanium' | 'cashmere' | 'oled';
  heroImage: string;
  accentGold: string;
  accentSecondary: string;
  bgDark: string;
  cardBg: string;
  cardBorder: string;
  fontClass: string;
  description: string;
}

export const THEMES: ThemeConfig[] = [
  {
    id: 1,
    name: '01. Imperial Manhattan Night',
    tag: 'Манхэттен & Золото',
    heroVisualType: 'manhattan',
    heroImage: '/images/hero-manhattan-office.jpg',
    accentGold: '#E5C37A',
    accentSecondary: '#C5A262',
    bgDark: '#05070D',
    cardBg: '#0A101C',
    cardBorder: 'border-[#263750]',
    fontClass: 'font-serif',
    description: 'Панорама ночного Манхэттена из приватного офиса, сусальное золото, обсидиан',
  },
  {
    id: 2,
    name: '02. Lady Justice Architecture',
    tag: 'Фемида & Скульптура',
    heroVisualType: 'lady_justice',
    heroImage: '/images/lady-justice-sculpture.jpg',
    accentGold: '#D4AF37',
    accentSecondary: '#854D0E',
    bgDark: '#08080C',
    cardBg: '#101016',
    cardBorder: 'border-[#3D3325]',
    fontClass: 'font-serif',
    description: 'Бронзово-золотая скульптура Фемиды в архитектурном интерьере с видом на Empire State',
  },
  {
    id: 3,
    name: '03. Federal US Naturalization',
    tag: '3D Паспорт & Гражданство',
    heroVisualType: 'passport',
    heroImage: '/images/usa-passport-naturalization.jpg',
    accentGold: '#F3E2B8',
    accentSecondary: '#2563EB',
    bgDark: '#050A14',
    cardBg: '#0B1528',
    cardBorder: 'border-[#1E3A8A]',
    fontClass: 'font-serif',
    description: 'Фотореалистичный 3D-паспорт США, сертификат натурализации, мрамор Nero Marquina',
  },
  {
    id: 4,
    name: '04. Swiss Editorial Law',
    tag: 'Швейцарский минимализм',
    heroVisualType: 'swiss',
    heroImage: '/images/card-business-tower.jpg',
    accentGold: '#E2E8F0',
    accentSecondary: '#94A3B8',
    bgDark: '#090B0E',
    cardBg: '#12161D',
    cardBorder: 'border-[#2A3442]',
    fontClass: 'font-sans',
    description: 'Строгая архитектурная типографика, платиновый монохром, прецизионные линии',
  },
  {
    id: 5,
    name: '05. Wall Street Heritage',
    tag: 'Библиотека & Махагони',
    heroVisualType: 'heritage',
    heroImage: '/images/card-law-library.jpg',
    accentGold: '#D97706',
    accentSecondary: '#92400E',
    bgDark: '#0A0806',
    cardBg: '#16110D',
    cardBorder: 'border-[#3E2818]',
    fontClass: 'font-serif',
    description: 'Атмосфера старейших юридических контор Уолл-Стрит: кожа, фолианты, античная латунь',
  },
  {
    id: 6,
    name: '06. Diplomatic Emerald',
    tag: 'Изумруд & Капитолий',
    heroVisualType: 'emerald',
    heroImage: '/images/card-capitol-civics.jpg',
    accentGold: '#34D399',
    accentSecondary: '#059669',
    bgDark: '#040B08',
    cardBg: '#0A1812',
    cardBorder: 'border-[#134E39]',
    fontClass: 'font-serif',
    description: 'Глубокий дипломатический изумруд, неоклассический Капитолий, высокий протокол',
  },
  {
    id: 7,
    name: '07. Modern Cyber Privilege',
    tag: 'Data Privacy & Кибер-щит',
    heroVisualType: 'cyber',
    heroImage: '/images/card-business-tower.jpg',
    accentGold: '#38BDF8',
    accentSecondary: '#0284C7',
    bgDark: '#030814',
    cardBg: '#071326',
    cardBorder: 'border-[#0C4A6E]',
    fontClass: 'font-mono',
    description: 'Privacy by Design, защищенное хранение данных, технологичный сапфировый лед',
  },
  {
    id: 8,
    name: '08. Brushed Titanium Carbon',
    tag: 'Титан & Карбон',
    heroVisualType: 'titanium',
    heroImage: '/images/card-assets-wealth.jpg',
    accentGold: '#CBD5E1',
    accentSecondary: '#64748B',
    bgDark: '#060709',
    cardBg: '#0E1015',
    cardBorder: 'border-[#262B35]',
    fontClass: 'font-sans',
    description: 'Шлифованный титан, карбоновые фаски, сдержанный индустриальный супер-люкс',
  },
  {
    id: 9,
    name: '09. Bespoke Private Office',
    tag: 'Кашемир & Шампань',
    heroVisualType: 'cashmere',
    heroImage: '/images/card-boardroom-interview.jpg',
    accentGold: '#FDE68A',
    accentSecondary: '#B45309',
    bgDark: '#08080A',
    cardBg: '#131217',
    cardBorder: 'border-[#332E3D]',
    fontClass: 'font-serif',
    description: 'Кашемировый графит, шампанское золото, переговорный пентхаус на 60-м этаже',
  },
  {
    id: 10,
    name: '10. Pure OLED Pitch Black',
    tag: 'Абсолютный OLED Черный',
    heroVisualType: 'oled',
    heroImage: '/images/hero-themis-globe-flipped.jpg',
    accentGold: '#D4AF37',
    accentSecondary: '#B8860B',
    bgDark: '#000000',
    cardBg: '#080808',
    cardBorder: 'border-[#1C1C1C]',
    fontClass: 'font-serif',
    description: '100% глубокий черный OLED, золотой акцент, музейная выразительность',
  },
];

interface ThemeContextType {
  activeThemeId: number;
  setThemeId: (id: number) => void;
  currentTheme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType>({
  activeThemeId: 10,
  setThemeId: () => {},
  currentTheme: THEMES[9],
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeThemeId, setActiveThemeId] = useState<number>(10);

  // Load persisted theme preference from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('vilevin_site_theme');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 1 && parsed <= 10) {
          setActiveThemeId(parsed);
        }
      }
    } catch {
      // LocalStorage access may fail in private mode, fallback gracefully
    }
  }, []);

  const handleSetTheme = (id: number) => {
    setActiveThemeId(id);
    try {
      localStorage.setItem('vilevin_site_theme', id.toString());
    } catch {
      // Ignore
    }
  };

  const currentTheme = THEMES.find((t) => t.id === activeThemeId) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ activeThemeId, setThemeId: handleSetTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useSiteTheme = () => useContext(ThemeContext);

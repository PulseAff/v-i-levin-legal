'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../ui/Logo';
import { Shield, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { dict, t } = useLanguage();
  const fDict = dict.footer || {};

  return (
    <footer className="bg-[#04060A] text-gray-400 text-xs border-t border-[#151D2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-2">
            <Logo size="md" />
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm mt-3 font-light">
              {fDict.slogan || 'Ваши права — без границ.'}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-gold-400/90 font-mono">
              <Shield size={13} />
              <span>Attorney-Client Privilege · Confidentiality Standard Rule 1.6</span>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://t.me/VILEVIN_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0D1520] hover:bg-[#162232] text-gold-400 border border-gold-500/30 text-xs transition-colors"
              >
                <MessageSquare size={13} />
                <span>Telegram: @VILEVIN_bot</span>
              </a>
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-3">
            <div className="text-white font-serif font-bold text-sm tracking-wider uppercase">
              {fDict.navTitle || 'Навигация'}
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'services')}
                </Link>
              </li>
              <li>
                <Link href="/usa" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'usaGreenCard')}
                </Link>
              </li>
              <li>
                <Link href="/#countries" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'jurisdictions')}
                </Link>
              </li>
              <li>
                <Link href="/cases" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'cases')}
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'about')}
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'faq')}
                </Link>
              </li>
              <li>
                <Link href="/#contacts" className="hover:text-gold-300 transition-colors">
                  {t('nav', 'contacts')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct channels */}
          <div className="space-y-3">
            <div className="text-white font-serif font-bold text-sm tracking-wider uppercase">
              {fDict.contactsTitle || 'Контакты'}
            </div>
            <div className="space-y-2.5 text-xs">
              <p className="text-gray-300 font-medium">New York · Dubai · London</p>
              <p>
                <a
                  href="https://t.me/VILEVIN_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold-400 hover:text-gold-300 transition-colors"
                >
                  Telegram: @VILEVIN_bot
                </a>
              </p>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Monday — Friday: 09:00 – 20:00 EST<br />
                Emergency counsel: 24/7 on active retainer
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#121A26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500">
          <p>© {new Date().getFullYear()} V. I. LEVIN. {fDict.rights || 'Все права защищены.'}</p>
          <p className="max-w-md text-center sm:text-right text-[10px] text-gray-400 font-light">
            {fDict.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
};

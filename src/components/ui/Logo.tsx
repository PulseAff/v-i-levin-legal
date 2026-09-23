'use client';

import React from 'react';
import Link from 'next/link';

interface LogoProps {
  variant?: 'full' | 'icon';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '', size = 'md' }) => {
  // Height strictly matching the 2 text lines (approx 30px for md, 24px for sm, 36px for lg)
  const iconHeight = size === 'sm' ? 24 : size === 'lg' ? 36 : 30;

  return (
    <Link href="/" className={`inline-flex items-center gap-2 sm:gap-3 group select-none shrink-0 ${className}`}>
      {/* Pure golden Roman V + orbital swoosh symbol */}
      <img
        src="/logo-symbol.png"
        alt="V. I. LEVIN"
        className="h-6 sm:h-[30px] w-auto object-contain group-hover:scale-105 transition-transform duration-200 shrink-0"
      />

      {variant === 'full' && (
        <div className="flex flex-col justify-center" style={{ lineHeight: 1 }}>
          <span
            className="font-serif tracking-[0.14em] sm:tracking-[0.16em] text-white font-bold group-hover:text-gold-300 transition-colors text-base sm:text-[21px] leading-[0.9]"
          >
            V. I. LEVIN
          </span>
          <span
            className="text-[#D4AF37] uppercase font-sans font-semibold tracking-[0.18em] sm:tracking-[0.24em] text-[7px] sm:text-[8.6px] mt-0.5 sm:mt-1 leading-tight"
          >
            INTERNATIONAL LEGAL SOLUTIONS
          </span>
        </div>
      )}
    </Link>
  );
};

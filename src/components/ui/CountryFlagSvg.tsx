'use client';

import React from 'react';

interface CountryFlagSvgProps {
  code: string;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const CountryFlagSvg: React.FC<CountryFlagSvgProps> = ({
  code,
  className = '',
  size = 'sm',
}) => {
  const normalized = (code || '').toLowerCase().trim();

  // Size map
  const dimensions = {
    xs: { w: 16, h: 11 },
    sm: { w: 20, h: 14 },
    md: { w: 24, h: 16 },
  }[size] || { w: 20, h: 14 };

  const baseClasses = `inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-white/20 ${className}`;

  switch (normalized) {
    case 'usa':
    case 'us':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 640 480"
          className={baseClasses}
          aria-label="United States Flag"
        >
          <g fillRule="evenodd">
            {/* 13 Stripes */}
            <path fill="#bd3d44" d="M0 0h640v480H0z" />
            <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640" />
            {/* Canton */}
            <path fill="#192f5d" d="M0 0h260v258.5H0z" />
            {/* Stars representation */}
            <g fill="#fff">
              <circle cx="30" cy="25" r="8" />
              <circle cx="80" cy="25" r="8" />
              <circle cx="130" cy="25" r="8" />
              <circle cx="180" cy="25" r="8" />
              <circle cx="230" cy="25" r="8" />
              <circle cx="55" cy="55" r="8" />
              <circle cx="105" cy="55" r="8" />
              <circle cx="155" cy="55" r="8" />
              <circle cx="205" cy="55" r="8" />
              <circle cx="30" cy="85" r="8" />
              <circle cx="80" cy="85" r="8" />
              <circle cx="130" cy="85" r="8" />
              <circle cx="180" cy="85" r="8" />
              <circle cx="230" cy="85" r="8" />
              <circle cx="55" cy="115" r="8" />
              <circle cx="105" cy="115" r="8" />
              <circle cx="155" cy="115" r="8" />
              <circle cx="205" cy="115" r="8" />
              <circle cx="30" cy="145" r="8" />
              <circle cx="80" cy="145" r="8" />
              <circle cx="130" cy="145" r="8" />
              <circle cx="180" cy="145" r="8" />
              <circle cx="230" cy="145" r="8" />
              <circle cx="55" cy="175" r="8" />
              <circle cx="105" cy="175" r="8" />
              <circle cx="155" cy="175" r="8" />
              <circle cx="205" cy="175" r="8" />
              <circle cx="30" cy="205" r="8" />
              <circle cx="80" cy="205" r="8" />
              <circle cx="130" cy="205" r="8" />
              <circle cx="180" cy="205" r="8" />
              <circle cx="230" cy="205" r="8" />
              <circle cx="55" cy="235" r="8" />
              <circle cx="105" cy="235" r="8" />
              <circle cx="155" cy="235" r="8" />
              <circle cx="205" cy="235" r="8" />
            </g>
          </g>
        </svg>
      );

    case 'turkey':
    case 'tr':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 1200 800"
          className={baseClasses}
          aria-label="Turkey Flag"
        >
          <rect width="1200" height="800" fill="#E30A17" />
          <circle cx="425" cy="400" r="200" fill="#ffffff" />
          <circle cx="475" cy="400" r="160" fill="#E30A17" />
          <polygon
            points="583,400 691,435 624,343 624,457 691,365"
            fill="#ffffff"
            transform="scale(0.85) translate(130, 70)"
          />
        </svg>
      );

    case 'uae':
    case 'ae':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 1200 600"
          className={baseClasses}
          aria-label="UAE Flag"
        >
          <rect width="1200" height="200" fill="#00732f" />
          <rect y="200" width="1200" height="200" fill="#ffffff" />
          <rect y="400" width="1200" height="200" fill="#000000" />
          <rect width="300" height="600" fill="#ff0000" />
        </svg>
      );

    case 'eu':
    case 'germany':
    case 'de':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 810 540"
          className={baseClasses}
          aria-label="European Union Flag"
        >
          <rect width="810" height="540" fill="#003399" />
          <g fill="#FFCC00" transform="translate(405,270)">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 150 * Math.sin(rad);
              const y = -150 * Math.cos(rad);
              return <circle key={i} cx={x} cy={y} r="14" />;
            })}
          </g>
        </svg>
      );

    case 'cyprus':
    case 'cy':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 900 600"
          className={baseClasses}
          aria-label="Cyprus Flag"
        >
          <rect width="900" height="600" fill="#ffffff" />
          <path
            d="M260,330 C300,310 370,260 450,230 C530,200 600,210 650,250 C620,290 560,330 480,350 C400,370 310,360 260,330 Z"
            fill="#D57800"
          />
          <path
            d="M360,420 C420,380 480,410 540,420"
            stroke="#4E7037"
            strokeWidth="16"
            fill="none"
          />
        </svg>
      );

    case 'uk':
    case 'gb':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 60 30"
          className={baseClasses}
          aria-label="United Kingdom Flag"
        >
          <clipPath id="s">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <clipPath id="t">
            <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
          </clipPath>
          <g clipPath="url(#s)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'georgia':
    case 'ge':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 300 200"
          className={baseClasses}
          aria-label="Georgia Flag"
        >
          <rect width="300" height="200" fill="#fff" />
          <path d="M130,0 h40 v200 h-40 z M0,80 h300 v40 h-300 z" fill="#ff0000" />
          {/* 4 small crosses */}
          <g fill="#ff0000">
            <path d="M60,30 h10 v30 h-10 z M50,40 h30 v10 h-30 z" />
            <path d="M230,30 h10 v30 h-10 z M220,40 h30 v10 h-30 z" />
            <path d="M60,140 h10 v30 h-10 z M50,150 h30 v10 h-30 z" />
            <path d="M230,140 h10 v30 h-10 z M220,150 h30 v10 h-30 z" />
          </g>
        </svg>
      );

    case 'ru':
    case 'russia':
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 900 600"
          className={baseClasses}
          aria-label="Russian Flag"
        >
          <rect width="900" height="200" fill="#ffffff" />
          <rect y="200" width="900" height="200" fill="#0039A6" />
          <rect y="400" width="900" height="200" fill="#D52B1E" />
        </svg>
      );

    case 'other':
    default:
      return (
        <svg
          width={dimensions.w}
          height={dimensions.h}
          viewBox="0 0 24 24"
          className={`${baseClasses} bg-[#141C2E] p-0.5 text-gold-400`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
};

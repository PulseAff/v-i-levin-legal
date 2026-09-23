'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LuxuryUsaFlag } from '../ui/LuxuryUsaFlag';
import { useLanguage } from '@/context/LanguageContext';

export const ServicesSection: React.FC = () => {
  const { dict } = useLanguage();
  const servicesData = dict.services || {};
  const items = servicesData.items || [];

  const images = [
    '/images/card-usa-v2.jpg',
    '/images/card-biz-v1.jpg',
    '/images/card-wealth-v1.jpg',
    '/images/card-arb-v2.jpg',
    '/images/card-audit-v1.jpg',
    '/images/card-strat-v2.jpg',
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-[#05070E] border-b border-[#1A2538] overflow-hidden" id="services">
      {/* Ambient backdrop glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[140px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-[1060px] mx-auto flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-3 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold tracking-tight">
              {servicesData.title1}{' '}
              <span className="font-normal italic text-[#D4AF37]">
                {servicesData.title2}
              </span>
            </h2>

            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              {servicesData.desc}
            </p>
          </div>

          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D1524] hover:bg-[#162238] text-gray-200 hover:text-white border border-[#23334A] hover:border-gold-500/50 text-xs font-semibold uppercase tracking-wider transition-all shadow-md shrink-0 self-start lg:self-end"
          >
            <span>{servicesData.btnAll}</span>
            <ArrowRight size={14} className="text-gold-400" />
          </Link>
        </div>

        {/* Clean, Editorial 6-Card Grid */}
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item: any, idx: number) => (
            <Link
              key={idx}
              href={item.href}
              className="group relative rounded-xl bg-[#090E1A] border border-[#1A2840] hover:border-gold-500/60 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.85)]"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden bg-black border-b border-[#1A2840]">
                <img
                  src={images[idx] || images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover object-center contrast-[1.05] brightness-[1.03]"
                />
                
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded bg-black/90 border border-[#2B3C58] text-[9.5px] font-mono text-gold-300 uppercase tracking-widest backdrop-blur-md shadow-md">
                    {item.code}
                  </span>
                  {item.highlight && (
                    <span className="px-2.5 py-1 rounded bg-gold-500/25 text-[#FFE8A3] border border-gold-400/50 text-[9.5px] font-mono font-bold flex items-center gap-1.5 backdrop-blur-md shadow-md">
                      <LuxuryUsaFlag size="xs" /> {servicesData.flagshipBadge || 'Флагман'}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2.5">
                  <h3 className="text-lg sm:text-[19px] font-serif font-bold text-white group-hover:text-gold-300 transition-colors leading-snug drop-shadow-sm">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-gray-300 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#141F32] flex items-center justify-between text-xs text-gold-400 font-medium group-hover:text-gold-300">
                  <span className="tracking-wide uppercase text-[11px] font-mono">{servicesData.cardAction || 'Перейти к направлению'}</span>
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

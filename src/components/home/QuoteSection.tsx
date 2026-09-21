import React from 'react';

export const QuoteSection: React.FC = () => {
  return (
    <section className="bg-[#05070B] py-10 border-b border-[#1A2230]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-xl border border-[#1A2230] p-6 lg:p-8 overflow-hidden bg-gradient-to-r from-black via-[#0B0F15] to-black text-center space-y-2">
          <p className="text-sm sm:text-base font-serif italic text-white leading-relaxed max-w-xl mx-auto">
            «Право — это не только законы. Это возможность жить там, где вы хотите.»
          </p>
          <div className="text-xs text-gold-400 font-sans tracking-wider">
            V. I. Levin
          </div>
        </div>
      </div>
    </section>
  );
};

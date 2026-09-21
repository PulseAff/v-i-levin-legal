'use client';

import React from 'react';
import { Hero } from '@/components/home/Hero';
import { ServicesSection } from '@/components/home/ServicesSection';
import { GreenCardSpecial } from '@/components/home/GreenCardSpecial';
import { AboutSection } from '@/components/home/AboutSection';
import { CountriesSection } from '@/components/home/CountriesSection';
import { ContactsSection } from '@/components/home/ContactsSection';
import { QuoteSection } from '@/components/home/QuoteSection';
import { FAQSection } from '@/components/home/FAQSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <GreenCardSpecial />
      <AboutSection />
      <CountriesSection />
      <ContactsSection />
      <QuoteSection />
      <FAQSection />
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Card в США без работодателя (EB-1A и EB-2 NIW) | Практика V. I. LEVIN',
  description: 'Иммиграция экстраординарных специалистов и фаундеров в США: аудит петиций EB-1A Extraordinary Ability и EB-2 National Interest Waiver (NIW). Анализ соответствия критериям Kazarian и Dhanasar.',
  alternates: {
    canonical: 'https://vilevin.com/usa/green-card/',
  },
  openGraph: {
    title: 'Green Card в США без работодателя (EB-1A и EB-2 NIW) | V. I. LEVIN',
    description: 'Комплексный правовой аудит и подготовка петиций талантов EB-1A и EB-2 NIW для IT-фаундеров, ученых и топ-менеджеров.',
    url: 'https://vilevin.com/usa/green-card/',
    siteName: 'V. I. LEVIN Practice',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function GreenCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'Иммиграционная практика США (EB-1A & EB-2 NIW) — V. I. LEVIN',
            description: 'Юридический анализ критериев экстраординарности EB-1A и национальной значимости EB-2 NIW, подготовка петиций I-140.',
            url: 'https://vilevin.com/usa/green-card/',
            areaServed: ['US', 'RU', 'UA', 'KZ', 'TR', 'GE', 'AE'],
            serviceType: [
              'EB-1A Extraordinary Ability Petition Review',
              'EB-2 National Interest Waiver (NIW) Strategy',
              'USCIS Evidence Audit (Kazarian & Dhanasar standards)',
              'Consular Processing Advisory'
            ]
          }),
        }}
      />
    </>
  );
}

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Подготовка к консульскому интервью в посольстве США | Отказ 221(g) | V. I. LEVIN',
  description: 'Юридическая подготовка к собеседованию на иммиграционную визу США (Варшава, Франкфурт, Алматы). Стратегия снятия административной проверки 221(g), аудит анкеты DS-260 и безопасности дела.',
  alternates: {
    canonical: 'https://vilevin.com/usa/interview/',
  },
  openGraph: {
    title: 'Подготовка к иммиграционному интервью в консульстве США | V. I. LEVIN',
    description: 'Аудит рисков отказа по 221(g), моделирование интервью с консульским офицером, защита петиций EB-1A/NIW/EB-5 на финальном этапе.',
    url: 'https://vilevin.com/usa/interview/',
    siteName: 'V. I. LEVIN Practice',
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function InterviewLayout({
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
            name: 'Консульская практика США — V. I. LEVIN',
            description: 'Подготовка к собеседованию на иммиграционную визу в консульствах США, снятие статуса 221(g) Administrative Processing.',
            url: 'https://vilevin.com/usa/interview/',
            serviceType: [
              'Consular Interview Simulation',
              'Section 221(g) Administrative Processing Resolution',
              'DS-260 Security Audit',
              'Immigrant Visa Issuance Defense'
            ]
          }),
        }}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ConsultationProvider } from '@/context/ConsultationContext';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'V. I. LEVIN | International Legal Solutions — Ваши права без границ',
  description: 'Премиальная закрытая международная юридическая практика V. I. LEVIN. Иммиграция в США (EB-1A, EB-2 NIW, Green Card), международный арбитраж, трансграничный бизнес и защита активов.',
  keywords: [
    'V. I. Levin',
    'международный юрист',
    'Green Card США',
    'EB-1A',
    'EB-2 NIW',
    'иммиграция в США',
    'международные контракты',
    'арбитраж',
    'DIFC',
    'юридические консультации',
    'защита активов',
    'cryptomus usdt юрист',
  ],
  authors: [{ name: 'V. I. LEVIN Practice' }],
  metadataBase: new URL('https://vilevin.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/?lang=ru',
      'en': '/?lang=en',
      'uk': '/?lang=uk',
      'es': '/?lang=es',
      'it': '/?lang=it',
      'fr': '/?lang=fr',
    },
  },
  openGraph: {
    title: 'V. I. LEVIN | International Legal Solutions',
    description: 'Ваши права — без границ. Закрытая международная юридическая практика для сложных и нестандартных дел.',
    url: 'https://vilevin.com',
    siteName: 'V. I. LEVIN Legal',
    images: [
      {
        url: '/avatar.svg',
        width: 800,
        height: 800,
        alt: 'V. I. LEVIN International Legal Solutions',
      },
    ],
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V. I. LEVIN | International Legal Solutions',
    description: 'Международная юридическая практика V. I. LEVIN. Иммиграция США, трансграничные споры, защита активов.',
    images: ['/avatar.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/avatar.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'V. I. LEVIN — International Legal Solutions',
    url: 'https://vilevin.com',
    logo: 'https://vilevin.com/logo.svg',
    image: 'https://vilevin.com/avatar.svg',
    description: 'Международная юридическая практика: иммиграция в США (Green Card EB-1A / EB-2 NIW), трансграничные споры, корпоративное право.',
    slogan: 'Ваши права — без границ.',
    priceRange: '$$$$',
    areaServed: ['US', 'EU', 'AE', 'GE', 'TR', 'CY'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Юридические услуги V. I. LEVIN',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Иммиграция и Green Card США (EB-1A / EB-2 NIW)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Международные контракты и комплаенс',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Трансграничные судебные споры и арбитраж',
          },
        },
      ],
    },
  };

  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-[#05070D] text-slate-100 antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <ConsultationProvider>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </ConsultationProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

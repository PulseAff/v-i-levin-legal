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
  title: {
    default: 'V. I. LEVIN | International Legal Practice — Ваши права без границ',
    template: '%s | V. I. LEVIN Legal Practice',
  },
  description: 'Премиальная закрытая международная юридическая практика V. I. LEVIN. Иммиграция в США (EB-1A, EB-2 NIW, Green Card), международный арбитраж, трансграничный бизнес, комплаенс и защита частных активов.',
  keywords: [
    'V. I. Levin',
    'международный юрист',
    'адвокат США',
    'Green Card США',
    'EB-1A',
    'EB-2 NIW',
    'виза талантов США',
    'иммиграция в США',
    'международные контракты',
    'трансграничный арбитраж',
    'DIFC',
    'защита активов',
    'безотзывные трасты',
    'комплаенс банковских счетов',
    'international lawyer',
    'US immigration attorney',
    'asset protection',
  ],
  authors: [{ name: 'V. I. LEVIN International Practice' }],
  creator: 'V. I. LEVIN',
  publisher: 'V. I. LEVIN Legal Solutions',
  metadataBase: new URL('https://vilevin.com'),
  alternates: {
    canonical: 'https://vilevin.com',
    languages: {
      'ru': 'https://vilevin.com/?lang=ru',
      'en': 'https://vilevin.com/?lang=en',
      'uk': 'https://vilevin.com/?lang=uk',
      'es': 'https://vilevin.com/?lang=es',
      'it': 'https://vilevin.com/?lang=it',
      'fr': 'https://vilevin.com/?lang=fr',
      'x-default': 'https://vilevin.com',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'V. I. LEVIN | International Legal Practice — Ваши права без границ',
    description: 'Закрытая международная юридическая практика для сложных и нестандартных дел. Иммиграция в США (EB-1A/NIW), трансграничные споры, защита активов.',
    url: 'https://vilevin.com',
    siteName: 'V. I. LEVIN Legal Practice',
    images: [
      {
        url: '/brand-emblem.jpg',
        width: 1200,
        height: 630,
        alt: 'V. I. LEVIN — International Legal Practice',
      },
      {
        url: '/avatar.svg',
        width: 800,
        height: 800,
        alt: 'V. I. LEVIN Practice Emblem',
      },
    ],
    locale: 'ru_RU',
    alternateLocale: ['en_US', 'uk_UA', 'es_ES', 'it_IT', 'fr_FR'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'V. I. LEVIN | International Legal Practice',
    description: 'Международная юридическая практика V. I. LEVIN. Иммиграция США (EB-1A / Green Card), арбитраж, защита активов.',
    images: ['/brand-emblem.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    apple: '/avatar.svg',
  },
  category: 'legal',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } : {}),
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://vilevin.com/#website',
        url: 'https://vilevin.com',
        name: 'V. I. LEVIN Legal Practice',
        description: 'Официальный портал международной юридической практики V. I. LEVIN.',
        inLanguage: ['ru', 'en', 'uk', 'es', 'it', 'fr'],
        publisher: {
          '@id': 'https://vilevin.com/#organization',
        },
      },
      {
        '@type': ['LegalService', 'Attorney'],
        '@id': 'https://vilevin.com/#organization',
        name: 'V. I. LEVIN — International Legal Practice',
        alternateName: 'V. I. LEVIN Legal Solutions',
        url: 'https://vilevin.com',
        logo: 'https://vilevin.com/logo.svg',
        image: 'https://vilevin.com/brand-emblem.jpg',
        description: 'Премиальная международная юридическая практика. Иммиграция в США (Green Card EB-1A / EB-2 NIW), международный арбитраж, трансграничный бизнес, защита активов и международный комплаенс.',
        slogan: 'Ваши права — без границ.',
        priceRange: '$$$$',
        currenciesAccepted: 'USD, EUR, USDT, BTC, CHF',
        paymentAccepted: 'Cryptocurrency (USDT TRC-20, BTC), Bank Wire (SWIFT, SEPA), Escrow',
        knowsLanguage: ['ru', 'en', 'uk', 'es', 'it', 'fr'],
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'Country', name: 'European Union' },
          { '@type': 'Country', name: 'United Arab Emirates' },
          { '@type': 'Country', name: 'United Kingdom' },
          { '@type': 'Country', name: 'Switzerland' },
          { '@type': 'Country', name: 'Cyprus' },
          { '@type': 'Country', name: 'Georgia' },
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'Client Concierge & Legal Intake',
            url: 'https://t.me/VILEVIN_bot',
            availableLanguage: ['Russian', 'English', 'Ukrainian', 'Spanish', 'Italian', 'French'],
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Юридические услуги V. I. LEVIN',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Иммиграция и Green Card США (EB-1A / EB-2 NIW)',
                description: 'Полное юридическое сопровождение петиций экстраординарных способностей EB-1A и национальных интересов EB-2 NIW под ключ с гарантией конфиденциальности.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Международные контракты и трансграничный комплаенс',
                description: 'Разработка мультиюрисдикционных соглашений, структурирование холдингов в США, ЕС, ОАЭ (DIFC) и сопровождение международных расчетов.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Трансграничные судебные споры и арбитраж',
                description: 'Представительство интересов в международных арбитражах (LCIA, ICC, VIAC), признание и исполнение решений иностранных судов.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Защита частных активов и трастовое структурирование',
                description: 'Создание безотзывных трастов, семейных фондов, защита от недружественных поглощений и агрессивных кредиторов.',
              },
            },
          ],
        },
      },
    ],
  };

  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-ZQGBVN9N3B';

  return (
    <html lang="ru" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {gaId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        )}
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

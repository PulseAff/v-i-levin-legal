import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vilevin.com';
  const lastModified = new Date();

  const routes = [
    '',
    '/about',
    '/contacts',
    '/services',
    '/services/usa-immigration',
    '/services/contracts-compliance',
    '/services/arbitration',
    '/services/corporate-structuring',
    '/services/representation',
    '/services/sanctions-banking',
    '/countries',
    '/countries/usa',
    '/countries/uae',
    '/countries/uk',
    '/countries/eu',
    '/countries/georgia',
    '/countries/turkey',
    '/usa',
    '/usa/green-card',
    '/usa/interview',
    '/usa/immigration-test',
    '/articles',
    '/cases',
  ];

  const languages = ['ru', 'en', 'uk', 'es', 'it', 'fr'];

  return routes.map((route) => {
    const isPriorityRoot = route === '' || route === '/usa' || route === '/usa/green-card';
    
    // Generates hreflang alternate links for SEO
    const alternates = languages.reduce((acc, lang) => {
      acc[lang] = `${baseUrl}${route}?lang=${lang}`;
      return acc;
    }, {} as Record<string, string>);

    return {
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: (isPriorityRoot ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: isPriorityRoot ? 1.0 : route.startsWith('/usa') ? 0.9 : 0.8,
      alternates: {
        languages: alternates,
      },
    };
  });
}

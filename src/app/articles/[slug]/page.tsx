import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { articlesData } from '@/data/articlesData';
import { Calendar, Clock } from 'lucide-react';
import { ConsultationButton } from '@/components/ui/ConsultationButton';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return articlesData.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Статья не найдена' };

  return {
    title: `${article.title} | V. I. LEVIN Practice`,
    description: article.excerpt,
    alternates: {
      canonical: `https://vilevin.com/articles/${article.slug}/`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://vilevin.com/articles/${article.slug}/`,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default function ArticleDetailPage({ params }: PageProps) {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) notFound();

  return (
    <div className="py-12 lg:py-20 bg-navy-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <nav className="text-xs text-gray-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-gray-300">Главная</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-gray-300">Статьи</Link>
          <span>/</span>
          <span className="text-gold-400 font-medium truncate">{article.title}</span>
        </nav>

        <header className="space-y-4 border-b border-surface-border pb-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="px-2.5 py-1 rounded-md bg-navy-850 text-gold-400 border border-gold-500/20 font-semibold uppercase">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-white font-bold leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Article content */}
        <article
          className="prose prose-invert prose-gold max-w-none text-gray-300 font-light leading-relaxed text-sm sm:text-base"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Bottom CTA */}
        <div className="pt-8 border-t border-surface-border">
          <div className="p-8 rounded-md bg-navy-900 border border-gold-500/30 text-center space-y-3">
            <h3 className="text-xl font-serif text-white font-bold">
              Нужна правовая оценка вашей ситуации?
            </h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto">
              Задайте вопрос напрямую международному юристу практики V. I. LEVIN.
            </p>
            <div className="pt-2">
              <ConsultationButton serviceCategory={`Статья: ${article.title}`}>
                Получить консультацию
              </ConsultationButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

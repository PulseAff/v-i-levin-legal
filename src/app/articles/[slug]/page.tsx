import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { articlesData } from '@/data/articlesData';
import { Clock, Calendar, ArrowUpRight, MessageSquare, Shield } from 'lucide-react';

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
            <span className="px-2.5 py-1 rounded bg-navy-850 text-gold-400 border border-gold-500/20 font-semibold uppercase">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={13} /> {article.publishedAt}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white font-bold leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
            {article.excerpt}
          </p>
        </header>

        {/* Content Body */}
        <div
          className="prose prose-invert prose-gold max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-6 font-light
          [&>h2]:text-2xl [&>h2]:font-serif [&>h2]:text-white [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-3
          [&>p]:leading-relaxed [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5
          [&>strong]:text-white [&>strong]:font-semibold"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {/* Threads synergy box */}
        <div className="p-6 rounded-xl bg-navy-900 border border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-serif text-white font-bold">
              Обсуждайте кейс в Threads
            </h4>
            <p className="text-xs text-gray-400 mt-1 font-light">
              Авторские заметки, разборы прецедентов и комментарии юриста в экспертном профиле.
            </p>
          </div>
          <a
            href="https://threads.net/@v.i.levin"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-navy-850 hover:bg-navy-800 text-gold-400 border border-gold-500/30 text-xs font-semibold uppercase rounded transition-colors inline-flex items-center gap-1.5 shrink-0"
          >
            Открыть Threads <ArrowUpRight size={14} />
          </a>
        </div>

        {/* CTA */}
        <div className="text-center p-8 rounded-xl bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 space-y-3">
          <h3 className="text-xl font-serif text-white font-bold">
            Нужен персональный правовой анализ?
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto font-light">
            Каждая юридическая ситуация уникальна. Запишитесь на индивидуальный разбор с ведущим специалистом.
          </p>
          <div className="pt-2">
            <a
              href={`https://t.me/V_I_Levin_bot?start=art_${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gold-600 to-gold-500 text-navy-950 text-xs font-semibold uppercase tracking-wider rounded shadow-gold-sm"
            >
              <MessageSquare size={15} /> Разобрать ситуацию в Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

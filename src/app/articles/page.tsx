import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { articlesData } from '@/data/articlesData';
import { Clock, ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Статьи и правовая аналитика | V. I. LEVIN',
  description: 'Аналитические материалы международной практики V. I. LEVIN: прецеденты USCIS, подводные камни контрактов, налоговый комплаенс.',
};

export default function ArticlesPage() {
  return (
    <div className="py-16 lg:py-24 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
            Аналитика и практика
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-bold leading-tight">
            Статьи и исследования
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-4 leading-relaxed font-light">
            Профессиональный разбор сложных правовых вопросов без рекламного шума. Мы пишем о реальном праве, судебной практике и подводных камнях.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articlesData.map((article) => (
            <article
              key={article.slug}
              className="bg-navy-900 border border-surface-border hover:border-gold-500/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-gray-400 mb-3">
                  <span className="text-gold-400 font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} /> {article.readTime}
                  </span>
                </div>

                <h2 className="text-lg font-serif text-white font-bold group-hover:text-gold-300 transition-colors mb-3 leading-snug">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 font-light mb-4">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {article.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-gray-400 px-2 py-0.5 rounded bg-navy-950 border border-surface-border">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500">{article.publishedAt}</span>
                <Link
                  href={`/articles/${article.slug}`}
                  className="font-semibold text-gold-400 group-hover:text-gold-300 inline-flex items-center gap-1 transition-colors"
                >
                  Читать разбор <ArrowUpRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, Clock } from 'lucide-react';
import { articlesData } from '@/data/articlesData';

export const ArticlesSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-navy-900 border-b border-surface-border" id="articles">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-xs font-semibold text-gold-500 tracking-[0.2em] uppercase mb-2">
              Экспертиза и аналитика
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white font-bold">
              Статьи и правовые разборы
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-xl">
              Практические материалы о прецедентах, типичных ошибках заявителей и подводных камнях международных сделок. Читайте также в Threads.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <a
              href="https://threads.net/@v.i.levin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-gray-300 hover:text-white uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
            >
              Threads @v.i.levin <ArrowUpRight size={14} />
            </a>
            <Link
              href="/articles"
              className="text-xs font-semibold text-gold-400 hover:text-gold-300 uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
            >
              Все статьи <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {articlesData.map((article) => (
            <article
              key={article.slug}
              className="bg-navy-950 border border-surface-border hover:border-gold-500/40 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-sm group"
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

                <h3 className="text-base font-serif text-white font-bold group-hover:text-gold-300 transition-colors mb-2.5 leading-snug">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-surface-border flex items-center justify-between text-xs">
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
    </section>
  );
};

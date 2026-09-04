import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Newspaper, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Daily Current Affairs 2026 for SSC, Railway, UPSC & Banking',
  description: 'Daily, weekly and monthly current affairs capsules, scheme summaries and national/international news for competitive exams.',
  canonical: '/current-affairs',
});

export const revalidate = 0;

export default async function CurrentAffairsPage() {
  const articles = await prisma.article.findMany({
    orderBy: { date: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Newspaper className="w-4 h-4" /> Exam-Oriented Daily Digest
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Daily Current Affairs &amp; GK
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Curated national, international, economy, science, sports, and government welfare schemes for competitive examinations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {art.category}
                </span>
                <span className="text-slate-400 text-xs">{formatDate(art.date)}</span>
              </div>
              <Link href={`/current-affairs/${art.slug}`}>
                <h2 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug mb-2">
                  {art.title}
                </h2>
              </Link>
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">GovtPrep Editorial</span>
              <Link
                href={`/current-affairs/${art.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>Read Full Capsule</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

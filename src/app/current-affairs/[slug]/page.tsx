import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import AudioReader from '@/components/common/AudioReader';
import { Newspaper, Calendar, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

interface ArticleDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ArticleDetailsProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });
  if (!article) return { title: 'Article Not Found | GovtPrep India' };
  return constructMetadata({
    title: article.title,
    description: article.excerpt,
    canonical: `/current-affairs/${article.slug}`,
    ogType: 'article',
  });
}

export const revalidate = 0;

export default async function CurrentAffairsDetailsPage({ params }: ArticleDetailsProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  });

  if (!article) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/current-affairs" className="hover:text-blue-600">Current Affairs</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{article.category}</span>
        </nav>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                {article.category}
              </span>
              <span className="text-slate-400 text-xs">{formatDate(article.date)}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Audio Narration Capsule */}
          <AudioReader title={article.title} content={article.content} />

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
            {article.content}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/current-affairs"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Current Affairs
            </Link>
            <Link
              href="/mock-tests"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Practice Daily Current Affairs Quiz →
            </Link>
          </div>
        </article>

        <AdBanner placement="HOMEPAGE_MID" />
      </div>
    </div>
  );
}

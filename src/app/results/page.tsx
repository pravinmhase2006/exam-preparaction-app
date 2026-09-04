import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Sarkari Results 2026 - Latest Govt Exam Cutoff & Merit Lists',
  description: 'Check latest government examination results, tier-wise cutoff marks, scorecards and qualified candidates merit lists.',
  canonical: '/results',
});

export const revalidate = 0;

export default async function ResultsPage() {
  const results = await prisma.result.findMany({
    include: { organization: true },
    orderBy: { resultDate: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Result Announcements
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Government Exam Results 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Latest official results, category-wise cutoff marks, direct merit list PDF downloads and score verification links.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm">
            Announced &amp; Expected Results ({results.length})
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {results.map((r) => (
            <div
              key={r.id}
              className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {r.organization.shortName}
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                    {r.status}
                  </span>
                  <span className="text-slate-400 text-xs">Announced: {formatDate(r.resultDate)}</span>
                </div>
                <Link href={`/results/${r.slug}`}>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {r.title}
                  </h3>
                </Link>
                {r.cutoffDetails && (
                  <p className="text-xs text-slate-500 line-clamp-1">
                    Cutoff: {r.cutoffDetails}
                  </p>
                )}
              </div>

              <Link
                href={`/results/${r.slug}`}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Check Result</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

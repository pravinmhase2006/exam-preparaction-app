import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Ticket, ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Admit Card 2026 - Download Sarkari Exam Hall Tickets & Call Letters',
  description: 'Download latest government exam admit cards, city intimation slips and hall tickets with direct official links.',
  canonical: '/admit-cards',
});

export const revalidate = 0;

export default async function AdmitCardsPage() {
  const admitCards = await prisma.admitCard.findMany({
    include: { organization: true },
    orderBy: { releaseDate: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-blue-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Ticket className="w-4 h-4" /> Hall Tickets &amp; City Intimation
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Latest Admit Cards 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Download your examination hall tickets, view exam dates, test venue shift timings and exam day guidelines.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm">
            Active Admit Cards &amp; Call Letters ({admitCards.length})
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {admitCards.map((a) => (
            <div
              key={a.id}
              className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded-lg border border-blue-200">
                    {a.organization.shortName}
                  </span>
                  <span className="text-slate-400 text-xs">Exam Date: <strong>{a.examDate}</strong></span>
                </div>
                <Link href={`/admit-cards/${a.slug}`}>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {a.title}
                  </h3>
                </Link>
                {a.applicationRequirements && (
                  <p className="text-xs text-slate-500">
                    Login using: {a.applicationRequirements}
                  </p>
                )}
              </div>

              <Link
                href={`/admit-cards/${a.slug}`}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Download Card</span>
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

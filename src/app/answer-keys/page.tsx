import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Key, ExternalLink } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Official Answer Keys 2026 - Question Papers & Response Sheets',
  description: 'Download provisional and final answer keys, response sheets and submit objections for SSC, Railway, Banking and Teaching exams.',
  canonical: '/answer-keys',
});

export const revalidate = 0;

export default async function AnswerKeysPage() {
  const answerKeys = await prisma.answerKey.findMany({
    include: { organization: true },
    orderBy: { releaseDate: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-950 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Key className="w-4 h-4" /> Official Response Sheets &amp; Keys
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Government Exam Answer Keys 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Download provisional answer keys, calculate your expected raw marks and submit question challenge objections before the deadline.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm">
            Active Answer Keys &amp; Objection Windows ({answerKeys.length})
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {answerKeys.map((ak) => (
            <div
              key={ak.id}
              className="p-5 sm:p-6 hover:bg-slate-50/80 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-50 text-amber-800 font-bold text-xs px-2.5 py-0.5 rounded-lg border border-amber-200">
                    {ak.organization.shortName}
                  </span>
                  <span className="text-slate-400 text-xs">Released: {formatDate(ak.releaseDate)}</span>
                  {ak.objectionDeadline && (
                    <span className="text-rose-700 bg-rose-50 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-200">
                      Objection Deadline: {ak.objectionDeadline}
                    </span>
                  )}
                </div>
                <Link href={`/answer-keys/${ak.slug}`}>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors">
                    {ak.title}
                  </h3>
                </Link>
              </div>

              <Link
                href={`/answer-keys/${ak.slug}`}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>View Key &amp; Objections</span>
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

import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { FileText, Download, CheckCircle2, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Previous Year Question Papers PDF - SSC, Railway, Bank, UPSC',
  description: 'Download previous year question papers with official answer keys and solutions in PDF format for practice.',
  canonical: '/previous-papers',
});

export const revalidate = 0;

export default async function PreviousPapersPage() {
  const papers = await prisma.previousPaper.findMany({
    include: { exam: { include: { organization: true } } },
    orderBy: { year: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> Solved Papers Library
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Previous Year Question Papers
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Download shift-wise question papers with official answer keys and detailed solution explanations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {papers.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {p.exam.name} • Year {p.year}
                </span>
                <span className="text-slate-400 text-xs">{p.shift}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {p.title}
              </h2>
              <div className="text-xs text-slate-500 space-y-1">
                <p>Language: <strong>{p.language}</strong></p>
                <p>Total Questions: <strong>{p.questionsCount} Questions</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <a
                href={p.pdfUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Download Paper PDF
              </a>
              <Link
                href="/mock-tests"
                className="text-xs font-semibold text-slate-600 hover:text-blue-600"
              >
                Practice as Mock Test →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />
    </div>
  );
}

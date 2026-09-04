import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Award, Calendar, ExternalLink, Download, FileText, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

interface ResultDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ResultDetailsProps) {
  const result = await prisma.result.findUnique({
    where: { slug: params.slug },
    include: { organization: true },
  });
  if (!result) return { title: 'Result Not Found | GovtPrep India' };
  return constructMetadata({
    title: `${result.title} - Official Merit List & Cutoff Marks`,
    description: `Check ${result.title} released by ${result.organization.name}. Category-wise cutoff marks, scorecard and merit list download.`,
    canonical: `/results/${result.slug}`,
  });
}

export const revalidate = 0;

export default async function ResultDetailsPage({ params }: ResultDetailsProps) {
  const result = await prisma.result.findUnique({
    where: { slug: params.slug },
    include: { organization: true, exam: true },
  });

  if (!result) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/results" className="hover:text-blue-600">Results</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{result.organization.shortName}</span>
        </nav>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200">
                {result.organization.name}
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg">
                Status: {result.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {result.title}
            </h1>
            <p className="text-xs text-slate-500">
              Declaration Date: <strong>{formatDate(result.resultDate)}</strong>
            </p>
          </div>

          {result.cutoffDetails && (
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2">
              <h3 className="text-sm font-bold text-slate-900">Category-Wise Cutoff Marks</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
                {result.cutoffDetails}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
            {result.meritListUrl && (
              <a
                href={result.meritListUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official Merit List PDF
              </a>
            )}
            {result.officialResultUrl && (
              <a
                href={result.officialResultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-2"
              >
                <span>Check on Official Portal</span>
                <ExternalLink className="w-4 h-4 text-slate-600" />
              </a>
            )}
          </div>
        </div>

        <AdBanner placement="HOMEPAGE_MID" />

      </div>
    </div>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Key, Calendar, ExternalLink, Download, AlertTriangle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

interface AnswerKeyDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AnswerKeyDetailsProps) {
  const answerKey = await prisma.answerKey.findUnique({
    where: { slug: params.slug },
    include: { organization: true },
  });
  if (!answerKey) return { title: 'Answer Key Not Found | GovtPrep India' };
  return constructMetadata({
    title: `${answerKey.title} - Response Sheet & PDF Download`,
    description: `Check ${answerKey.title} released by ${answerKey.organization.name}. Question paper PDF and objection link.`,
    canonical: `/answer-keys/${answerKey.slug}`,
  });
}

export const revalidate = 0;

export default async function AnswerKeyDetailsPage({ params }: AnswerKeyDetailsProps) {
  const answerKey = await prisma.answerKey.findUnique({
    where: { slug: params.slug },
    include: { organization: true, exam: true },
  });

  if (!answerKey) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/answer-keys" className="hover:text-blue-600">Answer Keys</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{answerKey.organization.shortName}</span>
        </nav>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-200">
                {answerKey.organization.name}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                Status: {answerKey.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {answerKey.title}
            </h1>
            <p className="text-xs text-slate-500">
              Release Date: <strong>{formatDate(answerKey.releaseDate)}</strong>
            </p>
          </div>

          {answerKey.objectionDeadline && (
            <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900">
                <p className="font-bold">Important Objection Window Deadline:</p>
                <p>Candidates can challenge representations online up to <strong>{answerKey.objectionDeadline}</strong>. A fee of ₹100 per question is charged by the commission which is refunded if the objection is sustained.</p>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4">
            {answerKey.pdfUrl && (
              <a
                href={answerKey.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official Answer Key PDF
              </a>
            )}
            {answerKey.objectionUrl && (
              <a
                href={answerKey.objectionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-2"
              >
                <span>Submit Representation / Challenge</span>
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

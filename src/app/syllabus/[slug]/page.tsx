import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen, Download } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

interface SyllabusDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: SyllabusDetailsProps) {
  const syllabus = await prisma.syllabus.findUnique({
    where: { slug: params.slug },
    include: { exam: true },
  });
  if (!syllabus) return { title: 'Syllabus Not Found | GovtPrep India' };
  return constructMetadata({
    title: `${syllabus.title}`,
    description: `Complete topic-wise curriculum and section syllabus for ${syllabus.exam.name}.`,
    canonical: `/syllabus/${syllabus.slug}`,
  });
}

export const revalidate = 0;

export default async function SyllabusDetailsPage({ params }: SyllabusDetailsProps) {
  const syllabus = await prisma.syllabus.findUnique({
    where: { slug: params.slug },
    include: { exam: { include: { organization: true } } },
  });

  if (!syllabus) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/syllabus" className="hover:text-blue-600">Syllabus</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{syllabus.exam.name}</span>
        </nav>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
          <div className="space-y-2 border-b border-slate-100 pb-6">
            <span className="px-3 py-1 bg-purple-50 text-purple-800 text-xs font-bold rounded-lg border border-purple-200">
              {syllabus.exam.name} • {syllabus.tier}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {syllabus.title}
            </h1>
          </div>

          {/* Formatted Markdown Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4 whitespace-pre-line">
            {syllabus.content}
          </div>

          <div className="pt-6 border-t border-slate-100">
            <Link
              href={`/mock-tests`}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors inline-flex items-center gap-2"
            >
              Practice Related Mock Tests Free →
            </Link>
          </div>
        </div>

        <AdBanner placement="HOMEPAGE_MID" />
      </div>
    </div>
  );
}

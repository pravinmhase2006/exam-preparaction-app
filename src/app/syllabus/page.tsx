import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government Exam Syllabus 2026 - Subject-Wise Topics & Scheme',
  description: 'Download latest exam-wise syllabus for SSC, Railway, Banking, UPSC and State PSC exams with topic-wise marks distribution.',
  canonical: '/syllabus',
});

export const revalidate = 0;

export default async function SyllabusDirectoryPage() {
  const syllabi = await prisma.syllabus.findMany({
    include: { exam: { include: { organization: true } } },
    orderBy: { updatedAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-purple-300 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Curriculum &amp; Exam Patterns
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Exam-Wise Detailed Syllabus 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Download complete topic breakdown, chapter marks weightage, negative marking rules and tier-wise syllabus.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {syllabi.map((s) => (
          <div
            key={s.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-purple-500 transition-all flex flex-col justify-between group"
          >
            <div>
              <span className="px-2.5 py-1 bg-purple-50 text-purple-800 text-xs font-bold rounded-lg border border-purple-200">
                {s.exam.name} • {s.tier}
              </span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors mt-3 mb-2">
                {s.title}
              </h2>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">Updated for 2026 Pattern</span>
              <Link
                href={`/syllabus/${s.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-800"
              >
                <span>Read Full Syllabus</span>
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

import React from 'react';
import prisma from '@/lib/db';
import ExamCard from '@/components/exams/ExamCard';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government Exams Directory 2026 - Syllabus, Pattern & Mock Tests',
  description: 'Complete guide for major Indian government examinations: SSC, Railway, Banking, UPSC, Defence and State PSC with pattern, eligibility and previous papers.',
  canonical: '/exams',
});

export const revalidate = 0;

export default async function ExamsPage() {
  const exams = await prisma.exam.findMany({
    include: { organization: true },
    orderBy: { isPopular: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Exam Preparation Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Government Exams Guide 2026
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Detailed syllabus, examination pattern, eligibility criteria, previous year question papers, and free mock test series.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <ExamCard key={exam.id} exam={exam as any} />
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

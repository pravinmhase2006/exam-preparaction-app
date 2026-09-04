import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import RecommendedBooks from '@/components/common/RecommendedBooks';
import {
  BookOpen,
  Calendar,
  GraduationCap,
  ExternalLink,
  Award,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

interface ExamDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ExamDetailsPageProps) {
  const exam = await prisma.exam.findUnique({
    where: { slug: params.slug },
    include: { organization: true },
  });

  if (!exam) return { title: 'Exam Not Found | GovtPrep India' };

  return constructMetadata({
    title: `${exam.name} - Complete Syllabus, Exam Pattern & Mock Tests`,
    description: `Complete guide for ${exam.name} conducted by ${exam.organization.name}. Eligibility, age limit, syllabus breakdown, previous year question papers and mock tests.`,
    canonical: `/exams/${exam.slug}`,
  });
}

export const revalidate = 0;

export default async function ExamDetailsPage({ params }: ExamDetailsPageProps) {
  const exam = await prisma.exam.findUnique({
    where: { slug: params.slug },
    include: {
      organization: true,
      mockTests: true,
      previousPapers: true,
      syllabi: true,
    },
  });

  if (!exam) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/exams" className="hover:text-blue-600">Exams</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold">{exam.name}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                {exam.category}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                {exam.organization.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900">{exam.name}</h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{exam.description}</p>
          </div>

          <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
            {exam.mockTests.length > 0 && (
              <Link
                href={`/mock-tests/${exam.mockTests[0].slug}`}
                className="px-6 py-3 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs rounded-2xl shadow transition-colors flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4" /> Start Free Mock Test
              </Link>
            )}
            {exam.officialWebsite && (
              <a
                href={exam.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* 2-Column Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Eligibility & Pattern */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                Eligibility &amp; Age Limit
              </h2>
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p><strong>Educational Qualification:</strong> {exam.eligibility || 'Graduate Degree or as prescribed in notification.'}</p>
                <p><strong>Age Limits:</strong> {exam.ageLimit || '18 to 32 Years with relaxations for reserved categories.'}</p>
                <p><strong>Frequency:</strong> {exam.frequency} Examination cycle.</p>
              </div>
            </div>

            {/* Syllabus Overview */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" />
                Syllabus &amp; Exam Scheme Overview
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {exam.syllabusOverview || 'Tier 1 Objective Multiple Choice -> Tier 2 Comprehensive -> Document Verification.'}
              </p>
            </div>

            {/* Preparation Tips */}
            {exam.preparationTips && (
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-3">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  Expert Preparation Strategy
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {exam.preparationTips}
                </p>
              </div>
            )}

          </div>

          {/* Right Sidebar: Mock Tests & Papers */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-saffron-500" />
                Available Mock Tests ({exam.mockTests.length})
              </h3>
              <div className="space-y-3 text-xs">
                {exam.mockTests.map((t) => (
                  <Link
                    key={t.id}
                    href={`/mock-tests/${t.slug}`}
                    className="block p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-colors group"
                  >
                    <h4 className="font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2">
                      {t.title}
                    </h4>
                    <span className="text-slate-400 block mt-1">⏱ {t.durationMinutes} Mins • 📝 {t.totalQuestions} Questions</span>
                  </Link>
                ))}
              </div>
            </div>

            <RecommendedBooks examCategory={exam.category} />

            <AdBanner placement="JOB_SIDEBAR" />

          </div>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Award, Clock, FileCheck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Free All-India Mock Tests 2026 - SSC, Railway, Banking, Police',
  description: 'Practice real exam CBT interface mock tests with live countdown timers, negative marking, bilingual Hindi/English questions and detailed step-by-step solutions.',
  canonical: '/mock-tests',
});

export const revalidate = 0;

export default async function MockTestsDirectoryPage() {
  const tests = await prisma.mockTest.findMany({
    where: { isPublished: true },
    include: {
      exam: { include: { organization: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-navy-900 to-slate-950 rounded-3xl p-6 sm:p-10 text-white shadow-card relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <span className="bg-saffron-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free All-India Live Test Engine
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black">
            Government Exam Mock Tests
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Real examination computer-based simulation with instant score calculation, accuracy percentage, time tracking, and comprehensive bilingual solutions.
          </p>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-elevated hover:border-blue-500 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                  {test.exam.category} • {test.exam.organization.shortName}
                </span>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Test
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2">
                {test.title}
              </h2>

              <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                {test.description}
              </p>

              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs text-slate-600 mb-6">
                <div className="flex flex-col">
                  <span className="text-slate-400">Duration</span>
                  <span className="font-bold text-slate-800">{test.durationMinutes} Minutes</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Questions</span>
                  <span className="font-bold text-slate-800">{test.totalQuestions} Qs</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-400">Total Marks</span>
                  <span className="font-bold text-slate-800">{test.totalMarks} Marks</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {test.attemptsCount.toLocaleString()}+ Aspirants Attempted
              </span>
              <Link
                href={`/mock-tests/${test.slug}`}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 group-hover:scale-105"
              >
                <span>Take Test Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

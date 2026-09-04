import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import JobCard from '@/components/jobs/JobCard';
import ExamCard from '@/components/exams/ExamCard';
import TechJobCard from '@/components/tech/TechJobCard';
import AdBanner from '@/components/ads/AdBanner';
import QuestionOfTheDay from '@/components/common/QuestionOfTheDay';
import JobAlertModal from '@/components/common/JobAlertModal';
import {
  Search,
  ArrowRight,
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Building2,
  Train,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Bell,
  HelpCircle,
  FileText,
  Clock,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0; // Fresh updates

export default async function HomePage() {
  // Fetch real data from Prisma
  const [
    featuredJobs,
    latestJobs,
    popularExams,
    latestResults,
    latestAdmitCards,
    latestAnswerKeys,
    mockTests,
    currentAffairs,
    latestTechJobs,
  ] = await Promise.all([
    prisma.job.findMany({
      where: { status: 'PUBLISHED', isFeatured: true },
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.job.findMany({
      where: { status: 'PUBLISHED' },
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    }),
    prisma.exam.findMany({
      where: { isPopular: true },
      include: { organization: true },
      take: 4,
    }),
    prisma.result.findMany({
      include: { organization: true },
      orderBy: { resultDate: 'desc' },
      take: 5,
    }),
    prisma.admitCard.findMany({
      include: { organization: true },
      orderBy: { releaseDate: 'desc' },
      take: 5,
    }),
    prisma.answerKey.findMany({
      include: { organization: true },
      orderBy: { releaseDate: 'desc' },
      take: 5,
    }),
    prisma.mockTest.findMany({
      where: { isPublished: true },
      include: { exam: true },
      take: 2,
    }),
    prisma.article.findMany({
      where: { isFeatured: true },
      orderBy: { date: 'desc' },
      take: 2,
    }),
    prisma.techJob.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
  ]);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-navy-900 to-slate-950 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
        {/* Subtle Decorative Grid & Orbs */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-800/60 border border-blue-600/50 text-blue-200 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Over 1,75,000+ Government Vacancies Active Today</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
            Latest Government Jobs &amp; <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-saffron-400">
              Exam Preparation Portal
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Find official recruitment notifications, exam schedules, Sarkari results, admit cards and prepare with All-India live free mock tests.
          </p>

          {/* Hero Search Box */}
          <div className="max-w-3xl mx-auto pt-2">
            <form action="/search" method="GET" className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                name="q"
                placeholder="Search jobs, exams, organizations (e.g., SSC CGL, RRB NTPC, 10th Pass)..."
                className="w-full pl-12 pr-32 py-4 bg-white text-slate-900 rounded-2xl sm:rounded-full text-sm sm:text-base font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 border-0"
              />
              <button
                type="submit"
                className="absolute right-2 sm:right-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-6 py-2.5 sm:py-3 rounded-full shadow transition-all"
              >
                Find Jobs
              </button>
            </form>

            {/* Quick Qualification Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-medium">
              <span className="text-slate-400 text-xs">Popular Filters:</span>
              {[
                { label: '10th Pass', href: '/qualification/10th-pass' },
                { label: '12th Pass', href: '/qualification/12th-pass' },
                { label: 'Graduate', href: '/qualification/graduate' },
                { label: 'Diploma', href: '/qualification/diploma' },
                { label: 'ITI Jobs', href: '/qualification/iti' },
                { label: 'Railway RRB', href: '/jobs?category=railway-jobs' },
                { label: 'Banking', href: '/jobs?category=banking-jobs' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-700 hover:border-blue-500 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TOP ADVERTISEMENT BANNER */}
      <AdBanner placement="TOP_BANNER" />

      {/* 3. LATEST GOVERNMENT JOBS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Fresh Recruitment Notices
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Latest Government Jobs 2026
            </h2>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <span>View All Jobs ({latestJobs.length}+ Active)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestJobs.map((job) => (
            <JobCard key={job.id} job={job as any} />
          ))}
        </div>
      </section>

      {/* IT & TECH CAREERS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1.5">
              <span>💻</span> Engineering &amp; IT Opportunities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Software &amp; Technology Jobs
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/internships"
              className="text-xs font-bold text-emerald-600 hover:underline"
            >
              Tech Internships →
            </Link>
            <Link
              href="/tech-jobs"
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Explore All IT Jobs →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTechJobs.map((tj) => (
            <TechJobCard key={tj.id} job={tj} />
          ))}
        </div>
      </section>

      {/* 4. POPULAR EXAMS DIRECTORY */}
      <section className="bg-slate-100/70 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Exam Preparation Hub
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Popular Government Exams
              </h2>
            </div>
            <Link
              href="/exams"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              All Exams Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularExams.map((exam) => (
              <ExamCard key={exam.id} exam={exam as any} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3-COLUMN LIVE HUB: RESULTS, ADMIT CARDS, ANSWER KEYS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Real-time Status Updates
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Sarkari Results, Admit Cards &amp; Answer Keys
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Column 1: Latest Results */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    🏆
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Latest Results</h3>
                </div>
                <Link href="/results" className="text-xs text-blue-600 hover:underline font-semibold">
                  View All →
                </Link>
              </div>

              <ul className="divide-y divide-slate-100 text-xs">
                {latestResults.map((r) => (
                  <li key={r.id} className="py-2.5 group">
                    <Link href={`/results/${r.slug}`} className="block">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          {r.organization.shortName}
                        </span>
                        <span className="text-slate-400 text-[10px]">{formatDate(r.resultDate)}</span>
                      </div>
                      <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {r.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/results"
              className="mt-4 block text-center py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              Check All Results
            </Link>
          </div>

          {/* Column 2: Admit Cards */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                    🎫
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Admit Cards</h3>
                </div>
                <Link href="/admit-cards" className="text-xs text-blue-600 hover:underline font-semibold">
                  View All →
                </Link>
              </div>

              <ul className="divide-y divide-slate-100 text-xs">
                {latestAdmitCards.map((a) => (
                  <li key={a.id} className="py-2.5 group">
                    <Link href={`/admit-cards/${a.slug}`} className="block">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          {a.organization.shortName}
                        </span>
                        <span className="text-slate-400 text-[10px]">Exam: {a.examDate}</span>
                      </div>
                      <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {a.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/admit-cards"
              className="mt-4 block text-center py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              Download Admit Cards
            </Link>
          </div>

          {/* Column 3: Answer Keys */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    🔑
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">Answer Keys</h3>
                </div>
                <Link href="/answer-keys" className="text-xs text-blue-600 hover:underline font-semibold">
                  View All →
                </Link>
              </div>

              <ul className="divide-y divide-slate-100 text-xs">
                {latestAnswerKeys.map((ak) => (
                  <li key={ak.id} className="py-2.5 group">
                    <Link href={`/answer-keys/${ak.slug}`} className="block">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-slate-100 text-slate-700 font-bold px-1.5 py-0.2 rounded text-[10px]">
                          {ak.organization.shortName}
                        </span>
                        <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-1 rounded">
                          {ak.status}
                        </span>
                      </div>
                      <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {ak.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/answer-keys"
              className="mt-4 block text-center py-2 bg-slate-50 hover:bg-blue-50 text-blue-600 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
            >
              View Official Answer Keys
            </Link>
          </div>

        </div>
      </section>

      {/* 6. FREE MOCK TEST SPOTLIGHT */}
      <section className="bg-gradient-to-r from-navy-900 via-blue-900 to-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-xl">
            <span className="bg-saffron-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              100% Free Preparation Engine
            </span>
            <h2 className="text-2xl sm:text-4xl font-black leading-tight">
              Test Your Preparation with All-India Mock Tests
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience the authentic online CBT exam interface with real-time countdown timer, bilingual questions (English/Hindi), instant scorecards, and step-by-step solutions.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real Exam Interface
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Negative Marking Engine
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Detailed Explanations
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full lg:max-w-md">
            {mockTests.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex flex-col justify-between hover:bg-white/15 transition-all"
              >
                <div>
                  <span className="text-[10px] font-bold text-saffron-400 bg-saffron-900/50 px-2 py-0.5 rounded">
                    {t.exam.category}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2 line-clamp-2">
                    {t.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-slate-300 my-3">
                    <span>⏱ {t.durationMinutes} Mins</span>
                    <span>•</span>
                    <span>📝 {t.totalQuestions} Qs</span>
                  </div>
                </div>

                <Link
                  href={`/mock-tests/${t.slug}`}
                  className="w-full text-center py-2 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Start Test Free →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Question of the Day Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuestionOfTheDay />
      </section>

      {/* 7. CURRENT AFFAIRS & STUDY MATERIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 border-b border-slate-200 pb-4">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Daily Digest
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              Current Affairs &amp; Study Notes
            </h2>
          </div>
          <Link
            href="/current-affairs"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            All Current Affairs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentAffairs.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
                    {art.category}
                  </span>
                  <span className="text-slate-400 text-xs">{formatDate(art.date)}</span>
                </div>
                <Link href={`/current-affairs/${art.slug}`}>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors mb-2 leading-snug">
                    {art.title}
                  </h3>
                </Link>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <span className="text-xs text-slate-400">GovtPrep Editorial Team</span>
                <Link
                  href={`/current-affairs/${art.slug}`}
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Read Digest →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7.5 ASPIRANT PREP & PRODUCTIVITY SUITE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 border-b border-white/10 pb-6 mb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-semibold border border-indigo-400/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Free Candidate Tool Suite
              </div>
              <h2 className="text-2xl sm:text-3xl font-black">
                Comprehensive Aspirant Preparation Tools
              </h2>
              <p className="text-indigo-100/80 text-xs sm:text-sm max-w-2xl">
                Boost your score and crack tier-1/tier-2 cutoffs with our interactive preparation utilities built specifically for Indian exam patterns.
              </p>
            </div>
            <div>
              <JobAlertModal />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            <Link 
              href="/typing-test"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-indigo-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-lg mb-3">
                  ⌨️
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                  Typing Speed Test Simulator
                </h3>
                <p className="text-xs text-indigo-100/70 mt-1 leading-relaxed">
                  Real DEST mode with backspace control & error analysis for SSC CGL, CHSL, and RRB NTPC.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-emerald-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Start Typing Test →
              </div>
            </Link>

            <Link 
              href="/flashcards"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-purple-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black text-lg mb-3">
                  🎴
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                  3D Flashcards & Formula Deck
                </h3>
                <p className="text-xs text-indigo-100/70 mt-1 leading-relaxed">
                  Spaced repetition cards for Indian Polity Articles, Static GK, Math Shortcuts, and Tech fundamentals.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-purple-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Review Flashcards →
              </div>
            </Link>

            <Link 
              href="/study-planner"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-amber-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-lg mb-3">
                  📅
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  Syllabus Tracker & Planner
                </h3>
                <p className="text-xs text-indigo-100/70 mt-1 leading-relaxed">
                  Chapter-wise weightage tracker, target countdown timers, and personalized daily revision goals.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Study Tracker →
              </div>
            </Link>

            <Link 
              href="/resume-builder"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-sky-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center font-black text-lg mb-3">
                  📝
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-sky-300 transition-colors">
                  AI Resume & Biodata Maker
                </h3>
                <p className="text-xs text-indigo-100/70 mt-1 leading-relaxed">
                  Standard Govt Biodata & Modern Tech SDE ATS-friendly resume generator with live PDF print.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-sky-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Build My Biodata →
              </div>
            </Link>

            <Link 
              href="/compare"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-blue-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-black text-lg mb-3">
                  ⚔️
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                  Career & Exam Comparator
                </h3>
                <p className="text-xs text-indigo-100/70 mt-1 leading-relaxed">
                  Compare in-hand salary, syllabus overlap, promotions, and work-life balance side-by-side.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-blue-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Compare Careers →
              </div>
            </Link>

            <Link 
              href="/leaderboard"
              className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:border-saffron-400 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-lg mb-3">
                  🏆
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors">
                  All-India Leaderboard
                </h3>
                <p className="text-xs text-indigo-100/70 mt-1 leading-relaxed">
                  Real-time rank, accuracy benchmarks, percentile rankings, and aspirant streaks across India.
                </p>
              </div>
              <div className="mt-4 text-xs font-bold text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                View All-India Ranks →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Help &amp; Queries
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          <details className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm group">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
              <span>How frequently is GovtPrep India recruitment data updated?</span>
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Our editorial team tracks official government gazettes, state commission releases, and central recruitment portals round the clock. New job posts, result updates, and admit cards are published within minutes of official notification.
            </p>
          </details>

          <details className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm group">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
              <span>Are the Mock Tests on GovtPrep India free of charge?</span>
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Yes, all preliminary mock tests, sectional practice sets, and daily quizzes are completely free for all registered aspirants with instant bilingual explanations.
            </p>
          </details>

          <details className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm group">
            <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
              <span>How do I set up personalized job alerts matching my qualification?</span>
              <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Create a free candidate profile, choose your highest qualification (10th, 12th, Graduate, etc.) and preferred states in your Dashboard to receive automated alerts whenever relevant jobs are published.
            </p>
          </details>
        </div>
      </section>

    </div>
  );
}

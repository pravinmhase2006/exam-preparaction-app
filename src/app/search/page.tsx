import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import JobCard from '@/components/jobs/JobCard';
import ExamCard from '@/components/exams/ExamCard';
import { Search, Briefcase, BookOpen, Award, Ticket, Newspaper, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Search Government Jobs & Exams',
  description: 'Search across active jobs, notifications, results, admit cards, syllabus and mock tests on GovtPrep India.',
  canonical: '/search',
});

export const revalidate = 0;

interface SearchPageProps {
  searchParams: { q?: string };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';

  if (!query) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Search GovtPrep India</h1>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Type keywords like SSC, RRB, 10th Pass, Banking, Police, Result or Admit Card to search all resources.
        </p>
        <form action="/search" method="GET" className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            name="q"
            placeholder="Search jobs, exams..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 text-white font-bold text-sm rounded-xl shadow"
          >
            Search
          </button>
        </form>
      </div>
    );
  }

  const [jobs, exams, results, admitCards, articles, mockTests] = await Promise.all([
    prisma.job.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: query } },
          { qualification: { contains: query } },
          { department: { contains: query } },
          { organization: { name: { contains: query } } },
          { organization: { shortName: { contains: query } } },
        ],
      },
      include: { organization: true },
      take: 6,
    }),
    prisma.exam.findMany({
      where: {
        OR: [
          { name: { contains: query } },
          { category: { contains: query } },
          { organization: { name: { contains: query } } },
        ],
      },
      include: { organization: true },
      take: 4,
    }),
    prisma.result.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { organization: { shortName: { contains: query } } },
        ],
      },
      include: { organization: true },
      take: 4,
    }),
    prisma.admitCard.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { organization: { shortName: { contains: query } } },
        ],
      },
      include: { organization: true },
      take: 4,
    }),
    prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { category: { contains: query } },
          { content: { contains: query } },
        ],
      },
      take: 4,
    }),
    prisma.mockTest.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: { exam: { include: { organization: true } } },
      take: 4,
    }),
  ]);

  const totalResults =
    jobs.length + exams.length + results.length + admitCards.length + articles.length + mockTests.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-4">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          Search Results for: <span className="text-blue-600 font-extrabold">"{query}"</span>
        </h1>
        <p className="text-xs text-slate-500">
          Found <strong>{totalResults}</strong> matching results across Government Jobs, Exams, Results, Admit Cards &amp; Mock Tests.
        </p>
      </div>

      {totalResults === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
          No records matched your search query. Try another keyword like "SSC", "Railway", "10th", "Bank".
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Jobs Results */}
          {jobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" /> Government Jobs ({jobs.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job as any} />
                ))}
              </div>
            </div>
          )}

          {/* Exams Results */}
          {exams.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-600" /> Government Exams ({exams.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {exams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam as any} />
                ))}
              </div>
            </div>
          )}

          {/* Mock Tests Results */}
          {mockTests.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-5 h-5 text-saffron-500" /> Free Mock Tests ({mockTests.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTests.map((t) => (
                  <div
                    key={t.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{t.title}</h4>
                      <span className="text-xs text-slate-400">⏱ {t.durationMinutes} Mins • {t.totalQuestions} Questions</span>
                    </div>
                    <Link
                      href={`/mock-tests/${t.slug}`}
                      className="px-4 py-1.5 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs rounded-xl shadow"
                    >
                      Start Test
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results & Admit Cards Combined Grid */}
          {(results.length > 0 || admitCards.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" /> Results ({results.length})
                  </h3>
                  <ul className="divide-y divide-slate-100 text-xs">
                    {results.map((r) => (
                      <li key={r.id} className="py-2">
                        <Link href={`/results/${r.slug}`} className="font-semibold text-slate-800 hover:text-blue-600 block">
                          {r.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {admitCards.length > 0 && (
                <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-blue-600" /> Admit Cards ({admitCards.length})
                  </h3>
                  <ul className="divide-y divide-slate-100 text-xs">
                    {admitCards.map((a) => (
                      <li key={a.id} className="py-2">
                        <Link href={`/admit-cards/${a.slug}`} className="font-semibold text-slate-800 hover:text-blue-600 block">
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import JobCard from '@/components/jobs/JobCard';
import {
  Flame,
  Award,
  Bookmark,
  Calendar,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function CandidateDashboardOverview() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [profile, bookmarks, testAttempts, recommendedJobs, upcomingExams] = await Promise.all([
    prisma.profile.findUnique({ where: { userId: user.id } }),
    prisma.bookmark.findMany({ where: { userId: user.id } }),
    prisma.testAttempt.findMany({
      where: { userId: user.id },
      include: { mockTest: { include: { exam: true } } },
      orderBy: { createdAt: 'desc' },
      take: 3,
    }),
    prisma.job.findMany({
      where: {
        status: 'PUBLISHED',
      },
      include: { organization: true },
      take: 4,
    }),
    prisma.exam.findMany({
      where: { isPopular: true },
      take: 2,
    }),
  ]);

  const avgScore =
    testAttempts.length > 0
      ? Math.round(testAttempts.reduce((acc, t) => acc + t.percentage, 0) / testAttempts.length)
      : 0;

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-saffron-500 text-white text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-current" /> {profile?.prepStreak || 3} Days Streak
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black">
              Welcome back, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Target Qualification: <strong>{profile?.qualification || 'Graduate'}</strong> • Target Year: <strong>2026</strong>
            </p>
          </div>

          <Link
            href="/mock-tests"
            className="px-5 py-2.5 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs rounded-xl shadow transition-colors shrink-0 text-center"
          >
            Start Today's Mock Test →
          </Link>
        </div>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Saved Bookmarks</span>
          <span className="text-2xl font-black text-slate-900 mt-1">{bookmarks.length}</span>
          <span className="text-[11px] text-blue-600 mt-1 font-medium">Jobs &amp; Notes</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Tests Attempted</span>
          <span className="text-2xl font-black text-slate-900 mt-1">{testAttempts.length}</span>
          <span className="text-[11px] text-emerald-600 mt-1 font-medium">All-India CBT</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Average Score</span>
          <span className="text-2xl font-black text-slate-900 mt-1">{avgScore}%</span>
          <span className="text-[11px] text-amber-600 mt-1 font-medium">Top 15% Percentile</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <span className="text-xs font-semibold text-slate-500">Target Goal</span>
          <span className="text-xl font-black text-blue-600 mt-1 truncate">SSC &amp; Railway</span>
          <span className="text-[11px] text-slate-400 mt-1 font-medium">Goal 2026</span>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-600" />
            Recommended Jobs Matching Your Profile ({profile?.qualification || 'Graduate'})
          </h2>
          <Link href="/jobs" className="text-xs font-bold text-blue-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendedJobs.slice(0, 2).map((job) => (
            <JobCard key={job.id} job={job as any} />
          ))}
        </div>
      </div>

      {/* Recent Test Attempts */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-saffron-500" /> Recent Mock Test Results
          </h2>
          <Link href="/dashboard/mock-tests" className="text-xs font-bold text-blue-600 hover:underline">
            View All History →
          </Link>
        </div>

        {testAttempts.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-500">
            You haven't attempted any mock tests yet.{' '}
            <Link href="/mock-tests" className="text-blue-600 font-bold underline">
              Take your first free test now!
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 text-xs">
            {testAttempts.map((ta) => (
              <div key={ta.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{ta.mockTest.title}</h4>
                  <span className="text-slate-400">
                    Attempted on {formatDate(ta.createdAt)} • Accuracy: {ta.accuracy}%
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-black text-emerald-600 block">
                    {ta.score} / {ta.totalMarks}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {ta.percentage}% Score
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Award, CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function DashboardMockTestsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const attempts = await prisma.testAttempt.findMany({
    where: { userId: user.id },
    include: {
      mockTest: {
        include: { exam: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Mock Test History &amp; Scorecards</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review your past mock test attempts, sectional accuracy and percentile ranking.
          </p>
        </div>
        <Link
          href="/mock-tests"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow"
        >
          Attempt New Mock Test →
        </Link>
      </div>

      {attempts.length === 0 ? (
        <div className="text-center py-12 text-xs text-slate-500 space-y-3">
          <Award className="w-8 h-8 text-slate-300 mx-auto" />
          <p>You haven't attempted any mock tests yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {attempts.map((ta) => (
            <div
              key={ta.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1.5">
                <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                  {ta.mockTest.exam.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{ta.mockTest.title}</h3>
                <div className="flex flex-wrap gap-3 text-slate-500 text-[11px]">
                  <span>Attempted: {formatDate(ta.createdAt)}</span>
                  <span>•</span>
                  <span>Accuracy: <strong>{ta.accuracy}%</strong></span>
                  <span>•</span>
                  <span>Time: <strong>{Math.floor(ta.timeTakenSeconds / 60)} mins</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <span className="text-lg font-black text-emerald-600 block">
                    {ta.score} / {ta.totalMarks}
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {ta.percentage}% Score
                  </span>
                </div>

                <Link
                  href={`/mock-tests/${ta.mockTest.slug}`}
                  className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-300 rounded-xl transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Award, Plus, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminMockTestsPage() {
  const tests = await prisma.mockTest.findMany({
    include: { exam: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Online Assessment CMS</span>
          <h1 className="text-2xl font-black text-white mt-1">Mock Test Series ({tests.length})</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((t) => (
          <div key={t.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="bg-blue-950 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-900">
                {t.exam.name}
              </span>
              <span className="text-emerald-400 font-bold">100% Free Live</span>
            </div>
            <h3 className="text-base font-bold text-white leading-snug">{t.title}</h3>
            <div className="flex items-center gap-4 text-slate-400">
              <span>⏱ {t.durationMinutes} Minutes</span>
              <span>•</span>
              <span>📝 {t.totalQuestions} Questions</span>
              <span>•</span>
              <span>🎯 {t.totalMarks} Marks</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-slate-500">{t.attemptsCount} Candidates Attempted</span>
              <Link
                href={`/mock-tests/${t.slug}`}
                target="_blank"
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center gap-1"
              >
                <span>Preview Engine</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

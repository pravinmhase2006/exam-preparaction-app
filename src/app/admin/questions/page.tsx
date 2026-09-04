import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { HelpCircle, Plus, Upload, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminQuestionsPage() {
  const questions = await prisma.question.findMany({
    include: { exam: true, subject: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Test Engine CMS</span>
          <h1 className="text-2xl font-black text-white mt-1">Question Bank ({questions.length})</h1>
        </div>

        <Link
          href="/admin/questions/import"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
        >
          <Upload className="w-4 h-4" /> Bulk Import CSV
        </Link>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded">
                  Q#{idx + 1}
                </span>
                <span className="bg-blue-950 text-blue-400 font-bold px-2 py-0.5 rounded border border-blue-900">
                  {q.topic || 'General'}
                </span>
                <span className="text-emerald-400 font-bold">+{q.marks} / -{q.negativeMarks}</span>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded font-bold">{q.difficulty}</span>
            </div>

            <p className="text-sm font-semibold text-white leading-relaxed">{q.questionText}</p>

            <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
              <div className={`p-2 rounded-xl border ${q.correctAnswer === 'A' ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold' : 'border-slate-800 bg-slate-900'}`}>
                A: {q.optionA}
              </div>
              <div className={`p-2 rounded-xl border ${q.correctAnswer === 'B' ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold' : 'border-slate-800 bg-slate-900'}`}>
                B: {q.optionB}
              </div>
              <div className={`p-2 rounded-xl border ${q.correctAnswer === 'C' ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold' : 'border-slate-800 bg-slate-900'}`}>
                C: {q.optionC}
              </div>
              <div className={`p-2 rounded-xl border ${q.correctAnswer === 'D' ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-bold' : 'border-slate-800 bg-slate-900'}`}>
                D: {q.optionD}
              </div>
            </div>

            {q.explanation && (
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <strong className="text-blue-400">Explanation:</strong> {q.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

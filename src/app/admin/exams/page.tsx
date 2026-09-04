import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { BookOpen, Plus, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminExamsPage() {
  const exams = await prisma.exam.findMany({
    include: { organization: true },
    orderBy: { isPopular: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Curriculum CMS</span>
          <h1 className="text-2xl font-black text-white mt-1">Exams &amp; Schemes ({exams.length})</h1>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
            <tr>
              <th className="p-4">Exam Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Organization</th>
              <th className="p-4">Frequency</th>
              <th className="p-4">Expected Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {exams.map((e) => (
              <tr key={e.id} className="hover:bg-slate-900/60">
                <td className="p-4 font-bold text-white">{e.name}</td>
                <td className="p-4 text-blue-400 font-semibold">{e.category}</td>
                <td className="p-4 text-slate-400">{e.organization.shortName}</td>
                <td className="p-4">{e.frequency}</td>
                <td className="p-4 font-semibold text-emerald-400">{e.upcomingDate || 'TBA'}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/exams/${e.slug}`}
                    target="_blank"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 inline-flex items-center gap-1"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

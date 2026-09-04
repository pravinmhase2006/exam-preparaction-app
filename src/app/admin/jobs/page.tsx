import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Briefcase, Plus, Edit, Trash2, ExternalLink, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminJobsListPage() {
  const jobs = await prisma.job.findMany({
    include: { organization: true, category: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Content Management System
          </span>
          <h1 className="text-2xl font-black text-white mt-1">
            Government Job Notifications ({jobs.length})
          </h1>
        </div>

        <Link
          href="/admin/jobs/create"
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Job Post
        </Link>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Recruitment Title</th>
                <th className="p-4">Organization</th>
                <th className="p-4">Qualification</th>
                <th className="p-4">Vacancies</th>
                <th className="p-4">Last Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-slate-900/60">
                  <td className="p-4 font-bold text-white max-w-xs truncate">
                    <Link href={`/jobs/${job.slug}`} target="_blank" className="hover:text-blue-400">
                      {job.title}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-semibold">
                      {job.organization.shortName}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400">{job.qualification}</td>
                  <td className="p-4 font-semibold text-emerald-400">
                    {job.vacanciesDisplay || job.vacancies.toLocaleString()}
                  </td>
                  <td className="p-4 text-slate-400">{formatDate(job.applicationEnd)}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/jobs/${job.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="View Live"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

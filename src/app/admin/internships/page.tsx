import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { Briefcase, ExternalLink, ShieldCheck } from 'lucide-react';

export const revalidate = 0;

export default async function AdminInternshipsPage() {
  const internships = await prisma.internship.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Internships CMS</span>
          <h1 className="text-2xl font-black text-white mt-1">Student &amp; Fresher Internships ({internships.length})</h1>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
            <tr>
              <th className="p-4">Internship Role</th>
              <th className="p-4">Company</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stipend</th>
              <th className="p-4">Duration</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {internships.map((i) => (
              <tr key={i.id} className="hover:bg-slate-900/60">
                <td className="p-4 font-bold text-white max-w-xs truncate">{i.title}</td>
                <td className="p-4">{i.company}</td>
                <td className="p-4 text-emerald-400 font-semibold">{i.roleCategory}</td>
                <td className="p-4 font-semibold text-emerald-400">{i.stipendDisplay}</td>
                <td className="p-4">{i.durationMonths} Months</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/internships/${i.slug}`}
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

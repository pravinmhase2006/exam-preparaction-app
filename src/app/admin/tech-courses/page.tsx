import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { BookOpen, Star, ExternalLink } from 'lucide-react';

export const revalidate = 0;

export default async function AdminTechCoursesPage() {
  const courses = await prisma.techCourse.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academy CMS</span>
          <h1 className="text-2xl font-black text-white mt-1">Tech Certification Courses ({courses.length})</h1>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden text-xs">
        <table className="w-full text-left">
          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
            <tr>
              <th className="p-4">Course Title</th>
              <th className="p-4">Provider</th>
              <th className="p-4">Category</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Students Enrolled</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {courses.map((c) => (
              <tr key={c.id} className="hover:bg-slate-900/60">
                <td className="p-4 font-bold text-white max-w-xs truncate">{c.title}</td>
                <td className="p-4">{c.provider}</td>
                <td className="p-4 text-purple-400 font-semibold">{c.category}</td>
                <td className="p-4">{c.durationHours} Hours</td>
                <td className="p-4 font-semibold text-emerald-400">{c.totalStudents.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/tech-courses/${c.slug}`}
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

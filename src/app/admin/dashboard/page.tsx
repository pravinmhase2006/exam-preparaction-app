import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import {
  Users,
  Briefcase,
  BookOpen,
  Award,
  HelpCircle,
  TrendingUp,
  Eye,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const [
    totalUsers,
    totalJobs,
    activeJobs,
    totalExams,
    totalMockTests,
    totalQuestions,
    recentJobs,
    recentUsers,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.job.count(),
    prisma.job.count({ where: { status: 'PUBLISHED' } }),
    prisma.exam.count(),
    prisma.mockTest.count(),
    prisma.question.count(),
    prisma.job.findMany({
      include: { organization: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
            Portal Overview &amp; Analytics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Admin Management Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/jobs/create"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Publish New Job
          </Link>
          <Link
            href="/admin/questions"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Question
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-xs">
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center justify-between">
            <span>Registered Aspirants</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalUsers.toLocaleString()}</div>
          <span className="text-emerald-400 text-[10px] font-bold">● Active Community</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center justify-between">
            <span>Total Govt Jobs</span>
            <Briefcase className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalJobs}</div>
          <span className="text-blue-400 text-[10px] font-bold">{activeJobs} Published</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center justify-between">
            <span>Exam Directories</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalExams}</div>
          <span className="text-slate-500 text-[10px]">SSC, RRB, IBPS</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center justify-between">
            <span>Mock Test Series</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalMockTests}</div>
          <span className="text-amber-400 text-[10px] font-bold">100% Free Access</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center justify-between">
            <span>Question Bank</span>
            <HelpCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-white">{totalQuestions}</div>
          <span className="text-slate-500 text-[10px]">Bilingual Items</span>
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-1">
          <div className="text-slate-400 font-semibold flex items-center justify-between">
            <span>Monthly Portal Traffic</span>
            <TrendingUp className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">4.8M+</div>
          <span className="text-emerald-400 text-[10px] font-bold">+34% vs Last Month</span>
        </div>
      </div>

      {/* 2-Column Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Jobs Management */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" /> Recent Job Posts
            </h2>
            <Link href="/admin/jobs" className="text-xs text-blue-400 hover:underline">
              Manage All →
            </Link>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {recentJobs.map((j) => (
              <div key={j.id} className="py-3 flex items-center justify-between gap-4">
                <div className="space-y-1 max-w-sm">
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded border border-blue-900">
                    {j.organization.shortName}
                  </span>
                  <h4 className="font-bold text-slate-200 line-clamp-1">{j.title}</h4>
                  <span className="text-slate-500 text-[11px] block">
                    {j.vacanciesDisplay || `${j.vacancies} Posts`} • {formatDate(j.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 text-[10px] font-bold rounded border border-emerald-900">
                    {j.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registered Aspirants */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Newly Registered Users
            </h2>
            <Link href="/admin/users" className="text-xs text-blue-400 hover:underline">
              Manage Users →
            </Link>
          </div>

          <div className="divide-y divide-slate-800 text-xs">
            {recentUsers.map((u) => (
              <div key={u.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-200">{u.name}</h4>
                  <span className="text-slate-500 text-[11px]">{u.email}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded">
                    {u.role}
                  </span>
                  <span className="text-slate-500 text-[10px] block mt-1">
                    {formatDate(u.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

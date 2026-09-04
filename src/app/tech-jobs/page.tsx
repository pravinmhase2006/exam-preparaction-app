import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import TechJobCard from '@/components/tech/TechJobCard';
import AdBanner from '@/components/ads/AdBanner';
import { Laptop, Briefcase, Search, Filter, ShieldCheck, Sparkles } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'IT & Software Engineering Jobs India 2026 - Freshers & Experienced',
  description: 'Explore verified IT jobs, Software Engineer openings, Govt PSU Tech Scientist vacancies (ISRO, NIC, CDAC), and MNC hiring across India.',
  canonical: '/tech-jobs',
});

export const revalidate = 0;

export default async function TechJobsPage({
  searchParams,
}: {
  searchParams: { q?: string; category?: string; mode?: string };
}) {
  const where: any = { status: 'PUBLISHED' };

  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q } },
      { company: { contains: searchParams.q } },
      { techStack: { contains: searchParams.q } },
    ];
  }

  if (searchParams.category) {
    where.roleCategory = searchParams.category;
  }

  if (searchParams.mode) {
    where.workMode = searchParams.mode;
  }

  const jobs = await prisma.techJob.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const categories = [
    { label: 'All Tech Roles', value: '' },
    { label: 'Software Engineering', value: 'Software Engineering' },
    { label: 'Data & AI', value: 'Data & AI' },
    { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-card relative overflow-hidden">
        <div className="space-y-4 max-w-3xl relative z-10">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-saffron-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
              <Laptop className="w-3.5 h-3.5" /> IT &amp; Technology Careers Hub
            </span>
            <span className="bg-blue-800/60 text-blue-200 text-[11px] font-bold px-3 py-1 rounded-full border border-blue-700/50">
              MNCs + Govt PSU Tech
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            Software, IT &amp; Technology Jobs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Discover Software Developer, Full Stack, Data Science, and Govt PSU Tech Scientist openings (ISRO, NIC, CDAC, BEL, TCS, Infosys, Startups).
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold no-scrollbar">
        {categories.map((c) => {
          const isActive = (!searchParams.category && !c.value) || searchParams.category === c.value;
          return (
            <Link
              key={c.value}
              href={`/tech-jobs${c.value ? `?category=${encodeURIComponent(c.value)}` : ''}`}
              className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                isActive
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {/* Job Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span>Showing {jobs.length} Active Openings</span>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500 space-y-2">
            <p className="font-bold">No IT jobs matching this criteria.</p>
            <Link href="/tech-jobs" className="text-xs text-blue-600 font-bold hover:underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <TechJobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

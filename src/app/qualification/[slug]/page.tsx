import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import JobCard from '@/components/jobs/JobCard';
import AdBanner from '@/components/ads/AdBanner';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

const qualificationMap: Record<string, { title: string; query: string; desc: string }> = {
  '10th-pass': {
    title: '10th Pass Government Jobs 2026',
    query: '10th',
    desc: 'Explore latest central and state government job vacancies for Matriculation / 10th pass candidates including SSC MTS, Army Agniveer, Railway Group D, and Post Office GDS.',
  },
  '12th-pass': {
    title: '12th Pass Government Jobs 2026',
    query: '12th',
    desc: 'Find all recruitment notifications for Higher Secondary / 12th pass aspirants in Police Constable, SSC CHSL, Railway Clerks, and Defence forces.',
  },
  'graduate': {
    title: 'Graduate Government Jobs 2026',
    query: 'Graduate',
    desc: 'Government job opportunities for Bachelor degree holders across SSC CGL, Bank PO / Clerk, UPSC CSE, State PSC, and Railway Station Master.',
  },
  'diploma': {
    title: 'Diploma Polytechnic Govt Jobs 2026',
    query: 'Diploma',
    desc: 'Junior Engineer (JE), Technical Assistant, and PSU vacancies for Polytechnic Diploma holders in Mechanical, Civil, and Electrical streams.',
  },
  'iti': {
    title: 'ITI Govt Jobs & Trade Apprentice 2026',
    query: 'ITI',
    desc: 'Latest ITI Trainee, Technician, Railway ALP, DRDO, and PSU trade apprentice recruitment updates.',
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const data = qualificationMap[params.slug];
  if (!data) return { title: 'Qualification Jobs | GovtPrep India' };
  return constructMetadata({
    title: data.title,
    description: data.desc,
    canonical: `/qualification/${params.slug}`,
  });
}

export const revalidate = 0;

export default async function QualificationPage({ params }: { params: { slug: string } }) {
  const data = qualificationMap[params.slug];
  if (!data) notFound();

  const jobs = await prisma.job.findMany({
    where: {
      status: 'PUBLISHED',
      qualification: { contains: data.query },
    },
    include: { organization: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4" /> Qualification Directory
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">{data.title}</h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{data.desc}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            Active Recruitment Notices ({jobs.length})
          </h2>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
            No active vacancies found for this qualification at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job as any} />
            ))}
          </div>
        )}

        <AdBanner placement="HOMEPAGE_MID" />
      </div>

    </div>
  );
}

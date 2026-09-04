import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import {
  Building2,
  MapPin,
  Briefcase,
  DollarSign,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const job = await prisma.techJob.findUnique({
    where: { slug: params.slug },
  });

  if (!job) return {};

  return constructMetadata({
    title: `${job.title} - ${job.company}`,
    description: job.description.slice(0, 160),
    canonical: `/tech-jobs/${job.slug}`,
  });
}

export default async function TechJobDetailsPage({ params }: { params: { slug: string } }) {
  const job = await prisma.techJob.findUnique({
    where: { slug: params.slug },
  });

  if (!job) notFound();

  const stack = job.techStack ? job.techStack.split(',').map((s) => s.trim()) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tech-jobs" className="hover:text-blue-600">IT Jobs</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{job.company}</span>
      </nav>

      {/* Main Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                {job.roleCategory}
              </span>
              {job.isPsuGovt && (
                <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Govt PSU Tech Recruitment
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {job.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5 text-slate-900">
                <Building2 className="w-4 h-4 text-blue-600" /> {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" /> {job.location} ({job.workMode})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                💰 {job.salaryRange}
              </span>
            </div>
          </div>

          <a
            href={job.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Apply on Official Portal</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Tech Stack */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Required Technologies &amp; Tools:
          </span>
          <div className="flex flex-wrap gap-2">
            {stack.map((s, idx) => (
              <span
                key={idx}
                className="text-xs font-bold bg-slate-100 text-slate-800 px-3 py-1 rounded-xl border border-slate-200"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description & Eligibility */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4 text-xs leading-relaxed text-slate-700">
            <h2 className="text-lg font-bold text-slate-900">Job Description &amp; Scope</h2>
            <p className="text-sm text-slate-600">{job.description}</p>

            {job.requirements && (
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h3 className="text-base font-bold text-slate-900">Candidate Eligibility &amp; Criteria</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{job.requirements}</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Overview</h3>
            <div className="space-y-2.5">
              <div>
                <span className="text-slate-400 block font-medium">Experience Level</span>
                <strong className="text-slate-800">{job.experienceLevel}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Work Arrangement</span>
                <strong className="text-slate-800">{job.workMode}</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Target Degrees</span>
                <strong className="text-slate-800">{job.eligibility || 'B.Tech / BCA / MCA / B.Sc'}</strong>
              </div>
            </div>
          </div>

          <AdBanner placement="JOB_SIDEBAR" />
        </div>

      </div>

    </div>
  );
}

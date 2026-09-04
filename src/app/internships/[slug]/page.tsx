import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import {
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  ExternalLink,
  ShieldCheck,
  Award,
  CheckCircle2,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const intern = await prisma.internship.findUnique({
    where: { slug: params.slug },
  });

  if (!intern) return {};

  return constructMetadata({
    title: `${intern.title} - ${intern.company}`,
    description: intern.description.slice(0, 160),
    canonical: `/internships/${intern.slug}`,
  });
}

export default async function InternshipDetailsPage({ params }: { params: { slug: string } }) {
  const intern = await prisma.internship.findUnique({
    where: { slug: params.slug },
  });

  if (!intern) notFound();

  const skills = intern.skillsRequired ? intern.skillsRequired.split(',').map((s) => s.trim()) : [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/internships" className="hover:text-emerald-600">Internships</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{intern.company}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                {intern.roleCategory}
              </span>
              {intern.isGovtFellowship && (
                <span className="bg-amber-50 text-amber-800 text-xs font-bold px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Official Govt Tech Fellowship
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {intern.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold">
              <span className="flex items-center gap-1.5 text-slate-900">
                <Building2 className="w-4 h-4 text-emerald-600" /> {intern.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-slate-400" /> {intern.location} ({intern.workMode})
              </span>
              <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                💰 {intern.stipendDisplay}
              </span>
            </div>
          </div>

          <a
            href={intern.applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <span>Apply for Internship</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Skills */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Required Skills:
          </span>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, idx) => (
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
            <h2 className="text-lg font-bold text-slate-900">Internship Overview</h2>
            <p className="text-sm text-slate-600">{intern.description}</p>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <h3 className="text-base font-bold text-slate-900">Eligibility &amp; Who Can Apply</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{intern.eligibility}</p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Key Highlights</h3>
            <div className="space-y-2.5">
              <div>
                <span className="text-slate-400 block font-medium">Internship Duration</span>
                <strong className="text-slate-800">{intern.durationMonths} Months</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Pre-Placement Offer (PPO)</span>
                <strong className="text-emerald-700">{intern.isPpoOffered ? 'Yes (Performance Based)' : 'Govt Certificate'}</strong>
              </div>
              {intern.applyDeadline && (
                <div>
                  <span className="text-slate-400 block font-medium">Last Date to Apply</span>
                  <strong className="text-rose-600">{formatDate(intern.applyDeadline)}</strong>
                </div>
              )}
            </div>
          </div>

          <AdBanner placement="JOB_SIDEBAR" />
        </div>

      </div>

    </div>
  );
}

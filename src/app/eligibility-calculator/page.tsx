import React from 'react';
import prisma from '@/lib/db';
import EligibilityCalculator from '@/components/jobs/EligibilityCalculator';
import AdBanner from '@/components/ads/AdBanner';
import { Calculator, ShieldCheck, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government Job Age & Eligibility Calculator 2026',
  description: 'Calculate your exact age as on cutoff date with category-wise age relaxations (OBC, SC, ST, PwD) for SSC, Railway, Banking and Police recruitments.',
  canonical: '/eligibility-calculator',
});

export const revalidate = 0;

export default async function GlobalEligibilityCalculatorPage() {
  const jobs = await prisma.job.findMany({
    where: { status: 'PUBLISHED' },
    select: { id: true, title: true, slug: true, minAge: true, maxAge: true, qualification: true },
    take: 8,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="space-y-2">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Calculator className="w-4 h-4" /> Official Candidate Tool
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Government Job Age &amp; Eligibility Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Verify your exact age in years, months and days against official notification cutoff dates with category age relaxation rules (OBC +3 yrs, SC/ST +5 yrs, PwD +10 yrs).
          </p>
        </div>
      </div>

      {/* Calculator Engine */}
      <EligibilityCalculator
        minAge={18}
        maxAge={30}
        requiredQualification="Graduate"
        cutoffDate="2026-08-01"
      />

      {/* Quick Check Active Recruitments */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Check Eligibility for Current Major Active Recruitments:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {jobs.map((j) => (
            <a
              key={j.id}
              href={`/jobs/${j.slug}`}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 transition-colors flex items-center justify-between group"
            >
              <span className="font-bold text-slate-800 group-hover:text-blue-600 line-clamp-1">{j.title}</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
            </a>
          ))}
        </div>
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

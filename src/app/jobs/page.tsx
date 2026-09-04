import React from 'react';
import prisma from '@/lib/db';
import JobCard from '@/components/jobs/JobCard';
import JobFilterSidebar from '@/components/jobs/JobFilterSidebar';
import AdBanner from '@/components/ads/AdBanner';
import { Briefcase, Search } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Government Jobs 2026 - Latest Sarkari Naukri Notifications',
  description: 'Search and filter active government jobs by qualification (10th, 12th, Graduate), state, and category with application dates and fee details.',
  canonical: '/jobs',
});

export const revalidate = 0;

interface JobsPageProps {
  searchParams: {
    qualification?: string;
    state?: string;
    category?: string;
    sort?: string;
    q?: string;
    page?: string;
  };
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { qualification, state, category, sort, q } = searchParams;

  // Build filter where clause
  const where: any = { status: 'PUBLISHED' };

  if (qualification && qualification !== 'All Qualifications') {
    where.qualification = { contains: qualification };
  }

  if (state && state !== 'all') {
    where.state = { code: state };
  }

  if (category && category !== 'all') {
    where.category = { slug: category };
  }

  if (q) {
    where.OR = [
      { title: { contains: q } },
      { department: { contains: q } },
      { organization: { name: { contains: q } } },
      { organization: { shortName: { contains: q } } },
    ];
  }

  // Sort order
  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'closing_soon') {
    orderBy = { applicationEnd: 'asc' };
  } else if (sort === 'most_viewed') {
    orderBy = { views: 'desc' };
  } else if (sort === 'vacancies') {
    orderBy = { vacancies: 'desc' };
  }

  const [jobs, categories, states] = await Promise.all([
    prisma.job.findMany({
      where,
      include: { organization: true, state: true, category: true },
      orderBy,
    }),
    prisma.jobCategory.findMany({ orderBy: { name: 'asc' } }),
    prisma.state.findMany({ orderBy: { name: 'asc' } }),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Page Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-saffron-400 font-bold text-xs uppercase tracking-wider">
            <Briefcase className="w-4 h-4" /> Comprehensive Government Vacancy Directory
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">
            Government Jobs 2026 ({jobs.length} Active Posts)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Filter through central and state government recruitment notifications across 10th pass, 12th pass, graduate, diploma and ITI qualifications.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 sticky top-20">
          <JobFilterSidebar categories={categories} states={states} />
        </div>

        {/* Right Jobs Listing */}
        <div className="lg:col-span-3 space-y-6">
          {jobs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto text-2xl font-bold">
                🔍
              </div>
              <h3 className="text-lg font-bold text-slate-800">No Government Jobs Found</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We couldn't find any active job notifications matching your selected criteria. Try resetting filters or broadening your qualification selection.
              </p>
              <a
                href="/jobs"
                className="inline-block px-5 py-2 rounded-full bg-blue-600 text-white text-xs font-bold shadow hover:bg-blue-700 transition-colors"
              >
                Reset All Filters
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job as any} />
              ))}
            </div>
          )}

          <AdBanner placement="HOMEPAGE_MID" />
        </div>

      </div>
    </div>
  );
}

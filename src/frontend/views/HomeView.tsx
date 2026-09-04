import React from 'react';
import Link from 'next/link';
import JobCard from '@/components/jobs/JobCard';
import TechJobCard from '@/components/tech/TechJobCard';
import ExamCard from '@/components/exams/ExamCard';
import AdBanner from '@/components/ads/AdBanner';
import QuestionOfTheDay from '@/components/common/QuestionOfTheDay';
import { JobCardData } from '@/types/jobs';
import { TechJobData } from '@/types/tech';
import { ExamCardData } from '@/types/exams';

interface HomeViewProps {
  featuredJobs: JobCardData[];
  latestJobs: JobCardData[];
  popularExams: ExamCardData[];
  latestTechJobs: TechJobData[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  featuredJobs,
  latestJobs,
  popularExams,
  latestTechJobs,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-navy-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-blue-800">
        <div className="max-w-3xl space-y-4">
          <span className="inline-block px-3 py-1 bg-saffron-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
            Verified Govt &amp; Tech Opportunities
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Find Your Dream Career in Government &amp; Technology
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Real-time notifications for Central &amp; State Sarkari Naukri, IT Engineering Roles, Free CBT Mock Tests, and Tech Internships.
          </p>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Featured Government Jobs</h2>
          <Link href="/jobs" className="text-xs font-bold text-blue-600 hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Tech Spotlight */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">Software &amp; IT Careers</h2>
          <Link href="/tech-jobs" className="text-xs font-bold text-blue-600 hover:underline">
            All Tech Jobs →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestTechJobs.map((tj) => (
            <TechJobCard key={tj.id} job={tj} />
          ))}
        </div>
      </section>
    </div>
  );
};

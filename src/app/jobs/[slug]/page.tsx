import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import EligibilityCalculator from '@/components/jobs/EligibilityCalculator';
import JobShareModal from '@/components/jobs/JobShareModal';
import CalendarSyncButton from '@/components/common/CalendarSyncButton';
import DiscussionForum from '@/components/jobs/DiscussionForum';
import {
  Building2,
  Calendar,
  GraduationCap,
  IndianRupee,
  MapPin,
  Users,
  CheckCircle2,
  ExternalLink,
  Download,
  Share2,
  Bookmark,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { formatDate, formatTimeRemaining } from '@/lib/utils';
import { generateJobPostingSchema, constructMetadata } from '@/lib/seo';

interface JobDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: JobDetailsPageProps) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    include: { organization: true },
  });

  if (!job) return { title: 'Job Not Found | GovtPrep India' };

  return constructMetadata({
    title: `${job.title} - Apply Online`,
    description: `Complete details for ${job.title} by ${job.organization.name}. Check eligibility, age limit, application fee, vacancies, syllabus, exam dates and direct official apply link.`,
    canonical: `/jobs/${job.slug}`,
  });
}

export const revalidate = 0;

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const job = await prisma.job.findUnique({
    where: { slug: params.slug },
    include: {
      organization: true,
      category: true,
      state: true,
    },
  });

  if (!job) {
    notFound();
  }

  // Increment views counter
  await prisma.job.update({
    where: { id: job.id },
    data: { views: { increment: 1 } },
  });

  // Related jobs
  const relatedJobs = await prisma.job.findMany({
    where: {
      categoryId: job.categoryId,
      id: { not: job.id },
      status: 'PUBLISHED',
    },
    take: 3,
    include: { organization: true },
  });

  // Parse JSON data safely
  let vacancyList: any[] = [];
  try {
    if (job.vacancyDetails) vacancyList = JSON.parse(job.vacancyDetails);
  } catch (e) {}

  let examPatternList: any[] = [];
  try {
    if (job.examPattern) examPatternList = JSON.parse(job.examPattern);
  } catch (e) {}

  const jsonLd = generateJobPostingSchema({
    title: job.title,
    organizationName: job.organization.name,
    organizationWebsite: job.organization.website || 'https://govtprep.in',
    datePosted: job.createdAt,
    validThrough: job.applicationEnd,
    location: job.location,
    qualification: job.qualification,
    baseSalary: job.salary,
  });

  const timeRemaining = job.applicationEnd ? formatTimeRemaining(job.applicationEnd.toString()) : '';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <span>/</span>
            <Link href="/jobs" className="hover:text-blue-600">Govt Jobs</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold truncate max-w-xs">{job.organization.shortName}</span>
          </nav>

          {/* Main Job Banner */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                    {job.organization.name}
                  </span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                    {job.qualification}
                  </span>
                  {job.isFeatured && (
                    <span className="px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-lg border border-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Featured
                    </span>
                  )}
                  {timeRemaining && (
                    <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-lg border border-rose-200">
                      ⏳ {timeRemaining}
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
                  {job.title}
                </h1>

                {job.department && (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Department: <strong>{job.department}</strong>
                  </p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                {job.applyUrl && (
                  <a
                    href={job.applyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply Online Now</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {job.officialNotificationUrl && (
                  <a
                    href={job.officialNotificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-2xl border border-slate-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 text-blue-600" /> Download Notification PDF
                  </a>
                )}
                <JobShareModal
                  title={job.title}
                  organization={job.organization.name}
                  vacancies={job.vacanciesDisplay || `${job.vacancies.toLocaleString()} Posts`}
                  qualification={job.qualification}
                  lastDate={formatDate(job.applicationEnd)}
                  slug={job.slug}
                />
              </div>

            </div>

            {/* Quick Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 pt-6 border-t border-slate-100 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Total Vacancies</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {job.vacanciesDisplay || `${job.vacancies.toLocaleString()} Posts`}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Pay Scale / Salary</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block truncate">
                  {job.salary}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Age Requirement</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {job.minAge} – {job.maxAge} Years
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Job Location</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {job.location}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Application Start</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                  {formatDate(job.applicationStart)}
                </span>
              </div>

              <div className="bg-rose-50 p-3 rounded-xl border border-rose-100">
                <span className="text-rose-700 block font-bold">Closing Deadline</span>
                <span className="text-sm font-black text-rose-900 mt-0.5 block">
                  {formatDate(job.applicationEnd)}
                </span>
              </div>
            </div>
          </div>

          {/* Main 2-Column Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: In-depth Job Details */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Eligibility & Age Calculator Widget */}
              <EligibilityCalculator
                minAge={job.minAge}
                maxAge={job.maxAge}
                requiredQualification={job.qualification}
                cutoffDate={job.applicationEnd}
                jobTitle={job.title}
              />
              
              {/* Section 1: Important Dates Schedule */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Important Dates Schedule
                  </h2>
                  <CalendarSyncButton
                    title={job.title}
                    startDate={job.applicationStart}
                    endDate={job.applicationEnd}
                    description={`Application deadline for ${job.title} (${job.organization.name}).`}
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-3">Recruitment Event</th>
                        <th className="p-3">Official Date</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                      <tr>
                        <td className="p-3">Online Registration Opening Date</td>
                        <td className="p-3 font-semibold">{formatDate(job.applicationStart)}</td>
                        <td className="p-3"><span className="text-emerald-600 font-bold">Active</span></td>
                      </tr>
                      <tr className="bg-rose-50/50">
                        <td className="p-3 font-bold text-rose-900">Online Application Closing Date</td>
                        <td className="p-3 font-bold text-rose-900">{formatDate(job.applicationEnd)}</td>
                        <td className="p-3"><span className="text-rose-600 font-bold">Closing Soon</span></td>
                      </tr>
                      <tr>
                        <td className="p-3">Computer Based Written Examination</td>
                        <td className="p-3 font-semibold">{job.examDate || 'To be announced'}</td>
                        <td className="p-3"><span className="text-slate-500">Upcoming</span></td>
                      </tr>
                      <tr>
                        <td className="p-3">Hall Ticket / Admit Card Release</td>
                        <td className="p-3 font-semibold">{job.admitCardDate || '7-10 Days before Exam'}</td>
                        <td className="p-3"><span className="text-slate-500">Expected</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Application Fee Structure */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <IndianRupee className="w-5 h-5 text-amber-600" />
                  Application Fee Matrix
                </h2>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs space-y-2">
                  <p className="text-sm font-semibold text-slate-900">{job.applicationFee || 'Gen/OBC: ₹100, Reserved: Nil'}</p>
                  <p className="text-slate-500 text-xs">
                    Fee Payment Mode: Online via Net Banking, Debit/Credit Card, UPI, or SBI e-Challan.
                  </p>
                </div>
              </div>

              {/* Section 3: Post-wise Vacancy Breakdown Table */}
              {vacancyList.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    Post-wise Vacancy Distribution
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Post Designation</th>
                          <th className="p-3">Department / Ministry</th>
                          <th className="p-3">Pay Scale</th>
                          <th className="p-3 text-right">Vacancies</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                        {vacancyList.map((row, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3 font-semibold text-slate-900">{row.post}</td>
                            <td className="p-3 text-slate-600">{row.dept}</td>
                            <td className="p-3 text-slate-600">{row.gradePay}</td>
                            <td className="p-3 text-right font-bold text-emerald-700">{row.vacancies}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Section 4: Eligibility & Age Limits */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  Eligibility Criteria &amp; Qualifications
                </h2>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p><strong>Educational Qualification:</strong> {job.eligibility || 'Candidate must possess the required educational degree from a recognized institution.'}</p>
                  <p><strong>Age Relaxations:</strong> Upper age relaxation permissible as per Govt rules (SC/ST: 5 years, OBC: 3 years, PwD: 10 years, Ex-Servicemen: 3 years).</p>
                  <p><strong>Nationality:</strong> Citizen of India or subject of Nepal/Bhutan.</p>
                </div>
              </div>

              {/* Section 5: Selection Process */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Selection Methodology
                </h2>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {job.selectionProcess || 'Tier 1 Written CBT Exam -> Tier 2 Exam -> Skill Test -> Document Verification & Medical Exam.'}
                </p>
              </div>

              {/* Section 6: Exam Pattern Table */}
              {examPatternList.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    Computer Based Exam Pattern
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                        <tr>
                          <th className="p-3">Subject / Section</th>
                          <th className="p-3">No. of Questions</th>
                          <th className="p-3">Maximum Marks</th>
                          <th className="p-3">Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                        {examPatternList.map((row, idx) => (
                          <tr key={idx}>
                            <td className="p-3 font-semibold text-slate-900">{row.subject}</td>
                            <td className="p-3">{row.questions}</td>
                            <td className="p-3">{row.marks}</td>
                            <td className="p-3 text-slate-500">{row.duration || 'Composite Time'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Section 7: Important Official Links */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-blue-600" />
                  Important Official Links
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {job.applyUrl && (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold flex items-center justify-between border border-blue-200 transition-colors"
                    >
                      <span>Direct Apply Online Link</span>
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    </a>
                  )}

                  {job.officialNotificationUrl && (
                    <a
                      href={job.officialNotificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold flex items-center justify-between border border-slate-200 transition-colors"
                    >
                      <span>Download Notification PDF</span>
                      <Download className="w-4 h-4 text-slate-600" />
                    </a>
                  )}

                  {job.officialWebsiteUrl && (
                    <a
                      href={job.officialWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold flex items-center justify-between border border-slate-200 transition-colors"
                    >
                      <span>Official Portal Website</span>
                      <ExternalLink className="w-4 h-4 text-slate-600" />
                    </a>
                  )}
                </div>
              </div>

              {/* Section 8: Aspirant Community & Discussion Forum */}
              <DiscussionForum itemTitle={job.title} itemType="job" />

            </div>

            {/* Right 1 Col: Sidebar Widgets & Ads */}
            <div className="space-y-6">
              
              {/* Practice Mock Test Widget */}
              <div className="bg-gradient-to-br from-blue-900 to-navy-900 text-white rounded-3xl p-6 shadow-card space-y-4">
                <span className="text-[10px] font-bold text-saffron-400 bg-saffron-900/50 px-2 py-0.5 rounded">
                  RECOMMENDED PREPARATION
                </span>
                <h3 className="text-lg font-bold">
                  Free Live Mock Test for {job.organization.shortName}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Practice simulated questions with real exam negative marking, timer countdown and bilingual solutions.
                </p>
                <Link
                  href="/mock-tests"
                  className="block w-full text-center py-2.5 bg-saffron-500 hover:bg-saffron-600 text-white font-bold text-xs rounded-xl shadow transition-colors"
                >
                  Start Test Series Free →
                </Link>
              </div>

              {/* Sidebar Ad Placement */}
              <AdBanner placement="JOB_SIDEBAR" />

              {/* Related Jobs List */}
              {relatedJobs.length > 0 && (
                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Similar Government Jobs
                  </h3>
                  <div className="space-y-3 text-xs">
                    {relatedJobs.map((rj) => (
                      <Link
                        key={rj.id}
                        href={`/jobs/${rj.slug}`}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-100 transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-blue-600">
                          {rj.organization.shortName}
                        </span>
                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-2 mt-0.5">
                          {rj.title}
                        </h4>
                        <span className="text-slate-400 text-[11px] block mt-1">
                          Last Date: {formatDate(rj.applicationEnd)}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </div>
    </>
  );
}

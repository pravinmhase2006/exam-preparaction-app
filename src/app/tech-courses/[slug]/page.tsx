import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen, Clock, Users, Star, Award, CheckCircle2, PlayCircle, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await prisma.techCourse.findUnique({
    where: { slug: params.slug },
  });

  if (!course) return {};

  return constructMetadata({
    title: `${course.title} - Free Certification Course`,
    description: course.description.slice(0, 160),
    canonical: `/tech-courses/${course.slug}`,
  });
}

export default async function TechCourseDetailsPage({ params }: { params: { slug: string } }) {
  const course = await prisma.techCourse.findUnique({
    where: { slug: params.slug },
  });

  if (!course) notFound();

  let modules: string[] = [];
  try {
    if (course.syllabus) modules = JSON.parse(course.syllabus);
  } catch (e) {
    modules = [course.syllabus || ''];
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 font-medium">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/tech-courses" className="hover:text-purple-600">Tech Courses</Link>
        <span>/</span>
        <span className="text-slate-900 font-bold truncate">{course.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3">
            <span className="bg-purple-50 text-purple-700 text-xs font-bold px-3 py-1 rounded-full border border-purple-200">
              {course.category}
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Offered by <strong>{course.provider}</strong> • Instructor: <strong>{course.instructor || 'Lead Faculty'}</strong>
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 font-semibold pt-1">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" /> {course.rating} Rating
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400" /> {course.durationHours} Hours Video Curriculum
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-slate-400" /> {course.totalStudents.toLocaleString()} Enrolled
              </span>
            </div>
          </div>

          <div className="shrink-0 space-y-2 text-center">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 block">
              100% Free Lifetime Access
            </span>
            <button
              onClick={undefined}
              className="w-full px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-4 h-4" /> Start Learning Now
            </button>
          </div>
        </div>
      </div>

      {/* Syllabus Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900">About this Course</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{course.description}</p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" /> Course Curriculum &amp; Modules
            </h2>

            <div className="space-y-2.5 text-xs">
              {modules.map((mod, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 font-bold text-slate-800 flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <span>{mod}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-2">Course Highlights</h3>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Certificate of Completion
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Hands-on Industry Projects
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Beginner to Advanced Roadmap
              </li>
            </ul>
          </div>

          <AdBanner placement="JOB_SIDEBAR" />
        </div>

      </div>

    </div>
  );
}

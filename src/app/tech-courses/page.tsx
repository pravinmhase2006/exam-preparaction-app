import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import TechCourseCard from '@/components/tech/TechCourseCard';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen, GraduationCap, Award, Star, CheckCircle2 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Free Tech Courses & Certifications 2026 - Web Dev, AI, Cloud, DSA',
  description: 'Learn high-demand tech skills with free certification courses in Full Stack Next.js, Python AI/ML, Cloud Computing, and Data Structures.',
  canonical: '/tech-courses',
});

export const revalidate = 0;

export default async function TechCoursesPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const where: any = {};
  if (searchParams.category) {
    where.category = searchParams.category;
  }

  const courses = await prisma.techCourse.findMany({
    where,
    orderBy: { rating: 'desc' },
  });

  const categories = [
    { label: 'All Disciplines', value: '' },
    { label: 'Web Development', value: 'Web Development' },
    { label: 'AI & Data Science', value: 'AI & Data Science' },
    { label: 'DSA & Coding', value: 'DSA & Coding' },
    { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-card relative overflow-hidden">
        <div className="space-y-4 max-w-3xl relative z-10">
          <span className="bg-purple-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <GraduationCap className="w-3.5 h-3.5" /> Industry Tech Academy
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            Free Tech Courses &amp; Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Upskill for high-paying software jobs with complete, structured courses in Full Stack Web Development, Generative AI, Cloud Computing, and DSA Coding Interview Prep.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold no-scrollbar">
        {categories.map((c) => {
          const isActive = (!searchParams.category && !c.value) || searchParams.category === c.value;
          return (
            <Link
              key={c.value}
              href={`/tech-courses${c.value ? `?category=${encodeURIComponent(c.value)}` : ''}`}
              className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                isActive
                  ? 'bg-purple-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <TechCourseCard key={c.id} course={c} />
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

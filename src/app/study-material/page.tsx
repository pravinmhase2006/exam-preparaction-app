import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Free Study Material & Notes - Aptitude, Reasoning, English, GK',
  description: 'Comprehensive chapter-wise study notes, shortcut formula sheets and concept guides for competitive government exams.',
  canonical: '/study-material',
});

export const revalidate = 0;

export default async function StudyMaterialPage() {
  const materials = await prisma.studyMaterial.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-900 rounded-3xl p-6 sm:p-8 text-white shadow-card">
        <div className="max-w-3xl space-y-2">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Concept Notes &amp; Formulae
          </span>
          <h1 className="text-2xl sm:text-4xl font-black">
            Government Exam Study Material
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Shortcuts for Quantitative Aptitude, Syllogism &amp; Puzzles in Reasoning, Grammar rules for English, and Indian Polity notes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:border-blue-500 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded-lg border border-blue-200">
                  {m.category}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {m.readTime}
                </span>
              </div>
              <Link href={`/study-material/${m.slug}`}>
                <h2 className="text-lg font-bold text-slate-900 hover:text-blue-600 transition-colors leading-snug mb-2">
                  {m.title}
                </h2>
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
              <span className="text-xs text-slate-400">{m.author}</span>
              <Link
                href={`/study-material/${m.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                <span>Read Notes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />
    </div>
  );
}

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { BookOpen, Clock, User, ArrowLeft } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

interface StudyMaterialDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: StudyMaterialDetailsProps) {
  const item = await prisma.studyMaterial.findUnique({
    where: { slug: params.slug },
  });
  if (!item) return { title: 'Study Material Not Found | GovtPrep India' };
  return constructMetadata({
    title: item.title,
    description: `Complete study notes for ${item.category}. Detailed formulae, concepts and solved examples.`,
    canonical: `/study-material/${item.slug}`,
    ogType: 'article',
  });
}

export const revalidate = 0;

export default async function StudyMaterialDetailsPage({ params }: StudyMaterialDetailsProps) {
  const item = await prisma.studyMaterial.findUnique({
    where: { slug: params.slug },
  });

  if (!item) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/study-material" className="hover:text-blue-600">Study Material</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{item.category}</span>
        </nav>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-card space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                {item.category}
              </span>
              <span className="text-slate-400 text-xs flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {item.readTime}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {item.title}
            </h1>
            <p className="text-xs text-slate-500">Author: {item.author}</p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line space-y-4">
            {item.content}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/study-material"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Study Material
            </Link>
            <Link
              href="/mock-tests"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
            >
              Take Relevant Mock Test →
            </Link>
          </div>
        </article>

        <AdBanner placement="HOMEPAGE_MID" />
      </div>
    </div>
  );
}

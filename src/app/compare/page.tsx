import React from 'react';
import CareerComparator from '@/components/tools/CareerComparator';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Career & Govt Exam Comparator | GovtPrep India',
  description: 'Side-by-side career comparison matrix for SSC CGL vs IBPS PO, ISRO Scientist vs Tech SDE. Compare in-hand salary, syllabus overlap, perks, and promotional speed.',
  canonical: '/compare',
});

export default function ComparePage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <CareerComparator />
      </div>
    </div>
  );
}

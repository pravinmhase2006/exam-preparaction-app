import React from 'react';
import ExamCenterFinder from '@/components/tools/ExamCenterFinder';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Exam Center Finder & Reporting Checklist | GovtPrep India',
  description: 'Search your TCS iON Digital Zone exam center, nearest metro and railway transit directions, and download mandatory exam day reporting document checklist.',
  canonical: '/exam-centers',
});

export default function ExamCentersPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ExamCenterFinder />
      </div>
    </div>
  );
}

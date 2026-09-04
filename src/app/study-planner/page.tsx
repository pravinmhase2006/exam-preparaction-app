import React from 'react';
import StudyPlanner from '@/components/tools/StudyPlanner';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Interactive Exam Syllabus Tracker & Study Planner (SSC, UPSC, SDE) | GovtPrep India',
  description: 'Track chapter-wise syllabus completion, high-yield weightage, exam countdown timers, and daily study targets for SSC CGL, UPSC Prelims, and Tech Software Careers.',
  canonical: '/study-planner',
});

export default function StudyPlannerPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <StudyPlanner />
      </div>
    </div>
  );
}

import React from 'react';
import ResumeBuilder from '@/components/tools/ResumeBuilder';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'AI Resume & Govt Biodata Builder | GovtPrep India',
  description: 'Create professional single-page ATS-friendly tech resumes and standard Government job biodata proforma. Free instant PDF export.',
  canonical: '/resume-builder',
});

export default function ResumeBuilderPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <ResumeBuilder />
      </div>
    </div>
  );
}

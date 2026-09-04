import React from 'react';
import TypingTest from '@/components/tools/TypingTest';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Live Typing Speed Test Simulator (SSC CGL / CHSL / RRB NTPC) | GovtPrep India',
  description: 'Practice real exam-mode typing tests for SSC CGL DEST, SSC CHSL, RRB NTPC, Court Clerks, and Tech coding speed. Get instant WPM, accuracy, error analysis, and time controls.',
  canonical: '/typing-test',
});

export default function TypingTestPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <TypingTest />
      </div>
    </div>
  );
}

import React from 'react';
import CutoffPredictor from '@/components/tools/CutoffPredictor';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'AI Exam Cutoff Predictor & Normalization Calculator | GovtPrep India',
  description: 'Predict your shift-normalized score, Tier-2 qualifying probability, and All-India percentile rank for SSC CGL, RRB NTPC, and IBPS PO based on official TCS formulas.',
  canonical: '/cutoff-predictor',
});

export default function CutoffPredictorPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <CutoffPredictor />
      </div>
    </div>
  );
}

import React from 'react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Terms of Service - GovtPrep India',
  description: 'Terms of Service and conditions for using GovtPrep India website.',
  canonical: '/terms',
});

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 border-b border-slate-100 pb-4">
          Terms &amp; Conditions
        </h1>
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            By accessing GovtPrep India, you agree to comply with these terms of service, applicable laws and regulations.
          </p>
          <h3 className="text-base font-bold text-slate-900">1. Informational Service Use</h3>
          <p>
            All content, question banks, study notes and notifications are provided for personal educational study and examination guidance only. Reproduction or scraping for commercial resale is strictly prohibited.
          </p>
          <h3 className="text-base font-bold text-slate-900">2. Limitation of Liability</h3>
          <p>
            GovtPrep India is not liable for changes in exam dates, syllabus amendments, fee revisions, or cancellations made by official examination authorities.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, AlertTriangle } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Official Disclaimer & Advisory - GovtPrep India',
  description: 'Disclaimer and legal compliance notices regarding recruitment updates on GovtPrep India portal.',
  canonical: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-6">
        <div className="flex items-center gap-3 text-saffron-600 border-b border-slate-100 pb-4">
          <ShieldAlert className="w-8 h-8 shrink-0" />
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Official Platform Disclaimer &amp; Advisory
          </h1>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-xs sm:text-sm text-amber-950 space-y-2 font-medium">
          <p>
            <strong>GovtPrep India is an independent informational and educational platform.</strong>
          </p>
          <p>
            We are not affiliated with, authorized by, endorsed by, or in any way officially connected with the Government of India, any State Government, or any recruitment body (such as SSC, UPSC, RRB, IBPS, NTA, or State PSCs).
          </p>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900">1. Verification Requirement</h2>
          <p>
            While our editorial staff makes every effort to ensure that information regarding recruitment schedules, eligibility criteria, application fees, answer keys, and results is accurate and verified against official notifications, inadvertent errors may occasionally occur.
          </p>
          <p>
            <strong>All candidates must cross-verify all recruitment details on the respective official government portal before making application payments or submitting personal data.</strong>
          </p>

          <h2 className="text-base font-bold text-slate-900">2. Examination Mock Tests &amp; Solutions</h2>
          <p>
            Mock tests and practice question sets available on GovtPrep India are prepared for educational simulation and self-assessment purposes only. Scores obtained in mock tests do not guarantee qualification in any actual examination.
          </p>

          <h2 className="text-base font-bold text-slate-900">3. Contact for Corrections</h2>
          <p>
            If you notice any inaccuracy or discrepancy in any notification, please reach out to our editorial team via our <Link href="/contact" className="text-blue-600 font-bold underline">Contact Page</Link> for prompt verification and correction.
          </p>
        </div>
      </div>
    </div>
  );
}

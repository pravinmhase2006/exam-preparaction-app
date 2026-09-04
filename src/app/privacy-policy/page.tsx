import React from 'react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Privacy Policy - GovtPrep India',
  description: 'Privacy policy and data protection guidelines of GovtPrep India platform.',
  canonical: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-6">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 border-b border-slate-100 pb-4">
          Privacy Policy
        </h1>
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>Last updated: September 2026</p>
          <p>
            GovtPrep India is committed to safeguarding the privacy of our candidates and visitors. This Privacy Policy details how we collect, store, and protect your information when you access our portal.
          </p>
          <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
          <p>
            When registering an account or configuring job alerts, we may collect your name, email address, qualification, preferred examination sectors, and state preferences. We do not collect or store financial payment credentials.
          </p>
          <h3 className="text-base font-bold text-slate-900">2. Cookies &amp; Advertising</h3>
          <p>
            We use essential cookies to maintain secure sessions and track mock test attempt state. Third-party advertising vendors (including Google AdSense) may serve contextual advertisements based on user visits.
          </p>
          <h3 className="text-base font-bold text-slate-900">3. Data Security</h3>
          <p>
            All user authentication passwords are encrypted using industry-standard salted hashing (bcrypt) before storage in our database.
          </p>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import DocumentVault from '@/components/tools/DocumentVault';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'One-Click Document Locker & Govt Form Fill Assistant | GovtPrep India',
  description: 'Secure client-side encrypted vault for 10th, 12th marks, roll numbers, and personal details. 1-click clipboard copy to fill SSC, UPSC & IBPS forms instantly.',
  canonical: '/document-vault',
});

export default function DocumentVaultPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <DocumentVault />
      </div>
    </div>
  );
}

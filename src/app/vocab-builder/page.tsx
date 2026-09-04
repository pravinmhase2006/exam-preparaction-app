import React from 'react';
import VocabBuilder from '@/components/tools/VocabBuilder';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: '30-Day Word Power & Idioms Builder (SSC CGL, Bank PO, CDS) | GovtPrep India',
  description: 'Master 300+ root words, mnemonics, audio pronunciations, synonyms, and antonyms for competitive exam English comprehension.',
  canonical: '/vocab-builder',
});

export default function VocabBuilderPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <VocabBuilder />
      </div>
    </div>
  );
}

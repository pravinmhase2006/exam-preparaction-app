import React from 'react';
import FlashcardDeck from '@/components/tools/FlashcardDeck';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Daily 3D Flashcards & Formula Deck (Polity, GK, Quant, Tech) | GovtPrep India',
  description: 'Active recall and spaced repetition flashcards for SSC, UPSC, Banking, and Tech SDE. Master Indian Polity Articles, Static GK, Speed Math tricks, and CS fundamentals.',
  canonical: '/flashcards',
});

export default function FlashcardsPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <FlashcardDeck />
      </div>
    </div>
  );
}

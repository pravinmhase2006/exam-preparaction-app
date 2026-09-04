import React from 'react';
import QuizBattle from '@/components/tools/QuizBattle';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: '1v1 Speed Battle: Live Real-Time Quiz Duel Arena | GovtPrep India',
  description: 'Challenge live aspirants or AI bots in a 60-second rapid-fire GK, Reasoning, and Quant duel. Win streak combos, live leaderboards, and instant candidate badges.',
  canonical: '/quiz-battle',
});

export default function QuizBattlePage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <QuizBattle />
      </div>
    </div>
  );
}

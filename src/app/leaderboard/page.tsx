import React from 'react';
import LeaderboardView from '@/components/tools/LeaderboardView';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'All-India CBT Mock Test Leaderboard | GovtPrep India',
  description: 'View national mock test rankings, top percentile scorers, preparation streak multipliers, and earned aspirant badges across SSC, Banking, and IT competitions.',
  canonical: '/leaderboard',
});

export default function LeaderboardPage() {
  return (
    <div className="bg-slate-50/60 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <LeaderboardView />
      </div>
    </div>
  );
}

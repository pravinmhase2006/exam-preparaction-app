import React from 'react';
import prisma from '@/lib/db';
import { DollarSign, CheckCircle2 } from 'lucide-react';

export const revalidate = 0;

export default async function AdminAdsPage() {
  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Monetization CMS</span>
          <h1 className="text-2xl font-black text-white mt-1">Advertisement Placements &amp; AdSense Slots ({ads.length})</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-950 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-900">
                {ad.placement}
              </span>
              <span className="text-emerald-400 font-bold">● Active Slot</span>
            </div>
            <h3 className="text-base font-bold text-white">{ad.name}</h3>
            <div className="grid grid-cols-2 gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300">
              <div>
                <span className="text-slate-500 block">Impressions</span>
                <span className="font-bold text-white text-sm">{ad.impressions.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Clicks</span>
                <span className="font-bold text-white text-sm">{ad.clicks.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

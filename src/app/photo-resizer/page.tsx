import React from 'react';
import ImageResizer from '@/components/tools/ImageResizer';
import AdBanner from '@/components/ads/AdBanner';
import { Camera, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Free Photo & Signature Resizer for SSC, UPSC, IBPS, Railway Govt Jobs',
  description: 'Resize and compress passport photographs (20KB - 50KB) and signatures (10KB - 20KB) strictly according to official government examination standards.',
  canonical: '/photo-resizer',
});

export default function PhotoResizerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-card">
        <div className="space-y-3 max-w-3xl">
          <span className="text-saffron-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
            <Camera className="w-4 h-4" /> 100% Free Candidate Utility Tool
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            Govt Job Photo &amp; Signature Resizer
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Crop, resize, and compress your passport photo (20KB–50KB) and signature (10KB–20KB) precisely to match SSC, UPSC, IBPS, and Railway online application requirements.
          </p>
        </div>
      </div>

      <ImageResizer />

      {/* Official Guidelines Table */}
      <div className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          Official Specifications Reference (2026)
        </h3>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Recruitment Commission</th>
                <th className="p-3">Photograph Size &amp; Format</th>
                <th className="p-3">Signature Size &amp; Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-3 font-bold">SSC (CGL, CHSL, MTS, GD)</td>
                <td className="p-3">20 KB – 50 KB (3.5 cm × 4.5 cm) JPEG</td>
                <td className="p-3">10 KB – 20 KB (4.0 cm × 2.0 cm) JPEG</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">IBPS / SBI Bank PO &amp; Clerk</td>
                <td className="p-3">20 KB – 50 KB (200 × 230 pixels) JPEG</td>
                <td className="p-3">10 KB – 20 KB (140 × 60 pixels) JPEG</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">UPSC Civil Services</td>
                <td className="p-3">20 KB – 300 KB (Min 350 × 350 px) JPG</td>
                <td className="p-3">20 KB – 300 KB (Min 350 × 350 px) JPG</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Railway RRB (NTPC, ALP, Group D)</td>
                <td className="p-3">30 KB – 70 KB (Color Photo) JPG</td>
                <td className="p-3">30 KB – 70 KB (Running Hand) JPG</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

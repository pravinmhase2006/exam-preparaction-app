import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Target, Users, BookOpen, CheckCircle } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'About Us - GovtPrep India Educational Portal',
  description: 'Learn more about GovtPrep India mission to empower Indian government job aspirants with authentic updates, mock tests, and preparation guides.',
  canonical: '/about',
});

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-6">
        <div className="space-y-3 border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">About GovtPrep India</span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Empowering Aspirants with Authentic Government Job Updates &amp; Preparation
          </h1>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            <strong>GovtPrep India</strong> is an independent educational and informative technology platform established to simplify government recruitment notifications and competitive examination preparation across India.
          </p>
          <p>
            Millions of candidates each year prepare for examinations conducted by Staff Selection Commission (SSC), Railway Recruitment Boards (RRB), Institute of Banking Personnel Selection (IBPS), Union Public Service Commission (UPSC), State PSCs, Police, and Defence forces.
          </p>
          <p>
            Our core mission is to provide **accurate, fast, and structured information** alongside **free, high-yield computer-based mock tests** so that every aspirant, regardless of geographic or financial constraints, has an equal opportunity to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 text-center space-y-1">
            <span className="text-2xl font-black text-blue-900">100%</span>
            <p className="text-xs text-blue-800 font-semibold">Verified Notices</p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-center space-y-1">
            <span className="text-2xl font-black text-emerald-900">Free</span>
            <p className="text-xs text-emerald-800 font-semibold">All-India Mock Tests</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center space-y-1">
            <span className="text-2xl font-black text-amber-900">24/7</span>
            <p className="text-xs text-amber-800 font-semibold">Fast Updates</p>
          </div>
        </div>
      </div>
    </div>
  );
}

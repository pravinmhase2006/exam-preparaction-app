import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import InternshipCard from '@/components/tech/InternshipCard';
import AdBanner from '@/components/ads/AdBanner';
import { Briefcase, Building2, MapPin, DollarSign, Award, ShieldCheck } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'College Tech Internships & Summer Fellowships 2026 - B.Tech, BCA, MCA',
  description: 'Find paid tech internships, Google apprenticeships, and Govt Tech Fellowships (NIC, ISRO, NITI Aayog) with monthly stipends up to ₹1,10,000/mo.',
  canonical: '/internships',
});

export const revalidate = 0;

export default async function InternshipsPage({
  searchParams,
}: {
  searchParams: { category?: string; mode?: string };
}) {
  const where: any = { status: 'ACTIVE' };
  if (searchParams.category) where.roleCategory = searchParams.category;
  if (searchParams.mode) where.workMode = searchParams.mode;

  const internships = await prisma.internship.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const categories = [
    { label: 'All Internships', value: '' },
    { label: 'Software Development', value: 'Software Development' },
    { label: 'Frontend Development', value: 'Frontend Development' },
    { label: 'Data & AI', value: 'Data & AI' },
    { label: 'Cloud & Cyber Security', value: 'Cloud & Cyber Security' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-navy-900 rounded-3xl p-6 sm:p-10 text-white shadow-card relative overflow-hidden">
        <div className="space-y-4 max-w-3xl relative z-10">
          <span className="bg-emerald-500 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 w-fit">
            <Briefcase className="w-3.5 h-3.5" /> Student &amp; Fresher Career Gateway
          </span>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            Paid Tech Internships &amp; Govt Fellowships
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Kickstart your tech career with paid college internships at top tech companies and official government tech fellowships (Google, NIC, ISRO, Razorpay, Startups).
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-bold no-scrollbar">
        {categories.map((c) => {
          const isActive = (!searchParams.category && !c.value) || searchParams.category === c.value;
          return (
            <Link
              key={c.value}
              href={`/internships${c.value ? `?category=${encodeURIComponent(c.value)}` : ''}`}
              className={`px-4 py-2 rounded-xl transition-all shrink-0 ${
                isActive
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {internships.map((i) => (
          <InternshipCard key={i.id} internship={i} />
        ))}
      </div>

      <AdBanner placement="HOMEPAGE_MID" />

    </div>
  );
}

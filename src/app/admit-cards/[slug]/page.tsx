import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import prisma from '@/lib/db';
import AdBanner from '@/components/ads/AdBanner';
import { Ticket, Calendar, ExternalLink, Download, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { constructMetadata } from '@/lib/seo';

interface AdmitCardDetailsProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: AdmitCardDetailsProps) {
  const admitCard = await prisma.admitCard.findUnique({
    where: { slug: params.slug },
    include: { organization: true },
  });
  if (!admitCard) return { title: 'Admit Card Not Found | GovtPrep India' };
  return constructMetadata({
    title: `${admitCard.title} - Download Hall Ticket`,
    description: `Download ${admitCard.title} released by ${admitCard.organization.name}. Exam dates, shift timings and hall ticket link.`,
    canonical: `/admit-cards/${admitCard.slug}`,
  });
}

export const revalidate = 0;

export default async function AdmitCardDetailsPage({ params }: AdmitCardDetailsProps) {
  const admitCard = await prisma.admitCard.findUnique({
    where: { slug: params.slug },
    include: { organization: true, exam: true },
  });

  if (!admitCard) notFound();

  return (
    <div className="bg-slate-50/60 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/admit-cards" className="hover:text-blue-600">Admit Cards</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate">{admitCard.organization.shortName}</span>
        </nav>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold rounded-lg border border-blue-200">
                {admitCard.organization.name}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                Status: {admitCard.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {admitCard.title}
            </h1>
            <p className="text-xs text-slate-500">
              Exam Schedule: <strong className="text-slate-800">{admitCard.examDate}</strong>
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3 text-xs sm:text-sm text-slate-700">
            <h3 className="text-sm font-bold text-slate-900">How to Download Admit Card</h3>
            <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed">
              <li>Click on the official download link given below.</li>
              <li>Enter your {admitCard.applicationRequirements || 'Registration Number / Roll Number and Date of Birth / Password'}.</li>
              <li>Verify the captcha code and click on Submit.</li>
              <li>Your Hall Ticket / Call Letter will appear on screen.</li>
              <li>Download the PDF and print at least 2 copies for the examination center.</li>
            </ol>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
            {admitCard.downloadUrl && (
              <a
                href={admitCard.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download Official Admit Card
              </a>
            )}
          </div>
        </div>

        <AdBanner placement="HOMEPAGE_MID" />

      </div>
    </div>
  );
}

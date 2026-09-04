import type { Metadata } from 'next';
import './globals.css';
import LiveTicker from '@/components/layout/LiveTicker';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AspirantAIAssistant from '@/components/common/AspirantAIAssistant';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { getCurrentUser } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'GovtPrep India | Government Jobs, Exams & Mock Preparation Portal',
  description:
    'India’s trusted platform for Latest Government Jobs, Sarkari Result, Admit Cards, Official Answer Keys, Comprehensive Syllabus, and Free Mock Tests for SSC, Railway, Banking, UPSC, and Police exams.',
  keywords: [
    'Govt Jobs 2026',
    'Sarkari Result',
    'SSC CGL',
    'RRB NTPC',
    'IBPS PO',
    'Admit Card',
    'Free Mock Tests',
    'Syllabus',
    'Current Affairs',
  ],
  metadataBase: new URL('https://govtprep.in'),
  openGraph: {
    title: 'GovtPrep India - Government Jobs & Exam Prep',
    description: 'Find latest Sarkari Naukri, Results, Admit Cards & take Free Mock Tests.',
    siteName: 'GovtPrep India',
    locale: 'en_IN',
    type: 'website',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50/50 text-slate-900 selection:bg-blue-600 selection:text-white pb-16 md:pb-0">
        <LiveTicker />
        <Navbar initialUser={user} />
        <main className="flex-1">{children}</main>
        <AspirantAIAssistant />
        <MobileBottomNav />
        <Footer />
      </body>
    </html>
  );
}

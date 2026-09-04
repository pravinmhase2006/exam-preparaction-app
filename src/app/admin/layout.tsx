import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import {
  LayoutDashboard,
  Briefcase,
  Laptop,
  GraduationCap,
  BookOpen,
  HelpCircle,
  Award,
  FileCheck2,
  Ticket,
  Key,
  Newspaper,
  BookMarked,
  DollarSign,
  Users,
  Settings,
  ExternalLink,
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If not logged in as admin, redirect to login page
  if (!user || user.role !== 'ADMIN') {
    redirect('/login?callback=/admin/dashboard');
  }

  const adminNav = [
    { label: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Government Jobs', href: '/admin/jobs', icon: Briefcase },
    { label: 'IT & Tech Jobs', href: '/admin/tech-jobs', icon: Laptop },
    { label: 'Tech Courses', href: '/admin/tech-courses', icon: GraduationCap },
    { label: 'Internships Hub', href: '/admin/internships', icon: Briefcase },
    { label: 'Exams & Syllabus', href: '/admin/exams', icon: BookOpen },
    { label: 'Question Bank', href: '/admin/questions', icon: HelpCircle },
    { label: 'Mock Test Series', href: '/admin/mock-tests', icon: Award },
    { label: 'Results Portal', href: '/admin/results', icon: FileCheck2 },
    { label: 'Admit Cards', href: '/admin/admit-cards', icon: Ticket },
    { label: 'Answer Keys', href: '/admin/answer-keys', icon: Key },
    { label: 'Current Affairs', href: '/admin/current-affairs', icon: Newspaper },
    { label: 'Study Material', href: '/admin/study-material', icon: BookMarked },
    { label: 'Advertisements', href: '/admin/advertisements', icon: DollarSign },
    { label: 'Users Management', href: '/admin/users', icon: Users },
    { label: 'Website Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen flex flex-col font-sans">
      
      {/* Top Admin Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm shadow">
              ADM
            </div>
            <span className="font-bold text-white tracking-tight">
              GovtPrep <span className="text-red-500">CMS Control</span>
            </span>
          </Link>
          <span className="bg-slate-800 text-slate-400 text-[11px] font-semibold px-2 py-0.5 rounded border border-slate-700 hidden sm:inline-block">
            Master CMS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <div className="w-7 h-7 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs">
              {user.name.charAt(0)}
            </div>
            <span className="hidden sm:inline font-semibold">{user.name}</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-slate-950 border-r border-slate-800 p-4 space-y-4 shrink-0 hidden md:block overflow-y-auto">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3">
            Management Modules
          </div>
          <nav className="space-y-1 text-xs font-semibold">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Admin Content Canvas */}
        <main className="flex-1 bg-slate-900 p-6 sm:p-8 overflow-y-auto">
          {children}
        </main>

      </div>
    </div>
  );
}

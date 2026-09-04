import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import {
  Sliders,
  User,
  Bookmark,
  Bell,
  Award,
  BookOpen,
  Settings,
  Flame,
  ArrowRight,
} from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect('/login?callback=/dashboard');
  }

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: Sliders },
    { label: 'My Profile & Goals', href: '/dashboard/profile', icon: User },
    { label: 'Saved Bookmarks', href: '/dashboard/bookmarks', icon: Bookmark },
    { label: 'Custom Job Alerts', href: '/dashboard/alerts', icon: Bell },
    { label: 'Mock Test Attempts', href: '/dashboard/mock-tests', icon: Award },
    { label: 'Account Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Candidate Dashboard Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <h3 className="font-bold text-slate-900 text-sm truncate">{user.name}</h3>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded mt-1">
                Verified Aspirant
              </span>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Dashboard Main Content */}
        <div className="lg:col-span-3">{children}</div>

      </div>
    </div>
  );
}

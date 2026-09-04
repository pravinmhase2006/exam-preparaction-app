'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, ArrowLeft, CheckCircle2, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateJobPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [qualification, setQualification] = useState('Graduate');
  const [vacancies, setVacancies] = useState('1000');
  const [vacanciesDisplay, setVacanciesDisplay] = useState('1,000 Posts');
  const [location, setLocation] = useState('All India');
  const [salary, setSalary] = useState('₹35,400 – ₹1,12,400 (Level 7)');
  const [minAge, setMinAge] = useState('18');
  const [maxAge, setMaxAge] = useState('30');
  const [applicationFee, setApplicationFee] = useState('Gen/OBC: ₹100, SC/ST/Women: Nil');
  const [applicationStart, setApplicationStart] = useState('2026-09-01');
  const [applicationEnd, setApplicationEnd] = useState('2026-10-15');
  const [examDate, setExamDate] = useState('November 2026');
  const [selectionProcess, setSelectionProcess] = useState('Tier 1 CBT -> Tier 2 CBT -> Skill Test -> Document Verification');
  const [eligibility, setEligibility] = useState('Bachelor’s Degree in any discipline from a recognized University.');
  const [applyUrl, setApplyUrl] = useState('https://ssc.gov.in');
  const [officialNotificationUrl, setOfficialNotificationUrl] = useState('https://ssc.gov.in');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isUrgent, setIsUrgent] = useState(false);

  const [orgs, setOrgs] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Demo populate dropdown options
    setOrgs([
      { id: '1', name: 'Staff Selection Commission (SSC)' },
      { id: '2', name: 'Railway Recruitment Board (RRB)' },
      { id: '3', name: 'Institute of Banking Personnel Selection (IBPS)' },
      { id: '4', name: 'Union Public Service Commission (UPSC)' },
    ]);
    setCategories([
      { id: '1', name: 'Central Government' },
      { id: '2', name: 'Railway Jobs' },
      { id: '3', name: 'Banking & Insurance' },
      { id: '4', name: 'Defence & Police' },
    ]);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          organizationId: orgs[0]?.id || '1',
          categoryId: categories[0]?.id || '1',
          qualification,
          vacancies,
          vacanciesDisplay,
          location,
          salary,
          minAge,
          maxAge,
          applicationFee,
          applicationStart,
          applicationEnd,
          examDate,
          selectionProcess,
          eligibility,
          applyUrl,
          officialNotificationUrl,
          isFeatured,
          isUrgent,
        }),
      });

      if (res.ok) {
        router.push('/admin/jobs');
        router.refresh();
      } else {
        const d = await res.json();
        setError(d.error || 'Failed to save job');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/jobs"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recruitment Publishing Wizard
            </span>
            <h1 className="text-xl font-black text-white">Create &amp; Publish Government Job</h1>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-800 text-xs font-semibold text-rose-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 text-xs">
        
        {/* Title */}
        <div>
          <label className="block font-bold text-slate-300 mb-1">Job Post Headline / Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. SSC CGL 2026 Notification - 17,727 Group B & C Vacancies"
            className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-100 font-medium"
          />
        </div>

        {/* 2 Cols */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Qualification Requirement</label>
            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl font-semibold text-slate-100"
            >
              <option value="10th Pass">10th Pass</option>
              <option value="12th Pass">12th Pass</option>
              <option value="Graduate">Graduate</option>
              <option value="Diploma">Diploma</option>
              <option value="ITI">ITI</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Total Vacancies (Numeric)</label>
            <input
              type="number"
              value={vacancies}
              onChange={(e) => setVacancies(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Vacancy Display Text</label>
            <input
              type="text"
              value={vacanciesDisplay}
              onChange={(e) => setVacanciesDisplay(e.target.value)}
              placeholder="e.g. 17,727 Posts"
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-semibold"
            />
          </div>
        </div>

        {/* Salary & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Pay Matrix / Salary Scale</label>
            <input
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-300 mb-1">Posting Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Application Start Date</label>
            <input
              type="date"
              value={applicationStart}
              onChange={(e) => setApplicationStart(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-300 mb-1">Application Closing Date</label>
            <input
              type="date"
              value={applicationEnd}
              onChange={(e) => setApplicationEnd(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 font-bold text-rose-400"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-300 mb-1">Expected Exam Schedule</label>
            <input
              type="text"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              placeholder="e.g. November 2026"
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>
        </div>

        {/* Official Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Direct Apply Online URL</label>
            <input
              type="url"
              value={applyUrl}
              onChange={(e) => setApplyUrl(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-300 mb-1">Notification PDF URL</label>
            <input
              type="url"
              value={officialNotificationUrl}
              onChange={(e) => setOfficialNotificationUrl(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-300">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span>Mark as Featured Job</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-300">
            <input
              type="checkbox"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e.target.checked)}
              className="w-4 h-4 text-rose-600 rounded"
            />
            <span>Mark as Urgent / Closing Soon</span>
          </label>
        </div>

        <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Publishing...' : 'Publish Notification Now'}
          </button>
        </div>

      </form>

    </div>
  );
}

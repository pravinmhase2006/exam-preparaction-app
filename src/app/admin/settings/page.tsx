'use client';

import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [siteName, setSiteName] = useState('GovtPrep India');
  const [tagline, setTagline] = useState('Government Jobs, Exams & Preparation — All in One Place');
  const [adSensePublisherId, setAdSensePublisherId] = useState('pub-1234567890123456');
  const [telegramLink, setTelegramLink] = useState('https://t.me/GovtPrepIndiaOfficial');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-slate-100">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Configuration</span>
        <h1 className="text-2xl font-black text-white mt-1">Website &amp; SEO Global Settings</h1>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-xs font-bold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Global site settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 text-xs">
        <div>
          <label className="block font-bold text-slate-300 mb-1">Website Brand Name</label>
          <input
            type="text"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Portal Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Google AdSense Publisher ID</label>
          <input
            type="text"
            value={adSensePublisherId}
            onChange={(e) => setAdSensePublisherId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-300 mb-1">Official Telegram Channel URL</label>
          <input
            type="url"
            value={telegramLink}
            onChange={(e) => setTelegramLink(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Global Configuration
          </button>
        </div>
      </form>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Mail, Send, MapPin, MessageSquare, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-card space-y-8">
        <div className="space-y-2 border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Help &amp; Inquiries</span>
          <h1 className="text-3xl font-black text-slate-900">Contact GovtPrep India</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Have a question, feedback, or notice an outdated link? Let our editorial desk know.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900">Email Editorial Desk</h4>
                <p className="text-slate-500">editorial@govtprep.in</p>
                <p className="text-slate-500">support@govtprep.in</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Send className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900">Telegram Community</h4>
                <p className="text-slate-500">@GovtPrepIndiaOfficial</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs sm:text-sm">
                <h4 className="font-bold text-slate-900">Headquarters</h4>
                <p className="text-slate-500">GovtPrep Media &amp; EdTech Pvt. Ltd.<br />Connaught Place, New Delhi, India 110001</p>
              </div>
            </div>
          </div>

          {/* Feedback Form */}
          <form className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
            <h3 className="text-sm font-bold text-slate-900">Send us a message</h3>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
              <input type="text" required placeholder="Enter full name" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input type="email" required placeholder="name@example.com" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subject</label>
              <input type="text" placeholder="e.g. Correction in SSC notification" className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Message</label>
              <textarea rows={3} placeholder="Your feedback or query..." className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="button" onClick={() => alert('Thank you! Your feedback has been received.')} className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow transition-colors">
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

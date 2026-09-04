'use client';

import React, { useState } from 'react';
import { Bell, Plus, Trash2, CheckCircle2 } from 'lucide-react';

export default function JobAlertsPage() {
  const [alerts, setAlerts] = useState([
    {
      id: '1',
      name: 'Maharashtra & Central Graduate Jobs',
      qualification: 'Graduate',
      state: 'Maharashtra',
      category: 'Central Government',
      emailNotification: true,
      inAppNotification: true,
    },
    {
      id: '2',
      name: 'Railway RRB NTPC & Group D Updates',
      qualification: 'Graduate',
      state: 'All India',
      category: 'Railway Jobs',
      emailNotification: true,
      inAppNotification: true,
    },
  ]);

  const [name, setName] = useState('');
  const [qualification, setQualification] = useState('Graduate');
  const [state, setState] = useState('Maharashtra');
  const [showModal, setShowModal] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now().toString(),
      name: name || `${qualification} ${state} Alert`,
      qualification,
      state,
      category: 'All Categories',
      emailNotification: true,
      inAppNotification: true,
    };
    setAlerts([newAlert, ...alerts]);
    setShowModal(false);
    setName('');
  };

  const handleDelete = (id: string) => {
    setAlerts(alerts.filter((a) => a.id !== id));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Custom Job Alerts</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Get instant email and in-app notifications whenever matching vacancies are released.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create New Alert
        </button>
      </div>

      <div className="space-y-3">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4 text-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <h3 className="font-bold text-slate-900 text-sm">{a.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-slate-500 mt-1">
                <span>Qualification: <strong>{a.qualification}</strong></span>
                <span>•</span>
                <span>State: <strong>{a.state}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-semibold">Email &amp; In-App Active</span>
              </div>
            </div>

            <button
              onClick={() => handleDelete(a.id)}
              className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900">Create Custom Job Alert</h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Alert Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. 10th Pass Police Jobs"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Qualification</label>
                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="10th Pass">10th Pass</option>
                  <option value="12th Pass">12th Pass</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="ITI">ITI</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Preferred State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-semibold"
                >
                  <option value="All India">All India</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Delhi">Delhi</option>
                </select>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-slate-600 bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow"
                >
                  Save Alert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

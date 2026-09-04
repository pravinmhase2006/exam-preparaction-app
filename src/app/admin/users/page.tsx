import React from 'react';
import prisma from '@/lib/db';
import { Users, Shield, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    include: { profile: true, _count: { select: { testAttempts: true, bookmarks: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Aspirants Directory</span>
          <h1 className="text-2xl font-black text-white mt-1">Users Management ({users.length})</h1>
        </div>
      </div>

      <div className="bg-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-900 text-slate-400 font-bold border-b border-slate-800 uppercase text-[10px]">
            <tr>
              <th className="p-4">Candidate Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Qualification</th>
              <th className="p-4">State</th>
              <th className="p-4">Role</th>
              <th className="p-4">Tests Taken</th>
              <th className="p-4">Registered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-900/60">
                <td className="p-4 font-bold text-white">{u.name}</td>
                <td className="p-4 text-slate-400">{u.email}</td>
                <td className="p-4 font-semibold text-blue-400">{u.profile?.qualification || 'Graduate'}</td>
                <td className="p-4 text-slate-400">{u.profile?.state || 'All India'}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.role === 'ADMIN' ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-slate-300'}`}>
                    {u.role}
                  </span>
                </td>
                <td className="p-4 font-semibold text-emerald-400">{u._count.testAttempts} Tests</td>
                <td className="p-4 text-slate-500">{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

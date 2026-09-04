import React from 'react';
import Link from 'next/link';
import prisma from '@/lib/db';
import { getCurrentUser } from '@/lib/auth';
import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export const revalidate = 0;

export default async function BookmarksPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const bookmarks = await prisma.bookmark.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-xl font-bold text-slate-900">Saved Bookmarks &amp; Notes</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Quickly access the job notifications, study materials and mock tests you bookmarked.
        </p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12 text-xs text-slate-500 space-y-3">
          <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
          <p>You have not bookmarked any jobs or study materials yet.</p>
          <Link
            href="/jobs"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-bold rounded-xl shadow"
          >
            Explore Jobs to Save
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {bookmarks.map((b) => (
            <div
              key={b.id}
              className="py-4 flex items-center justify-between gap-4 text-xs"
            >
              <div>
                <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">
                  {b.itemType}
                </span>
                <Link
                  href={b.itemType === 'JOB' ? `/jobs/${b.itemSlug}` : `/study-material/${b.itemSlug}`}
                  className="font-bold text-slate-900 hover:text-blue-600 block mt-1 text-sm"
                >
                  {b.itemTitle}
                </Link>
                <span className="text-slate-400 text-[11px] block mt-0.5">
                  Saved on {formatDate(b.createdAt)}
                </span>
              </div>

              <Link
                href={b.itemType === 'JOB' ? `/jobs/${b.itemSlug}` : `/study-material/${b.itemSlug}`}
                className="px-4 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-bold rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>View</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

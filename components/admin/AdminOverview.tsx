'use client';

import Link from 'next/link';

export function AdminOverview() {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Firm outreach email</h2>
        <p>
          Firm outreach sends and operator digests are permanently disabled on this site.
          Inventory/enrich crons may still run; they do not email firms or operators.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick links</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/content"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-gray-50"
          >
            Manage content
          </Link>
          <Link
            href="/admin/blog-generator"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-gray-50"
          >
            Blog generator
          </Link>
          <Link
            href="/admin/police-confusion"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#2563eb] hover:bg-gray-50"
          >
            Police confusion
          </Link>
        </div>
      </section>
    </div>
  );
}

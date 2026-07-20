'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface StatusPayload {
  ok?: boolean;
  kvConfigured?: boolean;
  warning?: string;
  paused?: boolean;
  sendEnabled?: boolean;
  dailyCap?: number;
  config?: {
    kvConfigured?: boolean;
    resendConfigured?: boolean;
    brochureExists?: boolean;
    dryRun?: boolean;
    sendAllowed?: boolean;
    outreachEnabled?: boolean;
    cronConfigured?: boolean;
    countyAllowlist?: string[] | null;
  };
  counts?: Record<string, number>;
  report?: {
    summary?: {
      totalSends?: number;
      sentToday?: number;
      uniqueRecipients?: number;
      bounced?: number;
      unsubscribed?: number;
    };
  };
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div
      className={`rounded-lg border px-4 py-3 ${
        ok ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'
      }`}
    >
      <p className={`text-sm font-semibold ${ok ? 'text-emerald-800' : 'text-amber-800'}`}>{label}</p>
      <p className={`text-xs mt-1 ${ok ? 'text-emerald-700' : 'text-amber-700'}`}>
        {ok ? 'OK' : 'Needs attention'}
      </p>
    </div>
  );
}

export function AdminOverview() {
  const [data, setData] = useState<StatusPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/firm-outreach?scope=summary', { cache: 'no-store' })
      .then(async (res) => {
        const json = (await res.json()) as StatusPayload & { error?: string };
        if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
        setData(json);
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load status'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading admin overview…</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Could not load overview: {error}
      </div>
    );
  }

  const cfg = data?.config;
  const summary = data?.report?.summary;
  const counts = data?.counts ?? {};

  return (
    <div className="space-y-8">
      {data?.warning && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {data.warning}
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">System health</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatusBadge ok={Boolean(cfg?.kvConfigured)} label="Upstash Redis" />
          <StatusBadge ok={Boolean(cfg?.resendConfigured)} label="Resend email" />
          <StatusBadge ok={Boolean(cfg?.brochureExists)} label="Kent brochure PDF" />
          <StatusBadge ok={Boolean(cfg?.sendAllowed && !data?.paused)} label="Outreach sends" />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Outreach snapshot</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Ready to send</p>
            <p className="mt-1 text-2xl font-bold text-[#0A2342]">{counts.ready_to_send ?? 0}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Sent today</p>
            <p className="mt-1 text-2xl font-bold text-[#0A2342]">{summary?.sentToday ?? 0}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total sends</p>
            <p className="mt-1 text-2xl font-bold text-[#0A2342]">{summary?.totalSends ?? 0}</p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <p className="text-xs uppercase tracking-wide text-gray-500">Daily cap</p>
            <p className="mt-1 text-2xl font-bold text-[#0A2342]">{data?.dailyCap ?? '—'}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Quick links</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/firm-outreach"
            className="rounded-lg bg-[#0A2342] px-4 py-2 text-sm font-semibold text-white hover:bg-[#08192e]"
          >
            Open firm outreach
          </Link>
          <Link
            href="/admin/content"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#0A2342] hover:bg-gray-50"
          >
            Manage content
          </Link>
          <Link
            href="/admin/blog-generator"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#0A2342] hover:bg-gray-50"
          >
            Blog generator
          </Link>
          <Link
            href="/admin/police-confusion"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-[#0A2342] hover:bg-gray-50"
          >
            Police confusion
          </Link>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-4 text-sm text-gray-600">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Automated schedule (UTC)</h2>
        <ul className="space-y-1 list-disc list-inside">
          <li>02:00 — Police confusion SEO health check</li>
          <li>03:00 — Discovery + enrich (maintain)</li>
          <li>06:00 & 08:00 — Enrichment batches</li>
          <li>09:30 — Send queue + daily digest</li>
          <li>17:00 — Digest backup</li>
        </ul>
        {cfg?.countyAllowlist?.length ? (
          <p className="mt-3">County filter: {cfg.countyAllowlist.join(', ')}</p>
        ) : null}
      </section>
    </div>
  );
}

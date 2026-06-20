'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type TabId =
  | 'ready'
  | 'all'
  | 'delivered'
  | 'opened'
  | 'clicked'
  | 'bounced'
  | 'unsubscribed'
  | 'joined'
  | 'followup'
  | 'excluded'
  | 'suppressions';

interface ActivityRow {
  sendId: string;
  prospectId: string;
  firmName: string;
  prospectType: string;
  contactName?: string;
  county?: string;
  email: string;
  sequenceStep: number;
  touchLabel: string;
  subject: string;
  sendStatus: string;
  prospectStatus: string;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  waLinkClickedAt?: string;
  joinedWhatsAppAt?: string;
  bouncedAt?: string;
  suppressed: boolean;
  suppressionReason?: string;
}

interface QueueRow {
  prospectId: string;
  firmName: string;
  prospectType: string;
  contactName?: string;
  county?: string;
  email?: string;
  sources: string[];
  priorityScore: number;
  crimeWebsiteVerified?: boolean;
  updatedAt: string;
  suppressed: boolean;
  suppressionReason?: string;
}

interface ExcludedRow {
  prospectId: string;
  firmName: string;
  prospectType: string;
  contactName?: string;
  county?: string;
  email?: string;
  excludedReason?: string;
  sources: string[];
  crimeWebsiteVerified?: boolean;
  updatedAt: string;
  suppressed: boolean;
  suppressionReason?: string;
}

interface ReportPayload {
  generatedAt: string;
  summary: {
    totalSends: number;
    uniqueRecipients: number;
    bySendStatus: Record<string, number>;
    waClicks: number;
    joinedWhatsApp: number;
    bounced: number;
    complained: number;
    unsubscribed: number;
    pendingFollowUp1: number;
    pendingFollowUp2: number;
    readyToSend: number;
    discovered: number;
    noEmail: number;
    excluded: number;
    sentToday: number;
    sentLast7Days: number;
  };
  sends: ActivityRow[];
  readyToSendProspects: QueueRow[];
  excludedProspects: ExcludedRow[];
  suppressions: Array<{ email: string; reason: string; createdAt: string }>;
}

interface OutreachConfig {
  kvConfigured: boolean;
  resendConfigured: boolean;
  brochureExists: boolean;
  dryRun: boolean;
  outreachEnabled: boolean;
  sendEnabledEnv: boolean;
  sendAllowed: boolean;
  fromEmail: string | null;
  digestEmail: string | null;
  countyAllowlist: string[] | null;
  dailyCap: number;
  cronConfigured: boolean;
  envPaused: boolean;
  adminPaused: boolean | null;
  effectivePaused: boolean;
}

interface OutreachStats {
  kvConfigured?: boolean;
  warning?: string;
  indexHealth?: {
    masterIndexCount: number;
    indexedTotal: number;
    drifted: boolean;
    warning?: string;
  };
  paused: boolean;
  sendEnabled: boolean;
  dailyCap: number;
  counts: Record<string, number>;
  report: ReportPayload;
  config?: OutreachConfig;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'ready', label: 'Ready to send' },
  { id: 'all', label: 'Send log' },
  { id: 'delivered', label: 'Delivered' },
  { id: 'opened', label: 'Opened' },
  { id: 'clicked', label: 'Link clicked' },
  { id: 'bounced', label: 'Bounced' },
  { id: 'unsubscribed', label: 'Unsubscribed' },
  { id: 'joined', label: 'Replied' },
  { id: 'followup', label: 'Follow-up queue' },
  { id: 'excluded', label: 'Excluded' },
  { id: 'suppressions', label: 'Suppressions' },
];

function tabLabel(id: TabId, label: string, summary: ReportPayload['summary']): string {
  if (id === 'all') return `${label} (${summary.totalSends})`;
  if (id === 'ready') return `${label} (${summary.readyToSend})`;
  if (id === 'excluded') return `${label} (${summary.excluded})`;
  return label;
}

function fmt(iso?: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' });
}

function statusBadge(status: string): string {
  const map: Record<string, string> = {
    sent: 'bg-slate-100 text-slate-700',
    delivered: 'bg-emerald-50 text-emerald-800',
    opened: 'bg-blue-50 text-blue-800',
    clicked: 'bg-teal-50 text-teal-800',
    bounced: 'bg-red-50 text-red-800',
    complained: 'bg-red-100 text-red-900',
    unsubscribed: 'bg-amber-50 text-amber-900',
    joined_whatsapp: 'bg-emerald-100 text-emerald-900',
  };
  return map[status] ?? 'bg-slate-50 text-slate-600';
}

const SUMMARY_TIMEOUT_MS = 60_000;
const FULL_TIMEOUT_MS = 25_000;

const BTN_PRIMARY =
  'inline-flex items-center justify-center rounded-lg bg-[#0A2342] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0d2d54] disabled:opacity-50';
const BTN_OUTLINE =
  'inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-[#0A2342] hover:bg-gray-50 disabled:opacity-50';
const BTN_DANGER =
  'inline-flex items-center justify-center rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50';

export function FirmOutreachDashboard() {
  const [data, setData] = useState<OutreachStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fullError, setFullError] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingFull, setLoadingFull] = useState(true);
  const [tab, setTab] = useState<TabId>('ready');
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [actionId, setActionId] = useState<string | null>(null);
  const [actionKind, setActionKind] = useState<
    'restore' | 'send' | 'dry_run' | 'exclude' | 'bulk_send' | 'bulk_exclude' | null
  >(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);
  const [pipelineBusy, setPipelineBusy] = useState<string | null>(null);
  const [pipelineResult, setPipelineResult] = useState<string | null>(null);
  const [pauseBusy, setPauseBusy] = useState(false);

  const loadSummary = useCallback((background = false) => {
    if (!background) {
      setLoadingSummary(true);
      setError(null);
    }
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), SUMMARY_TIMEOUT_MS);

    fetch('/api/admin/firm-outreach?scope=summary', { signal: controller.signal })
      .then(async (res) => {
        const json = (await res.json()) as OutreachStats & { ok?: boolean; error?: string; warning?: string };
        if (!res.ok) {
          throw new Error(json.error ?? `Failed to load stats (${res.status})`);
        }
        if (json.warning) {
          console.warn('[firm-outreach admin]', json.warning);
        }
        return json;
      })
      .then((json) => {
        setData((prev) => ({
          ...json,
          report: {
            ...json.report,
            sends: prev?.report.sends ?? [],
            readyToSendProspects: prev?.report.readyToSendProspects ?? [],
            excludedProspects: prev?.report.excludedProspects ?? [],
            suppressions: prev?.report.suppressions ?? [],
          },
        }));
      })
      .catch((e) => {
        if (!background) {
          if (e instanceof Error && e.name === 'AbortError') {
            setError('Summary timed out — the server may be busy. Please retry.');
          } else {
            setError(e instanceof Error ? e.message : 'Error loading outreach summary');
          }
        }
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        setLoadingSummary(false);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const loadFull = useCallback((background = false) => {
    if (!background) {
      setLoadingFull(true);
      setFullError(null);
    }
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), FULL_TIMEOUT_MS);

    fetch('/api/admin/firm-outreach?scope=full', { signal: controller.signal })
      .then(async (res) => {
        const json = (await res.json()) as OutreachStats & { ok?: boolean; error?: string; warning?: string };
        if (!res.ok) {
          throw new Error(json.error ?? `Failed to load report (${res.status})`);
        }
        return json;
      })
      .then((json) => {
        setFullError(null);
        setData((prev) => {
          if (!prev) return json;
          return {
            ...json,
            report: {
              ...json.report,
              summary: prev.report.summary,
            },
          };
        });
      })
      .catch((e) => {
        const msg =
          e instanceof Error && e.name === 'AbortError'
            ? 'Tables timed out — the server may be busy. Please retry.'
            : e instanceof Error
              ? e.message
              : 'Error loading outreach tables';
        if (background) {
          setFullError(msg);
        } else {
          setFullError(msg);
        }
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
        setLoadingFull(false);
      });

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const load = useCallback(
    (background = false) => {
      const cleanupSummary = loadSummary(background);
      const cleanupFull = loadFull(background);
      return () => {
        cleanupSummary();
        cleanupFull();
      };
    },
    [loadSummary, loadFull],
  );

  useEffect(() => {
    return load(false);
  }, [load]);

  const filteredSends = useMemo(() => {
    if (!data?.report.sends) return [];
    const rows = data.report.sends;
    let filtered: ActivityRow[];
    switch (tab) {
      case 'delivered':
        filtered = rows.filter((r) => r.sendStatus === 'delivered' || r.deliveredAt);
        break;
      case 'opened':
        filtered = rows.filter((r) => r.sendStatus === 'opened' || r.openedAt);
        break;
      case 'clicked':
        filtered = rows.filter((r) => r.waLinkClickedAt || r.sendStatus === 'clicked');
        break;
      case 'bounced':
        filtered = rows.filter(
          (r) => r.sendStatus === 'bounced' || r.bouncedAt || r.prospectStatus === 'bounced',
        );
        break;
      case 'unsubscribed':
        filtered = rows.filter(
          (r) => r.prospectStatus === 'unsubscribed' || r.suppressionReason === 'unsubscribe',
        );
        break;
      case 'joined':
        filtered = rows.filter((r) => r.joinedWhatsAppAt || r.prospectStatus === 'joined_whatsapp');
        break;
      case 'followup':
        filtered = rows.filter(
          (r) =>
            r.prospectStatus === 'sent' &&
            !r.waLinkClickedAt &&
            !r.joinedWhatsAppAt &&
            r.sequenceStep < 2,
        );
        break;
      default:
        filtered = rows;
    }
    return [...filtered].sort((a, b) => {
      const ta = a.sentAt ? Date.parse(a.sentAt) : 0;
      const tb = b.sentAt ? Date.parse(b.sentAt) : 0;
      return tb - ta;
    });
  }, [data, tab]);

  const recentSends = useMemo(() => {
    if (!data?.report.sends?.length) return [];
    return [...data.report.sends]
      .sort((a, b) => {
        const ta = a.sentAt ? Date.parse(a.sentAt) : 0;
        const tb = b.sentAt ? Date.parse(b.sentAt) : 0;
        return tb - ta;
      })
      .slice(0, 8);
  }, [data]);

  const readyRows = data?.report.readyToSendProspects ?? [];
  const sendableReadyIds = useMemo(
    () => readyRows.filter((r) => r.email && !r.suppressed).map((r) => r.prospectId),
    [readyRows],
  );

  async function markJoined(prospectId: string) {
    setMarkingId(prospectId);
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_joined', prospectId }),
      });
      if (!res.ok) throw new Error('Failed to mark replied');
      load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setMarkingId(null);
    }
  }

  async function restoreExcluded(prospectId: string) {
    setActionId(prospectId);
    setActionKind('restore');
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'restore_excluded',
          prospectId,
          addManualSource: true,
        }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Failed to restore prospect');
      load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setActionId(null);
      setActionKind(null);
    }
  }

  async function excludeFromQueue(prospectId: string) {
    if (!window.confirm('Exclude this prospect from outreach?')) return;

    setActionId(prospectId);
    setActionKind('exclude');
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'exclude_prospect', prospectId }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Failed to exclude prospect');
      load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setActionId(null);
      setActionKind(null);
    }
  }

  async function manualSend(prospectId: string, dryRun: boolean) {
    if (
      !dryRun &&
      !window.confirm('Send outreach email to this prospect now? This bypasses the daily cap.')
    ) {
      return;
    }

    setActionId(prospectId);
    setActionKind(dryRun ? 'dry_run' : 'send');
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'manual_send', prospectId, dryRun }),
      });
      const json = (await res.json()) as { error?: string; send?: { subject?: string } };
      if (!res.ok) throw new Error(json.error ?? 'Failed to send');
      if (dryRun && json.send?.subject) {
        window.alert(`Dry run OK — would send: ${json.send.subject}`);
      }
      if (!dryRun) load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setActionId(null);
      setActionKind(null);
    }
  }

  function toggleSelect(prospectId: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(prospectId)) next.delete(prospectId);
      else next.add(prospectId);
      return next;
    });
  }

  function toggleSelectAllSendable() {
    const allSelected = sendableReadyIds.every((id) => selectedIds.has(id));
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sendableReadyIds));
    }
  }

  async function bulkSend(prospectIds: string[], dryRun: boolean) {
    if (prospectIds.length === 0) return;

    const sample = readyRows
      .filter((r) => prospectIds.includes(r.prospectId))
      .slice(0, 5)
      .map((r) => r.email)
      .filter(Boolean)
      .join(', ');

    if (
      !dryRun &&
      !window.confirm(
        `Send outreach to ${prospectIds.length} firm(s)?${sample ? `\n\nIncludes: ${sample}${prospectIds.length > 5 ? '…' : ''}` : ''}\n\nRespects daily cap.`,
      )
    ) {
      return;
    }

    setBulkBusy(true);
    setActionKind(dryRun ? 'dry_run' : 'bulk_send');
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_send',
          prospectIds,
          dryRun,
          respectDailyCap: true,
        }),
      });
      const json = (await res.json()) as {
        error?: string;
        bulk?: { sent: number; skipped: number; errors: number };
      };
      if (!res.ok) throw new Error(json.error ?? 'Bulk send failed');
      if (dryRun) {
        window.alert(`Dry run OK — would send to ${json.bulk?.sent ?? 0} prospect(s).`);
      } else {
        setSelectedIds(new Set());
        load(true);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setBulkBusy(false);
      setActionKind(null);
    }
  }

  async function runPipelineAction(
    action: string,
    opts?: { dryRun?: boolean; forceLaaRefresh?: boolean; limit?: number },
  ) {
    const label = action.replace(/_/g, ' ');
    if (
      (action === 'run_send' || action === 'run_full') &&
      !opts?.dryRun &&
      !window.confirm(`Run ${label} now? This may send live emails unless dry-run mode is on.`)
    ) {
      return;
    }

    setPipelineBusy(action);
    setPipelineResult(null);
    setError(null);
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...opts }),
      });
      const json = (await res.json()) as {
        error?: string;
        pipeline?: {
          skipped?: boolean;
          reason?: string;
          discovery?: { created: number; updated: number };
          enrich?: { processed: number; emailsFound: number; readyToSend: number };
          send?: { sent: number; skipped: number; errors: number };
        };
        enrich?: { processed: number; emailsFound: number; readyToSend: number };
        send?: { sent: number; skipped: number; errors: number };
        dryRun?: boolean;
      };
      if (!res.ok) throw new Error(json.error ?? `${label} failed`);

      if (json.pipeline?.skipped) {
        setPipelineResult(`${label}: skipped (${json.pipeline.reason ?? 'disabled'})`);
      } else if (json.pipeline?.discovery) {
        const d = json.pipeline.discovery;
        setPipelineResult(`Discovery: ${d.created} created, ${d.updated} updated`);
      } else if (json.enrich) {
        setPipelineResult(
          `Enrichment: ${json.enrich.processed} processed, ${json.enrich.emailsFound} emails found, ${json.enrich.readyToSend} ready`,
        );
      } else if (json.send) {
        setPipelineResult(
          `${json.dryRun ? 'Dry run' : 'Send'}: ${json.send.sent} sent, ${json.send.skipped} skipped, ${json.send.errors} errors`,
        );
      } else if (json.pipeline) {
        const d = json.pipeline.discovery;
        const e = json.pipeline.enrich;
        const s = json.pipeline.send;
        setPipelineResult(
          `Pipeline — discovery +${d?.created ?? 0}/${d?.updated ?? 0}, enrich ${e?.processed ?? 0} (${e?.emailsFound ?? 0} emails), send ${s?.sent ?? 0}`,
        );
      } else if (
        action === 'reindex' &&
        'reindex' in json &&
        json.reindex &&
        typeof json.reindex === 'object' &&
        'scanned' in json.reindex
      ) {
        const r = json.reindex as { scanned: number; byStatus?: Record<string, number> };
        const discovered = r.byStatus?.discovered ?? 0;
        setPipelineResult(`Reindex: ${r.scanned} scanned, ${discovered} discovered`);
      } else if (action === 'bootstrap' && 'countsAfter' in json) {
        const after = json.countsAfter as Record<string, number>;
        setPipelineResult(
          `Bootstrap: discovered ${after.discovered ?? 0}, ready ${after.ready_to_send ?? 0}`,
        );
      } else {
        setPipelineResult(`${label} completed`);
      }
      load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Pipeline error');
    } finally {
      setPipelineBusy(null);
    }
  }

  async function togglePause() {
    if (!data) return;
    const nextPaused = !data.paused;
    if (
      !nextPaused &&
      !window.confirm('Resume automated outreach sends? Cron and pipeline send will run again.')
    ) {
      return;
    }

    setPauseBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'set_pause', paused: nextPaused }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Failed to update pause state');
      load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setPauseBusy(false);
    }
  }

  async function bulkExclude(prospectIds: string[]) {
    if (prospectIds.length === 0) return;
    if (!window.confirm(`Exclude ${prospectIds.length} prospect(s) from outreach?`)) return;

    setBulkBusy(true);
    setActionKind('bulk_exclude');
    try {
      const res = await fetch('/api/admin/firm-outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulk_exclude', prospectIds }),
      });
      const json = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(json.error ?? 'Bulk exclude failed');
      setSelectedIds(new Set());
      load(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error');
    } finally {
      setBulkBusy(false);
      setActionKind(null);
    }
  }

  if (error && !data) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-700">{error}</p>
        <button type="button" onClick={() => load(false)} className={`${BTN_OUTLINE} !text-sm`}>
          Retry
        </button>
      </div>
    );
  }

  if (loadingSummary && !data) {
    return <p className="text-sm text-gray-500">Loading outreach summary…</p>;
  }

  if (!data) {
    return null;
  }

  const s = data.report.summary;

  const cfg = data.config;
  const configWarnings: string[] = [];
  if (data.warning) configWarnings.push(data.warning);
  if (data.indexHealth?.warning && !data.warning?.includes(data.indexHealth.warning)) {
    configWarnings.push(data.indexHealth.warning);
  }
  if (cfg && !cfg.kvConfigured) configWarnings.push('Upstash Redis is not configured.');
  if (cfg && !cfg.resendConfigured) configWarnings.push('RESEND_API_KEY is not set — emails cannot send.');
  if (cfg && !cfg.brochureExists) configWarnings.push('Brochure PDF missing from public/outreach/.');
  if (cfg?.dryRun) configWarnings.push('FIRM_OUTREACH_DRY_RUN=true — sends are simulated.');
  if (cfg && !cfg.sendEnabledEnv) configWarnings.push('FIRM_OUTREACH_SEND_ENABLED=false — automated sends disabled.');
  if (cfg?.envPaused) configWarnings.push('FIRM_OUTREACH_PAUSED=true in env — override via Vercel to resume.');
  if (cfg && !cfg.cronConfigured) configWarnings.push('CRON_SECRET not set — cron routes will reject.');

  return (
    <div className="space-y-8">
      {(configWarnings.length > 0 || data.paused) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-2">
          <p className="text-sm font-bold text-amber-900">Configuration & status</p>
          <ul className="list-disc pl-5 text-sm text-amber-900 space-y-1">
            {data.paused ? <li>Sends are paused{cfg?.envPaused ? ' (env)' : ' (admin toggle)'}.</li> : null}
            {configWarnings.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-[#0A2342]">Pipeline controls</h2>
            <p className="text-xs text-gray-500 mt-1">
              Manual runs for discovery, enrichment, and send queue. County:{' '}
              {cfg?.countyAllowlist?.join(', ') ?? 'kent'} · cap {data.dailyCap}/day
            </p>
          </div>
          <button
            type="button"
            disabled={pauseBusy || Boolean(cfg?.envPaused)}
            onClick={togglePause}
            className={data.paused ? BTN_PRIMARY : BTN_DANGER}
            title={cfg?.envPaused ? 'Paused via env var — change on Vercel' : undefined}
          >
            {pauseBusy ? 'Updating…' : data.paused ? 'Resume sends' : 'Pause sends'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('run_discovery')}
            className={BTN_OUTLINE}
          >
            {pipelineBusy === 'run_discovery' ? 'Running…' : 'Run discovery'}
          </button>
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('reindex')}
            className={data.indexHealth?.drifted ? BTN_PRIMARY : BTN_OUTLINE}
            title="Rebuild status indexes from prospect records"
          >
            {pipelineBusy === 'reindex' ? 'Rebuilding…' : 'Rebuild indexes'}
          </button>
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('run_enrich', { limit: 60 })}
            className={BTN_OUTLINE}
          >
            {pipelineBusy === 'run_enrich' ? 'Running…' : 'Run enrich (60)'}
          </button>
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('run_send', { dryRun: true })}
            className={BTN_OUTLINE}
          >
            {pipelineBusy === 'run_send' ? 'Running…' : 'Dry-run send'}
          </button>
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('run_send')}
            className={BTN_PRIMARY}
          >
            {pipelineBusy === 'run_send' ? 'Running…' : 'Send queue now'}
          </button>
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('run_maintain')}
            className={BTN_OUTLINE}
          >
            {pipelineBusy === 'run_maintain' ? 'Running…' : 'Maintain (discover + enrich)'}
          </button>
          <button
            type="button"
            disabled={Boolean(pipelineBusy)}
            onClick={() => runPipelineAction('run_full', { dryRun: true })}
            className={BTN_OUTLINE}
          >
            {pipelineBusy === 'run_full' ? 'Running…' : 'Dry-run full pipeline'}
          </button>
        </div>
        {pipelineResult ? (
          <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
            {pipelineResult}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-gray-500">
          Report generated {fmt(data.report.generatedAt)}
        </p>
        <a
          href="/api/admin/firm-outreach?format=csv"
          className={`${BTN_OUTLINE} !text-sm no-underline`}
          download
        >
          Download CSV
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        <StatCard label="Emails sent" value={s.totalSends} />
        <StatCard label="Sent today" value={s.sentToday ?? 0} />
        <StatCard label="Sent (7 days)" value={s.sentLast7Days ?? 0} />
        <StatCard label="Unique recipients" value={s.uniqueRecipients} />
        <StatCard label="Delivered" value={s.bySendStatus.delivered ?? 0} />
        <StatCard label="Opened" value={s.bySendStatus.opened ?? 0} />
        <StatCard label="Solicitors page clicked" value={s.waClicks} />
        <StatCard label="Replied" value={s.joinedWhatsApp} />
        <StatCard label="Bounced" value={s.bounced} />
        <StatCard label="Unsubscribed" value={s.unsubscribed} />
        <StatCard label="Follow-up due (7d)" value={s.pendingFollowUp1} />
        <StatCard label="Follow-up due (21d)" value={s.pendingFollowUp2} />
        <StatCard label="Ready to send" value={s.readyToSend} />
        <StatCard
          label="Discovered (pending enrich)"
          value={s.discovered}
          hint="No email yet — nightly enrich promotes qualified firms"
        />
        <StatCard label="No email (3 tries)" value={s.noEmail} />
        <StatCard label="Excluded" value={s.excluded} />
        <StatCard
          label="Daily cap"
          value={data.dailyCap}
          hint={data.paused ? 'PAUSED' : data.sendEnabled ? 'Auto' : 'Sends off'}
        />
      </div>

      {recentSends.length > 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 pb-3">
            <h2 className="text-sm font-bold text-[#0A2342]">Recent sends</h2>
            <button
              type="button"
              onClick={() => setTab('all')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View full send log
            </button>
          </div>
          <ul className="mt-3 divide-y divide-gray-200">
            {recentSends.map((r) => (
              <li key={r.sendId} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 py-2 text-sm">
                <span className="font-semibold text-[#0A2342]">{r.firmName}</span>
                <span className="font-mono text-xs text-gray-500">{r.email}</span>
                <span className="text-xs text-gray-500 truncate max-w-md" title={r.subject}>
                  {r.subject}
                </span>
                <span className="text-xs whitespace-nowrap text-gray-500">{fmt(r.sentAt)}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {fullError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-amber-900">{fullError}</p>
          <button type="button" onClick={() => loadFull(false)} className={`${BTN_OUTLINE} !text-sm`}>
            Retry tables
          </button>
        </div>
      ) : null}

      {loadingFull ? (
        <p className="text-sm text-gray-500">Loading send log and queues…</p>
      ) : null}

      {!loadingFull && !fullError ? (
      <>
      <nav className="flex flex-wrap gap-2 border-b border-gray-200 pb-3">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              tab === t.id
                ? 'bg-[#0A2342] text-white'
                : 'bg-white text-[#0A2342] border border-gray-200 hover:border-[#0A2342]'
            }`}
          >
            {tabLabel(t.id, t.label, s)}
          </button>
        ))}
      </nav>

      {tab === 'all' ? (
        <p className="text-xs text-gray-500">
          Export includes firm, email, subject, sent_at, and delivery events (Download CSV above).
        </p>
      ) : null}

      {tab === 'suppressions' ? (
        <ActivityTable
          title="Suppression list (unsubscribe, bounce, complaint, replied)"
          rows={data.report.suppressions.map((x) => ({
            key: x.email,
            cells: [
              x.email,
              x.reason,
              fmt(x.createdAt),
            ],
          }))}
          headers={['Email', 'Reason', 'Since']}
          empty="No suppressions recorded."
        />
      ) : tab === 'ready' ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-4 py-3 space-y-3">
            <h2 className="text-sm font-bold text-[#0A2342]">
              Ready to send ({data.report.readyToSendProspects?.length ?? 0}
              {s.readyToSend > (data.report.readyToSendProspects?.length ?? 0)
                ? ` of ${s.readyToSend} total`
                : ''}
              )
            </h2>
            <p className="text-xs text-gray-500">
              {selectedIds.size} selected · {sendableReadyIds.length} sendable · daily cap{' '}
              {data.dailyCap} · sent today {s.sentToday ?? 0}
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={bulkBusy || sendableReadyIds.length === 0}
                onClick={() => bulkSend(sendableReadyIds, false)}
                className={`${BTN_PRIMARY} disabled:opacity-50`}
              >
                {bulkBusy && actionKind === 'bulk_send'
                  ? 'Sending…'
                  : `Send to all (${sendableReadyIds.length})`}
              </button>
              <button
                type="button"
                disabled={bulkBusy || selectedIds.size === 0}
                onClick={() => bulkSend([...selectedIds], false)}
                className={`${BTN_OUTLINE} disabled:opacity-50`}
              >
                Send to selected ({selectedIds.size})
              </button>
              <button
                type="button"
                disabled={bulkBusy || selectedIds.size === 0}
                onClick={() => bulkExclude([...selectedIds])}
                className={`${BTN_DANGER} disabled:opacity-50`}
              >
                Exclude selected ({selectedIds.size})
              </button>
              <button
                type="button"
                disabled={bulkBusy || sendableReadyIds.length === 0}
                onClick={() => bulkSend(sendableReadyIds, true)}
                className={`${BTN_OUTLINE} disabled:opacity-50`}
              >
                Dry run all
              </button>
            </div>
          </div>
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-slate-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all sendable"
                    checked={
                      sendableReadyIds.length > 0 &&
                      sendableReadyIds.every((id) => selectedIds.has(id))
                    }
                    onChange={toggleSelectAllSendable}
                    disabled={sendableReadyIds.length === 0}
                  />
                </th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Firm / contact</th>
                <th className="px-4 py-3">Sources</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {readyRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No firms queued for outreach yet. Check the Excluded tab or run enrichment.
                  </td>
                </tr>
              ) : (
                readyRows.map((r) => {
                  const busy = actionId === r.prospectId || bulkBusy;
                  const canSend = Boolean(r.email) && !r.suppressed;
                  return (
                    <tr key={r.prospectId} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          aria-label={`Select ${r.firmName}`}
                          checked={selectedIds.has(r.prospectId)}
                          onChange={() => toggleSelect(r.prospectId)}
                          disabled={!canSend}
                        />
                      </td>
                      <td className="px-4 py-3 font-mono text-sm text-[#0A2342]">
                        {r.email ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#0A2342]">{r.firmName}</p>
                        {r.contactName ? (
                          <p className="text-xs text-gray-500">{r.contactName}</p>
                        ) : null}
                        {r.county ? (
                          <p className="text-xs text-gray-500">{r.county}</p>
                        ) : null}
                        {r.crimeWebsiteVerified ? (
                          <p className="text-xs text-emerald-700">Crime website verified</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-xs">{r.sources.join(', ')}</td>
                      <td className="px-4 py-3 text-xs font-semibold">{r.priorityScore}</td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap">{fmt(r.updatedAt)}</td>
                      <td className="px-4 py-3 space-y-1">
                        {canSend ? (
                          <>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => manualSend(r.prospectId, false)}
                              className="block text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
                            >
                              {busy && actionKind === 'send' ? 'Sending…' : 'Send now'}
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => manualSend(r.prospectId, true)}
                              className="block text-xs text-gray-500 hover:underline disabled:opacity-50"
                            >
                              {busy && actionKind === 'dry_run' ? 'Checking…' : 'Dry run'}
                            </button>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500">
                            {!r.email ? 'No email' : 'Send blocked (suppressed)'}
                          </p>
                        )}
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => excludeFromQueue(r.prospectId)}
                          className="block text-xs text-red-700 hover:underline disabled:opacity-50"
                        >
                          {busy && actionKind === 'exclude' ? 'Excluding…' : 'Exclude'}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : tab === 'excluded' ? (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-bold text-[#0A2342]">
            Excluded prospects ({data.report.excludedProspects?.length ?? 0}
            {s.excluded > (data.report.excludedProspects?.length ?? 0)
              ? ` of ${s.excluded} total`
              : ''}
            )
          </h2>
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-slate-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Firm / contact</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Excluded reason</th>
                <th className="px-4 py-3">Sources</th>
                <th className="px-4 py-3">Updated</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(data.report.excludedProspects ?? []).length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No excluded prospects in this view.
                  </td>
                </tr>
              ) : (
                (data.report.excludedProspects ?? []).map((r) => {
                  const busy = actionId === r.prospectId;
                  const canSend = Boolean(r.email) && !r.suppressed;
                  return (
                    <tr key={r.prospectId} className="hover:bg-slate-50/80">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#0A2342]">{r.firmName}</p>
                        {r.contactName ? (
                          <p className="text-xs text-gray-500">{r.contactName}</p>
                        ) : null}
                        {r.county ? (
                          <p className="text-xs text-gray-500">{r.county}</p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">{r.email ?? '—'}</td>
                      <td className="px-4 py-3 text-xs">
                        <span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-amber-900">
                          {r.excludedReason ?? 'excluded'}
                        </span>
                        {r.suppressed ? (
                          <p className="mt-1 text-xs text-red-700">
                            suppressed ({r.suppressionReason})
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3 text-xs">{r.sources.join(', ')}</td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap">{fmt(r.updatedAt)}</td>
                      <td className="px-4 py-3 space-y-1">
                        <button
                          type="button"
                          disabled={busy}
                          onClick={() => restoreExcluded(r.prospectId)}
                          className="block text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
                        >
                          {busy && actionKind === 'restore' ? 'Restoring…' : 'Restore to queue'}
                        </button>
                        {canSend ? (
                          <>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => manualSend(r.prospectId, false)}
                              className="block text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
                            >
                              {busy && actionKind === 'send' ? 'Sending…' : 'Send now'}
                            </button>
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => manualSend(r.prospectId, true)}
                              className="block text-xs text-gray-500 hover:underline disabled:opacity-50"
                            >
                              {busy && actionKind === 'dry_run' ? 'Checking…' : 'Dry run'}
                            </button>
                          </>
                        ) : (
                          <p className="text-xs text-gray-500">
                            {!r.email ? 'No email' : 'Send blocked (suppressed)'}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-slate-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-4 py-3">Firm / contact</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Touch</th>
                <th className="px-4 py-3">Send status</th>
                <th className="px-4 py-3">Sent at</th>
                <th className="hidden md:table-cell px-4 py-3">Delivered</th>
                <th className="hidden md:table-cell px-4 py-3">Opened</th>
                <th className="hidden lg:table-cell px-4 py-3">Link click</th>
                <th className="hidden lg:table-cell px-4 py-3">Replied</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSends.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-8 text-center text-gray-500">
                    {tab === 'all'
                      ? 'No outreach emails sent yet. Use Ready to send or wait for the daily cron.'
                      : 'No records in this view yet.'}
                  </td>
                </tr>
              ) : (
                filteredSends.map((r) => (
                  <tr key={r.sendId} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-[#0A2342]">{r.firmName}</p>
                      {r.contactName ? (
                        <p className="text-xs text-gray-500">{r.contactName}</p>
                      ) : null}
                      {r.county ? (
                        <p className="text-xs text-gray-500">{r.county}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">{r.email}</td>
                    <td className="px-4 py-3 text-xs max-w-xs truncate" title={r.subject}>
                      {r.subject}
                    </td>
                    <td className="px-4 py-3 text-xs">{r.touchLabel}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${statusBadge(r.sendStatus)}`}
                      >
                        {r.sendStatus}
                      </span>
                      {r.suppressed ? (
                        <p className="mt-1 text-xs text-amber-700">suppressed ({r.suppressionReason})</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-3 text-xs whitespace-nowrap">{fmt(r.sentAt)}</td>
                    <td className="hidden md:table-cell px-4 py-3 text-xs whitespace-nowrap">
                      {fmt(r.deliveredAt)}
                    </td>
                    <td className="hidden md:table-cell px-4 py-3 text-xs whitespace-nowrap">
                      {fmt(r.openedAt)}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3 text-xs whitespace-nowrap">
                      {fmt(r.waLinkClickedAt)}
                    </td>
                    <td className="hidden lg:table-cell px-4 py-3 text-xs whitespace-nowrap">
                      {fmt(r.joinedWhatsAppAt)}
                    </td>
                    <td className="px-4 py-3">
                      {!r.joinedWhatsAppAt ? (
                        <button
                          type="button"
                          disabled={markingId === r.prospectId}
                          onClick={() => markJoined(r.prospectId)}
                          className="text-xs font-semibold text-blue-600 hover:underline disabled:opacity-50"
                        >
                          {markingId === r.prospectId ? 'Saving…' : 'Mark replied'}
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-700">✓</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      </>
      ) : null}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-[#0A2342]">Pipeline queue</h2>
        <dl className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(data.counts).map(([status, count]) => (
            <div key={status} className="flex justify-between text-sm">
              <dt className="text-gray-500">{status}</dt>
              <dd className="font-semibold text-[#0A2342]">{count}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold text-[#0A2342]">{value}</p>
      {hint ? <p className="mt-0.5 text-xs font-semibold text-amber-600">{hint}</p> : null}
    </div>
  );
}

function ActivityTable({
  title,
  headers,
  rows,
  empty,
}: {
  title: string;
  headers: string[];
  rows: { key: string; cells: string[] }[];
  empty: string;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <h2 className="border-b border-gray-200 px-4 py-3 text-sm font-bold text-[#0A2342]">
        {title}
      </h2>
      {rows.length === 0 ? (
        <p className="px-4 py-8 text-sm text-gray-500">{empty}</p>
      ) : (
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-slate-50 text-xs uppercase text-gray-500">
            <tr>
              {headers.map((h) => (
                <th key={h} className="px-4 py-2">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((r) => (
              <tr key={r.key}>
                {r.cells.map((c, i) => (
                  <td key={i} className="px-4 py-2 text-sm">
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

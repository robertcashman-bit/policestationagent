import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin-auth';
import { getKV } from '@/lib/kv';
import { dailySendCap } from '@/lib/firm-outreach/constants';
import { getOutreachConfigStatus } from '@/lib/firm-outreach/config-status';
import {
  activityReportToCsv,
  buildOutreachActivityReport,
  buildOutreachDashboardSummary,
  emptyOutreachActivityReport,
} from '@/lib/firm-outreach/outreach/activity-report';
import {
  getOutreachPauseSummary,
  setAdminPauseState,
} from '@/lib/firm-outreach/pause-state';
import { markProspectJoinedWhatsApp } from '@/lib/firm-outreach/storage';
import {
  bulkExcludeProspects,
  bulkSendProspects,
  excludeProspect,
  manualSendProspect,
  restoreExcludedProspect,
} from '@/lib/firm-outreach/outreach/admin-actions';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

async function buildStatusPayload(scope: 'summary' | 'full') {
  const config = await getOutreachConfigStatus();
  const pause = await getOutreachPauseSummary();

  if (!getKV()) {
    const empty = emptyOutreachActivityReport();
    return {
      ok: true as const,
      kvConfigured: false,
      warning: 'Upstash Redis not configured — outreach data unavailable',
      paused: pause.effectivePaused,
      sendEnabled: config.sendAllowed,
      dailyCap: dailySendCap(),
      config,
      counts: empty.prospectCounts,
      report: empty.report,
      scope,
    };
  }

  const { getProspectStatusSnapshot } = await import('@/lib/firm-outreach/storage');
  const { getProspectIndexHealth } = await import('@/lib/firm-outreach/index-health');
  const snapshot = await getProspectStatusSnapshot();

  const { report, prospectCounts } =
    scope === 'full'
      ? await buildOutreachActivityReport(snapshot)
      : await buildOutreachDashboardSummary(snapshot);

  const indexHealth = await getProspectIndexHealth(snapshot);
  const warnings: string[] = [];
  if (indexHealth.warning) warnings.push(indexHealth.warning);

  return {
    ok: true as const,
    kvConfigured: true,
    paused: pause.effectivePaused,
    sendEnabled: config.sendAllowed,
    dailyCap: dailySendCap(),
    config,
    counts: prospectCounts,
    report,
    scope,
    indexHealth,
    countsFromCache: snapshot.fromCache,
    warning: warnings.length > 0 ? warnings.join(' ') : undefined,
  };
}

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format');
    const scopeParam = url.searchParams.get('scope');
    const scope: 'summary' | 'full' =
      format === 'csv' || scopeParam === 'full' ? 'full' : 'summary';
    const payload = await buildStatusPayload(scope);

    if (format === 'csv') {
      const csv = activityReportToCsv(payload.report);
      const date = payload.report.generatedAt.slice(0, 10);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="firm-outreach-${date}.csv"`,
        },
      });
    }

    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to build outreach report';
    console.error('[admin/firm-outreach]', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  try {
    let body: {
      action?: string;
      prospectId?: string;
      prospectIds?: string[];
      targetStatus?: 'discovered' | 'ready_to_send';
      addManualSource?: boolean;
      crimeWebsiteVerified?: boolean;
      dryRun?: boolean;
      reason?: string;
      limit?: number;
      respectDailyCap?: boolean;
      forceLaaRefresh?: boolean;
      paused?: boolean;
    };
    try {
      body = (await request.json()) as typeof body;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    if (body.action === 'bootstrap') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const { bootstrapOutreach } = await import('@/lib/firm-outreach/bootstrap-outreach');
      const result = await bootstrapOutreach({
        batches: body.limit && body.limit > 10 ? Math.min(body.limit, 15) : 8,
        limit: 60,
        reindex: true,
      });
      return NextResponse.json({ ok: true, ...result });
    }

    if (body.action === 'reindex') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const { reindexProspectStatuses } = await import('@/lib/firm-outreach/reindex-prospects');
      const { countProspectsByStatus } = await import('@/lib/firm-outreach/storage');
      const countsBefore = await countProspectsByStatus();
      const reindex = await reindexProspectStatuses();
      const countsAfter = await countProspectsByStatus();
      return NextResponse.json({ ok: true, reindex, countsBefore, countsAfter });
    }

    if (body.action === 'set_pause') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      if (process.env.FIRM_OUTREACH_PAUSED === 'true') {
        return NextResponse.json(
          {
            error:
              'Sends are paused via FIRM_OUTREACH_PAUSED env — remove that on Vercel to resume',
          },
          { status: 409 },
        );
      }
      await setAdminPauseState(Boolean(body.paused));
      const pause = await getOutreachPauseSummary();
      const config = await getOutreachConfigStatus();
      return NextResponse.json({ ok: true, pause, sendEnabled: config.sendAllowed });
    }

    if (body.action === 'run_discovery') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const [{ fetchLaaCrimeProviders }, { ensureDsccRegisterCache }, { runFirmDiscovery }, { requalifyAllProspects }] =
        await Promise.all([
          import('@/lib/legal-directory/laa-fetch'),
          import('@/lib/dscc-register-lookup'),
          import('@/lib/firm-outreach/discovery/run-discovery'),
          import('@/lib/firm-outreach/requalify-prospects'),
        ]);
      const laa = await fetchLaaCrimeProviders({ force: body.forceLaaRefresh ?? false }).catch(
        () => fetchLaaCrimeProviders({ force: false }),
      );
      const dscc = await ensureDsccRegisterCache();
      const discovery = await runFirmDiscovery();
      const requalify = await requalifyAllProspects();
      return NextResponse.json({
        ok: true,
        pipeline: {
          laa: { refreshed: laa.refreshed, source: laa.source, count: laa.records.length },
          dscc: { count: dscc?.count ?? 0, syncedAt: dscc?.syncedAt ?? null },
          discovery,
          requalify,
        },
      });
    }

    if (body.action === 'run_enrich') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const { runFirmEnrichment } = await import('@/lib/firm-outreach/enrichment/run-enrich');
      const enrich = await runFirmEnrichment({
        limit: body.limit ?? 60,
        maxElapsedMs: 110_000,
      });
      return NextResponse.json({ ok: true, enrich });
    }

    if (body.action === 'run_send') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const { runFirmOutreach } = await import('@/lib/firm-outreach/outreach/run-outreach');
      const { notifyOutreachBatchSent } = await import(
        '@/lib/firm-outreach/outreach/send-confirmation-email'
      );
      const send = await runFirmOutreach({
        limit: body.limit,
        dryRun: body.dryRun,
      });
      if (!body.dryRun) {
        await notifyOutreachBatchSent(send, { source: 'manual' });
      }
      return NextResponse.json({ ok: true, send, dryRun: Boolean(body.dryRun) });
    }

    if (body.action === 'run_maintain') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const { runFirmOutreachPipeline } = await import('@/lib/firm-outreach/run-pipeline');
      const result = await runFirmOutreachPipeline({
        skipSend: true,
        enrichLimit: body.limit ?? 60,
        forceLaaRefresh: body.forceLaaRefresh,
        skipDigest: true,
      });
      return NextResponse.json({ ok: true, pipeline: result });
    }

    if (body.action === 'run_full') {
      if (!getKV()) {
        return NextResponse.json({ error: 'KV not configured' }, { status: 503 });
      }
      const { runFirmOutreachPipeline } = await import('@/lib/firm-outreach/run-pipeline');
      const result = await runFirmOutreachPipeline({
        enrichLimit: body.limit ?? 60,
        sendLimit: body.limit,
        sendDryRun: body.dryRun,
        forceLaaRefresh: body.forceLaaRefresh,
        skipDigest: true,
      });
      return NextResponse.json({ ok: true, pipeline: result, dryRun: Boolean(body.dryRun) });
    }

    if (body.action === 'mark_joined' && body.prospectId?.trim()) {
      const prospect = await markProspectJoinedWhatsApp(body.prospectId.trim());
      if (!prospect) {
        return NextResponse.json({ error: 'Prospect not found' }, { status: 404 });
      }
      return NextResponse.json({ ok: true, prospect });
    }

    if (body.action === 'restore_excluded' && body.prospectId?.trim()) {
      const result = await restoreExcludedProspect(body.prospectId.trim(), {
        targetStatus: body.targetStatus,
        addManualSource: body.addManualSource,
        crimeWebsiteVerified: body.crimeWebsiteVerified,
      });
      if (!result.ok) {
        const status = result.error === 'not_found' ? 404 : 400;
        return NextResponse.json({ error: result.error }, { status });
      }
      return NextResponse.json({ ok: true, prospect: result.prospect });
    }

    if (body.action === 'exclude_prospect' && body.prospectId?.trim()) {
      const result = await excludeProspect(body.prospectId.trim(), body.reason);
      if (!result.ok) {
        const status = result.error === 'not_found' ? 404 : 400;
        return NextResponse.json({ error: result.error }, { status });
      }
      return NextResponse.json({ ok: true, prospect: result.prospect });
    }

    if (body.action === 'bulk_send' && Array.isArray(body.prospectIds) && body.prospectIds.length > 0) {
      const ids = body.prospectIds.map((id) => id.trim()).filter(Boolean);
      const result = await bulkSendProspects(ids, {
        dryRun: body.dryRun,
        limit: body.limit,
        respectDailyCap: body.respectDailyCap,
      });
      return NextResponse.json({ ok: true, bulk: result });
    }

    if (body.action === 'bulk_exclude' && Array.isArray(body.prospectIds) && body.prospectIds.length > 0) {
      const ids = body.prospectIds.map((id) => id.trim()).filter(Boolean);
      const result = await bulkExcludeProspects(ids, body.reason);
      return NextResponse.json({ ok: true, bulk: result });
    }

    if (body.action === 'manual_send' && body.prospectId?.trim()) {
      const result = await manualSendProspect(body.prospectId.trim(), {
        dryRun: body.dryRun,
      });
      if (!result.ok) {
        const status =
          result.error === 'not_found' ? 404 : result.error === 'suppressed' ? 409 : 400;
        return NextResponse.json({ error: result.error }, { status });
      }
      return NextResponse.json({
        ok: true,
        prospect: result.prospect,
        send: result.data,
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Request failed';
    console.error('[admin/firm-outreach POST]', err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

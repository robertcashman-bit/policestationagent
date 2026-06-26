import { existsSync, readFileSync, statSync } from 'fs';
import { resolve } from 'path';
import { BROCHURE_PUBLIC_PATH, loadBrochureAttachment } from './brochure/load-attachment';
import { FIRM_OUTREACH_CAMPAIGN_ID } from './constants';
import { buildOutreachEmailHtml, subjectForStep } from './outreach/templates';
import type { FirmProspect } from './types';

export function checkEnrichSaveUsesPreviousStatus(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/enrichment/run-enrich.ts');
  if (!existsSync(file)) {
    return { name: 'enrich_save_previous_status', ok: false, detail: 'run-enrich.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('const prevStatus = p.status') &&
    src.includes('saveProspect(enriched, prevStatus)') &&
    !src.includes('saveProspect(enriched, p.status)');
  return {
    name: 'enrich_save_previous_status',
    ok,
    detail: ok ? 'prevStatus captured before enrichOne' : 'saveProspect still uses mutated status',
  };
}

export function checkSendUsesRecordStatus(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/outreach/run-outreach.ts');
  if (!existsSync(file)) {
    return { name: 'send_uses_record_status', ok: false, detail: 'run-outreach.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('listProspectsByRecordStatus') &&
    !src.includes("listProspectsByStatus('ready_to_send'") &&
    !src.includes("listProspectsByStatus('sent'");
  return {
    name: 'send_uses_record_status',
    ok,
    detail: ok ? 'run-outreach uses record-based lists' : 'send still uses index-based status lists',
  };
}

export function checkListProspectsByRecordStatusExported(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/storage.ts');
  if (!existsSync(file)) {
    return { name: 'listProspectsByRecordStatus_exported', ok: false, detail: 'storage.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('export async function listProspectIdsByRecordStatus') &&
    src.includes('export async function listProspectsByRecordStatus');
  return {
    name: 'listProspectsByRecordStatus_exported',
    ok,
    detail: ok ? 'record status helpers exported' : 'missing listProspectsByRecordStatus',
  };
}

export function checkApprovalCronSkipsSend(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'app/api/cron/firm-outreach-pipeline/full/route.ts');
  if (!existsSync(file)) {
    return { name: 'approval_cron_skips_send', ok: false, detail: 'full cron route missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('outreachRequireApproval') &&
    src.includes('skipSend: true') &&
    src.includes('sendOutreachApprovalRequestEmail');
  return {
    name: 'approval_cron_skips_send',
    ok,
    detail: ok ? 'approval-only morning cron' : 'full cron missing approval gate',
  };
}

export function checkBootstrapSecretRouteExists(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'app/api/cron/firm-outreach-bootstrap/route.ts');
  const ok = existsSync(file);
  return {
    name: 'bootstrap_secret_route_exists',
    ok,
    detail: ok ? file : 'Missing firm-outreach-bootstrap route',
  };
}

export function checkSendApprovalTokenGuard(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/outreach/send-approval-token.ts');
  if (!existsSync(file)) {
    return { name: 'send_approval_token_guard', ok: false, detail: 'send-approval-token.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('ADMIN_DECISION_TOKEN_SECRET') &&
    src.includes('CRON_SECRET') &&
    src.includes('production');
  return {
    name: 'send_approval_token_guard',
    ok,
    detail: ok ? 'approval token fail-closed in production' : 'missing production token guard',
  };
}

export function checkRepairLoopRequiresReady(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'scripts/firm-outreach-repair-loop.mjs');
  if (!existsSync(file)) {
    return { name: 'repair_loop_checks_ready', ok: false, detail: 'repair-loop script missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('ready_to_send') &&
    src.includes('sendAllowed') &&
    src.includes('Repair OK');
  return {
    name: 'repair_loop_checks_ready',
    ok,
    detail: ok ? 'repair loop asserts ready queue' : 'repair loop missing ready success criteria',
  };
}

export function checkTestGlobIncludesOutreachSendApproved(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'package.json');
  if (!existsSync(file)) {
    return { name: 'test_glob_includes_outreach_send_approved', ok: false, detail: 'package.json missing' };
  }
  const pkg = JSON.parse(readFileSync(file, 'utf8')) as {
    scripts?: { 'test:firm-outreach'?: string };
  };
  const script = pkg.scripts?.['test:firm-outreach'] ?? '';
  const ok =
    script.includes('firm-outreach*.test.ts') && script.includes('outreach-*.test.ts');
  return {
    name: 'test_glob_includes_outreach_send_approved',
    ok,
    detail: ok ? script : 'test:firm-outreach glob should include firm-outreach*.test.ts and outreach-*.test.ts',
  };
}

export function checkHealthLoopScriptExists(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'scripts/firm-outreach-health-loop.mjs');
  const ok = existsSync(file);
  return {
    name: 'health_loop_script_exists',
    ok,
    detail: ok ? file : 'Missing firm-outreach-health-loop.mjs',
  };
}

export function checkNationalDiscoveryScope(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/constants.ts');
  if (!existsSync(file)) {
    return { name: 'national_discovery_scope', ok: false, detail: 'constants.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok = /countyAllowlist:\s*null/.test(src);
  return {
    name: 'national_discovery_scope',
    ok,
    detail: ok ? 'discovery includes all counties by default' : 'countyAllowlist still restricted',
  };
}

export function checkReindexSafetyGuard(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/reindex-prospects.ts');
  if (!existsSync(file)) {
    return { name: 'reindex_safety_guard', ok: false, detail: 'reindex-prospects.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok = src.includes('assertSafeReindexWrite') && src.includes('ReindexSafetyError');
  return {
    name: 'reindex_safety_guard',
    ok,
    detail: ok ? 'assertSafeReindexWrite present' : 'missing reindex safety guard',
  };
}

export function checkAdminSummarySnapshotDeduped(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'app/api/admin/firm-outreach/route.ts');
  if (!existsSync(file)) {
    return { name: 'admin_summary_snapshot_deduped', ok: false, detail: 'admin route missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('getProspectStatusSnapshot()') &&
    src.includes('buildOutreachDashboardSummary(snapshot)') &&
    src.includes('getProspectIndexHealth(snapshot)');
  return {
    name: 'admin_summary_snapshot_deduped',
    ok,
    detail: ok ? 'single snapshot shared across summary and index health' : 'duplicate prospect scans',
  };
}

export function checkAdminSummaryTimeout(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'components/admin/FirmOutreachDashboard.tsx');
  if (!existsSync(file)) {
    return { name: 'admin_summary_timeout', ok: false, detail: 'FirmOutreachDashboard missing' };
  }
  const src = readFileSync(file, 'utf8');
  const match = src.match(/SUMMARY_TIMEOUT_MS\s*=\s*([\d_]+)/);
  const ms = match ? Number(match[1].replace(/_/g, '')) : 0;
  const ok = ms >= 25_000;
  return {
    name: 'admin_summary_timeout',
    ok,
    detail: ok ? `${ms}ms client abort` : `timeout too low (${ms || 'missing'}ms)`,
  };
}

export function checkProspectCountsCache(rootDir = process.cwd()): RepoCheckResult {
  const file = resolve(rootDir, 'lib/firm-outreach/storage.ts');
  if (!existsSync(file)) {
    return { name: 'prospect_counts_cache', ok: false, detail: 'storage.ts missing' };
  }
  const src = readFileSync(file, 'utf8');
  const ok =
    src.includes('getProspectStatusSnapshot') &&
    src.includes('allowStale') &&
    src.includes('writeProspectCountsCache');
  return {
    name: 'prospect_counts_cache',
    ok,
    detail: ok ? 'KV snapshot cache with stale fallback' : 'missing prospect counts cache',
  };
}

export const EXPECTED_CRON_ROUTES = [
  '/api/cron/firm-outreach-kent-corrections',
  '/api/cron/firm-outreach-pipeline/maintain',
  '/api/cron/firm-outreach-enrich',
  '/api/cron/firm-outreach-pipeline/full',
  '/api/cron/firm-outreach-digest',
] as const;

export const VERIFY_CRON_ROUTES = ['/api/cron/firm-outreach-status'] as const;

export const LEGACY_CRON_ROUTES = [
  '/api/cron/firm-outreach-send',
  '/api/cron/firm-outreach-discovery',
] as const;

export const PROTECTED_HTTP_ROUTES = [
  ...EXPECTED_CRON_ROUTES,
  ...VERIFY_CRON_ROUTES,
  ...LEGACY_CRON_ROUTES,
  '/api/admin/firm-outreach',
] as const;

export interface RepoCheckResult {
  name: string;
  ok: boolean;
  detail?: string;
}

export interface HttpCheckResult {
  name: string;
  ok: boolean;
  status?: number;
  detail?: string;
}

const sampleProspect = (): FirmProspect => ({
  id: 'verify-test-prospect',
  firmKey: 'verify-test-firm',
  firmName: 'Verify Test Solicitors LLP',
  prospectType: 'firm',
  status: 'ready_to_send',
  sequenceStep: 0,
  sources: ['manual'],
  priorityScore: 0,
  campaignId: FIRM_OUTREACH_CAMPAIGN_ID,
  enrichAttempts: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  email: 'verify@example.com',
});

export function checkBrochureExists(): RepoCheckResult {
  const ok = existsSync(BROCHURE_PUBLIC_PATH);
  return {
    name: 'brochure_file_exists',
    ok,
    detail: ok ? BROCHURE_PUBLIC_PATH : `Missing ${BROCHURE_PUBLIC_PATH}`,
  };
}

export function checkBrochureMinSize(minBytes = 10_000): RepoCheckResult {
  if (!existsSync(BROCHURE_PUBLIC_PATH)) {
    return { name: 'brochure_min_size', ok: false, detail: 'Brochure missing' };
  }
  const size = statSync(BROCHURE_PUBLIC_PATH).size;
  return {
    name: 'brochure_min_size',
    ok: size >= minBytes,
    detail: `size=${size} bytes (min ${minBytes})`,
  };
}

export function checkBrochureLoadsAsAttachment(): RepoCheckResult {
  const attachment = loadBrochureAttachment();
  const ok = Boolean(attachment?.content && attachment.filename.endsWith('.pdf'));
  return {
    name: 'brochure_attachment_loads',
    ok,
    detail: ok ? attachment!.filename : 'loadBrochureAttachment returned null',
  };
}

export function checkOutreachTemplates(): RepoCheckResult[] {
  const prospect = sampleProspect();
  const results: RepoCheckResult[] = [];

  for (const step of [0, 1, 2]) {
    const subject = subjectForStep(prospect, step);
    results.push({
      name: `template_subject_step_${step}`,
      ok: subject.length > 10,
      detail: subject,
    });

    const html = buildOutreachEmailHtml({
      prospect,
      step,
      unsubscribeUrl: 'https://policestationagent.com/outreach/unsubscribe/test-token',
    });
    const kentOnly =
      html.toLowerCase().includes('kent custody') &&
      !html.includes('England &amp; Wales when your roster');
    results.push({
      name: `template_html_step_${step}`,
      ok: html.includes('Unsubscribe') && html.includes('verify-test-prospect') && kentOnly,
      detail: `html_length=${html.length} kent_only=${kentOnly}`,
    });
  }

  return results;
}

export function checkVercelCronConfig(vercelJson: {
  crons?: Array<{ path: string; schedule: string }>;
}): RepoCheckResult[] {
  const crons = vercelJson.crons ?? [];
  const paths = crons.map((c) => c.path);
  const results: RepoCheckResult[] = [];

  for (const route of EXPECTED_CRON_ROUTES) {
    results.push({
      name: `vercel_cron_configured:${route}`,
      ok: paths.includes(route),
      detail: paths.includes(route) ? 'present' : 'missing from vercel.json crons',
    });
  }

  const schedules = Object.fromEntries(crons.map((c) => [c.path, c.schedule]));
  results.push({
    name: 'vercel_cron_send_schedule',
    ok: schedules['/api/cron/firm-outreach-pipeline/full'] === '30 9 * * *',
    detail: String(schedules['/api/cron/firm-outreach-pipeline/full'] ?? 'missing'),
  });
  const enrichCronCount = paths.filter((p) => p === '/api/cron/firm-outreach-enrich').length;
  results.push({
    name: 'vercel_cron_enrich_fourteen_times_daily',
    ok: enrichCronCount === 14,
    detail: `count=${enrichCronCount}`,
  });
  const sendOnlyCronCount = paths.filter((p) => p === '/api/cron/firm-outreach-send').length;
  results.push({
    name: 'vercel_cron_send_only_four_times_daily',
    ok: sendOnlyCronCount === 4,
    detail: `count=${sendOnlyCronCount}`,
  });

  return results;
}

export function checkCronRouteFilesExist(rootDir = process.cwd()): RepoCheckResult[] {
  const toFile = (route: string) =>
    resolve(rootDir, 'app', `${route.replace(/^\/api\//, 'api/')}/route.ts`);

  return [...EXPECTED_CRON_ROUTES, ...VERIFY_CRON_ROUTES, ...LEGACY_CRON_ROUTES].map((route) => {
    const file = toFile(route);
    const ok = existsSync(file);
    return {
      name: `cron_route_file:${route}`,
      ok,
      detail: ok ? file : `Missing ${file}`,
    };
  });
}

export function loadVercelJson(rootDir = process.cwd()): RepoCheckResult {
  const path = resolve(rootDir, 'vercel.json');
  if (!existsSync(path)) {
    return { name: 'vercel_json_exists', ok: false, detail: 'vercel.json missing' };
  }
  try {
    const raw = readFileSync(path, 'utf8').replace(/,\s*([}\]])/g, '$1');
    JSON.parse(raw);
    return { name: 'vercel_json_valid', ok: true, detail: path };
  } catch (err) {
    return {
      name: 'vercel_json_valid',
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

export function runRepoChecks(rootDir = process.cwd()): RepoCheckResult[] {
  const vercelPath = resolve(rootDir, 'vercel.json');
  const vercelRaw = existsSync(vercelPath)
    ? readFileSync(vercelPath, 'utf8').replace(/,\s*([}\]])/g, '$1')
    : '{}';
  const vercelJson = JSON.parse(vercelRaw) as { crons?: Array<{ path: string; schedule: string }> };

  return [
    loadVercelJson(rootDir),
    checkBrochureExists(),
    checkBrochureMinSize(),
    checkBrochureLoadsAsAttachment(),
    checkEnrichSaveUsesPreviousStatus(rootDir),
    checkReindexSafetyGuard(rootDir),
    checkAdminSummarySnapshotDeduped(rootDir),
    checkAdminSummaryTimeout(rootDir),
    checkProspectCountsCache(rootDir),
    checkSendUsesRecordStatus(rootDir),
    checkListProspectsByRecordStatusExported(rootDir),
    checkNationalDiscoveryScope(rootDir),
    checkApprovalCronSkipsSend(rootDir),
    checkBootstrapSecretRouteExists(rootDir),
    checkSendApprovalTokenGuard(rootDir),
    checkRepairLoopRequiresReady(rootDir),
    checkTestGlobIncludesOutreachSendApproved(rootDir),
    checkHealthLoopScriptExists(rootDir),
    ...checkOutreachTemplates(),
    ...checkVercelCronConfig(vercelJson),
    ...checkCronRouteFilesExist(rootDir),
  ];
}

export async function runHttpChecks(
  baseUrl: string,
  opts?: { cronSecret?: string; bootstrapSecret?: string },
): Promise<HttpCheckResult[]> {
  const base = baseUrl.replace(/\/$/, '');
  const results: HttpCheckResult[] = [];

  async function get(path: string, init?: RequestInit) {
    const res = await fetch(`${base}${path}`, { redirect: 'follow', ...init });
    return res;
  }

  results.push(await checkStatus('brochure_pdf_public', () => get('/outreach/police-station-agent-kent-brochure.pdf'), 200));

  for (const route of PROTECTED_HTTP_ROUTES) {
    const isOptional = VERIFY_CRON_ROUTES.includes(route as (typeof VERIFY_CRON_ROUTES)[number]);
    results.push(
      await checkStatus(
        `protected_unauth:${route}`,
        () => get(route),
        401,
        isOptional ? [404] : undefined,
      ),
    );
  }

  results.push(
    await checkStatus('resend_webhook_rejects_unsigned', () =>
      get('/api/webhooks/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      }),
    401),
  );

  const sendCode = await get('/api/auth/send-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-admin@example.com' }),
  });
  results.push({
    name: 'admin_send_code_kv_respond',
    ok: sendCode.status === 200,
    status: sendCode.status,
    detail: sendCode.status === 503 ? 'KV not configured on target' : undefined,
  });

  if (opts?.cronSecret) {
    const statusRes = await get('/api/cron/firm-outreach-status', {
      headers: { Authorization: `Bearer ${opts.cronSecret}` },
    });
    if (statusRes.status === 404) {
      results.push({
        name: 'cron_status_authenticated',
        ok: true,
        status: 404,
        detail: 'status route not deployed yet (skip)',
      });
    } else {
      type StatusPayload = {
        ok?: boolean;
        config?: {
          sendAllowed?: boolean;
          resendConfigured?: boolean;
          effectivePaused?: boolean;
          requireApproval?: boolean;
        };
        summary?: { readyToSend?: number };
        indexHealth?: { drifted?: boolean; activeByStatus?: Record<string, number> };
        counts?: Record<string, number>;
      };
      let payload: StatusPayload | null = null;
      try {
        payload = (await statusRes.json()) as StatusPayload;
      } catch {
        payload = null;
      }
      results.push({
        name: 'cron_status_authenticated',
        ok: statusRes.status === 200 && payload?.ok === true,
        status: statusRes.status,
        detail: payload?.config
          ? `sendAllowed=${payload.config.sendAllowed} resendConfigured=${payload.config.resendConfigured}`
          : undefined,
      });
      results.push({
        name: 'cron_status_resend_configured',
        ok: statusRes.status === 200 && payload?.config?.resendConfigured === true,
        status: statusRes.status,
      });
      results.push({
        name: 'cron_status_send_allowed',
        ok:
          statusRes.status === 200 &&
          payload?.config?.sendAllowed === true &&
          payload?.config?.effectivePaused !== true,
        status: statusRes.status,
      });
      const ready = payload?.summary?.readyToSend ?? payload?.counts?.ready_to_send ?? 0;
      results.push({
        name: 'cron_status_ready_queue',
        ok: statusRes.status === 200 && ready >= 0,
        status: statusRes.status,
        detail: `readyToSend=${ready}`,
      });
      if (payload?.indexHealth) {
        results.push({
          name: 'cron_status_index_health',
          ok: payload.indexHealth.drifted === false,
          status: statusRes.status,
          detail: payload.indexHealth.drifted ? 'index drift detected — run repair-loop' : 'indexes aligned',
        });
        const readyRecords = payload.indexHealth.activeByStatus?.ready_to_send;
        const readyIndexed = payload.counts?.ready_to_send;
        if (typeof readyRecords === 'number' && typeof readyIndexed === 'number') {
          results.push({
            name: 'cron_status_record_index_parity',
            ok: readyRecords === readyIndexed,
            status: statusRes.status,
            detail: `records=${readyRecords} index=${readyIndexed}`,
          });
        }
      }
      results.push({
        name: 'cron_status_autosend',
        ok: statusRes.status === 200 && payload?.config?.requireApproval === false,
        status: statusRes.status,
        detail: `requireApproval=${payload?.config?.requireApproval ?? 'missing'}`,
      });
    }
  }

  if (opts?.bootstrapSecret) {
    const bootstrapRes = await get('/api/cron/firm-outreach-bootstrap?unpause=1', {
      headers: { 'x-firm-outreach-bootstrap-secret': opts.bootstrapSecret },
    });
    type BootstrapPayload = {
      ok?: boolean;
      sendAllowed?: boolean;
      countsAfter?: Record<string, number>;
    };
    let payload: BootstrapPayload | null = null;
    try {
      payload = (await bootstrapRes.json()) as BootstrapPayload;
    } catch {
      payload = null;
    }
    const discovered = payload?.countsAfter?.discovered ?? 0;
    results.push({
      name: 'bootstrap_unpause_ok',
      ok: bootstrapRes.status === 200 && payload?.ok === true,
      status: bootstrapRes.status,
    });
    results.push({
      name: 'bootstrap_send_allowed',
      ok: bootstrapRes.status === 200 && payload?.sendAllowed === true,
      status: bootstrapRes.status,
    });
    results.push({
      name: 'bootstrap_discovered_nonzero',
      ok: bootstrapRes.status === 200 && discovered > 0,
      status: bootstrapRes.status,
      detail: `discovered=${discovered}`,
    });
  }

  results.push(
    await checkStatus('send_approved_get_405', () => get('/api/outreach/send-approved'), 405),
  );

  return results;
}

async function checkStatus(
  name: string,
  request: () => Promise<Response>,
  expected: number,
  alsoOk: number[] = [],
): Promise<HttpCheckResult> {
  try {
    const res = await request();
    const ok = res.status === expected || alsoOk.includes(res.status);
    return {
      name,
      ok,
      status: res.status,
      detail: ok
        ? alsoOk.includes(res.status)
          ? `accepted ${res.status} (not yet deployed)`
          : undefined
        : `expected ${expected}${alsoOk.length ? ` or ${alsoOk.join('/')}` : ''}`,
    };
  } catch (err) {
    return {
      name,
      ok: false,
      detail: err instanceof Error ? err.message : String(err),
    };
  }
}

export function summarizeResults<T extends { ok: boolean; name: string; detail?: string }>(
  results: T[],
): { passed: number; failed: number; failures: T[] } {
  const failures = results.filter((r) => !r.ok);
  return {
    passed: results.length - failures.length,
    failed: failures.length,
    failures,
  };
}

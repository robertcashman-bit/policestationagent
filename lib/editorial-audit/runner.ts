import { createAdminClient, hasAdminClient } from '@/lib/supabase/admin';
import { getAuditConfig } from './config';
import { sendAuditDigest } from './digest-email';
import { collectSafeFixPatches } from './fix-registry';
import { openAuditPullRequest } from './github-pr';
import { runLlmFactCheck, shouldRunLlm } from './llm-check';
import { scanQuestionRules, scanUnitRules } from './rules';
import {
  emailedToday,
  filterRecentlyReportedFindings,
  findingDedupeKey,
  insertFindings,
  loadAuditState,
  saveAuditState,
} from './state';
import {
  buildAllAuditUnits,
  loadUnitText,
  selectAuditBatch,
} from './units';
import type { AuditFinding, AuditRunResult, AuditUnit } from './types';

async function fetchLiveUrl(url: string, siteUrl: string): Promise<AuditFinding[]> {
  const full = `${siteUrl.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}`;
  try {
    const res = await fetch(full, { redirect: 'follow', headers: { 'User-Agent': 'psrtrain-audit' } });
    if (res.status >= 400) {
      return [{
        severity: 'fail',
        category: 'live-url',
        message: `HTTP ${res.status} for ${full}`,
        location: url,
      }];
    }
    const html = await res.text();
    if (!/<title[^>]*>[^<]+<\/title>/i.test(html)) {
      return [{
        severity: 'review',
        category: 'live-url',
        message: 'Page missing title tag',
        location: url,
      }];
    }
  } catch (e) {
    return [{
      severity: 'fail',
      category: 'live-url',
      message: `Fetch failed: ${e instanceof Error ? e.message : String(e)}`,
      location: url,
    }];
  }
  return [];
}

async function scanQuestionBatch(unit: AuditUnit): Promise<{ findings: AuditFinding[]; quarantineIds: string[] }> {
  if (!hasAdminClient()) return { findings: [], quarantineIds: [] };
  const cfg = getAuditConfig();
  const batchIndex = (unit.meta?.batchIndex as number) ?? 0;
  const supabase = createAdminClient();
  const from = batchIndex * cfg.questionBatchSize;
  const to = from + cfg.questionBatchSize - 1;

  const { data, error } = await supabase
    .from('questions')
    .select('id, question_text, explanation, source_refs, options')
    .eq('status', 'approved')
    .order('created_at', { ascending: true })
    .range(from, to);

  if (error) {
    return {
      findings: [{
        severity: 'review',
        category: 'mcq-batch',
        message: `Could not load questions: ${error.message}`,
        location: unit.id,
      }],
      quarantineIds: [],
    };
  }

  const findings: AuditFinding[] = [];
  const quarantineIds: string[] = [];
  for (const q of data ?? []) {
    const qFindings = scanQuestionRules(q);
    findings.push(...qFindings);
    if (qFindings.some((f) => f.category === 'mcq-sourcing')) {
      quarantineIds.push(q.id);
    }
  }
  return { findings, quarantineIds };
}

async function scanCitSlot(unit: AuditUnit): Promise<AuditFinding[]> {
  if (!hasAdminClient()) return [];
  const slot = (unit.meta?.slotIndex as number) ?? 0;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('cit_scenarios')
    .select('slug, title, branches')
    .eq('status', 'approved')
    .order('slug', { ascending: true })
    .range(slot, slot);

  if (error || !data?.[0]) return [];

  const row = data[0] as { slug: string; branches: { nodes?: Record<string, unknown> } };
  const findings: AuditFinding[] = [];
  const nodes = row.branches?.nodes ?? {};
  for (const [nodeId, node] of Object.entries(nodes)) {
    const n = node as { terminal?: boolean; outcome?: string; choices?: unknown[] };
    if (n.terminal && !n.outcome) {
      findings.push({
        severity: 'review',
        category: 'cit-structure',
        message: `Terminal node "${nodeId}" missing outcome`,
        location: row.slug,
      });
    }
  }
  return findings;
}

async function scanUnit(unit: AuditUnit, siteUrl: string): Promise<{ findings: AuditFinding[]; quarantineIds: string[] }> {
  if (unit.kind === 'live-url') {
    return { findings: await fetchLiveUrl(unit.url ?? '/', siteUrl), quarantineIds: [] };
  }
  if (unit.kind === 'question-batch') {
    return scanQuestionBatch(unit);
  }
  if (unit.kind === 'cit-scenario') {
    return { findings: await scanCitSlot(unit), quarantineIds: [] };
  }

  const loaded = loadUnitText(unit);
  return { findings: scanUnitRules(loaded), quarantineIds: [] };
}

export async function runEditorialAudit(): Promise<AuditRunResult & { emailSent: boolean; emailError?: string }> {
  const cfg = getAuditConfig();
  const state = await loadAuditState();
  const allUnits = buildAllAuditUnits();
  const { batch, nextCursor } = selectAuditBatch(allUnits, state.cursor_offset, cfg.batchSize);

  const findings: AuditFinding[] = [];
  const approvedUnits: string[] = [];
  const batchLabels: string[] = [];
  let llmCalls = 0;
  let llmSpend = state.estimated_spend_usd;
  let llmCallsMonth = state.llm_calls_this_month;
  const quarantineAll: string[] = [];

  const llmState = () => ({
    llm_calls_this_month: llmCallsMonth,
    estimated_spend_usd: llmSpend,
  });

  for (const unit of batch) {
    batchLabels.push(unit.label);
    const { findings: unitFindings, quarantineIds } = await scanUnit(unit, cfg.siteUrl);
    findings.push(...unitFindings);
    quarantineAll.push(...quarantineIds);

    const actionable = unitFindings.filter((f) => f.severity !== 'info');
    if (actionable.length === 0 && quarantineIds.length === 0) {
      approvedUnits.push(unit.label);
    }

    const loaded = unit.kind !== 'question-batch' && unit.kind !== 'live-url' && unit.kind !== 'cit-scenario'
      ? loadUnitText(unit)
      : unit;

    if (shouldRunLlm(loaded, unitFindings, llmCalls, llmState())) {
      try {
        const llm = await runLlmFactCheck(loaded);
        findings.push(...llm.findings);
        llmCalls += 1;
        llmCallsMonth += 1;
        const cost = llm.costUsd;
        llmSpend += cost;
      } catch (e) {
        findings.push({
          severity: 'review',
          category: 'llm-fact-check',
          message: `LLM check failed: ${e instanceof Error ? e.message : String(e)}`,
          location: unit.id,
        });
      }
    }
  }

  let autoFixedDb = 0;
  if (quarantineAll.length > 0 && hasAdminClient()) {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('questions')
      .update({ status: 'pending' })
      .in('id', quarantineAll);
    if (!error) {
      autoFixedDb = quarantineAll.length;
      for (const id of quarantineAll) {
        findings.push({
          severity: 'auto_fixed',
          category: 'mcq-sourcing',
          message: `Question quarantined (status → pending)`,
          location: `question:${id}`,
        });
      }
    }
  }

  let questionCount: number | undefined;
  if (hasAdminClient()) {
    const supabase = createAdminClient();
    const { count } = await supabase
      .from('questions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'approved');
    questionCount = count ?? undefined;
  }

  let prUrl: string | undefined;
  const patches = collectSafeFixPatches(questionCount);
  if (patches.length > 0 && cfg.githubToken) {
    try {
      prUrl = await openAuditPullRequest(patches);
    } catch (e) {
      findings.push({
        severity: 'review',
        category: 'github-pr',
        message: `PR bot failed: ${e instanceof Error ? e.message : String(e)}`,
      });
    }
  }

  const result: AuditRunResult = {
    unitsChecked: batch.length,
    findings,
    approvedUnits,
    llmCalls,
    autoFixedDb,
    prUrl,
    cursorBefore: state.cursor_offset,
    cursorAfter: nextCursor,
    totalUnits: allUnits.length,
    batchLabels,
  };

  await insertFindings(
    findings
      .filter((f) => f.severity !== 'info')
      .map((f) => ({
        unit_id: batch[0]?.id ?? 'batch',
        severity: f.severity,
        category: f.category,
        message: f.message,
        location: f.location,
        metadata: f.metadata,
      })),
  );

  await saveAuditState({
    cursor_offset: nextCursor,
    llm_calls_this_month: llmCallsMonth,
    estimated_spend_usd: llmSpend,
    last_run_at: new Date().toISOString(),
    ...(prUrl ? { last_pr_at: new Date().toISOString() } : {}),
  });

  const actionable = findings.filter((f) => f.severity !== 'info');
  const recentlyReported = await filterRecentlyReportedFindings(actionable);
  const findingsForEmail = actionable.filter(
    (f) => f.category !== 'sourcing' || !recentlyReported.has(findingDedupeKey(f)),
  );

  const shouldEmail = !emailedToday(state.last_email_at);

  let emailSent = false;
  let emailError: string | undefined;
  if (shouldEmail) {
    const email = await sendAuditDigest({ ...result, findings: [...findingsForEmail] });
    emailSent = email.sent;
    emailError = email.error;
    if (email.sent) {
      await saveAuditState({ last_email_at: new Date().toISOString() });
    }
  }

  return { ...result, emailSent, emailError };
}

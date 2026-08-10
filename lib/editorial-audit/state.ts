import { createAdminClient, hasAdminClient } from '@/lib/supabase/admin';

export type AuditStateRow = {
  id: string;
  cursor_offset: number;
  llm_calls_this_month: number;
  llm_month_key: string;
  estimated_spend_usd: number;
  last_run_at: string | null;
  last_email_at: string | null;
  last_pr_at: string | null;
};

const DEFAULT_STATE: AuditStateRow = {
  id: 'default',
  cursor_offset: 0,
  llm_calls_this_month: 0,
  llm_month_key: '',
  estimated_spend_usd: 0,
  last_run_at: null,
  last_email_at: null,
  last_pr_at: null,
};

function monthKey(): string {
  const d = new Date();
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`;
}

export async function loadAuditState(): Promise<AuditStateRow> {
  if (!hasAdminClient()) return { ...DEFAULT_STATE, llm_month_key: monthKey() };

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('editorial_audit_state')
    .select('*')
    .eq('id', 'default')
    .maybeSingle();

  if (error || !data) return { ...DEFAULT_STATE, llm_month_key: monthKey() };

  const row = data as AuditStateRow;
  if (row.llm_month_key !== monthKey()) {
    return {
      ...row,
      llm_calls_this_month: 0,
      llm_month_key: monthKey(),
      estimated_spend_usd: 0,
    };
  }
  return row;
}

export async function saveAuditState(partial: Partial<AuditStateRow>): Promise<void> {
  if (!hasAdminClient()) return;

  const supabase = createAdminClient();
  const current = await loadAuditState();
  const next = { ...current, ...partial, id: 'default', llm_month_key: monthKey() };

  await supabase.from('editorial_audit_state').upsert(next);
}

export async function filterRecentlyReportedFindings(
  findings: { category: string; message: string; location?: string }[],
  withinDays = 7,
): Promise<Set<string>> {
  if (!hasAdminClient()) return new Set();

  const since = new Date(Date.now() - withinDays * 86_400_000).toISOString();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from('editorial_audit_findings')
    .select('category, message, location')
    .gte('run_at', since)
    .in('category', ['sourcing']);

  return new Set(
    (data ?? []).map((r) => `${r.category}|${r.location ?? ''}|${r.message}`),
  );
}

export function findingDedupeKey(f: { category: string; message: string; location?: string }): string {
  return `${f.category}|${f.location ?? ''}|${f.message}`;
}

export async function insertFindings(
  findings: { unit_id: string; severity: string; category: string; message: string; location?: string; metadata?: Record<string, unknown> }[],
): Promise<void> {
  if (!hasAdminClient() || findings.length === 0) return;
  const supabase = createAdminClient();
  await supabase.from('editorial_audit_findings').insert(
    findings.map((f) => ({
      unit_id: f.unit_id,
      severity: f.severity,
      category: f.category,
      message: f.message,
      location: f.location ?? null,
      metadata: f.metadata ?? {},
    })),
  );
}

export function emailedToday(lastEmailAt: string | null): boolean {
  if (!lastEmailAt) return false;
  const last = new Date(lastEmailAt);
  const now = new Date();
  return (
    last.getUTCFullYear() === now.getUTCFullYear() &&
    last.getUTCMonth() === now.getUTCMonth() &&
    last.getUTCDate() === now.getUTCDate()
  );
}

import { NextResponse } from 'next/server';
import { runEditorialAudit } from '@/lib/editorial-audit/runner';
import { isCronRequestAuthorized } from '@/lib/auth/api-guards';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export async function GET(request: Request) {
  const auth = isCronRequestAuthorized(request);
  if (auth === 'misconfigured') {
    return NextResponse.json({ error: 'Cron not configured' }, { status: 503 });
  }
  if (!auth) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const result = await runEditorialAudit();
    return NextResponse.json({
      ok: true,
      unitsChecked: result.unitsChecked,
      findings: result.findings.filter((f) => f.severity !== 'info').length,
      llmCalls: result.llmCalls,
      autoFixedDb: result.autoFixedDb,
      prUrl: result.prUrl ?? null,
      emailSent: result.emailSent,
      emailError: result.emailError ?? null,
      cursor: result.cursorAfter,
      totalUnits: result.totalUnits,
      at: new Date().toISOString(),
    });
  } catch (e) {
    console.error('[editorial-audit]', e);
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}

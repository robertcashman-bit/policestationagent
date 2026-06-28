import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import {
  sendCrossWorkspaceOutreachDigest,
  type CrossDigestPhase,
} from '@/lib/firm-outreach/cross-workspace-digest';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 120;

function parsePhase(raw: string | null): CrossDigestPhase | null {
  if (raw === 'morning' || raw === 'evening') return raw;
  return null;
}

/** Twice-daily cross-workspace outreach summary to owner. */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const phase = parsePhase(url.searchParams.get('phase'));
  if (!phase) {
    return NextResponse.json(
      { error: 'Missing or invalid phase (use morning or evening)' },
      { status: 400 },
    );
  }

  const force = url.searchParams.get('force') === '1';
  const result = await sendCrossWorkspaceOutreachDigest({ phase, force });

  return NextResponse.json({ ok: true, mode: 'cross-workspace-digest', ...result });
}

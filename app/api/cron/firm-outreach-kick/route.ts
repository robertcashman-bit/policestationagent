import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';
import { runServerProductionKick } from '@/lib/firm-outreach/run-server-production-kick';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 300;

/** Post-deploy / scheduled production kick (requalify ready rows + enrich). */
export async function GET(request: Request) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runServerProductionKick();
  return NextResponse.json({ ok: true, mode: 'kick', ...result });
}

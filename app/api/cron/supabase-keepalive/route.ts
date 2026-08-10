import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { isCronRequestAuthorized } from '@/lib/auth/api-guards';

/**
 * Cron-triggered keepalive to stop the Supabase free-tier project from
 * being auto-paused for inactivity. A paused project means every login
 * fails with "Failed to fetch" because the project DNS goes away.
 *
 * Hits the project four times a day with a cheap auth-settings GET.
 *
 * Vercel automatically calls this with `Authorization: Bearer <CRON_SECRET>`
 * when the env var is set; we accept anonymous in dev for easy testing.
 */
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const auth = isCronRequestAuthorized(request);
  if (auth === 'misconfigured') {
    return NextResponse.json({ error: 'Cron not configured' }, { status: 503 });
  }
  if (!auth) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !anon) {
    return NextResponse.json(
      { ok: false, error: 'supabase env not set' },
      { status: 503 },
    );
  }

  // Two cheap calls: auth settings + a stateless RPC that touches Postgres.
  const settingsRes = await fetch(`${url}/auth/v1/settings`, {
    headers: { apikey: anon },
    cache: 'no-store',
  });

  let dbOk = false;
  try {
    const supabase = createClient(url, anon, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase
      .from('customer_access')
      .select('id', { count: 'exact', head: true })
      .limit(1);
    dbOk = !error;
  } catch {
    dbOk = false;
  }

  return NextResponse.json({
    ok: settingsRes.ok && dbOk,
    auth_status: settingsRes.status,
    db_ok: dbOk,
    at: new Date().toISOString(),
  });
}

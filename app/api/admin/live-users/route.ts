import { NextResponse } from 'next/server';
import { getAuthStatus } from '@/lib/auth';
import { isAdminEmail } from '@/lib/auth/admin-emails';
import { createAdminClient, hasAdminClient } from '@/lib/supabase/admin';
import { formatDurationMs, pathToSection, PRESENCE_STALE_MS } from '@/lib/presence';

type SessionRow = {
  id: string;
  user_id: string;
  session_id: string;
  login_time: string;
  logout_time: string | null;
  last_seen_at: string | null;
  current_path: string | null;
  ip_address: string | null;
};

type ProfileRow = {
  user_id: string;
  email: string;
  full_name: string | null;
};

export async function GET() {
  const auth = await getAuthStatus();
  if (auth.status !== 'authenticated' || !isAdminEmail(auth.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!hasAdminClient()) {
    return NextResponse.json(
      { error: 'Admin database client not configured', live: [], recent: [] },
      { status: 503 },
    );
  }

  const admin = createAdminClient();
  const staleCutoff = new Date(Date.now() - PRESENCE_STALE_MS).toISOString();

  const { data: sessions, error } = await admin
    .from('user_sessions')
    .select('id, user_id, session_id, login_time, logout_time, last_seen_at, current_path, ip_address')
    .is('logout_time', null)
    .order('last_seen_at', { ascending: false, nullsFirst: false })
    .order('login_time', { ascending: false })
    .limit(200);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (sessions ?? []) as SessionRow[];
  const userIds = [...new Set(rows.map((r) => r.user_id))];

  const profilesByUser = new Map<string, ProfileRow>();
  if (userIds.length) {
    const { data: profiles } = await admin
      .from('profiles')
      .select('user_id, email, full_name')
      .in('user_id', userIds);
    for (const p of (profiles ?? []) as ProfileRow[]) {
      profilesByUser.set(p.user_id, p);
    }
  }

  const now = Date.now();
  const mapped = rows.map((s) => {
    const profile = profilesByUser.get(s.user_id);
    const loginMs = new Date(s.login_time).getTime();
    const lastSeenMs = s.last_seen_at ? new Date(s.last_seen_at).getTime() : loginMs;
    const isLive = Boolean(s.last_seen_at && s.last_seen_at >= staleCutoff);
    const path = s.current_path ?? '/dashboard';
    return {
      sessionId: s.session_id,
      userId: s.user_id,
      email: profile?.email ?? '—',
      fullName: profile?.full_name ?? null,
      section: pathToSection(path),
      currentPath: path,
      loginTime: s.login_time,
      lastSeenAt: s.last_seen_at,
      sessionDuration: formatDurationMs(now - loginMs),
      idleFor: formatDurationMs(now - lastSeenMs),
      isLive,
      ipAddress: s.ip_address,
    };
  });

  const live = mapped.filter((r) => r.isLive);
  const idle = mapped.filter((r) => !r.isLive);

  return NextResponse.json({
    live,
    idle,
    liveCount: live.length,
    openSessionCount: mapped.length,
    staleCutoffMinutes: PRESENCE_STALE_MS / 60_000,
    fetchedAt: new Date().toISOString(),
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { getAuthStatus } from '@/lib/auth';
import { isAdminEmail } from '@/lib/auth/admin-emails';
import { createAdminClient, hasAdminClient } from '@/lib/supabase/admin';
import { pathToSection } from '@/lib/presence';

export async function GET(request: NextRequest) {
  const auth = await getAuthStatus();
  if (auth.status !== 'authenticated' || !isAdminEmail(auth.user.email)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!hasAdminClient()) {
    return NextResponse.json({ error: 'Admin database client not configured' }, { status: 503 });
  }

  const timeRange = request.nextUrl.searchParams.get('timeRange') ?? '30';
  const admin = createAdminClient();

  let sessionsQuery = admin
    .from('user_sessions')
    .select(
      'id, user_id, session_id, login_time, logout_time, last_seen_at, current_path, ip_address, user_agent',
    )
    .order('login_time', { ascending: false })
    .limit(100);

  if (timeRange !== 'all') {
    const days = parseInt(timeRange, 10);
    if (!Number.isNaN(days)) {
      const daysAgo = new Date();
      daysAgo.setDate(daysAgo.getDate() - days);
      sessionsQuery = sessionsQuery.gte('login_time', daysAgo.toISOString());
    }
  }

  const [{ data: sessions, error: sessionsError }, { data: progressData }, { data: profiles }] =
    await Promise.all([
      sessionsQuery,
      admin.from('user_progress').select('user_id, answered_correctly'),
      admin.from('profiles').select('user_id, email, full_name'),
    ]);

  if (sessionsError) {
    return NextResponse.json({ error: sessionsError.message }, { status: 500 });
  }

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.user_id, p as { user_id: string; email: string; full_name: string | null }]),
  );

  const statsMap = new Map<string, { total: number; correct: number }>();
  for (const row of progressData ?? []) {
    const uid = row.user_id as string;
    if (!statsMap.has(uid)) statsMap.set(uid, { total: 0, correct: 0 });
    const stats = statsMap.get(uid)!;
    stats.total++;
    if (row.answered_correctly) stats.correct++;
  }

  const userStats = Array.from(statsMap.entries())
    .map(([user_id, stats]) => {
      const profile = profileMap.get(user_id);
      return {
        user_id,
        total_answered: stats.total,
        correct_answers: stats.correct,
        accuracy: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
        email: profile?.email ?? '—',
        full_name: profile?.full_name ?? null,
      };
    })
    .sort((a, b) => b.total_answered - a.total_answered);

  const sessionRows = (sessions ?? []).map((s) => {
    const profile = profileMap.get(s.user_id as string);
    const path = (s.current_path as string | null) ?? null;
    return {
      id: s.id,
      user_id: s.user_id,
      session_id: s.session_id,
      login_time: s.login_time,
      logout_time: s.logout_time,
      last_seen_at: s.last_seen_at ?? null,
      current_path: path,
      section: path ? pathToSection(path) : null,
      ip_address: s.ip_address,
      user_agent: s.user_agent,
      email: profile?.email ?? '—',
      full_name: profile?.full_name ?? null,
    };
  });

  return NextResponse.json({ sessions: sessionRows, userStats });
}

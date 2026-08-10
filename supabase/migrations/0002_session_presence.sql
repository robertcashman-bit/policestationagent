-- Live presence fields for user_sessions (who is online, where, how long).
-- Safe to re-run.

alter table public.user_sessions
  add column if not exists last_seen_at timestamptz,
  add column if not exists current_path text;

create index if not exists idx_user_sessions_last_seen
  on public.user_sessions (last_seen_at desc)
  where logout_time is null;

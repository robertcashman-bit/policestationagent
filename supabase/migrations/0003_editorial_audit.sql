-- Editorial audit rotation state + findings log

create table if not exists public.editorial_audit_state (
  id text primary key default 'default',
  cursor_offset int not null default 0,
  llm_calls_this_month int not null default 0,
  llm_month_key text not null default '',
  estimated_spend_usd numeric not null default 0,
  last_run_at timestamptz,
  last_email_at timestamptz,
  last_pr_at timestamptz,
  updated_at timestamptz default now()
);

create table if not exists public.editorial_audit_findings (
  id uuid primary key default gen_random_uuid(),
  run_at timestamptz not null default now(),
  unit_id text not null,
  severity text not null check (severity in ('info', 'review', 'fail', 'auto_fixed')),
  category text not null,
  message text not null,
  location text,
  metadata jsonb default '{}'::jsonb
);

create index if not exists idx_editorial_audit_findings_run_at
  on public.editorial_audit_findings (run_at desc);

-- RLS: cron uses service role only (see 0004 for idempotent re-apply on existing projects)
alter table public.editorial_audit_state enable row level security;
alter table public.editorial_audit_findings enable row level security;
revoke all on table public.editorial_audit_state from anon, authenticated;
revoke all on table public.editorial_audit_findings from anon, authenticated;

insert into public.editorial_audit_state (id)
values ('default')
on conflict (id) do nothing;

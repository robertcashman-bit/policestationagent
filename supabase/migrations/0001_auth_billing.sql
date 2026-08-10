-- PSR Train — auth + billing schema
-- Apply in Supabase: Dashboard → SQL editor → paste this whole file → Run.
-- Safe to re-run (idempotent).

-- ============================================================
-- 1. profiles  (mirror of auth.users + lightweight metadata)
-- ============================================================
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists profiles_email_key on public.profiles (lower(email));

alter table public.profiles enable row level security;

drop policy if exists "profiles_self_select" on public.profiles;
create policy "profiles_self_select"
  on public.profiles for select
  using (auth.uid() = user_id);

drop policy if exists "profiles_self_update" on public.profiles;
create policy "profiles_self_update"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ============================================================
-- 2. customer_access  (paywall state — keyed by email so we can
--    accept payment BEFORE a user account exists)
-- ============================================================
create table if not exists public.customer_access (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  user_id uuid references auth.users(id) on delete set null,
  lemon_customer_id text,
  subscription_id text,
  variant_id text,
  plan text,
  is_paid boolean not null default false,
  access_status text not null default 'inactive',          -- active | inactive | grace | refunded
  subscription_status text,                                -- mirrors Lemon Squeezy status
  current_period_end timestamptz,
  ended_at timestamptz,
  last_event_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists customer_access_email_key
  on public.customer_access (lower(email));

create index if not exists customer_access_user_id_idx
  on public.customer_access (user_id);

create index if not exists customer_access_subscription_id_idx
  on public.customer_access (subscription_id);

alter table public.customer_access enable row level security;

drop policy if exists "customer_access_self_select" on public.customer_access;
create policy "customer_access_self_select"
  on public.customer_access for select
  using (
    auth.uid() = user_id
    or lower(coalesce((auth.jwt() ->> 'email'), '')) = lower(email)
  );

-- No insert/update policy: only the service role (webhook) writes.

-- ============================================================
-- 3. billing_webhook_events  (idempotency log)
-- ============================================================
create table if not exists public.billing_webhook_events (
  event_id text primary key,                 -- signature hash or provider id
  event_name text not null,
  payload jsonb not null,
  processed_at timestamptz not null default now()
);

alter table public.billing_webhook_events enable row level security;
-- service-role only; no policies.

-- ============================================================
-- 4. updated_at triggers
-- ============================================================
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.tg_set_updated_at();

drop trigger if exists set_customer_access_updated_at on public.customer_access;
create trigger set_customer_access_updated_at
  before update on public.customer_access
  for each row execute function public.tg_set_updated_at();

-- ============================================================
-- 5. on auth.users insert →  create profile + auto-link any
--    customer_access record that was created by webhook before
--    the user signed up
-- ============================================================
create or replace function public.tg_on_auth_user_created()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, email)
  values (new.id, new.email)
  on conflict (user_id) do update set email = excluded.email;

  update public.customer_access
     set user_id = new.id,
         updated_at = now()
   where lower(email) = lower(new.email)
     and (user_id is null or user_id <> new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.tg_on_auth_user_created();

-- ============================================================
-- 6. helper view used by the app's middleware/access check
-- ============================================================
create or replace view public.v_current_access as
  select
    ca.user_id,
    ca.email,
    ca.is_paid,
    ca.access_status,
    ca.subscription_status,
    ca.current_period_end
  from public.customer_access ca;

grant select on public.v_current_access to authenticated;

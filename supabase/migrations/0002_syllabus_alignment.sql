-- PSR Train - PSRAS syllabus alignment
-- Adds syllabus_refs tagging to questions and modules, plus a CIT scenario bank.
-- Apply via Supabase SQL editor or psql. Idempotent and safe to re-run.
--
-- Reference: SRA "Police station representative accreditation scheme - updated standards"
-- (29 March 2023). Tag IDs use the form U<unit>.AO<outcome>.<criterion>, e.g. U1.AO4.D.

-- ============================================================
-- 1. syllabus_refs columns on existing tables
-- ============================================================
alter table public.content_modules
  add column if not exists syllabus_refs text[] not null default '{}';

alter table public.questions
  add column if not exists syllabus_refs text[] not null default '{}';

create index if not exists idx_questions_syllabus_refs
  on public.questions using gin (syllabus_refs);

create index if not exists idx_content_modules_syllabus_refs
  on public.content_modules using gin (syllabus_refs);

-- ============================================================
-- 2. cit_scenarios — branching CIT scenario bank
-- ============================================================
create table if not exists public.cit_scenarios (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  difficulty text not null check (difficulty in ('beginner', 'intermediate', 'advanced')),
  syllabus_refs text[] not null default '{}',
  setup text not null,
  branches jsonb not null,
  learning_points text[] not null default '{}',
  source_refs text[] not null default '{}',
  status text not null default 'approved' check (status in ('draft', 'approved', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cit_scenarios_status
  on public.cit_scenarios (status);

create index if not exists idx_cit_scenarios_category
  on public.cit_scenarios (category);

create index if not exists idx_cit_scenarios_syllabus_refs
  on public.cit_scenarios using gin (syllabus_refs);

alter table public.cit_scenarios enable row level security;

drop policy if exists "Approved CIT scenarios visible to authenticated" on public.cit_scenarios;
create policy "Approved CIT scenarios visible to authenticated"
  on public.cit_scenarios for select
  using (status = 'approved' and auth.role() = 'authenticated');

drop policy if exists "Admins manage CIT scenarios" on public.cit_scenarios;
create policy "Admins manage CIT scenarios"
  on public.cit_scenarios for all
  using ((select role from public.users where id = auth.uid()) = 'admin');

-- updated_at trigger reuse
do $$
begin
  if exists (select 1 from pg_proc where proname = 'tg_set_updated_at') then
    drop trigger if exists set_cit_scenarios_updated_at on public.cit_scenarios;
    create trigger set_cit_scenarios_updated_at
      before update on public.cit_scenarios
      for each row execute function public.tg_set_updated_at();
  end if;
end $$;

-- ============================================================
-- 3. Helper view for syllabus coverage at a glance
-- ============================================================
create or replace view public.v_syllabus_coverage as
  with refs as (
    select unnest(syllabus_refs) as ref, 'question' as kind from public.questions where status = 'approved'
    union all
    select unnest(syllabus_refs) as ref, 'module' as kind from public.content_modules
    union all
    select unnest(syllabus_refs) as ref, 'scenario' as kind from public.cit_scenarios where status = 'approved'
  )
  select
    ref,
    count(*) filter (where kind = 'question') as questions,
    count(*) filter (where kind = 'module') as modules,
    count(*) filter (where kind = 'scenario') as scenarios,
    count(*) as total
  from refs
  group by ref
  order by ref;

grant select on public.v_syllabus_coverage to authenticated;

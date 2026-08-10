-- Enable RLS on editorial audit tables (service-role cron only; no public access).
-- Fixes Supabase linter: rls_disabled_in_public
-- Safe to re-run.

alter table public.editorial_audit_state enable row level security;
alter table public.editorial_audit_findings enable row level security;

-- Explicit deny for API roles; service_role bypasses RLS for /api/cron/editorial-audit.
revoke all on table public.editorial_audit_state from anon, authenticated;
revoke all on table public.editorial_audit_findings from anon, authenticated;

-- No policies: authenticated/anon cannot read or write; only service_role (server) can.

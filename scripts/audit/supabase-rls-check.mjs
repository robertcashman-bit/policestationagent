#!/usr/bin/env node
/**
 * Verify Supabase public tables have RLS and editorial audit tables are locked down.
 * Requires SB_PAT + NEXT_PUBLIC_SUPABASE_URL (+ anon key for PostgREST probe) in .env.local
 *
 * Usage: npm run audit:supabase-rls
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

const pat = process.env.SB_PAT?.trim();
const ref =
  process.env.SB_REF?.trim() ||
  process.env.NEXT_PUBLIC_SUPABASE_URL?.match(/https:\/\/([^.]+)\.supabase\.co/)?.[1];
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

const failures = [];
const passes = [];

function pass(msg) {
  passes.push(msg);
}
function fail(msg) {
  failures.push(msg);
}

if (!pat || !ref) {
  console.error('FAIL: missing SB_PAT or project ref (SB_REF / NEXT_PUBLIC_SUPABASE_URL)');
  process.exit(1);
}

async function mgmt(sql) {
  const res = await fetch(`https://api.supabase.com/v1/projects/${ref}/database/query`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${pat}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: sql }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Mgmt API ${res.status}: ${text}`);
  return JSON.parse(text);
}

async function main() {
  const noRls = await mgmt(`
    select c.relname as table_name
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relkind = 'r'
      and c.relrowsecurity = false
    order by 1;
  `);
  if (noRls.length) {
    for (const r of noRls) fail(`rls_disabled: public.${r.table_name}`);
  } else {
    pass('All public tables have RLS enabled');
  }

  const audit = await mgmt(`
    select c.relname, c.relrowsecurity
    from pg_class c
    join pg_namespace n on n.oid = c.relnamespace
    where n.nspname = 'public'
      and c.relname in ('editorial_audit_state', 'editorial_audit_findings', 'seo_submission_state')
    order by 1;
  `);
  for (const t of ['editorial_audit_state', 'editorial_audit_findings', 'seo_submission_state']) {
    const row = audit.find((r) => r.relname === t);
    if (!row) fail(`missing_table: ${t}`);
    else if (!row.relrowsecurity) fail(`rls_disabled: ${t}`);
    else pass(`RLS on ${t}`);
  }

  const privs = await mgmt(`
    select grantee, table_name, privilege_type
    from information_schema.role_table_grants
    where table_schema = 'public'
      and table_name in ('editorial_audit_state', 'editorial_audit_findings')
      and grantee in ('anon', 'authenticated')
    order by table_name, grantee, privilege_type;
  `);
  if (privs.length) {
    for (const p of privs) {
      fail(`grant_exposed: ${p.grantee} has ${p.privilege_type} on ${p.table_name}`);
    }
  } else {
    pass('No anon/authenticated grants on editorial audit tables');
  }

  if (anon && url) {
    for (const table of ['editorial_audit_state', 'editorial_audit_findings']) {
      const ins = await fetch(`${url}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          apikey: anon,
          Authorization: `Bearer ${anon}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(
          table === 'editorial_audit_state'
            ? { id: 'rls-probe' }
            : { unit_id: 'probe', severity: 'info', category: 'probe', message: 'probe' },
        ),
      });
      if (ins.status === 201) fail(`anon_can_insert: ${table}`);
      else pass(`Anon blocked from INSERT on ${table} (HTTP ${ins.status})`);
    }
  } else {
    pass('Skipped PostgREST anon probe (no anon key / URL)');
  }

  try {
    const mig = readFileSync('supabase/migrations/0004_editorial_audit_rls.sql', 'utf8');
    if (!/enable row level security/i.test(mig)) fail('migration_0004: missing RLS enable');
    else pass('Migration 0004 present in repo');
  } catch {
    fail('migration_0004: file missing');
  }

  console.log(`=== Supabase RLS autocheck (project: ${ref}) ===\n`);
  for (const p of passes) console.log('PASS:', p);
  for (const f of failures) console.log('FAIL:', f);
  console.log('\nSummary:', failures.length ? `${failures.length} failure(s)` : 'All checks passed');
  process.exit(failures.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

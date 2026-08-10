#!/usr/bin/env node
/**
 * One-shot bootstrap for the auth + billing rebuild:
 *   1. Fetch the service-role key from the Supabase Management API.
 *   2. Set SUPABASE_SERVICE_ROLE_KEY in Vercel (Production + Preview).
 *   3. Run supabase/migrations/0001_auth_billing.sql against the project.
 *   4. Add https://psrtrain.com/auth/callback (and the local one) to the
 *      project's allowed redirect URLs.
 *
 * Inputs (env vars):
 *   SB_PAT   – Supabase personal access token (sbp_...)
 *   SB_REF   – Supabase project ref (e.g. cvsawjrtgmsmadtrfwfa)
 *
 * Idempotent — safe to re-run.
 */

import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const SB_PAT = process.env.SB_PAT;
const SB_REF = process.env.SB_REF;
const SITE_URL = process.env.SITE_URL ?? 'https://psrtrain.com';

if (!SB_PAT || !SB_REF) {
  console.error('SB_PAT and SB_REF env vars are required.');
  process.exit(1);
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');
const migrationPath = resolve(repoRoot, 'supabase/migrations/0001_auth_billing.sql');

const headers = {
  Authorization: `Bearer ${SB_PAT}`,
  'Content-Type': 'application/json',
};

async function api(method, path, body) {
  const res = await fetch(`https://api.supabase.com${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : null; } catch { json = text; }
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${typeof json === 'string' ? json : JSON.stringify(json)}`);
  }
  return json;
}

function vercel(args, opts = {}) {
  const result = spawnSync('vercel', args, {
    stdio: ['pipe', 'pipe', 'pipe'],
    encoding: 'utf8',
    shell: true,
    ...opts,
  });
  return result;
}

async function step1_fetchServiceRoleKey() {
  console.log('1/4  Fetching service-role key from Supabase…');
  const keys = await api('GET', `/v1/projects/${SB_REF}/api-keys`);
  const list = Array.isArray(keys) ? keys : keys?.data ?? [];
  const serviceRole = list.find((k) => k.name === 'service_role');
  if (!serviceRole?.api_key) {
    throw new Error('Could not find service_role key in API response.');
  }
  console.log(`     ✓ got service-role key (length ${serviceRole.api_key.length})`);
  return serviceRole.api_key;
}

async function step2_setVercelEnv(serviceRoleKey) {
  console.log('2/4  Setting SUPABASE_SERVICE_ROLE_KEY in Vercel (production + preview)…');

  for (const env of ['production', 'preview']) {
    // Remove any stale value first; ignore failures (e.g. var doesn't exist).
    const rm = vercel(['env', 'rm', 'SUPABASE_SERVICE_ROLE_KEY', env, '--yes']);
    if (rm.status !== 0 && !/(was not found|does not exist)/i.test(rm.stderr ?? '')) {
      console.log(`     (rm ${env}) ${(rm.stderr ?? '').trim().split('\n').pop()}`);
    }

    // `vercel env add` reads the value from stdin.
    const add = spawnSync(
      'vercel',
      ['env', 'add', 'SUPABASE_SERVICE_ROLE_KEY', env],
      {
        input: serviceRoleKey + '\n',
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf8',
        shell: true,
      },
    );
    if (add.status !== 0) {
      throw new Error(`vercel env add ${env} failed: ${add.stderr || add.stdout}`);
    }
    console.log(`     ✓ ${env} set`);
  }
}

async function step3_runMigration() {
  console.log('3/4  Running SQL migration in Supabase…');
  const sql = await readFile(migrationPath, 'utf8');
  const result = await api('POST', `/v1/projects/${SB_REF}/database/query`, {
    query: sql,
  });
  console.log('     ✓ migration applied');
  return result;
}

async function step4_updateRedirectUrls() {
  console.log('4/4  Ensuring auth redirect URLs are registered…');
  const wanted = [
    `${SITE_URL}/auth/callback`,
    `${SITE_URL}/auth/confirm`,
    `${SITE_URL}/auth`,
    'http://localhost:3000/auth/callback',
    'http://localhost:3000/auth/confirm',
  ];

  let cfg;
  try {
    cfg = await api('GET', `/v1/projects/${SB_REF}/config/auth`);
  } catch (err) {
    console.warn(`     ! could not read auth config: ${err.message}`);
    return;
  }

  const existing = String(cfg.uri_allow_list ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  const merged = Array.from(new Set([...existing, ...wanted]));
  if (merged.length === existing.length) {
    console.log('     ✓ already up to date');
    return;
  }

  await api('PATCH', `/v1/projects/${SB_REF}/config/auth`, {
    site_url: SITE_URL,
    uri_allow_list: merged.join(','),
  });
  console.log(`     ✓ redirect URLs now: ${merged.join(', ')}`);
}

(async () => {
  try {
    const serviceRoleKey = await step1_fetchServiceRoleKey();
    await step2_setVercelEnv(serviceRoleKey);
    await step3_runMigration();
    await step4_updateRedirectUrls();
    console.log('\nAll automated steps complete. Run `vercel --prod --yes` to redeploy with the new env.');
  } catch (err) {
    console.error('\nFAILED:', err.message);
    process.exit(1);
  }
})();

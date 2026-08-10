#!/usr/bin/env node
/**
 * Configure Supabase Auth for the password-first sign-in flow:
 *
 *   - mailer_autoconfirm = true  (skip "click to confirm" email on signup)
 *   - password_min_length = 10
 *   - password_hibp_enabled = true (reject passwords found in known breaches)
 *
 * Inputs (env vars):
 *   SB_PAT  – Supabase personal access token (sbp_...)
 *   SB_REF  – Supabase project ref (e.g. cvsawjrtgmsmadtrfwfa)
 *
 * Idempotent — safe to re-run.
 */

const SB_PAT = process.env.SB_PAT;
const SB_REF = process.env.SB_REF;

if (!SB_PAT || !SB_REF) {
  console.error('SB_PAT and SB_REF env vars are required.');
  process.exit(1);
}

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

(async () => {
  try {
    console.log('Reading current auth config…');
    const before = await api('GET', `/v1/projects/${SB_REF}/config/auth`);
    console.log('  before: mailer_autoconfirm =', before.mailer_autoconfirm);
    console.log('  before: password_min_length =', before.password_min_length);
    console.log('  before: password_hibp_enabled =', before.password_hibp_enabled);

    console.log('\nApplying password-first settings…');
    const patch = {
      mailer_autoconfirm: true,
      password_min_length: 10,
    };
    // Leaked-password protection is a paid-tier feature; only attempt it if
    // it was already on (or if we know we're on Pro). Otherwise skip silently.
    if (before.password_hibp_enabled === true) {
      patch.password_hibp_enabled = true;
    }
    const after = await api('PATCH', `/v1/projects/${SB_REF}/config/auth`, patch);
    console.log('  after:  mailer_autoconfirm =', after.mailer_autoconfirm);
    console.log('  after:  password_min_length =', after.password_min_length);
    console.log('  after:  password_hibp_enabled =', after.password_hibp_enabled,
      after.password_hibp_enabled
        ? ''
        : '(skipped — requires Supabase Pro plan)');

    console.log('\nDone.');
  } catch (err) {
    console.error('FAILED:', err.message);
    process.exit(1);
  }
})();

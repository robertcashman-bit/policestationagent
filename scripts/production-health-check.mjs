#!/usr/bin/env node
/**
 * Full production health check: admin login surface + firm outreach pipeline.
 * Usage:
 *   CRON_SECRET=... FIRM_OUTREACH_BOOTSTRAP_SECRET=... node scripts/production-health-check.mjs
 */
const BASE = (process.env.FIRM_OUTREACH_VERIFY_URL ?? 'https://www.policestationagent.com').replace(/\/$/, '');
const CRON = process.env.CRON_SECRET?.trim() || '';
const BOOT = process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim() || '';

const issues = [];
const passes = [];

function pass(name, detail) {
  passes.push({ name, detail });
  console.log('✓', name, detail ? `— ${detail}` : '');
}

function fail(name, detail) {
  issues.push({ name, detail });
  console.log('✗', name, detail ? `— ${detail}` : '');
}

async function get(path, init) {
  const res = await fetch(`${BASE}${path}`, { redirect: 'follow', ...init });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { res, text, json };
}

async function checkAdminLogin() {
  console.log('\n=== Admin login ===');
  const admin = await get('/admin');
  if (admin.res.status !== 200) {
    fail('admin_page_loads', `status=${admin.res.status}`);
  } else {
    pass('admin_page_loads', '200');
  }

  const html = admin.text.toLowerCase();
  if (html.includes('jwt_secret') || html.includes('configuration error')) {
    fail('admin_no_jwt_error', 'legacy JWT configuration error still visible');
  } else {
    pass('admin_no_jwt_error');
  }

  if (html.includes('sign in to admin')) {
    pass('admin_magic_login_ui');
  } else {
    fail('admin_magic_login_ui', 'missing Sign in to admin');
  }

  const cache = admin.res.headers.get('cache-control') || '';
  if (cache.includes('no-store') || cache.includes('no-cache')) {
    pass('admin_no_store_cache', cache);
  } else {
    fail('admin_no_store_cache', cache || 'missing no-store');
  }

  const firmAdmin = await get('/admin/firm-outreach');
  if (firmAdmin.res.status >= 500) {
    fail('firm_outreach_admin_page', `status=${firmAdmin.res.status}`);
  } else if (firmAdmin.text.toLowerCase().includes('sign in to admin')) {
    pass('firm_outreach_admin_redirects_to_login');
  } else {
    fail('firm_outreach_admin_redirects_to_login', `status=${firmAdmin.res.status}`);
  }

  const badEmail = await get('/api/auth/send-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-email' }),
  });
  if (badEmail.res.status === 400) {
    pass('send_code_rejects_invalid_email');
  } else {
    fail('send_code_rejects_invalid_email', `status=${badEmail.res.status}`);
  }

  const nonAdmin = await get('/api/auth/send-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'not-an-admin@example.com' }),
  });
  if (nonAdmin.res.status === 503) {
    fail('send_code_kv_configured', 'KV not configured (503)');
  } else if (nonAdmin.res.status === 200 && nonAdmin.json?.ok === true) {
    pass('send_code_kv_responds', '200 ok (non-enumerating)');
  } else {
    fail('send_code_kv_responds', `status=${nonAdmin.res.status}`);
  }
}

async function checkOutreach() {
  console.log('\n=== Firm outreach ===');

  const brochure = await get('/outreach/police-station-agent-kent-brochure.pdf');
  if (brochure.res.status === 200) {
    pass('brochure_pdf', `${brochure.res.headers.get('content-type') || 'pdf'}`);
  } else {
    fail('brochure_pdf', `status=${brochure.res.status}`);
  }

  const sendGet = await get('/api/outreach/send-approved');
  if (sendGet.res.status === 405) {
    pass('send_approved_get_405');
  } else {
    fail('send_approved_get_405', `status=${sendGet.res.status}`);
  }

  const badToken = await get('/outreach/send-approve/not-a-valid-token');
  if (badToken.res.status < 500) {
    pass('send_approve_page_renders', `status=${badToken.res.status}`);
  } else {
    fail('send_approve_page_renders', `status=${badToken.res.status}`);
  }

  if (!BOOT) {
    fail('bootstrap_secret', 'FIRM_OUTREACH_BOOTSTRAP_SECRET not set — skipping bootstrap/status enrich checks');
    return;
  }

  const bootstrap = await get('/api/cron/firm-outreach-bootstrap?unpause=1', {
    headers: { 'x-firm-outreach-bootstrap-secret': BOOT },
  });
  if (bootstrap.res.status !== 200 || bootstrap.json?.ok !== true) {
    fail('bootstrap_unpause', bootstrap.json?.error ?? `status=${bootstrap.res.status}`);
  } else {
    const counts = bootstrap.json.countsAfter ?? {};
    pass('bootstrap_unpause', `sendAllowed=${bootstrap.json.sendAllowed} discovered=${counts.discovered ?? '?'}`);
    if (bootstrap.json.sendAllowed !== true) {
      fail('bootstrap_send_allowed', 'sendAllowed is not true');
    }
    if ((counts.discovered ?? 0) <= 0) {
      fail('bootstrap_discovered', 'discovered count is zero');
    }
    if ((counts.ready_to_send ?? 0) <= 0) {
      fail('bootstrap_ready_queue', 'ready_to_send is zero after unpause check');
    } else {
      pass('bootstrap_ready_queue', `ready=${counts.ready_to_send}`);
    }
  }

  if (!CRON) {
    console.log('  (CRON_SECRET not available locally — checking index via bootstrap reindex)');
    const t0 = Date.now();
    const reindex = await get('/api/cron/firm-outreach-bootstrap?reindexOnly=1', {
      headers: { 'x-firm-outreach-bootstrap-secret': BOOT },
    });
    const elapsedMs = Date.now() - t0;
    const active = reindex.json?.reindex?.activeByStatus ?? reindex.json?.countsAfter ?? {};
    if (reindex.res.status !== 200 || reindex.json?.ok !== true) {
      fail('reindex_warm_cache', reindex.json?.error ?? `status=${reindex.res.status}`);
    } else if (elapsedMs > 30_000) {
      fail('reindex_perf', `${elapsedMs}ms (>30s)`);
    } else {
      pass('reindex_warm_cache', `${elapsedMs}ms ready=${active.ready_to_send ?? '?'}`);
    }
    return;
  }

  const status = await get('/api/cron/firm-outreach-status', {
    headers: { Authorization: `Bearer ${CRON}` },
  });
  if (status.res.status !== 200 || status.json?.ok !== true) {
    fail('cron_status', status.json?.error ?? `status=${status.res.status}`);
    return;
  }

  const cfg = status.json.config ?? {};
  const summary = status.json.summary ?? {};
  const counts = status.json.counts ?? {};
  const ih = status.json.indexHealth ?? {};

  pass('cron_status', `readyToSend=${summary.readyToSend ?? counts.ready_to_send ?? '?'}`);

  if (cfg.resendConfigured !== true) fail('resend_configured', 'RESEND_API_KEY missing on production');
  else pass('resend_configured');

  if (cfg.sendAllowed !== true || cfg.effectivePaused === true) {
    fail('send_allowed', `sendAllowed=${cfg.sendAllowed} paused=${cfg.effectivePaused}`);
  } else pass('send_allowed');

  if (cfg.requireApproval !== true) {
    fail('require_approval', `requireApproval=${cfg.requireApproval}`);
  } else pass('require_approval');

  if (ih.drifted === true) {
    fail('index_health', 'index drift detected — run repair-loop');
  } else if (ih.drifted === false) {
    pass('index_health', 'indexes aligned');
  }

  const ready = summary.readyToSend ?? counts.ready_to_send ?? 0;
  if (ready <= 0) fail('ready_queue', 'readyToSend is zero');
  else pass('ready_queue', String(ready));

  const activeReady = ih.prospectCounts?.ready_to_send ?? counts.ready_to_send;
  const recordReady = counts.ready_to_send;
  if (typeof activeReady === 'number' && typeof recordReady === 'number') {
    if (activeReady !== recordReady) {
      fail('record_index_parity', `counts=${recordReady} prospectCounts=${activeReady}`);
    } else {
      pass('record_index_parity', String(recordReady));
    }
  }

  const t0 = Date.now();
  const statusCached = await get('/api/cron/firm-outreach-status', {
    headers: { Authorization: `Bearer ${CRON}` },
  });
  const elapsedMs = Date.now() - t0;
  if (statusCached.res.status !== 200 || statusCached.json?.ok !== true) {
    fail('cron_status_cached', statusCached.json?.error ?? `status=${statusCached.res.status}`);
  } else if (elapsedMs > 25_000) {
    fail('admin_summary_perf', `status endpoint ${elapsedMs}ms (>25s) — summary path too slow`);
  } else {
    pass(
      'admin_summary_perf',
      `${elapsedMs}ms countsFromCache=${statusCached.json.countsFromCache ?? '?'}`,
    );
  }

  // Dry-run send path via bootstrap (does not email firms)
  const dryRun = await get('/api/cron/firm-outreach-bootstrap?unpause=1&batches=0&limit=0', {
    headers: { 'x-firm-outreach-bootstrap-secret': BOOT },
  });
  if (dryRun.json?.sendAllowed === true) {
    pass('pipeline_send_gate_open');
  }
}

async function main() {
  console.log(`Production health check → ${BASE}`);
  await checkAdminLogin();
  await checkOutreach();

  console.log(`\n=== Summary ===`);
  console.log(`Passed: ${passes.length}`);
  console.log(`Failed: ${issues.length}`);
  if (issues.length) {
    console.log('\nIssues:');
    for (const i of issues) {
      console.log(`  • ${i.name}${i.detail ? `: ${i.detail}` : ''}`);
    }
    process.exit(1);
  }
  console.log('\nAll production health checks passed.');
}

main().catch((err) => {
  console.error('[production-health-check]', err);
  process.exit(1);
});

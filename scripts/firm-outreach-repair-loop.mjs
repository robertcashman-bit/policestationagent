#!/usr/bin/env node
/**
 * Production repair loop: reindex until dashboard counts restore, then enrich once.
 *
 *   FIRM_OUTREACH_BOOTSTRAP_SECRET=... node scripts/firm-outreach-repair-loop.mjs
 *   FIRM_OUTREACH_VERIFY_URL=https://www.policestationagent.com node scripts/firm-outreach-repair-loop.mjs
 */
const baseUrl = (process.env.FIRM_OUTREACH_VERIFY_URL ?? 'https://www.policestationagent.com').replace(
  /\/$/,
  '',
);
const secret =
  process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim() ||
  (await readSecretFile('/tmp/.outreach-bootstrap-secret'));

const MAX_ATTEMPTS = Number(process.env.FIRM_OUTREACH_REPAIR_ATTEMPTS || 3);

async function readSecretFile(path) {
  try {
    const fs = await import('fs/promises');
    return (await fs.readFile(path, 'utf8')).trim();
  } catch {
    return '';
  }
}

async function bootstrap(query) {
  const res = await fetch(`${baseUrl}/api/cron/firm-outreach-bootstrap?${query}`, {
    headers: { 'x-firm-outreach-bootstrap-secret': secret },
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }
  if (!res.ok) {
    throw new Error(json.error ?? `HTTP ${res.status}`);
  }
  return json;
}

function indexedTotal(counts) {
  if (!counts || typeof counts !== 'object') return 0;
  return Object.values(counts).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

async function main() {
  if (!secret) {
    console.error('Missing FIRM_OUTREACH_BOOTSTRAP_SECRET');
    process.exit(1);
  }

  console.log(`Repair loop → ${baseUrl} (max ${MAX_ATTEMPTS} reindex attempts)`);

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`\n[attempt ${attempt}] reindexOnly…`);
    const reindex = await bootstrap('unpause=1&reindexOnly=1');
    const after = reindex.countsAfter ?? {};
    const total = indexedTotal(after);
    const discovered = after.discovered ?? 0;
    console.log(`  scanned=${reindex.reindex?.scanned ?? '?'} indexedTotal=${total} discovered=${discovered}`);

    if (total > 0 && discovered > 0) {
      console.log('\n[enrich] reindex=1 batches=2 limit=25…');
      const enrich = await bootstrap('reindex=1&batches=2&limit=25');
      const counts = enrich.countsAfter ?? {};
      console.log(
        `  processed=${enrich.totals?.processed ?? 0} ready=${counts.ready_to_send ?? 0} discovered=${counts.discovered ?? 0}`,
      );
      console.log('\nRepair OK — indexes restored and enrich pass completed');
      return;
    }

    if (attempt === MAX_ATTEMPTS) {
      console.error('\nRepair FAILED — status indexes still empty after reindex');
      process.exit(1);
    }

    console.log('  still zero — retrying after 5s…');
    await new Promise((r) => setTimeout(r, 5000));
  }
}

main().catch((err) => {
  console.error('[firm-outreach-repair-loop]', err.message ?? err);
  process.exit(1);
});

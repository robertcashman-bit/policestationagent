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
const cronSecret = process.env.CRON_SECRET?.trim() || '';

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

async function fetchStatus() {
  if (!cronSecret) return null;
  const res = await fetch(`${baseUrl}/api/cron/firm-outreach-status`, {
    headers: { Authorization: `Bearer ${cronSecret}` },
  });
  if (!res.ok) return null;
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function indexedTotal(counts) {
  if (!counts || typeof counts !== 'object') return 0;
  return Object.values(counts).reduce((sum, n) => sum + (Number(n) || 0), 0);
}

function readyCountFrom(payload) {
  const counts = payload?.countsAfter ?? payload?.counts ?? {};
  const active = payload?.reindex?.activeByStatus ?? payload?.indexHealth?.activeByStatus ?? {};
  return Number(counts.ready_to_send ?? active.ready_to_send ?? 0);
}

function sendAllowedFrom(payload) {
  if (typeof payload?.sendAllowed === 'boolean') return payload.sendAllowed;
  if (typeof payload?.config?.sendAllowed === 'boolean') return payload.config.sendAllowed;
  return true;
}

async function main() {
  if (!secret) {
    console.error('Missing FIRM_OUTREACH_BOOTSTRAP_SECRET');
    process.exit(1);
  }

  console.log(`Repair loop → ${baseUrl} (max ${MAX_ATTEMPTS} reindex attempts)`);

  const statusBefore = await fetchStatus();
  if (statusBefore?.indexHealth?.drifted) {
    console.log('  index drift detected before repair — reindex required');
  }

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
      const active = enrich.reindex?.activeByStatus ?? {};
      const ready = readyCountFrom(enrich);
      const sendAllowed = sendAllowedFrom(enrich);
      console.log(
        `  processed=${enrich.totals?.processed ?? 0} ready=${ready} discovered=${counts.discovered ?? 0}`,
      );
      console.log(
        `  active records: ready=${active.ready_to_send ?? 0} discovered=${active.discovered ?? 0}`,
      );
      console.log(`  sendAllowed=${sendAllowed}`);

      const statusAfter = await fetchStatus();
      if (statusAfter?.indexHealth?.drifted) {
        console.log('  WARNING: indexHealth.drifted still true after repair');
      }

      if (ready > 0 && sendAllowed) {
        console.log('\nRepair OK — indexes restored, ready queue populated, sendAllowed=true');
        return;
      }

      console.error(
        `\nRepair FAILED — ready_to_send=${ready}, sendAllowed=${sendAllowed} (need ready>0 and sendAllowed)`,
      );
      process.exit(1);
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

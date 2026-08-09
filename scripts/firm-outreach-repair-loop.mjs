#!/usr/bin/env node
/**
 * Production repair loop: chunked SCAN reindex until dashboard counts restore, then enrich once.
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

const MAX_CHUNK_PASSES = Number(process.env.FIRM_OUTREACH_REPAIR_CHUNK_PASSES || 40);

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

  console.log(`Repair loop → ${baseUrl} (max ${MAX_CHUNK_PASSES} chunked reindex passes)`);

  const statusBefore = await fetchStatus();
  if (statusBefore?.indexHealth?.drifted) {
    console.log('  index drift detected before repair — reindex required');
  }

  await bootstrap('unpause=1');

  let done = false;
  for (let pass = 1; pass <= MAX_CHUNK_PASSES; pass++) {
    const reset = pass === 1 ? '&reindexReset=1' : '';
    console.log(`\n[chunk ${pass}] reindexChunk…`);
    const chunk = await bootstrap(`reindexChunk=1${reset}`);
    const after = chunk.countsAfter ?? {};
    const total = indexedTotal(after);
    const discovered = after.discovered ?? 0;
    done = Boolean(chunk.reindexDone ?? chunk.reindexChunk?.done);
    console.log(
      `  keysProcessed=${chunk.reindexChunk?.keysProcessed ?? '?'} scanned=${chunk.reindex?.scanned ?? chunk.reindexChunk?.scanned ?? '?'} indexedTotal=${total} discovered=${discovered} done=${done}`,
    );

    if (done) break;
  }

  if (!done) {
    console.error('\nRepair FAILED — chunked reindex did not finish');
    process.exit(1);
  }

  const statusMid = await fetchStatus();
  const midCounts = statusMid?.counts ?? {};
  const midTotal = indexedTotal(midCounts);
  console.log(`\n[status] indexedTotal=${midTotal} discovered=${midCounts.discovered ?? 0}`);

  if (midTotal <= 0) {
    console.log('\n[discovery] indexes still empty — triggering maintain discovery…');
    if (cronSecret) {
      const res = await fetch(`${baseUrl}/api/cron/firm-outreach-pipeline/maintain`, {
        headers: { Authorization: `Bearer ${cronSecret}` },
      });
      console.log(`  maintain HTTP ${res.status}`);
      // Re-run a few chunk passes after discovery writes records
      for (let pass = 1; pass <= 10; pass++) {
        const reset = pass === 1 ? '&reindexReset=1' : '';
        const chunk = await bootstrap(`reindexChunk=1${reset}`);
        const total = indexedTotal(chunk.countsAfter ?? {});
        const finished = Boolean(chunk.reindexDone ?? chunk.reindexChunk?.done);
        console.log(`  post-discovery chunk ${pass}: indexedTotal=${total} done=${finished}`);
        if (finished && total > 0) break;
        if (finished && total <= 0) break;
      }
    }
  }

  console.log('\n[enrich] batches=3 limit=40…');
  const enrich = await bootstrap('batches=3&limit=40');
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

  const finalReady = Math.max(ready, Number(statusAfter?.counts?.ready_to_send ?? 0));
  // Success requires ready > 0 && sendAllowed (health-loop / verify gates).
  if (finalReady > 0 && sendAllowed) {
    console.log('\nRepair OK — indexes restored, ready queue populated, sendAllowed=true');
    return;
  }

  // If we have discovered but not ready yet, enrich may need more passes
  if ((counts.discovered ?? 0) > 0 && sendAllowed) {
    console.log('\n[enrich-more] batches=4 limit=50…');
    const enrich2 = await bootstrap('batches=4&limit=50');
    const ready2 = readyCountFrom(enrich2);
    console.log(`  ready=${ready2} processed=${enrich2.totals?.processed ?? 0}`);
    if (ready2 > 0) {
      console.log('\nRepair OK — ready queue populated after extra enrich');
      return;
    }
  }

  console.error(
    `\nRepair FAILED — ready_to_send=${finalReady}, sendAllowed=${sendAllowed}, discovered=${counts.discovered ?? 0}`,
  );
  process.exit(1);
}

main().catch((err) => {
  console.error('[firm-outreach-repair-loop]', err.message ?? err);
  process.exit(1);
});

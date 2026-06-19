/**
 * Run multiple production bootstrap enrich passes until ready queue fills or no progress.
 *
 * Usage:
 *   FIRM_OUTREACH_BOOTSTRAP_SECRET=... node scripts/run-enrich-passes.mjs
 *   node scripts/run-enrich-passes.mjs --passes=15 --limit=8 --target=25
 */
import { readFileSync } from 'fs';

const SITE =
  process.env.FIRM_OUTREACH_VERIFY_URL?.replace(/\/$/, '') ||
  'https://www.policestationagent.com';

function arg(name, fallback) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const n = Number(hit.split('=')[1]);
  return Number.isFinite(n) ? n : fallback;
}

function secret() {
  if (process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET) {
    return process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET;
  }
  try {
    return readFileSync('/tmp/.outreach-bootstrap-secret', 'utf8').trim();
  } catch {
    throw new Error('Set FIRM_OUTREACH_BOOTSTRAP_SECRET or create /tmp/.outreach-bootstrap-secret');
  }
}

async function bootstrapPass(bootstrapSecret, { batches, limit, maxMs }) {
  const params = new URLSearchParams({
    batches: String(batches),
    limit: String(limit),
    maxMs: String(maxMs),
  });
  const url = `${SITE}/api/cron/firm-outreach-bootstrap?${params}`;
  const res = await fetch(url, {
    headers: { 'x-firm-outreach-bootstrap-secret': bootstrapSecret },
    signal: AbortSignal.timeout(140_000),
  });
  const json = await res.json().catch(async () => ({ raw: await res.text() }));
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(json).slice(0, 400)}`);
  }
  return json;
}

async function main() {
  const passes = arg('passes', 15);
  const limit = arg('limit', 8);
  const target = arg('target', 25);
  const batches = arg('batches', 1);
  const maxMs = arg('maxMs', 280_000);
  const bootstrapSecret = secret();

  for (let pass = 1; pass <= passes; pass++) {
    console.log(`[pass ${pass}/${passes}] enriching…`);
    const j = await bootstrapPass(bootstrapSecret, { batches, limit, maxMs });
    const summary = {
      processed: j.totals?.processed ?? 0,
      readyBatch: j.totals?.readyToSend ?? 0,
      emailsFound: j.totals?.emailsFound ?? 0,
      readyCount: j.countsAfter?.ready_to_send ?? 0,
      discovered: j.countsAfter?.discovered ?? 0,
      noEmail: j.countsAfter?.no_email ?? 0,
    };
    console.log(JSON.stringify(summary));

    if (summary.readyCount >= target) {
      console.log(`[done] ready_to_send=${summary.readyCount} (target ${target})`);
      return;
    }
    if (summary.processed === 0) {
      console.log('[done] no firms processed this pass');
      return;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  console.log(`[done] finished ${passes} passes without reaching target ${target}`);
}

main().catch((err) => {
  console.error('[run-enrich-passes]', err.message || err);
  process.exit(1);
});

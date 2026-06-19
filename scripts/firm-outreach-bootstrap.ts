/**
 * Unpause outreach and run enrichment batches against production KV.
 *
 * Usage:
 *   npx tsx scripts/firm-outreach-bootstrap.ts
 *   npx tsx scripts/firm-outreach-bootstrap.ts --batches=15 --limit=60
 */
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
if (!process.env.UPSTASH_REDIS_REST_URL && !process.env.KV_REST_API_URL) {
  config({ path: resolve(__dirname, '../.env.local') });
  config();
}

function numArg(name: string, fallback: number): number {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (!hit) return fallback;
  const n = Number(hit.split('=')[1]);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

async function main() {
  const batches = numArg('batches', 10);
  const limit = numArg('limit', 60);
  const maxMs = numArg('max-ms', 110_000);

  const { getKV } = await import('../lib/kv');
  if (!getKV()) {
    console.error('KV not configured — set UPSTASH_REDIS_REST_URL/TOKEN in .env.local');
    process.exit(1);
  }

  const { bootstrapOutreach } = await import('../lib/firm-outreach/bootstrap-outreach');

  if (process.env.FIRM_OUTREACH_PAUSED === 'true') {
    console.error('Cannot unpause: FIRM_OUTREACH_PAUSED=true in Vercel env — remove it there.');
    process.exit(1);
  }

  const result = await bootstrapOutreach({ batches, limit, maxElapsedMs: maxMs });
  console.log('[bootstrap] Before:', JSON.stringify(result.countsBefore));
  console.log('[bootstrap] After:', JSON.stringify(result.countsAfter));
  console.log('[bootstrap] Unpaused:', result.unpaused);
  console.log('[bootstrap] Totals:', result.totals);
  console.log('[bootstrap] sendAllowed:', result.sendAllowed);
  for (const [i, batch] of result.batches.entries()) {
    console.log(`[bootstrap] Batch ${i + 1}:`, JSON.stringify(batch));
  }
}

main().catch((err) => {
  console.error('[firm-outreach bootstrap] failed:', err);
  process.exit(1);
});

import { Redis } from '@upstash/redis';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'dotenv';
import {
  formatQueueCounts,
  getCampaignQueueCounts,
} from '../lib/firm-outreach/queue-health';

const PSA_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOME = dirname(PSA_ROOT);

const PSA_CAMPAIGN = 'agent_cover_kent_v1';
const REPUK_CAMPAIGN = 'whatsapp_invite_v1';

const CAMPAIGN_LABELS: Record<string, string> = {
  [PSA_CAMPAIGN]: 'policestationagent.com',
  [REPUK_CAMPAIGN]: 'policestationrepuk.org',
};

function loadKvCreds(): { url: string; token: string } {
  const env = parse(readFileSync(join(HOME, 'Policestationrepuk', '.env.local')));
  return {
    url: (env.KV_REST_API_URL || '').replace(/^"|"$/g, ''),
    token: (env.KV_REST_API_TOKEN || '').replace(/^"|"$/g, ''),
  };
}

type Send = {
  sentAt?: string;
  email: string;
  firmName: string;
  campaignId: string;
  sequenceStep: number;
  subject: string;
};

async function main() {
  const { url, token } = loadKvCreds();
  const redis = new Redis({ url, token });

  const queueCounts = await getCampaignQueueCounts(redis);
  for (const line of formatQueueCounts(queueCounts, CAMPAIGN_LABELS)) {
    console.log(line);
  }

  const date = new Date().toISOString().slice(0, 10);
  const start = Date.parse(`${date}T00:00:00.000Z`);
  const end = Date.parse(`${date}T23:59:59.999Z`);
  const ids = (await redis.get<string[]>('firmoutreach:send:index')) ?? [];

  const byCampaign: Record<string, Send[]> = {};

  for (let i = 0; i < ids.length; i += 64) {
    const keys = ids.slice(i, i + 64).map((id) => `firmoutreach:send:${id}`);
    const batch = await redis.mget<(Send | null)[]>(...keys);
    for (const s of batch) {
      if (!s?.sentAt) continue;
      const t = Date.parse(s.sentAt);
      if (t < start || t > end) continue;
      const c = s.campaignId || '(none)';
      (byCampaign[c] ??= []).push(s);
    }
  }

  console.log(`\n=== Today's sends by campaign (${date} UTC) ===\n`);
  for (const [c, list] of Object.entries(byCampaign).sort((a, b) => b[1].length - a[1].length)) {
    const label = CAMPAIGN_LABELS[c] ?? c;
    console.log(`${label} (${c}): ${list.length} sends`);
    for (const s of list.slice(0, 3)) {
      console.log(`  ${s.sentAt!.slice(11, 19)}  ${s.firmName}  <${s.email}>  "${s.subject}"`);
    }
    if (list.length > 3) console.log(`  ... and ${list.length - 3} more`);
    console.log('');
  }

  const psa = byCampaign[PSA_CAMPAIGN]?.length ?? 0;
  const repuk = byCampaign[REPUK_CAMPAIGN]?.length ?? 0;
  const raw = Object.values(byCampaign).reduce((n, l) => n + l.length, 0);
  console.log('=== Send totals ===');
  console.log(`policestationagent.com (${PSA_CAMPAIGN}): ${psa}`);
  console.log(`policestationrepuk.org (${REPUK_CAMPAIGN}): ${repuk}`);
  console.log(`Combined (unique campaigns): ${psa + repuk}`);
  console.log(`Raw index total (no campaign filter): ${raw}`);

  const psaQueue = queueCounts.find((q) => q.campaignId === PSA_CAMPAIGN);
  if (psaQueue) {
    const ready = psaQueue.byStatus.ready_to_send ?? 0;
    const discovered = psaQueue.byStatus.discovered ?? 0;
    console.log(`\nPSA pipeline snapshot: ready_to_send=${ready}, discovered=${discovered}`);
    if (ready < 50 && discovered > 100) {
      console.log('Bottleneck: enrichment throughput (large discovered pool, small ready queue).');
    } else if (discovered < 50) {
      console.log('Bottleneck: discovery pool may be exhausted — consider paid enrichment keys.');
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

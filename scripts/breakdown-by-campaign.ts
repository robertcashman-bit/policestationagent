import { Redis } from '@upstash/redis';
import { readFileSync } from 'node:fs';
import { parse } from 'dotenv';

const env = parse(readFileSync('/Users/robertcashman/Policestationrepuk/.env.local'));
const redis = new Redis({
  url: (env.KV_REST_API_URL || '').replace(/^"|"$/g, ''),
  token: (env.KV_REST_API_TOKEN || '').replace(/^"|"$/g, ''),
});

const PSA_CAMPAIGN = 'agent_cover_kent_v1';
const REPUK_CAMPAIGN = 'whatsapp_invite_v1';

type Send = {
  sentAt?: string;
  email: string;
  firmName: string;
  campaignId: string;
  sequenceStep: number;
  subject: string;
};

async function main() {
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

  console.log(`\nToday's sends by campaign (${date} UTC):\n`);
  for (const [c, list] of Object.entries(byCampaign).sort((a, b) => b[1].length - a[1].length)) {
    const label =
      c === PSA_CAMPAIGN
        ? 'policestationagent.com'
        : c === REPUK_CAMPAIGN
          ? 'policestationrepuk.org'
          : c;
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
  console.log('=== Corrected totals ===');
  console.log(`policestationagent.com (${PSA_CAMPAIGN}): ${psa}`);
  console.log(`policestationrepuk.org (${REPUK_CAMPAIGN}): ${repuk}`);
  console.log(`Combined (unique campaigns): ${psa + repuk}`);
  console.log(`Raw index total (no campaign filter): ${raw}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

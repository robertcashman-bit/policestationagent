#!/usr/bin/env npx tsx
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { runBufferScheduler, verifyPsaBufferSchedule } from '@/lib/buffer/engine-run';

function loadEnv(file: string) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const eq = t.indexOf('=');
    if (eq <= 0) continue;
    const k = t.slice(0, eq);
    let v = t.slice(eq + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    if (!process.env[k]) process.env[k] = v;
  }
}

loadEnv(resolve('/Users/robertcashman/Policestationrepuk/.env.local'));
loadEnv(resolve('/Users/robertcashman/policestationagent/.env.vercel.tmp'));
process.env.BUFFER_ORGANIZATION_ID ??= '69d26bdf0f822245c9a723c4';
process.env.BUFFER_CHANNEL_LINKEDIN_ID ??= '69d26c06031bfa423cd0c50d';
process.env.BUFFER_CHANNEL_TWITTER_ID ??= '69d26c3d031bfa423cd0c6b3';
process.env.BUFFER_CHANNEL_FACEBOOK_ID ??= '6a304bd938b55793459b4255';
process.env.BUFFER_CHANNEL_GOOGLEBUSINESS_ID ??= '69d26c8b031bfa423cd0c8b7';
process.env.BUFFER_DEDUP_WINDOW_DAYS ??= '30';
process.env.BUFFER_SCHEDULER_POSTS_PER_FEED ??= '5';
process.env.BUFFER_SCHEDULER_TIMEZONE ??= 'Europe/London';

const dryRun = process.argv.includes('--dry-run');
const verify = process.argv.includes('--verify');
const backfillDays = (() => {
  const idx = process.argv.indexOf('--days');
  if (idx >= 0 && process.argv[idx + 1]) {
    const n = Number(process.argv[idx + 1]);
    if (Number.isFinite(n) && n > 0) return Math.min(n, 14);
  }
  return 0;
})();

async function main() {
  if (verify) {
    const r = await verifyPsaBufferSchedule({ gapFill: true });
    console.log(JSON.stringify(r, null, 2));
    if (!r.ok) process.exit(1);
    return;
  }

  if (backfillDays > 0) {
    const results = [];
    for (let day = 0; day < backfillDays; day++) {
      const now = new Date();
      now.setUTCDate(now.getUTCDate() + day);
      const r = await runBufferScheduler({ force: true, dryRun, now });
      results.push({ day, date: r.date, ok: r.ok, created: r.posts?.length ?? 0, errors: r.errors?.length ?? 0 });
      if (!r.ok && !dryRun) console.error(JSON.stringify(r, null, 2));
    }
    console.log(JSON.stringify({ ok: true, backfillDays, results }, null, 2));
    return;
  }

  const r = await runBufferScheduler({ force: true, dryRun });
  console.log(JSON.stringify(r, null, 2));
  if (!r.ok) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

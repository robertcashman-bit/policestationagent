#!/usr/bin/env tsx
/**
 * Firm outreach verification — repo checks + optional production HTTP checks.
 *
 * Usage:
 *   npm run verify:firm-outreach
 *   FIRM_OUTREACH_VERIFY_URL=https://www.policestationagent.com npm run verify:firm-outreach
 *   CRON_SECRET=... FIRM_OUTREACH_VERIFY_URL=... npm run verify:firm-outreach
 */
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import {
  runHttpChecks,
  runRepoChecks,
  summarizeResults,
} from '../lib/firm-outreach/verify-checks';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });
config();

async function main() {
  const repoResults = runRepoChecks();
  const repoSummary = summarizeResults(repoResults);

  console.log('\n=== Firm outreach — repo checks ===');
  for (const r of repoResults) {
    console.log(r.ok ? '✓' : '✗', r.name, r.detail ? `— ${r.detail}` : '');
  }
  console.log(`Repo: ${repoSummary.passed}/${repoResults.length} passed`);

  const baseUrl = process.env.FIRM_OUTREACH_VERIFY_URL?.trim();
  let httpSummary = { passed: 0, failed: 0, failures: [] as { name: string }[] };

  if (baseUrl) {
    console.log(`\n=== Firm outreach — HTTP checks (${baseUrl}) ===`);
    const httpResults = await runHttpChecks(baseUrl, {
      cronSecret: process.env.CRON_SECRET?.trim(),
      bootstrapSecret: process.env.FIRM_OUTREACH_BOOTSTRAP_SECRET?.trim(),
    });
    httpSummary = summarizeResults(httpResults);
    for (const r of httpResults) {
      console.log(
        r.ok ? '✓' : '✗',
        r.name,
        r.status ? `[${r.status}]` : '',
        r.detail ? `— ${r.detail}` : '',
      );
    }
    console.log(`HTTP: ${httpSummary.passed}/${httpResults.length} passed`);
  } else {
    console.log('\n(Skipping HTTP checks — set FIRM_OUTREACH_VERIFY_URL to enable)');
  }

  const totalFailed = repoSummary.failed + httpSummary.failed;
  if (totalFailed > 0) {
    console.error(`\nFirm outreach verification FAILED (${totalFailed} check(s))`);
    process.exit(1);
  }

  console.log('\nFirm outreach verification OK');
}

main().catch((err) => {
  console.error('[verify-firm-outreach] failed:', err);
  process.exit(1);
});

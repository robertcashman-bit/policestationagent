import { join, dirname } from 'path';
import { randomBytes } from 'crypto';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE =
  process.env.FIRM_OUTREACH_VERIFY_URL?.replace(/\/$/, '') ||
  'https://www.policestationagent.com';
const ENV_NAME = 'FIRM_OUTREACH_BOOTSTRAP_SECRET';

async function invokeBootstrap(bootstrapSecret, params = 'batches=8&limit=60') {
  const url = `${SITE}/api/cron/firm-outreach-bootstrap?${params}`;
  const res = await fetch(url, {
    headers: { 'x-firm-outreach-bootstrap-secret': bootstrapSecret },
  });
  const json = await res.json().catch(async () => ({ raw: await res.text() }));
  if (!res.ok) {
    throw new Error(`Bootstrap HTTP ${res.status}: ${JSON.stringify(json).slice(0, 500)}`);
  }
  return json;
}

async function main() {
  const bootstrapSecret = randomBytes(24).toString('hex');
  console.log('[trigger] Setting Vercel env', ENV_NAME);
  execSync(
    `npx vercel env add ${ENV_NAME} production --value ${bootstrapSecret} --sensitive --yes --force`,
    { stdio: 'inherit', cwd: ROOT },
  );

  console.log('[trigger] Deploying production…');
  execSync('npx vercel deploy --prod --yes', { stdio: 'inherit', cwd: ROOT });

  console.log('[trigger] Running bootstrap enrich (4×60, up to 3 passes)…');
  let last;
  for (let pass = 1; pass <= 3; pass++) {
    console.log(`[trigger] Pass ${pass}/3…`);
    last = await invokeBootstrap(bootstrapSecret, 'batches=4&limit=60');
    if ((last.totals?.processed ?? 0) === 0) break;
  }
  const result = last;
  console.log('[trigger] OK');
  console.log(
    JSON.stringify(
      {
        unpaused: result.unpaused,
        sendAllowed: result.sendAllowed,
        countsBefore: result.countsBefore,
        countsAfter: result.countsAfter,
        totals: result.totals,
        batchesRun: result.batches?.length,
      },
      null,
      2,
    ),
  );
}

main().catch((err) => {
  console.error('[trigger-firm-outreach-bootstrap]', err.message || err);
  process.exit(1);
});

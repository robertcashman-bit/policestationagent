/**
 * Quick production smoke test (HTTP status + branding scan).
 * Used by: npm run test:smoke
 */
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const base = (process.env.PLAYWRIGHT_BASE_URL || 'https://psrtrain.com').replace(/\/$/, '');

const PATHS = [
  '/',
  '/pricing',
  '/training',
  '/features',
  '/auth',
  '/legal/privacy',
  '/legal/terms',
  '/legal/disclaimer',
  '/legal/contact',
  '/legal/refund',
  '/sitemap.xml',
  '/robots.txt',
];

const BAD_COPY = /PSR Academy|PSR ACADEMY|Defence Legal Services|fully accredited content/i;

async function main() {
  const failures = [];

  for (const p of PATHS) {
    try {
      const res = await fetch(`${base}${p}`, { redirect: 'follow' });
      if (res.status >= 400) {
        failures.push(`${p} → HTTP ${res.status}`);
        continue;
      }
      const html = await res.text();
      if (BAD_COPY.test(html)) {
        failures.push(`${p} → risky branding copy detected`);
      }
    } catch (e) {
      failures.push(`${p} → ${e.message}`);
    }
  }

  if (failures.length) {
    console.error('Smoke test FAILED:\n' + failures.map((f) => `  - ${f}`).join('\n'));
    process.exit(1);
  }

  console.log(`Smoke test OK (${PATHS.length} routes on ${base})`);

  const crawl = path.join(__dirname, 'qa-link-crawl.mjs');
  const child = spawnSync(process.execPath, [crawl], {
    stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_BASE_URL: base },
  });
  process.exit(child.status ?? 1);
}

main();

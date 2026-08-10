#!/usr/bin/env node
/**
 * Deploy to Vercel production, wait for the live site, then notify IndexNow.
 *
 * Usage: npm run deploy:prod
 */
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const BASE = 'https://psrtrain.com';

async function waitForProduction(maxMs = 300_000) {
  const deadline = Date.now() + maxMs;
  console.log(`Waiting for ${BASE} to serve the new deployment…`);

  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE}/sitemap.xml`, {
        headers: { 'User-Agent': 'deploy-prod-wait', 'Cache-Control': 'no-cache' },
      });
      if (res.ok) {
        console.log('Production sitemap is reachable.');
        return;
      }
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }

  throw new Error(`Production not reachable at ${BASE} within ${maxMs / 1000}s`);
}

console.log('Deploying to Vercel production…');
execSync('npx vercel --prod --yes', { stdio: 'inherit', cwd: ROOT });

await waitForProduction();
await import('./submit-indexnow.mjs');

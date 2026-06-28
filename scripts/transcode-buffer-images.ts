#!/usr/bin/env npx tsx
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createPsaBufferAdapter } from '@/lib/buffer/site-adapter';
import { ensureCompliantPostImage } from '@robertcashman/buffer-engine';

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

async function main() {
  const adapter = createPsaBufferAdapter();
  const posts = await Promise.resolve(adapter.getSchedulablePosts());
  let ok = 0;
  const fails: string[] = [];
  for (const p of posts) {
    const r = await ensureCompliantPostImage({
      siteId: adapter.siteId,
      siteUrl: adapter.siteUrl,
      slug: p.slug,
      sourceImageUrl: p.imageUrl,
      publicDir: resolve(process.cwd(), 'public'),
    });
    if (r) ok++;
    else fails.push(p.slug);
  }
  console.log(JSON.stringify({ total: posts.length, ok, fail: fails.length, fails: fails.slice(0, 15) }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

#!/usr/bin/env node
/**
 * Apply hand-reviewed distractor rewrites from scripts/data/weak-distractor-fixes.json
 * to the Supabase `questions` table. Removes weak absolute language
 * (always/never/illegal/refuse completely) from flagged options while keeping
 * each rewritten option a plausible-but-wrong distractor.
 *
 * Idempotent: only writes when the stored option text differs.
 *
 * Usage:
 *   node scripts/fix-weak-distractors.mjs           # apply
 *   node scripts/fix-weak-distractors.mjs --dry-run # preview only
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (from .env.local).
 */
import { readFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

const DRY_RUN = process.argv.includes('--dry-run');

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !key) {
  console.error('FAIL: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const fixes = JSON.parse(
  readFileSync(join(__dirname, 'data', 'weak-distractor-fixes.json'), 'utf8'),
);
delete fixes._comment;

const supabase = createClient(url, key, { auth: { persistSession: false } });

/** Apply a {key: text} patch onto either object-form or array-form options. */
function applyPatch(options, patch) {
  if (Array.isArray(options)) {
    return options.map((opt) => {
      const k = opt.id ?? opt.key;
      return k != null && patch[k] != null ? { ...opt, text: patch[k] } : opt;
    });
  }
  const next = { ...options };
  for (const [k, v] of Object.entries(patch)) {
    if (k in next) next[k] = v;
  }
  return next;
}

const ids = Object.keys(fixes);
const { data, error } = await supabase
  .from('questions')
  .select('id, options')
  .in('id', ids);

if (error) {
  console.error('FAIL: fetch questions', error);
  process.exit(1);
}

let updated = 0;
let unchanged = 0;
const missing = new Set(ids);

for (const row of data) {
  missing.delete(row.id);
  const patch = fixes[row.id];
  const nextOptions = applyPatch(row.options, patch);
  if (JSON.stringify(nextOptions) === JSON.stringify(row.options)) {
    unchanged += 1;
    continue;
  }
  if (DRY_RUN) {
    console.log(`[dry-run] ${row.id}\n  before: ${JSON.stringify(row.options)}\n  after:  ${JSON.stringify(nextOptions)}`);
    updated += 1;
    continue;
  }
  const { error: upErr } = await supabase
    .from('questions')
    .update({ options: nextOptions })
    .eq('id', row.id);
  if (upErr) {
    console.error(`FAIL: update ${row.id}`, upErr);
    process.exit(1);
  }
  updated += 1;
  console.log(`updated ${row.id}`);
}

for (const id of missing) console.warn(`WARN: question ${id} not found`);

console.log(`\nDone. updated=${updated} unchanged=${unchanged} missing=${missing.size}${DRY_RUN ? ' (dry-run)' : ''}`);

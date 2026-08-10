#!/usr/bin/env node
/**
 * Apply exact-text rewrites from scripts/data/weak-distractor-rewrites.json to
 * the Supabase `questions` table, removing weak absolute distractor language
 * (always/never/illegal) DB-wide while preserving each option's truth value.
 *
 * Handles both option shapes:
 *   - object form  { "A": "...", "B": "..." }
 *   - array form   [ { "id": "a", "text": "..." }, ... ]
 * and rewrites question_text (stems) too.
 *
 * Idempotent: only writes rows whose options/stem actually change.
 *
 * Usage:
 *   node scripts/apply-weak-distractor-rewrites.mjs            # apply
 *   node scripts/apply-weak-distractor-rewrites.mjs --dry-run  # preview only
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
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

const map = JSON.parse(readFileSync(join(__dirname, 'data', 'weak-distractor-rewrites.json'), 'utf8'));
const optionMap = map.options ?? {};
const stemMap = map.stems ?? {};

const supabase = createClient(url, key, { auth: { persistSession: false } });

function rewriteOptions(options) {
  if (Array.isArray(options)) {
    return options.map((o) =>
      typeof o?.text === 'string' && optionMap[o.text] ? { ...o, text: optionMap[o.text] } : o,
    );
  }
  if (options && typeof options === 'object') {
    const next = {};
    for (const [k, v] of Object.entries(options)) {
      next[k] = typeof v === 'string' && optionMap[v] ? optionMap[v] : v;
    }
    return next;
  }
  return options;
}

async function fetchAllApproved() {
  const out = [];
  const page = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('questions')
      .select('id, question_text, options')
      .eq('status', 'approved')
      .order('created_at', { ascending: true })
      .range(from, from + page - 1);
    if (error) throw error;
    out.push(...data);
    if (data.length < page) break;
    from += page;
  }
  return out;
}

const rows = await fetchAllApproved();
let updated = 0;
let unchanged = 0;

for (const row of rows) {
  const nextOptions = rewriteOptions(row.options);
  const nextStem = stemMap[row.question_text] ?? row.question_text;
  const optionsChanged = JSON.stringify(nextOptions) !== JSON.stringify(row.options);
  const stemChanged = nextStem !== row.question_text;
  if (!optionsChanged && !stemChanged) {
    unchanged += 1;
    continue;
  }
  if (DRY_RUN) {
    updated += 1;
    console.log(`[dry-run] ${row.id}${stemChanged ? ' (stem)' : ''}${optionsChanged ? ' (options)' : ''}`);
    continue;
  }
  const patch = {};
  if (optionsChanged) patch.options = nextOptions;
  if (stemChanged) patch.question_text = nextStem;
  const { error } = await supabase.from('questions').update(patch).eq('id', row.id);
  if (error) {
    console.error(`FAIL: update ${row.id}`, error);
    process.exit(1);
  }
  updated += 1;
}

console.log(`\nDone. updated=${updated} unchanged=${unchanged}${DRY_RUN ? ' (dry-run)' : ''}`);

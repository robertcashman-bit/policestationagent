#!/usr/bin/env node
/**
 * DB-backed audit: fail if any approved question uses weak absolute distractor
 * language (always/never/illegal/refuse completely) in its options or stem.
 *
 * Mirrors the WEAK_DISTRACTOR rule in lib/editorial-audit/rules.ts so the same
 * standard can be enforced on demand outside the rotating editorial-audit cron.
 *
 * Usage:
 *   node scripts/audit/mcq-distractors.mjs            # audit all approved
 *   node scripts/audit/mcq-distractors.mjs --ids a,b  # audit specific ids
 *
 * Skips gracefully (exit 0) when Supabase env is not configured, so it is safe
 * to wire into local workflows without breaking CI that lacks DB access.
 */
import { resolve } from 'node:path';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });
dotenv.config({ path: resolve(process.cwd(), '.env') });

const WEAK_DISTRACTOR = /\b(always|never|illegal|refuse completely)\b/i;

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !key) {
  console.log('SKIP: Supabase env not configured (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).');
  process.exit(0);
}

const idsArg = process.argv.find((a) => a.startsWith('--ids='));
const onlyIds = idsArg ? idsArg.slice('--ids='.length).split(',').map((s) => s.trim()).filter(Boolean) : null;

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function fetchAll() {
  if (onlyIds) {
    const { data, error } = await supabase
      .from('questions')
      .select('id, question_text, options, status')
      .in('id', onlyIds);
    if (error) throw error;
    return data;
  }
  const out = [];
  const page = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from('questions')
      .select('id, question_text, options, status')
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

const rows = await fetchAll();
const flagged = rows.filter(
  (q) => WEAK_DISTRACTOR.test(JSON.stringify(q.options ?? {})) || WEAK_DISTRACTOR.test(q.question_text ?? ''),
);

if (flagged.length) {
  console.error(`MCQ weak-distractor audit FAILED — ${flagged.length} of ${rows.length} question(s):`);
  for (const q of flagged) console.error(`  - ${q.id}`);
  process.exit(1);
}

console.log(`MCQ weak-distractor audit OK — ${rows.length} question(s) checked.`);

/**
 * Emits INSERT statements for public.cit_scenarios from scripts/cit-scenarios.mjs.
 * Idempotent via ON CONFLICT (slug) DO UPDATE.
 *
 * Usage: node scripts/build-cit-scenarios-sql.mjs > scripts/_generated_cit_scenarios.sql
 */
import path from 'path';
import { pathToFileURL } from 'url';
import { citScenarios } from './cit-scenarios.mjs';

function escSql(s) {
  return String(s).replace(/'/g, "''");
}

function arrayLit(arr) {
  if (!arr || arr.length === 0) return `ARRAY[]::text[]`;
  return `ARRAY[${arr.map((v) => `'${escSql(v)}'`).join(', ')}]::text[]`;
}

function emit(scn) {
  const branches = JSON.stringify(scn.branches);
  return [
    `INSERT INTO public.cit_scenarios (slug, title, category, difficulty, syllabus_refs, setup, branches, learning_points, source_refs, status)`,
    `VALUES (`,
    `  '${escSql(scn.slug)}',`,
    `  '${escSql(scn.title)}',`,
    `  '${escSql(scn.category)}',`,
    `  '${escSql(scn.difficulty)}',`,
    `  ${arrayLit(scn.syllabus_refs)},`,
    `  '${escSql(scn.setup)}',`,
    `  '${escSql(branches)}'::jsonb,`,
    `  ${arrayLit(scn.learning_points)},`,
    `  ${arrayLit(scn.source_refs)},`,
    `  'approved'`,
    `)`,
    `ON CONFLICT (slug) DO UPDATE SET`,
    `  title = EXCLUDED.title,`,
    `  category = EXCLUDED.category,`,
    `  difficulty = EXCLUDED.difficulty,`,
    `  syllabus_refs = EXCLUDED.syllabus_refs,`,
    `  setup = EXCLUDED.setup,`,
    `  branches = EXCLUDED.branches,`,
    `  learning_points = EXCLUDED.learning_points,`,
    `  source_refs = EXCLUDED.source_refs,`,
    `  status = EXCLUDED.status,`,
    `  updated_at = now();`,
    ``,
  ].join('\n');
}

function main() {
  const all = citScenarios();
  console.log('-- Generated CIT scenario seed');
  console.log(`-- Total scenarios: ${all.length}`);
  console.log('');
  for (const s of all) {
    console.log(emit(s));
  }
}

const entry = process.argv[1] ? path.resolve(process.argv[1]) : '';
const isMain = entry && pathToFileURL(entry).href === import.meta.url;
if (isMain) main();

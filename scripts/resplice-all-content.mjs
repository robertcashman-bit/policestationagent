/**
 * Replaces the generated question bank section inside ALL_CONTENT_COMBINED.sql
 * and ensures the syllabus modules SQL is included before it.
 * Avoids PowerShell encoding issues by writing UTF-8 from Node directly.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const combinedPath = path.join(root, 'scripts', 'ALL_CONTENT_COMBINED.sql');
const genPath = path.join(root, 'scripts', '_generated_questions.sql');
const syllabusModulesPath = path.join(root, 'scripts', 'psr-syllabus-modules.sql');
const citPath = path.join(root, 'scripts', '_generated_cit_scenarios.sql');

const combined = fs.readFileSync(combinedPath, 'utf8');
const generated = fs.readFileSync(genPath, 'utf8');
const syllabusModules = fs.readFileSync(syllabusModulesPath, 'utf8');
const citSeed = fs.existsSync(citPath) ? fs.readFileSync(citPath, 'utf8') : '';

const questionsStartToken = '-- FILE: psr-questions-hardened';
const syllabusModulesStartToken = '-- FILE: psr-syllabus-modules';
const verifyToken = '-- VERIFICATION QUERIES';

const verifyIdx = combined.indexOf(verifyToken);
if (verifyIdx === -1) {
  console.error('Could not find VERIFICATION marker in ALL_CONTENT_COMBINED.sql');
  process.exit(1);
}

// Locate the start of the syllabus modules section (preferred) or fall back
// to the questions section banner. We always rewrite from there to verifyIdx.
let startIdx = combined.indexOf(syllabusModulesStartToken);
if (startIdx === -1) startIdx = combined.indexOf(questionsStartToken);
if (startIdx === -1) {
  console.error('Could not find any splice marker in ALL_CONTENT_COMBINED.sql');
  process.exit(1);
}

const bannerStart = combined.lastIndexOf(
  '-- =====================================================',
  startIdx,
);
const prefix = combined.slice(0, bannerStart).trimEnd();
const suffix = combined.slice(verifyIdx);

const modulesHeader = [
  '',
  '-- =====================================================',
  '-- FILE: psr-syllabus-modules (handcrafted - SRA PSRAS alignment)',
  '-- Source: scripts/psr-syllabus-modules.sql',
  '-- Idempotent (UPDATE existing + INSERT ... ON CONFLICT DO UPDATE).',
  '-- =====================================================',
  '',
].join('\n');

const questionsHeader = [
  '',
  '-- =====================================================',
  '-- FILE: psr-questions-hardened (generated - rebuild: npm run generate:questions-sql)',
  '-- Source: scripts/build-all-questions-sql.mjs + scripts/psr-handcrafted-questions.mjs',
  '-- Re-applying these INSERTs duplicates rows unless you remove existing questions first',
  '-- (e.g. scoped DELETE for training env, or TRUNCATE on a fresh database).',
  '-- =====================================================',
  '',
].join('\n');

const citHeader = [
  '',
  '-- =====================================================',
  '-- FILE: cit-scenarios-seed (generated - rebuild: npm run generate:questions-sql)',
  '-- Source: scripts/build-cit-scenarios-sql.mjs + scripts/cit-scenarios.mjs',
  '-- Idempotent: ON CONFLICT (slug) DO UPDATE.',
  '-- =====================================================',
  '',
].join('\n');

const out = [
  prefix,
  modulesHeader,
  syllabusModules.trimEnd(),
  '',
  questionsHeader,
  generated.trimEnd(),
  '',
  ...(citSeed
    ? [citHeader, citSeed.trimEnd(), '']
    : []),
  suffix,
].join('\n');

fs.writeFileSync(combinedPath, out, 'utf8');
console.log('Updated', combinedPath);

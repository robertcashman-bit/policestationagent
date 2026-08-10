/**
 * Fails the build if prohibited public-facing copy appears in source files.
 * Run: npm run copy:audit
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

const SCAN_DIRS = ['app', 'components', 'lib'];
const SCAN_EXTENSIONS = new Set(['.tsx', '.ts', '.mdx', '.md']);

const EXCLUDE_PATH_PARTS = [
  'scripts/',
  'tests/e2e/critical-incidents',
  'node_modules',
  'audit-public-copy.ts',
  'legalCopy.ts',
  'editorial-audit/prohibited.ts',
];

const PROHIBITED: { pattern: RegExp; label: string }[] = [
  { pattern: /0300\s*300\s*3877/i, label: '0300 300 3877' },
  { pattern: /call the DSCC/i, label: 'call the DSCC' },
  { pattern: /call the Defence Solicitor Call Centre/i, label: 'call the Defence Solicitor Call Centre' },
  { pattern: /Pass PSRAS with Confidence/i, label: 'Pass PSRAS with Confidence' },
  { pattern: /PSRAS-ready/i, label: 'PSRAS-ready' },
  { pattern: /guaranteed pass/i, label: 'guaranteed pass' },
  { pattern: /comprehensive, accurate/i, label: 'comprehensive, accurate' },
  { pattern: /accurate, up-to-date/i, label: 'accurate, up-to-date' },
  {
    pattern: /full company details are available on request/i,
    label: 'full company details are available on request',
  },
  { pattern: /typically within 36 hours/i, label: 'typically within 36 hours' },
  { pattern: /warrant for your arrest/i, label: 'warrant for your arrest' },
];

function shouldScan(filePath: string): boolean {
  const rel = relative(ROOT, filePath).replace(/\\/g, '/');
  if (!SCAN_EXTENSIONS.has(rel.slice(rel.lastIndexOf('.')))) return false;
  return !EXCLUDE_PATH_PARTS.some(part => rel.includes(part));
}

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(ROOT, full).replace(/\\/g, '/');
    if (EXCLUDE_PATH_PARTS.some(part => rel.includes(part))) continue;
    const st = statSync(full);
    if (st.isDirectory()) walk(full, files);
    else if (shouldScan(full)) files.push(full);
  }
  return files;
}

type Hit = { file: string; line: number; label: string; text: string };

const hits: Hit[] = [];

for (const dir of SCAN_DIRS) {
  const abs = join(ROOT, dir);
  try {
    for (const file of walk(abs)) {
      const content = readFileSync(file, 'utf8');
      const lines = content.split(/\r?\n/);
      for (const { pattern, label } of PROHIBITED) {
        lines.forEach((text, i) => {
          if (pattern.test(text)) {
            hits.push({
              file: relative(ROOT, file).replace(/\\/g, '/'),
              line: i + 1,
              label,
              text: text.trim(),
            });
          }
        });
      }
    }
  } catch {
    // directory may not exist
  }
}

if (hits.length > 0) {
  console.error('Prohibited public copy found:\n');
  for (const h of hits) {
    console.error(`  ${h.file}:${h.line}  [${h.label}]`);
    console.error(`    ${h.text}\n`);
  }
  process.exit(1);
}

console.log('copy:audit — no prohibited phrases found.');

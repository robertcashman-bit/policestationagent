#!/usr/bin/env node
/**
 * Copy lib/firm-outreach from policestationagent (canonical) to Policestationrepuk.
 * Run after fixing outreach bugs in PSA so both sites stay aligned until a shared
 * package exists.
 *
 * Usage:
 *   node scripts/sync-firm-outreach-to-repuk.mjs           # dry-run (default)
 *   node scripts/sync-firm-outreach-to-repuk.mjs --apply   # copy files
 *
 * Env:
 *   REPUK_ROOT  — path to Policestationrepuk repo (default: ../Policestationrepuk)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PSA_ROOT = path.resolve(__dirname, '..');
const REPUK_ROOT = path.resolve(
  process.env.REPUK_ROOT || path.join(PSA_ROOT, '..', 'Policestationrepuk'),
);
const SRC = path.join(PSA_ROOT, 'lib', 'firm-outreach');
const DEST = path.join(REPUK_ROOT, 'lib', 'firm-outreach');
const APPLY = process.argv.includes('--apply');

function listFiles(dir, base = dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      out.push(...listFiles(full, base));
    } else {
      out.push(path.relative(base, full));
    }
  }
  return out.sort();
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Source missing: ${SRC}`);
    process.exit(1);
  }
  if (!fs.existsSync(REPUK_ROOT)) {
    console.error(`RepUK repo not found: ${REPUK_ROOT} (set REPUK_ROOT)`);
    process.exit(1);
  }

  const files = listFiles(SRC);
  let changed = 0;

  for (const rel of files) {
    const from = path.join(SRC, rel);
    const to = path.join(DEST, rel);
    const srcBuf = fs.readFileSync(from);
    const destExists = fs.existsSync(to);
    const destBuf = destExists ? fs.readFileSync(to) : null;

    if (destBuf && srcBuf.equals(destBuf)) continue;

    changed += 1;
    console.log(`${destExists ? 'update' : 'add'}: lib/firm-outreach/${rel}`);

    if (APPLY) {
      fs.mkdirSync(path.dirname(to), { recursive: true });
      fs.copyFileSync(from, to);
    }
  }

  if (changed === 0) {
    console.log('Already in sync.');
    return;
  }

  console.log(
    APPLY
      ? `\nCopied ${changed} file(s) to ${DEST}. Review diff in RepUK and commit.`
      : `\n${changed} file(s) would change. Re-run with --apply to copy.`,
  );
}

main();

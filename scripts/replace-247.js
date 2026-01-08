/**
 * Replace "24/7" marketing phrasing with "extended hours".
 *
 * Scope:
 * - app (recursive) .ts/.tsx files
 * - components (recursive) .ts/.tsx files
 *
 * Notes:
 * - Does NOT touch "24hr"/"24 hour" phrasing (often factual custody info).
 * - Applies a few context-aware rewrites first, then a final generic 24/7 -> extended hours.
 */

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const ROOT = path.join(__dirname, "..");
const TARGET_DIRS = [path.join(ROOT, "app"), path.join(ROOT, "components")];

function transform(text) {
  let t = text;

  // Context-aware rewrites (avoid awkward grammar)
  t = t.replace(/FREE Legal Advice 24\/7/g, "FREE Legal Advice (extended hours)");
  t = t.replace(/Call 24\/7/g, "Call during extended hours");
  t = t.replace(/Available 24\/7/g, "Available during extended hours");
  t = t.replace(/available 24\/7/g, "available during extended hours");

  // Generic fallback
  t = t.replace(/24\/7/g, "extended hours");

  return t;
}

function main() {
  const files = [];
  for (const dir of TARGET_DIRS) {
    files.push(...globSync("**/*.{ts,tsx}", { cwd: dir, absolute: true, nodir: true }));
  }

  let changed = 0;

  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");
    const after = transform(before);
    if (after !== before) {
      fs.writeFileSync(file, after, "utf8");
      changed += 1;
    }
  }

  console.log(`Rewrote 24/7 phrasing in ${changed} file(s).`);
}

if (require.main === module) {
  main();
}

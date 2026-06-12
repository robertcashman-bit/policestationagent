#!/usr/bin/env node
/** List app pages missing description or openGraph.description in metadata exports. */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const appDir = path.join(__dirname, "..", "app");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

const missing = [];

for (const file of walk(appDir)) {
  const src = fs.readFileSync(file, "utf8");
  if (!src.includes("export const metadata") && !src.includes("export async function generateMetadata")) {
    missing.push({ file: path.relative(appDir, file), issue: "no metadata export" });
    continue;
  }
  if (!/description\s*:/.test(src)) {
    missing.push({ file: path.relative(appDir, file), issue: "no description" });
  } else if (!/openGraph[\s\S]*description\s*:/.test(src) && !src.includes("generateMetadata")) {
    missing.push({ file: path.relative(appDir, file), issue: "no openGraph.description" });
  }
}

console.log(JSON.stringify(missing, null, 2));
console.log(`Total issues: ${missing.length}`);

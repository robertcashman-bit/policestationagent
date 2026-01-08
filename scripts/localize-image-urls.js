/**
 * Localize image URLs in app (TSX pages)
 *
 * After running scripts/download-images.js, pages may still reference remote images
 * (e.g. wixstatic / unsplash). This script rewrites those references to local
 * /images/<filename> paths when a matching filename exists in public/images.
 */

const fs = require("fs");
const path = require("path");
const { globSync } = require("glob");

const APP_DIR = path.join(__dirname, "..", "app");
const PUBLIC_IMAGES_DIR = path.join(__dirname, "..", "public", "images");

function getLocalImageFilenames() {
  if (!fs.existsSync(PUBLIC_IMAGES_DIR)) return new Set();
  return new Set(fs.readdirSync(PUBLIC_IMAGES_DIR));
}

function tryGetFilenameFromUrl(raw) {
  try {
    const url = new URL(raw);
    const filename = path.basename(url.pathname);
    return filename || null;
  } catch {
    return null;
  }
}

function localizeFile(filePath, knownFilenames) {
  const original = fs.readFileSync(filePath, "utf8");
  let updated = original;

  // Match URLs in common HTML contexts: src="...", url(...), etc.
  // Keep it simple: find http(s)://... sequences and rewrite exact matches.
  const urlMatches = original.match(/https?:\/\/[^\s"'()<>]+/g) || [];

  for (const rawUrl of urlMatches) {
    const filename = tryGetFilenameFromUrl(rawUrl);
    if (!filename) continue;
    if (!knownFilenames.has(filename)) continue;

    // Replace exact URL occurrences only (safe).
    const localPath = `/images/${filename}`;
    updated = updated.split(rawUrl).join(localPath);
  }

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, "utf8");
    return true;
  }
  return false;
}

function main() {
  const knownFilenames = getLocalImageFilenames();
  if (knownFilenames.size === 0) {
    console.log("No local images found in public/images. Run scripts/download-images.js first.");
    process.exit(1);
  }

  const files = globSync("**/*.tsx", { cwd: APP_DIR, absolute: true, nodir: true });
  let changed = 0;

  for (const filePath of files) {
    const didChange = localizeFile(filePath, knownFilenames);
    if (didChange) changed++;
  }

  console.log(`Localized image URLs in ${changed} file(s).`);
}

if (require.main === module) {
  main();
}

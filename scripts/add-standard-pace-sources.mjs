#!/usr/bin/env node
/** Add StandardPaceSources to scraped pages that cite PACE without verified sources. */
import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const OFFICIAL = /gov\.uk|legislation\.gov\.uk|cps\.gov\.uk|bailii\.org/i;
const hasPaceRefs = (c) =>
  /\bPACE\b|\bCode C\b|\bsection \d+[A-Za-z]?\b|\bparagraph \d+[\d.A-Za-z]*\b/i.test(c);

const IMPORT_LINE =
  'import { StandardPaceSources } from "@/components/legal/StandardPaceSources";';
const COMPONENT_BLOCK = `
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <StandardPaceSources />
        </div>`;

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "admin" || entry.name === "api") continue;
      walk(full, acc);
    } else if (entry.name === "page.tsx") {
      acc.push(full);
    }
  }
  return acc;
}

let updated = 0;
for (const filePath of walk(path.join(ROOT, "app"))) {
  let content = fs.readFileSync(filePath, "utf-8");
  if (!hasPaceRefs(content)) continue;
  if (/StandardPaceSources|LegalReferences/i.test(content)) continue;
  if (!/dangerouslySetInnerHTML/i.test(content)) continue;
  if (OFFICIAL.test(content)) continue;

  if (!content.includes(IMPORT_LINE)) {
    const lastImport = content.lastIndexOf('\nimport ');
    const lineEnd = content.indexOf("\n", lastImport + 1);
    content = content.slice(0, lineEnd + 1) + IMPORT_LINE + "\n" + content.slice(lineEnd + 1);
  }

  if (content.includes("<StandardPaceSources")) continue;

  if (content.includes("</main>")) {
    content = content.replace("</main>", `${COMPONENT_BLOCK}\n      </main>`);
  } else if (content.includes("<Footer")) {
    content = content.replace("<Footer", `${COMPONENT_BLOCK}\n      <Footer`);
  } else {
    continue;
  }

  fs.writeFileSync(filePath, content);
  updated++;
  console.log("Added StandardPaceSources:", path.relative(ROOT, filePath));
}

console.log(`Done. Updated ${updated} pages.`);

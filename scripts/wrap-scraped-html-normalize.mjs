#!/usr/bin/env node
/** Wrap raw __html: `...` with normalizeScrapedHtml() where missing. */
import fs from "fs";
import path from "path";

const APP = path.join(process.cwd(), "app");
let fixed = 0;

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory() && ent.name !== "api") walk(p, out);
    else if (ent.name === "page.tsx") out.push(p);
  }
  return out;
}

for (const fp of walk(APP)) {
  let src = fs.readFileSync(fp, "utf-8");
  if (!src.includes("dangerouslySetInnerHTML")) continue;
  if (src.includes("normalizeScrapedHtml")) continue;
  if (!src.includes("__html:")) continue;

  if (!src.includes('from "@/lib/scraped-html"')) {
    const importLine = 'import { normalizeScrapedHtml } from "@/lib/scraped-html";\n';
    if (src.includes('from "@/components/Header"')) {
      src = src.replace(
        /import Header from "@\/components\/Header";/,
        `import Header from "@/components/Header";\n${importLine}`,
      );
    } else {
      src = importLine + src;
    }
  }

  if (src.includes("__html: fixStationAddresses(`")) {
    src = src.replace(/__html:\s*fixStationAddresses\(\s*`/g, "__html: normalizeScrapedHtml(fixStationAddresses(`");
    src = src.replace(/fixStationAddresses\(`([\s\S]*?)`\s*\)/g, (m, inner) => {
      if (m.includes("normalizeScrapedHtml(fixStationAddresses(")) {
        return m.replace("fixStationAddresses(`", "normalizeScrapedHtml(fixStationAddresses(`").replace(/\`\s*\)$/, "`)");
      }
      return m;
    });
  }

  src = src.replace(/__html:\s*`/g, "__html: normalizeScrapedHtml(`");
  src = src.replace(/normalizeScrapedHtml\(normalizeScrapedHtml\(/g, "normalizeScrapedHtml(");

  fs.writeFileSync(fp, src);
  fixed++;
}

console.log(`Wrapped normalizeScrapedHtml on ${fixed} pages.`);

#!/usr/bin/env node
/**
 * Refactors standard scraped HTML blob pages to use ScrapedHtmlPage.
 * Skips pages with mixed React content (Script, schema, InternalLinkHub, etc.).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const appDir = path.join(root, "app");

const SKIP_MARKERS = [
  "InternalLinkHub",
  "PersonSchema",
  "FAQPage",
  "BreadcrumbList",
  "JsonLd",
  "LegalReferences",
  "localBusinessSchema",
  "useLegacy",
  "BlogCarousel",
  "ContactForm",
  "<Link ",
  "<section",
  "generateMetadata",
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name === "page.tsx") files.push(full);
  }
  return files;
}

function extractMetadata(source) {
  const match = source.match(/export const metadata[^=]*=\s*(\{[\s\S]*?\n\};)/);
  return match ? match[1] : null;
}

function extractHtmlLiteral(source) {
  const fixMatch = source.match(/__html:\s*fixStationAddresses\(\s*`([\s\S]*?)`\s*\)/);
  if (fixMatch) {
    return { html: fixMatch[1], preprocess: "fixStationAddresses" };
  }
  const directMatch = source.match(/__html:\s*`([\s\S]*?)`\s*,?\s*\n\s*\}\}/);
  if (directMatch) {
    return { html: directMatch[1], preprocess: null };
  }
  return null;
}

function isSimpleBlobPage(source) {
  if (!source.includes("dangerouslySetInnerHTML")) return false;
  if (SKIP_MARKERS.some((m) => source.includes(m))) return false;
  if ((source.match(/dangerouslySetInnerHTML/g) || []).length > 1) return false;
  if (!source.includes('import Header from "@/components/Header"')) return false;
  if (!source.includes('import Footer from "@/components/Footer"')) return false;
  return true;
}

function escapeForTemplateLiteral(str) {
  return str.replaceAll("\\", "\\\\").replaceAll("`", "\\`").replaceAll("${", "\\${");
}

function buildPage(relativePath, metadataBlock, html, preprocess) {
  const constName = "PAGE_HTML";
  const imports = [
    'import ScrapedHtmlPage from "@/components/ScrapedHtmlPage";',
    'import type { Metadata } from "next";',
  ];

  if (preprocess === "fixStationAddresses") {
    imports.push("");
    imports.push("function fixStationAddresses(html: string) {");
    imports.push('  return html.replaceAll("Park Place, Dover", "Ladywell, Dover CT16 1DJ");');
    imports.push("}");
  }

  const metadataExport = metadataBlock
    ? `export const metadata: Metadata = ${metadataBlock.replace(/^(\{)/, "$1")}`
    : "";

  const preprocessProp = preprocess
    ? `\n      preprocess={${preprocess}}`
    : "";

  return `${imports.join("\n")}
${metadataExport ? "\n" + metadataExport + "\n" : ""}
const ${constName} = \`${escapeForTemplateLiteral(html)}\`;

export default function Page() {
  return <ScrapedHtmlPage html={${constName}}${preprocessProp} />;
}
`;
}

function wrapWithNormalize(source) {
  if (source.includes("normalizeScrapedHtml")) return source;
  let out = source;
  if (!out.includes('@/lib/scraped-html')) {
    out = out.replace(
      /(import[^\n]+\n)/,
      '$1import { normalizeScrapedHtml } from "@/lib/scraped-html";\n',
    );
  }
  if (out.includes("__html: fixStationAddresses(") && !out.includes("normalizeScrapedHtml(fixStationAddresses(")) {
    out = out.replace(
      /__html:\s*fixStationAddresses\(\s*`/g,
      "__html: normalizeScrapedHtml(fixStationAddresses(`",
    );
    out = out.replace(
      /`\s*\)\s*,?\s*\n(\s*)\}\}/g,
      (m, indent) => {
        if (m.includes("fixStationAddresses")) {
          return "`)),\n" + indent + "}}\n";
        }
        return m;
      },
    );
  }
  if (!out.includes("normalizeScrapedHtml(`")) {
    out = out.replace(/__html:\s*`/g, "__html: normalizeScrapedHtml(`");
    out = out.replace(/`\s*,?\s*\n(\s*)\}\}/g, (m, indent) => {
      if (out.indexOf("normalizeScrapedHtml(`") !== -1) {
        return "`),\n" + indent + "}}\n";
      }
      return m;
    });
  }
  return out;
}

let converted = 0;
let wrapped = 0;
let skipped = 0;

for (const file of walk(appDir)) {
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes("dangerouslySetInnerHTML")) continue;

  if (isSimpleBlobPage(source)) {
    const extracted = extractHtmlLiteral(source);
    if (!extracted) {
      skipped++;
      continue;
    }
    const metadataBlock = extractMetadata(source);
    const rel = path.relative(root, file);
    const newSource = buildPage(rel, metadataBlock, extracted.html, extracted.preprocess);
    fs.writeFileSync(file, newSource);
    converted++;
    console.log("converted:", rel);
  } else {
    const wrappedSource = wrapWithNormalize(source);
    if (wrappedSource !== source) {
      fs.writeFileSync(file, wrappedSource);
      wrapped++;
      console.log("wrapped:", path.relative(root, file));
    } else {
      skipped++;
    }
  }
}

console.log(`Done: ${converted} converted, ${wrapped} wrapped, ${skipped} skipped`);

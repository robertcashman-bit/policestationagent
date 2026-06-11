#!/usr/bin/env npx tsx
/**
 * Generate full-colour A4 PDF brochure for Kent firm outreach emails.
 * Usage: npm run firm-outreach:brochure
 */
import { mkdirSync } from "fs";
import { resolve } from "path";
import puppeteer from "puppeteer";
import { buildBrochureHtml } from "@/lib/firm-outreach/brochure/template.html";

const outDir = resolve(process.cwd(), "public/outreach");
const outPath = resolve(outDir, "police-station-agent-kent-brochure.pdf");
const previewPath = resolve(outDir, "brochure-preview.png");

async function main() {
  mkdirSync(outDir, { recursive: true });
  const html = buildBrochureHtml();

  const chromePaths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean) as string[];

  let browser;
  let lastErr: unknown;
  for (const executablePath of chromePaths) {
    try {
      browser = await puppeteer.launch({
        headless: true,
        executablePath,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      break;
    } catch (err) {
      lastErr = err;
    }
  }
  if (!browser) throw lastErr ?? new Error("Could not launch Chrome for PDF generation");

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0", timeout: 60_000 });

    await page.pdf({
      path: outPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
    });

    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 2 });
    await page.screenshot({
      path: previewPath,
      fullPage: true,
      type: "png",
    });

    console.log("✅ Brochure PDF:", outPath);
    console.log("✅ Preview PNG:", previewPath);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

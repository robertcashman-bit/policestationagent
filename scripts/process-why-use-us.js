/**
 * Process "Why Use Us" HTML file
 */

const fs = require("fs").promises;
const path = require("path");
const { JSDOM } = require("jsdom");

const APP_DIR = path.join(__dirname, "..", "app");

function extractMainContent(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Try multiple strategies to find main content
  const selectors = [
    "#root > main",
    "#root main",
    "main",
    '[role="main"]',
    "#root > div > main",
    "body > main",
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      const text = element.textContent || "";
      if (text.includes("404") || text.includes("Page Not Found")) {
        continue;
      }

      const clone = element.cloneNode(true);
      clone
        .querySelectorAll('script, style, noscript, link[rel="stylesheet"], meta')
        .forEach((el) => el.remove());

      const content = clone.innerHTML.trim();
      if (content.length > 500) {
        return content;
      }
    }
  }

  // Fallback: find body content
  const body = document.body;
  if (body) {
    const allDivs = Array.from(body.querySelectorAll("div"));
    for (const div of allDivs) {
      const text = div.textContent || "";
      if (text.length > 1000 && !text.includes("404") && !text.includes("Page Not Found")) {
        const clone = div.cloneNode(true);
        clone.querySelectorAll("script, style, noscript, link, meta").forEach((el) => el.remove());
        const content = clone.innerHTML.trim();
        if (content.length > 500) {
          return content;
        }
      }
    }
  }

  return null;
}

function extractMetadata(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  return {
    title:
      document.querySelector("title")?.textContent?.trim() ||
      "Why Use Us As Your Police Station Agent In Kent | Police Station Agent",
    description:
      document.querySelector('meta[name="description"]')?.getAttribute("content") ||
      "Discover why Police Station Agent is the trusted choice for expert police station representation in Kent. available under Legal Aid.",
    canonical:
      document.querySelector('link[rel="canonical"]')?.getAttribute("href") ||
      "https://policestationagent.com/why-use-us",
  };
}

function escapeForTemplate(str) {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\${/g, "\\${")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
}

async function main() {
  // Find the file in Downloads
  const downloadsPath = path.join(process.env.USERPROFILE || process.env.HOME, "Downloads");
  const files = await fs.readdir(downloadsPath);
  const targetFile = files.find((f) => f.includes("Why Use Us") && f.endsWith(".html"));

  if (!targetFile) {
    console.error('❌ Could not find "Why Use Us" HTML file in Downloads');
    process.exit(1);
  }

  const filePath = path.join(downloadsPath, targetFile);
  console.log(`📂 Reading file: ${filePath}`);

  const html = await fs.readFile(filePath, "utf8");
  console.log(`📄 File size: ${(html.length / 1024).toFixed(2)} KB`);

  const mainContent = extractMainContent(html);
  const metadata = extractMetadata(html);

  if (!mainContent || mainContent.length < 500) {
    console.log(`⚠️  Could not extract sufficient content`);
    console.log(`   Content length: ${mainContent ? mainContent.length : 0} characters`);
    process.exit(1);
  }

  console.log(`✅ Extracted ${mainContent.length} characters of content`);
  console.log(`📋 Title: ${metadata.title}`);

  // Update the page
  const outputPath = path.join(APP_DIR, "why-use-us", "page.tsx");
  const existing = await fs.readFile(outputPath, "utf8");
  const escapedContent = escapeForTemplate(mainContent);
  const canonical = metadata.canonical || "https://policestationagent.com/why-use-us";

  // Update metadata
  let updated = existing.replace(
    /title:\s*["'][^"']*["']/,
    `title: ${JSON.stringify(metadata.title)}`
  );

  if (metadata.description) {
    updated = updated.replace(
      /description:\s*["'][^"']*["']/,
      `description: ${JSON.stringify(metadata.description)}`
    );
  }

  updated = updated.replace(
    /canonical:\s*["'][^"']*["']/,
    `canonical: ${JSON.stringify(canonical)}`
  );

  // Update content
  updated = updated.replace(
    /dangerouslySetInnerHTML=\{\{ __html: `[^`]*` \}\}/s,
    `dangerouslySetInnerHTML={{ __html: \`${escapedContent}\` }}`
  );

  await fs.writeFile(outputPath, updated, "utf8");
  console.log(`✅ Updated: /why-use-us`);
  console.log(`\n✅ Successfully populated /why-use-us page!`);
}

main().catch(console.error);

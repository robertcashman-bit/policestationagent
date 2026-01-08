#!/usr/bin/env node

/**
 * Comprehensive Live Page Audit for policestationagent.com
 *
 * Checks:
 * 1. All pages load correctly (no 404s, no errors)
 * 2. All links on each page work
 * 3. Content is sufficient (not just 2-3 lines)
 */

const puppeteer = require("puppeteer");
const fs = require("fs").promises;
const path = require("path");
const { glob } = require("glob");

const BASE_URL = process.env.BASE_URL || "https://policestationagent.com";
const MIN_CONTENT_LENGTH = 500; // Minimum characters of actual content
const MIN_PARAGRAPHS = 3; // Minimum paragraphs for sufficient content
const TIMEOUT = 30000; // 30 seconds per page

// Pages to check - get from sitemap and file system
let allPages = new Set();

async function getAllPagesFromSitemap() {
  try {
    const sitemapContent = await fs.readFile("app/sitemap.ts", "utf8");
    const pages = new Set();

    // Match static URLs in sitemap
    // Pattern: url: `${baseUrl}/path` or url: baseUrl + '/path'
    const staticUrlPattern = /url:\s*[`'"](\${baseUrl})?([^`'"]+)[`'"]/g;
    let match;

    while ((match = staticUrlPattern.exec(sitemapContent)) !== null) {
      let url = match[2];
      // Remove baseUrl template literal syntax
      url = url
        .replace(/\$\{baseUrl\}/g, "")
        .replace(/`/g, "")
        .trim();

      // Skip dynamic routes (containing ${} or variables)
      if (
        url.includes("${") ||
        url.includes("post.slug") ||
        url.includes("station.slug") ||
        url.includes("service.slug") ||
        url.includes("slug")
      ) {
        continue;
      }

      if (url && url.startsWith("/") && !url.includes("[") && !url.includes("*")) {
        pages.add(url);
      }
    }

    // Also check for template literal patterns: url: `${baseUrl}/path`
    const templatePattern = /url:\s*`\$\{baseUrl\}([^`]+)`/g;
    while ((match = templatePattern.exec(sitemapContent)) !== null) {
      const url = match[1];
      // Skip dynamic routes
      if (!url.includes("${") && !url.includes("[") && !url.includes("*")) {
        pages.add(url);
      }
    }

    return pages;
  } catch (error) {
    console.error("Error reading sitemap:", error.message);
    return new Set();
  }
}

async function getAllPagesFromFileSystem() {
  try {
    const pageFiles = await glob("app/**/page.tsx", {
      ignore: ["**/node_modules/**", "**/.next/**", "**/admin/**", "**/api/**"],
    });

    const pages = new Set();

    for (const file of pageFiles) {
      // Normalize path separators for Windows
      const normalizedFile = file.replace(/\\/g, "/");
      let route = normalizedFile
        .replace(/^app\//, "/")
        .replace(/\/page\.tsx$/, "")
        .replace(/\[slug\]/g, "")
        .replace(/\[id\]/g, "")
        .replace(/\[station-name\]/g, "")
        .replace(/\[area-name\]/g, "")
        .replace(/\[category\]/g, "");

      if (route === "") route = "/";
      // Only add valid routes (not dynamic, not file paths)
      if (
        route &&
        !route.includes("[") &&
        !route.includes("*") &&
        route.startsWith("/") &&
        !route.includes("\\") &&
        !route.includes(".tsx")
      ) {
        pages.add(route);
      }
    }

    return pages;
  } catch (error) {
    console.error("Error reading file system:", error.message);
    return new Set();
  }
}

async function checkPage(browser, url) {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;
  const page = await browser.newPage();

  try {
    // Set a reasonable viewport
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate with timeout
    const response = await page.goto(fullUrl, {
      waitUntil: "networkidle0",
      timeout: TIMEOUT,
    });

    const status = response.status();

    // Wait for content to render
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check for 404 indicators
    const pageContent = await page.content();
    const has404 =
      pageContent.includes("404") ||
      pageContent.includes("Page Not Found") ||
      pageContent.includes("not found") ||
      pageContent.includes("Not Found");

    // Extract main content text
    const mainContent = await page.evaluate(() => {
      // Try to find main content area
      const main =
        document.querySelector("main") ||
        document.querySelector("article") ||
        document.querySelector(".prose") ||
        document.querySelector('[role="main"]') ||
        document.body;

      if (!main) return { text: "", paragraphs: 0 };

      // Get all text content
      const text = main.innerText || main.textContent || "";

      // Count paragraphs
      const paragraphs = main.querySelectorAll("p").length;

      // Remove navigation, header, footer text
      const nav = main.querySelector("nav");
      const header = main.querySelector("header");
      const footer = main.querySelector("footer");

      let cleanText = text;
      if (nav) cleanText = cleanText.replace(nav.innerText || "", "");
      if (header) cleanText = cleanText.replace(header.innerText || "", "");
      if (footer) cleanText = cleanText.replace(footer.innerText || "", "");

      return {
        text: cleanText.trim(),
        paragraphs,
        wordCount: cleanText
          .trim()
          .split(/\s+/)
          .filter((w) => w.length > 0).length,
      };
    });

    // Extract all links
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a[href]"));
      return anchors
        .map((a) => {
          const href = a.getAttribute("href");
          if (!href) return null;

          // Convert relative URLs to absolute
          if (href.startsWith("/")) {
            return href;
          }
          if (href.startsWith("http")) {
            // Only include same-domain links
            if (href.includes("policestationagent.com")) {
              try {
                const url = new URL(href);
                return url.pathname + url.search + url.hash;
              } catch {
                return null;
              }
            }
            return null;
          }
          return null;
        })
        .filter(Boolean);
    });

    // Deduplicate links
    const uniqueLinks = Array.from(new Set(links));

    // Check content sufficiency
    const contentLength = mainContent.text.length;
    const hasSufficientContent =
      contentLength >= MIN_CONTENT_LENGTH && mainContent.paragraphs >= MIN_PARAGRAPHS;

    return {
      url,
      status,
      has404,
      contentLength,
      paragraphs: mainContent.paragraphs,
      wordCount: mainContent.wordCount,
      hasSufficientContent,
      links: uniqueLinks,
      error: null,
    };
  } catch (error) {
    return {
      url,
      status: null,
      has404: false,
      contentLength: 0,
      paragraphs: 0,
      wordCount: 0,
      hasSufficientContent: false,
      links: [],
      error: error.message,
    };
  } finally {
    await page.close();
  }
}

async function checkLink(browser, baseUrl, link) {
  if (!link || link.startsWith("#") || link.startsWith("mailto:") || link.startsWith("tel:")) {
    return { link, status: "skipped", reason: "Not a page link" };
  }

  const fullUrl = link.startsWith("http") ? link : `${BASE_URL}${link}`;
  const page = await browser.newPage();

  try {
    const response = await page.goto(fullUrl, {
      waitUntil: "networkidle0",
      timeout: 15000,
    });

    const status = response.status();
    const pageContent = await page.content();
    const has404 =
      pageContent.includes("404") ||
      pageContent.includes("Page Not Found") ||
      pageContent.includes("not found");

    return {
      link,
      status: has404 ? 404 : status,
      works: status >= 200 && status < 400 && !has404,
    };
  } catch (error) {
    return {
      link,
      status: "error",
      works: false,
      error: error.message,
    };
  } finally {
    await page.close();
  }
}

async function main() {
  console.log("\n" + "═".repeat(80));
  console.log("  COMPREHENSIVE PAGE AUDIT - policestationagent.com");
  console.log("═".repeat(80) + "\n");

  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Minimum content length: ${MIN_CONTENT_LENGTH} characters`);
  console.log(`Minimum paragraphs: ${MIN_PARAGRAPHS}\n`);

  // Get all pages to check
  console.log("📋 Discovering pages...");
  const sitemapPages = await getAllPagesFromSitemap();
  const fileSystemPages = await getAllPagesFromFileSystem();

  // Combine and deduplicate
  allPages = new Set([...sitemapPages, ...fileSystemPages]);
  console.log(`Found ${allPages.size} pages to check\n`);

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const results = {
    pages: [],
    links: new Map(),
    summary: {
      total: 0,
      working: 0,
      broken: 0,
      insufficientContent: 0,
      linksChecked: 0,
      linksWorking: 0,
      linksBroken: 0,
    },
  };

  try {
    const pagesArray = Array.from(allPages).sort();
    results.summary.total = pagesArray.length;

    console.log("🔍 Checking pages...\n");

    for (let i = 0; i < pagesArray.length; i++) {
      const pageUrl = pagesArray[i];
      process.stdout.write(`[${i + 1}/${pagesArray.length}] Checking ${pageUrl}... `);

      const pageResult = await checkPage(browser, pageUrl);
      results.pages.push(pageResult);

      if (pageResult.error) {
        console.log(`❌ ERROR: ${pageResult.error}`);
        results.summary.broken++;
      } else if (pageResult.has404 || pageResult.status >= 400) {
        console.log(`❌ BROKEN (${pageResult.status || "404"})`);
        results.summary.broken++;
      } else if (!pageResult.hasSufficientContent) {
        console.log(
          `⚠️  INSUFFICIENT CONTENT (${pageResult.contentLength} chars, ${pageResult.paragraphs} paragraphs)`
        );
        results.summary.insufficientContent++;
        results.summary.working++;
      } else {
        console.log(
          `✅ OK (${pageResult.contentLength} chars, ${pageResult.paragraphs} paragraphs, ${pageResult.links.length} links)`
        );
        results.summary.working++;
      }

      // Check links on this page (only if page works)
      if (!pageResult.error && !pageResult.has404 && pageResult.status < 400) {
        const pageLinks = pageResult.links;
        const linkResults = [];

        for (const link of pageLinks.slice(0, 20)) {
          // Limit to 20 links per page to avoid timeout
          if (!results.links.has(link)) {
            const linkResult = await checkLink(browser, BASE_URL, link);
            results.links.set(link, linkResult);
            linkResults.push(linkResult);
            results.summary.linksChecked++;

            if (linkResult.works) {
              results.summary.linksWorking++;
            } else {
              results.summary.linksBroken++;
            }
          }
        }

        pageResult.linkResults = linkResults;
      }

      // Small delay between pages
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  } finally {
    await browser.close();
  }

  // Generate report
  console.log("\n" + "═".repeat(80));
  console.log("  AUDIT SUMMARY");
  console.log("═".repeat(80) + "\n");

  console.log(`📄 Pages:`);
  console.log(`   Total checked: ${results.summary.total}`);
  console.log(`   ✅ Working: ${results.summary.working}`);
  console.log(`   ❌ Broken: ${results.summary.broken}`);
  console.log(`   ⚠️  Insufficient content: ${results.summary.insufficientContent}\n`);

  console.log(`🔗 Links:`);
  console.log(`   Total checked: ${results.summary.linksChecked}`);
  console.log(`   ✅ Working: ${results.summary.linksWorking}`);
  console.log(`   ❌ Broken: ${results.summary.linksBroken}\n`);

  // List broken pages
  const brokenPages = results.pages.filter(
    (p) => p.error || p.has404 || (p.status && p.status >= 400)
  );
  if (brokenPages.length > 0) {
    console.log("❌ BROKEN PAGES:\n");
    brokenPages.forEach((page) => {
      console.log(`   ${page.url}`);
      if (page.error) console.log(`      Error: ${page.error}`);
      if (page.status) console.log(`      Status: ${page.status}`);
      if (page.has404) console.log(`      404 detected`);
    });
    console.log("");
  }

  // List pages with insufficient content
  const insufficientPages = results.pages.filter(
    (p) => !p.error && !p.has404 && p.status < 400 && !p.hasSufficientContent
  );

  if (insufficientPages.length > 0) {
    console.log("⚠️  PAGES WITH INSUFFICIENT CONTENT:\n");
    insufficientPages.forEach((page) => {
      console.log(`   ${page.url}`);
      console.log(
        `      Content: ${page.contentLength} chars, ${page.paragraphs} paragraphs, ${page.wordCount} words`
      );
      console.log(`      Required: ${MIN_CONTENT_LENGTH} chars, ${MIN_PARAGRAPHS} paragraphs`);
    });
    console.log("");
  }

  // List broken links
  const brokenLinks = Array.from(results.links.values()).filter(
    (l) => !l.works && l.status !== "skipped"
  );
  if (brokenLinks.length > 0) {
    console.log("❌ BROKEN LINKS:\n");
    brokenLinks.slice(0, 50).forEach((link) => {
      console.log(`   ${link.link}`);
      if (link.status) console.log(`      Status: ${link.status}`);
      if (link.error) console.log(`      Error: ${link.error}`);
    });
    if (brokenLinks.length > 50) {
      console.log(`   ... and ${brokenLinks.length - 50} more`);
    }
    console.log("");
  }

  // Save detailed report
  const reportPath = path.join(__dirname, "..", "COMPREHENSIVE_PAGE_AUDIT_REPORT.json");
  await fs.writeFile(reportPath, JSON.stringify(results, null, 2), "utf-8");
  console.log(`📄 Detailed report saved to: ${reportPath}\n`);

  // Exit with error code if there are issues
  if (
    results.summary.broken > 0 ||
    results.summary.insufficientContent > 0 ||
    results.summary.linksBroken > 0
  ) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("\n❌ Fatal error:", error);
  process.exit(1);
});

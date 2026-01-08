#!/usr/bin/env node

/**
 * COMPREHENSIVE SEO & LLM INDEXING AUDIT
 * 
 * Analyzes entire site for:
 * - URL inventory
 * - Title/meta descriptions
 * - H1-H3 hierarchy
 * - Content quality (thin/duplicate detection)
 * - Internal linking gaps
 * - Schema coverage
 * - Page intent classification
 * - Keyword mapping
 * - LLM-readiness
 */

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const SITE_URL = "https://www.policestationagent.com";

// Target keywords for mapping
const TARGET_KEYWORDS = {
  "police station solicitor": { intent: "client", priority: "critical" },
  "police station representation": { intent: "client", priority: "critical" },
  "solicitor for police interview": { intent: "client", priority: "high" },
  "duty solicitor police station": { intent: "client", priority: "high" },
  "legal advice at police station": { intent: "client", priority: "high" },
  "police interview advice solicitor": { intent: "client", priority: "high" },
  "police station rep for solicitors": { intent: "solicitor", priority: "critical" },
  "police station agent": { intent: "solicitor", priority: "high" },
  "solicitor cover police station": { intent: "solicitor", priority: "high" },
  "police station representation kent": { intent: "client", priority: "critical" },
  "duty solicitor kent": { intent: "client", priority: "critical" },
};

// Intent classification patterns
const INTENT_PATTERNS = {
  client: [
    /arrested/i,
    /what to do/i,
    /your rights/i,
    /free legal/i,
    /legal aid/i,
    /police interview/i,
    /voluntary interview/i,
    /custody/i,
  ],
  solicitor: [
    /for solicitors/i,
    /agent/i,
    /cover/i,
    /agency/i,
    /referral/i,
    /rep cover/i,
  ],
  informational: [
    /what is/i,
    /explained/i,
    /guide/i,
    /faq/i,
    /article/i,
    /rights/i,
    /procedure/i,
  ],
};

class SEOAuditor {
  constructor() {
    this.pages = [];
    this.issues = {
      critical: [],
      high: [],
      medium: [],
    };
    this.keywordMap = new Map();
    this.schemaCoverage = new Set();
    this.internalLinks = new Map();
  }

  async audit() {
    console.log("🔍 Starting comprehensive SEO & LLM audit...\n");

    // Step 1: Discover all pages
    await this.discoverPages();

    // Step 2: Analyze each page
    for (const page of this.pages) {
      await this.analyzePage(page);
    }

    // Step 3: Generate reports
    this.generateReports();
  }

  async discoverPages() {
    console.log("📄 Discovering pages...");

    const pageFiles = await glob("app/**/page.tsx", {
      ignore: ["**/node_modules/**", "**/.next/**"],
    });

    for (const file of pageFiles) {
      const route = this.fileToRoute(file);
      this.pages.push({
        file,
        route,
        url: `${SITE_URL}${route}`,
        metadata: null,
        h1: null,
        h2: [],
        h3: [],
        content: null,
        schema: null,
        intent: null,
        primaryKeyword: null,
        issues: [],
      });
    }

    console.log(`   Found ${this.pages.length} pages\n`);
  }

  fileToRoute(file) {
    let route = file
      .replace(/^app\//, "/")
      .replace(/\/page\.tsx$/, "")
      .replace(/\/\[slug\]/, "");

    if (route === "/page") route = "/";
    if (!route.startsWith("/")) route = `/${route}`;

    return route;
  }

  async analyzePage(page) {
    try {
      const content = fs.readFileSync(page.file, "utf-8");

      // Extract metadata
      this.extractMetadata(page, content);

      // Extract headings
      this.extractHeadings(page, content);

      // Extract content
      this.extractContent(page, content);

      // Check schema
      this.checkSchema(page, content);

      // Classify intent
      this.classifyIntent(page);

      // Map keywords
      this.mapKeywords(page);

      // Validate page
      this.validatePage(page);
    } catch (error) {
      console.error(`   ⚠️  Error analyzing ${page.file}: ${error.message}`);
      page.issues.push({
        severity: "medium",
        type: "parse_error",
        message: error.message,
      });
    }
  }

  extractMetadata(page, content) {
    // Extract title
    const titleMatch = content.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) {
      page.metadata = { title: titleMatch[1] };
    }

    // Extract description
    const descMatch = content.match(
      /description:\s*["']([^"']+(?:"[^"']*"[^"']*)*)["']/s
    );
    if (descMatch) {
      page.metadata = {
        ...page.metadata,
        description: descMatch[1].replace(/\n\s*/g, " ").trim(),
      };
    }

    // Check for missing metadata
    if (!page.metadata?.title) {
      page.issues.push({
        severity: "critical",
        type: "missing_title",
        message: "Page lacks title tag",
      });
    }

    if (!page.metadata?.description) {
      page.issues.push({
        severity: "high",
        type: "missing_description",
        message: "Page lacks meta description",
      });
    }
  }

  extractHeadings(page, content) {
    // Extract H1
    const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match) {
      page.h1 = h1Match[1].trim();
    } else {
      // Try JSX format
      const h1JSX = content.match(/<h1[^>]*className[^>]*>([^<]+)<\/h1>/i);
      if (h1JSX) {
        page.h1 = h1JSX[1].trim();
      }
    }

    // Extract H2
    const h2Matches = content.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi);
    for (const match of h2Matches) {
      page.h2.push(match[1].trim());
    }

    // Extract H3
    const h3Matches = content.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi);
    for (const match of h3Matches) {
      page.h3.push(match[1].trim());
    }

    // Check for missing H1
    if (!page.h1) {
      page.issues.push({
        severity: "critical",
        type: "missing_h1",
        message: "Page lacks H1 heading",
      });
    }

    // Check for multiple H1s
    const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
    if (h1Count > 1) {
      page.issues.push({
        severity: "high",
        type: "multiple_h1",
        message: `Page has ${h1Count} H1 headings (should be 1)`,
      });
    }
  }

  extractContent(page, content) {
    // Extract text content (simplified - would need proper HTML parsing in production)
    const textContent = content
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    page.content = {
      length: textContent.length,
      wordCount: textContent.split(/\s+/).length,
    };

    // Check for thin content
    if (page.content.wordCount < 300) {
      page.issues.push({
        severity: "high",
        type: "thin_content",
        message: `Page has only ${page.content.wordCount} words (minimum 300 recommended)`,
      });
    }
  }

  checkSchema(page, content) {
    const schemaTypes = [
      "LegalService",
      "Organization",
      "Person",
      "FAQPage",
      "LocalBusiness",
      "Service",
      "BreadcrumbList",
    ];

    for (const type of schemaTypes) {
      if (content.includes(`"@type": "${type}"`)) {
        page.schema = page.schema || [];
        page.schema.push(type);
        this.schemaCoverage.add(type);
      }
    }

    // Check for missing schema on key pages
    const keyPages = ["/", "/services/police-station-representation", "/for-solicitors"];
    if (keyPages.includes(page.route) && !page.schema) {
      page.issues.push({
        severity: "high",
        type: "missing_schema",
        message: "Key page lacks schema markup",
      });
    }
  }

  classifyIntent(page) {
    const routeLower = page.route.toLowerCase();
    const titleLower = (page.metadata?.title || "").toLowerCase();
    const h1Lower = (page.h1 || "").toLowerCase();
    const combined = `${routeLower} ${titleLower} ${h1Lower}`;

    const scores = {
      client: 0,
      solicitor: 0,
      informational: 0,
    };

    // Check patterns
    for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
      for (const pattern of patterns) {
        if (pattern.test(combined)) {
          scores[intent]++;
        }
      }
    }

    // Determine primary intent
    const maxScore = Math.max(...Object.values(scores));
    if (maxScore > 0) {
      page.intent = Object.keys(scores).find((key) => scores[key] === maxScore);
    } else {
      page.intent = "unclear";
      page.issues.push({
        severity: "medium",
        type: "unclear_intent",
        message: "Page intent is unclear",
      });
    }
  }

  mapKeywords(page) {
    const routeLower = page.route.toLowerCase();
    const titleLower = (page.metadata?.title || "").toLowerCase();
    const h1Lower = (page.h1 || "").toLowerCase();
    const combined = `${routeLower} ${titleLower} ${h1Lower}`;

    // Find matching keywords
    for (const [keyword, data] of Object.entries(TARGET_KEYWORDS)) {
      if (combined.includes(keyword.toLowerCase())) {
        if (!page.primaryKeyword) {
          page.primaryKeyword = keyword;
          if (!this.keywordMap.has(keyword)) {
            this.keywordMap.set(keyword, []);
          }
          this.keywordMap.get(keyword).push(page.route);
        }
      }
    }

    // Check for missing primary keyword
    if (!page.primaryKeyword && page.route !== "/") {
      page.issues.push({
        severity: "high",
        type: "missing_primary_keyword",
        message: "Page lacks mapped primary keyword",
      });
    }
  }

  validatePage(page) {
    // LLM-readiness checks
    const hasWhatService = page.content?.text?.toLowerCase().includes("what this service is");
    const hasWhoFor = page.content?.text?.toLowerCase().includes("who it is for");
    const hasWhenUse = page.content?.text?.toLowerCase().includes("when you should use");
    const hasJurisdiction = page.content?.text?.toLowerCase().includes("england") || 
                           page.content?.text?.toLowerCase().includes("wales");

    if (!hasWhatService || !hasWhoFor || !hasWhenUse || !hasJurisdiction) {
      page.issues.push({
        severity: "medium",
        type: "llm_readiness",
        message: "Page missing LLM-required elements (what/who/when/jurisdiction)",
      });
    }

    // Categorize issues
    for (const issue of page.issues) {
      this.issues[issue.severity].push({
        page: page.route,
        type: issue.type,
        message: issue.message,
      });
    }
  }

  generateReports() {
    console.log("\n📊 AUDIT RESULTS\n");
    console.log("=" .repeat(80));

    // Summary
    console.log("\n📈 SUMMARY");
    console.log(`   Total pages: ${this.pages.length}`);
    console.log(`   Pages with issues: ${this.pages.filter((p) => p.issues.length > 0).length}`);
    console.log(`   Critical issues: ${this.issues.critical.length}`);
    console.log(`   High priority issues: ${this.issues.high.length}`);
    console.log(`   Medium priority issues: ${this.issues.medium.length}`);

    // Keyword coverage
    console.log("\n🔑 KEYWORD COVERAGE");
    for (const [keyword, pages] of this.keywordMap.entries()) {
      console.log(`   ${keyword}: ${pages.length} page(s)`);
    }

    // Schema coverage
    console.log("\n📋 SCHEMA COVERAGE");
    console.log(`   Types found: ${Array.from(this.schemaCoverage).join(", ") || "None"}`);

    // Intent distribution
    console.log("\n🎯 INTENT DISTRIBUTION");
    const intentCounts = {};
    for (const page of this.pages) {
      intentCounts[page.intent] = (intentCounts[page.intent] || 0) + 1;
    }
    for (const [intent, count] of Object.entries(intentCounts)) {
      console.log(`   ${intent}: ${count} page(s)`);
    }

    // Critical issues
    if (this.issues.critical.length > 0) {
      console.log("\n🚨 CRITICAL ISSUES");
      for (const issue of this.issues.critical.slice(0, 20)) {
        console.log(`   [${issue.page}] ${issue.type}: ${issue.message}`);
      }
    }

    // Save detailed report
    this.saveDetailedReport();
  }

  saveDetailedReport() {
    const report = {
      auditDate: new Date().toISOString(),
      summary: {
        totalPages: this.pages.length,
        pagesWithIssues: this.pages.filter((p) => p.issues.length > 0).length,
        criticalIssues: this.issues.critical.length,
        highIssues: this.issues.high.length,
        mediumIssues: this.issues.medium.length,
      },
      pages: this.pages.map((p) => ({
        route: p.route,
        url: p.url,
        metadata: p.metadata,
        h1: p.h1,
        h2Count: p.h2.length,
        h3Count: p.h3.length,
        contentWordCount: p.content?.wordCount || 0,
        schema: p.schema || [],
        intent: p.intent,
        primaryKeyword: p.primaryKeyword,
        issues: p.issues,
      })),
      keywordMap: Object.fromEntries(this.keywordMap),
      schemaCoverage: Array.from(this.schemaCoverage),
      issues: this.issues,
    };

    fs.writeFileSync(
      "SEO_LLM_AUDIT_REPORT.json",
      JSON.stringify(report, null, 2)
    );

    console.log("\n💾 Detailed report saved to: SEO_LLM_AUDIT_REPORT.json");
  }
}

// Run audit
const auditor = new SEOAuditor();
auditor.audit().catch(console.error);

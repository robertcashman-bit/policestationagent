/**
 * COMPLIANCE SCAN AND FIX SCRIPT
 *
 * Scans repository for banned patterns and optionally fixes them
 * Usage:
 *   npm run compliance:scan  (check only, exit 1 if violations found)
 *   npm run compliance:fix   (apply fixes and rewrite files)
 */

const fs = require("fs");
const path = require("path");
const { glob } = require("glob");

const BANNED_PATTERNS = [
  {
    id: "strapline-kent-representation",
    pattern: /free\s+police\s+station\s+representation\s+across\s+kent/gi,
    replacement: "Kent police station legal advice (Legal Aid) — via Tuckers Solicitors LLP",
    description: "Strapline variant claiming free representation across Kent",
  },
  {
    id: "policestationagent-provides-services",
    pattern: /policestationagent\.com\s+provides.*?(?:legal\s+services|representation)/gi,
    replacement: "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    description: "PoliceStationAgent.com provides legal services claim",
  },
  {
    id: "we-provide-representation",
    pattern: /we\s+provide\s+representation/gi,
    replacement: "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    description: "We provide representation claims",
  },
  {
    id: "we-provide-urgent-attendance",
    pattern: /we\s+provide\s+urgent\s+attendance/gi,
    replacement:
      "If you request Tuckers Solicitors LLP, arrangements for attendance will be made in accordance with scheme requirements and solicitor availability.",
    description: "We provide urgent attendance claims",
  },
  {
    id: "our-advice-representation",
    pattern: /our\s+advice\s+and\s+representation/gi,
    replacement: "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    description: "Our advice and representation claims",
  },
  {
    id: "provide-expert-duty-solicitor",
    pattern: /provide\s+expert\s+duty\s+solicitor\s+representation/gi,
    replacement: "Legal services are provided by Tuckers Solicitors LLP (SRA ID: 127795).",
    description: "Provide expert duty solicitor representation",
  },
  {
    id: "forty-five-minutes",
    pattern: /(?:available\s+)?within\s+45\s+minutes|attend\s+within\s+45\s+minutes/gi,
    replacement:
      "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
    description: "45 minute SLA claims",
  },
  {
    id: "twenty-four-seven-representation",
    pattern:
      /24\/7.*?(?:representation|legal\s+services|immediate(?:\s+representation)?|duty\s+solicitor\s+representation|emergency\s+representation)|(?:Available|contact\s+us)\s+24\/7.*?(?:representation|legal\s+services|immediate)/gi,
    replacement:
      "We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor.",
    description: "24/7 immediate representation claims",
  },
  {
    id: "guaranteed-representation",
    pattern:
      /(?:guaranteed\s+senior\s+solicitor|you\s+are\s+guaranteed\s+to\s+be\s+represented\s+by|guaranteed\s+to\s+be\s+represented|guaranteed\s+(?:continuity|solicitor)|guarantee\s+(?:any\s+particular\s+outcome|.*?attendance))/gi,
    replacement:
      "Where possible, you may be represented by Robert Cashman, subject to availability and conflicts. If Robert cannot attend, Tuckers Solicitors LLP will arrange an alternative suitably qualified representative.",
    description: "Guarantee language",
  },
  {
    id: "subject-to-eligibility",
    pattern:
      /subject\s+to\s+eligibility\s+(?:and\s+)?(?:availability\s+)?(?:re\s+)?(?:police\s+station\s+advice)?/gi,
    replacement:
      "If you are detained at a police station, you are entitled to free and independent legal advice. You can ask custody staff to contact Tuckers Solicitors LLP. You may request Robert Cashman as your named solicitor, subject to availability and conflicts.",
    description: "Inconsistent Legal Aid eligibility messaging",
  },
  {
    id: "ask-for-police-station-agent",
    pattern:
      /(?:ask\s+(?:for|the\s+police\s+for)|tell.*?you\s+want|request)\s+["']?(?:Police\s+Station\s+Agent|policestationagent)["']?\s+to\s+(?:represent|attend)/gi,
    replacement:
      "Tell custody staff you want Tuckers Solicitors LLP. You may request Robert Cashman as your named solicitor, subject to availability and conflicts.",
    description: "Instructions to ask for Police Station Agent",
  },
  {
    id: "forty-five-minute-response-time",
    pattern: /45-minute response time to [^<\n"]+/gi,
    replacement:
      "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
    description: "45-minute response time SLA claims",
  },
  {
    id: "minute-response-sla",
    pattern: /\d+\s*[- ]?\s*minute(?:s)?\s+(?:response time|away)/gi,
    replacement:
      "We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability.",
    description: "Numeric minute SLA claims",
  },
  {
    id: "min-response-badge",
    pattern: /\d+\s*Min\s+Response/gi,
    replacement: "Extended hours service",
    description: "Min Response badge SLA claims",
  },
  {
    id: "immediate-representation",
    pattern: /(?:we\s+can\s+provide|provides?\s+)immediate\s+(?:FREE\s+)?(?:legal\s+)?representation/gi,
    replacement:
      "If you request Tuckers Solicitors LLP, arrangements for attendance will be made in accordance with scheme requirements and solicitor availability.",
    description: "Immediate representation claims",
  },
  {
    id: "immediate-free-representation",
    pattern: /Immediate FREE legal representation/gi,
    replacement:
      "If you request Tuckers Solicitors LLP, arrangements for attendance will be made in accordance with scheme requirements and solicitor availability.",
    description: "Immediate FREE legal representation claims",
  },
  {
    id: "immediate-assistance",
    pattern: /immediate assistance/gi,
    replacement: "prompt assistance",
    description: "Immediate assistance claims",
  },
  {
    id: "round-the-clock-emergency",
    pattern: /round-the-clock emergency legal representation/gi,
    replacement:
      "extended hours legal advice — if detained, ask custody staff to contact a solicitor",
    description: "Round-the-clock emergency representation claims",
  },
  {
    id: "available-24-hours",
    pattern: /Available 24 hours a day, 7 days a week/gi,
    replacement: "Extended hours service across Kent",
    description: "24 hours a day availability claims",
  },
  {
    id: "free-24-7-title",
    pattern: /FREE 24\/7/gi,
    replacement: "Extended Hours",
    description: "FREE 24/7 in titles and metadata",
  },
  {
    id: "available-24-7-metadata",
    pattern: /available 24\/7/gi,
    replacement: "available under Legal Aid",
    description: "Available 24/7 in metadata",
  },
];

const SCAN_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".yml",
  ".yaml",
  ".html",
];
const EXCLUDE_PATTERNS = [
  "**/node_modules/**",
  "**/.next/**",
  "**/dist/**",
  "**/.git/**",
  "**/SEO_LLM_AUDIT_REPORT.json",
  "**/compliance-report.*",
  "**/COMPLIANCE*.md",
  "**/FINAL*.md",
  "**/DEPLOYMENT*.md",
  "**/CURSOR*.md",
  "**/PRODUCTION*.md",
  "**/scripts/compliance-check.js",
  "**/scripts/compliance-scan-and-fix.js",
  "**/lib/compliance/normalizeCopy.ts",
  "**/components/compliance/**",
  "**/e2e/**",
  "**/__tests__/**",
];

function scanFile(filePath, patterns) {
  const violations = [];

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n");

    patterns.forEach(({ id, pattern, replacement, description }) => {
      const regex = new RegExp(pattern.source, pattern.flags);
      let match;
      regex.lastIndex = 0; // Reset

      while ((match = regex.exec(content)) !== null) {
        const lineNumber = content.substring(0, match.index).split("\n").length;
        violations.push({
          file: path.relative(process.cwd(), filePath),
          patternId: id,
          description,
          match: match[0].substring(0, 150),
          lineNumber,
          replacement,
        });

        // Prevent infinite loop on zero-width matches
        if (match[0].length === 0) {
          regex.lastIndex++;
        }
      }
    });
  } catch (err) {
    // Skip binary files or files we can't read
  }

  return violations;
}

function fixFile(filePath, patterns) {
  try {
    let content = fs.readFileSync(filePath, "utf-8");
    let modified = false;

    patterns.forEach(({ pattern, replacement }) => {
      const before = content;
      content = content.replace(pattern, replacement);
      if (content !== before) {
        modified = true;
      }
    });

    if (modified) {
      fs.writeFileSync(filePath, content, "utf-8");
      return true;
    }
  } catch (err) {
    // Skip files we can't read/write
  }

  return false;
}

async function scanRepo(fixMode = false) {
  const violations = [];
  let filesScanned = 0;
  let filesFixed = 0;

  // Find all files to scan
  const files = await glob("**/*.{ts,tsx,js,jsx,json,md,mdx,txt}", {
    ignore: EXCLUDE_PATTERNS,
    cwd: process.cwd(),
    absolute: true,
  });

  filesScanned = files.length;

  for (const file of files) {
    const fileViolations = scanFile(file, BANNED_PATTERNS);
    violations.push(...fileViolations);
  }

  if (fixMode && violations.length > 0) {
    // Group violations by file
    const filesToFix = new Set(violations.map((v) => v.file));

    for (const relPath of filesToFix) {
      const fullPath = path.join(process.cwd(), relPath);
      if (fixFile(fullPath, BANNED_PATTERNS)) {
        filesFixed++;
      }
    }

    // Re-scan to get remaining violations after fix
    const remainingViolations = [];
    for (const file of files) {
      const fileViolations = scanFile(file, BANNED_PATTERNS);
      remainingViolations.push(...fileViolations);
    }

    return {
      violations: remainingViolations,
      filesScanned,
      filesFixed,
    };
  }

  return {
    violations,
    filesScanned,
    filesFixed,
  };
}

function generateReport(result, fixMode) {
  const reportDir = process.cwd();
  const reportMd = path.join(reportDir, "compliance-report.md");
  const reportJson = path.join(reportDir, "compliance-report.json");

  // JSON Report
  fs.writeFileSync(reportJson, JSON.stringify(result, null, 2), "utf-8");

  // Markdown Report
  let md = "# Compliance Scan Report\n\n";
  md += `**Date**: ${new Date().toISOString()}\n`;
  md += `**Mode**: ${fixMode ? "FIX" : "CHECK"}\n\n`;

  if (fixMode) {
    md += `## Fix Results\n\n`;
    md += `- **Files Scanned**: ${result.filesScanned}\n`;
    md += `- **Files Fixed**: ${result.filesFixed}\n`;
    md += `- **Violations Remaining**: ${result.violations.length}\n\n`;

    if (result.violations.length === 0) {
      md += `✅ **SUCCESS**: All violations fixed!\n`;
    } else {
      md += `⚠️ **WARNING**: ${result.violations.length} violations remain (may require manual fixes).\n\n`;
    }
  } else {
    md += `## Scan Results\n\n`;
    md += `- **Files Scanned**: ${result.filesScanned}\n`;
    md += `- **Violations Found**: ${result.violations.length}\n\n`;

    if (result.violations.length === 0) {
      md += `✅ **SUCCESS**: No violations found!\n`;
    } else {
      md += `❌ **FAILED**: ${result.violations.length} violations found.\n\n`;

      // Group by file
      const byFile = new Map();
      result.violations.forEach((v) => {
        if (!byFile.has(v.file)) {
          byFile.set(v.file, []);
        }
        byFile.get(v.file).push(v);
      });

      md += `## Violations by File\n\n`;
      byFile.forEach((viols, file) => {
        md += `### ${file}\n\n`;
        viols.forEach((v) => {
          md += `- **Line ${v.lineNumber}**: ${v.description}\n`;
          md += `  - Pattern: \`${v.patternId}\`\n`;
          md += `  - Match: "${v.match.substring(0, 100)}${v.match.length > 100 ? "..." : ""}"\n\n`;
        });
      });
    }
  }

  fs.writeFileSync(reportMd, md, "utf-8");
  console.log(`\n📄 Reports generated:`);
  console.log(`   - ${reportMd}`);
  console.log(`   - ${reportJson}\n`);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const fixMode = args.includes("--fix");
  const checkMode = args.includes("--check") || !fixMode;

  console.log(`🔍 Compliance ${fixMode ? "FIX" : "SCAN"} starting...\n`);

  const result = await scanRepo(fixMode);
  generateReport(result, fixMode);

  if (checkMode) {
    if (result.violations.length > 0) {
      console.log(`❌ Compliance check FAILED: ${result.violations.length} violations found.\n`);
      console.log(`Run 'npm run compliance:fix' to auto-fix violations.\n`);
      process.exit(1);
    } else {
      console.log(`✅ Compliance check PASSED: No violations found.\n`);
      process.exit(0);
    }
  } else {
    console.log(`✅ Compliance fix complete:`);
    console.log(`   - Files scanned: ${result.filesScanned}`);
    console.log(`   - Files fixed: ${result.filesFixed}`);
    console.log(`   - Violations remaining: ${result.violations.length}\n`);
    process.exit(result.violations.length > 0 ? 1 : 0);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * Automated DNS Setup Verification Script
 * Verifies that Wix DNS is correctly configured to point to Vercel
 */

const https = require("https");
const dns = require("dns").promises;
const { execSync } = require("child_process");

const DOMAIN = "policestationagent.com";
const WWW_DOMAIN = `www.${DOMAIN}`;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const PROJECT_ID = process.env.VERCEL_PROJECT_ID || "prj_CYDRRsP52A9YVyp44NIT5omVcgQJ";

// Function to find project by domain
async function findProjectByDomain(token) {
  try {
    const projects = await makeVercelRequest("/v9/projects");
    if (projects.projects) {
      for (const project of projects.projects) {
        const domains = await makeVercelRequest(`/v9/projects/${project.id}/domains`);
        if (domains.domains) {
          const hasDomain = domains.domains.some((d) => d.name === DOMAIN || d.name === WWW_DOMAIN);
          if (hasDomain) {
            return project.id;
          }
        }
      }
    }
  } catch (error) {
    // If we can't find it, use the default
  }
  return PROJECT_ID;
}

// Colors for terminal output
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message, color = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeVercelRequest(path) {
  return new Promise((resolve, reject) => {
    if (!VERCEL_TOKEN) {
      reject(new Error("VERCEL_TOKEN environment variable not set"));
      return;
    }

    const options = {
      hostname: "api.vercel.com",
      path: path,
      method: "GET",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

let ACTUAL_PROJECT_ID = PROJECT_ID;

async function checkVercelDomainStatus() {
  log("\n╔════════════════════════════════════════════════════════════════════╗", "cyan");
  log("║           Step 1: Checking Vercel Domain Status                    ║", "cyan");
  log("╚════════════════════════════════════════════════════════════════════╝", "cyan");

  try {
    // Try to find the correct project ID
    if (VERCEL_TOKEN) {
      const foundProjectId = await findProjectByDomain(VERCEL_TOKEN);
      if (foundProjectId && foundProjectId !== PROJECT_ID) {
        ACTUAL_PROJECT_ID = foundProjectId;
        log(`\n🔍 Found project ID: ${ACTUAL_PROJECT_ID}`, "blue");
      }
    }

    const domains = await makeVercelRequest(`/v9/projects/${ACTUAL_PROJECT_ID}/domains`);

    if (!domains.domains || domains.domains.length === 0) {
      log("❌ No domains found in Vercel project", "red");
      return { root: false, www: false };
    }

    let rootStatus = null;
    let wwwStatus = null;

    for (const domain of domains.domains) {
      if (domain.name === DOMAIN) {
        rootStatus = {
          exists: true,
          verified: domain.verified || false,
          configuration: domain.configuration || {},
          status: domain.configuration?.status || "unknown",
        };
      }
      if (domain.name === WWW_DOMAIN) {
        wwwStatus = {
          exists: true,
          verified: domain.verified || false,
          configuration: domain.configuration || {},
          status: domain.configuration?.status || "unknown",
        };
      }
    }

    // Display results
    log(`\n📋 Root Domain: ${DOMAIN}`, "blue");
    if (rootStatus) {
      log(`   ✅ Found in Vercel`, "green");
      log(`   Status: ${rootStatus.status}`, rootStatus.status === "valid" ? "green" : "yellow");
      log(
        `   Verified: ${rootStatus.verified ? "✅ Yes" : "❌ No"}`,
        rootStatus.verified ? "green" : "red"
      );

      if (rootStatus.configuration.verification) {
        log(`   Verification:`, "yellow");
        rootStatus.configuration.verification.forEach((v) => {
          log(`     - ${v.type}: ${v.domain} = ${v.value}`, "yellow");
        });
      }
    } else {
      log(`   ❌ Not found in Vercel`, "red");
      rootStatus = { exists: false };
    }

    log(`\n📋 WWW Subdomain: ${WWW_DOMAIN}`, "blue");
    if (wwwStatus) {
      log(`   ✅ Found in Vercel`, "green");
      log(`   Status: ${wwwStatus.status}`, wwwStatus.status === "valid" ? "green" : "yellow");
      log(
        `   Verified: ${wwwStatus.verified ? "✅ Yes" : "❌ No"}`,
        wwwStatus.verified ? "green" : "red"
      );
    } else {
      log(`   ⚠️  Not found in Vercel (optional but recommended)`, "yellow");
      wwwStatus = { exists: false };
    }

    return { root: rootStatus, www: wwwStatus };
  } catch (error) {
    log(`❌ Error checking Vercel domains: ${error.message}`, "red");
    if (error.message.includes("VERCEL_TOKEN")) {
      log("\n💡 To fix:", "yellow");
      log("   1. Get your Vercel token: https://vercel.com/account/tokens", "yellow");
      log("   2. Set environment variable: export VERCEL_TOKEN=your_token", "yellow");
      log("   3. Or run: VERCEL_TOKEN=your_token node scripts/verify-dns-setup.js", "yellow");
    }
    return { root: null, www: null };
  }
}

async function checkDNSResolution() {
  log("\n╔════════════════════════════════════════════════════════════════════╗", "cyan");
  log("║           Step 2: Checking DNS Resolution                           ║", "cyan");
  log("╚════════════════════════════════════════════════════════════════════╝", "cyan");

  const results = {};

  // Check root domain
  log(`\n🔍 Checking ${DOMAIN}...`, "blue");
  try {
    const addresses = await dns.resolve4(DOMAIN);
    results.root = {
      resolved: true,
      addresses: addresses,
      pointsToVercel: addresses.some(
        (addr) =>
          addr.startsWith("76.76.21") ||
          addr.startsWith("76.76.22") ||
          addr.startsWith("76.76.23") ||
          addr === "76.76.21.21"
      ),
    };
    log(`   ✅ Resolves to: ${addresses.join(", ")}`, "green");
    if (results.root.pointsToVercel) {
      log(`   ✅ Points to Vercel IP range`, "green");
    } else if (addresses.includes("216.198.79.1")) {
      log(`   ⚠️  Still points to Wix IP (216.198.79.1)`, "yellow");
      log(`   💡 Update DNS in Wix to point to Vercel (76.76.21.21)`, "yellow");
    } else {
      log(`   ⚠️  May not point to Vercel (check manually)`, "yellow");
    }
  } catch (error) {
    results.root = { resolved: false, error: error.message };
    log(`   ❌ DNS resolution failed: ${error.message}`, "red");
    log(`   💡 This is normal if DNS hasn't propagated yet (wait 30-60 min)`, "yellow");
  }

  // Check www subdomain
  log(`\n🔍 Checking ${WWW_DOMAIN}...`, "blue");
  try {
    const addresses = await dns.resolve4(WWW_DOMAIN);
    results.www = {
      resolved: true,
      addresses: addresses,
      pointsToVercel: addresses.some(
        (addr) =>
          addr.includes("76.76.21") || addr.includes("76.76.22") || addr.includes("76.76.23")
      ),
    };
    log(`   ✅ Resolves to: ${addresses.join(", ")}`, "green");
    if (results.www.pointsToVercel) {
      log(`   ✅ Points to Vercel IP range`, "green");
    } else {
      log(`   ⚠️  May not point to Vercel (check manually)`, "yellow");
    }
  } catch (error) {
    results.www = { resolved: false, error: error.message };
    log(`   ❌ DNS resolution failed: ${error.message}`, "red");
    log(`   💡 This is normal if DNS hasn't propagated yet (wait 30-60 min)`, "yellow");
  }

  return results;
}

async function checkCNAMERecords() {
  log("\n╔════════════════════════════════════════════════════════════════════╗", "cyan");
  log("║           Step 3: Checking CNAME Records                          ║", "cyan");
  log("╚════════════════════════════════════════════════════════════════════╝", "cyan");

  const results = {};

  // Check root domain CNAME
  log(`\n🔍 Checking CNAME for ${DOMAIN}...`, "blue");
  try {
    const cnames = await dns.resolveCname(DOMAIN);
    results.root = {
      hasCNAME: true,
      cnames: cnames,
      pointsToVercel: cnames.some((cname) => cname.includes("vercel")),
    };
    log(`   ✅ CNAME: ${cnames.join(", ")}`, "green");
    if (results.root.pointsToVercel) {
      log(`   ✅ Points to Vercel`, "green");
    } else {
      log(`   ⚠️  May not point to Vercel`, "yellow");
    }
  } catch (error) {
    if (error.code === "ENODATA" || error.code === "ENOTFOUND") {
      log(`   ℹ️  No CNAME record (may use A record instead)`, "yellow");
      results.root = { hasCNAME: false };
    } else {
      log(`   ❌ Error: ${error.message}`, "red");
      results.root = { hasCNAME: false, error: error.message };
    }
  }

  // Check www subdomain CNAME
  log(`\n🔍 Checking CNAME for ${WWW_DOMAIN}...`, "blue");
  try {
    const cnames = await dns.resolveCname(WWW_DOMAIN);
    results.www = {
      hasCNAME: true,
      cnames: cnames,
      pointsToVercel: cnames.some((cname) => cname.includes("vercel")),
    };
    log(`   ✅ CNAME: ${cnames.join(", ")}`, "green");
    if (results.www.pointsToVercel) {
      log(`   ✅ Points to Vercel`, "green");
    } else {
      log(`   ⚠️  May not point to Vercel`, "yellow");
    }
  } catch (error) {
    if (error.code === "ENODATA" || error.code === "ENOTFOUND") {
      log(`   ℹ️  No CNAME record (may use A record instead)`, "yellow");
      results.www = { hasCNAME: false };
    } else {
      log(`   ❌ Error: ${error.message}`, "red");
      results.www = { hasCNAME: false, error: error.message };
    }
  }

  return results;
}

async function checkEnvironmentVariables() {
  log("\n╔════════════════════════════════════════════════════════════════════╗", "cyan");
  log("║           Step 4: Checking Environment Variables                   ║", "cyan");
  log("╚════════════════════════════════════════════════════════════════════╝", "cyan");

  try {
    const envVars = await makeVercelRequest(`/v9/projects/${ACTUAL_PROJECT_ID}/env`);

    if (!envVars.envs || envVars.envs.length === 0) {
      log("\n⚠️  No environment variables found", "yellow");
      return { hasSiteUrl: false };
    }

    // Check for NEXT_PUBLIC_SITE_URL in any target (production, preview, development, or null)
    const siteUrlVar = envVars.envs.find((env) => env.key === "NEXT_PUBLIC_SITE_URL");

    if (siteUrlVar) {
      log(`\n✅ NEXT_PUBLIC_SITE_URL is set`, "green");
      log(`   Value: ${siteUrlVar.value}`, "blue");

      // Handle different target formats
      const targets = Array.isArray(siteUrlVar.target)
        ? siteUrlVar.target
        : siteUrlVar.target
          ? [siteUrlVar.target]
          : ["all"];
      log(`   Target: ${targets.join(", ")}`, "blue");

      const isCorrect =
        siteUrlVar.value === `https://${DOMAIN}` ||
        siteUrlVar.value === `https://${WWW_DOMAIN}` ||
        siteUrlVar.value === `https://${DOMAIN}/` ||
        siteUrlVar.value === `https://${WWW_DOMAIN}/`;

      if (isCorrect) {
        log(`   ✅ Value is correct`, "green");
      } else {
        log(`   ⚠️  Value should be: https://${DOMAIN}`, "yellow");
        log(`   Current value: ${siteUrlVar.value}`, "yellow");
      }

      return { hasSiteUrl: true, value: siteUrlVar.value, isCorrect };
    } else {
      log(`\n❌ NEXT_PUBLIC_SITE_URL is not set`, "red");
      log(`   💡 Set it in Vercel Dashboard → Settings → Environment Variables`, "yellow");
      log(`   Available env vars: ${envVars.envs.map((e) => e.key).join(", ")}`, "yellow");
      return { hasSiteUrl: false };
    }
  } catch (error) {
    log(`❌ Error checking environment variables: ${error.message}`, "red");
    if (error.message.includes("401") || error.message.includes("403")) {
      log(`   💡 Token may not have permission to read environment variables`, "yellow");
    }
    return { hasSiteUrl: null, error: error.message };
  }
}

function generateSummary(vercelStatus, dnsResults, cnameResults, envResults) {
  log("\n╔════════════════════════════════════════════════════════════════════╗", "cyan");
  log("║                      VERIFICATION SUMMARY                           ║", "cyan");
  log("╚════════════════════════════════════════════════════════════════════╝", "cyan");

  const issues = [];
  const warnings = [];
  const successes = [];

  // Check Vercel domain status
  if (vercelStatus.root) {
    if (vercelStatus.root.exists) {
      if (vercelStatus.root.status === "valid") {
        successes.push(`✅ ${DOMAIN} is valid in Vercel`);
      } else {
        warnings.push(`⚠️  ${DOMAIN} status: ${vercelStatus.root.status} (wait for propagation)`);
      }
    } else {
      issues.push(`❌ ${DOMAIN} not found in Vercel`);
    }
  }

  // Check DNS resolution
  if (dnsResults.root) {
    if (dnsResults.root.resolved) {
      successes.push(`✅ ${DOMAIN} resolves via DNS`);
    } else {
      warnings.push(`⚠️  ${DOMAIN} DNS not resolved yet (wait 30-60 minutes)`);
    }
  }

  // Check environment variables
  if (envResults.hasSiteUrl === true) {
    if (envResults.isCorrect) {
      successes.push(`✅ NEXT_PUBLIC_SITE_URL is correctly set`);
    } else {
      warnings.push(`⚠️  NEXT_PUBLIC_SITE_URL value may need updating`);
    }
  } else if (envResults.hasSiteUrl === false) {
    issues.push(`❌ NEXT_PUBLIC_SITE_URL environment variable not set`);
  }

  // Display results
  log("\n📊 Results:", "blue");

  if (successes.length > 0) {
    log("\n✅ Successes:", "green");
    successes.forEach((msg) => log(`   ${msg}`, "green"));
  }

  if (warnings.length > 0) {
    log("\n⚠️  Warnings:", "yellow");
    warnings.forEach((msg) => log(`   ${msg}`, "yellow"));
  }

  if (issues.length > 0) {
    log("\n❌ Issues:", "red");
    issues.forEach((msg) => log(`   ${msg}`, "red"));
  }

  // Overall status
  log("\n" + "=".repeat(64), "cyan");
  if (issues.length === 0 && warnings.length === 0) {
    log("🎉 DNS Setup is COMPLETE!", "green");
    log("   Your domain should be working correctly.", "green");
  } else if (issues.length === 0) {
    log("⚠️  DNS Setup is MOSTLY COMPLETE", "yellow");
    log("   Some items need attention (see warnings above).", "yellow");
  } else {
    log("❌ DNS Setup needs attention", "red");
    log("   Please fix the issues listed above.", "red");
  }
  log("=".repeat(64) + "\n", "cyan");
}

async function main() {
  log("\n🚀 Starting Automated DNS Verification...\n", "cyan");

  const vercelStatus = await checkVercelDomainStatus();
  const dnsResults = await checkDNSResolution();
  const cnameResults = await checkCNAMERecords();
  const envResults = await checkEnvironmentVariables();

  generateSummary(vercelStatus, dnsResults, cnameResults, envResults);

  // Exit with appropriate code
  if (
    vercelStatus.root &&
    vercelStatus.root.status === "valid" &&
    dnsResults.root &&
    dnsResults.root.resolved
  ) {
    process.exit(0); // Success
  } else {
    process.exit(1); // Needs attention
  }
}

main().catch((error) => {
  log(`\n❌ Fatal error: ${error.message}`, "red");
  console.error(error);
  process.exit(1);
});

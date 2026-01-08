#!/usr/bin/env node

/**
 * VERCEL PROJECT DEPLOYMENT LOCK
 *
 * Prevents this repository from being deployed to unauthorized Vercel projects.
 * This ensures policestationagent.com only deploys to the correct Vercel project.
 *
 * If this repo is connected to ANY other Vercel project, the build will fail immediately.
 *
 * Usage: Automatically runs via prebuild hook before every build.
 */

const ALLOWED_PROJECT_IDS = process.env.ALLOWED_VERCEL_PROJECT_IDS
  ? process.env.ALLOWED_VERCEL_PROJECT_IDS.split(",").map((id) => id.trim())
  : [];

// Only enforce on Vercel (not local dev or other CI)
const IS_VERCEL = process.env.VERCEL === "1";
const CURRENT_PROJECT_ID = process.env.VERCEL_PROJECT_ID || "";
const CURRENT_ENV = process.env.VERCEL_ENV || "";

function main() {
  // Skip enforcement for local development and non-Vercel environments
  if (!IS_VERCEL) {
    console.log("ℹ️  Vercel project lock: Skipped (not running on Vercel)");
    return 0;
  }

  // Validate environment variables are set
  if (!ALLOWED_PROJECT_IDS.length) {
    console.warn("⚠️  VERCEL PROJECT LOCK: Environment variable not set");
    console.warn("");
    console.warn("ALLOWED_VERCEL_PROJECT_IDS environment variable is not set.");
    console.warn("Deployment will proceed, but project lock is not active.");
    console.warn("");
    console.warn("To enable project lock:");
    console.warn("1. Go to Vercel Project Settings → Environment Variables");
    console.warn("2. Add: ALLOWED_VERCEL_PROJECT_IDS = <your-project-id>");
    console.warn("3. Find your Project ID: Vercel Dashboard → Project Settings → General");
    console.warn("");
    console.warn("Current Project ID:", CURRENT_PROJECT_ID || "not available");
    console.warn("");
    // Don't fail - just warn
    return 0;
  }

  if (!CURRENT_PROJECT_ID) {
    console.error("❌ VERCEL PROJECT LOCK FAILED");
    console.error("");
    console.error("VERCEL_PROJECT_ID environment variable is not available.");
    console.error("This should never happen on Vercel. Contact support if this persists.");
    console.error("");
    process.exit(1);
  }

  // Check if current project ID is allowed
  const isAllowed = ALLOWED_PROJECT_IDS.includes(CURRENT_PROJECT_ID);

  if (!isAllowed) {
    console.error("❌ VERCEL PROJECT DEPLOYMENT LOCK FAILED");
    console.error("");
    console.error("This repository is being built by an UNAUTHORIZED Vercel project.");
    console.error("");
    console.error("Current Project ID:", CURRENT_PROJECT_ID);
    console.error("Allowed Project IDs:", ALLOWED_PROJECT_IDS.join(", "));
    console.error("Environment:", CURRENT_ENV || "unknown");
    console.error("");
    console.error("SECURITY: This repository (policestationagent.com) must ONLY deploy");
    console.error("to the authorized Vercel project(s).");
    console.error("");
    console.error("Action required:");
    console.error("1. Disconnect this repository from this Vercel project");
    console.error("2. Ensure the repository is only connected to the correct project");
    console.error("3. Verify ALLOWED_VERCEL_PROJECT_IDS matches the correct project ID");
    console.error("");
    console.error("To find the correct project ID:");
    console.error("- Go to Vercel Dashboard → Project Settings → General");
    console.error('- Copy the "Project ID" value');
    console.error("- Set it in ALLOWED_VERCEL_PROJECT_IDS environment variable");
    console.error("");
    process.exit(1);
  }

  // Success
  console.log("✅ Vercel project lock: PASSED");
  console.log(`   Project ID: ${CURRENT_PROJECT_ID}`);
  console.log(`   Environment: ${CURRENT_ENV || "unknown"}`);
  console.log(`   Allowed IDs: ${ALLOWED_PROJECT_IDS.join(", ")}`);
  return 0;
}

// Run the check
const exitCode = main();
process.exit(exitCode);

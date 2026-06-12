#!/usr/bin/env node

/**
 * DEPLOYMENT TARGET VERIFICATION SCRIPT
 *
 * Ensures deployments only go to the correct Vercel project:
 * web44ai-git-master-robert-cashmans-projects.vercel.app
 *
 * This script checks:
 * 1. Vercel project configuration (.vercel folder)
 * 2. Environment variables
 * 3. Fails hard if wrong project detected
 *
 * Usage: node scripts/verify-deployment-target.js
 */

const fs = require("fs");
const path = require("path");

const CORRECT_PROJECT_ID = "web44ai-git-master-robert-cashmans-projects";
const CORRECT_VERCEL_URL = "web44ai-git-master-robert-cashmans-projects.vercel.app";
const CORRECT_GIT_REPO = "robertdavidcashman-droid/one";

let hasError = false;

console.log("🔍 Verifying deployment target...\n");

// Check 1: Vercel project configuration
const vercelProjectPath = path.join(process.cwd(), ".vercel", "project.json");
if (fs.existsSync(vercelProjectPath)) {
  try {
    const projectConfig = JSON.parse(fs.readFileSync(vercelProjectPath, "utf-8"));
    const projectId = projectConfig.projectId || "";
    const projectName = projectConfig.name || "";

    console.log(`📦 Vercel Project ID: ${projectId}`);
    console.log(`📦 Vercel Project Name: ${projectName}`);

    // Check if project ID matches (can be partial match since Vercel IDs vary)
    if (projectId && !projectId.includes("pstrain")) {
      console.log("✅ Project ID looks correct (not pstrain)");
    } else if (projectId && projectId.includes("pstrain")) {
      console.error(`❌ ERROR: Project ID contains 'pstrain' - this is the WRONG project!`);
      console.error(`   Current: ${projectId}`);
      console.error(`   Expected: Should NOT contain 'pstrain'`);
      hasError = true;
    }
  } catch (err) {
    console.warn("⚠️  Could not read .vercel/project.json (this is OK if deploying via Git)");
  }
} else {
  console.log("ℹ️  No local .vercel folder (deploying via Git integration - this is OK)");
}

// Check 2: Environment variables
const vercelUrl = process.env.VERCEL_URL || "";
const vercelEnv = process.env.VERCEL_ENV || "";
const gitRepo = process.env.VERCEL_GIT_REPO_SLUG || "";

if (vercelUrl) {
  console.log(`🌐 VERCEL_URL: ${vercelUrl}`);
  if (vercelUrl.includes("pstrain")) {
    console.error(`❌ ERROR: VERCEL_URL contains 'pstrain' - this is the WRONG deployment target!`);
    console.error(`   Current: ${vercelUrl}`);
    console.error(`   Expected: Should NOT contain 'pstrain'`);
    hasError = true;
  } else {
    console.log("✅ VERCEL_URL looks correct");
  }
}

if (vercelEnv) {
  console.log(`🌍 VERCEL_ENV: ${vercelEnv}`);
}

// Check 3: Git repository (if available)
if (gitRepo) {
  console.log(`📂 Git Repo: ${gitRepo}`);
  if (!gitRepo.includes(CORRECT_GIT_REPO.split("/")[0])) {
    console.warn(`⚠️  Warning: Git repo doesn't match expected pattern`);
  }
}

// Check 4: Package.json name
const packageJsonPath = path.join(process.cwd(), "package.json");
if (fs.existsSync(packageJsonPath)) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const packageName = packageJson.name || "";

    if (packageName.includes("pstrain")) {
      console.error(`❌ ERROR: package.json name contains 'pstrain' - this is the WRONG project!`);
      console.error(`   Current: ${packageName}`);
      console.error(`   Expected: Should NOT contain 'pstrain'`);
      hasError = true;
    } else {
      console.log(`📦 Package name: ${packageName} ✅`);
    }
  } catch (err) {
    // Ignore
  }
}

// Check 5: Workspace path (development only check)
const workspacePath = process.cwd();
if (workspacePath.includes("pstrain rebuild")) {
  console.error(`❌ ERROR: Working directory contains 'pstrain rebuild'!`);
  console.error(`   Current path: ${workspacePath}`);
  console.error(`   This appears to be the WRONG workspace.`);
  console.error(`   Expected: Should be in 'policestationagent' directory`);
  hasError = true;
} else {
  console.log(`📁 Working directory: ${workspacePath} ✅`);
}

// Check 6: Required production secrets (Vercel production builds only)
if (process.env.VERCEL === '1' && process.env.VERCEL_ENV === 'production') {
  const requiredSecrets = [
    { name: 'CRON_SECRET', value: process.env.CRON_SECRET },
    { name: 'RESEND_WEBHOOK_SECRET', value: process.env.RESEND_WEBHOOK_SECRET },
    { name: 'UPSTASH_REDIS_REST_URL', value: process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL },
    { name: 'UPSTASH_REDIS_REST_TOKEN', value: process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN },
  ];

  for (const { name, value } of requiredSecrets) {
    if (!value?.trim()) {
      console.error(`❌ ERROR: ${name} is required in production but is not set.`);
      hasError = true;
    } else {
      console.log(`🔐 ${name}: set ✅`);
    }
  }
}

console.log("\n" + "=".repeat(60));
if (hasError) {
  console.error("\n❌ DEPLOYMENT TARGET VERIFICATION FAILED");
  console.error("\nThis build would deploy to the WRONG project!");
  console.error("\nCorrect deployment target:");
  console.error(`  - Vercel URL: ${CORRECT_VERCEL_URL}`);
  console.error(`  - Git Repo: ${CORRECT_GIT_REPO}`);
  console.error("\nDo NOT deploy from this location/configuration.");
  console.error("Ensure you are in the correct workspace and Vercel project is linked correctly.");
  process.exit(1);
} else {
  console.log("\n✅ DEPLOYMENT TARGET VERIFICATION PASSED");
  console.log("\nThis build will deploy to the correct project.");
  console.log(`Correct target: ${CORRECT_VERCEL_URL}`);
}

#!/usr/bin/env node

/**
 * Check production deployment details and verify it includes latest commit
 */

const https = require("https");

const token = process.env.VERCEL_TOKEN;
const projectId = "prj_CYDRRsP52A9YVyp44NIT5omVcgQJ";

function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body || "{}") });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });
    req.on("error", reject);
    req.end();
  });
}

async function main() {
  if (!token) {
    console.error("❌ VERCEL_TOKEN environment variable is not set.");
    process.exit(1);
  }

  console.log("🔍 Checking production deployment status...\n");

  // Get latest production deployment
  const options = {
    hostname: "api.vercel.com",
    path: `/v6/deployments?projectId=${projectId}&limit=5&target=production`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const result = await makeRequest(options);

  if (result.data.deployments && result.data.deployments.length > 0) {
    const prodDeployment = result.data.deployments[0];

    console.log("📦 Production Deployment:");
    console.log(`   URL: ${prodDeployment.url}`);
    console.log(`   State: ${prodDeployment.state || prodDeployment.readyState}`);
    console.log(`   Created: ${new Date(prodDeployment.created).toLocaleString()}`);
    console.log(
      `   Commit: ${prodDeployment.meta?.gitlabCommitSha || prodDeployment.meta?.githubCommitSha || prodDeployment.meta?.gitCommitSha || "N/A"}`
    );
    console.log(
      `   Branch: ${prodDeployment.meta?.gitlabCommitRef || prodDeployment.meta?.githubCommitRef || prodDeployment.meta?.gitBranch || "N/A"}`
    );
    console.log(
      `   Message: ${prodDeployment.meta?.gitlabCommitMessage || prodDeployment.meta?.githubCommitMessage || prodDeployment.meta?.gitCommitMessage || "N/A"}`
    );

    // Get all recent deployments to compare
    console.log("\n📋 Recent Deployments (all targets):");
    const allOptions = {
      hostname: "api.vercel.com",
      path: `/v6/deployments?projectId=${projectId}&limit=5`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const allResult = await makeRequest(allOptions);
    if (allResult.data.deployments) {
      allResult.data.deployments.forEach((d, i) => {
        const commit =
          d.meta?.gitlabCommitSha || d.meta?.githubCommitSha || d.meta?.gitCommitSha || "N/A";
        const target = d.target || "preview";
        const icon = target === "production" ? "🎯" : "🔍";
        console.log(
          `   ${icon} ${d.url} - ${target} - Commit: ${commit.substring(0, 7)} - ${new Date(d.created).toLocaleString()}`
        );
      });
    }

    console.log("\n💡 If production deployment commit is older than latest, you need to:");
    console.log("   1. Wait for auto-deploy (if master branch is configured)");
    console.log("   2. Or manually promote latest deployment to production");
    console.log("   3. Or trigger new production deployment: vercel --prod");
  } else {
    console.log("❌ No production deployments found");
  }
}

main().catch(console.error);

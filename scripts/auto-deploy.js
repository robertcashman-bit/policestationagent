/**
 * Automatic Deployment Script
 * Tries to deploy automatically, falls back to instructions if auth needed
 */

const { execSync } = require("child_process");
const fs = require("fs").promises;
const path = require("path");

async function checkAuth() {
  try {
    execSync("vercel whoami", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

async function deploy() {
  console.log("🚀 Automatic Deployment\n");
  console.log("=".repeat(60));

  // Check authentication
  console.log("\n📋 Checking Vercel authentication...");
  const isAuth = await checkAuth();

  if (!isAuth) {
    console.log("❌ Not authenticated with Vercel");
    console.log("\n📝 To authenticate automatically:");
    console.log("   1. Go to: https://vercel.com/account/tokens");
    console.log("   2. Create a new token");
    console.log("   3. Run: vercel login --token YOUR_TOKEN");
    console.log("   4. Then run this script again");
    console.log("\n💡 OR use Vercel Dashboard (easier):");
    console.log("   1. Go to: https://vercel.com");
    console.log('   2. Click "Add New..." → "Project"');
    console.log("   3. Import: robertdavidcashman-droid/one");
    console.log("   4. Add environment variables");
    console.log('   5. Click "Deploy"');
    process.exit(1);
  }

  console.log("✅ Authenticated with Vercel");

  // Check if vercel.json exists
  const vercelJsonPath = path.join(process.cwd(), "vercel.json");
  try {
    await fs.access(vercelJsonPath);
    console.log("✅ vercel.json found");
  } catch {
    console.log("⚠️  Creating vercel.json...");
    const vercelConfig = {
      buildCommand: "npm run build",
      outputDirectory: ".next",
      framework: "nextjs",
      installCommand: "npm install",
    };
    await fs.writeFile(vercelJsonPath, JSON.stringify(vercelConfig, null, 2));
    console.log("✅ Created vercel.json");
  }

  // Deploy
  console.log("\n📦 Deploying to Vercel...");
  console.log("   This may take a few minutes...\n");

  try {
    execSync("vercel --yes", { stdio: "inherit" });
    console.log("\n✅ Deployment successful!");
    console.log("\n📝 Next steps:");
    console.log("   1. Set environment variables in Vercel dashboard:");
    console.log("      - JWT_SECRET");
    console.log("      - NEXT_PUBLIC_SITE_URL");
    console.log("   2. Run: vercel --prod (for production)");
  } catch (error) {
    console.error("\n❌ Deployment failed");
    console.log("\n💡 Try deploying via Vercel Dashboard instead:");
    console.log("   https://vercel.com → Add New Project → Import robertdavidcashman-droid/one");
  }
}

deploy().catch(console.error);

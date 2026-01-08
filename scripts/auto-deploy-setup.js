/**
 * Automatic Deployment Setup Script
 * This script helps automate the deployment process
 */

const fs = require("fs").promises;
const path = require("path");
const { execSync } = require("child_process");

const GIT_PATH =
  "C:\\Users\\rober\\AppData\\Local\\GitHubDesktop\\app-3.5.4\\resources\\app\\git\\cmd\\git.exe";

function runCommand(command, description) {
  try {
    console.log(`\n📌 ${description}...`);
    const output = execSync(command, { encoding: "utf8", stdio: "pipe" });
    console.log(`✅ ${description} completed`);
    return output;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    return null;
  }
}

async function checkVercelCLI() {
  try {
    execSync("vercel --version", { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

async function createEnvTemplate() {
  const envTemplate = `# Production Environment Variables
# Copy these to your hosting platform (Vercel, Netlify, etc.)

# Authentication Secret (generate a secure random string)
JWT_SECRET=your-secure-random-secret-key-minimum-32-characters-long

# Your website URL
NEXT_PUBLIC_SITE_URL=https://policestationagent.com

# Database (if using cloud database)
# DATABASE_URL=your-database-connection-string
`;

  await fs.writeFile(".env.production.example", envTemplate);
  console.log("✅ Created .env.production.example");
}

async function main() {
  console.log("🚀 Automatic Deployment Setup\n");
  console.log("=".repeat(60));

  // Step 1: Check if Vercel CLI is installed
  console.log("\n📦 Step 1: Checking Vercel CLI...");
  const hasVercel = await checkVercelCLI();

  if (!hasVercel) {
    console.log("⚠️  Vercel CLI not installed");
    console.log("\n📥 Installing Vercel CLI...");
    try {
      execSync("npm install -g vercel", { stdio: "inherit" });
      console.log("✅ Vercel CLI installed");
    } catch (error) {
      console.log("❌ Failed to install Vercel CLI automatically");
      console.log("💡 Please run manually: npm install -g vercel");
      console.log("   Then run: vercel login");
      console.log("   Then run: vercel");
    }
  } else {
    console.log("✅ Vercel CLI is installed");
  }

  // Step 2: Create environment template
  console.log("\n📝 Step 2: Creating environment variable template...");
  await createEnvTemplate();

  // Step 3: Check Git remote
  console.log("\n🔗 Step 3: Checking Git remote repository...");
  try {
    const remotes = execSync(`${GIT_PATH} remote -v`, { encoding: "utf8" });
    if (remotes.trim()) {
      console.log("✅ Git remote configured:");
      console.log(remotes);
    } else {
      console.log("⚠️  No Git remote configured");
      console.log("\n📋 To set up GitHub repository:");
      console.log("   1. Create a new repository on GitHub");
      console.log("   2. Run: git remote add origin https://github.com/yourusername/your-repo.git");
      console.log("   3. Run: git push -u origin master");
    }
  } catch (error) {
    console.log("⚠️  Could not check Git remotes");
  }

  // Step 4: Test build
  console.log("\n🔨 Step 4: Testing production build...");
  try {
    console.log("Running: npm run build");
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Build successful!");
  } catch (error) {
    console.log("❌ Build failed. Please fix errors before deploying.");
    process.exit(1);
  }

  // Step 5: Deployment instructions
  console.log("\n" + "=".repeat(60));
  console.log("📋 DEPLOYMENT OPTIONS:\n");

  if (hasVercel) {
    console.log("✅ Option 1: Deploy with Vercel CLI (Ready!)");
    console.log("\n   Run these commands:");
    console.log("   1. vercel login");
    console.log("   2. vercel");
    console.log("   3. Follow prompts to configure");
    console.log("   4. vercel --prod (for production)");
  } else {
    console.log("📦 Option 1: Install Vercel CLI first");
    console.log("   npm install -g vercel");
  }

  console.log("\n🌐 Option 2: Deploy via Vercel Dashboard");
  console.log("   1. Go to https://vercel.com");
  console.log("   2. Sign up/Login with GitHub");
  console.log('   3. Click "Add New Project"');
  console.log("   4. Import your Git repository");
  console.log("   5. Add environment variables");
  console.log('   6. Click "Deploy"');

  console.log("\n📝 Next Steps:");
  console.log("   1. Set environment variables in your hosting platform");
  console.log("   2. Configure custom domain (optional)");
  console.log("   3. Set up database (if needed)");

  console.log("\n✅ Setup complete!");
}

main().catch(console.error);

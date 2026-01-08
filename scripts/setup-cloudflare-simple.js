/**
 * Simplest Cloudflare Setup - Just needs domain and Vercel target
 * No API tokens required - just prints instructions!
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function main() {
  console.log("🌐 Simple Cloudflare Setup Guide\n");
  console.log("This will give you step-by-step instructions!\n");

  const domain = await question("Enter your domain (e.g., policestationagent.com): ");
  const vercelTarget = await question("Enter Vercel DNS target (from Vercel dashboard): ");
  const useCNAME = await question("Is this a CNAME? (y/n): ");

  const cleanDomain = domain
    .replace(/^https?:\/\//, "")
    .replace(/\/$/, "")
    .toLowerCase();
  const isCNAME = useCNAME.toLowerCase() === "y" || useCNAME.toLowerCase() === "yes";

  console.log("\n" + "=".repeat(60));
  console.log("📋 YOUR CUSTOM INSTRUCTIONS");
  console.log("=".repeat(60) + "\n");

  console.log("1️⃣  Go to: https://dash.cloudflare.com");
  console.log("2️⃣  Click your domain: " + cleanDomain);
  console.log('3️⃣  Click "DNS" in left sidebar');
  console.log('4️⃣  Click "Add record"\n');

  if (isCNAME) {
    console.log("5️⃣  Fill in:");
    console.log("   Type: CNAME");
    console.log("   Name: @ (or leave blank)");
    console.log("   Target: " + vercelTarget);
    console.log("   Proxy: ✅ ON (orange cloud)");
  } else {
    console.log("5️⃣  Fill in:");
    console.log("   Type: A");
    console.log("   Name: @ (or leave blank)");
    console.log("   IPv4 address: " + vercelTarget);
    console.log("   Proxy: ✅ ON (orange cloud)");
  }

  console.log('\n6️⃣  Click "Save"');
  console.log('\n7️⃣  Click "SSL/TLS" → Set to "Full"');
  console.log('8️⃣  Click "Edge Certificates" → Enable "Always Use HTTPS"\n');

  console.log("⏱️  Wait 5-15 minutes, then check Vercel dashboard!");
  console.log('✅ Domain should show "Valid Configuration"\n');

  rl.close();
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main };

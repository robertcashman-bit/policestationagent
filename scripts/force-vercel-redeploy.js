#!/usr/bin/env node

/**
 * Force Vercel redeploy by making a small change
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔄 Forcing Vercel redeploy...\n');

// Update the trigger file with current timestamp
const timestamp = new Date().toISOString();
const triggerContent = `# Deployment trigger - updated ${timestamp}
# This file forces Vercel to recognize changes and redeploy
# Last triggered: ${new Date().toLocaleString()}
`;

fs.writeFileSync('.vercel-deploy-trigger', triggerContent);

console.log('✅ Updated .vercel-deploy-trigger file');
console.log('📤 Committing and pushing to trigger deployment...\n');

try {
  execSync('git add .vercel-deploy-trigger', { stdio: 'inherit' });
  execSync(`git commit -m "Force Vercel redeploy: Update trigger timestamp ${timestamp}"`, { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });
  
  console.log('\n✅ Push complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Go to: https://vercel.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to "Deployments" tab');
  console.log('4. Wait for new deployment to appear (30-60 seconds)');
  console.log('5. Wait for status to change to "Ready" (2-3 minutes)');
  console.log('6. Clear browser cache (Ctrl+Shift+R) or use incognito mode');
  console.log('7. Check if new links appear in navigation menus\n');
} catch (error) {
  console.error('\n❌ Error during git operations:', error.message);
  console.log('\n💡 Manual steps:');
  console.log('1. Go to: https://vercel.com/dashboard');
  console.log('2. Select your project');
  console.log('3. Go to "Deployments" tab');
  console.log('4. Click "..." on latest deployment');
  console.log('5. Click "Redeploy"');
  console.log('6. Wait 2-3 minutes for deployment to complete');
}




















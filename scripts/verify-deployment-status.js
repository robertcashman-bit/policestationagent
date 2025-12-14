#!/usr/bin/env node

/**
 * Verify deployment status and check if changes are live
 */

const https = require('https');
const http = require('http');

const DOMAINS = [
  'policestationagent.com',
  'criminaldefencekent.co.uk',
  'policestationagent.net',
  'policestationagent.org',
  'policestationrepkent.co.uk',
];

async function checkDomain(domain) {
  return new Promise((resolve) => {
    const url = `https://${domain}`;
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, { timeout: 5000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Check if new links are present
        const hasNewLinks = 
          data.includes('/police-custody-rights') ||
          data.includes('/police-interview-rights') ||
          data.includes('/preparing-for-police-interview') ||
          data.includes('/importance-of-early-legal-advice') ||
          data.includes('/kent-police-station-reps');
        
        resolve({
          domain,
          status: res.statusCode,
          hasNewLinks,
          timestamp: new Date().toISOString(),
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        domain,
        status: 'ERROR',
        error: error.message,
        hasNewLinks: false,
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        domain,
        status: 'TIMEOUT',
        hasNewLinks: false,
      });
    });
  });
}

async function main() {
  console.log('🔍 Checking deployment status on live domains...\n');
  
  for (const domain of DOMAINS) {
    const result = await checkDomain(domain);
    const status = result.status === 200 ? '✅' : '❌';
    const links = result.hasNewLinks ? '✅ Has new links' : '❌ Missing new links';
    
    console.log(`${status} ${domain}`);
    console.log(`   Status: ${result.status}`);
    console.log(`   Links: ${links}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
    console.log('');
  }
  
  console.log('\n💡 If links are missing:');
  console.log('   1. Check Vercel dashboard for deployment status');
  console.log('   2. Clear browser cache (Ctrl+Shift+R)');
  console.log('   3. Try incognito/private mode');
  console.log('   4. Wait 2-3 minutes for CDN cache to clear');
}

main().catch(console.error);












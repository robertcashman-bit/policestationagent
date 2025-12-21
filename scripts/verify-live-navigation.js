#!/usr/bin/env node

/**
 * Verify that navigation links appear on live production domains
 */

const https = require('https');

const DOMAINS = [
  'policestationagent.com',
  'policestationagent.net',
  'policestationagent.org',
  'criminaldefencekent.co.uk',
  'policestationrepkent.co.uk',
];

const EXPECTED_LINKS = [
  'Police Custody Rights',
  'Police Interview Rights',
  'Preparing for Interview',
  'What to Expect',
  'Early Legal Advice',
  'Vulnerable Adults',
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { 
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NavigationVerifier/1.0)',
        'Cache-Control': 'no-cache',
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body, headers: res.headers });
      });
    });
    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function checkDomain(domain) {
  const url = `https://${domain}`;
  console.log(`\n🔍 Checking ${domain}...`);
  
  try {
    const result = await fetchUrl(url);
    
    if (result.status === 200) {
      const html = result.body;
      const foundLinks = EXPECTED_LINKS.filter(link => html.includes(link));
      
      console.log(`   ✅ Status: ${result.status}`);
      console.log(`   📊 Found ${foundLinks.length}/${EXPECTED_LINKS.length} expected links:`);
      
      if (foundLinks.length > 0) {
        foundLinks.forEach(link => console.log(`      ✅ ${link}`));
      }
      
      const missingLinks = EXPECTED_LINKS.filter(link => !html.includes(link));
      if (missingLinks.length > 0) {
        console.log(`   ⚠️  Missing links:`);
        missingLinks.forEach(link => console.log(`      ❌ ${link}`));
      }
      
      // Check cache headers
      const cacheControl = result.headers['cache-control'] || result.headers['Cache-Control'] || 'not set';
      const age = result.headers['age'] || result.headers['Age'] || 'not set';
      console.log(`   📦 Cache-Control: ${cacheControl}`);
      console.log(`   ⏰ Age: ${age}`);
      
      return { domain, status: result.status, foundLinks: foundLinks.length, totalLinks: EXPECTED_LINKS.length };
    } else {
      console.log(`   ❌ Status: ${result.status}`);
      return { domain, status: result.status, foundLinks: 0, totalLinks: EXPECTED_LINKS.length };
    }
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
    return { domain, status: 'ERROR', foundLinks: 0, totalLinks: EXPECTED_LINKS.length, error: error.message };
  }
}

async function main() {
  console.log('🔍 Verifying navigation links on live production domains...\n');
  console.log('Expected links:', EXPECTED_LINKS.join(', '));
  console.log('\n⏳ This may take 30-60 seconds...\n');
  
  const results = [];
  
  for (const domain of DOMAINS) {
    const result = await checkDomain(domain);
    results.push(result);
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📊 Summary:');
  console.log('─'.repeat(60));
  
  results.forEach(r => {
    const icon = r.status === 200 ? '✅' : '❌';
    const linksStatus = r.foundLinks === r.totalLinks ? '✅' : '⚠️';
    console.log(`${icon} ${r.domain.padEnd(35)} Status: ${r.status} | Links: ${linksStatus} ${r.foundLinks}/${r.totalLinks}`);
  });
  
  const allWorking = results.every(r => r.status === 200 && r.foundLinks === r.totalLinks);
  
  if (allWorking) {
    console.log('\n✅ All domains have navigation links!');
    console.log('\n💡 If you still don\'t see them in your browser:');
    console.log('   1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)');
    console.log('   2. Clear browser cache');
    console.log('   3. Try incognito/private mode');
    console.log('   4. Wait 2-3 minutes for CDN cache to clear');
  } else {
    console.log('\n⚠️  Some domains are missing navigation links.');
    console.log('\n💡 Possible causes:');
    console.log('   1. Deployment may not have completed yet');
    console.log('   2. CDN cache needs time to clear (2-5 minutes)');
    console.log('   3. Browser cache - try hard refresh (Ctrl+Shift+R)');
    console.log('   4. Check Vercel dashboard for deployment status');
  }
}

main().catch(console.error);





























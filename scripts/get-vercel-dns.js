#!/usr/bin/env node

const https = require('https');

const token = process.env.VERCEL_TOKEN;
const projectId = 'prj_CYDRRsP52A9YVyp44NIT5omVcgQJ';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
    
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════╗');
  console.log('║                    VERCEL DNS CONFIGURATION                        ║');
  console.log('╚════════════════════════════════════════════════════════════════════╝\n');

  // Get project domains
  const domains = await makeRequest(`/v9/projects/${projectId}/domains`);
  
  if (domains.domains) {
    for (const d of domains.domains) {
      console.log(`\n🌐 Domain: ${d.name}`);
      console.log(`   Verified: ${d.verified ? '✅ Yes' : '❌ No'}`);
      
      if (d.verification) {
        console.log(`   Verification needed:`);
        for (const v of d.verification) {
          console.log(`     Type: ${v.type}`);
          console.log(`     Domain: ${v.domain}`);
          console.log(`     Value: ${v.value}`);
        }
      }
      
      if (d.gitBranch) {
        console.log(`   Git Branch: ${d.gitBranch}`);
      }
    }
  }

  console.log('\n');
  console.log('═══════════════════════════════════════════════════════════════════════');
  console.log('              REQUIRED DNS RECORDS FOR CLOUDFLARE                      ');
  console.log('═══════════════════════════════════════════════════════════════════════\n');
  
  console.log('Go to: https://dash.cloudflare.com → criminaldefencekent.co.uk → DNS\n');
  
  console.log('┌──────────┬──────────┬────────────────────────┬─────────────────────┐');
  console.log('│ Type     │ Name     │ Content                │ Proxy Status        │');
  console.log('├──────────┼──────────┼────────────────────────┼─────────────────────┤');
  console.log('│ CNAME    │ @        │ cname.vercel-dns.com   │ DNS only (grey)     │');
  console.log('├──────────┼──────────┼────────────────────────┼─────────────────────┤');
  console.log('│ CNAME    │ www      │ cname.vercel-dns.com   │ DNS only (grey)     │');
  console.log('└──────────┴──────────┴────────────────────────┴─────────────────────┘');
  
  console.log('\n⚠️  IMPORTANT: Proxy Status MUST be "DNS only" (grey cloud icon)');
  console.log('   NOT "Proxied" (orange cloud). Vercel needs direct DNS access.\n');
  
  console.log('Alternative A Record (if CNAME for @ not supported):');
  console.log('┌──────────┬──────────┬────────────────────────┬─────────────────────┐');
  console.log('│ Type     │ Name     │ Content                │ Proxy Status        │');
  console.log('├──────────┼──────────┼────────────────────────┼─────────────────────┤');
  console.log('│ A        │ @        │ 76.76.21.21            │ DNS only (grey)     │');
  console.log('└──────────┴──────────┴────────────────────────┴─────────────────────┘\n');
}

main().catch(console.error);































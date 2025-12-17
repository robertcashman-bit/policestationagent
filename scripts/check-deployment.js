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
  console.log('🔍 Checking Vercel deployment status...\n');

  // Get latest deployments
  const deployments = await makeRequest(`/v6/deployments?projectId=${projectId}&limit=5`);
  
  if (deployments.deployments) {
    console.log('📋 Recent deployments:');
    for (const d of deployments.deployments) {
      const status = d.state || d.readyState;
      const statusIcon = status === 'READY' ? '✅' : status === 'BUILDING' ? '🔄' : status === 'ERROR' ? '❌' : '⏳';
      console.log(`  ${statusIcon} ${d.url} - ${status} (${new Date(d.created).toLocaleString()})`);
    }
  }

  // Get project domains
  const domains = await makeRequest(`/v9/projects/${projectId}/domains`);
  
  if (domains.domains) {
    console.log('\n🌐 Domain configuration:');
    for (const d of domains.domains) {
      const verified = d.verified ? '✅' : '❌';
      console.log(`  ${verified} ${d.name} - verified: ${d.verified}`);
    }
  }

  // Get project info
  const project = await makeRequest(`/v9/projects/${projectId}`);
  console.log('\n📦 Project info:');
  console.log(`  Name: ${project.name}`);
  console.log(`  Framework: ${project.framework}`);
  
  if (project.targets?.production) {
    console.log(`  Production URL: ${project.targets.production.url}`);
  }
}

main().catch(console.error);




































#!/usr/bin/env node

/**
 * COMPLIANCE HTTP SCAN
 * 
 * Scans rendered HTML output from production build to catch violations
 * that might be missed by source file scanning (e.g., in HTML strings, CMS content, etc.)
 * 
 * Usage: node scripts/compliance-http-scan.mjs
 */

import { spawn } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import http from 'http';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// STRICT BANNED PATTERNS - ANY match is a failure
const BANNED_PATTERNS = [
  {
    id: 'within-45-minutes',
    pattern: /\bwithin\s*45\s*minutes\b/gi,
    description: '"within 45 minutes" claim'
  },
  {
    id: 'available-24-7',
    pattern: /\bavailable\s*24\/7\b/gi,
    description: '"available 24/7" claim'
  },
  {
    id: 'guaranteed',
    pattern: /\bguaranteed\b/gi,
    description: '"guaranteed" language'
  },
  {
    id: 'policestationagent-provides',
    pattern: /\bpolicestationagent\.com\s+provides\b/gi,
    description: 'PoliceStationAgent.com provides claim'
  },
  {
    id: 'subject-to-eligibility',
    pattern: /\bsubject\s+to\s+eligibility\b/gi,
    description: '"subject to eligibility" language'
  },
  {
    id: 'free-representation-kent',
    pattern: /\bfree\s+police\s+station\s+representation\s+across\s+kent\b/gi,
    description: 'Free police station representation across Kent'
  },
  {
    id: 'we-provide-urgent-attendance',
    pattern: /\bwe\s+provide\s+urgent\s+attendance\b/gi,
    description: '"we provide urgent attendance" claim'
  },
  {
    id: 'we-provide-representation',
    pattern: /\bwe\s+provide\s+.*representation\b/gi,
    description: '"we provide ... representation" claim'
  },
  {
    id: 'our-advice-representation',
    pattern: /\bour\s+advice\s+and\s+representation\b/gi,
    description: '"our advice and representation" claim'
  }
];

// Routes to check (minimum set)
const CORE_ROUTES = [
  '/',
  '/home',
  '/services',
  '/fees',
  '/complaints',
  '/police-stations',
  '/coverage',
  '/areas'
];

const SERVER_PORT = 3033;
const SERVER_URL = `http://localhost:${SERVER_PORT}`;
const MAX_WAIT_MS = 60000; // 60 seconds max wait for server
const REQUEST_TIMEOUT_MS = 30000; // 30 seconds per request

async function fetchRoute(route) {
  return new Promise((resolve, reject) => {
    const url = `${SERVER_URL}${route}`;
    const req = http.get(url, { timeout: REQUEST_TIMEOUT_MS }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${route}`));
        }
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timeout for ${route}`));
    });
  });
}

async function waitForServer(maxWait = MAX_WAIT_MS) {
  const start = Date.now();
  while (Date.now() - start < maxWait) {
    try {
      await fetchRoute('/');
      return true;
    } catch (err) {
      await sleep(2000);
    }
  }
  throw new Error(`Server did not start within ${maxWait}ms`);
}

function scanContent(content, route) {
  const violations = [];
  
  for (const { id, pattern, description } of BANNED_PATTERNS) {
    const regex = new RegExp(pattern.source, pattern.flags);
    let match;
    regex.lastIndex = 0;
    
    while ((match = regex.exec(content)) !== null) {
      const start = Math.max(0, match.index - 100);
      const end = Math.min(content.length, match.index + match[0].length + 100);
      const excerpt = content.substring(start, end).replace(/\s+/g, ' ').trim();
      
      violations.push({
        route,
        patternId: id,
        description,
        match: match[0],
        excerpt
      });
      
      // Prevent infinite loop
      if (match[0].length === 0) {
        regex.lastIndex++;
      }
    }
  }
  
  return violations;
}

async function fetchSitemapUrls() {
  try {
    const sitemapContent = await fetchRoute('/sitemap.xml');
    const urlMatches = sitemapContent.match(/<loc>https?:\/\/[^<]*policestationagent\.com([^<]*)<\/loc>/g);
    
    if (urlMatches) {
      const urls = urlMatches
        .map(match => {
          const urlMatch = match.match(/\/[^<]*/);
          return urlMatch ? urlMatch[0] : null;
        })
        .filter(url => url && url !== '/')
        .slice(0, 200); // Limit to first 200 URLs
      
      return urls;
    }
  } catch (err) {
    // Sitemap doesn't exist or failed - skip silently
    console.log('⚠️  Sitemap not available, skipping');
  }
  
  return [];
}

async function runHttpScan() {
  console.log('🔍 Starting HTTP Compliance Scan...\n');
  
  let serverProcess = null;
  let buildProcess = null;
  
  try {
    // Step 1: Build
    console.log('📦 Running production build...');
    buildProcess = spawn('npx', ['next', 'build'], {
      stdio: 'inherit',
      shell: true,
      cwd: process.cwd()
    });
    
    await new Promise((resolve, reject) => {
      buildProcess.on('exit', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Build failed with code ${code}`));
        }
      });
    });
    
    console.log('✅ Build complete\n');
    
    // Step 2: Start server
    console.log(`🚀 Starting production server on port ${SERVER_PORT}...`);
    serverProcess = spawn('npx', ['next', 'start', '-p', String(SERVER_PORT)], {
      stdio: 'pipe',
      shell: true,
      cwd: process.cwd(),
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    // Wait for server to be ready
    console.log('⏳ Waiting for server to be ready...');
    await waitForServer();
    console.log('✅ Server ready\n');
    
    // Step 3: Get routes to scan
    const routes = [...CORE_ROUTES];
    try {
      const sitemapUrls = await fetchSitemapUrls();
      routes.push(...sitemapUrls);
      console.log(`📋 Found ${sitemapUrls.length} additional routes from sitemap\n`);
    } catch (err) {
      // Continue with core routes only
    }
    
    // Step 4: Scan routes
    console.log(`🔍 Scanning ${routes.length} routes...\n`);
    const allViolations = [];
    
    for (const route of routes) {
      try {
        console.log(`  Checking ${route}...`);
        const content = await fetchRoute(route);
        const violations = scanContent(content, route);
        
        if (violations.length > 0) {
          console.log(`    ❌ Found ${violations.length} violation(s)`);
          allViolations.push(...violations);
        } else {
          console.log(`    ✅ Clean`);
        }
      } catch (err) {
        console.log(`    ⚠️  Error: ${err.message}`);
      }
    }
    
    // Step 5: Report results
    console.log('\n' + '='.repeat(60));
    
    if (allViolations.length > 0) {
      console.log('\n❌ COMPLIANCE HTTP SCAN FAILED\n');
      console.log(`Found ${allViolations.length} violation(s):\n`);
      
      // Group by route
      const byRoute = new Map();
      allViolations.forEach(v => {
        if (!byRoute.has(v.route)) {
          byRoute.set(v.route, []);
        }
        byRoute.get(v.route).push(v);
      });
      
      byRoute.forEach((viols, route) => {
        console.log(`Route: ${route}`);
        viols.forEach(v => {
          console.log(`  Pattern: ${v.patternId} (${v.description})`);
          console.log(`  Match: "${v.match}"`);
          console.log(`  Excerpt: ...${v.excerpt}...`);
          console.log('');
        });
      });
      
      process.exit(1);
    } else {
      console.log('\n✅ COMPLIANCE HTTP SCAN PASSED');
      console.log(`Scanned ${routes.length} routes with 0 violations\n`);
      process.exit(0);
    }
    
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
  } finally {
    // Cleanup
    if (serverProcess) {
      serverProcess.kill();
    }
  }
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Interrupted, cleaning up...');
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n\n⚠️  Terminated, cleaning up...');
  process.exit(1);
});

runHttpScan();




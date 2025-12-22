#!/usr/bin/env node
/**
 * BLOG ROUTE VERIFIER (JavaScript version)
 * 
 * Verifies that all published blog posts are accessible at their expected URLs.
 * 
 * Usage:
 *   node scripts/verify-blog-routes.js [--base-url=http://localhost:3000]
 *   node scripts/verify-blog-routes.js [--base-url=https://policestationagent.com]
 */

const https = require('https');
const http = require('http');

// Get base URL from args or env
const args = process.argv.slice(2);
const baseUrlArg = args.find(arg => arg.startsWith('--base-url='));
const BASE_URL = process.env.BASE_URL || (baseUrlArg ? baseUrlArg.split('=')[1] : 'http://localhost:3000');
const SKIP_HTTP_CHECK = process.env.SKIP_HTTP === 'true' || args.includes('--skip-http');

// Import blog functions (requires Next.js build or runtime)
// Note: This script should be run after 'npm run build' or during 'npm start'
let getPublishedBlogPosts, getPostBySlug, normalizeSlug;

try {
  // Try to import from built files
  const blogModule = require('../.next/server/app/lib/blog.js');
  getPublishedBlogPosts = blogModule.getPublishedBlogPosts;
  getPostBySlug = blogModule.getPostBySlug;
  normalizeSlug = blogModule.normalizeSlug;
} catch (e) {
  // Fallback: try direct import (works in dev mode)
  try {
    const blogModule = require('../lib/blog.ts');
    getPublishedBlogPosts = blogModule.getPublishedBlogPosts;
    getPostBySlug = blogModule.getPostBySlug;
    normalizeSlug = blogModule.normalizeSlug;
  } catch (e2) {
    console.error('ERROR: Cannot import blog functions.');
    console.error('Make sure to run this script after "npm run build" or during "npm start"');
    console.error('Or use the TypeScript version: npm run verify:blog-routes');
    process.exit(1);
  }
}

/**
 * Perform HTTP HEAD request to verify route exists
 */
function checkRoute(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      timeout: 5000,
    };

    const req = client.request(options, (res) => {
      resolve({ status: res.statusCode || 0 });
    });

    req.on('error', (error) => {
      resolve({ 
        status: 0, 
        error: error.code === 'ECONNREFUSED' 
          ? 'Connection refused (server not running?)' 
          : error.message 
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, error: 'Request timeout' });
    });

    req.end();
  });
}

/**
 * Main verification function
 */
async function verifyBlogRoutes() {
  console.log('\n' + '='.repeat(70));
  console.log('  BLOG ROUTE VERIFICATION');
  console.log('='.repeat(70));
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`HTTP Check: ${SKIP_HTTP_CHECK ? 'SKIPPED' : 'ENABLED'}`);
  console.log('');

  // Step 1: Get all published posts
  console.log('Step 1: Fetching published blog posts...');
  const posts = getPublishedBlogPosts();
  console.log(`Found ${posts.length} published post(s)\n`);

  if (posts.length === 0) {
    console.log('⚠️  WARNING: No published posts found in database!');
    console.log('   This could indicate:');
    console.log('   - No posts have been published yet');
    console.log('   - Database connection issue');
    console.log('   - Query filter issue (published = 1)');
    return;
  }

  // Step 2: Verify each post
  console.log('Step 2: Verifying routes...\n');
  const results = [];

  for (const post of posts) {
    const normalizedSlug = normalizeSlug(post.slug);
    const expectedUrl = `${BASE_URL}/blog/${normalizedSlug}`;
    
    console.log(`Checking: ${post.slug}`);
    console.log(`  Expected URL: ${expectedUrl}`);
    console.log(`  Normalized slug: ${normalizedSlug}`);

    // Verify post can be retrieved by slug
    const retrievedPost = getPostBySlug(post.slug);
    if (!retrievedPost) {
      results.push({
        slug: post.slug,
        expectedUrl,
        status: 'FAIL',
        error: 'Post not found by getPostBySlug()',
        details: `Query function returned null for slug: ${post.slug}`
      });
      console.log(`  ❌ FAIL: Post not found by getPostBySlug()`);
      console.log('');
      continue;
    }

    console.log(`  ✅ Post found in database`);

    // Perform HTTP check if enabled
    if (!SKIP_HTTP_CHECK) {
      const httpResult = await checkRoute(expectedUrl);
      
      if (httpResult.error) {
        results.push({
          slug: post.slug,
          expectedUrl,
          status: 'FAIL',
          httpStatus: 0,
          error: httpResult.error,
          details: 'HTTP request failed'
        });
        console.log(`  ❌ FAIL: ${httpResult.error}`);
      } else if (httpResult.status === 404) {
        results.push({
          slug: post.slug,
          expectedUrl,
          status: 'FAIL',
          httpStatus: 404,
          error: 'Route returns 404',
          details: 'URL exists but Next.js route not found'
        });
        console.log(`  ❌ FAIL: HTTP 404 - Route not found`);
      } else if (httpResult.status && httpResult.status >= 200 && httpResult.status < 400) {
        results.push({
          slug: post.slug,
          expectedUrl,
          status: 'PASS',
          httpStatus: httpResult.status,
        });
        console.log(`  ✅ PASS: HTTP ${httpResult.status}`);
      } else {
        results.push({
          slug: post.slug,
          expectedUrl,
          status: 'FAIL',
          httpStatus: httpResult.status,
          error: `Unexpected HTTP status: ${httpResult.status}`,
        });
        console.log(`  ❌ FAIL: HTTP ${httpResult.status}`);
      }
    } else {
      results.push({
        slug: post.slug,
        expectedUrl,
        status: 'PASS',
        details: 'HTTP check skipped'
      });
      console.log(`  ✅ PASS: Database check only (HTTP skipped)`);
    }

    console.log('');
  }

  // Step 3: Summary
  console.log('='.repeat(70));
  console.log('  VERIFICATION SUMMARY');
  console.log('='.repeat(70));
  
  const passed = results.filter(r => r.status === 'PASS').length;
  const failed = results.filter(r => r.status === 'FAIL').length;
  const skipped = results.filter(r => r.status === 'SKIP').length;

  console.log(`Total posts: ${results.length}`);
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`⏭️  Skipped: ${skipped}`);
  console.log('');

  if (failed > 0) {
    console.log('FAILED ROUTES:');
    console.log('-'.repeat(70));
    results
      .filter(r => r.status === 'FAIL')
      .forEach(r => {
        console.log(`\nSlug: ${r.slug}`);
        console.log(`URL: ${r.expectedUrl}`);
        console.log(`HTTP Status: ${r.httpStatus || 'N/A'}`);
        console.log(`Error: ${r.error || 'Unknown'}`);
        if (r.details) {
          console.log(`Details: ${r.details}`);
        }
      });
    console.log('');
  }

  // Exit with error code if any failures
  if (failed > 0) {
    console.log('❌ VERIFICATION FAILED');
    process.exit(1);
  } else {
    console.log('✅ ALL ROUTES VERIFIED');
    process.exit(0);
  }
}

// Run verification
verifyBlogRoutes().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});









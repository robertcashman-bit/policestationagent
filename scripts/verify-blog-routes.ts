#!/usr/bin/env node
/**
 * BLOG ROUTE VERIFIER
 * 
 * Verifies that all published blog posts are accessible at their expected URLs.
 * 
 * Usage:
 *   npm run verify-blog-routes [-- --base-url=http://localhost:3000]
 *   npm run verify-blog-routes [-- --base-url=https://policestationagent.com]
 */

import { getPublishedBlogPosts, getPostBySlug, normalizeSlug } from '../lib/blog';
import https from 'https';
import http from 'http';

interface VerificationResult {
  slug: string;
  expectedUrl: string;
  status: 'PASS' | 'FAIL' | 'SKIP';
  httpStatus?: number;
  error?: string;
  details?: string;
}

const BASE_URL = process.env.BASE_URL || process.argv.find(arg => arg.startsWith('--base-url='))?.split('=')[1] || 'http://localhost:3000';
const SKIP_HTTP_CHECK = process.env.SKIP_HTTP === 'true' || process.argv.includes('--skip-http');

/**
 * Perform HTTP HEAD request to verify route exists
 */
function checkRoute(url: string): Promise<{ status: number; error?: string }> {
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

    req.on('error', (error: any) => {
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
async function verifyBlogRoutes(): Promise<void> {
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
  const results: VerificationResult[] = [];

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








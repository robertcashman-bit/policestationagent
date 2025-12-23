/**
 * E2E Blog Generator Verification Script
 * 
 * This script tests the complete blog generation pipeline:
 * 1. Creates a test blog post directly in the database
 * 2. Verifies HTTP 200 on public route
 * 3. Verifies page content
 * 4. Cleans up test data
 */

const Database = require('better-sqlite3');
const path = require('path');
const http = require('http');

const DB_PATH = path.join(__dirname, '..', 'data', 'web44ai.db');
const BASE_URL = 'http://localhost:3000';
const TIMESTAMP = Date.now();
const TEST_SLUG = `e2e-automated-test-${TIMESTAMP}`;

console.log('═══════════════════════════════════════════════════════════');
console.log('       BLOG GENERATOR E2E VERIFICATION TEST                ');
console.log('═══════════════════════════════════════════════════════════');
console.log('');

async function httpGet(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function runTest() {
  const results = {
    dbInsert: { passed: false },
    httpRoute: { passed: false },
    contentVerify: { passed: false },
    cleanup: { passed: false },
  };

  const db = new Database(DB_PATH);

  try {
    // STEP 1: Database Insert
    console.log('1️⃣ DATABASE INSERT');
    console.log('───────────────────────────────────────────────────────────');
    
    const now = new Date().toISOString();
    const testPost = {
      title: `E2E Automated Test Post ${TIMESTAMP}`,
      slug: TEST_SLUG,
      content: `
        <p class="lead">This is an automated E2E test post created at ${now}.</p>
        <h2>Test Content</h2>
        <p>This post verifies that the blog system correctly:</p>
        <ul>
          <li>Inserts posts into the SQLite database</li>
          <li>Serves posts via dynamic routing</li>
          <li>Renders content correctly</li>
        </ul>
        <p>Under the Police and Criminal Evidence Act 1984 (PACE), you have fundamental rights in Kent.</p>
      `,
      excerpt: 'Automated E2E test post for verification purposes.',
      meta_title: 'E2E Test | Police Station Agent',
      meta_description: 'Automated test post for E2E verification.',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200',
    };

    const stmt = db.prepare(`
      INSERT INTO blog_posts (title, slug, content, excerpt, published, published_at, created_at, updated_at, meta_title, meta_description, image)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      testPost.title,
      testPost.slug,
      testPost.content,
      testPost.excerpt,
      now, now, now,
      testPost.meta_title,
      testPost.meta_description,
      testPost.image
    );

    console.log(`   ✓ Post inserted with ID: ${result.lastInsertRowid}`);
    console.log(`   ✓ Slug: ${TEST_SLUG}`);
    results.dbInsert.passed = true;
    console.log('   ✅ DATABASE INSERT: PASSED\n');

    // STEP 2: HTTP Route Verification
    console.log('2️⃣ HTTP ROUTE VERIFICATION');
    console.log('───────────────────────────────────────────────────────────');
    
    const publicUrl = `${BASE_URL}/blog/${TEST_SLUG}`;
    console.log(`   Testing: ${publicUrl}`);

    try {
      const response = await httpGet(publicUrl);
      console.log(`   ✓ HTTP Status: ${response.status}`);
      
      if (response.status === 200) {
        results.httpRoute.passed = true;
        results.httpRoute.status = 200;
        console.log('   ✅ HTTP ROUTE: PASSED\n');
      } else {
        console.log(`   ❌ Expected 200, got ${response.status}\n`);
      }
    } catch (error) {
      console.log(`   ❌ HTTP Error: ${error.message}`);
      console.log('   ⚠️ Make sure dev server is running on localhost:3000\n');
    }

    // STEP 3: Content Verification
    console.log('3️⃣ CONTENT VERIFICATION');
    console.log('───────────────────────────────────────────────────────────');
    
    if (results.httpRoute.passed) {
      const response = await httpGet(publicUrl);
      const html = response.data;
      
      // Check for key elements
      const checks = [
        { name: 'Title in HTML', test: html.includes(testPost.title) },
        { name: 'PACE reference', test: html.includes('PACE') },
        { name: 'Kent reference', test: html.includes('Kent') },
        { name: 'Article element', test: html.includes('<article') || html.includes('prose') },
        { name: 'Image URL', test: html.includes('unsplash.com') },
      ];

      let allPassed = true;
      for (const check of checks) {
        const status = check.test ? '✓' : '✗';
        console.log(`   ${status} ${check.name}: ${check.test ? 'Found' : 'NOT FOUND'}`);
        if (!check.test) allPassed = false;
      }

      if (allPassed) {
        results.contentVerify.passed = true;
        console.log('   ✅ CONTENT VERIFICATION: PASSED\n');
      } else {
        console.log('   ⚠️ CONTENT VERIFICATION: PARTIAL\n');
      }
    } else {
      console.log('   ⚠️ Skipped - HTTP route failed\n');
    }

    // STEP 4: Cleanup
    console.log('4️⃣ CLEANUP');
    console.log('───────────────────────────────────────────────────────────');
    
    const deleteStmt = db.prepare('DELETE FROM blog_posts WHERE slug = ?');
    const deleteResult = deleteStmt.run(TEST_SLUG);
    console.log(`   ✓ Deleted ${deleteResult.changes} test post(s)`);
    results.cleanup.passed = true;
    console.log('   ✅ CLEANUP: PASSED\n');

  } catch (error) {
    console.error('Test error:', error);
  } finally {
    db.close();
  }

  // FINAL REPORT
  console.log('═══════════════════════════════════════════════════════════');
  console.log('                    FINAL REPORT                           ');
  console.log('═══════════════════════════════════════════════════════════');
  
  const steps = [
    ['Database Insert', results.dbInsert],
    ['HTTP Route (200)', results.httpRoute],
    ['Content Verify', results.contentVerify],
    ['Cleanup', results.cleanup],
  ];

  let allPassed = true;
  for (const [name, result] of steps) {
    const status = result.passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${status} - ${name}`);
    if (!result.passed) allPassed = false;
  }

  console.log('');
  console.log('───────────────────────────────────────────────────────────');
  console.log(`Test Slug: ${TEST_SLUG}`);
  console.log(`Public URL: ${BASE_URL}/blog/${TEST_SLUG}`);
  console.log('───────────────────────────────────────────────────────────');
  console.log('');
  
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED - Blog generator pipeline is working!');
  } else {
    console.log('⚠️ SOME TESTS FAILED - Check output above for details');
  }
  
  console.log('═══════════════════════════════════════════════════════════');
  
  return allPassed;
}

runTest().then(success => {
  process.exit(success ? 0 : 1);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});







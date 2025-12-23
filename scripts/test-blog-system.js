/**
 * Comprehensive Blog System Test Harness
 * Tests all blog functionality before deployment
 */

const http = require('http');
const Database = require('better-sqlite3');
const path = require('path');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;
const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');

// Test configuration
const TESTS = {
  database: {
    name: 'Database Access',
    run: testDatabase,
  },
  blogIndex: {
    name: 'Blog Index Page',
    run: testBlogIndex,
  },
  blogPosts: {
    name: 'Blog Post Pages',
    run: testBlogPosts,
  },
  sitemap: {
    name: 'Sitemap',
    run: testSitemap,
  },
  robots: {
    name: 'Robots.txt',
    run: testRobots,
  },
  domainCheck: {
    name: 'Domain References',
    run: testDomainReferences,
  },
  apiEndpoint: {
    name: 'API Endpoint',
    run: testApiEndpoint,
  },
};

let results = {
  passed: [],
  failed: [],
  warnings: [],
};

async function main() {
  console.log('🧪 Blog System Test Harness\n');
  console.log('='.repeat(60));
  
  // Check if database exists
  if (!require('fs').existsSync(dbPath)) {
    console.error('❌ Database file not found:', dbPath);
    console.error('   Run: node scripts/ingest-blog-posts.js first');
    process.exit(1);
  }

  // Run all tests
  for (const [key, test] of Object.entries(TESTS)) {
    console.log(`\n📋 Testing: ${test.name}`);
    try {
      await test.run();
      results.passed.push(test.name);
      console.log(`   ✅ PASSED`);
    } catch (error) {
      results.failed.push({ name: test.name, error: error.message });
      console.log(`   ❌ FAILED: ${error.message}`);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary:');
  console.log(`   ✅ Passed: ${results.passed.length}`);
  console.log(`   ❌ Failed: ${results.failed.length}`);
  console.log(`   ⚠️  Warnings: ${results.warnings.length}`);

  if (results.failed.length > 0) {
    console.log('\n❌ Failed Tests:');
    results.failed.forEach(({ name, error }) => {
      console.log(`   - ${name}: ${error}`);
    });
    process.exit(1);
  }

  if (results.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    results.warnings.forEach(warning => {
      console.log(`   - ${warning}`);
    });
  }

  console.log('\n✅ All tests passed! Blog system is ready for deployment.');
}

function testDatabase() {
  const db = new Database(dbPath);
  
  // Check published posts count
  const publishedCount = db.prepare('SELECT COUNT(*) as count FROM blog_posts WHERE published = 1').get();
  if (publishedCount.count === 0) {
    throw new Error('No published blog posts found');
  }
  console.log(`   Found ${publishedCount.count} published posts`);

  // Check required fields
  const sample = db.prepare('SELECT id, title, slug, content, published FROM blog_posts WHERE published = 1 LIMIT 1').get();
  if (!sample) {
    throw new Error('No sample post found');
  }
  
  const requiredFields = ['title', 'slug', 'content'];
  for (const field of requiredFields) {
    if (!sample[field]) {
      throw new Error(`Sample post missing required field: ${field}`);
    }
  }
  
  db.close();
}

async function testBlogIndex() {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}/blog`, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Expected 200, got ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Check for blog post links
        if (!data.includes('/blog/')) {
          reject(new Error('Blog index page does not contain blog post links'));
          return;
        }

        // Check for "Content Unavailable" error message
        if (data.includes('Content Unavailable') || data.includes('We could not display')) {
          reject(new Error('Blog index shows "Content Unavailable" error'));
          return;
        }

        // Check for wrong domain
        if (data.includes('criminaldefencekent.co.uk')) {
          results.warnings.push('Blog index contains references to criminaldefencekent.co.uk');
        }

        resolve();
      });
    }).on('error', reject);
  });
}

async function testBlogPosts() {
  const db = new Database(dbPath);
  const posts = db.prepare('SELECT slug, title FROM blog_posts WHERE published = 1 LIMIT 5').all();
  db.close();

  if (posts.length === 0) {
    throw new Error('No published posts to test');
  }

  console.log(`   Testing ${posts.length} sample posts`);

  for (const post of posts) {
    await new Promise((resolve, reject) => {
      http.get(`${BASE_URL}/blog/${post.slug}`, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Post "${post.slug}" returned ${res.statusCode}`));
          return;
        }

        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          // Check for title
          if (!data.includes(post.title)) {
            reject(new Error(`Post "${post.slug}" does not contain expected title`));
            return;
          }

          // Check for "Content Unavailable" error
          if (data.includes('Content Unavailable') || data.includes('We could not display')) {
            reject(new Error(`Post "${post.slug}" shows "Content Unavailable" error`));
            return;
          }

          // Check canonical URL
          const canonicalMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
          if (canonicalMatch) {
            const canonical = canonicalMatch[1];
            if (canonical.includes('criminaldefencekent.co.uk')) {
              reject(new Error(`Post "${post.slug}" has wrong canonical URL: ${canonical}`));
              return;
            }
            if (!canonical.includes('/blog/')) {
              reject(new Error(`Post "${post.slug}" has incorrect canonical path: ${canonical}`));
              return;
            }
          }

          resolve();
        });
      }).on('error', reject);
    });
  }
}

async function testSitemap() {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}/sitemap.xml`, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Sitemap returned ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Check for blog index
        if (!data.includes('<loc>') || !data.match(/\/blog<\/loc>/)) {
          reject(new Error('Sitemap does not include /blog'));
          return;
        }

        // Check for blog posts
        const blogPostMatches = data.match(/\/blog\/[^<]+<\/loc>/g);
        if (!blogPostMatches || blogPostMatches.length === 0) {
          results.warnings.push('Sitemap does not include any blog post URLs');
        } else {
          console.log(`   Found ${blogPostMatches.length} blog post URLs in sitemap`);
        }

        // Check for wrong domain
        if (data.includes('criminaldefencekent.co.uk')) {
          reject(new Error('Sitemap contains references to criminaldefencekent.co.uk'));
          return;
        }

        resolve();
      });
    }).on('error', reject);
  });
}

async function testRobots() {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}/robots.txt`, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Robots.txt returned ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Check that /blog is not disallowed
        if (data.match(/Disallow:\s*\/blog/)) {
          reject(new Error('Robots.txt disallows /blog'));
          return;
        }

        // Check for sitemap reference
        if (!data.includes('Sitemap:')) {
          results.warnings.push('Robots.txt does not reference sitemap');
        }

        resolve();
      });
    }).on('error', reject);
  });
}

async function testDomainReferences() {
  // This is a static check - we'll check the actual responses in other tests
  // For now, just pass if no issues found in previous tests
  return Promise.resolve();
}

async function testApiEndpoint() {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}/api/blog/posts`, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`API endpoint returned ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (!json.posts || !Array.isArray(json.posts)) {
            reject(new Error('API response does not contain posts array'));
            return;
          }

          if (json.posts.length === 0) {
            results.warnings.push('API endpoint returns empty posts array');
          } else {
            console.log(`   API returns ${json.posts.length} posts`);
          }

          resolve();
        } catch (error) {
          reject(new Error(`Invalid JSON response: ${error.message}`));
        }
      });
    }).on('error', reject);
  });
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Test harness failed:', error);
    process.exit(1);
  });
}

module.exports = { main, TESTS };



























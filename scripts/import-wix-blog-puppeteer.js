/**
 * Import blog posts from Wix using Puppeteer
 * Handles JavaScript-rendered content properly
 */

const puppeteer = require('puppeteer');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const SITEMAP_URL = 'https://robertdcashman.wixsite.com/website/blog-posts-sitemap.xml';
const BASE_URL = 'https://robertdcashman.wixsite.com/website';

// Initialize database
const dbPath = path.join(__dirname, '..', 'data', 'web44ai.db');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new Database(dbPath);

// Ensure blog_posts table exists
db.exec(`
  CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author_id INTEGER,
    published BOOLEAN DEFAULT 0,
    published_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    meta_title TEXT,
    meta_description TEXT
  )
`);

db.exec(`CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);`);

/**
 * Fetch sitemap and extract post URLs
 */
async function getPostUrls() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(SITEMAP_URL, { waitUntil: 'networkidle0' });
    const content = await page.content();
    
    // Parse XML to extract URLs
    const urlMatches = content.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g);
    const posts = [];
    
    for (const match of urlMatches) {
      const url = match[1];
      if (url.includes('/post/')) {
        const slug = url.split('/post/')[1];
        const lastmodMatch = content.match(new RegExp(`<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\/loc>[\\s\\S]*?<lastmod>([^<]+)<\/lastmod>`));
        const lastmod = lastmodMatch ? lastmodMatch[1] : null;
        posts.push({ url, slug, lastmod });
      }
    }
    
    await browser.close();
    return posts;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

/**
 * Extract post content from a rendered page
 */
async function extractPost(page, url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForSelector('article, h1, main', { timeout: 10000 }).catch(() => {});
    
    const post = await page.evaluate(() => {
      const result = {
        title: '',
        content: '',
        excerpt: '',
        published_at: null,
      };

      // Extract title
      const h1 = document.querySelector('h1');
      if (h1) {
        result.title = h1.textContent.trim();
      } else {
        const title = document.querySelector('title');
        if (title) {
          result.title = title.textContent.trim();
        }
      }

      // Extract date
      const timeTag = document.querySelector('time');
      if (timeTag) {
        result.published_at = timeTag.textContent.trim();
      }

      // Look for "Updated:" text
      const bodyText = document.body.textContent;
      const updatedMatch = bodyText.match(/Updated:\s*([^\n]+)/i);
      if (updatedMatch && !result.published_at) {
        result.published_at = updatedMatch[1].trim();
      }

      // Extract main content
      const article = document.querySelector('article');
      if (article) {
        // Clone to avoid modifying original
        const clone = article.cloneNode(true);
        
        // Remove unwanted elements
        clone.querySelectorAll('nav, footer, header, script, style, .social-share, button').forEach(el => el.remove());
        
        // Get HTML content
        result.content = clone.innerHTML;
        
        // Extract excerpt from first paragraph
        const firstP = clone.querySelector('p');
        if (firstP) {
          result.excerpt = firstP.textContent.trim().substring(0, 200);
        }
      } else {
        // Fallback: try main element
        const main = document.querySelector('main');
        if (main) {
          const clone = main.cloneNode(true);
          clone.querySelectorAll('nav, footer, header, script, style').forEach(el => el.remove());
          result.content = clone.innerHTML;
          
          const firstP = clone.querySelector('p');
          if (firstP) {
            result.excerpt = firstP.textContent.trim().substring(0, 200);
          }
        }
      }

      return result;
    });

    // Parse date
    if (post.published_at) {
      try {
        const date = new Date(post.published_at);
        if (!isNaN(date.getTime())) {
          post.published_at = date.toISOString();
        } else {
          // Try parsing formats like "Sep 6" or "Dec 1"
          const dateStr = post.published_at.trim();
          const monthMap = {
            'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
          };
          const match = dateStr.match(/(\w+)\s+(\d+)/);
          if (match) {
            const [, month, day] = match;
            const monthIndex = monthMap[month.substring(0, 3)];
            if (monthIndex !== undefined) {
              const now = new Date();
              post.published_at = new Date(now.getFullYear(), monthIndex, parseInt(day)).toISOString();
            }
          }
        }
      } catch (e) {
        post.published_at = null;
      }
    }

    return post;
  } catch (error) {
    console.error(`Error extracting ${url}:`, error.message);
    return null;
  }
}

/**
 * Generate SEO-safe slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

/**
 * Import a single post
 */
async function importPost(page, postUrl, slug, lastmod) {
  try {
    const post = await extractPost(page, postUrl);
    
    if (!post || !post.title) {
      console.warn(`  ⚠ Skipping: No title found`);
      return null;
    }

    if (!post.content || post.content.length < 100) {
      console.warn(`  ⚠ Skipping: Insufficient content`);
      return null;
    }

    // Use slug from URL or generate from title
    const finalSlug = slug || generateSlug(post.title);

    // Check if already exists
    const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(finalSlug);
    if (existing) {
      console.log(`  ✓ Already exists: ${finalSlug}`);
      return { slug: finalSlug, exists: true };
    }

    // Use lastmod from sitemap if no date found
    const publishedAt = post.published_at || (lastmod ? new Date(lastmod).toISOString() : new Date().toISOString());

    // Insert into database
    const stmt = db.prepare(`
      INSERT INTO blog_posts 
      (title, slug, content, excerpt, published, published_at, meta_title, meta_description, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    const metaDescription = post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 160);

    stmt.run(
      post.title,
      finalSlug,
      post.content,
      post.excerpt || null,
      publishedAt,
      post.title,
      metaDescription
    );

    console.log(`  ✓ Imported: ${post.title}`);
    return { slug: finalSlug, title: post.title };
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Wix Blog Import (Puppeteer)');
  console.log('='.repeat(60));

  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  try {
    // Get all post URLs
    console.log('\nFetching sitemap...');
    const posts = await getPostUrls();
    console.log(`Found ${posts.length} posts\n`);

    const imported = [];
    const skipped = [];
    const errors = [];

    // Import each post
    for (let i = 0; i < posts.length; i++) {
      const { url, slug, lastmod } = posts[i];
      console.log(`[${i + 1}/${posts.length}] ${slug}`);
      
      const result = await importPost(page, url, slug, lastmod);
      
      if (result) {
        if (result.exists) {
          skipped.push(result);
        } else {
          imported.push(result);
        }
      } else {
        errors.push({ slug, error: 'Import failed' });
      }

      // Delay between requests
      if (i < posts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total posts: ${posts.length}`);
    console.log(`✓ Imported: ${imported.length}`);
    console.log(`⊘ Already existed: ${skipped.length}`);
    console.log(`✗ Errors: ${errors.length}`);

    if (imported.length > 0) {
      console.log(`\nNewly imported:`);
      imported.forEach(p => console.log(`  - ${p.title} (/${p.slug})`));
    }

    if (errors.length > 0) {
      console.log(`\nErrors:`);
      errors.forEach(e => console.log(`  - ${e.slug}: ${e.error}`));
    }

    await browser.close();
    db.close();
    
    console.log('\n✓ Import complete!');
  } catch (error) {
    console.error('Fatal error:', error);
    await browser.close();
    db.close();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { getPostUrls, importPost };















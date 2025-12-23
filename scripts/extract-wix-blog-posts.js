/**
 * Extract all blog posts from Wix sitemap and import them
 * Uses the blog-posts-sitemap.xml to discover all posts
 */

const https = require('https');
const { parseString } = require('xml2js');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const { JSDOM } = require('jsdom');

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
 * Fetch XML from URL
 */
function fetchXML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

/**
 * Fetch HTML from URL
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

/**
 * Parse sitemap XML to extract post URLs
 */
async function getPostUrlsFromSitemap() {
  console.log('Fetching sitemap...');
  const xml = await fetchXML(SITEMAP_URL);
  
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      
      const urls = [];
      if (result.urlset && result.urlset.url) {
        for (const urlEntry of result.urlset.url) {
          const loc = urlEntry.loc && urlEntry.loc[0];
          if (loc && loc.includes('/post/')) {
            const slug = loc.split('/post/')[1];
            const lastmod = urlEntry.lastmod && urlEntry.lastmod[0];
            urls.push({ url: loc, slug, lastmod });
          }
        }
      }
      resolve(urls);
    });
  });
}

/**
 * Extract post content from HTML
 */
function extractPostContent(html, url) {
  const dom = new JSDOM(html);
  const document = dom.window.document;
  
  const post = {
    title: '',
    content: '',
    excerpt: '',
    published_at: null,
    slug: '',
  };

  // Extract slug from URL
  const slugMatch = url.match(/\/([^\/]+)$/);
  if (slugMatch) {
    post.slug = slugMatch[1];
  }

  // Extract title
  const h1 = document.querySelector('h1');
  if (h1) {
    post.title = h1.textContent.trim();
  } else {
    const titleTag = document.querySelector('title');
    if (titleTag) {
      post.title = titleTag.textContent.trim();
    }
  }

  // Extract date
  const timeTag = document.querySelector('time');
  if (timeTag) {
    const dateText = timeTag.textContent.trim();
    try {
      post.published_at = new Date(dateText).toISOString();
    } catch (e) {
      // Try parsing common formats
      if (dateText.match(/\w+\s+\d+/)) {
        // Format like "Sep 6" or "Sep 17"
        const now = new Date();
        const [month, day] = dateText.split(' ');
        const monthMap = {
          'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
          'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };
        if (monthMap[month.substring(0, 3)]) {
          post.published_at = new Date(now.getFullYear(), monthMap[month.substring(0, 3)], parseInt(day)).toISOString();
        }
      }
    }
  }

  // Look for "Updated:" text
  const updatedMatch = html.match(/Updated:\s*([^<\n]+)/i);
  if (updatedMatch && !post.published_at) {
    try {
      post.published_at = new Date(updatedMatch[1].trim()).toISOString();
    } catch (e) {
      // Ignore
    }
  }

  // Extract main content
  const article = document.querySelector('article');
  if (article) {
    // Get all paragraphs and headings
    const contentElements = article.querySelectorAll('p, h2, h3, h4, ul, ol, blockquote');
    const contentParts = [];
    
    contentElements.forEach(el => {
      const tagName = el.tagName.toLowerCase();
      const text = el.textContent.trim();
      
      if (text && text.length > 10) { // Filter out very short text
        if (tagName.startsWith('h')) {
          const level = parseInt(tagName.charAt(1));
          const prefix = '#'.repeat(level) + ' ';
          contentParts.push(`<${tagName}>${text}</${tagName}>`);
        } else {
          contentParts.push(`<${tagName}>${text}</${tagName}>`);
        }
      }
    });
    
    post.content = contentParts.join('\n\n');
    
    // Extract excerpt from first paragraph
    const firstP = article.querySelector('p');
    if (firstP) {
      post.excerpt = firstP.textContent.trim().substring(0, 200);
    }
  } else {
    // Fallback: try to find main content area
    const main = document.querySelector('main');
    if (main) {
      const paragraphs = main.querySelectorAll('p');
      const contentParts = [];
      paragraphs.forEach(p => {
        const text = p.textContent.trim();
        if (text && text.length > 10) {
          contentParts.push(`<p>${text}</p>`);
        }
      });
      post.content = contentParts.join('\n\n');
      if (paragraphs[0]) {
        post.excerpt = paragraphs[0].textContent.trim().substring(0, 200);
      }
    }
  }

  // If no content found, use body text as fallback
  if (!post.content) {
    const body = document.body;
    if (body) {
      const text = body.textContent.trim();
      // Remove navigation and footer content
      const mainText = text.split('View More')[0].split('Social Bar')[0];
      post.content = `<p>${mainText.substring(0, 5000)}</p>`;
      post.excerpt = mainText.substring(0, 200);
    }
  }

  return post;
}

/**
 * Generate SEO-safe slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

/**
 * Import a single blog post
 */
async function importPost(postUrl, lastmod) {
  try {
    console.log(`\nFetching: ${postUrl}`);
    const html = await fetchHTML(postUrl);
    const post = extractPostContent(html, postUrl);

    if (!post.title) {
      console.warn(`  ⚠ Skipping: No title found`);
      return null;
    }

    if (!post.content || post.content.length < 50) {
      console.warn(`  ⚠ Skipping: Insufficient content (${post.content.length} chars)`);
      return null;
    }

    // Generate slug if missing
    if (!post.slug) {
      post.slug = generateSlug(post.title);
    }

    // Use lastmod from sitemap if no date found
    if (!post.published_at && lastmod) {
      post.published_at = new Date(lastmod).toISOString();
    }

    // Check if post already exists
    const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(post.slug);
    if (existing) {
      console.log(`  ✓ Already exists: ${post.slug}`);
      return { slug: post.slug, exists: true };
    }

    // Insert into database
    const stmt = db.prepare(`
      INSERT INTO blog_posts 
      (title, slug, content, excerpt, published, published_at, meta_title, meta_description, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    const metaDescription = post.excerpt || post.content.replace(/<[^>]+>/g, '').substring(0, 160);

    stmt.run(
      post.title,
      post.slug,
      post.content,
      post.excerpt || null,
      post.published_at || new Date().toISOString(),
      post.title,
      metaDescription
    );

    console.log(`  ✓ Imported: ${post.title}`);
    console.log(`    Slug: /blog/${post.slug}`);
    return { slug: post.slug, title: post.title };
  } catch (error) {
    console.error(`  ✗ Error: ${error.message}`);
    return null;
  }
}

/**
 * Main import function
 */
async function main() {
  console.log('='.repeat(60));
  console.log('Wix Blog Import Script');
  console.log('='.repeat(60));

  try {
    // Get all post URLs from sitemap
    const posts = await getPostUrlsFromSitemap();
    console.log(`\nFound ${posts.length} posts in sitemap\n`);

    const imported = [];
    const skipped = [];
    const errors = [];

    // Import each post
    for (let i = 0; i < posts.length; i++) {
      const { url, slug, lastmod } = posts[i];
      console.log(`[${i + 1}/${posts.length}] Processing: ${slug}`);
      
      const result = await importPost(url, lastmod);
      
      if (result) {
        if (result.exists) {
          skipped.push(result);
        } else {
          imported.push(result);
        }
      } else {
        errors.push({ slug, error: 'Import failed' });
      }

      // Be respectful - add delay between requests
      if (i < posts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('IMPORT SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total posts in sitemap: ${posts.length}`);
    console.log(`✓ Successfully imported: ${imported.length}`);
    console.log(`⊘ Already existed: ${skipped.length}`);
    console.log(`✗ Errors: ${errors.length}`);

    if (imported.length > 0) {
      console.log(`\nNewly imported posts:`);
      imported.forEach(p => console.log(`  - ${p.title}`));
      console.log(`    URLs: /blog/${imported.map(p => p.slug).join(', /blog/')}`);
    }

    if (errors.length > 0) {
      console.log(`\nPosts with errors:`);
      errors.forEach(e => console.log(`  - ${e.slug}: ${e.error}`));
    }

    console.log('\n' + '='.repeat(60));
    console.log('Import complete!');
    console.log('='.repeat(60));
    
    // Close database
    db.close();
  } catch (error) {
    console.error('Fatal error:', error);
    db.close();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { getPostUrlsFromSitemap, importPost, extractPostContent };






























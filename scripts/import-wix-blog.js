/**
 * Import blog posts from Wix site
 * This script extracts all blog posts from https://robertdcashman.wixsite.com/website/blog
 * and imports them into the Next.js database
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');
const db = require('../lib/db');

// Known blog post URLs from the archive
const KNOWN_POSTS = [
  'understanding-police-cautions-in-england-a-comprehensive-guide-to-their-meaning-and-consequences',
  'understanding-community-resolutions-and-their-impact-on-dbs-checks-and-employment',
  'the-hidden-risks-of-voluntary-police-interviews-in-the-uk-you-need-to-know',
  'the-role-of-higher-court-advocates-in-the-uk',
  // We'll discover more from the archive pages
];

const BASE_URL = 'https://robertdcashman.wixsite.com/website';

/**
 * Fetch HTML from a URL
 */
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    };

    const req = client.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

/**
 * Extract post data from HTML
 */
function extractPostData(html, url) {
  const post = {
    title: '',
    content: '',
    excerpt: '',
    published_at: null,
    slug: '',
    images: [],
  };

  // Extract title from <h1> or <title>
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                     html.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) {
    post.title = titleMatch[1].trim();
  }

  // Extract slug from URL
  const slugMatch = url.match(/\/([^\/]+)$/);
  if (slugMatch) {
    post.slug = slugMatch[1];
  }

  // Extract date from meta tags or content
  const dateMatch = html.match(/<time[^>]*>([^<]+)<\/time>/i) ||
                    html.match(/Updated:\s*([^<]+)/i) ||
                    html.match(/Published:\s*([^<]+)/i);
  if (dateMatch) {
    try {
      post.published_at = new Date(dateMatch[1].trim()).toISOString();
    } catch (e) {
      // Try to parse common date formats
      const dateStr = dateMatch[1].trim();
      if (dateStr.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
        const [day, month, year] = dateStr.split('/');
        post.published_at = new Date(year, month - 1, day).toISOString();
      }
    }
  }

  // Extract main content - look for article content
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    post.content = articleMatch[1];
  } else {
    // Fallback: extract content between common markers
    const contentMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i) ||
                         html.match(/<div[^>]*class="[^"]*post[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (contentMatch) {
      post.content = contentMatch[1];
    }
  }

  // Extract excerpt (first paragraph)
  const excerptMatch = post.content.match(/<p[^>]*>([^<]+)<\/p>/i);
  if (excerptMatch) {
    post.excerpt = excerptMatch[1].trim().substring(0, 200);
  }

  // Extract images
  const imgMatches = html.matchAll(/<img[^>]+src="([^"]+)"[^>]*>/gi);
  for (const match of imgMatches) {
    const src = match[1];
    if (src && !src.includes('data:image') && !src.includes('placeholder')) {
      post.images.push(src);
    }
  }

  return post;
}

/**
 * Clean and sanitize HTML content
 */
function sanitizeHTML(html) {
  // Remove script tags
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
  // Remove style tags
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
  // Remove Wix-specific elements
  html = html.replace(/<wix-[^>]*>[\s\S]*?<\/wix-[^>]*>/gi, '');
  // Clean up extra whitespace
  html = html.replace(/\s+/g, ' ');
  return html.trim();
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
async function importPost(postUrl) {
  try {
    console.log(`Fetching: ${postUrl}`);
    const html = await fetchHTML(postUrl);
    const post = extractPostData(html, postUrl);

    if (!post.title || !post.content) {
      console.warn(`Skipping ${postUrl}: Missing title or content`);
      return null;
    }

    // Generate slug if missing
    if (!post.slug) {
      post.slug = generateSlug(post.title);
    }

    // Sanitize content
    post.content = sanitizeHTML(post.content);

    // Check if post already exists
    const existing = db.prepare('SELECT id FROM blog_posts WHERE slug = ?').get(post.slug);
    if (existing) {
      console.log(`Post already exists: ${post.slug}`);
      return { slug: post.slug, exists: true };
    }

    // Insert into database
    const stmt = db.prepare(`
      INSERT INTO blog_posts 
      (title, slug, content, excerpt, published, published_at, meta_title, meta_description, created_at, updated_at)
      VALUES (?, ?, ?, ?, 1, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    const metaDescription = post.excerpt || post.content.substring(0, 160).replace(/<[^>]+>/g, '');

    stmt.run(
      post.title,
      post.slug,
      post.content,
      post.excerpt || null,
      post.published_at || new Date().toISOString(),
      post.title,
      metaDescription
    );

    console.log(`✓ Imported: ${post.title}`);
    return { slug: post.slug, title: post.title };
  } catch (error) {
    console.error(`Error importing ${postUrl}:`, error.message);
    return null;
  }
}

/**
 * Main import function
 */
async function main() {
  console.log('Starting Wix blog import...\n');

  const imported = [];
  const errors = [];

  // Import known posts
  for (const postSlug of KNOWN_POSTS) {
    const postUrl = `${BASE_URL}/post/${postSlug}`;
    const result = await importPost(postUrl);
    if (result) {
      if (result.exists) {
        console.log(`  (already exists)`);
      } else {
        imported.push(result);
      }
    } else {
      errors.push({ slug: postSlug, error: 'Import failed' });
    }
    // Be respectful - add delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n✓ Import complete!`);
  console.log(`  Imported: ${imported.length}`);
  console.log(`  Errors: ${errors.length}`);
  
  if (imported.length > 0) {
    console.log(`\nImported posts:`);
    imported.forEach(p => console.log(`  - ${p.title} (/${p.slug})`));
  }

  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.forEach(e => console.log(`  - ${e.slug}: ${e.error}`));
  }
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { importPost, extractPostData, generateSlug };



















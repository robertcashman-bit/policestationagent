/**
 * Clean Blog Posts - Remove Social Media Icons and Fix Image Blur
 * 
 * Removes:
 * - Social media emoji (hearts, etc.)
 * - Social media buttons/links
 * - Blur filters from images
 */

const fs = require('fs');
const path = require('path');

const BLOG_POSTS_FILE = path.join(process.cwd(), 'data', 'blog-posts-full.json');
const PUBLIC_BLOG_POSTS_FILE = path.join(process.cwd(), 'public', 'blog-posts-full.json');

function cleanContent(content) {
  if (!content || typeof content !== 'string') return content;
  
  let cleaned = content;
  
  // Remove social media emoji (hearts, etc.)
  cleaned = cleaned.replace(/[❤💙💚💛💜🖤🤍❤️💙️💚️💛️💜️🖤️🤍️]/g, '');
  
  // Remove social media engagement text patterns (more aggressive)
  cleaned = cleaned.replace(/\d+\s*views?/gi, '');
  cleaned = cleaned.replace(/\d+\s*like[s]?\.?\s*Post\s+not\s+marked\s+as\s+liked\d*/gi, '');
  cleaned = cleaned.replace(/Post\s+not\s+marked\s+as\s+liked\d*/gi, '');
  cleaned = cleaned.replace(/\d+\s*like[s]?/gi, '');
  
  // Remove any text containing "views" or "like" with numbers nearby
  cleaned = cleaned.replace(/[^<>\s]*\d+[^<>\s]*\s*(views?|like[s]?)[^<>]*/gi, '');
  
  // Remove social media buttons/links (common patterns)
  // Remove divs with social/share classes - be more aggressive
  cleaned = cleaned.replace(/<div[^>]*class[^>]*share[^>]*>.*?<\/div>/gis, '');
  cleaned = cleaned.replace(/<div[^>]*class[^>]*social[^>]*>.*?<\/div>/gis, '');
  cleaned = cleaned.replace(/<div[^>]*class[^>]*emoji[^>]*>.*?<\/div>/gis, '');
  
  // Remove entire sections containing social media icons (Facebook, X/Twitter, LinkedIn, etc.)
  // Look for sections with multiple social icons
  cleaned = cleaned.replace(/<[^>]+>.*?(facebook|twitter|linkedin|paperclip|printer|eye|views?|like[s]?).*?(facebook|twitter|linkedin|paperclip|printer|eye|views?|like[s]?).*?<\/[^>]+>/gis, '');
  
  // Remove SVG icons for social media (Facebook f, X/Twitter, LinkedIn, etc.)
  cleaned = cleaned.replace(/<svg[^>]*>.*?(facebook|twitter|linkedin|x-logo|paperclip|printer|eye|share).*?<\/svg>/gis, '');
  
  // Remove anchor tags with social media classes or hrefs
  cleaned = cleaned.replace(/<a[^>]*(href|class)[^>]*(facebook|twitter|linkedin|share|social)[^>]*>.*?<\/a>/gis, '');
  
  // Remove spans with social/emoji classes
  cleaned = cleaned.replace(/<span[^>]*class[^>]*(share|social|emoji)[^>]*>.*?<\/span>/gis, '');
  
  // Remove entire sections that might contain social media (look for patterns like "Share this" or "Like this")
  cleaned = cleaned.replace(/<[^>]*>.*?(share|like|follow).*?this.*?<\/[^>]+>/gis, '');
  
  // Remove vertical lists of social icons (common pattern: multiple icons in a row)
  // Look for patterns with Facebook, X, LinkedIn icons together
  cleaned = cleaned.replace(/(<[^>]+>.*?)?(facebook|f\s+logo|x\s+logo|linkedin|in\s+logo).*?(facebook|f\s+logo|x\s+logo|linkedin|in\s+logo).*?(facebook|f\s+logo|x\s+logo|linkedin|in\s+logo).*?(<\/[^>]+>)?/gis, '');
  
  // Remove any div/section containing both social icons AND view/like counts
  cleaned = cleaned.replace(/<div[^>]*>.*?(facebook|twitter|linkedin|x-logo|paperclip|printer|eye).*?(\d+\s*views?|\d+\s*like).*?<\/div>/gis, '');
  cleaned = cleaned.replace(/<section[^>]*>.*?(facebook|twitter|linkedin|x-logo|paperclip|printer|eye).*?(\d+\s*views?|\d+\s*like).*?<\/section>/gis, '');
  
  // Remove any container that has multiple social media elements (Facebook, X, LinkedIn together)
  // This catches the vertical widget shown in the image
  cleaned = cleaned.replace(/<[^>]+>.*?(?:facebook|f\s+logo|x\s+logo|twitter|linkedin|in\s+logo).*?(?:facebook|f\s+logo|x\s+logo|twitter|linkedin|in\s+logo).*?(?:facebook|f\s+logo|x\s+logo|twitter|linkedin|in\s+logo|paperclip|printer|eye|views?|like).*?<\/[^>]+>/gis, '');
  
  // Remove standalone social media icon containers (any element with just social icons)
  cleaned = cleaned.replace(/<[^>]+(?:class|id)=[^>]*(?:facebook|twitter|linkedin|x-logo|share|social)[^>]*>.*?<\/[^>]+>/gis, '');
  
  // Remove any element containing paperclip, printer, or eye icons (these are part of the widget)
  cleaned = cleaned.replace(/<[^>]+>.*?(?:paperclip|printer|eye\s+icon).*?<\/[^>]+>/gis, '');
  
  // Remove entire social media widget blocks (look for patterns with icons + numbers + text)
  // Pattern: icons followed by numbers and "views"/"like" text
  cleaned = cleaned.replace(/<[^>]+>.*?(?:facebook|twitter|linkedin|x|paperclip|printer|eye).*?\d+.*?(?:views?|like).*?<\/[^>]+>/gis, '');
  
  // Remove any nested structure containing social widgets (multiple levels deep)
  cleaned = cleaned.replace(/<div[^>]*>.*?<[^>]+>.*?(?:facebook|twitter|linkedin|x-logo|paperclip|printer|eye).*?(\d+\s*views?|\d+\s*like|Post\s+not\s+marked).*?<\/[^>]+>.*?<\/div>/gis, '');
  
  // Remove blur filters from images
  cleaned = cleaned.replace(/style=["'][^"']*blur[^"']*["']/gi, (match) => {
    // Remove blur-related styles but keep other styles
    return match.replace(/filter:\s*blur\([^)]+\)/gi, '').replace(/backdrop-filter:\s*blur\([^)]+\)/gi, '').trim();
  });
  
  // Remove blur from inline filter styles
  cleaned = cleaned.replace(/filter:\s*blur\([^)]+\)/gi, '');
  cleaned = cleaned.replace(/backdrop-filter:\s*blur\([^)]+\)/gi, '');
  
  // Remove image blur classes (but keep the class attribute if it has other classes)
  cleaned = cleaned.replace(/class=["']([^"']*\b)blur\w*(\b[^"']*)["']/gi, (match, before, after) => {
    const newClasses = (before + after).replace(/\s+/g, ' ').trim();
    return newClasses ? `class="${newClasses}"` : '';
  });
  
  // Clean up multiple spaces
  cleaned = cleaned.replace(/\s+/g, ' ');
  
  return cleaned;
}

function cleanBlogPosts() {
  console.log('Cleaning blog posts...\n');
  
  // Read blog posts
  const posts = JSON.parse(fs.readFileSync(BLOG_POSTS_FILE, 'utf8'));
  let cleaned = 0;
  
  posts.forEach((post, idx) => {
    if (!post.content) return;
    
    const original = post.content;
    post.content = cleanContent(post.content);
    
    // Also clean FAQ content if it exists
    if (post.faq_content) {
      post.faq_content = cleanContent(post.faq_content);
    }
    
    if (post.content !== original || (post.faq_content && post.faq_content !== original)) {
      cleaned++;
      console.log(`  ✓ Cleaned: ${post.slug || post.title || `Post ${idx}`}`);
    }
  });
  
  // Write back
  fs.writeFileSync(BLOG_POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
  console.log(`\n✅ Cleaned ${cleaned} posts in ${BLOG_POSTS_FILE}`);
  
  // Also update public file if it exists
  if (fs.existsSync(PUBLIC_BLOG_POSTS_FILE)) {
    const publicPosts = JSON.parse(fs.readFileSync(PUBLIC_BLOG_POSTS_FILE, 'utf8'));
    let publicCleaned = 0;
    
    publicPosts.forEach((post, idx) => {
      if (!post.content) return;
      
      const original = post.content;
      post.content = cleanContent(post.content);
      
      if (post.faq_content) {
        post.faq_content = cleanContent(post.faq_content);
      }
      
      if (post.content !== original || (post.faq_content && post.faq_content !== original)) {
        publicCleaned++;
      }
    });
    
    fs.writeFileSync(PUBLIC_BLOG_POSTS_FILE, JSON.stringify(publicPosts, null, 2), 'utf8');
    console.log(`✅ Cleaned ${publicCleaned} posts in ${PUBLIC_BLOG_POSTS_FILE}`);
  }
  
  console.log('\n✨ Done!');
}

cleanBlogPosts();


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
  
  // STEP 1: Remove ALL heart/emoji symbols (safe - these are always social widgets)
  cleaned = cleaned.replace(/[❤💙💚💛💜🖤🤍❤️💙️💚️💛️💜️🖤️🤍️♥️💕💖💗💘💝💞💟🧡🤎💔❣️💓💌]/g, '');
  cleaned = cleaned.replace(/&#x2764;|&#9829;|&hearts;/gi, '');
  
  // STEP 2: Remove social media widget HTML containers ONLY
  // Only remove HTML elements that clearly contain social widgets, not standalone text
  
  // Remove divs/sections with social/share/social-media classes (these are widget containers)
  cleaned = cleaned.replace(/<div[^>]*class[^>]*\b(share|social|social-media|social-share)\b[^>]*>.*?<\/div>/gis, '');
  cleaned = cleaned.replace(/<section[^>]*class[^>]*\b(share|social|social-media|social-share)\b[^>]*>.*?<\/section>/gis, '');
  
  // Remove containers that have multiple social icons together (Facebook + X + LinkedIn pattern)
  // This matches the vertical widget shown in the image
  cleaned = cleaned.replace(/<[^>]+>.*?(?:facebook|twitter|linkedin|x-logo|f\s+logo|in\s+logo).*?(?:facebook|twitter|linkedin|x-logo|f\s+logo|in\s+logo).*?(?:facebook|twitter|linkedin|x-logo|f\s+logo|in\s+logo|paperclip|printer|eye).*?<\/[^>]+>/gis, '');
  
  // Remove containers with social icons AND view/like counts together (the widget pattern)
  cleaned = cleaned.replace(/<[^>]+>.*?(?:facebook|twitter|linkedin|x-logo|paperclip|printer|eye).*?\d+\s*(?:views?|like[s]?).*?<\/[^>]+>/gis, '');
  cleaned = cleaned.replace(/<[^>]+>.*?\d+\s*(?:views?|like[s]?).*?(?:facebook|twitter|linkedin|x-logo|paperclip|printer|eye).*?<\/[^>]+>/gis, '');
  
  // Remove nested divs containing social widgets (multiple levels)
  cleaned = cleaned.replace(/<div[^>]*>.*?<[^>]+>.*?(?:facebook|twitter|linkedin|x-logo|paperclip|printer|eye).*?\d+\s*(?:views?|like[s]?|Post\s+not\s+marked).*?<\/[^>]+>.*?<\/div>/gis, '');
  
  // Remove "Post not marked as liked" text (always part of widget)
  cleaned = cleaned.replace(/Post\s+not\s+marked\s+as\s+liked\d*/gi, '');
  
  // Remove SVG icons for social media (Facebook f, X/Twitter, LinkedIn, etc.)
  cleaned = cleaned.replace(/<svg[^>]*>.*?(?:facebook|twitter|linkedin|x-logo|paperclip|printer|eye|share).*?<\/svg>/gis, '');
  
  // Remove anchor tags with social media hrefs or classes
  cleaned = cleaned.replace(/<a[^>]*(?:href|class)=[^>]*(?:facebook|twitter|linkedin|share|social)[^>]*>.*?<\/a>/gis, '');
  
  // Remove spans/divs with social media icon classes
  cleaned = cleaned.replace(/<(?:span|div)[^>]*class[^>]*\b(share|social|emoji|facebook|twitter|linkedin)\b[^>]*>.*?<\/(?:span|div)>/gis, '');
  
  // Remove elements containing paperclip, printer, or eye icons (part of widget)
  cleaned = cleaned.replace(/<[^>]+>.*?(?:paperclip|printer|eye\s+icon).*?<\/[^>]+>/gis, '');
  
  // IMPORTANT: Do NOT remove standalone text containing "views" or "like" 
  // Only remove when it's clearly in a social widget HTML container (already done above)
  
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


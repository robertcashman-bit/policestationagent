const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, '..', 'data', 'blog-posts-full.json');
const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Function to generate comprehensive SEO meta description (150-160 characters)
function generateSEODescription(title, content) {
  const titleLower = title.toLowerCase();
  
  // Topic-specific SEO descriptions
  const descriptions = {
    'bail': 'Expert guide to police bail in England and Wales. Learn about bail conditions, breaches, and your legal rights. Free legal advice available from accredited duty solicitors.',
    'voluntary interview': 'Complete guide to voluntary police interviews in the UK. Understand your rights, what to expect, and why you need a solicitor. Free legal advice under Legal Aid.',
    'duty solicitor': 'What is a duty solicitor? Learn about free legal representation at police stations and courts in Kent. Accredited solicitors available 24/7 under Legal Aid.',
    'property return': 'How to get your property returned from the police in the UK. Understand your rights under PACE 1984. Free legal advice from accredited police station representatives.',
    'caution': 'Understanding police cautions in England and Wales. Learn about the implications, types of cautions, and your rights. Free legal advice available.',
    'police station representation': 'Expert police station representation across Kent. Free legal advice under Legal Aid. Accredited duty solicitors available 24/7 at all Kent custody suites.',
    'disclosure': 'Why police station disclosure matters. Learn how a solicitor can obtain crucial information about your case before interview. Free legal advice available.',
    'police contacted': 'The police have contacted you? Know your rights and what to do. Free legal advice from accredited police station representatives in Kent.',
    'arrest': 'What to do if you are arrested in Kent. Know your rights under PACE 1984. Free legal advice from accredited duty solicitors available 24/7.',
    'common assault': 'Understanding common assault in English law. Learn about the definition, penalties, and your legal rights. Free legal advice available.',
    'no further action': 'What does no further action mean after a police interview? Understand the implications and your rights. Free legal advice available.',
    'released under investigation': 'Understanding released under investigation (RUI) versus police bail. Learn about the differences and your rights. Free legal advice available.'
  };
  
  // Match topic
  for (const [key, desc] of Object.entries(descriptions)) {
    if (titleLower.includes(key)) {
      return desc;
    }
  }
  
  // Extract meaningful content for generic description
  const textContent = (content || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const firstParagraph = textContent.split('.')[0] || textContent.substring(0, 100);
  
  // Create SEO-friendly description
  const keywords = titleLower.split(' ').slice(0, 4).join(' ');
  return `Expert legal advice on ${keywords} in Kent, UK. Free police station representation under Legal Aid. Accredited duty solicitors available 24/7.`;
}

// Function to ensure content has proper SEO structure
function optimizeContentSEO(content, title) {
  if (!content) return content;
  
  // Ensure first paragraph is strong and keyword-rich
  let optimized = content;
  
  // Add schema markup hints in comments (for future implementation)
  if (!content.includes('<!--')) {
    optimized = `<!-- Blog post about ${title} -->\n${optimized}`;
  }
  
  // Ensure images have proper alt text
  optimized = optimized.replace(/<img([^>]*)>/gi, (match, attrs) => {
    if (!attrs.includes('alt=')) {
      return `<img${attrs} alt="${title}">`;
    }
    return match;
  });
  
  return optimized;
}

// Enhance all posts
let updated = 0;
const enhancedPosts = posts.map((post) => {
  const changes = {};
  
  // Update meta description to be SEO-optimized (150-160 chars)
  const currentDesc = post.meta_description || post.excerpt || '';
  if (!currentDesc || currentDesc.length < 100 || currentDesc.length > 200) {
    const newDesc = generateSEODescription(post.title, post.content || '');
    if (newDesc !== currentDesc) {
      changes.meta_description = newDesc;
      updated++;
    }
  }
  
  // Optimize content for SEO
  if (post.content) {
    const optimized = optimizeContentSEO(post.content, post.title);
    if (optimized !== post.content) {
      changes.content = optimized;
      updated++;
    }
  }
  
  // Ensure meta title is SEO-friendly
  if (post.meta_title) {
    const metaTitle = post.meta_title;
    // Ensure it's not too long (max 60 chars for SEO)
    if (metaTitle.length > 60) {
      changes.meta_title = metaTitle.substring(0, 57) + '...';
      updated++;
    }
  }
  
  // Return updated post
  if (Object.keys(changes).length > 0) {
    return { ...post, ...changes };
  }
  
  return post;
});

// Write enhanced posts back
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Finalized SEO for ${updated} blog posts.`);
console.log(`Total posts: ${posts.length}`);

// Verify SEO elements
const postsWithGoodMetaDesc = enhancedPosts.filter(p => {
  const desc = p.meta_description || '';
  return desc.length >= 100 && desc.length <= 200;
}).length;

const postsWithImages = enhancedPosts.filter(p => {
  return p.content && p.content.includes('<img');
}).length;

console.log(`\nSEO Verification:`);
console.log(`- Posts with optimized meta descriptions (100-200 chars): ${postsWithGoodMetaDesc}/${posts.length}`);
console.log(`- Posts with images: ${postsWithImages}/${posts.length}`);
console.log(`- Posts with featured images: ${enhancedPosts.filter(p => p.image).length}/${posts.length}`);


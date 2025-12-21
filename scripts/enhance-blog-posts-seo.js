const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, '..', 'data', 'blog-posts-full.json');
const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Available blog images
const blogImages = [
  '/blog-images/blog-listing-0.jpg',
  '/blog-images/blog-listing-1.png',
  '/blog-images/blog-listing-2.png',
  '/blog-images/blog-listing-3.png',
  '/blog-images/blog-listing-4.png',
  '/blog-images/blog-listing-5.png',
  '/blog-images/blog-listing-6.png',
  '/blog-images/blog-listing-7.png'
];

// Function to get relevant image based on topic
function getImageForTopic(title, slug, index) {
  const titleLower = title.toLowerCase();
  const slugLower = slug.toLowerCase();
  
  // Use index to cycle through images for variety
  return blogImages[index % blogImages.length];
}

// Function to generate SEO-optimized meta description
function generateMetaDescription(title, content) {
  const titleLower = title.toLowerCase();
  
  // Extract first meaningful paragraph from content
  const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const firstSentence = textContent.split('.')[0];
  
  // Create SEO-friendly descriptions based on topic
  if (titleLower.includes('bail')) {
    return `Expert guide to police bail in England and Wales. Learn about bail conditions, breaches, and your legal rights. Free legal advice available.`;
  } else if (titleLower.includes('voluntary') && titleLower.includes('interview')) {
    return `Complete guide to voluntary police interviews in the UK. Understand your rights, what to expect, and why you need a solicitor. Free legal advice.`;
  } else if (titleLower.includes('duty solicitor')) {
    return `What is a duty solicitor? Learn about free legal representation at police stations and courts. Accredited solicitors available 24/7.`;
  } else if (titleLower.includes('property') && titleLower.includes('return')) {
    return `How to get your property returned from the police. Understand your rights under PACE 1984. Free legal advice available.`;
  } else if (titleLower.includes('caution')) {
    return `Understanding police cautions in England and Wales. Learn about the implications, types of cautions, and your rights. Legal advice available.`;
  } else if (titleLower.includes('police station representation') || titleLower.includes('police station rep')) {
    return `Expert police station representation across Kent. Free legal advice under Legal Aid. Accredited duty solicitors available 24/7.`;
  } else if (titleLower.includes('disclosure')) {
    return `Why police station disclosure matters. Learn how a solicitor can obtain crucial information about your case before interview. Free legal advice.`;
  } else if (titleLower.includes('arrest') || titleLower.includes('contacted')) {
    return `The police have contacted you? Know your rights and what to do. Free legal advice from accredited police station representatives.`;
  }
  
  // Default SEO description
  const keywords = titleLower.split(' ').slice(0, 5).join(' ');
  return `Expert legal advice on ${keywords} in Kent, UK. Free police station representation under Legal Aid. Accredited duty solicitors available 24/7.`;
}

// Function to enhance content with images and better structure
function enhanceContent(content, title, slug) {
  // If content already has images, preserve them
  if (content.includes('<img') || content.includes('image')) {
    return content;
  }
  
  // Add relevant image based on topic
  const titleLower = title.toLowerCase();
  let imageHtml = '';
  let imageAlt = title;
  
  if (titleLower.includes('bail')) {
    imageAlt = 'Police bail conditions and legal rights';
    imageHtml = `<figure class="blog-image">
      <img src="/blog-images/blog-listing-0.jpg" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>Understanding police bail is crucial for protecting your rights</figcaption>
    </figure>`;
  } else if (titleLower.includes('voluntary') || titleLower.includes('interview')) {
    imageAlt = 'Voluntary police interview legal advice';
    imageHtml = `<figure class="blog-image">
      <img src="/blog-images/blog-listing-1.png" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>Free legal representation available for voluntary police interviews</figcaption>
    </figure>`;
  } else if (titleLower.includes('duty solicitor')) {
    imageAlt = 'Duty solicitor representation at police station';
    imageHtml = `<figure class="blog-image">
      <img src="/blog-images/blog-listing-2.png" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>Accredited duty solicitors provide free legal advice</figcaption>
    </figure>`;
  } else if (titleLower.includes('property')) {
    imageAlt = 'Getting property returned from police';
    imageHtml = `<figure class="blog-image">
      <img src="/blog-images/blog-listing-3.png" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>Understanding your rights regarding seized property</figcaption>
    </figure>`;
  } else if (titleLower.includes('caution')) {
    imageAlt = 'Police caution legal implications';
    imageHtml = `<figure class="blog-image">
      <img src="/blog-images/blog-listing-4.png" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>Understanding police cautions and their impact</figcaption>
    </figure>`;
  } else {
    // Default image
    imageAlt = title;
    imageHtml = `<figure class="blog-image">
      <img src="/blog-images/blog-listing-5.png" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>Expert legal advice for police station matters</figcaption>
    </figure>`;
  }
  
  // Insert image after first heading or at the beginning
  if (content.includes('<h2>')) {
    const h2Index = content.indexOf('<h2>');
    const afterH2 = content.indexOf('>', h2Index) + 1;
    return content.slice(0, afterH2) + '\n' + imageHtml + '\n' + content.slice(afterH2);
  } else {
    return imageHtml + '\n' + content;
  }
}

// Function to add SEO keywords based on topic
function getKeywords(title, slug) {
  const titleLower = title.toLowerCase();
  const baseKeywords = ['police station', 'legal advice', 'Kent', 'duty solicitor', 'criminal law'];
  
  if (titleLower.includes('bail')) {
    return [...baseKeywords, 'police bail', 'bail conditions', 'bail breach', 'PACE 1984'];
  } else if (titleLower.includes('voluntary') || titleLower.includes('interview')) {
    return [...baseKeywords, 'voluntary interview', 'police interview', 'interview under caution', 'PACE Code C'];
  } else if (titleLower.includes('duty solicitor')) {
    return [...baseKeywords, 'duty solicitor', 'legal aid', 'police station rep', 'accredited solicitor'];
  } else if (titleLower.includes('property')) {
    return [...baseKeywords, 'property seizure', 'property return', 'PACE section 19'];
  } else if (titleLower.includes('caution')) {
    return [...baseKeywords, 'police caution', 'criminal record', 'simple caution', 'conditional caution'];
  }
  
  return baseKeywords;
}

// Enhance all posts
let updated = 0;
const enhancedPosts = posts.map((post, index) => {
  const changes = {};
  
  // Add/update meta description if missing or too short
  if (!post.meta_description || post.meta_description.length < 50) {
    changes.meta_description = generateMetaDescription(post.title, post.content || '');
    updated++;
  }
  
  // Add featured image if missing
  if (!post.image) {
    changes.image = getImageForTopic(post.title, post.slug, index);
    updated++;
  }
  
  // Enhance content with images
  if (post.content && !post.content.includes('<img')) {
    const enhanced = enhanceContent(post.content, post.title, post.slug);
    if (enhanced !== post.content) {
      changes.content = enhanced;
      updated++;
    }
  }
  
  // Update meta title if missing
  if (!post.meta_title || post.meta_title === post.title) {
    // Create SEO-optimized title
    const titleLower = post.title.toLowerCase();
    if (!titleLower.includes('kent') && !titleLower.includes('uk')) {
      changes.meta_title = `${post.title} | Kent Police Station Legal Advice`;
    } else {
      changes.meta_title = post.title;
    }
    updated++;
  }
  
  // Return updated post
  if (Object.keys(changes).length > 0) {
    return { ...post, ...changes };
  }
  
  return post;
});

// Write enhanced posts back
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Enhanced ${updated} blog posts with SEO, images, and improved content.`);
console.log(`Total posts processed: ${posts.length}`);

// Generate summary
const postsWithImages = enhancedPosts.filter(p => p.content && p.content.includes('<img')).length;
const postsWithMetaDesc = enhancedPosts.filter(p => p.meta_description && p.meta_description.length > 50).length;
const postsWithFeaturedImage = enhancedPosts.filter(p => p.image).length;

console.log(`\nSummary:`);
console.log(`- Posts with images in content: ${postsWithImages}`);
console.log(`- Posts with meta descriptions: ${postsWithMetaDesc}`);
console.log(`- Posts with featured images: ${postsWithFeaturedImage}`);


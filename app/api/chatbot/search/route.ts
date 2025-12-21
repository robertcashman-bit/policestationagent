import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load FAQ content - extract from FAQContent.tsx
function loadFAQContent() {
  try {
    const faqPath = path.join(process.cwd(), 'app', 'faq', 'FAQContent.tsx');
    const faqContent = fs.readFileSync(faqPath, 'utf8');
    
    const faqItems: Array<{ question: string; answer: string }> = [];
    
    // Extract FAQ items using regex - handle both single and double quotes, and multiline strings
    // Use [\s\S] instead of . with s flag for ES2017 compatibility
    const faqPattern = /question:\s*['"`]([^'"`]+)['"`]\s*,\s*answer:\s*['"`]([\s\S]*?)['"`]/g;
    let match;
    
    while ((match = faqPattern.exec(faqContent)) !== null) {
      const question = match[1].trim();
      let answer = match[2].trim();
      
      // Handle escaped quotes and newlines
      answer = answer.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"');
      
      if (question && answer) {
        faqItems.push({ question, answer });
      }
    }
    
    // Also try to extract from sections structure
    const sectionsPattern = /items:\s*\[(.*?)\]/gs;
    const sectionsMatch = sectionsPattern.exec(faqContent);
    
    if (sectionsMatch && faqItems.length === 0) {
      // Fallback: extract all question/answer pairs more aggressively
      const allQuestions = faqContent.matchAll(/question:\s*['"`]([^'"`]+)['"`]/g);
      const allAnswers = faqContent.matchAll(/answer:\s*['"`]([^'"`]+)['"`]/gs);
      
      const questions = Array.from(allQuestions).map(m => m[1].trim());
      const answers = Array.from(allAnswers).map(m => {
        let ans = m[1].trim();
        return ans.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"');
      });
      
      questions.forEach((q, i) => {
        if (answers[i] && q && answers[i]) {
          faqItems.push({ question: q, answer: answers[i] });
        }
      });
    }
    
    return faqItems;
  } catch (error) {
    console.error('Error loading FAQ:', error);
    return [];
  }
}

// Load blog posts
function loadBlogPosts() {
  try {
    const blogPath = path.join(process.cwd(), 'data', 'blog-posts-full.json');
    if (fs.existsSync(blogPath)) {
      const blogData = fs.readFileSync(blogPath, 'utf8');
      const posts = JSON.parse(blogData);
      return posts.map((post: any) => ({
        title: post.title || '',
        content: post.content || '',
        excerpt: post.excerpt || '',
        slug: post.slug || ''
      }));
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
  return [];
}

// Simple text search function
function searchContent(query: string, content: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerContent = content.toLowerCase();
  
  // Exact phrase match gets highest score
  if (lowerContent.includes(lowerQuery)) {
    return 10;
  }
  
  // Word matches
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  let score = 0;
  queryWords.forEach(word => {
    if (lowerContent.includes(word)) {
      score += 1;
    }
  });
  
  return score;
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json();
    
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }
    
    const searchQuery = query.trim().toLowerCase();
    const results: Array<{ type: string; title: string; content: string; url?: string; score: number }> = [];
    
    // Search FAQ
    const faqItems = loadFAQContent();
    faqItems.forEach(item => {
      const questionScore = searchContent(searchQuery, item.question);
      const answerScore = searchContent(searchQuery, item.answer);
      const totalScore = questionScore * 2 + answerScore; // Questions weighted higher
      
      if (totalScore > 0) {
        results.push({
          type: 'faq',
          title: item.question,
          content: item.answer,
          url: '/faq',
          score: totalScore
        });
      }
    });
    
    // Search blog posts
    const blogPosts = loadBlogPosts();
    blogPosts.forEach((post: any) => {
      const titleScore = searchContent(searchQuery, post.title);
      const contentScore = searchContent(searchQuery, post.content || post.excerpt || '');
      const totalScore = titleScore * 3 + contentScore; // Titles weighted much higher
      
      if (totalScore > 0) {
        // Extract first 200 characters of content
        const content = post.content || post.excerpt || '';
        const excerpt = content.length > 200 ? content.substring(0, 200) + '...' : content;
        
        results.push({
          type: 'blog',
          title: post.title,
          content: excerpt,
          url: `/blog/${post.slug}`,
          score: totalScore
        });
      }
    });
    
    // Sort by score (highest first) and limit to top 5
    results.sort((a, b) => b.score - a.score);
    const topResults = results.slice(0, 5);
    
    // Generate answer from top result
    let answer = '';
    if (topResults.length > 0) {
      const topResult = topResults[0];
      if (topResult.type === 'faq') {
        answer = topResult.content;
      } else {
        answer = `Based on our blog post "${topResult.title}": ${topResult.content}`;
      }
      
      // Add source information
      if (topResults.length > 1) {
        answer += `\n\nFor more information, you can also check our ${topResults.slice(1, 3).map(r => r.type === 'faq' ? 'FAQ' : 'blog').join(' and ')}.`;
      }
    } else {
      // Fallback answer
      answer = 'I couldn\'t find specific information about that in our website content. For detailed questions, please call us on 01732 247427 or visit our FAQ page at /faq.';
    }
    
    return NextResponse.json({
      answer,
      sources: topResults.map(r => ({
        type: r.type,
        title: r.title,
        url: r.url
      }))
    });
  } catch (error) {
    console.error('Error in chatbot search:', error);
    return NextResponse.json(
      { error: 'An error occurred while searching', answer: 'I apologize, but I encountered an error. Please call us on 01732 247427 for immediate assistance.' },
      { status: 500 }
    );
  }
}


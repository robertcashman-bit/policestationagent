import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { processQuery, calculateSearchScore } from '@/lib/chatbot-utils';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  maxTokens: number = 250
): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      max_tokens: maxTokens,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}

function loadFAQContent() {
  try {
    const faqPath = path.join(process.cwd(), 'app', 'faq', 'FAQContent.tsx');
    const faqContent = fs.readFileSync(faqPath, 'utf8');
    
    const faqItems: Array<{ question: string; answer: string }> = [];
    const faqPattern = /question:\s*['"`]([^'"`]+)['"`]\s*,\s*answer:\s*['"`]([\s\S]*?)['"`]/g;
    let match;
    
    while ((match = faqPattern.exec(faqContent)) !== null) {
      const question = match[1].trim();
      let answer = match[2].trim();
      answer = answer.replace(/\\n/g, ' ').replace(/\\'/g, "'").replace(/\\"/g, '"');
      
      if (question && answer) {
        faqItems.push({ question, answer });
      }
    }
    
    return faqItems;
  } catch (error) {
    console.error('Error loading FAQ:', error);
    return [];
  }
}

function loadBlogPosts() {
  try {
    const blogPath = path.join(process.cwd(), 'data', 'blog-posts-full.json');
    if (fs.existsSync(blogPath)) {
      const blogData = fs.readFileSync(blogPath, 'utf8');
      const posts = JSON.parse(blogData);
      return posts.map((post: any) => ({
        title: post.title,
        content: post.content || post.excerpt || '',
        slug: post.slug
      }));
    }
    return [];
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

function stripHTML(html: string): string {
  if (!html) return '';
  let text = html.replace(/<[^>]*>/g, '');
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

export async function POST(request: NextRequest) {
  try {
    const { query, conversationHistory } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const { normalized: searchQuery } = processQuery(query);
    
    const results: Array<{
      type: 'faq' | 'blog';
      title: string;
      content: string;
      url: string;
      score: number;
    }> = [];
    
    // Search FAQ with enhanced scoring
    const faqContent = loadFAQContent();
    faqContent.forEach(item => {
      const questionScore = calculateSearchScore(searchQuery, item.question, true, true);
      const answerScore = calculateSearchScore(searchQuery, item.answer, false, false);
      
      // Boost for specific query patterns
      let boost = 0;
      const queryLower = searchQuery.toLowerCase();
      const questionLower = item.question.toLowerCase();
      
      if ((queryLower.includes('find') || queryLower.includes('information') || queryLower.includes('someone') || queryLower.includes('custody')) &&
          (questionLower.includes('information') || questionLower.includes('someone') || questionLower.includes('arrested') || questionLower.includes('confidential'))) {
        boost = 15;
      }
      
      // Exact question match bonus
      if (queryLower === questionLower || questionLower.includes(queryLower) || queryLower.includes(questionLower.substring(0, 20))) {
        boost += 20;
      }
      
      const totalScore = questionScore * 2.5 + answerScore + boost;
      
      if (totalScore > 10) {
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
      const cleanContent = stripHTML(post.content || post.excerpt || '');
      const titleScore = calculateSearchScore(searchQuery, post.title, true, false);
      const contentScore = calculateSearchScore(searchQuery, cleanContent, false, false);
      const totalScore = titleScore * 2.5 + contentScore;
      
      if (totalScore > 10) {
        const excerpt = cleanContent.length > 300 ? cleanContent.substring(0, 300) + '...' : cleanContent;
        
        results.push({
          type: 'blog',
          title: post.title,
          content: excerpt,
          url: `/blog/${post.slug}`,
          score: totalScore
        });
      }
    });
    
    // Sort by score, then FAQ first
    results.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (a.type === 'faq' && b.type === 'blog') return -1;
      if (a.type === 'blog' && b.type === 'faq') return 1;
      return 0;
    });
    const topResults = results.slice(0, 5);

    // Special handling for "find out about someone in custody" queries
    const queryLower = query.toLowerCase();
    if ((queryLower.includes('find') || queryLower.includes('find out')) && 
        (queryLower.includes('someone') || queryLower.includes('person')) && 
        (queryLower.includes('custody') || queryLower.includes('arrested'))) {
      const confidentialityFAQ = results.find(r => 
        r.type === 'faq' && 
        (r.title.toLowerCase().includes('information') || 
         r.title.toLowerCase().includes('someone') || 
         r.title.toLowerCase().includes('confidential'))
      );
      
      if (confidentialityFAQ) {
        return NextResponse.json({
          answer: `I understand you want to find out about someone in custody. ${stripHTML(confidentialityFAQ.content)}\n\nFor urgent matters, please call **01732 247427**.`,
          sources: [{
            type: confidentialityFAQ.type,
            title: confidentialityFAQ.title,
            url: confidentialityFAQ.url
          }],
          usedAI: false
        });
      }
    }
    
    let answer = '';
    let usedAI = false;
    
    if (topResults.length > 0) {
      if (OPENAI_API_KEY && topResults[0].score > 10) {
        try {
          // Build context - 500 chars per result, top 5 results
          const context = topResults.slice(0, 5).map(r => {
            const content = r.type === 'faq' ? r.content : r.content.substring(0, 500);
            return `Q: ${r.title}\nA: ${stripHTML(content)}`;
          }).join('\n\n');
          
          const conversationContext = conversationHistory && conversationHistory.length > 0
            ? conversationHistory.slice(-3).map((msg: any) => 
                `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
              ).join('\n')
            : '';

          const systemPrompt = `You are a helpful legal assistant for a police station duty solicitor service in Kent, UK. 
Answer questions based ONLY on the provided context from our FAQ and blog posts. 
- Prioritize FAQ answers over blog posts
- Extract direct answers, not summaries
- Be concise (under 150 words)
- If context doesn't answer the question, say: "I don't have specific information about that. Please call 01732 247427."

Use markdown: **bold** for important info, [text](url) for links.`;

          const userPrompt = conversationContext
            ? `Previous conversation:\n${conversationContext}\n\nQuestion: ${query}\n\nContext:\n${context}`
            : `Question: ${query}\n\nContext:\n${context}`;

          const aiAnswer = await callOpenAI([
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ], 250);
          
          if (aiAnswer && aiAnswer.trim().length > 20) {
            answer = aiAnswer.trim();
            usedAI = true;
          }
        } catch (error) {
          console.error('OpenAI failed:', error);
        }
      }
      
      if (!usedAI) {
        const topResult = topResults[0];
        const cleanContent = stripHTML(topResult.content);
        const displayContent = topResult.type === 'faq' 
          ? cleanContent 
          : cleanContent.length > 200 ? cleanContent.substring(0, 200) + '...' : cleanContent;
        
        if (topResult.type === 'faq') {
          answer = displayContent;
        } else {
          answer = `Based on "${topResult.title}": ${displayContent}`;
        }
        
        if (topResults.length > 1 && topResults[1].score > 10) {
          answer += `\n\nFor more info, check our ${topResults.slice(1, 3).map(r => r.type === 'faq' ? '[FAQ](/faq)' : '[blog](/blog)').join(' and ')}.`;
        }
      }
    } else {
      if (OPENAI_API_KEY) {
        try {
          const aiAnswer = await callOpenAI([
            { role: 'system', content: 'You are a helpful legal assistant for a Kent police station solicitor. Be brief and suggest calling 01732 247427.' },
            { role: 'user', content: `Question: ${query}\n\nNo specific info found. Provide a brief response and suggest calling 01732 247427.` }
          ], 150);
          
          if (aiAnswer && aiAnswer.trim().length > 20) {
            answer = aiAnswer.trim();
            usedAI = true;
          }
        } catch (error) {
          console.error('OpenAI fallback failed:', error);
        }
      }
      
      if (!usedAI) {
        answer = 'I don\'t have specific information about that. Please call **01732 247427** for detailed advice.';
      }
    }
    
    return NextResponse.json({
      answer,
      sources: topResults.slice(0, 3).map(r => ({
        type: r.type,
        title: r.title,
        url: r.url
      })),
      usedAI
    });
  } catch (error) {
    console.error('Error in chatbot search:', error);
    return NextResponse.json(
      { error: 'An error occurred', answer: 'Please call **01732 247427** for assistance.' },
      { status: 500 }
    );
  }
}


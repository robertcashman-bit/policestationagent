import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com';

/**
 * Generate URL-friendly slug from text
 */
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

/**
 * Call OpenAI API for content generation
 */
async function callOpenAI(messages: Array<{ role: string; content: string }>, maxTokens: number = 2000): Promise<string> {
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

/**
 * Generate SEO-optimized blog content using AI
 */
async function generateAIContent(formData: any): Promise<{
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
}> {
  const {
    topic,
    primaryKeyword,
    secondaryKeywords,
    location = 'Kent',
    category,
    seoLength = 'optimal',
    includeFAQ,
    includeInternalLinks,
  } = formData;

  // Word count targets
  const wordTargets: Record<string, number> = {
    short: 800,
    optimal: 1200,
    long: 1800,
  };
  const targetWords = wordTargets[seoLength] || 1200;

  // Parse secondary keywords
  const secondaryKeywordsList = secondaryKeywords
    ? secondaryKeywords.split(',').map((k: string) => k.trim()).filter(Boolean)
    : [];

  // Build the content generation prompt
  const contentPrompt = `You are an expert legal content writer specialising in UK criminal law, specifically police station representation and PACE 1984 rights.

Write a comprehensive, SEO-optimized blog article for PoliceStationAgent.com about:

**Topic:** ${topic}
**Primary Keyword:** ${primaryKeyword}
**Secondary Keywords:** ${secondaryKeywordsList.join(', ') || 'duty solicitor, PACE rights, police station representation'}
**Target Location:** ${location}
**Target Word Count:** ${targetWords} words
**Category:** ${category}

**IMPORTANT REQUIREMENTS:**

1. **Content Focus:** Write specifically about "${topic}" - the content must be directly relevant and informative about this exact topic. Do NOT write generic police station advice.

2. **SEO Optimization:**
   - Use the primary keyword "${primaryKeyword}" naturally 3-5 times
   - Include secondary keywords where relevant
   - Use proper heading structure (H2, H3)
   - Include the location "${location}" naturally throughout

3. **Legal Accuracy:**
   - Reference PACE 1984 and relevant UK law accurately
   - Mention specific rights and procedures
   - Be authoritative but accessible

4. **Structure:**
   - Start with an engaging introduction that addresses the reader's concern
   - Use clear H2 headings to organize content
   - Include practical advice and actionable information
   - End with a clear call to action

5. **Author Context:**
   - The author is Robert Cashman, a qualified Duty Solicitor with Higher Rights of Audience (Criminal)
   - He covers all ${location} custody suites including Medway, Maidstone, Canterbury, and Gravesend
   - Available 9am to late, including weekends and bank holidays
   - Phone: 01732 247427

${includeInternalLinks ? `6. **Internal Links:** Include 2-3 relevant internal links to:
   - /services/police-station-representation
   - /services/arrest-advice
   - /services/bail-advice
   - /contact
   Use natural anchor text.` : ''}

**OUTPUT FORMAT:**
Return ONLY the HTML content (no markdown). Use these HTML tags:
- <h2> for main sections
- <h3> for subsections
- <p> for paragraphs
- <ul> and <li> for lists
- <strong> for emphasis
- <a href="..."> for links

Do NOT include <h1> (title will be added separately).
Do NOT include any preamble or explanation, just the HTML content.`;

  // Generate main content
  const content = await callOpenAI([
    { role: 'system', content: 'You are a professional legal content writer for UK criminal defence. Write in British English. Be authoritative, helpful, and SEO-optimized.' },
    { role: 'user', content: contentPrompt },
  ], 3000);

  // Generate SEO meta elements
  const metaPrompt = `For this blog post about "${topic}" targeting "${primaryKeyword}" in ${location}:

Generate:
1. SEO Title (max 60 characters, include primary keyword)
2. Meta Description (max 155 characters, compelling and includes primary keyword)
3. Excerpt (2-3 sentences summarizing the article)

Format your response EXACTLY like this:
TITLE: [your title here]
META: [your meta description here]
EXCERPT: [your excerpt here]`;

  const metaResponse = await callOpenAI([
    { role: 'system', content: 'You are an SEO specialist. Be concise and follow character limits exactly.' },
    { role: 'user', content: metaPrompt },
  ], 500);

  // Parse meta response
  const titleMatch = metaResponse.match(/TITLE:\s*(.+?)(?:\n|$)/i);
  const metaMatch = metaResponse.match(/META:\s*(.+?)(?:\n|$)/i);
  const excerptMatch = metaResponse.match(/EXCERPT:\s*(.+?)(?:\n|$)/i);

  const metaTitle = titleMatch?.[1]?.trim().substring(0, 60) || `${topic} | ${location} Duty Solicitor`;
  const metaDescription = metaMatch?.[1]?.trim().substring(0, 155) || `Expert guidance on ${topic.toLowerCase()} from qualified Duty Solicitor in ${location}. PACE-compliant police station representation.`;
  const excerpt = excerptMatch?.[1]?.trim() || metaDescription;

  // Generate FAQs if requested
  let faqs: Array<{ question: string; answer: string }> = [];
  if (includeFAQ) {
    const faqPrompt = `Generate 4-5 FAQ questions and answers about "${topic}" for someone in ${location} who might be searching for "${primaryKeyword}".

Each FAQ should:
- Address a real concern someone might have about this topic
- Be specific to "${topic}" (not generic police advice)
- Reference UK law (PACE 1984) where relevant
- Be helpful and informative

Format your response EXACTLY like this (use this exact format for each FAQ):
Q: [Question here]
A: [Answer here - 2-3 sentences]

Q: [Question here]
A: [Answer here - 2-3 sentences]

(continue for all FAQs)`;

    const faqResponse = await callOpenAI([
      { role: 'system', content: 'You are a legal FAQ writer. Create clear, helpful FAQs about UK criminal law and police procedures.' },
      { role: 'user', content: faqPrompt },
    ], 1500);

    // Parse FAQs
    const faqPairs = faqResponse.split(/Q:\s*/i).filter(Boolean);
    for (const pair of faqPairs) {
      const parts = pair.split(/A:\s*/i);
      if (parts.length >= 2) {
        const question = parts[0].trim().replace(/\??\s*$/, '?');
        const answer = parts[1].trim().split(/\n\nQ:/i)[0].trim();
        if (question && answer && question.length > 10) {
          faqs.push({ question, answer });
        }
      }
    }
  }

  return {
    title: topic,
    content,
    excerpt,
    metaTitle,
    metaDescription,
    faqs,
  };
}

/**
 * Generate fallback content when AI is not available
 */
function generateFallbackContent(formData: any): {
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
} {
  const {
    topic,
    primaryKeyword,
    secondaryKeywords,
    location = 'Kent',
    includeFAQ,
    includeInternalLinks,
  } = formData;

  const secondaryList = secondaryKeywords?.split(',').map((k: string) => k.trim()).filter(Boolean) || [];

  const content = `
<p class="lead">
  ${topic} is an important topic for anyone facing police investigation in ${location}. 
  Understanding your rights and options is essential for protecting your interests throughout the legal process.
</p>

<h2>Understanding ${topic}</h2>

<p>
  When it comes to ${primaryKeyword}, having expert legal guidance can make a significant difference to the outcome of your case. 
  Under the Police and Criminal Evidence Act 1984 (PACE), you have fundamental rights when dealing with the police, 
  including the right to free and independent legal advice from a qualified solicitor.
</p>

<p>
  ${secondaryList.length > 0 ? `Related matters such as ${secondaryList.slice(0, 2).join(' and ')} are also important considerations. ` : ''}
  As a qualified Duty Solicitor with Higher Rights of Audience (Criminal), I provide expert representation 
  across all ${location} custody suites, ensuring your rights are fully protected.
</p>

<h2>Your Rights and Options</h2>

<p>
  Whether you're attending a voluntary interview or have been arrested, you have the right to:
</p>

<ul>
  <li><strong>Free legal advice</strong> – Available from a qualified solicitor at any police station</li>
  <li><strong>Private consultation</strong> – Speak to your solicitor privately before any interview</li>
  <li><strong>Representation during interview</strong> – Have your solicitor present throughout questioning</li>
  <li><strong>Know the allegations</strong> – Be informed of what you're suspected of</li>
</ul>

<h2>Why Expert Representation Matters</h2>

<p>
  For matters involving ${topic.toLowerCase()}, having a qualified and experienced solicitor is crucial. 
  I have extensive experience handling cases involving ${primaryKeyword} throughout ${location}, 
  including at Medway, Maidstone, Canterbury, and Gravesend police stations.
</p>

<p>
  Unlike agency representatives, I am a fully qualified solicitor who can provide advice and representation 
  not just at the police station, but throughout any subsequent court proceedings if needed.
</p>

${includeInternalLinks ? `
<h2>Getting Help</h2>

<p>
  If you need assistance with ${topic.toLowerCase()} or any other police matter, don't hesitate to seek help. 
  Learn more about <a href="/services/police-station-representation">police station representation</a> or 
  <a href="/contact">contact me directly</a> for immediate assistance.
</p>
` : ''}

<h2>Contact for ${location} Police Station Representation</h2>

<p>
  I provide expert representation at all police stations in ${location} and surrounding areas. 
  Available from 9am to late, seven days a week, including bank holidays.
</p>

<p>
  <strong>Call 01732 247427</strong> for immediate assistance or 
  <strong>text 07535494446</strong> to request a duty solicitor.
</p>
`;

  const metaTitle = `${topic} | ${location} Duty Solicitor`.substring(0, 60);
  const metaDescription = `Expert guidance on ${topic.toLowerCase()} from qualified Duty Solicitor in ${location}. Free legal advice under PACE 1984. Call 01732 247427.`.substring(0, 155);
  const excerpt = `Understanding ${topic.toLowerCase()} is essential when facing police investigation. Get expert legal guidance from a qualified Duty Solicitor in ${location}.`;

  const faqs: Array<{ question: string; answer: string }> = includeFAQ ? [
    {
      question: `What should I know about ${topic.toLowerCase()}?`,
      answer: `${topic} is an important consideration in any police matter. You have the right to free legal advice from a qualified solicitor under PACE 1984, and it's strongly recommended to seek this advice before any police interview.`,
    },
    {
      question: `Can I get free legal advice for ${primaryKeyword}?`,
      answer: `Yes, legal advice at the police station is always free, regardless of your financial circumstances. This includes matters involving ${primaryKeyword}. I provide this service across all ${location} police stations.`,
    },
    {
      question: `How quickly can a solicitor help with ${topic.toLowerCase()} in ${location}?`,
      answer: `I aim to attend all ${location} custody suites promptly. I'm available from 9am to late, including weekends and bank holidays, covering Medway, Maidstone, Canterbury, Gravesend and all Kent police stations.`,
    },
    {
      question: `Why should I use a qualified Duty Solicitor rather than an agency representative?`,
      answer: `A Duty Solicitor is a fully qualified solicitor accredited under the Law Society scheme. I have Higher Rights of Audience (Criminal) and can represent you in court if needed. Agency representatives may not have these qualifications.`,
    },
  ] : [];

  return {
    title: topic,
    content: content.trim(),
    excerpt,
    metaTitle,
    metaDescription,
    faqs,
  };
}

/**
 * Generate the mandatory advert block HTML
 */
function generateAdvertBlock(): string {
  return `
<div class="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
  <h3 class="text-xl font-bold text-slate-900 mb-4">
    PoliceStationAgent.com - Expert Police Station Representation
  </h3>
  
  <p class="text-slate-700 mb-4">
    <strong>I am a qualified Police Station Duty Solicitor, not an agency or unregulated representative.</strong>
    With Higher Rights of Audience (Criminal) and extensive experience, I provide expert representation 
    across all Kent custody suites.
  </p>
  
  <p class="text-slate-700 mb-4">
    As an Accredited Duty Solicitor, I ensure your rights are protected under PACE 1984. My service covers 
    Medway, Maidstone, Canterbury, Gravesend, and all Kent police stations.
  </p>
  
  <div class="flex flex-col sm:flex-row gap-4 mt-6">
    <a href="mailto:robertcashman@defencelegalservices.co.uk" 
       class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition-colors">
      Email for Police Station Representation
    </a>
    <a href="sms:07535494446?body=I need a duty solicitor" 
       class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold transition-colors">
      Send SMS to Request a Duty Solicitor
    </a>
  </div>
  
  <p class="text-sm text-slate-600 mt-4">
    <strong>Call 01732 247427</strong> - Available from 9am to late, including evenings, weekends, and bank holidays.
  </p>
</div>
`;
}

/**
 * Generate comprehensive schema.org structured data
 */
function generateSchema(
  title: string,
  metaDescription: string,
  slug: string,
  faqs: Array<{ question: string; answer: string }>,
  featuredImage: string | null,
  category: string,
  primaryKeyword: string,
  location: string
): any {
  const dateNow = new Date().toISOString();

  // Main Article schema
  const articleSchema: any = {
    '@type': 'Article',
    '@id': `${SITE_URL}/blog/${slug}#article`,
    headline: title,
    description: metaDescription,
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#author`,
      name: 'Robert Cashman',
      jobTitle: 'Duty Solicitor & Higher Court Advocate',
      description: 'Qualified Police Station Duty Solicitor with Higher Rights of Audience (Criminal)',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'LegalService',
      '@id': `${SITE_URL}/#organization`,
      name: 'PoliceStationAgent.com',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
      areaServed: {
        '@type': 'Place',
        name: location || 'Kent',
      },
      serviceType: 'Criminal Defence Solicitor',
    },
    datePublished: dateNow,
    dateModified: dateNow,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    keywords: primaryKeyword,
    articleSection: category,
    inLanguage: 'en-GB',
  };

  if (featuredImage) {
    articleSchema.image = {
      '@type': 'ImageObject',
      url: featuredImage.startsWith('http') ? featuredImage : `${SITE_URL}${featuredImage}`,
    };
  }

  // Build the graph
  const graph: any[] = [articleSchema];

  // Add FAQPage schema if FAQs exist
  if (faqs.length > 0) {
    const faqSchema = {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/blog/${slug}#faq`,
      mainEntity: faqs.map((faq, index) => ({
        '@type': 'Question',
        '@id': `${SITE_URL}/blog/${slug}#faq-${index + 1}`,
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
    graph.push(faqSchema);
  }

  // Add BreadcrumbList schema
  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/blog/${slug}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };
  graph.push(breadcrumbSchema);

  // Add LegalService schema for local SEO
  const legalServiceSchema = {
    '@type': 'LegalService',
    '@id': `${SITE_URL}/#legalservice`,
    name: 'PoliceStationAgent.com',
    description: 'Expert Police Station Representation by qualified Duty Solicitor',
    url: SITE_URL,
    telephone: '01732 247427',
    email: 'robertcashman@defencelegalservices.co.uk',
    areaServed: {
      '@type': 'Place',
      name: location || 'Kent',
    },
    serviceType: ['Criminal Defence', 'Police Station Representation', 'Duty Solicitor'],
    priceRange: 'Free (Legal Aid)',
  };
  graph.push(legalServiceSchema);

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

/**
 * Handle uploaded images - saves to public/blog-images directory
 */
async function handleUploadedImages(files: File[], slug: string): Promise<string[]> {
  const savedUrls: string[] = [];
  const uploadDir = path.join(process.cwd(), 'public', 'blog-images');
  
  await mkdir(uploadDir, { recursive: true });
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const ext = file.name.split('.').pop() || 'jpg';
    const seoFilename = `${slug}-${i + 1}.${ext}`;
    const filePath = path.join(uploadDir, seoFilename);
    
    const arrayBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(arrayBuffer));
    
    savedUrls.push(`/blog-images/${seoFilename}`);
  }
  
  return savedUrls;
}

/**
 * POST handler for blog generation
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let formData: any;
    let uploadedImageUrls: string[] = [];

    // Handle request format
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const multipartData = await request.formData();
      const jsonData = multipartData.get('data');
      if (typeof jsonData === 'string') {
        formData = JSON.parse(jsonData);
      } else {
        return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
      }
      
      const files = multipartData.getAll('uploadedImages') as File[];
      if (files.length > 0) {
        const slug = generateSlug(formData.topic || formData.primaryKeyword);
        uploadedImageUrls = await handleUploadedImages(files, slug);
      }
    } else {
      formData = await request.json();
    }

    // Generate content - use AI if available, fallback otherwise
    let generatedContent;
    let usingAI = false;

    if (OPENAI_API_KEY) {
      try {
        generatedContent = await generateAIContent(formData);
        usingAI = true;
      } catch (aiError) {
        console.error('AI generation failed, using fallback:', aiError);
        generatedContent = generateFallbackContent(formData);
      }
    } else {
      console.log('No OPENAI_API_KEY configured, using fallback content generation');
      generatedContent = generateFallbackContent(formData);
    }

    const { title, content, excerpt, metaTitle, metaDescription, faqs } = generatedContent;
    const slug = generateSlug(formData.topic || formData.primaryKeyword);

    // Append mandatory advert block
    const contentWithAdvert = content + generateAdvertBlock();

    // Handle images
    const allImageUrls = [
      ...uploadedImageUrls,
      ...(formData.imageUrls || []).filter((url: string) => url && url.trim()),
    ];

    let featuredImage: string | null = null;
    if (allImageUrls.length > 0) {
      const featuredIndex = formData.featuredImageIndex ?? 0;
      featuredImage = allImageUrls[featuredIndex] || allImageUrls[0] || null;
    }

    // Generate comprehensive schema
    const schema = generateSchema(
      title,
      metaDescription,
      slug,
      faqs,
      featuredImage,
      formData.category,
      formData.primaryKeyword,
      formData.location
    );

    return NextResponse.json({
      title,
      slug,
      content: contentWithAdvert,
      excerpt,
      metaTitle,
      metaDescription,
      faqs,
      schema,
      image: featuredImage,
      imageUrls: allImageUrls,
      generatedWithAI: usingAI,
      debugInfo,
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}
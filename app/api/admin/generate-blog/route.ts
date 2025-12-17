import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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
 * Generate SEO-optimized meta title (≤60 characters)
 */
function generateMetaTitle(topic: string, location: string): string {
  const base = `${topic} - Police Station Solicitor`;
  if (location && base.length + location.length + 3 <= 60) {
    return `${topic} - ${location} Duty Solicitor`;
  }
  return base.substring(0, 60);
}

/**
 * Generate SEO-optimized meta description (≤155 characters)
 */
function generateMetaDescription(topic: string, primaryKeyword: string, location: string): string {
  const loc = location || 'Kent';
  return `Expert guidance on ${topic.toLowerCase()} from a qualified Duty Solicitor. ${primaryKeyword} advice for ${loc}. PACE-compliant police station representation.`.substring(0, 155);
}

/**
 * Generate blog content structure
 * TODO: Integrate with AI service (OpenAI, Anthropic, etc.)
 */
async function generateBlogContent(formData: any): Promise<string> {
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
    optimal: 1100,
    long: 1500,
  };
  const targetWords = wordTargets[seoLength] || 1100;

  // Build structured HTML content
  const content = `
<h1>${topic}${location ? ` - ${location}` : ''}</h1>

<p class="lead">
  If you've been asked to attend a police station for an interview or have been arrested in ${location || 'Kent'}, 
  understanding your rights is essential. As a qualified Police Station Duty Solicitor with Higher Rights of Audience (Criminal), 
  I provide expert representation to protect your interests throughout the process.
</p>

<h2>Understanding ${topic}</h2>

<p>
  ${primaryKeyword} is a crucial aspect of the criminal justice process. Under the Police and Criminal Evidence Act 1984 (PACE), 
  you have fundamental rights when detained at a police station. These include the right to free legal advice from a qualified 
  solicitor—not an unregulated representative.
</p>

<p>
  Many people don't realise the difference between a qualified Duty Solicitor and an agency representative. As an Accredited 
  Police Station Representative and Duty Solicitor, I am fully qualified to provide advice and representation at police stations 
  across ${location || 'Kent'}, including Medway, Maidstone, Canterbury, and Gravesend custody suites.
</p>

<h2>Your Rights Under PACE 1984</h2>

<ul>
  <li><strong>Right to free legal advice</strong> – Available from a qualified solicitor, not just a representative</li>
  <li><strong>Right to have someone informed</strong> – You can request that a friend or relative is notified of your arrest</li>
  <li><strong>Right to consult the Codes of Practice</strong> – These govern how police must treat you</li>
  <li><strong>Right to silence</strong> – Though the caution explains the potential consequences of remaining silent</li>
</ul>

<h2>Why Choose a Qualified Duty Solicitor?</h2>

<p>
  ${secondaryKeywords ? `When seeking ${secondaryKeywords.split(',')[0]?.trim() || 'legal advice'}, ` : ''}it's important to 
  understand that not all police station representatives are equal. I am:
</p>

<ul>
  <li>A qualified solicitor with Higher Rights of Audience (Criminal)</li>
  <li>An Accredited Police Station Representative under the Law Society scheme</li>
  <li>Experienced in representing clients at all ${location || 'Kent'} custody suites</li>
  <li>Available from 9am to late, including evenings, weekends, and bank holidays</li>
</ul>

${includeInternalLinks ? `
<h2>Related Services</h2>

<p>
  Learn more about <a href="/services/police-station-representation">police station representation</a> and how I can help 
  if you're facing <a href="/services/arrest-advice">arrest or detention</a>. If you need guidance on 
  <a href="/services/bail-advice">bail conditions</a> or <a href="/services/interview-preparation">interview preparation</a>, 
  I provide comprehensive support throughout the process.
</p>
` : ''}

<h2>Getting Help in ${location || 'Kent'}</h2>

<p>
  If you or a family member needs representation at a police station in ${location || 'Kent'}, don't delay in seeking 
  qualified legal advice. The earlier you have a solicitor involved, the better protected your rights will be.
</p>

<p>
  <strong>Contact me directly</strong> for police station representation. I cover all custody suites in ${location || 'Kent'} 
  and surrounding areas, and I'm available from 9am to late, seven days a week.
</p>
`;

  return content.trim();
}

/**
 * Generate FAQ section based on topic
 */
function generateFAQs(topic: string, primaryKeyword: string, location: string): Array<{question: string; answer: string}> {
  return [
    {
      question: `Do I need a solicitor for ${topic.toLowerCase()}?`,
      answer: `Yes, having a qualified Duty Solicitor present is strongly recommended. Free legal advice is your right under PACE 1984, and a solicitor can protect your interests during police questioning.`,
    },
    {
      question: `How quickly can a solicitor attend a police station in ${location || 'Kent'}?`,
      answer: `I aim to attend all ${location || 'Kent'} custody suites promptly. I'm available from 9am to late, including weekends and bank holidays, covering Medway, Maidstone, Canterbury, Gravesend and all Kent police stations.`,
    },
    {
      question: `What's the difference between a Duty Solicitor and an agency representative?`,
      answer: `A Duty Solicitor is a fully qualified solicitor accredited under the Law Society scheme. Agency representatives may not have the same qualifications. I am a qualified solicitor with Higher Rights of Audience (Criminal).`,
    },
    {
      question: `Is police station legal advice really free?`,
      answer: `Yes, legal advice at the police station is free regardless of your financial circumstances. This is your right under PACE 1984 and applies to everyone detained or attending voluntarily.`,
    },
  ];
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
    With Higher Rights of Audience (Criminal) and over 35 years of experience, I provide expert representation 
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
 * Handle uploaded images - saves to public/blog-images directory
 */
async function handleUploadedImages(files: File[], slug: string): Promise<string[]> {
  const savedUrls: string[] = [];
  const uploadDir = path.join(process.cwd(), 'public', 'blog-images');
  
  // Ensure directory exists
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
 * Supports both JSON and FormData (multipart) requests
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin session using simple password auth
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let formData: any;
    let uploadedImageUrls: string[] = [];

    // Check if request is multipart/form-data (for file uploads) or JSON
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle FormData with file uploads properly
      const multipartData = await request.formData();
      
      // Extract JSON data from the 'data' field
      const jsonData = multipartData.get('data');
      if (typeof jsonData === 'string') {
        formData = JSON.parse(jsonData);
      } else {
        return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
      }
      
      // Handle file uploads
      const files = multipartData.getAll('uploadedImages') as File[];
      
      if (files.length > 0) {
        const slug = generateSlug(formData.topic || formData.primaryKeyword);
        uploadedImageUrls = await handleUploadedImages(files, slug);
      }
    } else {
      // Standard JSON request (no file uploads)
      formData = await request.json();
    }

    // Generate blog content
    const content = await generateBlogContent(formData);
    const slug = generateSlug(formData.topic || formData.primaryKeyword);
    const metaTitle = generateMetaTitle(formData.topic, formData.location);
    const metaDescription = generateMetaDescription(formData.topic, formData.primaryKeyword, formData.location);
    
    // Generate FAQs if requested
    const faqs = formData.includeFAQ 
      ? generateFAQs(formData.topic, formData.primaryKeyword, formData.location)
      : [];

    // Append mandatory advert block
    const contentWithAdvert = content + generateAdvertBlock();

    // Merge uploaded image URLs with any external URLs provided
    const allImageUrls = [
      ...uploadedImageUrls,
      ...(formData.imageUrls || []).filter((url: string) => url && url.trim()),
    ];

    // Determine featured image
    let featuredImage: string | null = null;
    if (allImageUrls.length > 0) {
      const featuredIndex = formData.featuredImageIndex ?? 0;
      featuredImage = allImageUrls[featuredIndex] || allImageUrls[0] || null;
    }

    // Build schema properly using conditional assignment instead of boolean spread
    // The pattern `...(condition && {...})` spreads `false` when condition is falsy
    // Use explicit conditional assignment instead
    const blogPostingSchema: any = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: formData.topic,
      description: metaDescription,
      author: {
        '@type': 'Person',
        name: 'Robert Cashman',
        jobTitle: 'Duty Solicitor & Higher Court Advocate',
      },
      publisher: {
        '@type': 'Organization',
        name: 'PoliceStationAgent.com',
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com',
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
    };

    // Add image to schema if available
    if (featuredImage) {
      blogPostingSchema.image = featuredImage;
    }

    // Build final schema - add FAQPage as separate graph item if FAQs exist
    // Using explicit if/else instead of spread operator to avoid spreading false
    let schema: any;
    if (faqs.length > 0) {
      const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      };
      
      // Use @graph to combine both schemas properly
      schema = {
        '@context': 'https://schema.org',
        '@graph': [blogPostingSchema, faqSchema],
      };
    } else {
      // No FAQs - just use BlogPosting schema
      schema = blogPostingSchema;
    }

    return NextResponse.json({
      title: formData.topic,
      slug,
      content: contentWithAdvert,
      excerpt: metaDescription.substring(0, 200),
      metaTitle,
      metaDescription,
      faqs,
      schema,
      image: featuredImage,
      imageUrls: allImageUrls,
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}

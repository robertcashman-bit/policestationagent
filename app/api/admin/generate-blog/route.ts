import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Authorized email check
const AUTHORIZED_EMAIL = process.env.AUTHORIZED_GOOGLE_EMAIL || 'robertcashman@defencelegalservices.co.uk';

/**
 * Generate SEO-friendly slug from title
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

/**
 * Generate meta title (max 60 characters)
 */
function generateMetaTitle(title: string, location: string): string {
  const base = `${title} | ${location} Police Station Duty Solicitor`;
  return base.length > 60 ? base.substring(0, 57) + '...' : base;
}

/**
 * Generate meta description (max 155 characters)
 */
function generateMetaDescription(topic: string, primaryKeyword: string, location: string): string {
  const desc = `Expert ${primaryKeyword} advice in ${location}. FREE legal advice under Legal Aid. Accredited Duty Solicitor with 35+ years experience.`;
  return desc.length > 155 ? desc.substring(0, 152) + '...' : desc;
}

/**
 * Generate blog content using AI (placeholder - integrate with your AI service)
 * This is a template that generates compliant content from a solicitor's perspective
 */
async function generateBlogContent(formData: any): Promise<string> {
  // TODO: Integrate with your preferred AI service (OpenAI, Anthropic, etc.)
  // For now, this generates a template structure that follows all requirements
  
  const wordCounts = {
    short: 800,
    optimal: 1100,
    long: 1500,
  };
  
  const targetWords = wordCounts[formData.seoLength as keyof typeof wordCounts] || 1100;
  
  // This is a template - replace with actual AI API call
  const content = `
    <h1>${formData.topic} - ${formData.location} Police Station Duty Solicitor</h1>
    
    <p><strong>As a qualified Police Station Duty Solicitor with Higher Rights of Audience (Criminal),</strong> I regularly advise clients across ${formData.location} on ${formData.primaryKeyword}. This guide explains your rights and what to expect.</p>
    
    <h2>Understanding ${formData.primaryKeyword} in ${formData.location}</h2>
    
    <p>Under the Police and Criminal Evidence Act 1984 (PACE), you have specific rights when dealing with police matters in ${formData.location}. As an Accredited Duty Solicitor, I ensure these rights are protected throughout the process.</p>
    
    <h3>Your Legal Rights</h3>
    
    <ul>
      <li>Right to free legal advice under Section 58 of PACE 1984</li>
      <li>Right to consult privately with a solicitor</li>
      <li>Right to have a solicitor present during interview</li>
      <li>Right to remain silent</li>
    </ul>
    
    <h2>What Happens During ${formData.category}</h2>
    
    <p>When you're involved in a ${formData.category.toLowerCase()} situation in ${formData.location}, the process typically follows these steps:</p>
    
    <ol>
      <li>Initial contact or arrest</li>
      <li>Booking in at custody suite</li>
      <li>Consultation with duty solicitor</li>
      <li>Interview (if applicable)</li>
      <li>Decision on next steps</li>
    </ol>
    
    <h2>Why Choose an Accredited Duty Solicitor</h2>
    
    <p>Unlike unregulated police station agents, an Accredited Duty Solicitor is:</p>
    
    <ul>
      <li>Qualified and regulated by the Solicitors Regulation Authority</li>
      <li>Accredited by the Law Society for police station work</li>
      <li>Experienced in criminal defence and PACE procedures</li>
      <li>Available through the Defence Solicitor Call Centre (DSCC)</li>
    </ul>
    
    <p><strong>Important:</strong> I am a qualified solicitor, not just an agent. This means I can provide comprehensive legal advice and representation throughout your case.</p>
    
    <h2>${formData.location} Custody Suites</h2>
    
    <p>I provide representation at all ${formData.location} custody suites, including Medway, Maidstone, Canterbury, and Gravesend. My extended hours service ensures availability from 9am to late, covering evenings, weekends, and bank holidays.</p>
    
    <p><em>Note: I avoid making "24/7" claims. My service operates extended hours to ensure prompt attendance when needed.</em></p>
    
    ${formData.includeInternalLinks ? `
    <h2>Related Information</h2>
    <p>For more information, see our guides on:</p>
    <ul>
      <li><a href="/what-is-a-police-station-rep">What is a Police Station Representative?</a></li>
      <li><a href="/voluntary-interviews">Voluntary Police Interviews</a></li>
      <li><a href="/your-rights-in-custody">Your Rights in Custody</a></li>
    </ul>
    ` : ''}
    
    <h2>Conclusion</h2>
    
    <p>If you need advice about ${formData.primaryKeyword} in ${formData.location}, remember that free legal advice is available under Legal Aid. As an Accredited Duty Solicitor with over 35 years of experience, I can provide expert representation at any ${formData.location} custody suite.</p>
    
    <p><strong>This information is provided for general guidance only and does not constitute specific legal advice.</strong> Always consult with a qualified solicitor for advice tailored to your situation.</p>
  `;
  
  return content.trim();
}

/**
 * Generate FAQ section
 */
function generateFAQs(topic: string, primaryKeyword: string, location: string): Array<{question: string, answer: string}> {
  return [
    {
      question: `What is ${primaryKeyword}?`,
      answer: `${primaryKeyword} refers to your legal rights and options when dealing with police matters in ${location}. As an Accredited Duty Solicitor, I can explain these rights in detail during a private consultation.`,
    },
    {
      question: `Is legal advice free for ${primaryKeyword} matters?`,
      answer: `Yes. Under Section 58 of PACE 1984, everyone is entitled to free legal advice at the police station. This applies regardless of your financial circumstances and is not means-tested.`,
    },
    {
      question: `How quickly can a duty solicitor attend in ${location}?`,
      answer: `I aim to attend any ${location} custody suite within 30 minutes of being contacted. My extended hours service covers evenings, weekends, and bank holidays to ensure prompt attendance.`,
    },
    {
      question: `What's the difference between a duty solicitor and a police station agent?`,
      answer: `A duty solicitor is a qualified solicitor accredited by the Law Society. A police station agent is a non-solicitor representative. I am a qualified solicitor with Higher Court Advocate status, providing expert representation across ${location}.`,
    },
  ];
}

/**
 * Generate automatic advert block (mandatory for all posts)
 */
function generateAdvertBlock(): string {
  return `
    <div class="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
      <h3 class="text-xl font-bold text-slate-900 mb-4">PoliceStationAgent.com - Expert Police Station Representation</h3>
      
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
           class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold">
          Email for Police Station Representation
        </a>
        <a href="sms:07535494446?body=I need a duty solicitor" 
           class="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold">
          Send SMS to Request a Duty Solicitor
        </a>
      </div>
      
      <p class="text-sm text-slate-600 mt-4">
        <strong>Call 01732 247427</strong> - Available from 9am to late, including evenings, weekends, and bank holidays.
      </p>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Verify Google OAuth session
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Verify authorized email
    if (session.user.email?.toLowerCase() !== AUTHORIZED_EMAIL.toLowerCase()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    const formData = await request.json();
    
    // Generate blog content
    const content = await generateBlogContent(formData);
    
    // Generate SEO metadata
    const slug = generateSlug(formData.topic || formData.primaryKeyword);
    const metaTitle = generateMetaTitle(formData.topic, formData.location);
    const metaDescription = generateMetaDescription(
      formData.topic,
      formData.primaryKeyword,
      formData.location
    );
    
    // Generate FAQs if enabled
    const faqs = formData.includeFAQ 
      ? generateFAQs(formData.topic, formData.primaryKeyword, formData.location)
      : [];
    
    // Add advert block to content (mandatory)
    const contentWithAdvert = content + generateAdvertBlock();
    
    // Generate schema markup
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: formData.topic,
      description: metaDescription,
      author: {
        '@type': 'Person',
        name: 'Robert Cashman',
      },
      publisher: {
        '@type': 'Organization',
        name: 'PoliceStationAgent.com',
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      ...(faqs.length > 0 && {
        mainEntity: {
          '@type': 'FAQPage',
          mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        },
      }),
    };
    
    return NextResponse.json({
      title: formData.topic,
      slug,
      content: contentWithAdvert,
      excerpt: metaDescription.substring(0, 200),
      metaTitle,
      metaDescription,
      faqs,
      schema,
      image: formData.featuredImageIndex >= 0 
        ? (formData.imageUrls[formData.featuredImageIndex] || null)
        : null,
    });
  } catch (error) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog post' },
      { status: 500 }
    );
  }
}


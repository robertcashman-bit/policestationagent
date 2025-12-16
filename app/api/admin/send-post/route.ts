import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import db from '@/lib/db';

// Authorized email check
const AUTHORIZED_EMAIL = process.env.AUTHORIZED_GOOGLE_EMAIL || 'robertcashman@defencelegalservices.co.uk';

/**
 * Email/SMS Sending API
 * 
 * Provides hooks for sending blog posts via Email or SMS
 * NO WhatsApp integration - Email and SMS only
 */
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
    
    const { postId, method, recipient } = await request.json();
    
    if (!postId || !method || !recipient) {
      return NextResponse.json(
        { error: 'postId, method, and recipient are required' },
        { status: 400 }
      );
    }
    
    if (method !== 'email' && method !== 'sms') {
      return NextResponse.json(
        { error: 'Method must be "email" or "sms"' },
        { status: 400 }
      );
    }
    
    // Get blog post
    const post = db.prepare(`
      SELECT id, title, slug, content, excerpt, meta_title, meta_description
      FROM blog_posts
      WHERE id = ?
    `).get(postId);
    
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://policestationagent.com';
    const postUrl = `${siteUrl}/blog/${post.slug}`;
    
    // Generate shareable content
    const shareContent = {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      url: postUrl,
    };
    
    if (method === 'email') {
      // Email sending hook
      // TODO: Integrate with your email service (SendGrid, AWS SES, etc.)
      const emailSubject = shareContent.title;
      const emailBody = `
${shareContent.description}

Read the full article: ${postUrl}

---
PoliceStationAgent.com
Qualified Duty Solicitor & Higher Court Advocate
Expert Police Station Representation in Kent
      `.trim();
      
      // Return email data for client-side mailto link or server-side sending
      return NextResponse.json({
        success: true,
        method: 'email',
        mailto: `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
        data: {
          to: recipient,
          subject: emailSubject,
          body: emailBody,
        },
      });
    } else if (method === 'sms') {
      // SMS sending hook
      // TODO: Integrate with your SMS service (Twilio, AWS SNS, etc.)
      const smsBody = `${shareContent.title}\n\n${shareContent.url}`;
      
      // Return SMS data for client-side sms: link or server-side sending
      return NextResponse.json({
        success: true,
        method: 'sms',
        smsLink: `sms:${recipient}?body=${encodeURIComponent(smsBody)}`,
        data: {
          to: recipient,
          body: smsBody,
        },
      });
    }
    
    return NextResponse.json({ error: 'Invalid method' }, { status: 400 });
  } catch (error) {
    console.error('Send post error:', error);
    return NextResponse.json(
      { error: 'Failed to prepare send data' },
      { status: 500 }
    );
  }
}


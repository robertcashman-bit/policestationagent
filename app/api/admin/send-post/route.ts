import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import db from '@/lib/db';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizePhone(raw: string): string {
  return raw.replace(/[^\d+]/g, '');
}

function isProbablyPhone(raw: string): boolean {
  const v = normalizePhone(raw);
  // Very lightweight check (E.164-ish); allow leading + and 10-15 digits.
  return /^\+?\d{10,15}$/.test(v);
}

async function sendEmailViaSendGrid(args: { to: string; subject: string; text: string }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SEND_POST_FROM_EMAIL || process.env.SENDGRID_FROM_EMAIL;
  const fromName = process.env.SEND_POST_FROM_NAME || 'Police Station Agent';

  if (!apiKey || !fromEmail) {
    return { sent: false as const, reason: 'missing_sendgrid_env' as const };
  }

  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: args.to }] }],
      from: { email: fromEmail, name: fromName },
      subject: args.subject,
      content: [{ type: 'text/plain', value: args.text }],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`SendGrid send failed (${res.status}): ${body || res.statusText}`);
  }

  return { sent: true as const };
}

async function sendSmsViaTwilio(args: { to: string; body: string }) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  if (!accountSid || !authToken || !from) {
    return { sent: false as const, reason: 'missing_twilio_env' as const };
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(accountSid)}/Messages.json`;
  const basic = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const form = new URLSearchParams();
  form.set('From', from);
  form.set('To', args.to);
  form.set('Body', args.body);

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
    body: form.toString(),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Twilio send failed (${res.status}): ${body || res.statusText}`);
  }

  return { sent: true as const };
}

/**
 * Email/SMS Sending API
 * 
 * Provides hooks for sending blog posts via Email or SMS
 * NO WhatsApp integration - Email and SMS only
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin session using simple password auth
    const session = await getAdminSession();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    `).get(postId) as BlogPost | undefined;
    
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
      if (!isValidEmail(String(recipient))) {
        return NextResponse.json({ error: 'Recipient must be a valid email address' }, { status: 400 });
      }

      const emailSubject = shareContent.title;
      const emailBody = `
${shareContent.description}

Read the full article: ${postUrl}

---
PoliceStationAgent.com
Qualified Duty Solicitor & Higher Court Advocate
Expert Police Station Representation in Kent
      `.trim();
      
      // Attempt server-side send (SendGrid) when configured; otherwise return mailto fallback.
      let provider: 'sendgrid' | 'mailto' = 'mailto';
      let sent = false;
      let sendError: string | null = null;

      try {
        const r = await sendEmailViaSendGrid({ to: recipient, subject: emailSubject, text: emailBody });
        if (r.sent) {
          provider = 'sendgrid';
          sent = true;
        }
      } catch (e) {
        sendError = e instanceof Error ? e.message : 'Unknown email send error';
      }

      return NextResponse.json({
        success: true,
        method: 'email',
        provider,
        sent,
        sendError,
        mailto: `mailto:${recipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
        data: {
          to: recipient,
          subject: emailSubject,
          body: emailBody,
        },
      });
    } else if (method === 'sms') {
      if (!isProbablyPhone(String(recipient))) {
        return NextResponse.json(
          { error: 'Recipient must be a valid phone number (ideally E.164, e.g. +447...)' },
          { status: 400 }
        );
      }

      const to = normalizePhone(String(recipient));
      const smsBody = `${shareContent.title}\n\n${shareContent.url}`;

      // Attempt server-side send (Twilio) when configured; otherwise return sms: fallback.
      let provider: 'twilio' | 'sms-link' = 'sms-link';
      let sent = false;
      let sendError: string | null = null;

      try {
        const r = await sendSmsViaTwilio({ to, body: smsBody });
        if (r.sent) {
          provider = 'twilio';
          sent = true;
        }
      } catch (e) {
        sendError = e instanceof Error ? e.message : 'Unknown SMS send error';
      }
      
      // Return SMS data for client-side sms: link or server-side sending
      return NextResponse.json({
        success: true,
        method: 'sms',
        provider,
        sent,
        sendError,
        smsLink: `sms:${to}?body=${encodeURIComponent(smsBody)}`,
        data: {
          to,
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

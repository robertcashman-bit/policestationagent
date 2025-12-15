/**
 * CONTACT FORM API ROUTE
 * 
 * Handles contact form submissions and sends emails.
 * Uses environment variables for email configuration.
 * 
 * For production, configure one of:
 * - RESEND_API_KEY
 * - SENDGRID_API_KEY
 */

import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactRequest = await request.json();
    const { name, email, phone, message, subject } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const recipientEmail = 'robertcashman@defencelegalservices.co.uk';
    const emailSubject = subject || `Contact Form: ${name}`;
    
    const emailBody = `
New Contact Form Submission
============================

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

============================
Sent from: policestationagent.com
Timestamp: ${new Date().toISOString()}
    `.trim();

    // Get email configuration from environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const sendgridApiKey = process.env.SENDGRID_API_KEY;

    // Try Resend first (easiest for Vercel)
    if (resendApiKey) {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Police Station Agent <noreply@policestationagent.com>',
            to: [recipientEmail],
            subject: emailSubject,
            text: emailBody,
            reply_to: email,
          }),
        });

        if (resendResponse.ok) {
          const data = await resendResponse.json();
          console.log('[Contact Form] Sent via Resend:', data.id);
          return NextResponse.json({ success: true, method: 'resend', id: data.id });
        }
      } catch (error) {
        console.error('[Contact Form] Resend error:', error);
      }
    }

    // Try SendGrid
    if (sendgridApiKey) {
      try {
        const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridApiKey}`,
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: recipientEmail }],
            }],
            from: { email: 'noreply@policestationagent.com', name: 'Police Station Agent' },
            reply_to: { email: email, name: name },
            subject: emailSubject,
            content: [{
              type: 'text/plain',
              value: emailBody,
            }],
          }),
        });

        if (sendgridResponse.ok) {
          console.log('[Contact Form] Sent via SendGrid');
          return NextResponse.json({ success: true, method: 'sendgrid' });
        }
      } catch (error) {
        console.error('[Contact Form] SendGrid error:', error);
      }
    }

    // Fallback: Log the email (for development/testing)
    console.log('\n=== CONTACT FORM SUBMISSION (No email service configured) ===');
    console.log('To:', recipientEmail);
    console.log('Subject:', emailSubject);
    console.log('From:', name, '<' + email + '>');
    console.log('Phone:', phone || 'Not provided');
    console.log('Body:', emailBody);
    console.log('==============================================================\n');

    // Return success even if email service isn't configured
    return NextResponse.json({ 
      success: true, 
      method: 'logged',
      message: 'Message received (email service not configured)'
    });

  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

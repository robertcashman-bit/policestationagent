import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cleanEnvValue } from '@/lib/env';

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;
const ipTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipTimestamps.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) return true;
  recent.push(now);
  ipTimestamps.set(ip, recent);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute and try again.' },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = body;

    // Honeypot: a hidden field real users never see. Bots that fill it get a
    // success response but no email is sent (silent drop, no behaviour change
    // for legitimate submissions which leave it empty).
    const honeypot = body?.company;
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!subject || typeof subject !== 'string' || subject.trim().length < 1) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });
    }

    const apiKey = cleanEnvValue(process.env.RESEND_API_KEY);
    const toEmail = cleanEnvValue(process.env.CONTACT_EMAIL_TO);

    if (!apiKey || !toEmail) {
      console.error('Contact form: RESEND_API_KEY or CONTACT_EMAIL_TO not configured');
      return NextResponse.json(
        {
          error: 'Contact form is temporarily unavailable',
          unavailable: true,
          hint: 'Email us directly at robertdavidcashman@gmail.com and we will respond within a few working days.',
        },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);

    const sanitisedName = name.trim().slice(0, 200);
    const sanitisedSubject = subject.trim().slice(0, 200);
    const sanitisedMessage = message.trim().slice(0, 5000);

    const { error: sendError } = await resend.emails.send({
      from: 'PSR Train <noreply@psrtrain.com>',
      to: [toEmail],
      replyTo: email.trim(),
      subject: `[Contact] ${sanitisedSubject}`,
      text: [
        `Name: ${sanitisedName}`,
        `Email: ${email.trim()}`,
        `Subject: ${sanitisedSubject}`,
        '',
        sanitisedMessage,
      ].join('\n'),
    });

    if (sendError) {
      console.error('Resend error:', sendError);
      return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

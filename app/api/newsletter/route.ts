import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { cleanEnvValue } from '@/lib/env';

/**
 * Newsletter / lead-magnet email capture (server-side only).
 *
 * Adds the subscriber to a Resend audience when RESEND_API_KEY +
 * RESEND_AUDIENCE_ID are configured; otherwise sends a notification email to
 * CONTACT_EMAIL_TO. Fails safe (never exposes secrets, never 500s on missing
 * config). No client-exposed credentials.
 */

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 5;
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
    const { email, source } = body ?? {};

    // Honeypot — bots that fill the hidden field get success but are dropped.
    const honeypot = body?.company;
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    const cleanEmail = email.trim().slice(0, 200);
    const cleanSource = typeof source === 'string' ? source.trim().slice(0, 120) : 'blog';

    const apiKey = cleanEnvValue(process.env.RESEND_API_KEY);
    if (!apiKey) {
      // Capture is not configured — accept gracefully so the UI never breaks.
      console.warn('[newsletter] RESEND_API_KEY not configured; subscription not stored.');
      return NextResponse.json({ success: true, stored: false });
    }

    const resend = new Resend(apiKey);
    const audienceId = cleanEnvValue(process.env.RESEND_AUDIENCE_ID);

    if (audienceId) {
      const { error } = await resend.contacts.create({
        email: cleanEmail,
        audienceId,
        unsubscribed: false,
      });
      if (error) {
        console.error('[newsletter] Resend contacts.create error:', error);
        return NextResponse.json({ error: 'Could not subscribe. Please try again.' }, { status: 500 });
      }
      return NextResponse.json({ success: true, stored: true });
    }

    const toEmail = cleanEnvValue(process.env.CONTACT_EMAIL_TO);
    if (toEmail) {
      const { error } = await resend.emails.send({
        from: 'PSR Train <noreply@psrtrain.com>',
        to: [toEmail],
        subject: `[Newsletter] New subscriber (${cleanSource})`,
        text: `New subscriber: ${cleanEmail}\nSource: ${cleanSource}`,
      });
      if (error) {
        console.error('[newsletter] Resend send error:', error);
        return NextResponse.json({ error: 'Could not subscribe. Please try again.' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true, stored: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

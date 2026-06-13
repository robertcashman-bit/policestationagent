import { NextResponse } from 'next/server';
import { isAdminEmail } from '@/lib/admin-auth';
import { storeMagicCode } from '@/lib/admin-session';
import { getClientIp, rateLimitOk } from '@/lib/contact-guards';
import { magicCodeSendErrorMessage, sendMagicCode } from '@/lib/email';
import { getKV } from '@/lib/kv';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const kv = getKV();
  if (!kv) {
    return NextResponse.json(
      { error: 'Login system not configured. Add Upstash Redis on Vercel.' },
      { status: 503 },
    );
  }

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const ip = getClientIp(request);
  const limit = await rateLimitOk({ ip, scope: 'admin-magic-code', max: 10 });
  if (!limit.ok) {
    return NextResponse.json({ error: 'Too many attempts. Please try again later.' }, { status: 429 });
  }

  // Always return ok to avoid email enumeration
  if (!isAdminEmail(email)) {
    return NextResponse.json({ ok: true });
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const sent = await sendMagicCode(email, code);
  if (!sent.success) {
    console.error('[send-code] Magic code email failed:', sent.error);
    return NextResponse.json(
      { error: magicCodeSendErrorMessage(sent.error) },
      { status: 503 },
    );
  }

  await storeMagicCode(email, code);
  return NextResponse.json({ ok: true });
}

import { NextResponse } from 'next/server';
import { isCronAuthorized } from '@/lib/cron-auth';

export async function GET(request: Request) {
  const resendKey = process.env.RESEND_API_KEY?.trim() || '';
  const toEmail = process.env.CONTACT_FORM_TO_EMAIL?.trim() || '';
  const ok = Boolean(resendKey && toEmail);

  if (!isCronAuthorized(request)) {
    return NextResponse.json({ ok });
  }

  const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || '';

  return NextResponse.json({
    ok,
    hasResendApiKey: Boolean(resendKey),
    resendKeyLooksValid: resendKey.startsWith('re_'),
    hasContactFormToEmail: Boolean(toEmail),
    hasContactFromEmail: Boolean(fromEmail),
  });
}

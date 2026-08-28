import { NextResponse } from 'next/server';
import { requireAdminApi } from '@/lib/admin-auth';
import { PSA_OUTREACH_EMAILS_DISABLED_REASON } from '@/lib/firm-outreach/outreach-emails-disabled';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

/** Firm outreach admin API permanently disabled (email product removed). */
export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      reason: 'psa_outreach_emails_disabled',
      error: 'Firm outreach email admin API is permanently disabled',
      message: PSA_OUTREACH_EMAILS_DISABLED_REASON,
    },
    { status: 410 },
  );
}

export async function POST() {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      reason: 'psa_outreach_emails_disabled',
      error: 'Firm outreach email admin API is permanently disabled',
      message: PSA_OUTREACH_EMAILS_DISABLED_REASON,
    },
    { status: 410 },
  );
}

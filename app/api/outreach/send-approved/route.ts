import { NextResponse } from 'next/server';
import { PSA_OUTREACH_EMAILS_DISABLED_REASON } from '@/lib/firm-outreach/outreach-emails-disabled';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

function gone() {
  return NextResponse.json(
    {
      ok: false,
      disabled: true,
      reason: 'psa_outreach_emails_disabled',
      error: PSA_OUTREACH_EMAILS_DISABLED_REASON,
    },
    { status: 410 },
  );
}

/** Approval send endpoint permanently disabled. */
export async function POST() {
  return gone();
}

export async function GET() {
  return gone();
}

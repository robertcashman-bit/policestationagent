import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { requirePaidTrainingAccess } from '@/lib/auth/api-guards';
import { evaluateAndIssueCertificates, getUserCertificates } from '@/lib/certificates';

export async function POST() {
  const gate = await requirePaidTrainingAccess();
  if (!gate.ok) return gate.response;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newlyIssued = await evaluateAndIssueCertificates(user.id);
  const all = await getUserCertificates(user.id);

  return NextResponse.json({ newlyIssued, certificates: all });
}

export async function GET() {
  const gate = await requirePaidTrainingAccess();
  if (!gate.ok) return gate.response;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const certificates = await getUserCertificates(user.id);
  return NextResponse.json({ certificates });
}

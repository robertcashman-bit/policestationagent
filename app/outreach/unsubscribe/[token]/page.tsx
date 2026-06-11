import Link from 'next/link';
import { addSuppression, getProspectByEmail, saveProspect } from '@/lib/firm-outreach/storage';
import { verifyUnsubscribeToken } from '@/lib/firm-outreach/outreach/unsubscribe-token';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Unsubscribe — Police Station Agent outreach',
  description: 'Opt out of Police Station Agent firm outreach emails.',
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = verifyUnsubscribeToken(decodeURIComponent(token));

  if (!payload) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-lg shadow p-8">
          <h1 className="text-2xl font-bold text-slate-900">Invalid or expired link</h1>
          <p className="mt-3 text-sm text-slate-600">
            This unsubscribe link is not valid. Email{' '}
            <a href="mailto:robertcashman@defencelegalservices.co.uk" className="underline">
              robertcashman@defencelegalservices.co.uk
            </a>{' '}
            to opt out manually.
          </p>
          <Link href="/" className="mt-6 inline-block text-sm font-semibold text-blue-700">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  await addSuppression(payload.email, 'unsubscribe');
  const prospect = await getProspectByEmail(payload.email);
  if (prospect) {
    prospect.status = 'unsubscribed';
    prospect.updatedAt = new Date().toISOString();
    await saveProspect(prospect);
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-lg shadow p-8">
        <h1 className="text-2xl font-bold text-slate-900">You are unsubscribed</h1>
        <p className="mt-3 text-sm text-slate-600">
          <strong>{payload.email}</strong> will not receive further Police Station Agent outreach
          emails.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-blue-700">
          Back to home
        </Link>
      </div>
    </div>
  );
}

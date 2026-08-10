'use client';

import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

type Props = {
  upgrade?: boolean;
  fromPath?: string;
};

export function PricingUpgradeBanner({ upgrade, fromPath }: Props) {
  if (!upgrade) return null;

  const label = fromPath
    ? `Subscription required to access ${fromPath}`
    : 'Subscribe to unlock full training access';

  return (
    <div
      role="status"
      className="mx-auto mb-8 max-w-3xl flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
    >
      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden />
      <div>
        <p className="font-semibold">{label}</p>
        <p className="mt-0.5 text-amber-900/90">
          Choose a plan below to continue.{' '}
          <Link href="/legal/faq" className="underline font-medium">
            FAQ
          </Link>
        </p>
      </div>
    </div>
  );
}

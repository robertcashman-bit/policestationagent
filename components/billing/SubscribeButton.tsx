'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type Plan = 'monthly' | 'annual';

export function SubscribeButton({ plan, children }: Readonly<{ plan: Plan; children: React.ReactNode }>) {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/lemonsqueezy/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Failed to start Lemon Squeezy checkout');
      if (data.url) globalThis.location.href = data.url;
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleSubscribe} disabled={loading} className="w-full h-12">
      {loading ? 'Redirecting...' : children}
    </Button>
  );
}

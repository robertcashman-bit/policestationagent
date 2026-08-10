import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SubscribeButton } from '@/components/billing/SubscribeButton';
import { AutoCheckout } from '@/components/billing/AutoCheckout';
import { Check, ExternalLink } from 'lucide-react';
import { getAccessSnapshot } from '@/lib/auth/access';
import { isFreeAccessPeriodActive } from '@/lib/free-access-promo';

export default async function BillingPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const user = await getCurrentUser();
  if (!user) {
    const plan = sp.plan === 'annual' ? 'annual' : sp.plan === 'monthly' ? 'monthly' : null;
    const next = plan ? `/billing?plan=${plan}` : '/billing';
    redirect(`/auth?${new URLSearchParams({ next }).toString()}`);
  }

  const access = await getAccessSnapshot();
  const freeActive = isFreeAccessPeriodActive();
  const requestedPlan =
    sp.plan === 'annual' ? 'annual' : sp.plan === 'monthly' ? 'monthly' : null;
  const autoCheckoutPlan = requestedPlan && !access.hasPaidAccess ? requestedPlan : null;

  const statusLabel = access.isAdmin
    ? 'Admin access'
    : access.hasPaidAccess
      ? freeActive
        ? 'Free access (promo active)'
        : 'Active subscription'
      : 'No active subscription';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your subscription</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current access</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm">
            Status:{' '}
            <span className="font-semibold text-foreground">{statusLabel}</span>
          </p>
          {freeActive && !access.isAdmin && (
            <p className="text-sm text-muted-foreground">
              Free access runs until the promo end date. Subscribe before then to keep uninterrupted
              access after the promo ends.
            </p>
          )}
          {access.hasPaidAccess && !access.isAdmin && (
            <p className="text-sm text-muted-foreground">
              Manage payment method and invoices in your Lemon Squeezy customer portal (link in
              receipt emails).
            </p>
          )}
        </CardContent>
      </Card>

      {autoCheckoutPlan && <AutoCheckout plan={autoCheckoutPlan} />}

      {!access.hasPaidAccess && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Monthly</CardTitle>
              <CardDescription>£12/month, cancel anytime</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                {['Practice questions', 'Learning modules', 'Critical incidents', 'Progress tracking'].map(
                  (f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-secondary shrink-0" />
                      {f}
                    </li>
                  ),
                )}
              </ul>
              <SubscribeButton plan="monthly">Subscribe monthly</SubscribeButton>
            </CardContent>
          </Card>
          <Card className="border-primary">
            <CardHeader>
              <CardTitle>Annual</CardTitle>
              <CardDescription>£115/year — Save 20%</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
                {['Everything in Monthly', '2 months free', 'Billed annually'].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-secondary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <SubscribeButton plan="annual">Subscribe annual</SubscribeButton>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Need help?</CardTitle>
          <CardDescription>Billing questions or invoice copies</CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/legal/contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Contact support
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

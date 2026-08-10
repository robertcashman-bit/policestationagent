import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function SignupRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  if (typeof sp.next === 'string') params.set('next', sp.next);
  params.set('mode', 'signup');
  if (typeof sp.plan === 'string') {
    params.set('next', `/billing?plan=${sp.plan}`);
  }
  const qs = params.toString();
  redirect(`/auth${qs ? `?${qs}` : ''}`);
}

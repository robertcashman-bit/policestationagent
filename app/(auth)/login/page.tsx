import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LoginRedirect({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  if (typeof sp.next === 'string') params.set('next', sp.next);
  if (typeof sp.error === 'string') params.set('error', sp.error);
  const qs = params.toString();
  redirect(`/auth${qs ? `?${qs}` : ''}`);
}

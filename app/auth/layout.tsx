import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';

export const metadata: Metadata = {
  title: {
    default: 'Sign in · PSR Train',
    template: '%s · PSR Train',
  },
  description:
    'Sign in or create your PSR Train account. We email you a 6-digit code and a one-click login link.',
  robots: { index: false, follow: true },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <AuthShell>{children}</AuthShell>;
}

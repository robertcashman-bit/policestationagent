import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create account',
  description: 'Create a PSR Train account. Start your Police Station Representative training journey today.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Access',
  description: 'Enter your access code to continue to PSR Train.',
  robots: { index: false, follow: false },
};

export default function GateLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

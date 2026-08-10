
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact PSR Train for support, feedback, or general enquiries about Police Station Representative training.',
  path: '/legal/contact',
});

export default function ContactLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}

'use client';

import { usePathname } from 'next/navigation';
import FloatingChatButton from '@/components/layout/FloatingChatButton';

const HIDDEN_PREFIXES = ['/admin'];

export function SupportWidget() {
  const pathname = usePathname() ?? '';
  if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return null;
  }
  return <FloatingChatButton />;
}

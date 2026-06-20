import type { ReactNode } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function headers() {
  return {
    'Cache-Control': 'no-store, max-age=0, must-revalidate',
  };
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}

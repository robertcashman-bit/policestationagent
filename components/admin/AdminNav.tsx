'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/admin/live', label: 'Live users' },
  { href: '/admin/users', label: 'All users' },
  { href: '/admin/analytics', label: 'Analytics' },
  { href: '/admin/questions', label: 'Questions' },
];

export function AdminNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav
      className="flex flex-wrap gap-2 border-b border-border pb-4 mb-6"
      aria-label="Admin sections"
    >
      {links.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? 'bg-[#0B3C5D] text-white'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            }`}
          >
            {label}
          </Link>
        );
      })}
      <Link
        href="/dashboard"
        className="ml-auto rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← Back to app
      </Link>
    </nav>
  );
}

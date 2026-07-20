'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export type AdminSection =
  | 'overview'
  | 'firm-outreach'
  | 'content'
  | 'blog-generator'
  | 'police-confusion';

const NAV: { id: AdminSection; href: string; label: string }[] = [
  { id: 'overview', href: '/admin', label: 'Overview' },
  { id: 'firm-outreach', href: '/admin/firm-outreach', label: 'Firm outreach' },
  { id: 'content', href: '/admin/content', label: 'Content' },
  { id: 'blog-generator', href: '/admin/blog-generator', label: 'Blog generator' },
  { id: 'police-confusion', href: '/admin/police-confusion', label: 'Police confusion' },
];

function isActive(pathname: string, href: string): boolean {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface AdminShellProps {
  active: AdminSection;
  adminEmail: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminShell({ active, adminEmail, title, description, children }: AdminShellProps) {
  const pathname = usePathname() ?? '';

  async function handleLogout() {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Still redirect
    }
    window.location.href = '/admin';
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Admin</p>
            <h1 className="text-2xl font-bold text-[#0A2342]">{title}</h1>
            {description ? <p className="mt-2 max-w-3xl text-sm text-gray-600">{description}</p> : null}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <p className="text-gray-600">
              Signed in as <strong className="text-[#0A2342]">{adminEmail}</strong>
            </p>
            <Link href="/" className="font-medium text-gray-700 hover:text-[#0A2342] hover:underline">
              View site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        <nav
          className="mt-6 flex flex-wrap gap-2 border-b border-gray-200 pb-4"
          aria-label="Admin sections"
        >
          {NAV.map((item) => {
            const activeNav = item.id === active || isActive(pathname, item.href);
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-sm font-semibold no-underline transition-colors ${
                  activeNav
                    ? 'bg-[#0A2342] text-white'
                    : 'border border-gray-200 bg-white text-[#0A2342] hover:border-[#0A2342]/40'
                }`}
                aria-current={activeNav ? 'page' : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

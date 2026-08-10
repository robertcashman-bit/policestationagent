'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/legal/about', label: 'About' },
  { href: '/legal/about-the-role', label: 'The role' },
  { href: '/legal/accreditation-process', label: 'Accreditation' },
  { href: '/legal/how-our-training-helps', label: 'How we help' },
  { href: '/legal-advice', label: 'Legal Advice' },
  { href: '/legal/faq', label: 'FAQ' },
];

export default function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary-600 flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-[1.05rem] tracking-tight">PSR Train</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center h-9 px-5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-sm"
            >
              Start training
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="lg:hidden p-2 -mr-2 rounded-xl hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-slate-700" />
            ) : (
              <Menu className="w-5 h-5 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100">
            <nav className="flex flex-col gap-0.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-1.5">
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-primary-600 text-white text-center hover:bg-primary-700 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Start training free
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import {
  PATH_AGENCY,
  PATH_CONTACT,
  PATH_CUSTODY,
  PATH_VOLUNTARY_LANDING,
} from "@/config/enquiry-paths";
import { CHROME_BRAND_TAGLINE, CHROME_HELP_STRIP } from "@/config/contact";
import {
  getCategoriesWithPosts,
  getTotalBlogCount,
  groupBlogsByCategory,
} from "@/lib/groupBlogs";

const NAV = [
  { href: "/", label: "Home" },
  { href: PATH_VOLUNTARY_LANDING, label: "Voluntary interviews" },
  { href: PATH_CUSTODY, label: "Current custody" },
  { href: PATH_AGENCY, label: "For solicitors" },
  { href: "/coverage", label: "Areas Covered" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: PATH_CONTACT, label: "Contact" },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Header({
  forceHidePhone: _forceHidePhone = false,
}: {
  forceHidePhone?: boolean;
} = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [mobileBlogOpen, setMobileBlogOpen] = useState(false);
  const blogTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const groupedBlogs = useMemo(() => groupBlogsByCategory(), []);
  const categories = useMemo(() => getCategoriesWithPosts(), []);
  const totalBlogCount = useMemo(() => getTotalBlogCount(), []);

  const cancelBlogClose = () => {
    if (blogTimeoutRef.current) {
      clearTimeout(blogTimeoutRef.current);
      blogTimeoutRef.current = null;
    }
  };

  const scheduleBlogClose = () => {
    cancelBlogClose();
    blogTimeoutRef.current = setTimeout(() => setBlogOpen(false), 220);
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileBlogOpen(false);
  };

  return (
    <header className="relative z-50 border-b border-border bg-card shadow-card">
      <div className="hidden sm:block bg-primary text-primary-foreground text-xs sm:text-sm py-1.5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
          <p className="font-semibold tracking-wide text-white/90">{CHROME_HELP_STRIP}</p>
          <Link
            href={PATH_AGENCY}
            className="font-semibold text-accent-light underline-offset-2 hover:text-white hover:underline"
          >
            For defence firms
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-border/80 py-3.5">
          <Link href="/" className="group block" aria-label="Police Station Agent home page">
            <div className="font-display text-lg font-bold leading-tight text-primary transition-colors group-hover:text-primary-light sm:text-xl">
              Police Station Agent
            </div>
            <div className="mt-0.5 text-[11px] font-semibold leading-tight text-slate-600 sm:text-xs">
              {CHROME_BRAND_TAGLINE}
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link href={PATH_CONTACT} className="btn-gold hidden sm:inline-flex lg:hidden">
              Get a solicitor
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-white shadow-md hover:bg-primary-light lg:hidden"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <nav
          className="hidden h-14 items-center gap-3 lg:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex min-w-0 flex-1 items-stretch justify-between gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-1 items-center justify-center whitespace-nowrap rounded-md px-1.5 py-2 text-center text-[13px] font-medium text-slate-700 transition-colors hover:bg-secondary hover:text-primary xl:text-sm"
              >
                {item.label}
              </Link>
            ))}

            <div
              className="relative flex flex-1"
              onMouseEnter={() => {
                cancelBlogClose();
                setBlogOpen(true);
              }}
              onMouseLeave={scheduleBlogClose}
            >
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 whitespace-nowrap rounded-md px-1.5 py-2 text-center text-[13px] font-medium text-slate-700 transition-colors hover:bg-secondary hover:text-primary xl:text-sm"
                aria-expanded={blogOpen}
                aria-haspopup="true"
                aria-label="Blog menu"
                onClick={() => setBlogOpen((o) => !o)}
              >
                Blog
                <Chevron open={blogOpen} />
              </button>

              {blogOpen ? (
                <div
                  className="absolute right-0 top-full z-50 mt-1 max-h-[75vh] w-[22rem] overflow-y-auto rounded-lg border border-border bg-card py-2 shadow-elevated xl:w-96"
                  onMouseEnter={cancelBlogClose}
                  onMouseLeave={scheduleBlogClose}
                >
                  <Link
                    href="/blog"
                    className="sticky top-0 z-10 block border-b border-border bg-card px-4 py-3 text-sm font-semibold text-primary hover:bg-secondary"
                  >
                    View all blog articles ({totalBlogCount})
                  </Link>
                  <div className="py-1">
                    {categories.map((category) => {
                      const posts = groupedBlogs[category] || [];
                      if (posts.length === 0) return null;
                      return (
                        <div key={category} className="mb-2 last:mb-0">
                          <div className="sticky top-[49px] z-10 border-b border-border bg-secondary/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                            {category}
                          </div>
                          <div className="py-1">
                            {posts.map((post) => (
                              <Link
                                key={post.slug}
                                href={post.slug}
                                className="block px-4 py-1.5 text-xs leading-snug text-slate-700 hover:bg-secondary hover:text-primary"
                                title={post.title}
                              >
                                {post.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <Link href={PATH_CONTACT} className="btn-gold shrink-0">
            Get a solicitor
          </Link>
        </nav>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-border bg-card shadow-elevated lg:hidden">
          <nav
            className="mx-auto max-w-7xl space-y-1 px-4 py-3"
            aria-label="Mobile navigation"
          >
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-4 py-3 font-medium text-foreground hover:bg-secondary hover:text-primary"
                onClick={closeMobile}
              >
                {item.label}
              </Link>
            ))}

            <div className="rounded-md border border-border/80">
              <button
                type="button"
                className="flex w-full items-center justify-between px-4 py-3 font-medium text-foreground hover:bg-secondary hover:text-primary"
                aria-expanded={mobileBlogOpen}
                aria-label="Blog menu"
                onClick={() => setMobileBlogOpen((o) => !o)}
              >
                <span>Blog ({totalBlogCount})</span>
                <Chevron open={mobileBlogOpen} />
              </button>

              {mobileBlogOpen ? (
                <div className="max-h-[55vh] overflow-y-auto border-t border-border pb-2">
                  <Link
                    href="/blog"
                    className="block px-4 py-3 font-semibold text-primary hover:bg-secondary"
                    onClick={closeMobile}
                  >
                    View all blog articles →
                  </Link>
                  {categories.map((category) => {
                    const posts = groupedBlogs[category] || [];
                    if (posts.length === 0) return null;
                    return (
                      <div key={category} className="mb-2">
                        <div className="bg-secondary/70 px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                          {category}
                        </div>
                        {posts.map((post) => (
                          <Link
                            key={post.slug}
                            href={post.slug}
                            className="block px-4 py-2 pl-6 text-sm text-slate-700 hover:bg-secondary hover:text-primary"
                            onClick={closeMobile}
                            title={post.title}
                          >
                            {post.title}
                          </Link>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>

            <Link
              href={PATH_CONTACT}
              className="btn-gold mx-4 mt-2 w-[calc(100%-2rem)]"
              onClick={closeMobile}
            >
              Get a solicitor
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

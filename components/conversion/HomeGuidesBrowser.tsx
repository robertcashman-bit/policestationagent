"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const GUIDES = [
  {
    href: "/pace-code-c",
    title: "PACE Code C",
    body: "Custody & interview rules (the core legal framework).",
    category: "Custody rules",
    featured: true,
  },
  {
    href: "/no-comment-interview",
    title: "No Comment Interview",
    body: "When it helps, when it hurts, and adverse inference.",
    category: "Interview strategy",
    featured: false,
  },
  {
    href: "/custody-time-limits",
    title: "Custody Time Limits",
    body: "How long you can be held and what happens next.",
    category: "Custody rules",
    featured: false,
  },
  {
    href: "/police-bail-explained",
    title: "Police Bail Explained",
    body: "Bail conditions, extensions, and what to do.",
    category: "After release",
    featured: false,
  },
  {
    href: "/voluntary-police-interview-risks",
    title: "Voluntary Interview Risks",
    body: "Don't attend without advice—protect yourself early.",
    category: "Interview strategy",
    featured: false,
  },
  {
    href: "/released-under-investigation",
    title: "Released Under Investigation (RUI)",
    body: "What it means and how to handle it.",
    category: "After release",
    featured: false,
  },
] as const;

const CATEGORIES = ["All", "Custody rules", "Interview strategy", "After release"] as const;

export function HomeGuidesBrowser() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    if (category === "All") return GUIDES;
    return GUIDES.filter((g) => g.category === category);
  }, [category]);

  const featured = GUIDES.find((g) => g.featured)!;
  const browse = filtered.filter((g) => !(category === "All" && g.featured));

  return (
    <section className="section-pad bg-[var(--cream)]" aria-labelledby="guides-heading">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-eyebrow">Legal guides</p>
            <h2 id="guides-heading" className="section-title mt-2">
              Know your rights before interview
            </h2>
            <p className="section-lede">
              Start with PACE Code C and the essentials: custody time limits, no comment interviews,
              bail, and voluntary interview risks.
            </p>
          </div>
          <Link href="/pace-code-c" className="btn-navy shrink-0">
            Start with PACE Code C
          </Link>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Guide categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-md border px-3 py-2 text-sm font-semibold transition-colors ${
                category === cat
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-primary hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {category === "All" ? (
          <Link
            href={featured.href}
            className="mt-6 block rounded-xl border border-accent/30 bg-card p-6 shadow-card lift-hover md:grid md:grid-cols-[1.2fr_1fr] md:gap-8 md:p-8"
          >
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                Featured guide
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-primary md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 max-w-measure text-muted-foreground">{featured.body}</p>
              <span className="mt-5 inline-flex text-sm font-bold text-primary underline-offset-2 group-hover:underline">
                Read the guide →
              </span>
            </div>
            <div
              className="mt-6 hidden items-end justify-end border-l border-border-subtle pl-8 md:mt-0 md:flex"
              aria-hidden="true"
            >
              <p className="font-display text-5xl font-bold leading-none text-primary/10">PACE</p>
            </div>
          </Link>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {browse.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="rounded-xl border border-border bg-card p-5 shadow-sm lift-hover"
            >
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {guide.category}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-primary">{guide.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{guide.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

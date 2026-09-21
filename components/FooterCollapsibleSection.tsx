"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

/** Mobile-first footer accordion; desktop columns render separately. */
export function FooterCollapsibleSection({ title, children, defaultOpen = false }: Props) {
  return (
    <details
      className="group border-b border-white/10 py-3 open:pb-4"
      open={defaultOpen || undefined}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-accent-light [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span
          className="text-accent-light/80 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >
          ▾
        </span>
      </summary>
      <div className="pt-3 pb-1">{children}</div>
    </details>
  );
}

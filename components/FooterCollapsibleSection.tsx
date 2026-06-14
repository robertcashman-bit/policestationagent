"use client";

import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function FooterCollapsibleSection({ title, children, defaultOpen = false }: Props) {
  return (
    <details className="group border-b border-slate-800 py-3" open={defaultOpen}>
      <summary className="cursor-pointer list-none flex items-center justify-between text-sm font-semibold text-white [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <span className="text-sky-400 group-open:rotate-180 transition-transform" aria-hidden="true">
          ▾
        </span>
      </summary>
      <div className="pt-3 pb-1">{children}</div>
    </details>
  );
}

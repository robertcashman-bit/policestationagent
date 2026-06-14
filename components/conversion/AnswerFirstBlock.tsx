"use client";

import type { ReactNode } from "react";
import { ConversionCTAGroup } from "@/components/conversion/ConversionCTAGroup";

type Props = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function AnswerFirstBlock({ title = "In brief", children, className = "" }: Props) {
  return (
    <section
      className={`rounded-xl border border-blue-200 bg-blue-50 p-6 mb-8 ${className}`}
      aria-labelledby="answer-first-heading"
    >
      <h2 id="answer-first-heading" className="text-lg font-bold text-slate-900 mb-2">
        {title}
      </h2>
      <div className="text-slate-700 text-base mb-4">{children}</div>
      <ConversionCTAGroup layout="stacked" />
    </section>
  );
}

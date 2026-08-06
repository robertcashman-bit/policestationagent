"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const ANCHOR_RE =
  /<a\s+[^>]*href=(["'])([^"']+)\1[^>]*>([\s\S]*?)<\/a>/gi;

function isSafeInternalHref(href: string): boolean {
  const trimmed = href.trim();
  return trimmed.startsWith("/") && !trimmed.startsWith("//");
}

/**
 * Render FAQ answer text that may contain trusted static <a href="/..."> labels.
 * Escapes everything else as plain text — never uses dangerouslySetInnerHTML.
 */
export function FaqAnswerBody({ answer }: { answer: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(ANCHOR_RE.source, "gi");

  while ((match = re.exec(answer)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(answer.slice(lastIndex, match.index));
    }
    const href = match[2];
    const label = match[3].replace(/<[^>]*>/g, "");
    if (isSafeInternalHref(href)) {
      nodes.push(
        <Link
          key={`${match.index}-${href}`}
          href={href}
          className="text-blue-600 hover:underline font-semibold"
        >
          {label}
        </Link>,
      );
    } else {
      nodes.push(label);
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < answer.length) {
    nodes.push(answer.slice(lastIndex));
  }

  return <p className="leading-relaxed whitespace-pre-line">{nodes}</p>;
}

"use client";

import { useEffect } from "react";

type ReplaceTextOnMountProps = {
  from: string;
  to: string;
  /**
   * Limits replacement to a DOM subtree (defaults to `#main-content`).
   * Set to `null` to search the whole document body.
   */
  scopeSelector?: string | null;
};

export default function ReplaceTextOnMount({
  from,
  to,
  scopeSelector = "#main-content",
}: ReplaceTextOnMountProps) {
  useEffect(() => {
    if (!from || from === to) return;

    const scopeEl =
      scopeSelector === null
        ? document.body
        : (document.querySelector(scopeSelector) ?? document.body);

    const walker = document.createTreeWalker(scopeEl, NodeFilter.SHOW_TEXT);
    let node: Text | null;

    // eslint-disable-next-line no-cond-assign
    while ((node = walker.nextNode() as Text | null)) {
      const value = node.nodeValue;
      if (!value?.includes(from)) continue;
      node.nodeValue = value.replaceAll(from, to);
    }
  }, [from, to, scopeSelector]);

  return null;
}


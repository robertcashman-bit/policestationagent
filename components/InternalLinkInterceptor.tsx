'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

function findAnchor(start: HTMLElement | null): HTMLAnchorElement | null {
  let el: HTMLElement | null = start;
  while (el) {
    if (el.tagName === 'A') return el as HTMLAnchorElement;
    el = el.parentElement;
  }
  return null;
}

function isModifiedEvent(e: MouseEvent): boolean {
  return Boolean(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}

export default function InternalLinkInterceptor({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    // Only left-click.
    if (e.button !== 0) return;
    if (isModifiedEvent(e)) return;

    const target = e.target as HTMLElement | null;
    const anchor = findAnchor(target);
    if (!anchor) return;

    const hrefAttr = anchor.getAttribute('href');
    if (!hrefAttr) return;

    // Let the browser handle in-page anchors.
    if (hrefAttr.startsWith('#')) return;

    // Let the browser handle downloads and explicit new-tab links.
    if (anchor.hasAttribute('download')) return;
    const targetAttr = anchor.getAttribute('target');
    if (targetAttr && targetAttr !== '_self') return;

    // Let the browser handle special protocols.
    if (
      hrefAttr.startsWith('mailto:') ||
      hrefAttr.startsWith('tel:') ||
      hrefAttr.startsWith('sms:')
    ) {
      return;
    }

    // Resolve relative/absolute hrefs to decide if same-origin.
    let url: URL;
    try {
      url = new URL(hrefAttr, window.location.origin);
    } catch {
      return;
    }

    if (url.origin !== window.location.origin) return;

    // Prevent full page reload and route client-side.
    e.preventDefault();
    router.push(`${url.pathname}${url.search}${url.hash}`);
  };

  return <div onClickCapture={onClickCapture}>{children}</div>;
}


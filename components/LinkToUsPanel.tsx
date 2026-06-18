"use client";

import { useCallback, useState } from "react";
import {
  RESOURCE_HUB_URL,
  SUGGESTED_LINK_ANCHORS,
  AUTHORITY_NAP,
  DIRECTORY_CITATIONS,
  REPUK_PROFILE_URL,
} from "@/config/link-authority";

function CopyButton({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [value]);

  return (
    <button
      type="button"
      onClick={copy}
      className="w-full text-left rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 px-4 py-3 text-sm"
    >
      <span className="font-semibold text-slate-900 block">{label}</span>
      <span className="text-slate-600 text-xs mt-1 block truncate">{value}</span>
      <span className="text-blue-600 text-xs mt-2 block">{copied ? "Copied" : "Click to copy"}</span>
    </button>
  );
}

export default function LinkToUsPanel() {
  return (
    <div className="space-y-4 not-prose">
      <CopyButton label="Primary resource hub URL" value={RESOURCE_HUB_URL} />
      {SUGGESTED_LINK_ANCHORS.map((anchor) => (
        <CopyButton
          key={anchor}
          label={`Suggested link text: "${anchor}"`}
          value={`<a href="${RESOURCE_HUB_URL}">${anchor}</a>`}
        />
      ))}
      <h3 className="text-sm font-bold text-slate-900 pt-4">Directory &amp; authority links</h3>
      {DIRECTORY_CITATIONS.map((c) => (
        <CopyButton
          key={c.url}
          label={c.name}
          value={`<a href="${c.url}" rel="noopener noreferrer">${c.anchor}</a>`}
        />
      ))}
      <CopyButton
        label="RepUK profile (Robert Cashman)"
        value={REPUK_PROFILE_URL}
      />
      <p className="text-sm text-slate-600 pt-2">
        You may link to these pages freely for educational or community purposes. Content is
        sourced from gov.uk and legislation.gov.uk where cited. Contact{" "}
        <a href={`mailto:${AUTHORITY_NAP.email}`} className="text-blue-600 underline">
          {AUTHORITY_NAP.email}
        </a>{" "}
        for media enquiries.
      </p>
    </div>
  );
}

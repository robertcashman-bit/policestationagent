"use client";

import { useCallback, useState } from "react";
import { EMBED_BADGE_HTML } from "@/config/link-authority";

export default function SolicitorReferralBadge() {
  const [copied, setCopied] = useState(false);

  const copyEmbed = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMBED_BADGE_HTML);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section className="bg-white rounded-xl border-2 border-blue-200 shadow-lg p-6 md:p-8 my-8 not-prose">
      <h2 className="text-xl font-bold text-slate-900 mb-2">Link to us from your firm website</h2>
      <p className="text-slate-600 text-sm mb-4">
        Firms we cover may add this badge to their police station cover page. It links to our
        solicitor agent services.
      </p>
      <div
        className="mb-4 inline-block"
        dangerouslySetInnerHTML={{ __html: EMBED_BADGE_HTML }}
      />
      <button
        type="button"
        onClick={copyEmbed}
        className="block w-full sm:w-auto rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-semibold px-4 py-2 text-sm"
      >
        {copied ? "Copied embed code" : "Copy embed HTML"}
      </button>
      <p className="text-xs text-slate-500 mt-3">
        More link options: <a href="/link-to-us" className="text-blue-600 underline">Link to us</a>
      </p>
    </section>
  );
}

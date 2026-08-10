"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function CheckoutButtons() {
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState<"standard" | "cloud">("standard");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const p = searchParams.get("plan");
    if (p === "cloud") setPlan("cloud");
  }, [searchParams]);

  async function startCheckout() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "subscription", plan }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL returned");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setPlan("standard")}
          className={`flex-1 rounded-lg border-2 px-5 py-4 text-left transition ${
            plan === "standard"
              ? "border-custody-blue bg-custody-blue/5 dark:bg-custody-blue/10"
              : "border-custody-slate/20 hover:border-custody-slate/40 dark:border-custody-light/10"
          }`}
        >
          <span className="block text-sm font-semibold text-custody-navy dark:text-white">
            Standard
          </span>
          <span className="mt-1 block text-xs text-custody-slate dark:text-custody-light/70">
            Local backup only
          </span>
        </button>
        <button
          type="button"
          onClick={() => setPlan("cloud")}
          className={`flex-1 rounded-lg border-2 px-5 py-4 text-left transition ${
            plan === "cloud"
              ? "border-custody-accent bg-custody-accent/5 dark:bg-custody-accent/10"
              : "border-custody-slate/20 hover:border-custody-slate/40 dark:border-custody-light/10"
          }`}
        >
          <span className="block text-sm font-semibold text-custody-navy dark:text-white">
            Standard + Cloud Backup
          </span>
          <span className="mt-1 block text-xs text-custody-slate dark:text-custody-light/70">
            Incorruptible AWS backup included
          </span>
        </button>
      </div>

      {plan === "standard" && (
        <p className="rounded-lg border border-amber-300/50 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-500/30 dark:bg-amber-950/20 dark:text-amber-300/80">
          <strong>Warning:</strong> Without cloud backup, your data is stored
          only on your computer. If your hard drive fails, your records could be
          permanently lost with no chance of recovery.
        </p>
      )}

      <button
        type="button"
        onClick={startCheckout}
        disabled={loading}
        className="rounded-lg bg-custody-blue px-6 py-3 text-base font-medium text-white hover:bg-custody-accent disabled:opacity-50"
      >
        {loading
          ? "Redirecting\u2026"
          : plan === "cloud"
            ? "Subscribe with Cloud Backup"
            : "Subscribe (Local Backup Only)"}
      </button>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

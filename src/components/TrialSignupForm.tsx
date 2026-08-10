"use client";

import { useState } from "react";
import Link from "next/link";

export function TrialSignupForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    licenseKey: string;
    expiresAt: string;
    message?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyKey() {
    if (!result?.licenseKey) return;
    navigator.clipboard.writeText(result.licenseKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (result) {
    return (
      <div className="space-y-6">
        <div className="rounded-xl border-2 border-green-400/50 bg-green-50 p-6 dark:border-green-500/30 dark:bg-green-950/20">
          <p className="font-semibold text-green-800 dark:text-green-200">
            {result.message || "Your trial is ready."}
          </p>
          <div className="mt-4">
            <label className="block text-xs font-medium text-green-700 dark:text-green-300">
              Your licence key
            </label>
            <div className="mt-1.5 flex items-center gap-2">
              <code className="flex-1 rounded-lg border border-green-300/50 bg-white px-4 py-3 font-mono text-lg tracking-wider text-custody-navy dark:border-green-500/20 dark:bg-custody-slate/50 dark:text-white">
                {result.licenseKey}
              </code>
              <button
                type="button"
                onClick={copyKey}
                className="shrink-0 rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white hover:bg-green-700"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
          {result.expiresAt && (
            <p className="mt-3 text-xs text-green-700 dark:text-green-400">
              Expires:{" "}
              {new Date(result.expiresAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>

        <div className="rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
          <h3 className="font-semibold text-custody-navy dark:text-white">
            What to do next
          </h3>
          <ol className="mt-3 space-y-3 text-sm text-custody-slate dark:text-custody-light/80">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-custody-accent/15 text-xs font-bold text-custody-blue dark:bg-custody-accent/25 dark:text-custody-accent">
                1
              </span>
              <span>
                <Link
                  href="/download"
                  className="font-medium text-custody-blue hover:text-custody-accent"
                >
                  Download Custody Note
                </Link>{" "}
                and install it on your computer.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-custody-accent/15 text-xs font-bold text-custody-blue dark:bg-custody-accent/25 dark:text-custody-accent">
                2
              </span>
              <span>
                Open the app. When prompted, enter your licence key above.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-custody-accent/15 text-xs font-bold text-custody-blue dark:bg-custody-accent/25 dark:text-custody-accent">
                3
              </span>
              <span>
                Start recording attendances. All features are unlocked for 30
                days.
              </span>
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-md rounded-xl border border-custody-slate/15 bg-white p-6 shadow-sm dark:border-custody-light/10 dark:bg-custody-slate/30">
        <label
          htmlFor="trial-email"
          className="block text-sm font-medium text-custody-navy dark:text-white"
        >
          Email address
        </label>
        <input
          id="trial-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-2 block w-full rounded-lg border border-custody-slate/20 bg-white px-4 py-2.5 text-sm text-custody-navy placeholder:text-custody-slate/40 focus:border-custody-accent focus:outline-none focus:ring-1 focus:ring-custody-accent dark:border-custody-light/10 dark:bg-custody-slate/40 dark:text-white dark:placeholder:text-custody-light/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-custody-blue px-5 py-2.5 text-sm font-medium text-white hover:bg-custody-accent disabled:opacity-50"
        >
          {loading ? "Creating your trial\u2026" : "Start free trial"}
        </button>
        {error && (
          <p
            className="mt-3 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    </form>
  );
}

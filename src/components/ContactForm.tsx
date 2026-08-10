"use client";

import { useState } from "react";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      setResult({ ok: true, message: data.message || "Message sent. We\u2019ll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setResult({
        ok: false,
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  }

  if (result?.ok) {
    return (
      <div className="rounded-xl border-2 border-green-400/50 bg-green-50 p-6 dark:border-green-500/30 dark:bg-green-950/20">
        <p className="font-semibold text-green-800 dark:text-green-200">
          {result.message}
        </p>
        <button
          type="button"
          onClick={() => setResult(null)}
          className="mt-3 text-sm font-medium text-green-700 underline hover:text-green-900 dark:text-green-300 dark:hover:text-green-100"
        >
          Send another message
        </button>
      </div>
    );
  }

  const inputClasses =
    "mt-1.5 block w-full rounded-lg border border-custody-slate/20 bg-white px-4 py-2.5 text-sm text-custody-navy placeholder:text-custody-slate/40 focus:border-custody-accent focus:outline-none focus:ring-1 focus:ring-custody-accent dark:border-custody-light/10 dark:bg-custody-slate/40 dark:text-white dark:placeholder:text-custody-light/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-sm font-medium text-custody-navy dark:text-white"
          >
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="block text-sm font-medium text-custody-navy dark:text-white"
          >
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="contact-subject"
          className="block text-sm font-medium text-custody-navy dark:text-white"
        >
          Subject
        </label>
        <input
          id="contact-subject"
          type="text"
          required
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          placeholder="What\u2019s this about?"
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium text-custody-navy dark:text-white"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us how we can help\u2026"
          className={inputClasses}
        />
      </div>
      {result && !result.ok && (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {result.message}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-custody-blue px-6 py-2.5 text-sm font-medium text-white hover:bg-custody-accent disabled:opacity-50"
      >
        {loading ? "Sending\u2026" : "Send message"}
      </button>
    </form>
  );
}

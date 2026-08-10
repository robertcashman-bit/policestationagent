'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { SITE } from '@/lib/site';
import { POLICE_STATION_HELP_TEXT } from '@/lib/legalCopy';

const SUBJECTS = [
  { value: 'account', label: 'Account or sign-in help' },
  { value: 'billing', label: 'Billing, refunds, or subscriptions' },
  { value: 'bug', label: 'Bug or site issue' },
  { value: 'content', label: 'Training content feedback or error' },
  { value: 'accreditation', label: 'Question about PSRAS / accreditation' },
  { value: 'privacy', label: 'Privacy, data, or security request' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'other', label: 'Something else' },
] as const;

const MAX_MESSAGE_LENGTH = 2000;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const hint =
          typeof data.hint === 'string'
            ? data.hint
            : data.unavailable
              ? `Our contact form is temporarily offline. Email us at ${SITE.contactEmail}.`
              : null;
        setError(hint || data.error || 'Something went wrong. Please try again in a moment.');
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Could not send your message. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const messageLength = formData.message.length;
  const messageOver = messageLength > MAX_MESSAGE_LENGTH;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0B3C5D] mb-4">We&apos;re here to help</h1>
        <p className="text-xl text-slate-700 leading-relaxed">
          Questions about {SITE.name}, your account, or the training content? Send us a message —
          we&apos;ll get back to you within a few working days.
        </p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Send a message</CardTitle>
          <CardDescription className="text-base">
            We use this for support, feedback, and general enquiries. If you are a member of the
            public looking for legal help, please see the note at the bottom of this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" aria-hidden />
              <p className="text-lg font-semibold text-foreground">Message sent</p>
              <p className="text-slate-700">
                Thanks — we&apos;ll reply to the address you provided shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot: hidden from users, ignored by them, often filled by bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company (leave this field empty)</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden />
                  <span>{error}</span>
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    maxLength={120}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    maxLength={200}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>
                    Choose a topic…
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.label}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="message">Message</Label>
                  <span
                    className={`text-xs ${messageOver ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}
                    aria-live="polite"
                  >
                    {messageLength} / {MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value.slice(0, MAX_MESSAGE_LENGTH) })
                  }
                  rows={6}
                  required
                  maxLength={MAX_MESSAGE_LENGTH}
                  placeholder="Please include any relevant details. Do not share passwords or sensitive personal data about third parties."
                />
              </div>
              <p className="text-xs text-muted-foreground">
                We&apos;ll use your name and email to reply. See our{' '}
                <Link href="/legal/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>{' '}
                for how we handle your data.
              </p>
              <Button type="submit" className="w-full" size="lg" disabled={loading || messageOver}>
                {loading ? 'Sending…' : 'Send message'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-semibold text-amber-900 mb-2">Need legal help right now?</h2>
        <p className="text-sm text-gray-800 leading-relaxed">
          {SITE.name} is a training platform for police station representatives. We don&apos;t give
          legal advice to members of the public. {POLICE_STATION_HELP_TEXT}
        </p>
      </div>

      <p className="mt-6 text-center text-muted-foreground text-sm">
        <Link href="/" className="text-primary hover:underline">
          &larr; Back to home
        </Link>
      </p>
    </div>
  );
}

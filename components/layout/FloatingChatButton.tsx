'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const SUPPORT_SUBJECT = 'Bug or site issue';

export default function FloatingChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const resetForm = () => {
    setEmail('');
    setMessage('');
    setError('');
    setSent(false);
    setLoading(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Support request',
          email,
          subject: SUPPORT_SUBJECT,
          message,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const hint =
          typeof data.hint === 'string'
            ? data.hint
            : data.unavailable
              ? 'Contact form offline — use the full contact page or email support.'
              : null;
        setError(hint || data.error || 'Could not send your message. Please try again.');
        return;
      }
      setSent(true);
    } catch {
      setError('Could not send. Please try again or use the contact form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-navy shadow-elevated transition-all duration-200 hover:scale-105 hover:bg-accent-600"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--navy)' }}
        aria-label={isOpen ? 'Close support panel' : 'Open support panel'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 w-[min(100vw-2rem,20rem)] overflow-hidden rounded-2xl border border-border bg-white shadow-elevated animate-slide-up"
          role="dialog"
          aria-label="Support"
        >
          <div className="bg-primary p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">Something not working?</h3>
              <button
                type="button"
                onClick={handleClose}
                className="text-white/80 transition-colors hover:text-white"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {sent ? (
              <div className="space-y-3 text-center py-2">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" aria-hidden />
                <p className="text-sm font-semibold text-foreground">Message sent</p>
                <p className="text-xs text-slate-600">
                  We&apos;ll reply to {email} within a few working days.
                </p>
                <Button type="button" variant="outline" size="sm" className="w-full" onClick={handleClose}>
                  Close
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-3 text-sm text-muted-foreground">
                  Report a bug or ask for help — we&apos;ll email you back.
                </p>
                {error && (
                  <div
                    role="alert"
                    className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    <span>{error}</span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="support-email" className="text-xs">
                      Your email
                    </Label>
                    <Input
                      id="support-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-9 text-sm"
                      placeholder="you@example.com"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="support-message" className="text-xs">
                      What went wrong?
                    </Label>
                    <Textarea
                      id="support-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      minLength={10}
                      rows={4}
                      className="text-sm resize-none"
                      placeholder="Describe the issue — which page, what you expected, what happened…"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="sm" disabled={loading}>
                    {loading ? 'Sending…' : 'Send to support'}
                  </Button>
                </form>
                <div className="mt-3 space-y-2 border-t border-border pt-3">
                  <a
                    href="/legal/contact"
                    className="block text-center text-xs font-medium text-[#0B3C5D] hover:underline"
                  >
                    Full contact form
                  </a>
                  <a
                    href="/legal/faq"
                    className="block text-center text-xs text-slate-600 hover:text-[#0B3C5D]"
                  >
                    View FAQ
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

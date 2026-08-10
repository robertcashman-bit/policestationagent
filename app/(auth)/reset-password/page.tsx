'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { getErrorMessage } from '@/lib/utils/error-handler';

export default function ResetPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${globalThis.location?.origin ?? ''}/update-password`,
      });
      if (error) throw error;
      setMessage('Password reset email sent. Check your inbox.');
    } catch (resetError: unknown) {
      setError(getErrorMessage(resetError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardContent className="pt-8 pb-8 px-8">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Reset password</h1>
            <p className="text-muted-foreground text-center mb-6">
              Enter your account email and we will send a password reset link.
            </p>

            {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
            {message && <p className="text-sm text-emerald-700 mb-4">{message}</p>}

            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-12" disabled={loading}>
                {loading ? 'Sending...' : 'Send reset link'}
              </Button>
            </form>

            <div className="text-center mt-6">
              <Link href="/login" className="text-primary font-semibold hover:underline">
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

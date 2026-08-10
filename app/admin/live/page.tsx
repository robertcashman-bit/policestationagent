'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type LiveUser = {
  sessionId: string;
  userId: string;
  email: string;
  fullName: string | null;
  section: string;
  currentPath: string;
  loginTime: string;
  lastSeenAt: string | null;
  sessionDuration: string;
  idleFor: string;
  isLive: boolean;
  ipAddress: string | null;
};

type LiveResponse = {
  live: LiveUser[];
  idle: LiveUser[];
  liveCount: number;
  openSessionCount: number;
  staleCutoffMinutes: number;
  fetchedAt: string;
  error?: string;
};

function formatTime(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function UserTable({ rows, emptyMessage }: { rows: LiveUser[]; emptyMessage: string }) {
  if (rows.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Section</TableHead>
          <TableHead>Session</TableHead>
          <TableHead>Last seen</TableHead>
          <TableHead>Idle</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((u) => (
          <TableRow key={u.sessionId}>
            <TableCell>{u.fullName || '—'}</TableCell>
            <TableCell className="font-mono text-xs">{u.email}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-medium">{u.section}</span>
                <span className="text-xs text-muted-foreground font-mono">{u.currentPath}</span>
              </div>
            </TableCell>
            <TableCell>{u.sessionDuration}</TableCell>
            <TableCell>{formatTime(u.lastSeenAt ?? u.loginTime)}</TableCell>
            <TableCell>{u.idleFor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function AdminLivePage() {
  const [data, setData] = useState<LiveResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/live-users', { cache: 'no-store' });
      const json = (await res.json()) as LiveResponse;
      if (!res.ok) {
        setError(json.error ?? 'Could not load live users');
        setData(null);
        return;
      }
      setError(null);
      setData(json);
    } catch {
      setError('Network error loading live users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    const id = setInterval(() => void load(), 15_000);
    return () => clearInterval(id);
  }, [load]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-800 mb-2">Live users</h1>
        <p className="text-muted-foreground text-lg">
          Who is on the site right now — email, how long, and which section they are in.
        </p>
        {data?.fetchedAt && (
          <p className="text-xs text-muted-foreground mt-2">
            Updated {formatTime(data.fetchedAt)} · refreshes every 15s
          </p>
        )}
      </div>

      {error && (
        <div
          role="alert"
          className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm"
        >
          {error}
          {error.includes('last_seen_at') && (
            <span>
              {' '}
              Run the database migration <code>0002_session_presence.sql</code> in Supabase.
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Online now</CardTitle>
            <CardDescription>Active in last {data?.staleCutoffMinutes ?? 3} minutes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{loading ? '…' : (data?.liveCount ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Open sessions</CardTitle>
            <CardDescription>Logged in, not signed out</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{loading ? '…' : (data?.openSessionCount ?? 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Idle sessions</CardTitle>
            <CardDescription>No recent presence ping</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{loading ? '…' : (data?.idle?.length ?? 0)}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Online now ({data?.live?.length ?? 0})</CardTitle>
          <CardDescription>
            Signed-in users with a recent heartbeat. Section updates when they change page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <UserTable rows={data?.live ?? []} emptyMessage="No one is actively browsing right now." />
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Idle open sessions ({data?.idle?.length ?? 0})</CardTitle>
          <CardDescription>
            Still logged in but no presence ping recently (tab closed or left idle).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : (
            <UserTable rows={data?.idle ?? []} emptyMessage="No idle open sessions." />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

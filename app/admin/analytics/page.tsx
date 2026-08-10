'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface SessionRow {
  id: string;
  user_id: string;
  session_id: string;
  login_time: string;
  logout_time: string | null;
  last_seen_at: string | null;
  current_path: string | null;
  section: string | null;
  ip_address: string | null;
  email: string;
  full_name: string | null;
}

interface UserStat {
  user_id: string;
  total_answered: number;
  correct_answers: number;
  accuracy: number;
  email: string;
  full_name: string | null;
}

export default function AdminAnalyticsPage() {
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [userStats, setUserStats] = useState<UserStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ timeRange: '30' });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/analytics?timeRange=${filter.timeRange}`, {
        cache: 'no-store',
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Failed to load analytics');
        setSessions([]);
        setUserStats([]);
        return;
      }
      setError(null);
      setSessions(json.sessions ?? []);
      setUserStats(json.userStats ?? []);
    } catch {
      setError('Network error loading analytics');
    } finally {
      setLoading(false);
    }
  }, [filter.timeRange]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const getSessionDuration = (login: string, logout: string | null) => {
    if (!logout) return 'Active';
    const start = new Date(login);
    const end = new Date(logout);
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays}d ${diffHours % 24}h`;
    if (diffHours > 0) return `${diffHours}h ${diffMins % 60}m`;
    return `${diffMins}m`;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-foreground mb-3">Analytics Dashboard</h1>
        <p className="text-lg text-muted-foreground">
          View user activity, sessions, and performance metrics
        </p>
      </div>

      {error && (
        <div
          role="alert"
          className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm"
        >
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Time Range</Label>
              <Select
                value={filter.timeRange}
                onChange={(e) => setFilter({ ...filter, timeRange: e.target.value })}
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="all">All time</option>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Sessions</CardTitle>
            <CardDescription className="text-base">User login sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{sessions.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Active Sessions</CardTitle>
            <CardDescription className="text-base">Sessions without logout</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">
              {sessions.filter((s) => !s.logout_time).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Total Users</CardTitle>
            <CardDescription className="text-base">Users with practice activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-foreground">{userStats.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">User Performance</CardTitle>
          <CardDescription className="text-base">Question answering statistics by user</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-12 text-base text-muted-foreground">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Total Answered</TableHead>
                    <TableHead>Correct</TableHead>
                    <TableHead>Accuracy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userStats.map((stat) => (
                    <TableRow key={stat.user_id}>
                      <TableCell>{stat.full_name || '—'}</TableCell>
                      <TableCell>{stat.email}</TableCell>
                      <TableCell>{stat.total_answered}</TableCell>
                      <TableCell>{stat.correct_answers}</TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${
                            stat.accuracy >= 80
                              ? 'text-green-600'
                              : stat.accuracy >= 60
                                ? 'text-yellow-600'
                                : 'text-red-600'
                          }`}
                        >
                          {stat.accuracy.toFixed(1)}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">User Sessions</CardTitle>
          <CardDescription className="text-base">
            Login/logout activity, section, and IP addresses
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center py-12 text-base text-muted-foreground">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Login Time</TableHead>
                    <TableHead>Logout Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Section</TableHead>
                    <TableHead>IP Address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sessions.slice(0, 50).map((session) => (
                    <TableRow key={session.id}>
                      <TableCell>{session.full_name || '—'}</TableCell>
                      <TableCell>{session.email}</TableCell>
                      <TableCell>{new Date(session.login_time).toLocaleString()}</TableCell>
                      <TableCell>
                        {session.logout_time
                          ? new Date(session.logout_time).toLocaleString()
                          : 'Active'}
                      </TableCell>
                      <TableCell>
                        {getSessionDuration(session.login_time, session.logout_time)}
                      </TableCell>
                      <TableCell>{session.section ?? '—'}</TableCell>
                      <TableCell>{session.ip_address || '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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
import { createAdminClient, hasAdminClient } from '@/lib/supabase/admin';
import { isAdminEmail } from '@/lib/auth/admin-emails';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type ProfileRow = {
  user_id: string;
  email: string;
  full_name: string | null;
  created_at: string;
};

type AccessRow = {
  email: string;
  is_paid: boolean | null;
  access_status: string | null;
  plan: string | null;
  current_period_end: string | null;
};

type UserView = {
  id: string;
  email: string;
  fullName: string | null;
  createdAt: string;
  isAdmin: boolean;
  isPaid: boolean;
  accessStatus: string;
  plan: string | null;
  periodEnd: string | null;
};

async function loadUsers(): Promise<{
  users: UserView[];
  warning: string | null;
}> {
  if (!hasAdminClient()) {
    return {
      users: [],
      warning:
        'Service-role key is not configured (SUPABASE_SERVICE_ROLE_KEY). User listing is disabled.',
    };
  }

  const admin = createAdminClient();

  // Pull profiles + customer_access in parallel. Both queries bypass RLS
  // because we're using the service role.
  const [profilesRes, accessRes] = await Promise.all([
    admin
      .from('profiles')
      .select('user_id, email, full_name, created_at')
      .order('created_at', { ascending: false })
      .limit(500),
    admin
      .from('customer_access')
      .select('email, is_paid, access_status, plan, current_period_end'),
  ]);

  if (profilesRes.error) {
    return {
      users: [],
      warning: `Could not load profiles: ${profilesRes.error.message}`,
    };
  }

  const accessByEmail = new Map<string, AccessRow>();
  for (const row of (accessRes.data ?? []) as AccessRow[]) {
    if (!row?.email) continue;
    accessByEmail.set(row.email.toLowerCase(), row);
  }

  const users: UserView[] = (profilesRes.data ?? []).map((p: ProfileRow) => {
    const access = accessByEmail.get(p.email.toLowerCase());
    return {
      id: p.user_id,
      email: p.email,
      fullName: p.full_name,
      createdAt: p.created_at,
      isAdmin: isAdminEmail(p.email),
      isPaid: Boolean(access?.is_paid),
      accessStatus: access?.access_status ?? 'inactive',
      plan: access?.plan ?? null,
      periodEnd: access?.current_period_end ?? null,
    };
  });

  return {
    users,
    warning: accessRes.error
      ? `Note: customer_access read failed (${accessRes.error.message}); paid columns will be blank.`
      : null,
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString();
}

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: 'green' | 'amber' | 'red' | 'slate';
}) {
  const map: Record<typeof tone, string> = {
    green: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    red: 'bg-red-100 text-red-800 border-red-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${map[tone]}`}
    >
      {label}
    </span>
  );
}

function statusTone(status: string): 'green' | 'amber' | 'red' | 'slate' {
  if (status === 'active') return 'green';
  if (status === 'grace') return 'amber';
  if (status === 'refunded') return 'red';
  return 'slate';
}

export default async function AdminUsersPage() {
  const { users, warning } = await loadUsers();
  const paidCount = users.filter((u) => u.isPaid).length;
  const adminCount = users.filter((u) => u.isAdmin).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-navy-800 mb-2">User Management</h1>
        <p className="text-muted-foreground text-lg">
          {users.length} accounts · {paidCount} paid · {adminCount} admin
        </p>
      </div>

      {warning && (
        <div
          role="alert"
          aria-live="polite"
          className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl text-sm"
        >
          {warning}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Users ({users.length})</CardTitle>
          <CardDescription>
            All accounts that exist in the <code>profiles</code> table, with
            current paid-access state from <code>customer_access</code>. Admin
            badge is derived from the <code>ADMIN_EMAILS</code> env var.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-sm text-muted-foreground">No users yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Renews</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{u.fullName || '—'}</span>
                        {u.isAdmin && (
                          <span className="mt-0.5">
                            <StatusPill label="Admin" tone="amber" />
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {u.email}
                    </TableCell>
                    <TableCell>
                      <StatusPill
                        label={u.isPaid ? u.accessStatus : 'free'}
                        tone={u.isPaid ? statusTone(u.accessStatus) : 'slate'}
                      />
                    </TableCell>
                    <TableCell>{u.plan || '—'}</TableCell>
                    <TableCell>{formatDate(u.periodEnd)}</TableCell>
                    <TableCell>{formatDate(u.createdAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

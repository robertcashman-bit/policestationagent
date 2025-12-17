import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export interface AdminSession {
  role: string;
  email: string;
}

/**
 * Check if JWT_SECRET is properly configured
 */
export function isJWTSecretConfigured(): boolean {
  const jwtSecret = process.env.JWT_SECRET;
  return !!(jwtSecret && jwtSecret !== 'fallback-secret-change-in-production' && jwtSecret.length > 10);
}

/**
 * Check if user is authenticated as admin
 * Returns session data if valid, null if not
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret);
    
    if (payload.role !== 'admin') {
      return null;
    }

    return {
      role: payload.role as string,
      email: payload.email as string,
    };
  } catch (error) {
    // Token invalid or expired
    return null;
  }
}

/**
 * Check if admin is authenticated (boolean helper)
 */
export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getAdminSession();
  return session !== null;
}

/**
 * Require admin authentication - redirects to login if not authenticated
 * Use this in server components
 */
export async function requireAdminAuth(): Promise<AdminSession> {
  const session = await getAdminSession();
  
  if (!session) {
    redirect('/admin/login');
  }
  
  return session;
}

import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// SECURITY: Use ADMIN_SECRET from environment. Fallback only for local dev.
const ADMIN_SECRET =
  process.env.ADMIN_SECRET ||
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production"
    ? ""
    : "dev-only-fallback-secret-change-in-production");
const secret = new TextEncoder().encode(ADMIN_SECRET);

export interface AdminSession {
  role: string;
  email: string;
}

/**
 * Check if admin auth is properly configured (ADMIN_SECRET or JWT_SECRET set in production)
 */
export function isJWTSecretConfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return true;
  return (
    (process.env.ADMIN_SECRET?.length ?? 0) >= 32 ||
    (process.env.JWT_SECRET?.length ?? 0) >= 32
  );
}

/**
 * Check if user is authenticated as admin
 * Returns session data if valid, null if not
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    if (process.env.NODE_ENV === "production" && !ADMIN_SECRET) {
      return null;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("admin-token")?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret);

    if (payload.role !== "admin") {
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
    redirect("/admin/login");
  }

  return session;
}

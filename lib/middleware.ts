import { NextRequest } from "next/server";

/**
 * @deprecated Legacy JWT auth via auth-token cookie. Use magic-code admin session instead.
 * Kept temporarily for any external integrations; returns null for all requests.
 */
export async function verifyAuth(
  _request: NextRequest
): Promise<{ userId: number; username: string } | null> {
  return null;
}

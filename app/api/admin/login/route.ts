import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

// SECURITY: Use environment variables for secret and credentials
const ADMIN_SECRET =
  process.env.ADMIN_SECRET ||
  process.env.JWT_SECRET ||
  (process.env.NODE_ENV === "production" ? "" : "dev-only-fallback");
const secret = new TextEncoder().encode(ADMIN_SECRET);

// SECURITY: Admin credentials from env - required in production
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || (process.env.NODE_ENV === "production" ? "" : "admin");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV === "production" ? "" : "Secure123!");

export async function POST(request: NextRequest) {
  try {
    // Block login if not configured in production
    if (process.env.NODE_ENV === "production") {
      if (!ADMIN_USERNAME || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
        return NextResponse.json(
          { error: "Admin login not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD (min 12 chars)." },
          { status: 503 }
        );
      }
      if (!ADMIN_SECRET || ADMIN_SECRET.length < 32) {
        return NextResponse.json(
          { error: "Admin auth not configured. Set ADMIN_SECRET (min 32 chars)." },
          { status: 503 }
        );
      }
    }

    const { username, password } = await request.json();

    const isValidAdmin =
      typeof username === "string" &&
      typeof password === "string" &&
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD;

    if (!isValidAdmin) {
      // Add small delay to prevent timing attacks
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const user = { id: 1, username: ADMIN_USERNAME };

    // Create JWT token
    const token = await new SignJWT({
      role: "admin",
      userId: user.id,
      username: user.username,
      email: "robertcashman@defencelegalservices.co.uk",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("24h")
      .sign(secret);

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

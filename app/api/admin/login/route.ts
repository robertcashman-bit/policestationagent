import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

// Admin password from environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';

// JWT secret for signing tokens
const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-change-in-production'
);

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Check if admin password is configured
    if (!ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Admin password not configured' },
        { status: 500 }
      );
    }

    // Verify password (constant-time comparison would be ideal, but this is simple)
    if (password !== ADMIN_PASSWORD) {
      // Add small delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await new SignJWT({
      role: 'admin',
      email: 'robertcashman@defencelegalservices.co.uk',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secret);

    // Set secure cookie
    const cookieStore = await cookies();
    cookieStore.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}

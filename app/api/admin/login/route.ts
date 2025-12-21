import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import { verifyUser } from '@/lib/auth';

// Hardcoded secret for admin auth - works without environment variables
const ADMIN_SECRET = '81be4a23633ca705d7596181996b26e41460510f1a5a9365665acf3e27f3311c';
const secret = new TextEncoder().encode(ADMIN_SECRET);

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // If username not provided, try common admin usernames
    let user = null;
    if (username) {
      user = await verifyUser(username, password);
    } else {
      // Try common admin usernames if no username provided
      const commonUsernames = ['admin', 'Cashman100', 'cashman100'];
      for (const uname of commonUsernames) {
        user = await verifyUser(uname, password);
        if (user) break;
      }
    }

    // Verify user credentials
    if (!user) {
      // Add small delay to prevent timing attacks
      await new Promise(resolve => setTimeout(resolve, 500));
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await new SignJWT({
      role: 'admin',
      userId: user.id,
      username: user.username,
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

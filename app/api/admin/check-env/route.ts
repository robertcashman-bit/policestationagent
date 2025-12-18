import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/admin-auth';
import { cookies } from 'next/headers';

// Simple diagnostic endpoint to check environment variable status
// Requires admin authentication
export async function GET() {
  // Verify admin session
  const cookieStore = cookies();
  const token = cookieStore.get('admin-token')?.value;
  
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const session = await verifyAdminSession(token);
  if (!session) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }
  
  const openaiKey = process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    OPENAI_API_KEY: {
      exists: !!openaiKey,
      length: openaiKey?.length || 0,
      prefix: openaiKey?.substring(0, 7) || 'NOT_SET',
      hasWhitespace: openaiKey ? (openaiKey !== openaiKey.trim()) : false,
    },
    JWT_SECRET: {
      exists: !!process.env.JWT_SECRET,
      length: process.env.JWT_SECRET?.length || 0,
    },
    NODE_ENV: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}

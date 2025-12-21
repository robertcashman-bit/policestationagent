import { NextResponse } from 'next/server';

export async function GET() {
  const jwtSecret = process.env.JWT_SECRET;
  
  return NextResponse.json({
    hasJwtSecret: !!jwtSecret,
    jwtSecretLength: jwtSecret?.length || 0,
    jwtSecretPreview: jwtSecret ? `${jwtSecret.substring(0, 4)}...${jwtSecret.substring(jwtSecret.length - 4)}` : 'NOT SET',
    isDefault1: jwtSecret === 'fallback-secret-change-in-production',
    isDefault2: jwtSecret === 'your-secret-key-change-in-production',
    wouldPassValidation: !!(jwtSecret && jwtSecret !== 'fallback-secret-change-in-production' && jwtSecret.length > 10),
  });
}


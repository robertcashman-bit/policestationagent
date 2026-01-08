import { NextResponse } from "next/server";

export async function GET() {
  const jwtSecret = process.env.JWT_SECRET;

  // Get list of all env var names (not values) that contain certain keywords
  const allEnvVarNames = Object.keys(process.env).filter(
    (key) =>
      key.includes("JWT") ||
      key.includes("SECRET") ||
      key.includes("VERCEL") ||
      key.includes("NODE")
  );

  return NextResponse.json({
    hasJwtSecret: !!jwtSecret,
    jwtSecretLength: jwtSecret?.length || 0,
    jwtSecretPreview: jwtSecret
      ? `${jwtSecret.substring(0, 4)}...${jwtSecret.substring(jwtSecret.length - 4)}`
      : "NOT SET",
    isDefault1: jwtSecret === "fallback-secret-change-in-production",
    isDefault2: jwtSecret === "your-secret-key-change-in-production",
    wouldPassValidation: !!(
      jwtSecret &&
      jwtSecret !== "fallback-secret-change-in-production" &&
      jwtSecret.length > 10
    ),
    envVarNamesFound: allEnvVarNames,
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { subscriberHash } from "@/lib/aws";

const REGION = process.env.AWS_REGION || "eu-west-2";
const BUCKET = process.env.AWS_BACKUP_BUCKET || "custody-note-backups";

/**
 * POST /api/backup/list
 * Lists available cloud backups for a subscriber.
 * Body: { key: string }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    if (!key) {
      return NextResponse.json(
        { error: "Missing licence key." },
        { status: 400 }
      );
    }

    const subData = await kv.get<{
      cloudBackup?: boolean;
      expiresAt?: string;
      status?: string;
    }>(`licence:key:${key.toUpperCase()}`);

    if (!subData || !subData.cloudBackup) {
      return NextResponse.json(
        { error: "Cloud backup not available for this licence." },
        { status: 403 }
      );
    }

    const hash = subscriberHash(key);
    const prefix = `backups/${hash}/`;

    const s3 = new S3Client({
      region: REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });

    const resp = await s3.send(
      new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: prefix,
        MaxKeys: 100,
      })
    );

    const backups = (resp.Contents || [])
      .filter((obj) => obj.Key && obj.Key.endsWith(".db"))
      .map((obj) => ({
        key: obj.Key!.replace(prefix, ""),
        size: obj.Size || 0,
        lastModified: obj.LastModified?.toISOString() || "",
      }))
      .sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      );

    return NextResponse.json({ backups, prefix });
  } catch (err) {
    console.error("Backup list error:", err);
    return NextResponse.json(
      { error: "Failed to list backups." },
      { status: 500 }
    );
  }
}

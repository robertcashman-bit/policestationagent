import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";
import { createHash } from "crypto";

const REGION = process.env.AWS_REGION || "eu-west-2";
const ROLE_ARN = process.env.AWS_BACKUP_ROLE_ARN || "";
const BUCKET = process.env.AWS_BACKUP_BUCKET || "custody-note-backups";
const EXTERNAL_ID = process.env.AWS_STS_EXTERNAL_ID || "custody-note-backup";
const CREDENTIAL_TTL_SECONDS = 900; // 15 minutes

const sts = new STSClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export function subscriberHash(licenceKey: string): string {
  return createHash("sha256")
    .update(licenceKey.trim().toUpperCase())
    .digest("hex")
    .slice(0, 24);
}

export async function issueBackupCredentials(licenceKey: string) {
  const hash = subscriberHash(licenceKey);
  const prefix = `backups/${hash}`;

  const scopedPolicy = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PutBackup",
        Effect: "Allow",
        Action: ["s3:PutObject"],
        Resource: `arn:aws:s3:::${BUCKET}/${prefix}/*`,
      },
      {
        Sid: "GetBackup",
        Effect: "Allow",
        Action: ["s3:GetObject"],
        Resource: `arn:aws:s3:::${BUCKET}/${prefix}/*`,
      },
      {
        Sid: "ListBackups",
        Effect: "Allow",
        Action: ["s3:ListBucket"],
        Resource: `arn:aws:s3:::${BUCKET}`,
        Condition: {
          StringLike: { "s3:prefix": [`${prefix}/*`] },
        },
      },
    ],
  });

  const cmd = new AssumeRoleCommand({
    RoleArn: ROLE_ARN,
    RoleSessionName: `cn-${hash.slice(0, 12)}`,
    ExternalId: EXTERNAL_ID,
    DurationSeconds: CREDENTIAL_TTL_SECONDS,
    Policy: scopedPolicy,
  });

  const resp = await sts.send(cmd);
  if (!resp.Credentials) {
    throw new Error("STS did not return credentials");
  }

  return {
    accessKeyId: resp.Credentials.AccessKeyId!,
    secretAccessKey: resp.Credentials.SecretAccessKey!,
    sessionToken: resp.Credentials.SessionToken!,
    expiration: resp.Credentials.Expiration!.toISOString(),
    bucket: BUCKET,
    region: REGION,
    prefix,
  };
}

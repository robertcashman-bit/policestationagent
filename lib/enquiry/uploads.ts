const ALLOWED_MIME = new Set(["application/pdf", "image/jpeg", "image/jpg", "image/png"]);
const ALLOWED_EXT = new Set(["pdf", "jpg", "jpeg", "png"]);
export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;
export const MAX_UPLOAD_FILES = 3;

function magicMime(buf: Buffer): string | null {
  if (buf.length >= 4 && buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46) {
    return "application/pdf";
  }
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (buf.length >= 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return "image/png";
  }
  return null;
}

export type SafeAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export function validateUploadFile(opts: {
  originalName: string;
  mimeType: string;
  buffer: Buffer;
}): { ok: true; attachment: SafeAttachment } | { ok: false; error: string } {
  const ext = opts.originalName.split(".").pop()?.toLowerCase() || "";
  if (!ALLOWED_EXT.has(ext)) {
    return { ok: false, error: "Only PDF, JPG, JPEG and PNG files are accepted." };
  }
  if (opts.buffer.length > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Each file must be 4MB or smaller." };
  }
  if (opts.buffer.length === 0) {
    return { ok: false, error: "Empty file rejected." };
  }
  const detected = magicMime(opts.buffer);
  if (!detected) {
    return { ok: false, error: "File content could not be verified as PDF, JPG or PNG." };
  }
  const rand = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  const safeExt = detected === "application/pdf" ? "pdf" : detected === "image/png" ? "png" : "jpg";
  return {
    ok: true,
    attachment: {
      filename: `enquiry-${rand}.${safeExt}`,
      content: opts.buffer,
      contentType: detected,
    },
  };
}

export async function parseMultipartUploads(
  formData: FormData,
  fieldName = "files",
): Promise<{ attachments: SafeAttachment[]; error?: string }> {
  const entries = formData.getAll(fieldName);
  if (entries.length > MAX_UPLOAD_FILES) {
    return { attachments: [], error: `Maximum ${MAX_UPLOAD_FILES} files allowed.` };
  }
  const attachments: SafeAttachment[] = [];
  for (const entry of entries) {
    if (!(entry instanceof File) || entry.size === 0) continue;
    const buffer = Buffer.from(await entry.arrayBuffer());
    const result = validateUploadFile({
      originalName: entry.name || "upload.bin",
      mimeType: entry.type || "application/octet-stream",
      buffer,
    });
    if (!result.ok) return { attachments: [], error: result.error };
    attachments.push(result.attachment);
  }
  return { attachments };
}

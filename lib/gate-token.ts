/**
 * HMAC-SHA256 signed gate token.
 *
 * The gate cookie stores a token of the form `v1.<timestamp_ms>.<hex_sig>`.
 * The signature covers `psr_gate:v1:<timestamp_ms>` so it cannot be forged
 * without knowing GATE_SECRET, and it expires after GATE_TOKEN_TTL_MS.
 *
 * Falls back to unsigned '1' if GATE_SECRET is unset (dev / legacy).
 */

const HMAC_PREFIX = 'v1.';
const GATE_TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

async function importKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

function hexEncode(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function hexDecode(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

/** Create a signed gate cookie value. */
export async function signGateToken(): Promise<string> {
  const secret = process.env.GATE_SECRET;
  if (!secret) return '1'; // unsigned fallback for dev

  const ts = Date.now().toString();
  const message = new TextEncoder().encode(`psr_gate:v1:${ts}`);
  const key = await importKey(secret);
  const sig = await crypto.subtle.sign('HMAC', key, message);
  return `${HMAC_PREFIX}${ts}.${hexEncode(sig)}`;
}

/** Verify a gate cookie value. Returns true if valid and not expired. */
export async function verifyGateToken(value: string | undefined): Promise<boolean> {
  if (!value) return false;

  const secret = process.env.GATE_SECRET;
  if (!secret) {
    // No secret configured — accept plain '1' for backwards compat / dev
    return value === '1';
  }

  if (!value.startsWith(HMAC_PREFIX)) {
    // Unsigned legacy or forged value — reject when GATE_SECRET is set
    return false;
  }

  const rest = value.slice(HMAC_PREFIX.length);
  const dotIdx = rest.indexOf('.');
  if (dotIdx < 1) return false;

  const ts = rest.slice(0, dotIdx);
  const sigHex = rest.slice(dotIdx + 1);

  // Check expiry
  const issued = parseInt(ts, 10);
  if (isNaN(issued) || Date.now() - issued > GATE_TOKEN_TTL_MS) return false;

  // Verify signature
  try {
    const message = new TextEncoder().encode(`psr_gate:v1:${ts}`);
    const key = await importKey(secret);
    const sigBytes = hexDecode(sigHex).buffer as ArrayBuffer;
    return await crypto.subtle.verify('HMAC', key, sigBytes, message);
  } catch {
    return false;
  }
}

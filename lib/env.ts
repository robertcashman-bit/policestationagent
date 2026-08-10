/** Strip quotes and CRLF — Vercel env pull sometimes stores `"true\r\n"`. */
export function cleanEnvValue(raw: string | undefined): string {
  return (raw ?? '').replace(/\r/g, '').trim().replace(/^["']|["']$/g, '').trim();
}

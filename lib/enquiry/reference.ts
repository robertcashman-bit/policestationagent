export function createEnquiryReference(prefix: string): string {
  const d = new Date();
  const stamp = [
    d.getUTCFullYear().toString().slice(2),
    String(d.getUTCMonth() + 1).padStart(2, "0"),
    String(d.getUTCDate()).padStart(2, "0"),
  ].join("");
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `${prefix}-${stamp}-${rand}`;
}

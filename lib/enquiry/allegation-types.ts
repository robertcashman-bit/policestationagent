/** Short VA form allegation-type options — compose into the allegation field. */

export const SHORT_VA_ALLEGATION_TYPES = [
  { id: "assault", label: "Assault" },
  { id: "controlling_coercive", label: "Controlling & coercive behaviour" },
  { id: "theft", label: "Theft / dishonesty" },
  { id: "sexual_offence", label: "Sexual offence" },
  { id: "drugs", label: "Drugs" },
  { id: "other", label: "Other / not sure yet" },
] as const;

export type ShortVaAllegationTypeId = (typeof SHORT_VA_ALLEGATION_TYPES)[number]["id"];

const LABEL_BY_ID = Object.fromEntries(
  SHORT_VA_ALLEGATION_TYPES.map((t) => [t.id, t.label]),
) as Record<ShortVaAllegationTypeId, string>;

/** Legacy blank-note fallback — must not be accepted for short-form submissions. */
export const SHORT_VA_BLANK_ALLEGATION_FALLBACK =
  "Voluntary interview / letter invitation — details to be confirmed on contact.";

export function isShortVaAllegationTypeId(value: string): value is ShortVaAllegationTypeId {
  return value in LABEL_BY_ID;
}

/**
 * Compose a useful allegation signal from type picker + optional free-text note.
 * Does not invite a full case account — type is enough; note is optional context.
 */
export function composeShortVaAllegation(
  typeId: ShortVaAllegationTypeId,
  note: string,
): string {
  const label = LABEL_BY_ID[typeId];
  const trimmed = note.trim().replace(/\s+/g, " ").slice(0, 500);
  if (!trimmed) return label;
  return `${label} — ${trimmed}`;
}

/** Server-side gate: short form must carry a real allegation signal. */
export function isUsefulShortVaAllegation(allegation: string): boolean {
  const trimmed = allegation.trim();
  if (trimmed.length < 3) return false;
  if (trimmed === SHORT_VA_BLANK_ALLEGATION_FALLBACK) return false;
  if (/details to be confirmed on contact/i.test(trimmed)) return false;
  return true;
}

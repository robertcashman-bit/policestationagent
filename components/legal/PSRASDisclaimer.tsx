/**
 * Standard PSRAS disclaimer. Used on homepage, footer, disclaimer page, FAQ.
 * Do not remove or alter without legal review.
 */
export const PSRAS_DISCLAIMER_TEXT =
  'This training prepares candidates for the Police Station Representative Accreditation Scheme (PSRAS). Completion of this training does not itself confer accreditation or authorisation to provide police station advice.';

export default function PSRASDisclaimer({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <p className={`text-sm text-muted-foreground leading-relaxed ${className}`}>
      {PSRAS_DISCLAIMER_TEXT}
    </p>
  );
}

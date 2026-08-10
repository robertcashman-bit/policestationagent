/** True when the email's (registrable) domain is a known non-firm third party. */
export declare function isNonFirmEmailDomain(email: string): boolean;
/** Reject obvious crawler artefacts before MX lookup. */
export declare function isPlausibleOutreachEmail(email: string): boolean;
export declare function isValidEmailFormat(email: string): boolean;
export declare function hasMxRecord(email: string): Promise<boolean>;
export declare function validateEmailForSend(email: string): Promise<{
    ok: boolean;
    reason?: string;
}>;
export declare function isFreeEmailDomain(email: string): boolean;
/**
 * True when a prospect email is safe to keep in the ready queue.
 * Rejects rejected free-mail domains and hard firm↔email domain mismatches
 * (off-domain addresses that are not allowlisted UK ISP/free mailboxes).
 */
export declare function isSendableReadyProspect(prospect: {
    email?: string | null;
    websiteUrl?: string | null;
}): boolean;
//# sourceMappingURL=validator.d.ts.map
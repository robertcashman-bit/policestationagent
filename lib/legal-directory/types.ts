/** Minimal types for LAA dedupe helpers (full directory not deployed on policestationagent). */

export type LegalDirectoryListingStatus = 'approved' | 'pending' | 'rejected' | 'suspended';

export interface LegalDirectoryListing {
  id: string;
  businessName: string;
  slug: string;
  town: string;
  county: string;
  postcode: string;
  phone: string;
  websiteUrl: string;
  ownerEmail: string;
  status: LegalDirectoryListingStatus;
}

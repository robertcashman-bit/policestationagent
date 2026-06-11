/** Stub — policestationagent has no legal directory; firm-outreach discovery skips directory import. */
export async function listApprovedListings(): Promise<
  Array<{
    categorySlug: string;
    businessName: string;
    town?: string;
    county?: string;
    postcode?: string;
    phone?: string;
    websiteUrl?: string;
    regulatoryNumber?: string;
    ownerEmail?: string;
    email?: string;
  }>
> {
  return [];
}

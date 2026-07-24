/** Block unsafe station/blog metadata before publish. */
const FIRM_PHONE = /01732\s*247427|07535\s*494446|01732247427|07535494446/i;

/**
 * @param {{ title?: string, metaTitle?: string, metaDescription?: string, slug?: string }} post
 * @returns {{ ok: boolean, errors: string[] }}
 */
export function validatePublishMetadata(post) {
  const errors = [];
  const title = `${post.metaTitle || ""} ${post.title || ""}`;
  const meta = post.metaDescription || "";
  const slug = (post.slug || "").toLowerCase();
  const stationContext =
    /police-station|custody|tonbridge|gravesend|maidstone|canterbury|folkestone|medway|kent-police/.test(
      `${slug} ${title} ${meta}`.toLowerCase(),
    );

  if (FIRM_PHONE.test(title)) {
    errors.push("Firm telephone must not appear in title/metaTitle");
  }
  if (stationContext && FIRM_PHONE.test(meta)) {
    errors.push(
      "Firm telephone must not appear in metaDescription for station/custody/location posts — use solicitor framing and 101/999 instead",
    );
  }
  if (stationContext && !/not kent police|not the police/i.test(`${meta} ${title}`)) {
    errors.push("Station/location posts require NOT Kent Police clarification in title or meta");
  }
  if (/police station details|station telephone|police contact number/i.test(title)) {
    errors.push("Title resembles a police contact directory — use solicitor-intent wording");
  }
  return { ok: errors.length === 0, errors };
}

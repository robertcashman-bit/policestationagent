## Google Business Profile (GBP) – next steps (manual)

### 1) Create/claim the profile
- In Google Business Profile, create/claim the business and complete verification.
- Use the prepared content in `GBP_OPTIMIZATION_CONTENT.md`.

### 2) Enter the recommended fields
- **Business name / categories / services / service areas**
- **Short + long descriptions**
- **Attributes**
- **Posts** (3 example posts are already drafted)

### 3) Connect website + tracking
- Ensure the website URL in GBP is `https://policestationagent.com`.
- Ensure the site canonical env var is set in Vercel: `NEXT_PUBLIC_SITE_URL=https://policestationagent.com`.

### 4) Validate schema on the website
- **Google Rich Results Test**: submit the homepage URL and confirm no critical errors.
- **Schema.org Validator**: validate the homepage URL and confirm the `@graph` types are present.

### 5) Search Console
- Add/verify the property for `policestationagent.com`
- Submit sitemap: `/sitemap.xml`

### Notes
- Site-wide LegalService/Attorney/LocalBusiness schema is implemented in `app/layout.tsx` (see `LOCAL_SEO_IMPLEMENTATION_SUMMARY.md` for the full plan).


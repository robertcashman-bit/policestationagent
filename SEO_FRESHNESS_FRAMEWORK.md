## SEO freshness framework (lightweight)

### What to keep fresh
- **Authority pages (11)**: the pages listed in `scripts/validate-seo-authority-pages.js`
- **Service pages**: `app/services/*`
- **Key conversion pages**: `app/contact/page.tsx`, `app/services/page.tsx`

### Cadence
- **Monthly**: quick pass for obvious changes (phone numbers, opening hours, branding, key internal links).
- **Quarterly**: re-read each authority page and update examples, headings, and “quick answer” text for clarity.
- **After major legal/policy changes**: update the relevant page(s) immediately.

### How to validate
- **Run**: `npm run seo:validate`
  - Fails if any authority page is missing: canonical, “Quick Answer” section, basic E‑E‑A‑T marker, or FAQ schema.

### What to update when you edit content
- Keep the **first “Quick Answer”** paragraph short and direct (snippet-friendly).
- Keep at least one **experience marker** (e.g. “In my experience…”) per authority page.
- Keep **FAQPage JSON‑LD** present and consistent with visible FAQs.


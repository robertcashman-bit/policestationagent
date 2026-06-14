# Blog publication summary

Deduplication rule applied: **10 new posts published** (6 original programme + 4 North Kent/Tonbridge), **14 topics skipped** (existing canonical page or blog covers the subject).

## Published (new JSON in `data/blog-posts/`)

| Slug | Title | Date |
|------|-------|------|
| `instructing-a-police-station-representative` | What to Send When Instructing a Police Station Representative | 2026-06-12 |
| `custody-record-number-dscc-reference` | Custody Record Numbers and DSCC References Explained | 2026-06-12 |
| `when-to-instruct-police-station-agent` | When Should a Solicitor Instruct a Police Station Agent? | 2026-06-12 |
| `police-station-attendance-notes` | Police Station Attendance Notes: Why They Matter for Firms | 2026-06-12 |
| `freelance-police-station-agents-for-solicitors` | Why Criminal Defence Firms Use Freelance Police Station Agents | 2026-06-12 |
| `police-station-cover-criminal-defence-firms-kent-medway` | Police Station Cover for Criminal Defence Firms in Kent and Medway | 2026-06-12 |
| `north-kent-gravesend-custody-legal-advice` | Legal Advice at North Kent (Gravesend) Custody Suite | 2026-06-12 |
| `instructing-cover-north-kent-gravesend-custody` | Instructing Police Station Cover at North Kent (Gravesend) Custody | 2026-06-12 |
| `tonbridge-police-station-custody-and-interviews` | Tonbridge Police Station: Custody and Voluntary Interview Advice | 2026-06-12 |
| `police-station-cover-west-kent-tonbridge-firms` | Police Station Cover for Firms at Tonbridge and West Kent | 2026-06-12 |

## June 2026 content refresh

All 10 posts above were expanded to comprehensive articles (~1,200–1,500 words each) with:

- Police Station Agent / Robert Cashman / Tuckers voice (Kent-wide cover; regular Gravesend & Tonbridge attendance)
- Unique featured images and inline `<figure class="blog-image">` per post
- Verified **Sources** section at the bottom of each article (GOV.UK, legislation.gov.uk, SRA register search, internal guides)
- 3–5 FAQs per post; BlogAdvertBlock rebranded to Police Station Agent

Rewrite script: `scripts/rewrite-june-2026-blog-posts.mjs`

## Skipped (existing canonical URL)

| Requested slug | Action | Canonical URL | Improvements |
|----------------|--------|---------------|--------------|
| `what-happens-at-a-police-station-interview` | Skip | `/police-station-interviews-kent-rights` | Internal links from new firm-focused posts |
| `no-comment-police-interview-advice` | Skip | `/no-comment-interview` | Answer-first block + ConversionCTAGroup |
| `voluntary-police-interview-legal-advice` | Skip | `/voluntary-police-interview` | AnswerFirstBlock added |
| `police-bail-conditions-explained` | Skip | `/police-bail-explained` | AnswerFirstBlock + RUI cross-link |
| `released-under-investigation-guidance` | Skip | `/released-under-investigation` | AnswerFirstBlock + bail cross-link |
| `police-station-cover-kent-solicitors` | Skip | `/for-solicitors` | H1/metadata aligned; hub links |
| `out-of-hours-police-station-legal-advice` | Skip | `/` + `/contact` | Home hero + sticky contact bar |
| `what-is-a-police-station-representative` | Skip | `/services/police-station-representation` | Answer block + CTAs |
| `what-is-a-police-station-agent` | Skip | `/for-solicitors` | Enhanced firm page |
| `preparing-for-voluntary-police-interview` | Skip | `/voluntary-police-interview` + blog legacy posts | Existing voluntary content |
| `what-happens-after-police-interview` | Skip | `/released-under-investigation` + `/police-bail-explained` | Cross-linked |
| `police-interview-under-caution-guide` | Skip | `/pace-code-c` + `/police-interview-rights` | Existing guides |
| `youth-suspects-police-station` | Skip | `/blog` (existing youth posts) | No duplicate |
| `vulnerable-suspects-police-interviews` | Skip | `/blog` + `/police-custody-rights` | No duplicate |

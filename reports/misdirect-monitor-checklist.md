# Misdirect monitor checklist (Layer 3)

Use after each deploy that changes phone publishing, then weekly until Answer police-misdirect volume is stable/low.

## After deploy (same day)

1. Confirm live HTML has **no** firm digits on:
   - `https://www.policestationagent.com/police-station-rep-tonbridge`
   - `https://www.policestationagent.com/blog/tonbridge-police-station-custody-and-interviews`
   - Search page source for `01732` / `07535` / `tel:01732` / `sms:07535` (ignore 101/999).
2. Google Search Console → URL Inspection → **Request indexing** for those URLs (+ `/tonbridge-police-station` redirect).
3. Bing / IndexNow: submit the same URLs if secrets/workflow available (`reports/bing-indexnow-actions.md`).

## Weekly (5 minutes)

| Check | Pass if |
|---|---|
| Incognito: `Tonbridge Police Station telephone number` | Your `01732` does **not** appear |
| Incognito: `Tonbridge Police Station solicitor` | Snippet does not show Call/SMS digits on station pages (Contact OK) |
| Reverse: `"01732 247427"` | Digits mainly on `/contact` and clear solicitor instruct pages — not Tonbridge custody blog/rep |
| Answer.co.uk tags (if used) | `police_misdirect` paid messages trending down; `solicitor` / VAI stable |

## Keep good calls working

Confirm these still show the solicitor number for real clients:

- `/contact`
- `/start/voluntary-interview`
- `/start/in-custody`

## If police Answer calls stay high after 2–4 weeks

1. Tighten Answer script further (no message for police intent).
2. Consider Contact-only digits on more solicitor-adjacent pages.
3. Revisit rename only as last resort — see plan notes; rename alone does not stop old numbers.

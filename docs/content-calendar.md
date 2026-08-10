# PSR Train content calendar

Publish **at least 2 posts per month** aligned to PSRAS exam cycles (CIT dates, portfolio deadlines).

## Template (copy for each new guide)

```markdown
---
title: "[Topic] — PSRAS prep"
description: "[120–160 char meta]"
date: YYYY-MM-DD
---

[Intro — 2 paragraphs]

## Key points for the CIT / portfolio
- …

## Related resources
- [How to become a police station rep](https://policestationrepuk.org/HowToBecomePoliceStationRep?utm_source=psrtrain&utm_medium=web&utm_campaign=blog_footer)
- [Custody Note free trial](https://custodynote.com/trial?utm_source=psrtrain&utm_medium=web&utm_campaign=blog_footer)

## Internal links (minimum 3)
- Link to /training and 2+ related guides
```

## Monthly checklist

- [ ] 2+ new or refreshed guides in `/guides`
- [ ] Each post links to repuk HowToBecome + CN trial with UTMs
- [ ] IndexNow submit after deploy (`scripts/submit-indexnow.mjs`)
- [ ] Buffer feed picks up new RSS items automatically

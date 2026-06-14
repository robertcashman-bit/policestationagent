# Buffer manual upload instructions

Buffer MCP scheduling was not confirmed in this environment. Use the generated files for manual queue upload.

## Files

- `buffer-posts.csv` — spreadsheet import
- `buffer-posts.json` — programmatic reference
- `../content-calendar-90-days.md` — human-readable schedule

## Upload steps

1. Open [Buffer](https://publish.buffer.com) → Create post
2. For each row in `buffer-posts.csv`:
   - Paste **text** into the composer
   - Add link preview for **url**
   - Schedule on **date** (UK timezone — account default)
3. Prefer **Add to Queue** unless a specific time is listed
4. Rotate between LinkedIn and X if both channels are connected

## Content scope

Posts promote **6 new blog articles** (2 posts each) and **3 cornerstone pages** — no duplicate topic posts.

## Regenerate

```bash
node scripts/generate-buffer-calendar.mjs
node scripts/verify-buffer-posts.mjs   # after deploy — checks 200 + images
node scripts/schedule-buffer-posts.mjs # requires BUFFER_ACCESS_TOKEN
```

## June 2026 click-driving batch

23 entries (10 blog posts × 2 + 3 cornerstone pages) with UTM tags and image URLs for OG previews. Verified against production 2026-06-14.

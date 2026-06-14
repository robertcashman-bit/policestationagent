# Analytics setup — GA4 conversion events

## Implementation

- **GA4:** `components/GoogleAnalytics.tsx` (consent-gated)
- **Event helper:** `lib/analytics.ts` — `trackEvent(name, params)`
- **Click delegate:** `components/conversion/ConversionEventListener.tsx` in root layout

## `data-event` → GA4 event map

| `data-event` attribute | GA4 event name | Trigger |
|----------------------|----------------|---------|
| `call_click` | `call_click` | Tel links in ConversionCTAGroup, sticky bar |
| `whatsapp_click` | `whatsapp_click` | WhatsApp links |
| `email_click` | `email_click` | Mailto links |
| `form_submit` | `form_submit` | Contact forms (where wired) |
| `solicitor_instruction` | `solicitor_instruction` | Instruction checklist interactions |
| `police_station_cover_request` | `police_station_cover_request` | Cover request CTAs |
| `blog_cta_click` | `blog_cta_click` | Blog CTAs (when `data-event` added) |
| `contact_page_submit` | `contact_page_submit` | Contact page form |

## Components emitting events

- `ConversionCTAGroup` — call, WhatsApp, email
- `MobileStickyContactBar` — call, WhatsApp, email
- Root layout mounts `ConversionEventListener` for document-level delegation on `[data-event]`

## GA4 configuration (manual)

In GA4 Admin → Events, mark `call_click`, `whatsapp_click`, and `email_click` as conversions if desired. Create explorations filtered by `page_location` containing improved URLs (`/for-solicitors`, `/police-station-rep-*`, new blog slugs).

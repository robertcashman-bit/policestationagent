/** Shared Google Business Profile (GBP) helpers for Buffer scheduling scripts. */

export const GBP_FALLBACK_IMAGE = {
  url: "https://www.policestationagent.com/images/buffer/gbp/policestationagent-default.jpg",
  thumbnailUrl: "https://www.policestationagent.com/images/buffer/gbp/policestationagent-default.jpg",
  altText: "Police station legal advice in Kent",
  width: 720,
  height: 720,
};

export const GBP_CHANNEL_ID = "69d26c8b031bfa423cd0c8b7";

export function rewriteUtm(text, utmSlug) {
  return text.replace(/utm_campaign=([^&\s]+)/g, (_, campaign) => {
    const base = campaign.replace(/_(linkedin|twitter|googlebusiness|facebook[^&\s]*|facebook)$/i, "");
    const cleaned = base.replace(/_+$/, "");
    return `utm_campaign=${cleaned}_${utmSlug}`;
  });
}

export function stripUrlsFromText(text) {
  return text.replace(/\n*https?:\/\/[^\s]+/g, "").trim();
}

export function firstUrlInText(text) {
  return text.match(/https?:\/\/[^\s]+/)?.[0];
}

export function gbpFallbackAssets() {
  return [
    {
      image: {
        url: GBP_FALLBACK_IMAGE.url,
        thumbnailUrl: GBP_FALLBACK_IMAGE.thumbnailUrl,
        metadata: {
          altText: GBP_FALLBACK_IMAGE.altText,
          dimensions: { width: GBP_FALLBACK_IMAGE.width, height: GBP_FALLBACK_IMAGE.height },
        },
      },
    },
  ];
}

/** GBP requires a square image; blog featured images are usually wide PNG/JPEG. */
export function gbpSafeAssets() {
  return gbpFallbackAssets();
}

export function googleBusinessMetadata({ url, utmSlug = "googlebusiness" }) {
  const link = url ? rewriteUtm(url, utmSlug) : undefined;
  return {
    google: {
      type: "whats_new",
      detailsWhatsNew: {
        button: link ? "learn_more" : "none",
        ...(link ? { link } : {}),
      },
    },
  };
}

export function gbpPostText(text, utmSlug = "googlebusiness") {
  const rewritten = rewriteUtm(text, utmSlug);
  const withoutUrl = stripUrlsFromText(rewritten);
  const withoutHashtags = withoutUrl.replace(/\n*#[^\n]+/g, "").trim();
  return withoutHashtags;
}

export function gbpLinkFromItem(item, utmSlug = "googlebusiness") {
  const raw = item.url || firstUrlInText(item.text || "");
  return raw ? rewriteUtm(raw, utmSlug) : undefined;
}

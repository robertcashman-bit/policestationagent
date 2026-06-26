import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { gbpSafeAssets, gbpPostText, GBP_FALLBACK_IMAGE } from "./buffer-gbp.mjs";

function isGbpSafeImageUrl(url) {
  return /\.(jpe?g|png)(\?|$)/i.test(url) && !/\.webp(\?|$)/i.test(url);
}

describe("buffer-gbp helpers", () => {
  it("gbpSafeAssets returns only jpeg fallback", () => {
    const assets = gbpSafeAssets();
    assert.equal(assets.length, 1);
    const url = assets[0].image.url;
    assert.ok(isGbpSafeImageUrl(url), url);
    assert.equal(url, GBP_FALLBACK_IMAGE.url);
  });

  it("gbpPostText strips URLs and hashtags", () => {
    const text = gbpPostText("Title\n\nhttps://example.com\n\n#tag", "googlebusiness");
    assert.ok(!text.includes("https://"));
    assert.ok(!text.includes("#tag"));
  });
});

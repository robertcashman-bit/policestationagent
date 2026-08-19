import { describe, expect, it } from "vitest";
import {
  stripFirmPhonePlainText,
  stripFirmPhonesToContact,
} from "@/lib/seo/strip-firm-phones";

describe("stripFirmPhonesToContact", () => {
  it("replaces tel anchors with pathway CTAs, not label prose", () => {
    const html = `<a href="tel:01732247427">Call: 01732 247427</a>`;
    const out = stripFirmPhonesToContact(html);
    expect(out).toContain('href="/start/voluntary-interview#request"');
    expect(out).toContain("Request representation");
    expect(out).toContain("Current custody check");
    expect(out).toContain("Agency cover");
    expect(out).not.toMatch(/01732|07535/);
    expect(out).not.toMatch(/use Request representation, Current custody check/);
  });

  it("replaces prominent SMS display numbers with pathway CTAs", () => {
    const html = `<p class="text-3xl font-black text-blue-600">07535 494446</p>`;
    const out = stripFirmPhonesToContact(html);
    expect(out).toContain('href="/current-custody"');
    expect(out).not.toMatch(/07535/);
    expect(out).not.toMatch(/use Current custody check or Request representation/);
  });

  it("cleans leftover pathway label blobs", () => {
    const html = `<p>use Request representation, Current custody check, or Agency cover (Contact pathways)</p>`;
    const out = stripFirmPhonesToContact(html);
    expect(out).toContain('href="/for-solicitors"');
    expect(out).not.toMatch(/use Request representation, Current custody check, or Agency cover \(Contact pathways\)/);
  });
});

describe("stripFirmPhonePlainText", () => {
  it("does not nest pathway phrases", () => {
    const out = stripFirmPhonePlainText("Call 01732 247427 for help");
    expect(out).toBe("our Contact pathways for help");
    expect(out).not.toMatch(/Contact pathways \(.*Contact pathways/);
  });

  it("cleans legacy label blobs without nesting", () => {
    const out = stripFirmPhonePlainText(
      "use Current custody check or Request representation (Contact pathways)",
    );
    expect(out).toBe("our Contact pathways");
  });
});

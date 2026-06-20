import { describe, expect, it } from "vitest";
import { loadPaceRegistry } from "../scripts/lib/legal-content-scanner.mjs";
import { extractPaceReferences } from "../scripts/lib/pace-citation-audit.mjs";

describe("PACE references", () => {
  it("extracts PACE section references", () => {
    const refs = extractPaceReferences("Under PACE section 58 you have a right to legal advice.");
    expect(refs.some((r) => r.id === "pace-s58")).toBe(true);
  });

  it("extracts Code C paragraph references", () => {
    const refs = extractPaceReferences("Disclosure under Code C paragraph 11.1A enables legal advice.");
    expect(refs.some((r) => r.id.includes("11"))).toBe(true);
  });

  it("registry ids are unique", () => {
    const ids = loadPaceRegistry().map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

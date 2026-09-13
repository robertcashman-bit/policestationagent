import { describe, it, expect } from "vitest";
import {
  SHORT_VA_ALLEGATION_TYPES,
  SHORT_VA_BLANK_ALLEGATION_FALLBACK,
  composeShortVaAllegation,
  isUsefulShortVaAllegation,
  isShortVaAllegationTypeId,
} from "../lib/enquiry/allegation-types";
import {
  VOLUNTARY_ENQUIRY_KEY_PREFIX,
  VOLUNTARY_ENQUIRY_TTL_SECONDS,
} from "../lib/enquiry/voluntary-store";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

describe("short VA allegation types", () => {
  it("includes controlling & coercive and other core types", () => {
    const ids = SHORT_VA_ALLEGATION_TYPES.map((t) => t.id);
    expect(ids).toContain("controlling_coercive");
    expect(ids).toContain("assault");
    expect(ids).toContain("theft");
    expect(ids).toContain("sexual_offence");
    expect(ids).toContain("other");
  });

  it("composes allegation from type alone or type + note", () => {
    expect(composeShortVaAllegation("controlling_coercive", "")).toBe(
      "Controlling & coercive behaviour",
    );
    expect(composeShortVaAllegation("controlling_coercive", "enhanced clearance")).toBe(
      "Controlling & coercive behaviour — enhanced clearance",
    );
  });

  it("rejects blank legacy fallback as not useful", () => {
    expect(isUsefulShortVaAllegation("")).toBe(false);
    expect(isUsefulShortVaAllegation("ab")).toBe(false);
    expect(isUsefulShortVaAllegation(SHORT_VA_BLANK_ALLEGATION_FALLBACK)).toBe(false);
    expect(isUsefulShortVaAllegation("Assault")).toBe(true);
    expect(
      isUsefulShortVaAllegation("Controlling & coercive behaviour — enhanced clearance"),
    ).toBe(true);
  });

  it("type id guard accepts known ids only", () => {
    expect(isShortVaAllegationTypeId("assault")).toBe(true);
    expect(isShortVaAllegationTypeId("not-a-type")).toBe(false);
  });
});

describe("short VA form wiring", () => {
  it("requires allegation type picker and never posts blank fallback", () => {
    const form = fs.readFileSync(
      path.join(root, "components/conversion/ShortVoluntaryRequestForm.tsx"),
      "utf8",
    );
    expect(form).toContain("SHORT_VA_ALLEGATION_TYPES");
    expect(form).toContain("composeShortVaAllegation");
    expect(form).toContain("allegationType");
    expect(form).toMatch(/What is the allegation about/);
    expect(form).not.toContain(SHORT_VA_BLANK_ALLEGATION_FALLBACK);
    expect(form).not.toMatch(/details to be confirmed on contact/);
  });

  it("API rejects useless short-form allegation and persists after email", () => {
    const route = fs.readFileSync(
      path.join(root, "app/api/enquiry/voluntary/route.ts"),
      "utf8",
    );
    expect(route).toContain("isUsefulShortVaAllegation");
    expect(route).toContain("persistVoluntaryEnquiry");
    expect(route).toMatch(/[Ee]mail remains primary/);
    expect(route).toContain("attachmentNames");
  });
});

describe("voluntary enquiry persistence", () => {
  it("uses Upstash key prefix with ~90 day TTL", () => {
    expect(VOLUNTARY_ENQUIRY_KEY_PREFIX).toBe("enquiry:voluntary:");
    expect(VOLUNTARY_ENQUIRY_TTL_SECONDS).toBe(90 * 24 * 60 * 60);
  });

  it("exposes admin lookup route behind requireAdminApi", () => {
    const admin = fs.readFileSync(
      path.join(root, "app/api/admin/voluntary-enquiry/route.ts"),
      "utf8",
    );
    expect(admin).toContain("requireAdminApi");
    expect(admin).toContain("getVoluntaryEnquiryByReference");
    expect(admin).toContain("reference");
  });
});

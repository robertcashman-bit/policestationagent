import { describe, it, expect } from "vitest";
import { isOutOfScopeEnquiry } from "../config/scope-faqs";

describe("isOutOfScopeEnquiry", () => {
  it("detects past arrest queries", () => {
    expect(isOutOfScopeEnquiry("He was arrested yesterday what happened")).toBe(true);
    expect(isOutOfScopeEnquiry("Someone is in custody right now at Maidstone")).toBe(false);
  });

  it("detects friend instructing", () => {
    expect(isOutOfScopeEnquiry("My friend was arrested can you help")).toBe(true);
  });

  it("detects missing person queries", () => {
    expect(isOutOfScopeEnquiry("My son disappeared where is he")).toBe(true);
  });
});

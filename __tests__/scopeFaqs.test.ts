import test from "node:test";
import assert from "node:assert/strict";
import { isOutOfScopeEnquiry } from "../config/scope-faqs";

test("isOutOfScopeEnquiry detects past arrest queries", () => {
  assert.equal(isOutOfScopeEnquiry("He was arrested yesterday what happened"), true);
  assert.equal(isOutOfScopeEnquiry("Someone is in custody right now at Maidstone"), false);
});

test("isOutOfScopeEnquiry detects friend instructing", () => {
  assert.equal(isOutOfScopeEnquiry("My friend was arrested can you help"), true);
});

test("isOutOfScopeEnquiry detects missing person queries", () => {
  assert.equal(isOutOfScopeEnquiry("My son disappeared where is he"), true);
});

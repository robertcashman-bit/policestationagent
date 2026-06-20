/** Publish-time validation for blog posts (used by admin API). */
import { auditBlogBaseline } from "./legal-baseline-audit.mjs";
import {
  auditPaceCitations,
  auditGlobalForbiddenClaims,
} from "./pace-citation-audit.mjs";
import { auditCaseCitations } from "./legal-citation-audit.mjs";
import { auditUnfitnessPost, SLUG as UNFITNESS_SLUG } from "./legal-rule-packs/unfitness.mjs";

export function auditPostForPublish(post) {
  const label = post.slug || "draft";
  const content = post.contentHtml || "";
  const issues = [];

  const baseline = auditBlogBaseline({
    ...post,
    title: post.title || "",
    contentHtml: content,
  });
  issues.push(...baseline.issues.filter((i) => i.severity === "error"));

  issues.push(...auditPaceCitations(content, label).filter((i) => i.severity === "error"));
  issues.push(...auditGlobalForbiddenClaims(content, label).filter((i) => i.severity === "error"));
  issues.push(...auditCaseCitations(content, label).filter((i) => i.severity === "error"));

  if (post.slug === UNFITNESS_SLUG) {
    issues.push(...auditUnfitnessPost(post).filter((i) => i.severity === "error"));
  }

  return {
    ok: issues.length === 0,
    issues: issues.map((i) => i.message),
  };
}

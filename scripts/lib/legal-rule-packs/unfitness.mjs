/** Topic-specific legal accuracy rule pack: unfitness to interview */
export const SLUG = "unfitness-to-interview-pace-code-c-kent";

const REQUIRED_URL_PATTERNS = [
  /gov\.uk\/government\/publications\/pace-code-c/i,
  /legislation\.gov\.uk\/ukpga\/1984\/60\/section\/76/i,
  /legislation\.gov\.uk\/ukpga\/1984\/60\/section\/77/i,
  /legislation\.gov\.uk\/ukpga\/1984\/60\/section\/78/i,
  /legislation\.gov\.uk\/ukpga\/1964\/60\/section\/4/i,
  /cps\.gov\.uk\/prosecution-guidance\/mental-health-suspects-and-defendants/i,
];

const REQUIRED_PHRASES = [
  /fitness to be interviewed/i,
  /annex g/i,
  /12\.3/i,
  /fitness to plead/i,
  /not the same/i,
  /appropriate adult/i,
  /general information only/i,
];

export function auditUnfitnessPost(post) {
  const html = post.contentHtml || "";
  const text = html.replace(/<[^>]+>/g, " ");
  const issues = [];

  for (const pattern of REQUIRED_URL_PATTERNS) {
    if (!pattern.test(html)) {
      issues.push({ severity: "error", message: `missing source URL matching ${pattern}` });
    }
  }
  for (const pattern of REQUIRED_PHRASES) {
    if (!pattern.test(text)) {
      issues.push({ severity: "error", message: `missing required phrase matching ${pattern}` });
    }
  }
  if (!post.faq?.length) {
    issues.push({ severity: "error", message: "missing FAQ array" });
  }

  return issues;
}

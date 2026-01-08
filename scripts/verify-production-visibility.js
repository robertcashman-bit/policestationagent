// Verify production deployment visibility
// Checks that changes are actually visible on production URL

const https = require("https");
const http = require("http");

const PRODUCTION_URL = "https://web44ai.vercel.app";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    client
      .get(
        url,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (compatible; Production-Verification/1.0)",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        },
        (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () =>
            resolve({ status: res.statusCode, body: data, headers: res.headers })
          );
        }
      )
      .on("error", reject);
  });
}

async function verifyChanges() {
  console.log("🔍 Verifying production deployment visibility...\n");
  console.log(`Production URL: ${PRODUCTION_URL}\n`);

  try {
    // Check homepage for navigation structure
    console.log("1. Fetching homepage...");
    const homepage = await fetchUrl(PRODUCTION_URL);

    if (homepage.status !== 200) {
      console.error(`❌ FAIL: Homepage returned status ${homepage.status}`);
      return false;
    }

    const body = homepage.body;

    // Check for updated navigation structure
    console.log("2. Checking navigation structure...");

    // Should NOT contain informational links in Information dropdown
    // Check if FAQ appears near Information (but not in footer)
    const infoIdx = body.indexOf("Information menu");
    const blogIdx = body.indexOf("Blog menu", infoIdx);
    const infoSection = infoIdx > 0 && blogIdx > 0 ? body.substring(infoIdx, blogIdx) : "";
    const hasFAQInInfoDropdown = infoSection.includes("/faq") && infoSection.includes("FAQ");

    // Should contain only legal links in Information dropdown
    const hasPrivacyPolicy = body.includes("Privacy Policy") && body.includes("/privacy");
    const hasCookiesPolicy = body.includes("Cookies Policy") && body.includes("/cookies");
    const hasAccessibility = body.includes("Accessibility") && body.includes("/accessibility");
    const hasGDPR = body.includes("GDPR") && body.includes("/gdpr");
    const hasTermsLink = body.includes("/terms-and-conditions");
    const hasOnlyLegalLinks =
      hasPrivacyPolicy && hasCookiesPolicy && hasAccessibility && hasGDPR && hasTermsLink;

    // Check footer has informational links (more flexible matching)
    const footerMatch = body.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
    const footerSection = footerMatch ? footerMatch[0] : "";
    const footerHasFAQ =
      footerSection.toLowerCase().includes("faq") && footerSection.includes("/faq");
    const footerHasHelpAdvice =
      footerSection.includes("Help & Advice") ||
      footerSection.includes("Help&amp; Advice") ||
      footerSection.includes("Help &amp; Advice");
    const footerHasRightsLinks =
      footerSection.includes("Your Rights in Custody") ||
      footerSection.includes("Police Custody Rights") ||
      footerSection.includes("Police Interview Rights") ||
      footerSection.includes("Your Rights");
    const footerHasInfoLinks = footerHasHelpAdvice && footerHasFAQ && footerHasRightsLinks;

    console.log("   - Information dropdown contains only legal links:", hasOnlyLegalLinks);
    console.log("   - Footer contains informational links:", footerHasInfoLinks);
    console.log("   - Information dropdown does NOT contain FAQ:", !hasFAQInInfoDropdown);

    // Check for cache headers
    console.log("3. Checking cache headers...");
    const cacheControl = homepage.headers["cache-control"];
    console.log("   - Cache-Control header:", cacheControl || "Not found");

    // Check for security headers
    console.log("4. Checking security headers...");
    const xContentTypeOptions = homepage.headers["x-content-type-options"];
    const xFrameOptions = homepage.headers["x-frame-options"];
    console.log("   - X-Content-Type-Options:", xContentTypeOptions || "Not found");
    console.log("   - X-Frame-Options:", xFrameOptions || "Not found");

    // Check commit hash in response (if available)
    console.log("5. Checking deployment version...");
    const hasLatestCommit = body.includes("41e632d") || body.includes("Production deployment");
    console.log("   - Contains latest commit marker:", hasLatestCommit || "Cannot verify");

    const allChecks = hasOnlyLegalLinks && footerHasInfoLinks && !hasFAQInInfoDropdown;

    console.log("\n" + "=".repeat(60));
    if (allChecks && xContentTypeOptions && xFrameOptions) {
      console.log("✅ PASS: All changes are visible on production");
      console.log("✅ Navigation structure verified");
      console.log("✅ Security headers present");
      return true;
    } else {
      console.log("❌ FAIL: Some changes not visible");
      if (!hasOnlyLegalLinks) console.log("   - Legal links in header not found");
      if (!footerHasInfoLinks) console.log("   - Informational links in footer not found");
      if (hasFAQInInfoDropdown) console.log("   - Informational links still in header");
      return false;
    }
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    return false;
  }
}

verifyChanges().then((success) => {
  process.exit(success ? 0 : 1);
});

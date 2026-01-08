const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

function getCharCount(html) {
  if (!html) return 0;
  return html.replace(/<[^>]*>/g, "").trim().length;
}

function getImageCount(html) {
  if (!html) return 0;
  return (html.match(/<img[^>]*>/gi) || []).length;
}

// Accurate legal references with exact citations
const accurateReferences = {
  bail: [
    "Police and Criminal Evidence Act 1984, section 34",
    "Bail Act 1976, section 3",
    "Bail Act 1976, section 6(5)",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 1.1",
    "Criminal Procedure Rules 2020, Part 14",
  ],
  "voluntary interview": [
    "Police and Criminal Evidence Act 1984, section 29",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.21",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A",
    "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
  ],
  "duty solicitor": [
    "Police and Criminal Evidence Act 1984, section 58",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1",
    "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
    "Access to Justice Act 1999, section 13",
    "Law Society Accreditation Scheme for Police Station Representatives",
  ],
  property: [
    "Police and Criminal Evidence Act 1984, section 19",
    "Police and Criminal Evidence Act 1984, section 22",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code B, paragraph 7.1",
    "Police (Property) Act 1897, section 1",
  ],
  caution: [
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.1",
    "Criminal Justice Act 2003, section 24",
    "Rehabilitation of Offenders Act 1974, section 1",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.5",
  ],
  disclosure: [
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A",
    "Criminal Procedure and Investigations Act 1996, section 3",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.4",
  ],
  arrest: [
    "Police and Criminal Evidence Act 1984, section 24",
    "Police and Criminal Evidence Act 1984, section 28",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code G, paragraph 2.1",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.1",
  ],
  "police station representation": [
    "Police and Criminal Evidence Act 1984, section 58",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1",
    "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
    "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.5",
  ],
};

// Function to get relevant image based on topic (only one per post)
function getRelevantImage(title, slug) {
  const titleLower = title.toLowerCase();
  const slugLower = slug.toLowerCase();

  if (titleLower.includes("bail")) {
    return "/blog-images/blog-listing-0.jpg";
  } else if (titleLower.includes("voluntary") || titleLower.includes("interview")) {
    return "/blog-images/blog-listing-1.png";
  } else if (titleLower.includes("duty solicitor")) {
    return "/blog-images/blog-listing-2.png";
  } else if (titleLower.includes("property")) {
    return "/blog-images/blog-listing-3.png";
  } else if (titleLower.includes("caution")) {
    return "/blog-images/blog-listing-4.png";
  } else if (titleLower.includes("disclosure") || titleLower.includes("police station rep")) {
    return "/blog-images/blog-listing-5.png";
  } else {
    return "/blog-images/blog-listing-6.png";
  }
}

// Function to extract references from content
function extractReferences(content) {
  const refs = [];
  const contentLower = content.toLowerCase();

  // Check for existing references
  if (content.includes("<h2>References</h2>") || content.includes("References")) {
    // Extract existing references
    const refMatch = content.match(/<h2>References<\/h2>[\s\S]*?(?=<h2>|<\/div>|$)/i);
    if (refMatch) {
      const refText = refMatch[0];
      const listMatches = refText.match(/<li>([^<]+)<\/li>/gi);
      if (listMatches) {
        listMatches.forEach((match) => {
          const text = match.replace(/<[^>]*>/g, "").trim();
          if (text) refs.push(text);
        });
      }
    }
  }

  return refs;
}

// Function to add accurate, comprehensive content based on topic
function generateComprehensiveContent(post, targetLength) {
  const title = post.title;
  const titleLower = title.toLowerCase();
  const slugLower = post.slug.toLowerCase();

  // Determine topic and get appropriate references
  let topic = "general";
  let refs = [];

  if (titleLower.includes("bail")) {
    topic = "bail";
    refs = accurateReferences.bail || [];
  } else if (titleLower.includes("voluntary") && titleLower.includes("interview")) {
    topic = "voluntary interview";
    refs = accurateReferences["voluntary interview"] || [];
  } else if (titleLower.includes("duty solicitor")) {
    topic = "duty solicitor";
    refs = accurateReferences["duty solicitor"] || [];
  } else if (titleLower.includes("property")) {
    topic = "property";
    refs = accurateReferences.property || [];
  } else if (titleLower.includes("caution")) {
    topic = "caution";
    refs = accurateReferences.caution || [];
  } else if (titleLower.includes("disclosure")) {
    topic = "disclosure";
    refs = accurateReferences.disclosure || [];
  } else if (titleLower.includes("arrest") || titleLower.includes("contacted")) {
    topic = "arrest";
    refs = accurateReferences.arrest || [];
  } else if (
    titleLower.includes("police station representation") ||
    titleLower.includes("police station rep")
  ) {
    topic = "police station representation";
    refs = accurateReferences["police station representation"] || [];
  }

  // Get existing content
  const existingContent = post.content || "";
  const existingText = existingContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const currentLength = getCharCount(existingContent);

  // If content is too short, expand it
  if (currentLength < targetLength) {
    const needed = targetLength - currentLength;
    const additionalContent = generateAdditionalContent(title, topic, needed, refs);

    // Insert additional content before references or at the end
    if (existingContent.includes("<h2>References</h2>")) {
      return existingContent.replace(
        "<h2>References</h2>",
        additionalContent + "\n\n<h2>References</h2>"
      );
    } else {
      return existingContent + "\n\n" + additionalContent;
    }
  }

  // If content is too long, trim it intelligently
  if (currentLength > 2500) {
    return trimContent(existingContent, 2500);
  }

  return existingContent;
}

// Function to generate additional accurate content
function generateAdditionalContent(title, topic, neededChars, refs) {
  const content = [];

  if (topic === "bail") {
    content.push(`<h3>Understanding Bail Conditions</h3>
<p>When police impose bail conditions, they must be necessary and proportionate. Under section 3 of the Bail Act 1976, conditions can include residence requirements, reporting to a police station, surrendering passports, curfews, and restrictions on contacting certain individuals. The police must explain why conditions are necessary.</p>

<h3>Bail Breaches and Consequences</h3>
<p>Breaching bail conditions is a criminal offence under section 6(5) of the Bail Act 1976. If you breach bail, you can be arrested and may face prosecution for the breach itself. The court will consider the seriousness of the breach when deciding whether to grant bail again.</p>`);
  } else if (topic === "voluntary interview") {
    content.push(`<h3>Your Rights During Voluntary Interviews</h3>
<p>Under Code C, paragraph 3.21 of PACE, you have the right to free legal advice during voluntary interviews. This includes the right to speak to a solicitor in private and have them present during the interview. The police must not start the interview until your solicitor arrives, unless you specifically waive this right.</p>

<h3>Why Legal Representation is Essential</h3>
<p>Even though voluntary interviews are not conducted under arrest, they are just as serious. Anything you say can be used as evidence in court. Under Code C, paragraph 11.1A, your solicitor can obtain disclosure of the case against you before the interview begins, which is crucial for providing proper advice.</p>`);
  } else if (topic === "duty solicitor") {
    content.push(`<h3>Qualifications and Accreditation</h3>
<p>Duty solicitors must be accredited by the Law Society and have passed rigorous examinations. They must demonstrate competence in criminal law, police powers, evidence, and interview techniques. Under section 58 of PACE, everyone has the right to consult with a solicitor, and this right is fundamental to ensuring fairness in the criminal justice system.</p>

<h3>Free Legal Advice Under Legal Aid</h3>
<p>Legal advice at the police station is free under Legal Aid, regardless of your financial circumstances. This is provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. The duty solicitor scheme ensures everyone has access to expert legal representation.</p>`);
  } else {
    content.push(`<h3>Understanding Your Legal Rights</h3>
<p>Under the Police and Criminal Evidence Act 1984 (PACE), you have important rights when dealing with the police. These rights are designed to ensure fairness and protect individuals during police investigations. Understanding these rights is crucial for protecting your interests.</p>

<h3>Seeking Legal Advice</h3>
<p>If you require legal advice or representation at a police station, you are entitled to free legal advice under section 58 of PACE. An accredited duty solicitor can provide expert guidance throughout the process, whether you have been arrested or invited for a voluntary interview.</p>`);
  }

  return content.join("\n\n");
}

// Function to trim content intelligently
function trimContent(html, targetLength) {
  // Remove images except the first one
  const images = html.match(/<img[^>]*>/gi) || [];
  if (images.length > 1) {
    // Keep only the first image
    let result = html;
    for (let i = 1; i < images.length; i++) {
      result = result.replace(images[i], "");
    }
    html = result;
  }

  // If still too long, trim from the end before references
  let textContent = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (textContent.length > targetLength) {
    // Find references section
    const refIndex = html.indexOf("<h2>References</h2>");
    if (refIndex > 0) {
      const mainContent = html.substring(0, refIndex);
      const refsSection = html.substring(refIndex);
      const mainText = mainContent
        .replace(/<[^>]*>/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      if (mainText.length > targetLength - 500) {
        // Leave room for references
        // Trim main content
        const trimmed = mainText.substring(0, targetLength - 500);
        const lastSentence = trimmed.lastIndexOf(".");
        const trimmedContent = trimmed.substring(0, lastSentence + 1);

        // Reconstruct with HTML structure
        const paragraphs = mainContent.match(/<p>[^<]*<\/p>/gi) || [];
        let reconstructed = "";
        let charCount = 0;

        for (const para of paragraphs) {
          const paraText = para.replace(/<[^>]*>/g, " ").trim();
          if (charCount + paraText.length <= targetLength - 500) {
            reconstructed += para + "\n";
            charCount += paraText.length;
          } else {
            break;
          }
        }

        return reconstructed + "\n\n" + refsSection;
      }
    }
  }

  return html;
}

// Function to ensure only one image
function ensureSingleImage(html, title) {
  const images = html.match(/<img[^>]*>/gi) || [];

  if (images.length === 0) {
    // Add one relevant image
    const imagePath = getRelevantImage(title, "");
    const imageAlt = title;
    const imageHtml = `<figure class="blog-image">
      <img src="${imagePath}" alt="${imageAlt}" loading="lazy" width="800" height="400" />
      <figcaption>${title}</figcaption>
    </figure>`;

    // Insert after first H2 or at the beginning
    if (html.includes("<h2>")) {
      const h2Index = html.indexOf("<h2>");
      const afterH2 = html.indexOf(">", h2Index) + 1;
      return html.slice(0, afterH2) + "\n" + imageHtml + "\n" + html.slice(afterH2);
    } else {
      return imageHtml + "\n" + html;
    }
  } else if (images.length > 1) {
    // Keep only the first image
    let result = html;
    for (let i = 1; i < images.length; i++) {
      result = result.replace(images[i], "");
      // Also remove surrounding figure tags if present
      const figureMatch = result.match(/<figure[^>]*>[\s\S]*?<\/figure>/gi);
      if (figureMatch && figureMatch.length > 1) {
        result = result.replace(figureMatch[figureMatch.length - 1], "");
      }
    }
    return result;
  }

  return html;
}

// Function to add accurate references section
function addReferencesSection(content, title, topic) {
  // Check if references section already exists
  if (content.includes("<h2>References</h2>")) {
    return content; // Keep existing references
  }

  // Get appropriate references
  let refs = [];
  const titleLower = title.toLowerCase();

  if (titleLower.includes("bail")) {
    refs = accurateReferences.bail || [];
  } else if (titleLower.includes("voluntary") && titleLower.includes("interview")) {
    refs = accurateReferences["voluntary interview"] || [];
  } else if (titleLower.includes("duty solicitor")) {
    refs = accurateReferences["duty solicitor"] || [];
  } else if (titleLower.includes("property")) {
    refs = accurateReferences.property || [];
  } else if (titleLower.includes("caution")) {
    refs = accurateReferences.caution || [];
  } else if (titleLower.includes("disclosure")) {
    refs = accurateReferences.disclosure || [];
  } else if (titleLower.includes("arrest") || titleLower.includes("contacted")) {
    refs = accurateReferences.arrest || [];
  } else if (
    titleLower.includes("police station representation") ||
    titleLower.includes("police station rep")
  ) {
    refs = accurateReferences["police station representation"] || [];
  } else {
    // Default references
    refs = [
      "Police and Criminal Evidence Act 1984 (PACE)",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C",
      "Legal Aid, Sentencing and Punishment of Offenders Act 2012",
    ];
  }

  const refsHtml = `<h2>References</h2>
<ul>
${refs.map((ref) => `  <li>${ref}</li>`).join("\n")}
</ul>`;

  return content + "\n\n" + refsHtml;
}

// Enhance all posts
let updated = 0;
const enhancedPosts = posts.map((post) => {
  let content = post.content || "";
  const currentChars = getCharCount(content);
  const currentImages = getImageCount(content);
  const changes = {};

  // Target length: between 1500-2500 characters, aim for middle
  const targetLength = currentChars < 1500 ? 2000 : currentChars > 2500 ? 2000 : currentChars;

  // Ensure only one image
  content = ensureSingleImage(content, post.title);

  // Adjust content length
  if (currentChars < 1500 || currentChars > 2500) {
    content = generateComprehensiveContent(post, targetLength);
    updated++;
  }

  // Ensure references section exists
  content = addReferencesSection(content, post.title, "");

  // Verify final state
  const finalChars = getCharCount(content);
  const finalImages = getImageCount(content);

  if (finalChars !== currentChars || finalImages !== currentImages || content !== post.content) {
    changes.content = content;
    updated++;
  }

  if (Object.keys(changes).length > 0) {
    return { ...post, ...changes };
  }

  return post;
});

// Write enhanced posts
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Enhanced ${updated} blog posts.`);
console.log(`Total posts: ${posts.length}`);

// Final verification
const finalStats = {
  correctLength: 0,
  correctImages: 0,
  hasReferences: 0,
  perfect: 0,
};

enhancedPosts.forEach((post) => {
  const chars = getCharCount(post.content);
  const images = getImageCount(post.content);
  const hasRefs = post.content && post.content.includes("<h2>References</h2>");

  if (chars >= 1500 && chars <= 2500) finalStats.correctLength++;
  if (images === 1) finalStats.correctImages++;
  if (hasRefs) finalStats.hasReferences++;
  if (chars >= 1500 && chars <= 2500 && images === 1 && hasRefs) finalStats.perfect++;
});

console.log(`\n=== FINAL STATISTICS ===`);
console.log(
  `Posts with correct length (1500-2500 chars): ${finalStats.correctLength}/${enhancedPosts.length}`
);
console.log(`Posts with exactly 1 image: ${finalStats.correctImages}/${enhancedPosts.length}`);
console.log(`Posts with references section: ${finalStats.hasReferences}/${enhancedPosts.length}`);
console.log(`Perfect posts (all criteria met): ${finalStats.perfect}/${enhancedPosts.length}`);

const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

function getCharCount(html) {
  if (!html) return 0;
  // Remove all HTML tags and get text content
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

function getImageCount(html) {
  if (!html) return 0;
  return (html.match(/<img[^>]*>/gi) || []).length;
}

// Function to extract text from complex HTML (like Wix format)
function extractTextFromHTML(html) {
  if (!html) return "";
  // Remove script and style tags
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  // Extract text from span elements and other text containers
  html = html.replace(/<span[^>]*>([^<]*)<\/span>/gi, "$1");
  html = html.replace(/<p[^>]*>([^<]*)<\/p>/gi, "$1");
  html = html.replace(/<div[^>]*>([^<]*)<\/div>/gi, "$1");
  // Remove all remaining HTML tags
  html = html.replace(/<[^>]*>/g, " ");
  // Clean up whitespace
  html = html.replace(/\s+/g, " ").trim();
  return html;
}

// Comprehensive content generators with accurate legal references
function generateComprehensiveContentForPost(post) {
  const title = post.title;
  const titleLower = title.toLowerCase();
  const slug = post.slug;

  // Determine appropriate image
  let imagePath = "/blog-images/blog-listing-5.png";
  if (titleLower.includes("bail")) imagePath = "/blog-images/blog-listing-0.jpg";
  else if (titleLower.includes("voluntary") || titleLower.includes("interview"))
    imagePath = "/blog-images/blog-listing-1.png";
  else if (titleLower.includes("duty solicitor")) imagePath = "/blog-images/blog-listing-2.png";
  else if (titleLower.includes("property")) imagePath = "/blog-images/blog-listing-3.png";
  else if (titleLower.includes("caution")) imagePath = "/blog-images/blog-listing-4.png";

  const imageHtml = `<figure class="blog-image">
  <img src="${imagePath}" alt="${title}" loading="lazy" width="800" height="400" />
  <figcaption>${title}</figcaption>
</figure>`;

  // Generate content based on topic
  let mainContent = "";
  let references = [];

  if (titleLower.includes("disclosure") || slug.includes("disclosure")) {
    mainContent = `<h2>Police Station Disclosure: Why It Matters</h2>
${imageHtml}

<p>One of the most critical aspects of police station representation is obtaining disclosure of the case against you. Under Code C, paragraph 11.1A of the Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, your solicitor has the right to obtain information about the allegations and evidence before your interview begins.</p>

<h3>What is Disclosure?</h3>
<p>Disclosure refers to the information the police must provide to your solicitor about the case against you. This includes details of the allegations, witness statements, evidence gathered, and any other relevant information. Under Code C, paragraph 11.4, the police should provide sufficient information to enable your solicitor to provide proper advice.</p>

<h3>Why Disclosure is Essential</h3>
<p>Without disclosure, you cannot make an informed decision about whether to answer questions in interview. Your solicitor needs to understand the strength of the evidence against you to provide proper advice. Under the Criminal Procedure and Investigations Act 1996, section 3, disclosure obligations exist throughout the criminal justice process, starting at the police station.</p>

<h3>The Role of Your Solicitor</h3>
<p>An experienced police station representative will immediately request disclosure upon arrival at the police station. They will examine your custody record, speak to the investigating officer, and obtain as much information as possible about the case. This enables them to advise you on the strength of the evidence and whether it is in your interests to answer questions.</p>

<h3>Your Right to Disclosure</h3>
<p>Under Code C, paragraph 11.1A, you have the right to be informed of the nature of the suspected offence and why you are suspected of committing it. Your solicitor can obtain this information and more detailed disclosure to enable them to provide expert legal advice. This is a fundamental right that ensures fairness in the criminal justice system.</p>`;

    references = [
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.4",
      "Criminal Procedure and Investigations Act 1996, section 3",
      "Police and Criminal Evidence Act 1984, section 58",
    ];
  } else if (
    titleLower.includes("help") &&
    titleLower.includes("police") &&
    titleLower.includes("contacted")
  ) {
    mainContent = `<h2>Help? The Police Have Contacted Me!</h2>
${imageHtml}

<p>If the police have contacted you, it's important to know your rights and what to do. Under section 29 of the Police and Criminal Evidence Act 1984, the police can invite you to attend a voluntary interview, but you are not under arrest at this stage.</p>

<h3>Don't Panic</h3>
<p>The police may contact you for various reasons - you could be a witness, they may need information, or they may want to speak to you about an allegation. Under Code C, paragraph 3.21, if you are not under arrest, you are free to leave at any time during a voluntary interview.</p>

<h3>Obtain the Officer's Details</h3>
<p>Always obtain the officer's name, badge number, and contact details. This information is important if you need to follow up or if your solicitor needs to contact them. Under Code C, paragraph 2.3, police officers must provide their name and station when asked.</p>

<h3>Contact a Solicitor Immediately</h3>
<p>Before speaking to the police, contact a criminal solicitor or accredited police station representative. Under section 58 of PACE, you have the right to free legal advice. Your solicitor can contact the police on your behalf, obtain disclosure of the case, and advise you on the best course of action.</p>

<h3>Your Rights</h3>
<p>You have the right to free legal advice under Legal Aid, regardless of your financial circumstances. This is provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. Your solicitor can help arrange a voluntary interview at a convenient time and ensure your rights are protected throughout.</p>`;

    references = [
      "Police and Criminal Evidence Act 1984, section 29",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.21",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 2.3",
      "Police and Criminal Evidence Act 1984, section 58",
      "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
    ];
  } else if (
    titleLower.includes("have to attend") &&
    titleLower.includes("police station") &&
    titleLower.includes("part 2")
  ) {
    mainContent = `<h2>Have to Attend a Police Station? Part 2</h2>
${imageHtml}

<p>If you have been asked to attend a police station, understanding police powers is crucial. Under section 17 of the Police and Criminal Evidence Act 1984, police can enter and search premises to execute an arrest warrant, arrest or recapture a person, save life and limb, or prevent serious damage to property.</p>

<h3>Search Powers</h3>
<p>Under section 8 of PACE, police can obtain a search warrant for evidence of indictable offences. Under section 26 of the Theft Act 1968, they can search for stolen property. Under section 23 of the Misuse of Drugs Act 1971, they can search for controlled drugs. These powers must be exercised lawfully and proportionately.</p>

<h3>Stop and Search Powers</h3>
<p>Under section 1 of PACE, police can stop and search any person, vehicle, or anything in or on a vehicle for stolen or prohibited articles. Under section 1(2)(a), this includes offensive weapons and articles with which a person is going equipped to steal or cause criminal damage.</p>

<h3>Your Rights During Searches</h3>
<p>If you are searched, the police must provide certain information under Code A, paragraph 3.8. This includes the officer's name and station, the object of the search, the grounds for the search, and your right to a copy of the search record. You have the right to have someone witness the search if practicable.</p>

<h3>Seeking Legal Advice</h3>
<p>If you are asked to attend a police station, you have the right to free legal advice under section 58 of PACE. An accredited duty solicitor can advise you on your rights, attend with you, and ensure police procedures are followed correctly.</p>`;

    references = [
      "Police and Criminal Evidence Act 1984, section 17",
      "Police and Criminal Evidence Act 1984, section 8",
      "Theft Act 1968, section 26",
      "Misuse of Drugs Act 1971, section 23",
      "Police and Criminal Evidence Act 1984, section 1",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code A, paragraph 3.8",
      "Police and Criminal Evidence Act 1984, section 58",
    ];
  } else if (
    titleLower.includes("what is a duty solicitor") &&
    !titleLower.includes("understanding")
  ) {
    // Check if this is the short version
    const existingText = extractTextFromHTML(post.content || "");
    if (existingText.length < 500) {
      mainContent = `<h2>What is a Duty Solicitor?</h2>
${imageHtml}

<p>A duty solicitor is a qualified criminal solicitor who provides free legal advice and representation at police stations and magistrates' courts. Under section 58 of the Police and Criminal Evidence Act 1984, everyone has the right to consult with a solicitor when arrested or interviewed by the police.</p>

<h3>Qualifications and Accreditation</h3>
<p>Duty solicitors must be accredited by the Law Society under the Accreditation Scheme for Police Station Representatives. They must pass examinations in criminal law, police powers, evidence, and interview techniques. This ensures they have the expertise to provide proper legal advice and representation.</p>

<h3>When Can You Use a Duty Solicitor?</h3>
<p>You can request a duty solicitor when arrested and taken to a police station, when invited for a voluntary interview, or at magistrates' court if you don't have your own solicitor. Under Code C, paragraph 6.1, the police must contact a solicitor immediately upon request.</p>

<h3>Free Legal Advice</h3>
<p>Legal advice and representation at the police station is free under Legal Aid, regardless of your financial circumstances. This is provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. The duty solicitor scheme ensures everyone has access to expert legal representation.</p>

<h3>What Does a Duty Solicitor Do?</h3>
<p>A duty solicitor will advise you on your rights, obtain disclosure of the case against you, advise you on whether to answer questions, attend your interview with you, make representations about bail or release, and protect your interests throughout the process. Under Code C, paragraph 6.5, you have the right to consult with your solicitor in private.</p>`;

      references = [
        "Police and Criminal Evidence Act 1984, section 58",
        "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1",
        "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.5",
        "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
        "Law Society Accreditation Scheme for Police Station Representatives",
      ];
    }
  } else if (titleLower.includes("arrest") && titleLower.includes("warrant")) {
    mainContent = `<h2>Understanding Police Warrants and Interviews in Kent</h2>
${imageHtml}

<p>If the police have a warrant for your arrest or want to interview you, understanding your rights is crucial. Under section 24 of the Police and Criminal Evidence Act 1984, police can arrest without a warrant if they have reasonable grounds to suspect you have committed, are committing, or are about to commit an offence.</p>

<h3>Arrest Warrants</h3>
<p>Arrest warrants are issued by magistrates under section 1 of the Magistrates' Courts Act 1980. If a warrant has been issued, the police can arrest you at any time. Under section 17 of PACE, police can enter premises to execute an arrest warrant.</p>

<h3>Your Rights When Arrested</h3>
<p>When arrested, you must be informed of the reasons under section 28 of PACE. You have the right to free legal advice under section 58, the right to have someone informed of your arrest under Code C, paragraph 5.1, and the right to consult the Codes of Practice under Code C, paragraph 3.4.</p>

<h3>Voluntary Interviews</h3>
<p>If the police want to interview you without arrest, this is called a voluntary interview under section 29 of PACE. Even though you are not under arrest, you have the same right to free legal advice. Under Code C, paragraph 3.21, you are free to leave at any time unless you are placed under arrest.</p>

<h3>Seeking Legal Advice</h3>
<p>Whether arrested or invited for a voluntary interview, you should seek legal advice immediately. Under Code C, paragraph 6.1, the police must contact a solicitor on your behalf without delay. Legal advice is free under Legal Aid, provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012.</p>`;

    references = [
      "Police and Criminal Evidence Act 1984, section 24",
      "Police and Criminal Evidence Act 1984, section 28",
      "Police and Criminal Evidence Act 1984, section 29",
      "Police and Criminal Evidence Act 1984, section 58",
      "Magistrates' Courts Act 1980, section 1",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 5.1",
      "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.21",
      "Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1",
    ];
  }

  // If we generated content, return it with references
  if (mainContent) {
    const refsHtml = `\n\n<h2>References</h2>
<ul>
${references.map((ref) => `  <li>${ref}</li>`).join("\n")}
</ul>`;
    return mainContent + refsHtml;
  }

  return null; // Return null if we don't have specific content for this post
}

// Process all posts
let updated = 0;
const enhancedPosts = posts.map((post) => {
  const currentChars = getCharCount(post.content);
  const currentImages = getImageCount(post.content);

  // Check if post needs comprehensive rewrite
  if (currentChars < 1500 || currentImages !== 1) {
    // Try to generate comprehensive content
    const newContent = generateComprehensiveContentForPost(post);

    if (newContent) {
      const newChars = getCharCount(newContent);
      const newImages = getImageCount(newContent);

      // Verify it meets requirements
      if (newChars >= 1500 && newChars <= 2500 && newImages === 1) {
        updated++;
        return { ...post, content: `<div class="blog-content">${newContent}</div>` };
      }
    }

    // If generation didn't work, try to fix existing content
    let content = post.content || "";

    // Ensure exactly one image
    const images = content.match(/<img[^>]*>/gi) || [];
    if (images.length === 0) {
      // Add image
      const imagePath = post.title.toLowerCase().includes("bail")
        ? "/blog-images/blog-listing-0.jpg"
        : post.title.toLowerCase().includes("voluntary") ||
            post.title.toLowerCase().includes("interview")
          ? "/blog-images/blog-listing-1.png"
          : post.title.toLowerCase().includes("duty solicitor")
            ? "/blog-images/blog-listing-2.png"
            : "/blog-images/blog-listing-5.png";
      const imageHtml = `<figure class="blog-image">
  <img src="${imagePath}" alt="${post.title}" loading="lazy" width="800" height="400" />
  <figcaption>${post.title}</figcaption>
</figure>`;

      if (content.includes("<h2>")) {
        const h2Index = content.indexOf("<h2>");
        const afterH2 = content.indexOf(">", h2Index) + 1;
        content = content.slice(0, afterH2) + "\n" + imageHtml + "\n" + content.slice(afterH2);
      } else {
        content = imageHtml + "\n" + content;
      }
      updated++;
    } else if (images.length > 1) {
      // Keep only first image
      for (let i = 1; i < images.length; i++) {
        content = content.replace(images[i], "");
      }
      updated++;
    }

    // Expand content if too short
    if (getCharCount(content) < 1500) {
      // Add more comprehensive content
      const additional = generateComprehensiveContentForPost(post);
      if (additional && !content.includes(additional.substring(0, 100))) {
        // Merge intelligently
        if (content.includes("<h2>References</h2>")) {
          content = content.replace(
            "<h2>References</h2>",
            additional.split("<h2>References</h2>")[0] + "\n\n<h2>References</h2>"
          );
        } else {
          content += "\n\n" + additional.split("<h2>References</h2>")[0];
        }
        updated++;
      }
    }

    // Ensure references exist
    if (!content.includes("<h2>References</h2>")) {
      const refs = [
        "Police and Criminal Evidence Act 1984 (PACE)",
        "Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C",
        "Legal Aid, Sentencing and Punishment of Offenders Act 2012",
      ];
      content += `\n\n<h2>References</h2>
<ul>
${refs.map((r) => `  <li>${r}</li>`).join("\n")}
</ul>`;
      updated++;
    }

    if (content !== post.content) {
      return { ...post, content };
    }
  }

  return post;
});

// Write enhanced posts
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`\nEnhanced ${updated} blog posts.`);

// Final verification
const stats = {
  correctLength: 0,
  correctImages: 0,
  hasReferences: 0,
  perfect: 0,
};

enhancedPosts.forEach((post) => {
  const chars = getCharCount(post.content);
  const images = getImageCount(post.content);
  const hasRefs = post.content && post.content.includes("<h2>References</h2>");

  if (chars >= 1500 && chars <= 2500) stats.correctLength++;
  if (images === 1) stats.correctImages++;
  if (hasRefs) stats.hasReferences++;
  if (chars >= 1500 && chars <= 2500 && images === 1 && hasRefs) stats.perfect++;
});

console.log(`\n=== FINAL VERIFICATION ===`);
console.log(
  `Posts with correct length (1500-2500 chars): ${stats.correctLength}/${enhancedPosts.length}`
);
console.log(`Posts with exactly 1 image: ${stats.correctImages}/${enhancedPosts.length}`);
console.log(`Posts with references: ${stats.hasReferences}/${enhancedPosts.length}`);
console.log(`Perfect posts (all criteria): ${stats.perfect}/${enhancedPosts.length}`);

if (stats.perfect < enhancedPosts.length) {
  const needsWork = enhancedPosts.filter((p) => {
    const chars = getCharCount(p.content);
    const images = getImageCount(p.content);
    const hasRefs = p.content && p.content.includes("<h2>References</h2>");
    return chars < 1500 || chars > 2500 || images !== 1 || !hasRefs;
  });

  console.log(`\n=== REMAINING ISSUES ===`);
  needsWork.forEach((p) => {
    const chars = getCharCount(p.content);
    const images = getImageCount(p.content);
    const hasRefs = p.content && p.content.includes("<h2>References</h2>");
    console.log(`${p.slug}: ${chars} chars, ${images} images, refs: ${hasRefs}`);
  });
}

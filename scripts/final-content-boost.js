const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

function getWordCount(html) {
  if (!html) return 0;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w.length > 0).length;
}

// Additional content to boost posts that are close to 200 words
const additionalContent = {
  "kent-police-stations-legal-representation-24-7": `<h3>How to Request Legal Representation</h3>
<p>To request legal representation at a Kent police station, simply tell the police you want to speak to a solicitor. You can request a specific solicitor or ask for the duty solicitor. The police must contact a solicitor on your behalf without delay.</p>

<h3>What Happens Next</h3>
<p>Once you request a solicitor, the police must:</p>
<ul>
<li>Contact a solicitor immediately</li>
<li>Allow you to speak to your solicitor in private</li>
<li>Not start the interview until your solicitor arrives (unless you waive this right)</li>
<li>Provide disclosure to your solicitor</li>
</ul>`,

  "police-station-interview-rights-kent-legal-representation": `<h3>Preparing for Your Interview</h3>
<p>Before attending a police interview, it's important to:</p>
<ul>
<li>Request legal representation immediately</li>
<li>Not discuss the case with anyone except your solicitor</li>
<li>Gather any relevant documents or evidence</li>
<li>Make notes about what happened (for your solicitor only)</li>
</ul>

<h3>During the Interview Process</h3>
<p>Your solicitor will be present throughout the interview and can:</p>
<ul>
<li>Intervene if questioning becomes improper</li>
<li>Request breaks when needed</li>
<li>Clarify questions if they are unclear</li>
<li>Advise you on your answers</li>
</ul>`,

  "being-interviewed-by-the-police-why-you-need-a-criminal-solicitor-in-the-police-station": `<h3>The Importance of Early Legal Advice</h3>
<p>Seeking legal advice before your interview is crucial because:</p>
<ul>
<li>You may not understand the legal implications of what you say</li>
<li>The police may use leading questions</li>
<li>You may inadvertently admit to something you didn't do</li>
<li>Your words can be used as evidence in court</li>
</ul>

<h3>What a Solicitor Does for You</h3>
<p>An experienced criminal solicitor will:</p>
<ul>
<li>Obtain disclosure of the case against you</li>
<li>Advise you on the strength of the evidence</li>
<li>Help you prepare your response</li>
<li>Protect your rights throughout the process</li>
</ul>`,
};

let updated = 0;
const enhancedPosts = posts.map((post) => {
  const wordCount = getWordCount(post.content);

  // If content is between 150-200 words, add more content
  if (wordCount >= 150 && wordCount < 200) {
    const additional = additionalContent[post.slug];

    if (additional) {
      // Insert additional content before References section
      let newContent = post.content;
      if (newContent.includes("<h2>References</h2>")) {
        newContent = newContent.replace(
          "<h2>References</h2>",
          additional + "\n\n<h2>References</h2>"
        );
      } else if (newContent.includes("</div>")) {
        newContent = newContent.replace("</div>", additional + "\n</div>");
      } else {
        newContent = post.content + "\n" + additional;
      }

      updated++;
      return { ...post, content: newContent };
    } else {
      // Add generic additional content
      const genericContent = `<h3>Seeking Legal Advice</h3>
<p>If you need legal representation at a police station in Kent, remember that legal advice is free under Legal Aid. An accredited duty solicitor can provide expert guidance and ensure your rights are protected throughout the process.</p>

<h3>Contact Information</h3>
<p>For immediate legal representation at any Kent police station, We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. under the Police and Criminal Evidence Act 1984.</p>`;

      let newContent = post.content;
      if (newContent.includes("<h2>References</h2>")) {
        newContent = newContent.replace(
          "<h2>References</h2>",
          genericContent + "\n\n<h2>References</h2>"
        );
      } else if (newContent.includes("</div>")) {
        newContent = newContent.replace("</div>", genericContent + "\n</div>");
      } else {
        newContent = post.content + "\n" + genericContent;
      }

      updated++;
      return { ...post, content: newContent };
    }
  }

  return post;
});

fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Boosted content for ${updated} blog posts.`);

// Final verification
const finalIncomplete = enhancedPosts.filter((p) => getWordCount(p.content) < 200);
console.log(
  `Posts with 200+ words: ${enhancedPosts.length - finalIncomplete.length}/${enhancedPosts.length}`
);
if (finalIncomplete.length > 0) {
  console.log(`\nRemaining posts under 200 words: ${finalIncomplete.length}`);
  finalIncomplete.slice(0, 3).forEach((p) => {
    console.log(`- ${p.slug}: ${getWordCount(p.content)} words`);
  });
}

const fs = require("fs");
const path = require("path");

const blogPostsPath = path.join(__dirname, "..", "data", "blog-posts-full.json");
const posts = JSON.parse(fs.readFileSync(blogPostsPath, "utf8"));

// Function to get text word count
function getWordCount(html) {
  if (!html) return 0;
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter((w) => w.length > 0).length;
}

// Enhanced content templates for specific topics
const enhancedContent = {
  "welcome-to-our-blog": `<h2>Welcome to the Police Station Agent Blog</h2>
<p>Welcome to the Police Station Agent blog, your comprehensive resource for expert insights on police station representation, criminal defence procedures, and your legal rights in custody across Kent and the UK.</p>

<h3>About This Blog</h3>
<p>Our blog covers a wide range of topics related to police station representation and criminal law, including:</p>
<ul>
<li>Your rights during police interviews and custody</li>
<li>Voluntary interview procedures and what to expect</li>
<li>Legal Aid and free legal representation</li>
<li>Understanding police bail and conditions</li>
<li>What happens at a police station</li>
<li>Police station disclosure and evidence</li>
<li>And much more</li>
</ul>

<h3>Expert Legal Advice</h3>
<p>All content is authored by Robert Cashman, an accredited duty solicitor with over 35 years of experience in police station representation. With Higher Rights of Audience (Criminal), Robert provides expert representation across all Kent custody suites.</p>

<h3>Free Legal Advice</h3>
<p>Remember, if you are arrested or invited for a voluntary interview, you are entitled to free legal advice under the Police and Criminal Evidence Act 1984 (PACE). This service is available regardless of your financial circumstances.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
</ul>`,

  "kent-police-stations-legal-representation": `<h2>Complete Guide to Legal Representation at Kent Police Stations</h2>
<p>If you are arrested or invited for a voluntary interview at any Kent police station, you have the right to free legal representation under the Police and Criminal Evidence Act 1984 (PACE). This guide explains your rights and how to access expert legal advice.</p>

<h3>Kent Police Stations Covered</h3>
<p>We provide We aim to respond as quickly as possible. If detained, ask custody staff to contact a solicitor. at all Kent and Medway Police custody suites, including:</p>
<ul>
<li>Medway Police Station (Gillingham)</li>
<li>Maidstone Police Station</li>
<li>Canterbury Police Station</li>
<li>Gravesend Police Station (North Kent)</li>
<li>Tonbridge Police Station</li>
<li>Sevenoaks Police Station</li>
<li>Swanley Police Station</li>
<li>Margate Police Station</li>
<li>Folkestone Police Station</li>
<li>And all other Kent custody suites</li>
</ul>

<h3>Your Right to Free Legal Advice</h3>
<p>Under PACE 1984, everyone arrested or interviewed by the police is entitled to:</p>
<ul>
<li>Free legal advice from an accredited solicitor</li>
<li>Have a solicitor present during interview</li>
<li>Receive disclosure of the case against you</li>
<li>Expert advice on whether to answer questions</li>
</ul>

<h3>24/7 Availability</h3>
<p>Our service is Extended hours service across Kent, including evenings, weekends, and bank holidays. We aim to attend any Kent police station within 30 minutes of your request.</p>

<h3>Why Choose Us</h3>
<p>As an accredited duty solicitor with over 35 years of experience, I provide:</p>
<ul>
<li>Expert knowledge of Kent police procedures</li>
<li>Immediate attendance at all custody suites</li>
<li>Free legal advice under Legal Aid</li>
<li>Independent representation, separate from the police</li>
</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
</ul>`,

  "police-station-interview-rights-kent": `<h2>What to Expect During a Police Station Interview in Kent</h2>
<p>If you are arrested or invited for a voluntary interview at a Kent police station, understanding what to expect can help you prepare and protect your rights. This guide explains the interview process and your legal rights.</p>

<h3>Before the Interview</h3>
<p>Before your interview begins, you have the right to:</p>
<ul>
<li>Speak to a solicitor in private</li>
<li>Receive disclosure of the allegations against you</li>
<li>Understand the evidence the police have</li>
<li>Receive advice on whether to answer questions</li>
</ul>

<h3>During the Interview</h3>
<p>The interview will be:</p>
<ul>
<li>Conducted under caution (you will be read your rights)</li>
<li>Audio or video recorded</li>
<li>Conducted in accordance with PACE Code C</li>
<li>Your solicitor will be present throughout</li>
</ul>

<h3>Your Rights During Interview</h3>
<p>You have the right to:</p>
<ul>
<li>Have a solicitor present</li>
<li>Take breaks when needed</li>
<li>Ask for clarification if you don't understand questions</li>
<li>Exercise your right to silence</li>
<li>Provide a prepared statement</li>
</ul>

<h3>After the Interview</h3>
<p>After the interview, the police may:</p>
<ul>
<li>Release you without charge</li>
<li>Release you on bail</li>
<li>Release you under investigation (RUI)</li>
<li>Charge you with an offence</li>
</ul>

<h3>Legal Representation</h3>
<p>Having an experienced solicitor present during your interview ensures your rights are protected and you receive proper legal advice. Legal advice at the police station is free under Legal Aid.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`,
};

// Enhance posts that need more content
let updated = 0;
const enhancedPosts = posts.map((post) => {
  const wordCount = getWordCount(post.content);

  // If content is less than 200 words, enhance it
  if (wordCount < 200) {
    // Check if we have specific content for this slug
    const specificContent = enhancedContent[post.slug];

    if (specificContent) {
      updated++;
      return {
        ...post,
        content: `<div class="blog-content">${specificContent}</div>`,
      };
    } else {
      // Generate generic enhanced content
      const titleLower = post.title.toLowerCase();
      let enhanced = "";

      if (titleLower.includes("kent") || titleLower.includes("police station")) {
        enhanced = `<h2>${post.title}</h2>
<p>This comprehensive guide provides expert information about ${post.title.toLowerCase()} in Kent, UK. Understanding your rights and legal options is crucial when dealing with the police.</p>

<h3>Your Legal Rights</h3>
<p>Under the Police and Criminal Evidence Act 1984 (PACE), you have important rights when dealing with the police:</p>
<ul>
<li>Free legal advice from an accredited solicitor</li>
<li>The right to have a solicitor present during interview</li>
<li>The right to disclosure of the case against you</li>
<li>The right to understand the allegations</li>
</ul>

<h3>Why Legal Representation Matters</h3>
<p>Having an experienced solicitor present ensures:</p>
<ul>
<li>Your rights are protected throughout the process</li>
<li>You understand the legal implications</li>
<li>Police procedures are followed correctly</li>
<li>You receive expert advice before making decisions</li>
</ul>

<h3>Free Legal Advice</h3>
<p>Legal advice and representation at the police station is free under Legal Aid, regardless of your financial circumstances. This is a fundamental right under PACE 1984.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
</ul>`;
      } else {
        enhanced = `<h2>${post.title}</h2>
<p>This article provides expert information about ${post.title.toLowerCase()} in the context of police station representation and criminal law in England and Wales.</p>

<h3>Understanding Your Rights</h3>
<p>If you require legal advice or representation at a police station, you are entitled to free legal advice under the Police and Criminal Evidence Act 1984 (PACE). An accredited duty solicitor can provide expert guidance throughout the process.</p>

<h3>Why Legal Representation Matters</h3>
<p>Having a solicitor present during police interviews ensures:</p>
<ul>
<li>Your rights are protected</li>
<li>You understand the allegations against you</li>
<li>You receive proper advice before making decisions</li>
<li>Police procedures are followed correctly</li>
<li>Your interests are safeguarded</li>
</ul>

<h3>Free Legal Advice</h3>
<p>Legal advice at the police station is free under Legal Aid, regardless of your financial circumstances. This applies to both arrested persons and those attending voluntary interviews.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
</ul>`;
      }

      updated++;
      return {
        ...post,
        content: `<div class="blog-content">${enhanced}</div>`,
      };
    }
  }

  return post;
});

// Write enhanced posts back
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Enhanced ${updated} blog posts with comprehensive content.`);
console.log(`Total posts: ${posts.length}`);

// Verify
const finalIncomplete = enhancedPosts.filter((p) => getWordCount(p.content) < 200);
console.log(`Posts still needing content: ${finalIncomplete.length}`);

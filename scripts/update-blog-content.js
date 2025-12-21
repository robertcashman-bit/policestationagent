const fs = require('fs');
const path = require('path');

// Read the blog posts file
const blogPostsPath = path.join(__dirname, '..', 'data', 'blog-posts-full.json');
const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Content templates for different topics - factual and accurate
const contentTemplates = {
  'police-bail': `<h2>What is Police Bail?</h2>
<p>Police bail is a legal mechanism that allows the police to release a suspect from custody while an investigation continues. Under the Police and Criminal Evidence Act 1984 (PACE), police can release a person on bail with or without conditions.</p>

<h2>When Can Police Impose Bail?</h2>
<p>Police bail can be imposed when:</p>
<ul>
<li>A person has been arrested but not yet charged</li>
<li>The police need more time to investigate</li>
<li>A person has been charged and is awaiting court</li>
</ul>

<h2>Bail Conditions</h2>
<p>Bail conditions may include:</p>
<ul>
<li>Residence requirements</li>
<li>Reporting to a police station at specified times</li>
<li>Surrendering passports</li>
<li>Not contacting certain individuals</li>
<li>Curfews</li>
</ul>

<h2>Breaching Bail Conditions</h2>
<p>Breaching bail conditions is a criminal offence under section 6(5) of the Bail Act 1976. Consequences can include arrest, detention, and potential prosecution for the breach itself.</p>

<h2>Legal Implications</h2>
<p>If you are released on police bail, it is crucial to understand your conditions and comply with them. Seeking legal advice from an accredited police station representative can help ensure your rights are protected throughout the process.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Bail Act 1976</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`,

  'property-returned': `<h2>Getting Your Property Returned from the Police</h2>
<p>When the police seize property during an investigation, you have rights regarding its return. Understanding these rights is essential for protecting your interests.</p>

<h2>When Can Property Be Seized?</h2>
<p>Under PACE 1984, police can seize property if:</p>
<ul>
<li>It may be evidence of an offence</li>
<li>It may be used to cause physical injury or damage</li>
<li>It is necessary for the investigation</li>
</ul>

<h2>How to Request Return</h2>
<p>To request the return of your property:</p>
<ol>
<li>Contact the officer in charge of your case</li>
<li>Provide proof of ownership</li>
<li>Request return in writing if necessary</li>
<li>Seek legal advice if property is not returned promptly</li>
</ol>

<h2>Time Limits</h2>
<p>There is no specific time limit for property return, but police should return property when it is no longer needed for the investigation. If property is not returned, you may need to make a formal complaint or seek legal advice.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984, Section 19</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`,

  'voluntary-interview': `<h2>What is a Voluntary Police Interview?</h2>
<p>A voluntary police interview (also called a "voluntary attendance" or "interview under caution") is a formal interview conducted by the police where you are not under arrest. Despite the name, these interviews are serious and anything you say can be used as evidence.</p>

<h2>Your Rights</h2>
<p>During a voluntary interview, you have the right to:</p>
<ul>
<li>Free legal advice from a solicitor</li>
<li>Have a solicitor present during the interview</li>
<li>Understand the allegations against you</li>
<li>Receive disclosure of evidence before the interview</li>
</ul>

<h2>Why You Need a Solicitor</h2>
<p>Even though you are not under arrest, a voluntary interview is just as serious as an interview in custody. Having a solicitor present ensures:</p>
<ul>
<li>You understand your rights</li>
<li>You receive proper advice before answering questions</li>
<li>The interview is conducted fairly</li>
<li>Your interests are protected</li>
</ul>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`,

  'duty-solicitor': `<h2>What is a Duty Solicitor?</h2>
<p>A duty solicitor is a qualified criminal solicitor who provides free legal advice and representation at police stations and magistrates' courts. They are independent of the police and work to protect your rights.</p>

<h2>Qualifications</h2>
<p>To become a duty solicitor, a solicitor must:</p>
<ul>
<li>Be qualified as a solicitor</li>
<li>Pass the police station qualification exam</li>
<li>Complete a portfolio assessment of at least 9 police station attendances</li>
<li>Be accredited by the Law Society</li>
</ul>

<h2>When Can You Use a Duty Solicitor?</h2>
<p>You can request a duty solicitor:</p>
<ul>
<li>When arrested and taken to a police station</li>
<li>When invited for a voluntary interview</li>
<li>At magistrates' court if you don't have your own solicitor</li>
</ul>

<h2>Is It Free?</h2>
<p>Yes. Legal advice and representation at the police station is free under Legal Aid, regardless of your financial circumstances. This is a fundamental right under PACE 1984.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
<li>Law Society Accreditation Scheme</li>
</ul>`
};

// Function to generate content based on title
function generateContent(title, slug) {
  const titleLower = title.toLowerCase();
  
  if (titleLower.includes('bail')) {
    return contentTemplates['police-bail'];
  } else if (titleLower.includes('property') || titleLower.includes('returned')) {
    return contentTemplates['property-returned'];
  } else if (titleLower.includes('voluntary') || titleLower.includes('interview')) {
    return contentTemplates['voluntary-interview'];
  } else if (titleLower.includes('duty solicitor') || titleLower.includes('duty-solicitor')) {
    return contentTemplates['duty-solicitor'];
  }
  
  // Default content structure
  return `<h2>Introduction</h2>
<p>This article provides information about ${title.toLowerCase()} in the context of police station representation and criminal law in England and Wales.</p>

<h2>Key Information</h2>
<p>If you require legal advice or representation at a police station, you are entitled to free legal advice under the Police and Criminal Evidence Act 1984 (PACE). An accredited duty solicitor can provide expert guidance throughout the process.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`;
}

// Update posts with minimal content
let updated = 0;
const updatedPosts = posts.map(post => {
  const content = post.content || '';
  const textOnly = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const wordCount = textOnly.split(' ').filter(w => w.length > 0).length;
  
  // If content is too short (less than 200 words), add proper content
  if (wordCount < 200 || content.trim().length < 500) {
    const newContent = generateContent(post.title, post.slug);
    updated++;
    return {
      ...post,
      content: `<div class="blog-content">${newContent}</div>`
    };
  }
  
  return post;
});

// Write updated posts back
fs.writeFileSync(blogPostsPath, JSON.stringify(updatedPosts, null, 2));
console.log(`Updated ${updated} blog posts with proper content.`);


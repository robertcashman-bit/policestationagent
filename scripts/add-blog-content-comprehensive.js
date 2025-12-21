const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, '..', 'data', 'blog-posts-full.json');
const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

// Function to extract text content length
function getTextLength(html) {
  if (!html) return 0;
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().split(' ').filter(w => w.length > 0).length;
}

// Function to generate content based on title
function generateContentForPost(post) {
  const title = post.title.toLowerCase();
  const slug = post.slug.toLowerCase();
  
  // Police Bail content
  if (title.includes('bail') || slug.includes('bail')) {
    return `<h2>Understanding Police Bail</h2>
<p>Police bail is a legal mechanism under the Police and Criminal Evidence Act 1984 (PACE) that allows the police to release a suspect from custody while an investigation continues. Understanding how bail works is crucial for anyone involved in the criminal justice system.</p>

<h3>When Can Police Impose Bail?</h3>
<p>Police can impose bail when:</p>
<ul>
<li>A person has been arrested but not yet charged</li>
<li>The police need more time to investigate</li>
<li>A person has been charged and is awaiting court appearance</li>
</ul>

<h3>Bail Conditions</h3>
<p>Bail conditions may include requirements such as:</p>
<ul>
<li>Residence requirements</li>
<li>Reporting to a police station at specified times</li>
<li>Surrendering passports or travel documents</li>
<li>Not contacting certain individuals (witnesses or co-accused)</li>
<li>Curfews</li>
<li>Not entering specific areas</li>
</ul>

<h3>Breaching Bail Conditions</h3>
<p>Breaching bail conditions is a criminal offence under section 6(5) of the Bail Act 1976. Consequences can include immediate arrest, detention, and potential prosecution for the breach itself. It is essential to understand and comply with all bail conditions.</p>

<h3>Legal Implications</h3>
<p>If you are released on police bail, it is crucial to understand your conditions and comply with them. Seeking legal advice from an accredited police station representative can help ensure your rights are protected throughout the process. An experienced solicitor can also challenge unreasonable bail conditions if necessary.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Bail Act 1976</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
<li>Criminal Procedure Rules 2020</li>
</ul>`;
  }
  
  // Property Return content
  if (title.includes('property') && (title.includes('return') || title.includes('returned'))) {
    return `<h2>Getting Your Property Returned from the Police</h2>
<p>When the police seize property during an investigation, you have rights regarding its return. Understanding these rights is essential for protecting your interests.</p>

<h3>When Can Property Be Seized?</h3>
<p>Under section 19 of the Police and Criminal Evidence Act 1984 (PACE), police can seize property if:</p>
<ul>
<li>It may be evidence of an offence</li>
<li>It may be used to cause physical injury or damage</li>
<li>It is necessary for the investigation</li>
</ul>

<h3>How to Request Return of Property</h3>
<p>To request the return of your property:</p>
<ol>
<li>Contact the officer in charge of your case or the police station where property is held</li>
<li>Provide proof of ownership where possible</li>
<li>Request return in writing if necessary</li>
<li>Seek legal advice if property is not returned promptly</li>
</ol>

<h3>Time Limits for Property Return</h3>
<p>There is no specific statutory time limit for property return, but police should return property when it is no longer needed for the investigation. If property is not returned within a reasonable time, you may need to make a formal complaint or seek legal advice. In some cases, you may need to apply to the magistrates' court for an order for return.</p>

<h3>Your Rights</h3>
<p>You have the right to know why your property was seized and when it will be returned. If property is retained for an unreasonable period, you may be entitled to compensation. An accredited police station representative can advise you on your rights and help secure the return of your property.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984, Section 19</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
<li>Police (Property) Act 1897</li>
</ul>`;
  }
  
  // Voluntary Interview content
  if (title.includes('voluntary') && title.includes('interview')) {
    return `<h2>What is a Voluntary Police Interview?</h2>
<p>A voluntary police interview (also called a "voluntary attendance" or "interview under caution") is a formal interview conducted by the police where you are not under arrest. Despite the name "voluntary", these interviews are serious and anything you say can be used as evidence in court.</p>

<h3>Your Rights During a Voluntary Interview</h3>
<p>During a voluntary interview, you have the right to:</p>
<ul>
<li>Free legal advice from a solicitor</li>
<li>Have a solicitor present during the interview</li>
<li>Understand the allegations against you</li>
<li>Receive disclosure of evidence before the interview</li>
<li>Take breaks during the interview</li>
</ul>

<h3>Why You Need a Solicitor</h3>
<p>Even though you are not under arrest, a voluntary interview is just as serious as an interview in custody. Having a solicitor present ensures:</p>
<ul>
<li>You understand your rights and the process</li>
<li>You receive proper advice before answering questions</li>
<li>The interview is conducted fairly and in accordance with PACE</li>
<li>Your interests are protected throughout</li>
<li>You understand the implications of what you say</li>
</ul>

<h3>What Happens During a Voluntary Interview?</h3>
<p>The interview will be:</p>
<ul>
<li>Conducted under caution (you will be read your rights)</li>
<li>Audio or video recorded</li>
<li>Conducted in accordance with PACE Code C</li>
<li>Used as evidence if the case goes to court</li>
</ul>

<h3>Legal Advice is Free</h3>
<p>Legal advice and representation for voluntary interviews is free under Legal Aid, regardless of your financial circumstances. This is a fundamental right under the Police and Criminal Evidence Act 1984.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
</ul>`;
  }
  
  // Duty Solicitor content
  if (title.includes('duty solicitor') || slug.includes('duty-solicitor')) {
    return `<h2>What is a Duty Solicitor?</h2>
<p>A duty solicitor is a qualified criminal solicitor who provides free legal advice and representation at police stations and magistrates' courts. They are independent of the police and work solely to protect your rights.</p>

<h3>Qualifications Required</h3>
<p>To become a duty solicitor, a solicitor must:</p>
<ul>
<li>Be qualified as a solicitor in England and Wales</li>
<li>Pass the police station qualification exam</li>
<li>Complete a portfolio assessment of at least 9 police station attendances</li>
<li>Be accredited by the Law Society</li>
<li>Maintain their accreditation through continuing professional development</li>
</ul>

<h3>When Can You Use a Duty Solicitor?</h3>
<p>You can request a duty solicitor:</p>
<ul>
<li>When arrested and taken to a police station</li>
<li>When invited for a voluntary interview</li>
<li>At magistrates' court if you don't have your own solicitor</li>
<li>At any time during police questioning</li>
</ul>

<h3>Is Legal Advice Free?</h3>
<p>Yes. Legal advice and representation at the police station is free under Legal Aid, regardless of your financial circumstances. This is a fundamental right under the Police and Criminal Evidence Act 1984 (PACE). The duty solicitor scheme ensures everyone has access to legal representation, regardless of their ability to pay.</p>

<h3>What Does a Duty Solicitor Do?</h3>
<p>A duty solicitor will:</p>
<ul>
<li>Advise you on your rights</li>
<li>Obtain disclosure of the case against you</li>
<li>Advise you on whether to answer questions</li>
<li>Attend your interview with you</li>
<li>Make representations about bail or release</li>
<li>Protect your interests throughout the process</li>
</ul>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
<li>Law Society Accreditation Scheme</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
</ul>`;
  }
  
  // Police Station Representation content
  if (title.includes('police station representation') || title.includes('police station rep')) {
    return `<h2>Police Station Representation</h2>
<p>Police station representation is a crucial service that ensures your rights are protected during police interviews and investigations. Under the Police and Criminal Evidence Act 1984 (PACE), everyone has the right to free legal advice when arrested or interviewed by the police.</p>

<h3>What is Police Station Representation?</h3>
<p>Police station representation involves an accredited solicitor or police station representative attending the police station with you to:</p>
<ul>
<li>Advise you on your legal rights</li>
<li>Obtain disclosure of the case against you</li>
<li>Advise you on whether to answer questions or exercise your right to silence</li>
<li>Attend your interview with you</li>
<li>Ensure police procedures are followed correctly</li>
<li>Make representations about bail or release</li>
</ul>

<h3>Why Do You Need Representation?</h3>
<p>Having a solicitor present at the police station is essential because:</p>
<ul>
<li>The police interview is often the most critical stage of a criminal investigation</li>
<li>What you say (or don't say) can significantly impact the outcome</li>
<li>You may not understand your rights without legal advice</li>
<li>Police procedures must be followed correctly</li>
<li>You need expert advice on the strength of the case against you</li>
</ul>

<h3>Is It Free?</h3>
<p>Yes. Legal advice and representation at the police station is free under Legal Aid, regardless of your financial circumstances. This applies to both arrested persons and those attending voluntary interviews.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>PACE Code C - Code of Practice for the Detention, Treatment and Questioning of Persons</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`;
  }
  
  // Police Cautions content
  if (title.includes('caution') || slug.includes('caution')) {
    return `<h2>Understanding Police Cautions</h2>
<p>A police caution is a formal warning given by the police to someone who has admitted an offence. Understanding what a caution means and its implications is important for anyone dealing with the police.</p>

<h3>What is a Police Caution?</h3>
<p>A police caution is:</p>
<ul>
<li>A formal warning for a criminal offence</li>
<li>An alternative to prosecution</li>
<li>A criminal record</li>
<li>May affect employment, travel, and other aspects of your life</li>
</ul>

<h3>Types of Cautions</h3>
<p>There are different types of cautions:</p>
<ul>
<li><strong>Simple Caution:</strong> A formal warning for a minor offence</li>
<li><strong>Conditional Caution:</strong> A caution with conditions attached</li>
</ul>

<h3>Implications of Accepting a Caution</h3>
<p>Before accepting a caution, you should understand that:</p>
<ul>
<li>It will appear on your criminal record</li>
<li>It may affect employment opportunities</li>
<li>It may affect travel to certain countries</li>
<li>It may be disclosed in DBS checks</li>
<li>You must admit the offence to receive a caution</li>
</ul>

<h3>Legal Advice</h3>
<p>Before accepting a caution, you should seek legal advice. An accredited police station representative can advise you on whether accepting a caution is in your best interests and explain the full implications.</p>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Criminal Justice Act 2003</li>
<li>Rehabilitation of Offenders Act 1974</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
</ul>`;
  }
  
  // Default content structure
  return `<h2>Introduction</h2>
<p>This article provides information about ${post.title} in the context of police station representation and criminal law in England and Wales.</p>

<h3>Your Right to Legal Advice</h3>
<p>If you require legal advice or representation at a police station, you are entitled to free legal advice under the Police and Criminal Evidence Act 1984 (PACE). An accredited duty solicitor can provide expert guidance throughout the process, whether you have been arrested or invited for a voluntary interview.</p>

<h3>Why Legal Representation Matters</h3>
<p>Having a solicitor present during police interviews ensures:</p>
<ul>
<li>Your rights are protected</li>
<li>You understand the allegations against you</li>
<li>You receive proper advice before making decisions</li>
<li>Police procedures are followed correctly</li>
<li>Your interests are safeguarded</li>
</ul>

<h2>References</h2>
<ul>
<li>Police and Criminal Evidence Act 1984 (PACE)</li>
<li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015</li>
<li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
</ul>`;
}

// Update posts
let updated = 0;
const updatedPosts = posts.map(post => {
  const wordCount = getTextLength(post.content);
  
  // If content is too short (less than 200 words), add proper content
  if (wordCount < 200) {
    const newContent = generateContentForPost(post);
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
console.log(`Total posts: ${posts.length}`);


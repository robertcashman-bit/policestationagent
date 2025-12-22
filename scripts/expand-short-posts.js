const fs = require('fs');
const path = require('path');

const blogPostsPath = path.join(__dirname, '..', 'data', 'blog-posts-full.json');
const posts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

function getCharCount(html) {
  if (!html) return 0;
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().length;
}

function getImageCount(html) {
  if (!html) return 0;
  return (html.match(/<img[^>]*>/gi) || []).length;
}

// Comprehensive content for specific short posts
const expandedContent = {
  'arrested-or-have-a-policewarrant-in-kent-here-s-what-you-need-to-know0': {
    content: `<h2>Understanding Police Warrants and Interviews in Kent</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-5.png" alt="Understanding Police Warrants and Interviews in Kent" loading="lazy" width="800" height="400" />
  <figcaption>Understanding Police Warrants and Interviews in Kent</figcaption>
</figure>

<p>If the police have a warrant for your arrest or want to interview you in Kent, understanding your rights is crucial. Under section 24 of the Police and Criminal Evidence Act 1984, police can arrest without a warrant if they have reasonable grounds to suspect you have committed, are committing, or are about to commit an offence.</p>

<h3>Arrest Warrants</h3>
<p>Arrest warrants are issued by magistrates under section 1 of the Magistrates' Courts Act 1980. If a warrant has been issued, the police can arrest you at any time. Under section 17 of PACE, police can enter premises to execute an arrest warrant. They can also enter to arrest someone for an indictable offence or to save life and limb.</p>

<h3>Your Rights When Arrested</h3>
<p>When arrested, you must be informed of the reasons under section 28 of PACE. You have the right to free legal advice under section 58, the right to have someone informed of your arrest under Code C, paragraph 5.1, and the right to consult the Codes of Practice under Code C, paragraph 3.4. The police must also inform you of your right to remain silent under Code C, paragraph 10.1.</p>

<h3>Voluntary Interviews</h3>
<p>If the police want to interview you without arrest, this is called a voluntary interview under section 29 of PACE. Even though you are not under arrest, you have the same right to free legal advice. Under Code C, paragraph 3.21, you are free to leave at any time unless you are placed under arrest. However, anything you say can still be used as evidence.</p>

<h3>Seeking Legal Advice in Kent</h3>
<p>Whether arrested or invited for a voluntary interview at any Kent police station, you should seek legal advice immediately. Under Code C, paragraph 6.1, the police must contact a solicitor on your behalf without delay. Legal advice is free under Legal Aid, provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. An accredited duty solicitor can attend any Kent custody suite to provide expert representation.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 24</li>
  <li>Police and Criminal Evidence Act 1984, section 28</li>
  <li>Police and Criminal Evidence Act 1984, section 29</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Magistrates' Courts Act 1980, section 1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 5.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.21</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'what-happens-if-you-don-t-attend-a-voluntary-police-interview-inengland': {
    content: `<h2>What Happens If You Don't Attend a Voluntary Police Interview in England?</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-1.png" alt="What Happens If You Don't Attend a Voluntary Police Interview" loading="lazy" width="800" height="400" />
  <figcaption>Understanding the consequences of not attending a voluntary police interview</figcaption>
</figure>

<p>If you are invited for a voluntary police interview and do not attend, the police may decide to arrest you. Under section 24 of the Police and Criminal Evidence Act 1984, police can arrest without a warrant if they have reasonable grounds to suspect you have committed an offence and it is necessary to arrest you to enable the prompt and effective investigation of the offence.</p>

<h3>When Can Police Arrest You?</h3>
<p>Under section 24(5) of PACE, one of the reasons arrest may be necessary is if it is necessary to allow the prompt and effective investigation of the offence. If you fail to attend a voluntary interview, the police may conclude that arrest is necessary to ensure you are interviewed. Under Code G, paragraph 2.9(e), this is a valid reason for arrest.</p>

<h3>Your Right to Legal Advice</h3>
<p>Whether you attend voluntarily or are arrested, you have the right to free legal advice under section 58 of PACE. Under Code C, paragraph 6.1, the police must contact a solicitor on your behalf without delay. Legal advice is free under Legal Aid, provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012.</p>

<h3>Why You Should Attend with a Solicitor</h3>
<p>Attending a voluntary interview with a solicitor ensures your rights are protected. Your solicitor can obtain disclosure of the case against you under Code C, paragraph 11.1A, advise you on whether to answer questions, and ensure the interview is conducted fairly. This can often prevent the need for arrest.</p>

<h3>Consequences of Non-Attendance</h3>
<p>If you do not attend a voluntary interview, the police may issue a warrant for your arrest under section 1 of the Magistrates' Courts Act 1980. This can lead to you being arrested at an inconvenient time, such as at work or in public. It is always better to attend voluntarily with a solicitor at an arranged time.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 24</li>
  <li>Police and Criminal Evidence Act 1984, section 24(5)</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code G, paragraph 2.9(e)</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A</li>
  <li>Magistrates' Courts Act 1980, section 1</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'whats-a-duty-solicitor': {
    content: `<h2>What is a Duty Solicitor?</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-2.png" alt="What is a Duty Solicitor" loading="lazy" width="800" height="400" />
  <figcaption>Understanding the role of a duty solicitor</figcaption>
</figure>

<p>A duty solicitor is a qualified criminal solicitor who provides free legal advice and representation at police stations and magistrates' courts. Under section 58 of the Police and Criminal Evidence Act 1984, everyone has the right to consult with a solicitor when arrested or interviewed by the police.</p>

<h3>Qualifications and Accreditation</h3>
<p>Duty solicitors must be accredited by the Law Society under the Accreditation Scheme for Police Station Representatives. They must pass rigorous examinations in criminal law, police powers, evidence, and interview techniques. This ensures they have the expertise to provide proper legal advice and representation throughout the criminal justice process.</p>

<h3>When Can You Use a Duty Solicitor?</h3>
<p>You can request a duty solicitor when arrested and taken to a police station, when invited for a voluntary interview, or at magistrates' court if you don't have your own solicitor. Under Code C, paragraph 6.1, the police must contact a solicitor immediately upon request. The duty solicitor scheme operates 24 hours a day, 7 days a week.</p>

<h3>Free Legal Advice Under Legal Aid</h3>
<p>Legal advice and representation at the police station is free under Legal Aid, regardless of your financial circumstances. This is provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. The duty solicitor scheme ensures everyone has access to expert legal representation, regardless of their ability to pay.</p>

<h3>What Does a Duty Solicitor Do?</h3>
<p>A duty solicitor will advise you on your rights under PACE, obtain disclosure of the case against you under Code C, paragraph 11.1A, advise you on whether to answer questions or exercise your right to silence, attend your interview with you, make representations about bail or release, and protect your interests throughout the process. Under Code C, paragraph 6.5, you have the right to consult with your solicitor in private.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.5</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
  <li>Law Society Accreditation Scheme for Police Station Representatives</li>
</ul>`
  },
  
  'is-legal-advice-free-at-the-police-station': {
    content: `<h2>Can You Get Free Legal Advice at the Police Station?</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-2.png" alt="Free Legal Advice at Police Station" loading="lazy" width="800" height="400" />
  <figcaption>Free legal advice is available at all police stations</figcaption>
</figure>

<p>Yes, legal advice at the police station is completely free under Legal Aid, regardless of your financial circumstances. This fundamental right is provided under section 58 of the Police and Criminal Evidence Act 1984 and Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012.</p>

<h3>Your Right to Free Legal Advice</h3>
<p>Under section 58 of PACE, everyone has the right to consult with a solicitor when arrested or interviewed by the police. This right is not means-tested - it is available to everyone, regardless of income or savings. Under Code C, paragraph 6.1, the police must contact a solicitor on your behalf immediately upon request, without delay.</p>

<h3>When Legal Advice is Available</h3>
<p>Free legal advice is available whether you have been arrested and taken to a police station, or invited for a voluntary interview. Under Code C, paragraph 3.21, even during voluntary interviews, you have the same right to free legal advice. The duty solicitor scheme operates 24 hours a day, 7 days a week, including bank holidays.</p>

<h3>What the Solicitor Will Do</h3>
<p>An accredited duty solicitor will advise you on your rights, obtain disclosure of the case against you under Code C, paragraph 11.1A, advise you on whether to answer questions, attend your interview with you, and ensure police procedures are followed correctly. Under Code C, paragraph 6.5, you have the right to consult with your solicitor in private before and during the interview.</p>

<h3>No Cost to You</h3>
<p>The cost of legal advice at the police station is covered by Legal Aid, funded by the government. You do not need to pay anything, and your financial circumstances are not relevant. This ensures everyone has access to expert legal representation, which is fundamental to ensuring fairness in the criminal justice system.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 6.5</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'nofurtheractionafterpoliceinterview': {
    content: `<h2>No Further Action After Police Interview</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-5.png" alt="No Further Action After Police Interview" loading="lazy" width="800" height="400" />
  <figcaption>Understanding what no further action means</figcaption>
</figure>

<p>If the police decide to take no further action after your interview, this means they will not charge you with an offence. Under the Code for Crown Prosecutors, the police must consider whether there is sufficient evidence and whether it is in the public interest to prosecute. If either test is not met, no further action will be taken.</p>

<h3>What Does No Further Action Mean?</h3>
<p>No further action (NFA) means the police have decided not to proceed with the case. This can happen if there is insufficient evidence, if it is not in the public interest to prosecute, or if the police determine that no offence has been committed. Under section 37 of the Police and Criminal Evidence Act 1984, the police must make a decision about whether to charge, release on bail, or take no further action.</p>

<h3>When Can No Further Action Be Taken?</h3>
<p>No further action can be taken at any stage of the investigation. It may happen immediately after interview if the police determine there is no case to answer, or it may happen later after further investigation. Under the Code for Crown Prosecutors, the evidential test must be met - there must be sufficient evidence for a realistic prospect of conviction.</p>

<h3>Your Rights After No Further Action</h3>
<p>If no further action is taken, you should be informed in writing. You are not charged with any offence and do not have a criminal record. However, the police may retain records of the investigation. Under the Rehabilitation of Offenders Act 1974, if you are not charged, you do not have a criminal record for the matter.</p>

<h3>Seeking Legal Advice</h3>
<p>If you are interviewed by the police, it is essential to have legal representation. An accredited duty solicitor can ensure your rights are protected, obtain disclosure, and provide expert advice. Legal advice at the police station is free under section 58 of PACE and Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 37</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Code for Crown Prosecutors</li>
  <li>Rehabilitation of Offenders Act 1974, section 1</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'voluntaryinterviewwithpolice': {
    content: `<h2>Voluntary Interviews With Police</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-1.png" alt="Voluntary Interviews With Police" loading="lazy" width="800" height="400" />
  <figcaption>Understanding voluntary police interviews</figcaption>
</figure>

<p>A voluntary interview (also called a voluntary attendance or interview under caution) is a formal interview conducted by the police where you are not under arrest. Under section 29 of the Police and Criminal Evidence Act 1984, you are free to leave at any time unless you are placed under arrest. However, anything you say can be used as evidence in court.</p>

<h3>Your Rights During Voluntary Interviews</h3>
<p>During a voluntary interview, you have the same rights as if you were under arrest. Under Code C, paragraph 3.21, you have the right to free legal advice, the right to have a solicitor present, and the right to be informed of the nature of the suspected offence. Under Code C, paragraph 11.1A, your solicitor can obtain disclosure of the case against you before the interview begins.</p>

<h3>Why Legal Representation is Essential</h3>
<p>Even though voluntary interviews are not conducted under arrest, they are just as serious. Under Code C, paragraph 10.1, you will be cautioned, and the interview will be audio or video recorded. Your solicitor can advise you on whether to answer questions, ensure the interview is conducted fairly, and protect your interests throughout the process.</p>

<h3>The Interview Process</h3>
<p>Voluntary interviews are conducted under caution, as required by Code C, paragraph 10.1. The interview will be recorded, and your solicitor will be present throughout. Under Code C, paragraph 11.4, you have the right to breaks and to consult with your solicitor in private. The police must follow the same procedures as for interviews under arrest.</p>

<h3>Free Legal Advice</h3>
<p>Legal advice for voluntary interviews is free under Legal Aid, regardless of your financial circumstances. This is provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. Under section 58 of PACE and Code C, paragraph 6.1, the police must contact a solicitor on your behalf immediately upon request.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 29</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 3.21</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.4</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'what-happens-at-a-police-station-voluntary-interview-page-4': {
    content: `<h2>What Happens at a Police Station Voluntary Interview</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-1.png" alt="What Happens at a Police Station Voluntary Interview" loading="lazy" width="800" height="400" />
  <figcaption>Understanding the voluntary interview process</figcaption>
</figure>

<p>If you are invited for a voluntary interview at a police station, understanding what to expect can help you prepare. Under section 29 of the Police and Criminal Evidence Act 1984, you are not under arrest during a voluntary interview, but you have the same rights to legal advice and representation.</p>

<h3>Before the Interview</h3>
<p>Before your interview begins, you have the right to speak to a solicitor in private. Under Code C, paragraph 11.1A, your solicitor can obtain disclosure of the allegations and evidence against you. This enables them to provide proper legal advice about whether to answer questions or exercise your right to silence.</p>

<h3>During the Interview</h3>
<p>The interview will be conducted under caution, as required by Code C, paragraph 10.1. You will be informed that you do not have to say anything, but it may harm your defence if you do not mention something you later rely on in court. The interview will be audio or video recorded, and your solicitor will be present throughout.</p>

<h3>Your Rights During Interview</h3>
<p>You have the right to have a solicitor present, take breaks when needed, ask for clarification if you don't understand questions, and exercise your right to silence. Under Code C, paragraph 11.4, you can consult with your solicitor in private at any time. The police must follow the same procedures as for interviews under arrest.</p>

<h3>After the Interview</h3>
<p>After the interview, the police may decide to take no further action, release you under investigation, release you on bail, or charge you with an offence. Under section 37 of PACE, the police must make a decision about how to proceed. Your solicitor can make representations about bail or release.</p>

<h3>Free Legal Advice</h3>
<p>Legal advice for voluntary interviews is free under Legal Aid, provided under Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. Under section 58 of PACE and Code C, paragraph 6.1, the police must contact a solicitor on your behalf immediately upon request.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 29</li>
  <li>Police and Criminal Evidence Act 1984, section 37</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.4</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'whats-happens-at-a-police-station-voluntary-interview-part-2': {
    content: `<h2>Inside a Voluntary Police Interview: What to Expect, Part 2</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-1.png" alt="Inside a Voluntary Police Interview Part 2" loading="lazy" width="800" height="400" />
  <figcaption>Understanding voluntary interview procedures</figcaption>
</figure>

<p>This is part 2 of our guide to voluntary police interviews. In part 1, we covered the basics. Here, we explore the interview process in more detail and your rights throughout.</p>

<h3>The Caution</h3>
<p>At the start of the interview, you will be read the caution under Code C, paragraph 10.1. This informs you that you do not have to say anything, but it may harm your defence if you do not mention something you later rely on in court. The caution is the same whether you are under arrest or attending voluntarily.</p>

<h3>Recording the Interview</h3>
<p>Voluntary interviews are recorded, usually by audio or video. Under Code E of PACE, interviews must be recorded. The recording ensures accuracy and can be used as evidence in court. Your solicitor will be present throughout and can ensure the recording is accurate and complete.</p>

<h3>Questioning Procedures</h3>
<p>During the interview, the police will ask questions about the allegations. Under Code C, paragraph 11.4, you have the right to breaks and to consult with your solicitor in private. Your solicitor can intervene if questioning becomes improper, unfair, or if you need clarification. They can also advise you on whether to answer questions.</p>

<h3>After the Interview</h3>
<p>After the interview, the police will make a decision about how to proceed. Under section 37 of PACE, they may decide to take no further action, release you under investigation, release you on bail, or charge you with an offence. Your solicitor can make representations about bail conditions or release.</p>

<h3>Why Legal Representation Matters</h3>
<p>Having a solicitor present ensures your rights are protected, you receive proper advice, and the interview is conducted fairly. Legal advice is free under section 58 of PACE and Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. An accredited duty solicitor can attend any police station to provide expert representation.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 37</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.4</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code E</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  },
  
  'the-hidden-risks-of-voluntary-police-interviews-in-the-uk-you-need-to-know': {
    content: `<h2>The Hidden Risks of Voluntary Police Interviews in the UK</h2>
<figure class="blog-image">
  <img src="/blog-images/blog-listing-1.png" alt="Hidden Risks of Voluntary Police Interviews" loading="lazy" width="800" height="400" />
  <figcaption>Understanding the risks of voluntary police interviews</figcaption>
</figure>

<p>Voluntary police interviews may seem less serious than being arrested, but they carry significant risks. Under section 29 of the Police and Criminal Evidence Act 1984, you are not under arrest during a voluntary interview, but anything you say can be used as evidence in court, just as if you were under arrest.</p>

<h3>The Risk of Self-Incrimination</h3>
<p>One of the biggest risks is saying something that incriminates you. Under Code C, paragraph 10.1, you are cautioned, but many people don't fully understand the implications. Without legal advice, you may inadvertently admit to something or provide information that strengthens the case against you. Your solicitor can advise you on what to say and what not to say.</p>

<h3>Lack of Disclosure</h3>
<p>Without a solicitor, you may not receive proper disclosure of the case against you. Under Code C, paragraph 11.1A, your solicitor can obtain disclosure of the allegations and evidence. Without this information, you cannot make an informed decision about whether to answer questions. This is a critical risk that many people don't realize.</p>

<h3>Recording and Evidence</h3>
<p>Voluntary interviews are recorded under Code E of PACE, and these recordings can be used as evidence in court. Under Code C, paragraph 11.4, the interview must be conducted fairly, but without a solicitor present, you may not realize if procedures are not being followed correctly. Your solicitor can ensure the interview is conducted properly.</p>

<h3>Potential for Arrest</h3>
<p>If you do not attend a voluntary interview or if the police decide arrest is necessary, you can be arrested under section 24 of PACE. Under Code G, paragraph 2.9(e), arrest may be necessary to allow the prompt and effective investigation of the offence. Attending voluntarily with a solicitor can often prevent the need for arrest.</p>

<h3>Protecting Your Rights</h3>
<p>The best way to protect yourself is to have a solicitor present. Legal advice is free under section 58 of PACE and Schedule 1, Part 1 of the Legal Aid, Sentencing and Punishment of Offenders Act 2012. An accredited duty solicitor can attend any police station to provide expert representation and ensure your rights are protected.</p>

<h2>References</h2>
<ul>
  <li>Police and Criminal Evidence Act 1984, section 24</li>
  <li>Police and Criminal Evidence Act 1984, section 29</li>
  <li>Police and Criminal Evidence Act 1984, section 58</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 10.1</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.1A</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code C, paragraph 11.4</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code E</li>
  <li>Police and Criminal Evidence Act 1984 (Codes of Practice) Order 2015, Code G, paragraph 2.9(e)</li>
  <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012, Schedule 1, Part 1</li>
</ul>`
  }
};

// Process posts
let updated = 0;
const enhancedPosts = posts.map((post) => {
  const currentChars = getCharCount(post.content);
  
  // Check if we have comprehensive content for this post
  if (expandedContent[post.slug] && currentChars < 1500) {
    updated++;
    return { ...post, content: `<div class="blog-content">${expandedContent[post.slug].content}</div>` };
  }
  
  return post;
});

// Write enhanced posts
fs.writeFileSync(blogPostsPath, JSON.stringify(enhancedPosts, null, 2));
console.log(`Expanded ${updated} short blog posts with comprehensive content.`);

// Final verification
const stats = {
  correctLength: 0,
  correctImages: 0,
  hasReferences: 0,
  perfect: 0
};

enhancedPosts.forEach(post => {
  const chars = getCharCount(post.content);
  const images = getImageCount(post.content);
  const hasRefs = post.content && post.content.includes('<h2>References</h2>');
  
  if (chars >= 1500 && chars <= 2500) stats.correctLength++;
  if (images === 1) stats.correctImages++;
  if (hasRefs) stats.hasReferences++;
  if (chars >= 1500 && chars <= 2500 && images === 1 && hasRefs) stats.perfect++;
});

console.log(`\n=== FINAL VERIFICATION ===`);
console.log(`Posts with correct length (1500-2500 chars): ${stats.correctLength}/${enhancedPosts.length}`);
console.log(`Posts with exactly 1 image: ${stats.correctImages}/${enhancedPosts.length}`);
console.log(`Posts with references: ${stats.hasReferences}/${enhancedPosts.length}`);
console.log(`Perfect posts (all criteria): ${stats.perfect}/${enhancedPosts.length}`);

if (stats.perfect < enhancedPosts.length) {
  const needsWork = enhancedPosts.filter(p => {
    const chars = getCharCount(p.content);
    const images = getImageCount(p.content);
    const hasRefs = p.content && p.content.includes('<h2>References</h2>');
    return chars < 1500 || chars > 2500 || images !== 1 || !hasRefs;
  });
  
  console.log(`\n=== REMAINING ISSUES: ${needsWork.length} ===`);
  needsWork.forEach(p => {
    const chars = getCharCount(p.content);
    const images = getImageCount(p.content);
    const hasRefs = p.content && p.content.includes('<h2>References</h2>');
    console.log(`${p.slug}: ${chars} chars, ${images} images, refs: ${hasRefs}`);
  });
}


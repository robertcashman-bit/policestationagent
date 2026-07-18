"use client";

import FAQAccordion from "@/components/FAQAccordion";
import { SCOPE_FAQ_ITEMS, SCOPE_SECTION_ID } from "@/config/scope-faqs";

export default function FAQContent() {
  const scopeSection = {
    title: "Immediate custody only — who can call",
    id: SCOPE_SECTION_ID,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    items: SCOPE_FAQ_ITEMS.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
  };

  const sections = [
    {
      title: "What We Do",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      items: [
        {
          question: "What services do you provide as a Police Station Duty Solicitor?",
          answer:
            "We provide expert police station representation by qualified solicitor at all Kent custody suites. Our services include: FREE legal advice under Legal Aid, representation during police interviews (both in custody and voluntary), advice on your legal rights under PACE 1984, strategic guidance on whether to answer questions or exercise your right to silence, and support for immediate family who need to instruct a solicitor on behalf of someone currently in custody.",
        },
        {
          question: "Who do you represent?",
          answer:
            "We represent anyone who has been arrested or invited for a voluntary police interview in Kent. This includes individuals facing any type of criminal allegation, from minor offences to serious matters. We also provide agent cover for other criminal law firms at police stations within about 45 minutes of Maidstone.",
        },
        {
          question: "What types of offences do you cover?",
          answer:
            "We cover all types of criminal offences, including: assault, theft, fraud, drug offences, sexual offences, motoring offences, public order offences, and any other criminal matter. Our expertise covers the full spectrum of criminal law, from summary-only offences to indictable-only matters. For detailed information about specific offence types, see our <a href='/offences-we-deal-with' class='text-blue-600 hover:underline font-semibold'>Offences We Deal With</a> page.",
        },
        {
          question: "Do you cover voluntary police interviews?",
          answer:
            'Yes, we provide free representation for voluntary police interviews (also known as "caution plus 3" interviews) across Kent. If you have been asked to attend a voluntary interview, it is crucial to have legal representation. We can attend with you to provide advice and ensure your rights are protected throughout the process.',
        },
        {
          question: "What qualifications do your representatives have?",
          answer:
            "Our representatives are fully accredited police station representatives, qualified under the Police Station Accreditation Scheme. Robert Cashman is a qualified solicitor with over 35 years of experience, a Higher Court Advocate, and an accredited duty solicitor. All our representatives are properly trained and accredited to provide police station representation.",
        },
        {
          question: "What is a police station duty solicitor?",
          answer:
            "A police station duty solicitor is a qualified solicitor accredited by the Law Society to provide FREE legal advice at police stations under Legal Aid. Robert Cashman is both a qualified solicitor and an Accredited Duty Solicitor with Higher Court Advocate status, providing expert representation at all Kent custody suites including Medway, Maidstone, Canterbury, and Gravesend.",
        },
        {
          question: "How does a duty solicitor protect your rights in Kent custody suites?",
          answer:
            "A duty solicitor protects your rights by: ensuring you understand your legal rights under PACE 1984, reviewing police evidence and disclosure before interview, advising on whether to answer questions or remain silent, attending the interview with you and intervening if questioning is improper, making representations about bail conditions or release, and ensuring all police procedures are followed correctly. This protection is your absolute right under Section 58 of PACE 1984.",
        },
        {
          question: "What is the difference between a police station agent and a duty solicitor?",
          answer:
            "A duty solicitor is a qualified solicitor accredited by the Law Society to provide legal advice at police stations. A police station agent (or accredited representative) is a non-solicitor who has passed the Police Station Qualification to attend on behalf of a solicitor's firm. Robert Cashman is a qualified solicitor and Accredited Duty Solicitor with Higher Court Advocate status, not just an agent.",
        },
        {
          question: "Are you available for extended hours?",
          answer:
            "Yes, we provide extended hours service covering evenings, weekends and bank holidays. We aim to respond promptly. Attendance times depend on location, custody demand and solicitor availability. Simply call 01732 247427 and we will arrange for a qualified duty solicitor to attend the police station.",
        },
        {
          question: "Do you cover Legal Aid and private work?",
          answer:
            "Yes, we provide both Legal Aid representation (which is free at the police station) and private client services. Legal Aid is available to everyone at the police station regardless of income. For those who prefer an enhanced private service — and, where possible, representation by Robert Cashman — we also offer private client services with fixed-fee packages. If Robert cannot attend, Tuckers Solicitors LLP will arrange an alternative suitably qualified representative.",
        },
        {
          question: "Which police stations do you cover?",
          answer:
            "We cover all police stations and custody suites across Kent, including: Medway, Maidstone, Gravesend, Canterbury, Tonbridge, Folkestone, Ashford, Sittingbourne, Margate, Dover, Sevenoaks, and all other Kent custody facilities. Travel times vary by location - typically 15-30 minutes for nearby stations, up to 60-75 minutes for stations in East Kent.",
        },
      ],
    },
    scopeSection,
    {
      title: "When a different service may be better",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 16v-4"></path>
          <path d="M12 8h.01"></path>
        </svg>
      ),
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      items: [
        {
          question: "Do you deal with arrests from yesterday or general case updates?",
          answer:
            "No. We handle immediate matters only — someone currently in custody or a booked voluntary interview. We cannot attend for past arrests, provide updates after release, or answer general enquiries about what happened days ago. See the section above on immediate custody.",
        },
        {
          question: "Can a friend instruct you on my behalf?",
          answer:
            "No. Only immediate family (such as a parent, spouse or partner, child, or sibling) may instruct us on someone else's behalf — and the detainee must confirm they want us to act when we contact the station. Friends and other acquaintances cannot instruct us.",
        },
        {
          question: "Can you help find someone who has disappeared or trace what happened to them?",
          answer:
            "No. We are not a tracing or missing-person service. We cannot locate someone, confirm whether they are in custody, or investigate what happened to them. If an immediate family member is in custody right now, you may call to instruct representation.",
        },
        {
          question: "Do you handle non-criminal matters?",
          answer:
            "No, we specialise exclusively in criminal defence and police station representation. We do not handle civil matters, family law, employment law, or any other non-criminal legal issues. Our focus is entirely on criminal defence from the police station stage onwards.",
        },
        {
          question: "Do you represent people after they have been charged?",
          answer:
            "While we specialise in police station representation, we work in association with Tuckers Solicitors LLP who provide expert court representation. If you are charged and need representation at the Magistrates' Court or Crown Court, we can ensure a seamless handover to specialist court advocates who will continue your defence.",
        },
        {
          question: "Can you help with motoring offences that don't involve arrest?",
          answer:
            "We focus on police station representation for criminal matters. For motoring offences that don't involve arrest (such as speeding tickets, parking fines, or fixed penalty notices), you would need to contact a specialist motoring solicitor. However, if you are arrested or invited for interview regarding a motoring offence, we can represent you.",
        },
        {
          question: "Do you provide legal advice for general queries?",
          answer:
            "We provide legal advice specifically related to police station representation for current custody or scheduled interviews. We do not provide general legal advice by phone or email. If you need immediate police station representation in Kent, call 01732 247427.",
        },
        {
          question: "Can you represent me at a police station outside Kent?",
          answer:
            "Our primary coverage area is Kent. However, we may be able to assist with representation outside Kent in certain circumstances, particularly for private clients. Please contact us to discuss your specific situation and we will advise on availability.",
        },
      ],
    },
    {
      title: "Becoming a Police Station Representative",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
          <path d="M22 10v6"></path>
          <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
        </svg>
      ),
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      items: [
        {
          question: "How do I become a Police Station Representative?",
          answer:
            "To become a police station representative, you need to complete the Police Station Qualification (PSQ) through the Solicitors Regulation Authority (SRA) or equivalent body. This involves completing a training course and passing assessments. Once qualified, you can work as an accredited representative for a solicitor's firm.",
        },
        {
          question: "What qualifications do I need?",
          answer:
            "You need to complete the Police Station Qualification (PSQ), which is a professional qualification specifically for police station representation. This is separate from becoming a qualified solicitor. The PSQ covers police station procedures, PACE codes, interview techniques, and legal rights. Some firms may also require a law degree or equivalent, but the PSQ is the essential qualification.",
        },
        {
          question: "What does the role involve?",
          answer:
            "A police station representative attends police stations to provide legal advice and representation to clients who have been arrested or invited for voluntary interviews. This includes: advising clients on their rights, attending interviews, providing strategic guidance, ensuring PACE compliance, and taking detailed notes. The role requires availability for unsocial hours and the ability to attend police stations at short notice.",
        },
        {
          question: "Can I work as a Police Station Rep while studying?",
          answer:
            "Yes, many police station representatives work part-time while studying law or other qualifications. The role can be flexible, though you need to be available for call-outs which may include evenings, weekends, and bank holidays. It provides excellent practical experience in criminal law.",
        },
        {
          question: "How much can I earn as a Police Station Representative?",
          answer:
            "Earnings vary depending on whether you work for a firm or as a freelance agent. Rates are typically set by the Legal Aid Agency for Legal Aid work, and by individual firms for private work. Many representatives earn competitive rates, particularly those with experience. Contact us if you are interested in working as a police station representative.",
        },
        {
          question: "Where can I get more information about becoming a Police Station Rep?",
          answer:
            "You can find information about the Police Station Qualification (PSQ) through the Solicitors Regulation Authority (SRA) website, or contact training providers who offer PSQ courses. You may also wish to contact criminal law firms directly to discuss opportunities. We are always interested in hearing from qualified and experienced police station representatives.",
        },
      ],
    },
    {
      title: "For Solicitors",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      items: [
        {
          question: "What agent services do you provide to law firms?",
          answer:
            "We provide reliable police station agent cover for criminal law firms at stations within about 45 minutes of Maidstone. Our services include: attending police stations on behalf of your clients, providing detailed attendance notes, ensuring compliance with PACE and professional standards, and maintaining communication with your firm throughout.",
        },
        {
          question: "What information do you provide after attending?",
          answer:
            "After each attendance, we provide comprehensive attendance notes including: details of the interview, advice given, any statements made, the outcome (charge, no further action, etc.), and any relevant observations. Notes are provided promptly, typically within 24 hours, to ensure continuity of representation for your client.",
        },
        {
          question: "What are your rates for agent work?",
          answer:
            "Our rates are competitive and transparent. We offer fixed rates for standard attendances, with additional charges only for extended attendances or out-of-hours work. Please contact us to discuss your firm's requirements and we can provide a detailed rate card tailored to your needs.",
        },
        {
          question: "Can you cover on short notice?",
          answer:
            "Yes, we understand that police station work often requires immediate response. We aim to be available for short-notice cover, subject to availability. Our extended hours service means we can often accommodate urgent requests, even outside normal business hours. Contact us to discuss your specific requirements.",
        },
      ],
    },
    {
      title: "Getting Help",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      items: [
        {
          question: "How do I get help if I've been arrested?",
          answer:
            'If you have been arrested, tell the custody officer that you want legal representation and ask for "Robert Cashman" or "Tuckers Solicitors LLP - Robert Cashman". They must contact us. You can also call us directly on 01732 247427. If your phone has been taken, an immediate family member can call us on your behalf. We will attend the police station to represent you - this is completely free under Legal Aid.',
        },
        {
          question: "What if I'm asked to attend a voluntary interview?",
          answer:
            'If you are asked to attend a voluntary interview (also called a "caution plus 3" interview), you have the right to free legal representation. Contact us on 01732 247427 and we can arrange to attend with you. It is crucial to have legal representation at voluntary interviews, as anything you say can be used in court. We will advise you on your rights and the best approach to take.',
        },
        {
          question: "Is advice at the police station really free?",
          answer:
            "Yes, legal advice at the police station is completely free under Legal Aid, regardless of your income or savings. This is a statutory right under the Police and Criminal Evidence Act 1984 (PACE). There is no means test for police station advice - it is available to everyone. The police pay the Legal Aid Agency, who then pay us, so there is no cost to you.",
        },
        {
          question: "What should I do if police want to interview me?",
          answer:
            "If police want to interview you, whether you have been arrested or invited for a voluntary interview, you should: 1) Exercise your right to free legal advice - tell them you want a solicitor, 2) Contact us on 01732 247427, 3) Do not answer any questions until you have spoken to a solicitor, 4) Remember that you have the right to remain silent. We will attend to represent you and provide expert advice throughout the process.",
        },
        {
          question: "Can my family contact you on my behalf?",
          answer:
            "Yes — immediate family only (such as a parent, spouse or partner, child, or sibling). Friends cannot instruct us. The person must be in current police custody at a Kent station. Under PACE Code C, if a solicitor is contacted by immediate family, the police must inform the detainee. The detainee must confirm they want us to represent them when we contact the station. See the section on immediate custody above for full details.",
        },
        {
          question: "Can you get me information about someone who has been arrested by the police?",
          answer:
            "See the section \"Immediate custody only — who can call\" above. In brief: we cannot provide status updates or case information about someone else. Immediate family may instruct representation for current custody only — not for past arrests or general enquiries.",
        },
        {
          question: "Can you report matters on my behalf to the police?",
          answer:
            "We specialise in defending people who are suspected of criminal offences, not in reporting crimes to the police. If you need to report a crime, you should contact the police directly by calling 101 for non-emergency matters or 999 in an emergency. However, if you have been arrested or invited for interview regarding a matter you reported, we can represent you during any police investigation or interview that follows. We focus on providing legal representation and advice to those who are under investigation, rather than initiating police reports.",
        },
        {
          question: "Can you find out what happened in my case?",
          answer:
            "If we represented you at the police station and you contact us directly, we can discuss your case. We cannot provide updates about past arrests to third parties, or cases where another solicitor represented you. For immediate custody only, immediate family may instruct us — see the section above. General enquiries about what happened days ago are outside our scope.",
        },
      ],
    },
    {
      title: "About Legal Aid",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
          <path d="m9 11 3 3L22 4"></path>
        </svg>
      ),
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      items: [
        {
          question: "Do I qualify for free legal aid at the police station?",
          answer:
            "Yes, everyone qualifies for free legal aid at the police station. Unlike court representation, police station advice is not means-tested. It doesn't matter what your income is, whether you are employed, or what savings you have - legal advice at the police station is free for everyone. This is a fundamental right under PACE 1984.",
        },
        {
          question: "Do I need to provide financial information?",
          answer:
            "No, you do not need to provide any financial information for police station representation. Legal Aid at the police station is not means-tested, so there is no assessment of your income or savings. However, if your case goes to court, Legal Aid for court representation is means-tested and you may need to provide financial information at that stage.",
        },
        {
          question: "What if I have been charged and need court representation?",
          answer:
            "If you have been charged and need court representation, we work in association with Tuckers Solicitors LLP who provide expert court representation. Legal Aid for court proceedings is means-tested, but we can help you apply. If you do not qualify for Legal Aid, we also offer private client services with fixed-fee packages for court representation.",
        },
      ],
    },
  ];

  return <FAQAccordion sections={sections} />;
}

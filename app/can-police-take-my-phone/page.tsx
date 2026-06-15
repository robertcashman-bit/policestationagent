import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalReferences, Ref, type LegalSource } from "@/components/LegalReferences";
import { SITE_DOMAIN } from "@/config/site";

export const metadata: Metadata = {
  title: "Can Police Take My Phone? Your Rights When Police Seize Devices UK",
  description:
    "Comprehensive guide: when police can seize your phone on arrest or during a search, PIN/password rules under RIPA, how long they can keep it, forensic examination, and getting it back (England & Wales). Sources included.",
  alternates: {
    canonical: `https://${SITE_DOMAIN}/can-police-take-my-phone`,
  },
};

export default function CanPoliceTakeMyPhonePage() {
  const sources: LegalSource[] = [
    {
      id: "pace-s32",
      label: "Police and Criminal Evidence Act 1984 (PACE) s.32 (search after arrest of person)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/32",
    },
    {
      id: "pace-s18",
      label: "PACE s.18 (entry and search after arrest of premises occupied or controlled)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/18",
    },
    {
      id: "pace-s19",
      label: "PACE s.19 (general power of seizure during search)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/19",
    },
    {
      id: "pace-s22",
      label: "PACE s.22 (retention of seized property)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/22",
    },
    {
      id: "pace-s21",
      label: "PACE s.21 (access to seized items; photographing or copying)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/21",
    },
    {
      id: "pace-s54",
      label: "PACE s.54 (search of detained persons; seizure at police station)",
      href: "https://www.legislation.gov.uk/ukpga/1984/60/section/54",
    },
    {
      id: "ripa-s49",
      label:
        "Regulation of Investigatory Powers Act 2000 (RIPA) s.49 (notices requiring disclosure of keys/passwords)",
      href: "https://www.legislation.gov.uk/ukpga/2000/23/section/49",
    },
    {
      id: "ripa-s53",
      label: "RIPA s.53 (offence: failure to comply with a section 49 notice)",
      href: "https://www.legislation.gov.uk/ukpga/2000/23/section/53",
    },
    {
      id: "pace-code-c-2023",
      label: "Home Office: PACE Code C (December 2023) – property of detained persons (Section 4)",
      href: "https://assets.publishing.service.gov.uk/media/6580543083ba38000de1b792/PACE+Code+C+2023.pdf",
    },
    {
      id: "ppa-1897-s1",
      label:
        "Police (Property) Act 1897 s.1 (court power to order delivery of property in police possession)",
      href: "https://www.legislation.gov.uk/ukpga/Vict/60-61/30/section/1",
    },
    {
      id: "ripa-sch2",
      label:
        "RIPA 2000 Sch. 2 (who has “appropriate permission” to give a s.49 notice)",
      href: "https://www.legislation.gov.uk/ukpga/2000/23/schedule/2",
    },
    {
      id: "ag-disclosure-guidelines",
      label:
        "Attorney General’s Guidelines on Disclosure (2024) — Annex A: Digital Material",
      href: "https://www.gov.uk/government/publications/attorney-generals-guidelines-on-disclosure",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can police take my phone when I'm arrested?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, in many cases. PACE section 32 allows a constable who has arrested a person to search them and seize anything found which might be evidence relating to an offence. Your phone may also be seized during a premises search under section 18, or under the general seizure power in section 19 during a lawful search.",
        },
      },
      {
        "@type": "Question",
        name: "Do I have to give police my phone PIN or password?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You are not generally obliged to volunteer a PIN or password. However, under RIPA 2000 section 49, a notice can require disclosure of a key to protected information. Schedule 2 sets out who has appropriate permission to give such a notice — for police this typically requires a superintendent or above. Section 53 creates an offence for knowingly failing to comply with a valid section 49 notice.",
        },
      },
      {
        "@type": "Question",
        name: "How long can police keep my phone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PACE section 22 allows retention of seized property so long as is necessary in all the circumstances. Section 22(4) provides that nothing may be retained for investigative or evidential purposes if a photograph or copy would be sufficient. PACE Code C governs return of property on release from custody where it is no longer needed as evidence.",
        },
      },
      {
        "@type": "Question",
        name: "Can police search my phone without a warrant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Seizing a phone and examining its contents are separate steps. Police may seize a phone under PACE search powers without a warrant in certain circumstances. To access encrypted data they may serve a RIPA section 49 notice. The power relied on depends on the situation — always ask what legal authority is being used.",
        },
      },
      {
        "@type": "Question",
        name: "Can I get my phone back if I'm released without charge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If police retain property after release, you can request its return. PACE section 22 limits retention to what is necessary, and Code C requires property to be returned on release unless it is needed as evidence. If there is a dispute, you may apply to a magistrates' court under the Police (Property) Act 1897.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col">
      <JsonLd data={faqSchema} />
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm mb-6 text-blue-200">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span className="mx-2">›</span>
              <Link href="/police-custody-rights" className="hover:text-white">
                Custody Rights
              </Link>
              <span className="mx-2">›</span>
              <span>Phone Seizure</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Can Police Take My Phone? Your Rights Explained
            </h1>
            <p className="text-xl text-blue-100">
              Understanding phone seizure, passwords, and data access
            </p>
          </div>
        </section>

        <article className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-8 rounded-r-lg">
            <p className="text-lg font-medium text-slate-800">
              <strong>Quick Answer:</strong> If you are arrested, police may seize your phone under
              PACE search and seizure powers — for example during a search of your person after
              arrest elsewhere than a police station (s.32)
              <Ref n={1} /> or at the police station under the custody search power (s.54).
              <Ref n={6} /> Phones may also be seized during a premises search after arrest for an
              indictable offence (s.18)
              <Ref n={2} /> or under the general seizure power in section 19 during any lawful
              search.
              <Ref n={3} /> Once seized, police may retain the phone so long as is necessary (s.22),
              but not if a photograph or copy would be sufficient (s.22(4)).
              <Ref n={4} /> You are not generally obliged to give your PIN or password, but a formal
              RIPA section 49 notice can require disclosure — authorisation is governed by Schedule 2
              (typically a superintendent or above for police), and refusal can be an offence under
              section 53.
              <Ref n={7} /> <Ref n={8} /> <Ref n={11} />
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2>When Can Police Take Your Phone?</h2>
            <p>
              Police do not have an unlimited power to take your phone whenever they wish. The power
              depends on the situation and the specific statutory authority being used. In practice,
              phones are most commonly seized in connection with arrest and search powers under
              PACE.
            </p>

            <h3>On Arrest — Search of Your Person</h3>
            <p>
              If you are arrested at a place other than a police station, a constable may search you
              where they have reasonable grounds to believe you may have concealed evidence relating
              to the offence, or items that could assist escape or cause injury. Anything found which
              is evidence may be seized.
              <Ref n={1} /> Your mobile phone falls within this if the officer has reasonable
              grounds to believe it may contain evidence (for example messages, call logs, location
              data or photographs relevant to the investigation).
            </p>

            <h3>At the Police Station</h3>
            <p>
              If you are brought to or arrested at a police station, the custody officer may search
              you and seize property where they have reasonable grounds to believe it may be evidence
              relating to an offence, or that you may use it to cause injury, damage property,
              interfere with evidence or assist escape.
              <Ref n={6} /> A phone needed as evidence may be withheld rather than returned to you
              when you leave custody, in accordance with PACE Code C.
              <Ref n={9} />
            </p>

            <h3>Search of Premises After Arrest</h3>
            <p>
              Where you are under arrest for an indictable offence, a constable may enter and search
              premises you occupy or control if they have reasonable grounds for suspecting there is
              evidence relating to that offence (or a connected indictable offence) on the premises.
              <Ref n={2} /> This generally requires written authorisation by an inspector or above,
              subject to exceptions in section 18. Phones found during such a search may be seized
              under section 19 where the constable has reasonable grounds to believe the item is
              evidence and seizure is necessary to prevent it being concealed, lost, altered or
              destroyed.
              <Ref n={3} />
            </p>

            <h3>Other Search Situations</h3>
            <p>
              Phones may also be seized during searches carried out under a warrant, or in other
              situations where a lawful search power applies and section 19 is engaged.
              <Ref n={3} /> If you are attending a voluntary interview and are not under arrest,
              the position is different — police may not have the same automatic power to seize
              property from you. If officers ask for your phone in a voluntary setting, ask what
              power they rely on and take legal advice before handing it over.
            </p>

            <h3>Property in Police Custody</h3>
            <p>
              When you are detained at a police station, the custody officer is responsible for
              recording your property. PACE Code C sets out how personal property — including
              electronic devices — should be recorded, stored and dealt with while you are in
              custody.
              <Ref n={9} /> Items needed as evidence may be retained rather than returned to you
              when you leave custody.
            </p>

            <h2>Seizing Your Phone vs Examining Its Contents</h2>
            <p>
              It is important to understand that <strong>seizing</strong> your phone and{" "}
              <strong>examining</strong> what is on it are not the same thing. Police may lawfully
              take physical possession of your device under PACE search and seizure powers, but
              accessing the data inside — particularly where the device is locked or encrypted —
              may require additional steps.
            </p>
            <p>
              In many cases, phones are sent to a digital forensic unit for examination. This can
              involve downloading call logs, text messages, WhatsApp conversations, photographs,
              location history, internet browsing data and material from apps. The Attorney
              General&apos;s Guidelines on Disclosure (Annex A — Digital Material) set standards for
              how digital evidence should be handled in criminal cases.
              <Ref n={12} />
            </p>
            <p>
              Police may also seek data held remotely — for example in cloud backups or by service
              providers — using separate legal powers. That data is not necessarily on the physical
              device, but may still be relevant to an investigation.
            </p>

            <h2>Do You Have to Give Your PIN or Password?</h2>
            <h3>General Position</h3>
            <p>
              There is no general common-law duty to help police unlock your phone. If an officer
              simply asks you to enter your PIN, passcode or biometric unlock, you are not
              automatically obliged to comply. However, refusing may mean police cannot access the
              data without other means (such as forensic tools or a formal legal notice).
            </p>
            <p>
              Do not guess or speculate. The correct response depends on the exact power being used
              and your individual circumstances. Always get legal advice before disclosing passwords
              or unlocking a device.
            </p>

            <h3>The RIPA Section 49 Notice</h3>
            <p>
              Under <strong>Section 49 of the Regulation of Investigatory Powers Act 2000 (RIPA)</strong>,
              certain public authorities can give a notice requiring a person to disclose a key or
              password to protected information (such as encrypted data on a phone) in specified
              circumstances.
              <Ref n={7} /> Authorisation is governed by Schedule 2. For material seized by police
              under a statutory power, a Circuit judge&apos;s permission is not always required — a
              constable of superintendent rank or above (or with permission from such an officer)
              may have the appropriate permission to give a section 49 notice.
              <Ref n={11} />
            </p>
            <p>
              Section 53 makes it an offence to knowingly fail to comply with a section 49 notice
              by not disclosing the key or password when required.
              <Ref n={8} /> This is a serious matter. If you receive a formal section 49 notice, you
              should take urgent legal advice before deciding how to respond.
            </p>
            <p>
              A solicitor can check whether the notice is valid, whether the authorisation is in
              place, and whether there are grounds to challenge it.
            </p>

            <h2>How Long Can Police Keep Your Phone?</h2>
            <p>
              PACE section 22 provides that anything seized by a constable in the exercise of a
              power of search or seizure may be retained so long as is necessary in all the
              circumstances.
              <Ref n={4} /> In practice, this means your phone can be kept for the duration of a
              police investigation — which may be weeks or even months — if it is needed for forensic
              examination, as evidence at trial, or in connection with an offence.
            </p>
            <p>
              Section 22(4) provides that where a photograph or copy would be sufficient for
              investigative or evidential purposes, the original should not be retained.
              <Ref n={4} /> PACE section 21 also allows a person who had custody of a seized item to
              request that police photograph or copy it (subject to exceptions where this would
              prejudice an investigation).
              <Ref n={5} /> In some cases, this may allow the physical device to be returned sooner
              while police retain a forensic image of the data. Whether this applies depends on the
              circumstances of the investigation.
            </p>
            <p>
              If you are released under investigation (RUI) or on bail, police may continue to hold
              your phone even after you leave custody, provided retention remains necessary.
            </p>

            <h2>Getting Your Phone Back</h2>
            <p>
              PACE section 22 limits retention to what is necessary in all the circumstances.
              <Ref n={4} /> PACE Code C requires that property withheld from a detainee (for example
              because it is needed as evidence) should be returned on release from custody unless
              there is good reason to retain it.
              <Ref n={9} /> If you have been released without charge, you should ask for your phone
              back. If police refuse, request the reason in writing and keep a record of when the
              phone was seized and who seized it.
            </p>
            <p>
              If there is a dispute about the return of property held by police, you may apply to a
              court of summary jurisdiction (magistrates&apos; court) for an order under the Police
              (Property) Act 1897.
              <Ref n={10} /> A solicitor can write to the investigating officer or custody officer
              on your behalf and, if necessary, make a court application.
            </p>

            <h2>What Data Can Police Access on Your Phone?</h2>
            <p>
              If police lawfully examine your phone — whether by you unlocking it, through forensic
              tools, or following a RIPA notice — they may access a wide range of material,
              including:
            </p>
            <ul>
              <li>Call logs and contact lists</li>
              <li>SMS, WhatsApp, Signal and other messaging apps</li>
              <li>Social media activity (Facebook, Instagram, X/Twitter, Snapchat, etc.)</li>
              <li>Photographs and videos stored on the device</li>
              <li>GPS location history and map data</li>
              <li>Internet browsing history and search queries</li>
              <li>Emails and calendar entries</li>
              <li>Banking and payment app data</li>
            </ul>
            <p>
              This data may be compared with your account in a police interview. If you are
              questioned about phone evidence, having a solicitor present is essential. See our
              guide on{" "}
              <Link href="/police-interview-rights" className="text-blue-700 hover:underline">
                police interview rights
              </Link>{" "}
              for more information.
            </p>

            <h2>Practical Advice If Police Take Your Phone</h2>
            <ul>
              <li>
                <strong>Ask what power is being used:</strong> different powers have different
                rules. Note the officer&apos;s name, collar number and the stated legal authority.
              </li>
              <li>
                <strong>Get legal advice immediately:</strong> request a solicitor at the police
                station under PACE section 58. Advice is free and not means-tested.
              </li>
              <li>
                <strong>Do not unlock voluntarily:</strong> unless your solicitor advises you to,
                do not enter your PIN or password without understanding the legal consequences.
              </li>
              <li>
                <strong>Check for a RIPA notice:</strong> ask whether a formal section 49 notice
                has been served.
                <Ref n={7} />
              </li>
              <li>
                <strong>Document everything:</strong> note the date, time, location, device make
                and model, and any property receipt given by the custody officer.
              </li>
              <li>
                <strong>Request return in writing:</strong> once the investigation concludes or if
                you believe retention is no longer necessary, write to the officer in the case
                asking for your phone back.
                <Ref n={4} /> <Ref n={9} />
              </li>
              <li>
                <strong>Remote wipe and cloud backups:</strong> do not attempt to remotely wipe
                your device while it is in police possession — this may interfere with an
                investigation and could have legal consequences. Take advice before changing
                passwords or deleting cloud accounts.
              </li>
            </ul>
          </div>

          <LegalReferences sources={sources} />

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>
                  Police can seize your phone on arrest under PACE search powers (s.32, s.54, s.18, s.19)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>
                  Seizing a phone and examining its data are separate — forensic examination may
                  take weeks or months
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>
                  You are not generally obliged to give your PIN or password without a formal RIPA
                  section 49 notice
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>
                  A valid RIPA section 49 notice can make refusal a criminal offence (s.53)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>
                  Property should be returned when no longer needed (PACE s.22; Code C para 4.2)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-2">✓</span>
                <span>
                  Get free legal advice before unlocking your device or responding to a RIPA notice
                </span>
              </li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can police take my phone when I&apos;m arrested?
                </h3>
                <p className="text-slate-700">
                  Yes, in many cases. If arrested elsewhere than a police station, a constable may
                  search you and seize evidence found on you.
                  <Ref n={1} /> At the police station, the custody officer may seize property
                  including a phone where there are reasonable grounds to believe it is evidence.
                  <Ref n={6} /> Your phone may also be taken during a search of premises under
                  section 18 (for indictable offences)
                  <Ref n={2} /> or under the general seizure power in section 19 during any lawful
                  search.
                  <Ref n={3} />
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Do I have to give police my phone PIN or password?
                </h3>
                <p className="text-slate-700">
                  Not automatically. There is no general duty to help police unlock your device.
                  However, if police serve a formal{" "}
                  <strong>RIPA section 49 notice</strong> — which requires appropriate permission
                  under Schedule 2 (for police, typically a superintendent or above) — you may be
                  legally required to disclose your PIN or password.
                  <Ref n={7} /> <Ref n={11} /> Knowingly failing to comply is an offence under section 53.
                  <Ref n={8} /> Always take legal advice before responding.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  How long can police keep my phone?
                </h3>
                <p className="text-slate-700">
                  PACE section 22 allows retention so long as is necessary in all the circumstances
                  — this can include forensic examination and use as evidence at trial.
                  <Ref n={4} /> In practice, phones are often kept for weeks or months during an
                  investigation. Section 22(4) provides that the original should not be retained if
                  a photograph or copy would be sufficient.
                  <Ref n={4} /> You may also request a copy under section 21.
                  <Ref n={5} />
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can police search my phone without a warrant?
                </h3>
                <p className="text-slate-700">
                  Police may seize your phone without a warrant in certain circumstances — for
                  example, during a search following arrest.
                  <Ref n={1} /> <Ref n={6} /> <Ref n={3} /> Examining the contents is a separate step. If the
                  device is locked, police may use forensic tools or serve a RIPA section 49 notice
                  to require disclosure of the password.
                  <Ref n={7} /> Always ask what legal power is being relied on.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can I get my phone back if I&apos;m released without charge?
                </h3>
                <p className="text-slate-700">
                  PACE section 22 limits retention to what is necessary, and Code C requires
                  property to be returned on release unless it is needed as evidence.
                  <Ref n={4} /> <Ref n={9} /> If you are released without charge but police keep your phone, ask
                  for it back in writing. If they refuse without good reason, a solicitor can apply
                  to the magistrates&apos; court under the Police (Property) Act 1897.
                  <Ref n={10} />
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-bold text-lg text-blue-900 mb-2">
                  Can police take my phone at a voluntary interview?
                </h3>
                <p className="text-slate-700">
                  At a voluntary interview you are not under arrest, so the PACE arrest search
                  powers do not automatically apply. If police ask for your phone, ask what power
                  they rely on and take legal advice before handing it over. Free legal
                  representation is available for voluntary interviews — see our{" "}
                  <Link href="/voluntary-police-interview" className="text-blue-700 hover:underline">
                    voluntary interview guide
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-xl p-8 my-12">
            <h3 className="text-2xl font-bold mb-4">Phone Seized by Police?</h3>
            <p className="text-slate-300 mb-6">
              If police have taken your phone and you need advice on your rights or help getting it
              back, I can assist. Free consultations available.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:01732247427"
                className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold rounded-lg"
              >
                Call 01732 247427
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg"
              >
                Contact Online
              </Link>
            </div>
          </div>

          <div className="border-t pt-8 mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Related Topics</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link
                href="/police-custody-rights"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Your Custody Rights →</span>
              </Link>
              <Link
                href="/arrested-what-to-do"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Arrested: What To Do →</span>
              </Link>
              <Link
                href="/police-interview-rights"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Interview Rights →</span>
              </Link>
              <Link
                href="/released-under-investigation"
                className="p-4 bg-white rounded-lg border hover:border-blue-300"
              >
                <span className="font-medium text-blue-600">Released Under Investigation →</span>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}

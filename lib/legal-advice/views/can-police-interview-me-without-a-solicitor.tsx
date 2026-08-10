import Link from 'next/link';
import NeedAdviceNowBlock from '@/components/legal-advice/NeedAdviceNowBlock';
import LegalAdviceArticleDisclaimer from '@/components/legal-advice/LegalAdviceArticleDisclaimer';
import { SOLICITOR_DELAY_INTERVIEW_WORDING } from '@/lib/legalCopy';
import { legalAdvicePath, getRelatedLegalAdviceArticles } from '@/lib/legal-advice/content';

export function ArticleBody() {
  const related = getRelatedLegalAdviceArticles('can-police-interview-me-without-a-solicitor');

  return (
      <div className="prose prose-lg max-w-none space-y-8">
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Right to Legal Advice Under PACE</h2>
          <p className="text-gray-700 leading-relaxed">
            The Police and Criminal Evidence Act 1984 (PACE) establishes your fundamental right to 
            free, independent legal advice when you are detained at a police station or attending a 
            voluntary interview. This right is set out in PACE Code C, paragraph 6.1, which states 
            that all detainees must be informed of their right to consult with a solicitor.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Once you have requested legal advice, the police are generally required to delay the 
            interview until you have had a reasonable opportunity to consult with a solicitor. This 
            consultation can take place in person, over the telephone, or via video link.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">When the Police Must Wait for a Solicitor</h2>
          <p className="text-gray-700 leading-relaxed">
            In most circumstances, the police must wait for your solicitor to arrive before conducting 
            an interview. The specific requirements include:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You have requested legal advice (either the duty solicitor or your own solicitor)</li>
            <li>A reasonable time has not yet passed for the solicitor to attend</li>
            <li>No exceptional circumstances exist that would justify proceeding without delay</li>
            <li>You are not being interviewed as a witness only (different rules apply)</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mt-4">
            The police must inform you of your right to legal advice at various stages, including 
            when you arrive at the police station, before any interview begins, and if your 
            circumstances change during detention.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            If you have declined or waived your right to legal advice, the police may interview you
            without a solicitor present, subject to PACE and Code C safeguards. If legal advice has
            been requested, the normal position is to wait until you have had a reasonable opportunity
            to consult a solicitor.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Exceptional Circumstances: When Interviews May Proceed</h2>
          <p className="text-gray-700 leading-relaxed">
            Under PACE Code C, Annex B, there are limited exceptional circumstances where the police 
            may proceed with an interview without waiting for a solicitor. These exceptions are 
            strictly limited and include:
          </p>

          <h3 className="text-xl font-semibold mt-6">1. Risk of Harm to Others</h3>
          <p className="text-gray-700 leading-relaxed">
            If delay would lead to interference with evidence, harm to others, or alerting other 
            suspects, the police may proceed. However, this must be authorised by an officer of at 
            least the rank of inspector, and the interview must be conducted in the presence of an 
            appropriate adult if the detainee is vulnerable.
          </p>

          <h3 className="text-xl font-semibold mt-6">2. Immediate Interview for Serious Offences</h3>
          <p className="text-gray-700 leading-relaxed">
            For certain serious offences, if an interview is immediately necessary to obtain evidence, 
            the police may proceed. However, this exception is rarely used and requires high-level 
            authorisation.
          </p>

          <h3 className="text-xl font-semibold mt-6">3. Solicitor delay</h3>
          <p className="text-gray-700 leading-relaxed">{SOLICITOR_DELAY_INTERVIEW_WORDING}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Voluntary Interviews and Legal Advice</h2>
          <p className="text-gray-700 leading-relaxed">
            Even if you attend a police station voluntarily (not under arrest), you still have the 
            right to free legal advice. The police should inform you of this right before the 
            interview begins. You can request legal advice at any point, including before you arrive 
            at the station.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you request legal advice during a voluntary interview, the police should pause the 
            interview to allow you to consult with a solicitor. This consultation can happen in 
            private, and you can choose whether to continue with the interview afterward.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How to Request Legal Advice</h2>
          <p className="text-gray-700 leading-relaxed">
            You can request legal advice in several ways:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Verbally to the custody officer or investigating officer</li>
            <li>By asking the custody officer to arrange the duty solicitor</li>
            <li>By asking the custody officer to contact your own solicitor</li>
            <li>By using the telephone available in custody suites</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            The police must not discourage you from seeking legal advice, and any attempts to do so 
            may render any subsequent interview inadmissible as evidence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Common Misunderstandings</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"The police can interview me without a solicitor if I'm just helping with enquiries"</h3>
              <p className="text-gray-700 leading-relaxed">
                This is not correct. Even if you attend voluntarily, you have the right to legal 
                advice. If you are interviewed under caution, you are suspected of an offence, and 
                your right to legal advice applies regardless of whether you are under arrest.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"I can't get a solicitor if I'm only being questioned as a witness"</h3>
              <p className="text-gray-700 leading-relaxed">
                While different rules apply to witnesses, if you are being interviewed under caution, 
                you are a suspect, not just a witness. You have the full right to legal advice. If 
                you are unsure, ask the police whether you are being interviewed under caution.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"The police can force me to be interviewed without a solicitor"</h3>
              <p className="text-gray-700 leading-relaxed">
                No. If you have requested legal advice, the police must wait a reasonable time unless 
                exceptional circumstances apply. You cannot be forced to waive your right to legal 
                advice, and any pressure to do so is improper.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 border-t pt-8">
          <h2 className="text-2xl font-semibold">Related Questions</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={legalAdvicePath(item)} className="text-blue-600 hover:text-blue-800 underline">
                  {item.h1}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <NeedAdviceNowBlock />

        <section className="border-t pt-8 space-y-4">
          <h2 className="text-xl font-semibold">Legal Sources and References</h2>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
            <li>Police and Criminal Evidence Act 1984 (PACE)</li>
            <li>PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers (paragraph 6.1, Annex B)</li>
          </ul>
        </section>

        <LegalAdviceArticleDisclaimer />
      </div>
  );
}

import Link from 'next/link';
import NeedAdviceNowBlock from '@/components/legal-advice/NeedAdviceNowBlock';
import LegalAdviceArticleDisclaimer from '@/components/legal-advice/LegalAdviceArticleDisclaimer';
import {
  DUTY_SOLICITOR_AVAILABILITY_WORDING,
  OWN_SOLICITOR_FREE_WORDING,
} from '@/lib/legalCopy';
import { legalAdvicePath, getRelatedLegalAdviceArticles } from '@/lib/legal-advice/content';

export function ArticleBody() {
  const related = getRelatedLegalAdviceArticles('is-legal-advice-free-at-a-police-station');

  return (
      <div className="prose prose-lg max-w-none space-y-8">
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Right to Free Legal Advice</h2>
          <p className="text-gray-700 leading-relaxed">
            Under the Police and Criminal Evidence Act 1984 (PACE), everyone has the right to free, 
            independent legal advice when they are detained at a police station or attending a voluntary 
            interview. This right is absolute and does not depend on your income, assets, or whether 
            you can afford to pay for legal representation.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The police must inform you of this right when you arrive at the police station, before any 
            interview begins, and at various other stages during your detention. This right applies 
            whether you are under arrest or attending voluntarily.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How Legal Advice is Funded</h2>
          <p className="text-gray-700 leading-relaxed">
            Free legal advice at police stations is funded through the legal aid system, which is 
            administered by the Legal Aid Agency. The costs are covered by the government, meaning 
            you do not pay anything for:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Initial consultation with a solicitor</li>
            <li>The solicitor's attendance at the police station</li>
            <li>Advice before, during, and after your interview</li>
            <li>Legal representation during the interview</li>
            <li>Telephone advice if the solicitor cannot attend in person</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mt-4">
            This applies regardless of your financial situation. Unlike other forms of legal aid, 
            there is no means test for police station advice. Whether you are employed or unemployed, 
            have savings or none, the advice is free.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">The Duty Solicitor Scheme</h2>
          <p className="text-gray-700 leading-relaxed">
            The duty solicitor scheme provides 24-hour access to free legal advice at police stations 
            across England and Wales. This service operates through a rota system, with solicitors 
            available on call at all times.
          </p>

          <h3 className="text-xl font-semibold mt-6">How to Access the Duty Solicitor</h3>
          <p className="text-gray-700 leading-relaxed">
            You can request the duty solicitor in several ways:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Tell the custody officer that you want legal advice</li>
            <li>Ask to speak to the duty solicitor</li>
            <li>Request legal advice at any time, even if you initially declined it</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mt-4">
            The duty solicitor will usually attend the police station in person, though in some 
            circumstances they may provide advice over the telephone or via video link. The duty 
            solicitor is independent of the police and works solely in your interests.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Using Your Own Solicitor</h2>
          <p className="text-gray-700 leading-relaxed">{OWN_SOLICITOR_FREE_WORDING}</p>
          <p className="text-gray-700 leading-relaxed">{DUTY_SOLICITOR_AVAILABILITY_WORDING}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What the Solicitor Can Do</h2>
          <p className="text-gray-700 leading-relaxed">
            A solicitor attending the police station can provide a range of services, all free of charge:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>Explain your legal rights and the police procedures</li>
            <li>Advise you on whether to answer questions or exercise your right to silence</li>
            <li>Attend your interview with you and intervene if necessary</li>
            <li>Ensure the police follow proper procedures</li>
            <li>Provide advice on bail conditions if you are charged</li>
            <li>Advise you on what happens next in the investigation</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            The solicitor's role is to protect your rights and ensure you receive fair treatment. 
            They work independently of the police and are bound by professional obligations to act 
            in your best interests.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Common Misunderstandings</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"I have to pay for a solicitor if I use my own"</h3>
              <p className="text-gray-700 leading-relaxed">
                Police station legal advice is normally free where the solicitor provides advice under
                the police station legal aid scheme, whether you use the duty solicitor or your own
                solicitor. Ask the solicitor or custody staff to confirm the position if there is any
                uncertainty.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"Free legal advice is only for people who can't afford it"</h3>
              <p className="text-gray-700 leading-relaxed">
                This is incorrect. Free legal advice at police stations is available to everyone, 
                regardless of income or wealth. There is no means test for police station advice. 
                This is different from other types of legal aid, which may require a financial assessment.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"The duty solicitor works for the police"</h3>
              <p className="text-gray-700 leading-relaxed">
                This is completely false. The duty solicitor is completely independent of the police. 
                They are qualified solicitors who work in your interests only. They are funded through 
                legal aid, not by the police, and have professional obligations to act solely for you.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"I can't get free advice if I'm attending voluntarily"</h3>
              <p className="text-gray-700 leading-relaxed">
                This is incorrect. Even if you attend a police station voluntarily (not under arrest), 
                you still have the right to free legal advice. The right applies whether you are 
                detained or attending voluntarily for an interview under caution.
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
            <li>PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers (paragraph 6.1)</li>
            <li>Legal Aid, Sentencing and Punishment of Offenders Act 2012</li>
          </ul>
        </section>

        <LegalAdviceArticleDisclaimer />
      </div>
  );
}

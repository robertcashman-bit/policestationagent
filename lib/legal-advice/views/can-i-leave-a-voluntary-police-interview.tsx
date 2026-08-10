import Link from 'next/link';
import NeedAdviceNowBlock from '@/components/legal-advice/NeedAdviceNowBlock';
import LegalAdviceArticleDisclaimer from '@/components/legal-advice/LegalAdviceArticleDisclaimer';
import { VOLUNTARY_INTERVIEW_ARREST_WORDING } from '@/lib/legalCopy';
import { legalAdvicePath, getRelatedLegalAdviceArticles } from '@/lib/legal-advice/content';

export function ArticleBody() {
  const related = getRelatedLegalAdviceArticles('can-i-leave-a-voluntary-police-interview');

  return (
      <div className="prose prose-lg max-w-none space-y-8">
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Understanding Voluntary Interviews</h2>
          <p className="text-gray-700 leading-relaxed">
            A voluntary interview (also known as a "voluntary attendance" or "interview under caution") 
            is when you attend a police station to be interviewed without being under arrest. You are 
            free to leave at any time, but the interview is still conducted under caution, meaning 
            anything you say can be used as evidence in court.
          </p>
          <p className="text-gray-700 leading-relaxed">
            The key difference between a voluntary interview and an interview following arrest is that 
            you are not legally detained. You have chosen to attend, and you retain the freedom to leave, 
            though the police may choose to arrest you if you attempt to leave and they have grounds to do so.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Right to Leave</h2>
          <p className="text-gray-700 leading-relaxed">
            Because you are not under arrest during a voluntary interview, you have the right to leave 
            at any point. This means:
          </p>
          
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You are not being detained against your will</li>
            <li>You can end the interview and walk out of the police station</li>
            <li>The police cannot physically prevent you from leaving (unless they arrest you)</li>
            <li>You should inform the police that you are leaving rather than simply walking out</li>
          </ul>

          <p className="text-gray-700 leading-relaxed mt-4">
            However, it is important to understand that leaving a voluntary interview does not mean the 
            investigation ends. The police may continue their investigation and may arrest you later if 
            they obtain sufficient evidence.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What Happens If You Leave</h2>
          <p className="text-gray-700 leading-relaxed">
            If you decide to leave a voluntary interview, several things may happen:
          </p>

          <h3 className="text-xl font-semibold mt-6">1. The Interview Ends</h3>
          <p className="text-gray-700 leading-relaxed">
            The immediate interview will stop, and you are free to leave the police station. The police 
            cannot continue questioning you once you have left.
          </p>

          <h3 className="text-xl font-semibold mt-6">2. You May Be Arrested</h3>
          <p className="text-gray-700 leading-relaxed">
            If the police have reasonable grounds to suspect you of an offence, they may arrest you as 
            you leave or shortly afterward. Once arrested, you would be detained and could be interviewed 
            again, but this time as a detained person rather than a voluntary attendee.
          </p>

          <h3 className="text-xl font-semibold mt-6">3. The Investigation Continues</h3>
          <p className="text-gray-700 leading-relaxed">
            Leaving a voluntary interview does not end the police investigation. The police may continue 
            to gather evidence, speak to witnesses, and may contact you again in the future.{' '}
            {VOLUNTARY_INTERVIEW_ARREST_WORDING}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Before Attending a Voluntary Interview</h2>
          <p className="text-gray-700 leading-relaxed">
            It is highly advisable to take certain steps before attending a voluntary interview:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li><strong>Seek legal advice:</strong> Contact a solicitor before attending, even if the interview is voluntary</li>
            <li><strong>Understand your rights:</strong> You have the right to free legal advice at the police station</li>
            <li><strong>Arrange for a solicitor:</strong> You can arrange for a solicitor to attend with you, or use the duty solicitor</li>
            <li><strong>Consider the implications:</strong> Anything you say can be used as evidence, even in a voluntary interview</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Many people mistakenly believe that because an interview is "voluntary," it is less serious 
            or they don't need legal representation. This is not correct. Voluntary interviews are 
            conducted under the same caution as interviews following arrest, and the consequences can 
            be equally serious.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">When Should You Leave?</h2>
          <p className="text-gray-700 leading-relaxed">
            There are several situations where you might consider leaving a voluntary interview:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
            <li>You feel unwell or need medical attention</li>
            <li>You need to consult with your solicitor privately</li>
            <li>You do not feel able to continue</li>
            <li>You wish to take legal advice before answering further questions</li>
            <li>The police are not following proper procedures</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            If you do decide to leave, it is best to inform the police clearly that you are ending the 
            interview and leaving. Simply walking out without explanation may be viewed unfavourably and 
            could influence the police's decision about whether to arrest you.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Common Misunderstandings</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"Voluntary interviews aren't serious"</h3>
              <p className="text-gray-700 leading-relaxed">
                This is incorrect. Voluntary interviews are conducted under the same caution as interviews 
                following arrest, and anything you say can be used as evidence. They are often used in 
                serious investigations and can lead to prosecution.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"I don't need a solicitor for a voluntary interview"</h3>
              <p className="text-gray-700 leading-relaxed">
                This is a common and dangerous misconception. You have the right to free legal advice, 
                and having a solicitor present can help protect your rights and ensure proper procedures 
                are followed. Legal advice is just as important for voluntary interviews as for interviews 
                following arrest.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">"If I leave, the police can't do anything"</h3>
              <p className="text-gray-700 leading-relaxed">
                Leaving a voluntary interview does not end the investigation. The police may continue 
                their enquiries, gather evidence, and may arrest you later if they obtain sufficient 
                grounds. Leaving does not make the investigation go away.
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
            <li>PACE Code C: Code of Practice for the Detention, Treatment and Questioning of Persons by Police Officers</li>
          </ul>
        </section>

        <LegalAdviceArticleDisclaimer />
      </div>
  );
}

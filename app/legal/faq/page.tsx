import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata({
  title: 'FAQ',
  description:
    'Frequently asked questions about PSR Train, PSRAS preparation, and the platform.',
  path: '/legal/faq',
});

type FAQItem = {
  question: string;
  answer: string;
  linkUrl?: string;
  linkLabel?: string;
};

export default function FAQPage() {
  const faqs: FAQItem[] = [
    {
      question: 'Does completing this training qualify me as a police station representative?',
      answer: 'No. This training is designed to prepare candidates for the Police Station Representative Accreditation Scheme (PSRAS). Completion of this training does not itself confer accreditation or authorisation to provide police station advice. Formal accreditation depends on the proper external process and applicable supervision and assessment requirements.',
    },
    {
      question: 'What is the PSR Training Platform?',
      answer: 'The PSR Training Platform is an online resource designed to help aspiring police station representatives prepare for their accreditation examinations. We provide practice questions, learning modules, scenario simulations, and other educational resources.',
    },
    {
      question: 'Who is this platform for?',
      answer: 'This platform is designed for individuals who are preparing to become accredited police station representatives in the UK. It is suitable for both beginners and those looking to refresh their knowledge.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply create an account and start exploring our learning modules, practice questions, and other resources. We recommend starting with the learning modules to build your foundational knowledge, then moving on to practice questions and scenarios.',
    },
    {
      question: 'How do I get access to the platform?',
      answer: 'Create an account to get full access to practice questions, modules, mock exams, and the legal advice hub. See our contact or sign-up flow for details.',
    },
    {
      question: 'Are the questions updated regularly?',
      answer: 'Yes, we regularly update our question bank to ensure accuracy and relevance. Our content is reviewed to reflect current laws, regulations, and best practices.',
    },
    {
      question: 'Can I track my progress?',
      answer: 'Yes. The platform includes progress tracking. You can view your performance statistics, track your improvement over time, and identify areas where you need more practice.',
    },
    {
      question: 'Do you offer certificates?',
      answer: 'We offer course-completion or participation certificates for certain modules or milestones. These are evidence of training completed on our platform only; they do not constitute professional accreditation or authorisation to provide police station advice. Check the certificates page in your dashboard for more information.',
    },
    {
      question: 'Where can I find more PSR resources and community?',
      answer: 'We recommend PoliceStationRepUK.com — a dedicated hub for police station representatives in the UK, with community, news, and profession-specific resources.',
      linkUrl: 'https://policestationrepuk.com',
      linkLabel: 'Visit PoliceStationRepUK.com',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.question}>
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
              {faq.linkUrl ? (
                <a
                  href={faq.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-primary font-semibold hover:underline"
                >
                  {faq.linkLabel ?? faq.linkUrl}
                </a>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Still have questions?</CardTitle>
          <CardDescription>
            If you can't find the answer you're looking for, please{' '}
            <a href="/legal/contact" className="text-primary hover:underline">
              contact us
            </a>
            .
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}

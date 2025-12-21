/**
 * MANDATORY ADVERT BLOCK COMPONENT
 * 
 * This component MUST be included in every blog post.
 * It cannot be removed or disabled from individual posts.
 * 
 * SEO-optimized, indexable, and crawlable.
 * Styled consistently with site branding.
 */

export default function BlogAdvertBlock() {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg">
      <h3 className="text-xl font-bold text-slate-900 mb-4">
        PoliceStationRep.com - Expert Police Station Representation
      </h3>
      
      <p className="text-slate-700 mb-4">
        <strong>I am a qualified Police Station Duty Solicitor, not an agency or unregulated representative.</strong>{' '}
        With Higher Rights of Audience (Criminal) and over 35 years of experience, I provide expert representation 
        across all Kent custody suites.
      </p>
      
      <p className="text-slate-700 mb-4">
        As an Accredited Duty Solicitor, I ensure your rights are protected under PACE 1984. My service covers 
        Medway, Maidstone, Canterbury, Gravesend, and all Kent police stations.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <a 
          href="mailto:robertcashman@defencelegalservices.co.uk" 
          className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition-colors"
        >
          Email for Police Station Representation
        </a>
        <a 
          href="sms:07535494446?body=I need a duty solicitor" 
          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold transition-colors"
        >
          Send SMS to Request a Duty Solicitor
        </a>
      </div>
      
      <p className="text-sm text-slate-600 mt-4">
        <strong>Call 01732 247427</strong> - Available from 9am to late, including evenings, weekends, and bank holidays.
      </p>
    </div>
  );
}


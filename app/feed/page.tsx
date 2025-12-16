import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE_URL } from '@/config/site';
import { categoryOrder } from '@/data/blogIndex';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "RSS Feeds | Police Station Agent Blog",
  description: "Subscribe to RSS feeds for Police Station Agent blog posts. Get updates on criminal defence advice, legal rights, and police station representation.",
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * RSS Feed Index Page
 * Lists all available RSS feeds
 */
export default function FeedIndexPage() {
  const categorySlugs: { [key: string]: string } = {
    'Police Interview & Procedure': 'police-interview-procedure',
    'Police Bail & Custody': 'police-bail-custody',
    'Your Legal Rights': 'your-legal-rights',
    'Criminal Defence Guidance': 'criminal-defence-guidance',
    'Duty Solicitor & Representation': 'duty-solicitor-representation',
    'Police Station Advice': 'police-station-advice',
    'Updates & Commentary': 'updates-commentary',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-800 flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent shadow hover:bg-primary/80 bg-blue-100 text-blue-800 mb-4 text-sm font-bold">
                RSS Feeds
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Subscribe to Our Blog
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Stay updated with the latest criminal defence advice, legal rights information, and police station representation guidance.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss w-6 h-6 text-white">
                      <path d="M4 11a9 9 0 0 1 9 9"></path>
                      <path d="M4 4a16 16 0 0 1 16 16"></path>
                      <circle cx="5" cy="19" r="1"></circle>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Main Blog Feed</h2>
                    <p className="text-slate-600 mb-4">All published blog posts (last 20 posts)</p>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={`${SITE_URL}/feed.xml`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss">
                          <path d="M4 11a9 9 0 0 1 9 9"></path>
                          <path d="M4 4a16 16 0 0 1 16 16"></path>
                          <circle cx="5" cy="19" r="1"></circle>
                        </svg>
                        Subscribe to Main Feed
                      </a>
                      <code className="px-3 py-2 bg-slate-100 rounded text-sm text-slate-800 font-mono">
                        {SITE_URL}/feed.xml
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clock w-6 h-6 text-white">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Recent Posts Feed</h2>
                    <p className="text-slate-600 mb-4">Most recent blog posts (last 10 posts)</p>
                    <div className="flex flex-wrap gap-3">
                      <a 
                        href={`${SITE_URL}/feed/recent`}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rss">
                          <path d="M4 11a9 9 0 0 1 9 9"></path>
                          <path d="M4 4a16 16 0 0 1 16 16"></path>
                          <circle cx="5" cy="19" r="1"></circle>
                        </svg>
                        Subscribe to Recent Posts
                      </a>
                      <code className="px-3 py-2 bg-slate-100 rounded text-sm text-slate-800 font-mono">
                        {SITE_URL}/feed/recent
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Category Feeds</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {categoryOrder.map((category) => {
                  const slug = categorySlugs[category] || category.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <div key={category} className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-bold text-slate-900 mb-2">{category}</h3>
                      <div className="flex flex-wrap gap-2 items-center">
                        <a 
                          href={`${SITE_URL}/feed/${slug}`}
                          className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                        >
                          Subscribe →
                        </a>
                        <code className="text-xs text-slate-600 font-mono bg-white px-2 py-1 rounded">
                          /feed/{slug}
                        </code>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">How to Use RSS Feeds</h3>
              <ul className="space-y-2 text-slate-700">
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 flex-shrink-0 mt-0.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Copy the feed URL and paste it into your RSS reader (Feedly, NewsBlur, etc.)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 flex-shrink-0 mt-0.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Subscribe to specific categories to get only the topics you're interested in</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle text-green-600 flex-shrink-0 mt-0.5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>Feeds update automatically - you'll be notified when new posts are published</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}




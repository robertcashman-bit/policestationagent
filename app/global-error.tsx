'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6">
        <main id="main-content" className="max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-4">Application error</h1>
          <p className="text-slate-600 mb-6">
            A critical error occurred. Please refresh the page or return later.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}

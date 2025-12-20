'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Blog Generator Client
 * 
 * DESIGN PRINCIPLES:
 * - Simple, reliable, boring
 * - Static images only (from /public/blog-images/)
 * - No DALL-E, no external URLs
 * - Clear success or failure (no warnings)
 */

// =============================================================================
// TYPES
// =============================================================================

interface FormData {
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  location: string;
  category: string;
  seoLength: 'short' | 'optimal' | 'long';
  includeFAQ: boolean;
  includeInternalLinks: boolean;
  imageFilename: string;
}

interface GeneratedContent {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const CATEGORIES = [
  { value: 'Police Station Advice', label: 'Police Station Advice' },
  { value: 'Duty Solicitor', label: 'Duty Solicitor Explanation' },
  { value: 'Arrest & Custody', label: 'Arrest & Custody Guidance' },
  { value: 'Bail Advice', label: 'Bail / Pre-charge Advice' },
  { value: 'PACE Rights', label: 'Rights at the Police Station' },
];

const AVAILABLE_IMAGES = [
  { value: '', label: 'Use default image (blog-listing-0.jpg)' },
  { value: 'blog-listing-0.jpg', label: 'Blog Image 1' },
  { value: 'blog-listing-1.png', label: 'Blog Image 2' },
  { value: 'blog-listing-2.png', label: 'Blog Image 3' },
  { value: 'blog-listing-3.png', label: 'Blog Image 4' },
  { value: 'blog-listing-4.png', label: 'Blog Image 5' },
  { value: 'blog-listing-5.png', label: 'Blog Image 6' },
  { value: 'blog-listing-6.png', label: 'Blog Image 7' },
  { value: 'blog-listing-7.png', label: 'Blog Image 8' },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function BlogGeneratorClient() {
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<FormData>({
    topic: '',
    primaryKeyword: '',
    secondaryKeywords: '',
    location: 'Kent',
    category: 'Police Station Advice',
    seoLength: 'optimal',
    includeFAQ: true,
    includeInternalLinks: true,
    imageFilename: '',
  });

  // UI state
  const [preview, setPreview] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ url: string; filePath: string } | null>(null);

  // =============================================================================
  // HANDLERS
  // =============================================================================

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // Ignore logout errors
    }
    router.push('/');
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGenerate = async () => {
    if (!formData.topic || !formData.primaryKeyword) {
      setError('Topic and primary keyword are required');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: formData.topic,
          primaryKeyword: formData.primaryKeyword,
          secondaryKeywords: formData.secondaryKeywords,
          location: formData.location,
          category: formData.category,
          seoLength: formData.seoLength,
          includeFAQ: formData.includeFAQ,
          includeInternalLinks: formData.includeInternalLinks,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate blog post');
      }

      const data = await response.json();
      setPreview(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate blog post');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!preview) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: preview.title,
          category: formData.category,
          primaryKeyword: formData.primaryKeyword,
          secondaryKeywords: formData.secondaryKeywords
            .split(',')
            .map(k => k.trim())
            .filter(Boolean),
          location: formData.location,
          metaTitle: preview.metaTitle,
          metaDescription: preview.metaDescription,
          contentHtml: preview.content,
          faq: preview.faqs.map(f => ({ q: f.question, a: f.answer })),
          imageFilename: formData.imageFilename || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to publish post');
      }

      setSuccess({
        url: data.post.url,
        filePath: data.filePath,
      });
      setPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      topic: '',
      primaryKeyword: '',
      secondaryKeywords: '',
      location: 'Kent',
      category: 'Police Station Advice',
      seoLength: 'optimal',
      includeFAQ: true,
      includeInternalLinks: true,
      imageFilename: '',
    });
    setPreview(null);
    setError(null);
    setSuccess(null);
  };

  // =============================================================================
  // RENDER
  // =============================================================================

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Generator</h1>
            <p className="mt-1 text-sm text-gray-600">
              Create SEO-optimized blog posts for PoliceStationAgent.com
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Sign Out
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <span className="text-red-600 mr-2">✕</span>
              <div>
                <p className="font-medium text-red-800">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex">
              <span className="text-green-600 mr-2">✓</span>
              <div>
                <p className="font-medium text-green-800">Published Successfully!</p>
                <p className="text-green-700">
                  Post saved to: <code className="bg-green-100 px-1 rounded">{success.filePath}</code>
                </p>
                <a
                  href={success.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-800 underline font-medium"
                >
                  View post →
                </a>
                <button
                  onClick={handleReset}
                  className="ml-4 text-green-700 underline"
                >
                  Create another post
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Blog Settings</h2>

            <div className="space-y-4">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blog Topic / Headline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  placeholder="e.g., Your Rights When Arrested in Kent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Primary Keyword */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Primary SEO Keyword <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="primaryKeyword"
                  value={formData.primaryKeyword}
                  onChange={handleInputChange}
                  placeholder="e.g., duty solicitor Kent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Secondary Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  name="secondaryKeywords"
                  value={formData.secondaryKeywords}
                  onChange={handleInputChange}
                  placeholder="e.g., police station solicitor, PACE rights, free legal advice"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Kent"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Content Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content Length
                </label>
                <select
                  name="seoLength"
                  value={formData.seoLength}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="short">Short (~800 words)</option>
                  <option value="optimal">Optimal (~1,100 words)</option>
                  <option value="long">Long (~1,500 words)</option>
                </select>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Image
                </label>
                <select
                  name="imageFilename"
                  value={formData.imageFilename}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {AVAILABLE_IMAGES.map(img => (
                    <option key={img.value} value={img.value}>
                      {img.label}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Images must be pre-uploaded to /public/blog-images/
                </p>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="includeFAQ"
                    checked={formData.includeFAQ}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include FAQ Section</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="includeInternalLinks"
                    checked={formData.includeInternalLinks}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Internal Links</span>
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !formData.topic || !formData.primaryKeyword}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Generating...' : 'Generate Blog Post'}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Preview</h2>

            {preview ? (
              <div className="space-y-4">
                {/* Meta Info */}
                <div className="p-3 bg-gray-50 rounded-md text-sm space-y-1">
                  <p>
                    <strong>URL:</strong> /blog/{preview.slug}
                  </p>
                  <p>
                    <strong>Meta Title:</strong> {preview.metaTitle}
                    <span className={`ml-2 text-xs ${preview.metaTitle.length <= 60 ? 'text-green-600' : 'text-red-600'}`}>
                      ({preview.metaTitle.length}/60)
                    </span>
                  </p>
                  <p>
                    <strong>Meta Description:</strong> {preview.metaDescription}
                    <span className={`ml-2 text-xs ${preview.metaDescription.length <= 155 ? 'text-green-600' : 'text-red-600'}`}>
                      ({preview.metaDescription.length}/155)
                    </span>
                  </p>
                  <p>
                    <strong>Image:</strong> {formData.imageFilename || 'default.jpg'}
                  </p>
                </div>

                {/* Content Preview */}
                <div
                  className="prose prose-sm max-w-none max-h-96 overflow-y-auto border rounded-md p-4"
                  dangerouslySetInnerHTML={{ __html: preview.content }}
                />

                {/* FAQs Preview */}
                {preview.faqs && preview.faqs.length > 0 && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-semibold mb-2">FAQs ({preview.faqs.length})</h3>
                    {preview.faqs.map((faq, index) => (
                      <div key={index} className="mb-3 pb-3 border-b last:border-b-0">
                        <p className="font-medium text-sm text-blue-800">{faq.question}</p>
                        <p className="text-sm text-gray-600 mt-1">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  <button
                    onClick={handlePublish}
                    disabled={loading}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400 font-medium"
                  >
                    {loading ? 'Publishing...' : 'Publish to GitHub'}
                  </button>
                  <button
                    onClick={() => setPreview(null)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Generate a blog post to see preview here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

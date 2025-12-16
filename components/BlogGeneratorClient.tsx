'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BlogFormData {
  topic: string;
  primaryKeyword: string;
  secondaryKeywords: string;
  location: string;
  category: string;
  seoLength: 'short' | 'optimal' | 'long';
  includeFAQ: boolean;
  includeInternalLinks: boolean;
  imageSource: 'ai' | 'upload' | 'url';
  uploadedImages: File[];
  imageUrls: string[];
  featuredImageIndex: number;
  inContentImages: boolean;
}

const BLOG_CATEGORIES = [
  'Police station advice',
  'Duty solicitor explanation',
  'Arrest & custody guidance',
  'Bail / pre-charge advice',
  'Rights at the police station',
];

export default function BlogGeneratorClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<any>(null);
  const [formData, setFormData] = useState<BlogFormData>({
    topic: '',
    primaryKeyword: '',
    secondaryKeywords: '',
    location: 'Kent',
    category: BLOG_CATEGORIES[0],
    seoLength: 'optimal',
    includeFAQ: true,
    includeInternalLinks: true,
    imageSource: 'ai',
    uploadedImages: [],
    imageUrls: [],
    featuredImageIndex: 0,
    inContentImages: true,
  });

  const handleInputChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setFormData(prev => ({
        ...prev,
        uploadedImages: [...prev.uploadedImages, ...files],
      }));
    }
  };

  const handleGenerate = async () => {
    if (!formData.topic || !formData.primaryKeyword) {
      alert('Please fill in the topic and primary keyword');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/generate-blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate blog post');
      }

      const data = await response.json();
      setPreview(data);
    } catch (error) {
      console.error('Error generating blog:', error);
      alert('Error generating blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!preview) {
      alert('Please generate the blog post first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...preview,
          published: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish blog post');
      }

      const data = await response.json();
      router.push(`/blog/${data.slug}`);
    } catch (error) {
      console.error('Error publishing blog:', error);
      alert('Error publishing blog post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Generator</h1>
          <p className="mt-2 text-gray-600">Create SEO-optimized blog posts for PoliceStationAgent.com</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Blog Post Details</h2>

            {/* Core Inputs */}
            <div className="space-y-6">
              {/* Topic */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Topic / Headline Idea *
                </label>
                <input
                  type="text"
                  value={formData.topic}
                  onChange={(e) => handleInputChange('topic', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., What happens during a police interview?"
                />
              </div>

              {/* Primary Keyword */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary SEO Keyword *
                </label>
                <input
                  type="text"
                  value={formData.primaryKeyword}
                  onChange={(e) => handleInputChange('primaryKeyword', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., police station duty solicitor"
                />
              </div>

              {/* Secondary Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Keywords (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.secondaryKeywords}
                  onChange={(e) => handleInputChange('secondaryKeywords', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., legal advice, PACE rights, custody"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {BLOG_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* SEO Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Length
                </label>
                <select
                  value={formData.seoLength}
                  onChange={(e) => handleInputChange('seoLength', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="short">Short (800 words)</option>
                  <option value="optimal">Optimal (1,000-1,200 words) [DEFAULT]</option>
                  <option value="long">Long (1,500 words)</option>
                </select>
              </div>

              {/* FAQ Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeFAQ"
                  checked={formData.includeFAQ}
                  onChange={(e) => handleInputChange('includeFAQ', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="includeFAQ" className="ml-2 block text-sm text-gray-700">
                  Include FAQ section
                </label>
              </div>

              {/* Internal Links Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeInternalLinks"
                  checked={formData.includeInternalLinks}
                  onChange={(e) => handleInputChange('includeInternalLinks', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="includeInternalLinks" className="ml-2 block text-sm text-gray-700">
                  Include internal links
                </label>
              </div>

              {/* Image Source */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image Source
                </label>
                <select
                  value={formData.imageSource}
                  onChange={(e) => handleInputChange('imageSource', e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ai">Auto-generate images using AI</option>
                  <option value="upload">Upload image(s) from local device</option>
                  <option value="url">Insert image(s) via external URL</option>
                </select>
              </div>

              {/* Image Upload */}
              {formData.imageSource === 'upload' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  {formData.uploadedImages.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        {formData.uploadedImages.length} image(s) selected
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Image URLs */}
              {formData.imageSource === 'url' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URLs (one per line)
                  </label>
                  <textarea
                    value={formData.imageUrls.join('\n')}
                    onChange={(e) => handleInputChange('imageUrls', e.target.value.split('\n').filter(Boolean))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                  />
                </div>
              )}

              {/* In-Content Images Toggle */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inContentImages"
                  checked={formData.inContentImages}
                  onChange={(e) => handleInputChange('inContentImages', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="inContentImages" className="ml-2 block text-sm text-gray-700">
                  Place images within content
                </label>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={loading || !formData.topic || !formData.primaryKeyword}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                <div>
                  <h3 className="font-semibold text-lg">{preview.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Slug: {preview.slug}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Meta Title:</h4>
                  <p className="text-sm text-gray-700">{preview.metaTitle}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Meta Description:</h4>
                  <p className="text-sm text-gray-700">{preview.metaDescription}</p>
                </div>

                <div className="prose max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: preview.content }} />
                </div>

                {preview.faqs && preview.faqs.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">FAQs:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {preview.faqs.map((faq: any, idx: number) => (
                        <li key={idx} className="text-sm">
                          <strong>{faq.question}</strong>: {faq.answer}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex gap-4">
                    <button
                      onClick={handlePublish}
                      disabled={loading}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-400"
                    >
                      {loading ? 'Publishing...' : 'Publish'}
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`${window.location.origin}/blog/${preview.slug}`);
                        alert('Link copied to clipboard!');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Copy Link
                    </button>
                  </div>
                  
                  {/* Email/SMS Sending Buttons */}
                  <div className="flex gap-2 pt-2 border-t">
                    <a
                      href={`mailto:?subject=${encodeURIComponent(preview.metaTitle || preview.title)}&body=${encodeURIComponent(`Read this article: ${window.location.origin}/blog/${preview.slug}`)}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-center text-sm"
                    >
                      Send by Email
                    </a>
                    <a
                      href={`sms:?body=${encodeURIComponent(`Read: ${window.location.origin}/blog/${preview.slug}`)}`}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 text-center text-sm"
                    >
                      Send by SMS
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-12">
                Generate a blog post to see preview here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState } from "react";

// Simple password - change this to whatever you want
const ACCESS_PASSWORD = "import123";

export default function BlogImporter() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setStatus("Please enter a URL");
      return;
    }

    setLoading(true);
    setStatus("Importing...");

    try {
      const response = await fetch("/api/admin/import-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(`✅ Success! Imported: ${data.title || "Blog post"}`);
        setUrl("");
      } else {
        setStatus(`❌ Error: ${data.error || "Import failed"}`);
      }
    } catch (error) {
      setStatus(`❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center">Blog Importer</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 border rounded mb-4 text-lg"
            autoFocus
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700"
          >
            Access
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">WordPress Blog Importer</h1>

        <form onSubmit={handleImport} className="bg-white p-6 rounded-lg shadow-md mb-6">
          <label className="block text-lg font-medium mb-2">Enter WordPress blog post URL:</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/blog-post-url"
            className="w-full p-3 border rounded mb-4 text-lg"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "Importing..." : "Import Blog Post"}
          </button>
        </form>

        {status && (
          <div
            className={`p-4 rounded-lg ${status.includes("✅") ? "bg-green-100 text-green-800" : status.includes("❌") ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
}

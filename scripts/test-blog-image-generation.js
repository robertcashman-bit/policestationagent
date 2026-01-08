/**
 * Test script to verify blog generator outputs images correctly
 */

const testBlogImageGeneration = async () => {
  const testImageUrl = "/blog-images/blog-listing-0.jpg"; // Use existing image

  console.log("🧪 Testing Blog Generator Image Output...\n");

  // Test 1: Generate blog post with image URL
  console.log("Test 1: Generate blog post with image URL");
  try {
    const response = await fetch("http://localhost:3000/api/admin/generate-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: "admin-session=test", // You may need to adjust this
      },
      body: JSON.stringify({
        topic: "Test Blog Post with Image",
        primaryKeyword: "test image blog",
        secondaryKeywords: "testing, images",
        location: "Kent",
        category: "police-station-advice",
        seoLength: "short",
        includeFAQ: false,
        includeInternalLinks: false,
        imageSource: "url",
        imageUrls: [testImageUrl],
        featuredImageIndex: 0,
        includeInContentImages: true,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ API Error:", error);
      return;
    }

    const data = await response.json();

    console.log("✅ Blog post generated successfully");
    console.log("   - Title:", data.title);
    console.log("   - Slug:", data.slug);
    console.log("   - Featured Image:", data.image);
    console.log("   - Image URLs:", data.imageUrls);
    console.log(
      "   - Content includes image:",
      data.content.includes(testImageUrl) ? "✅ YES" : "❌ NO"
    );
    console.log("   - Content length:", data.content.length, "characters");

    // Check if image is in content
    if (data.content.includes(testImageUrl) || data.content.includes("<img")) {
      console.log("✅ Image found in content HTML");
    } else {
      console.log("❌ Image NOT found in content HTML");
    }

    // Check if featured image is set
    if (data.image) {
      console.log("✅ Featured image is set:", data.image);
    } else {
      console.log("❌ Featured image is NOT set");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }

  console.log("\n" + "=".repeat(60) + "\n");

  // Test 2: Generate without includeInContentImages
  console.log("Test 2: Generate blog post WITHOUT inserting images into content");
  try {
    const response = await fetch("http://localhost:3000/api/admin/generate-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: "admin-session=test",
      },
      body: JSON.stringify({
        topic: "Test Blog Post without Image in Content",
        primaryKeyword: "test blog",
        location: "Kent",
        category: "police-station-advice",
        seoLength: "short",
        includeFAQ: false,
        includeInternalLinks: false,
        imageSource: "url",
        imageUrls: [testImageUrl],
        featuredImageIndex: 0,
        includeInContentImages: false, // Don't insert into content
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ API Error:", error);
      return;
    }

    const data = await response.json();

    const hasImageInContent = data.content.includes(testImageUrl) || data.content.includes("<img");

    if (!hasImageInContent) {
      console.log("✅ Image correctly NOT inserted into content (as expected)");
    } else {
      console.log("⚠️  Image found in content even though includeInContentImages=false");
    }

    if (data.image) {
      console.log("✅ Featured image is still set:", data.image);
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  }

  console.log("\n✅ Testing complete!");
};

// Run the test
testBlogImageGeneration().catch(console.error);

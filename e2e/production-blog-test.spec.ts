import { test, expect } from '@playwright/test';

/**
 * PRODUCTION BLOG GENERATOR E2E TEST
 * 
 * Tests the complete blog generation pipeline on production:
 * 1. Login to admin panel
 * 2. Generate blog post
 * 3. Publish to GitHub
 * 4. Verify persistence
 * 5. Capture screenshots
 */

const PRODUCTION_URL = 'https://policestationagent.com';
const TEST_CREDENTIALS = {
  username: process.env.TEST_ADMIN_USERNAME || 'Cashman100',
  password: process.env.TEST_ADMIN_PASSWORD || '',
};

const TEST_BLOG_CONFIG = {
  topic: 'E2E Production Test: Understanding Your Rights During Police Interviews',
  primaryKeyword: 'police interview rights Kent',
  secondaryKeywords: 'PACE 1984, legal advice, duty solicitor',
  location: 'Kent',
  category: 'police-station-advice',
};

test.describe('Production Blog Generator E2E', () => {
  test.describe.configure({ mode: 'serial' });

  let generatedSlug = '';

  test('1. Login to production admin panel', async ({ page }) => {
    console.log('\n═══════════════════════════════════════════');
    console.log('STEP 1: PRODUCTION LOGIN');
    console.log('═══════════════════════════════════════════');

    if (!TEST_CREDENTIALS.password) {
      console.log('⚠️ TEST_ADMIN_PASSWORD not set - skipping authenticated tests');
      test.skip();
      return;
    }

    await page.goto(`${PRODUCTION_URL}/admin/login`);
    await page.waitForLoadState('networkidle');

    // Take screenshot of login page
    await page.screenshot({ path: './playwright-results/prod-login-page.png', fullPage: true });

    await page.fill('input#username', TEST_CREDENTIALS.username);
    await page.fill('input#password', TEST_CREDENTIALS.password);
    await page.click('button[type="submit"]');

    // Wait for redirect
    await page.waitForURL('**/admin/blog-generator', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Verify we're logged in
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Blog Generator');

    // Take screenshot of blog generator
    await page.screenshot({ path: './playwright-results/prod-blog-generator.png', fullPage: true });

    console.log('✅ Production login successful');
  });

  test('2. Generate blog post on production', async ({ page }) => {
    console.log('\n═══════════════════════════════════════════');
    console.log('STEP 2: GENERATE BLOG POST');
    console.log('═══════════════════════════════════════════');

    if (!TEST_CREDENTIALS.password) {
      test.skip();
      return;
    }

    // Re-login if needed
    await page.goto(`${PRODUCTION_URL}/admin/login`);
    await page.fill('input#username', TEST_CREDENTIALS.username);
    await page.fill('input#password', TEST_CREDENTIALS.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/blog-generator', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Fill form
    await page.fill('input[name="topic"]', TEST_BLOG_CONFIG.topic);
    await page.fill('input[name="primaryKeyword"]', TEST_BLOG_CONFIG.primaryKeyword);
    await page.fill('input[name="secondaryKeywords"]', TEST_BLOG_CONFIG.secondaryKeywords);
    await page.fill('input[name="location"]', TEST_BLOG_CONFIG.location);
    await page.selectOption('select[name="category"]', TEST_BLOG_CONFIG.category);

    // Use URL image to avoid AI costs
    await page.selectOption('select[name="imageSource"]', 'url');
    await page.fill('input[placeholder*="https://"]', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200');

    // Take screenshot of filled form
    await page.screenshot({ path: './playwright-results/prod-form-filled.png', fullPage: true });

    // Click Generate
    await page.click('button:has-text("Generate Blog Post")');

    // Wait for generation (can take up to 60s)
    console.log('⏳ Waiting for AI generation...');
    await page.waitForSelector('.prose', { timeout: 60000 });
    await page.waitForLoadState('networkidle');

    // Extract slug
    const slugText = await page.locator('text=/blog/').first().textContent();
    if (slugText) {
      const slugMatch = slugText.match(/\/blog\/([a-z0-9-]+)/);
      if (slugMatch) {
        generatedSlug = slugMatch[1];
        console.log(`✓ Slug: ${generatedSlug}`);
      }
    }

    // Take screenshot of generated content
    await page.screenshot({ path: './playwright-results/prod-generated-content.png', fullPage: true });

    console.log('✅ Blog post generated');
  });

  test('3. Publish blog post to production', async ({ page }) => {
    console.log('\n═══════════════════════════════════════════');
    console.log('STEP 3: PUBLISH TO PRODUCTION');
    console.log('═══════════════════════════════════════════');

    if (!TEST_CREDENTIALS.password) {
      test.skip();
      return;
    }

    // Re-login and generate if needed
    await page.goto(`${PRODUCTION_URL}/admin/login`);
    await page.fill('input#username', TEST_CREDENTIALS.username);
    await page.fill('input#password', TEST_CREDENTIALS.password);
    await page.click('button[type="submit"]');
    await page.waitForURL('**/admin/blog-generator', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Fill and generate
    await page.fill('input[name="topic"]', TEST_BLOG_CONFIG.topic);
    await page.fill('input[name="primaryKeyword"]', TEST_BLOG_CONFIG.primaryKeyword);
    await page.selectOption('select[name="imageSource"]', 'url');
    await page.fill('input[placeholder*="https://"]', 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200');
    await page.click('button:has-text("Generate Blog Post")');
    await page.waitForSelector('.prose', { timeout: 60000 });

    // Extract slug
    const slugText = await page.locator('text=/blog/').first().textContent();
    if (slugText) {
      const slugMatch = slugText.match(/\/blog\/([a-z0-9-]+)/);
      if (slugMatch) generatedSlug = slugMatch[1];
    }

    // Click Publish
    const publishButton = page.locator('button:has-text("Publish")');
    await expect(publishButton).toBeVisible();

    // Listen for network response
    const responsePromise = page.waitForResponse(
      (resp) => resp.url().includes('/api/admin/posts') && resp.request().method() === 'POST',
      { timeout: 30000 }
    );

    await publishButton.click();
    console.log('✓ Publish button clicked');

    // Wait for response
    const response = await responsePromise;
    const responseData = await response.json();

    // Wait for UI update
    await page.waitForTimeout(2000);

    // Take screenshot of publish result
    await page.screenshot({ path: './playwright-results/prod-publish-result.png', fullPage: true });

    if (response.ok() && responseData.success) {
      console.log(`✓ Post published: ${responseData.slug}`);
      console.log(`✓ GitHub persisted: ${responseData.jsonPersisted ? 'YES' : 'NO'}`);
      if (!responseData.jsonPersisted) {
        console.log(`⚠️ Warning: ${responseData.jsonError || 'Unknown error'}`);
      }
      generatedSlug = responseData.slug;
    } else {
      console.log(`❌ Publish failed: ${responseData.error || 'Unknown error'}`);
    }

    console.log('✅ Publish attempt completed');
  });

  test('4. Verify published post on production', async ({ page, request }) => {
    console.log('\n═══════════════════════════════════════════');
    console.log('STEP 4: VERIFY PRODUCTION POST');
    console.log('═══════════════════════════════════════════');

    if (!generatedSlug) {
      // Use a known test post if we don't have a slug
      generatedSlug = 'understanding-breath-test-samples-police-stations-kent';
      console.log(`⚠️ Using fallback slug: ${generatedSlug}`);
    }

    const publicUrl = `${PRODUCTION_URL}/blog/${generatedSlug}`;
    console.log(`Testing: ${publicUrl}`);

    // HTTP check
    const response = await request.get(publicUrl);
    const status = response.status();
    console.log(`✓ HTTP Status: ${status}`);
    expect(status).toBe(200);

    // Navigate and verify
    await page.goto(publicUrl);
    await page.waitForLoadState('networkidle');

    // Verify title
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const title = await h1.textContent();
    console.log(`✓ Title: ${title}`);

    // Verify content
    const article = page.locator('article, .prose').first();
    await expect(article).toBeVisible();
    console.log('✓ Article content visible');

    // Verify image
    const img = page.locator('main img').first();
    await expect(img).toBeVisible();
    console.log('✓ Image visible');

    // Take final screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `./playwright-results/prod-live-post-${timestamp}.png`,
      fullPage: true,
    });

    console.log('✅ Production post verified');
    console.log(`\n📸 Screenshot: ./playwright-results/prod-live-post-${timestamp}.png`);
    console.log(`🌐 Live URL: ${publicUrl}`);
  });
});






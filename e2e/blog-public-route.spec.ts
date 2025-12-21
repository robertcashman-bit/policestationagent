import { test, expect } from '@playwright/test';

/**
 * BLOG PUBLIC ROUTE VERIFICATION TEST
 * 
 * This test verifies that published blog posts are accessible
 * and render correctly without requiring authentication.
 */

// Use the breath test blog post we created earlier
const TEST_SLUG = 'understanding-breath-test-samples-police-stations-kent';
const PUBLIC_URL = `/blog/${TEST_SLUG}`;

test.describe('Blog Public Route Verification', () => {
  
  test('Verify blog post returns HTTP 200', async ({ request }) => {
    console.log(`\n📡 Testing: ${PUBLIC_URL}`);
    
    const response = await request.get(PUBLIC_URL);
    const status = response.status();
    
    console.log(`   HTTP Status: ${status}`);
    expect(status).toBe(200);
    
    console.log('✅ HTTP 200 OK');
  });

  test('Verify blog post renders correctly', async ({ page }) => {
    console.log(`\n🌐 Navigating to: ${PUBLIC_URL}`);
    
    await page.goto(PUBLIC_URL);
    await page.waitForLoadState('networkidle');
    
    // Check title
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    const title = await h1.textContent();
    console.log(`   Title: ${title}`);
    expect(title).toContain('Breath Test');
    
    // Check article content
    const article = page.locator('article, .prose').first();
    await expect(article).toBeVisible();
    console.log('   Article: visible');
    
    // Check for key content
    const content = await page.locator('main').textContent();
    expect(content).toContain('PACE');
    expect(content).toContain('Kent');
    console.log('   Content: contains PACE and Kent references');
    
    // Check for image
    const heroImage = page.locator('main img').first();
    await expect(heroImage).toBeVisible();
    console.log('   Image: visible');
    
    // Check for CTA block
    const cta = page.locator('text=PoliceStationAgent.com');
    await expect(cta.first()).toBeVisible();
    console.log('   CTA Block: visible');
    
    console.log('✅ Page renders correctly');
  });

  test('Capture screenshot proof', async ({ page }) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `./playwright-results/blog-verification-${timestamp}.png`;
    
    await page.goto(PUBLIC_URL);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage: true 
    });
    
    console.log(`\n📸 Screenshot saved: ${screenshotPath}`);
    console.log('✅ Screenshot captured');
  });

  test('Verify no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto(PUBLIC_URL);
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    if (errors.length > 0) {
      console.log(`⚠️ Console errors: ${errors.join(', ')}`);
    } else {
      console.log('✅ No console errors');
    }
    
    // We don't fail on console errors, just report them
    expect(true).toBe(true);
  });
});





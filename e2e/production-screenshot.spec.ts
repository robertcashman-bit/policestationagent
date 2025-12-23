import { test, expect } from '@playwright/test';

/**
 * PRODUCTION SCREENSHOT TEST
 * 
 * Takes live screenshots of production site without requiring authentication
 */

const PRODUCTION_URL = 'https://policestationagent.com';

test.describe('Production Screenshots', () => {
  test('Capture production homepage', async ({ page }) => {
    console.log('📸 Capturing production homepage...');
    
    await page.goto(PRODUCTION_URL);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: './playwright-results/prod-homepage.png',
      fullPage: true,
    });
    
    console.log('✅ Homepage screenshot saved');
  });

  test('Capture production blog list', async ({ page }) => {
    console.log('📸 Capturing production blog list...');
    
    await page.goto(`${PRODUCTION_URL}/blog`);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: './playwright-results/prod-blog-list.png',
      fullPage: true,
    });
    
    console.log('✅ Blog list screenshot saved');
  });

  test('Capture production blog post', async ({ page }) => {
    console.log('📸 Capturing production blog post...');
    
    // Try a known post
    const testSlug = 'understanding-breath-test-samples-police-stations-kent';
    const url = `${PRODUCTION_URL}/blog/${testSlug}`;
    
    const response = await page.goto(url);
    const status = response?.status() || 0;
    
    if (status === 200) {
      await page.waitForLoadState('networkidle');
      
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await page.screenshot({
        path: `./playwright-results/prod-blog-post-${timestamp}.png`,
        fullPage: true,
      });
      
      console.log(`✅ Blog post screenshot saved (HTTP ${status})`);
      console.log(`🌐 URL: ${url}`);
    } else {
      console.log(`⚠️ Blog post returned HTTP ${status}, taking screenshot anyway...`);
      await page.screenshot({
        path: './playwright-results/prod-blog-post-404.png',
        fullPage: true,
      });
    }
  });

  test('Capture production admin login page', async ({ page }) => {
    console.log('📸 Capturing production admin login page...');
    
    await page.goto(`${PRODUCTION_URL}/admin/login`);
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({
      path: './playwright-results/prod-admin-login.png',
      fullPage: true,
    });
    
    console.log('✅ Admin login screenshot saved');
  });
});







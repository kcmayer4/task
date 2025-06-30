import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // Navigate to the root of the web server before each test
    await page.goto('/');
});

test('When pressing "increment", verify that counter shows 1', async ({ page }) => {
    // Find the button by its ID and click it
    await page.locator('#increment-btn').click();

    // Find the span by its ID and check its text content
    const counterElement = page.locator('#counter');
    await expect(counterElement).toHaveText('1');
});
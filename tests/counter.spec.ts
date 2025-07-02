// tests/counter.spec.ts
import {test, expect, devices} from '@playwright/test';

// Group tests for better organization
test.describe('Counter Application', () => {

    // Run this before each test in the block
    test.beforeEach(async ({ page }) => {
        // Assumes your http-server is running on localhost:3000
        await page.goto('http://localhost:3000');
    });


    // Test Case ID: TC-01
    test('should display 0 on initial load', async ({ page }) => {
        await expect(page.locator('#counter')).toHaveText('0');
    });

    // Test Case ID: TC-02
    test('should increment the counter to 1 when Increment is clicked', async ({ page }) => {
        await page.locator('#increment-btn').click();
        await expect(page.locator('#counter')).toHaveText('1');
    });

    // Test Case ID: TC-03 - THE IMPORTANT BUG-FINDING TEST
    test('should not allow the counter to go below 0', async ({ page }) => {
        const decrementBtn = page.locator('#decrement-btn');
        const counter = page.locator('#counter');
        await expect(counter).toHaveText('0');
        await decrementBtn.click();
        await expect(counter).toHaveText('0');
    });

    // Test Case ID: TC-04
    test('should decrement the counter correctly from a positive number', async ({ page }) => {
        const incrementBtn = page.locator('#increment-btn');
        const decrementBtn = page.locator('#decrement-btn');
        const counter = page.locator('#counter');
        await incrementBtn.click();
        await incrementBtn.click();
        await expect(counter).toHaveText('2');
        await decrementBtn.click();
        await expect(counter).toHaveText('1');
    });

    // Test Case ID: TC-05
    test('should handle multiple increments', async ({ page }) => {
        const incrementBtn = page.locator('#increment-btn');
        for (let i = 0; i < 5; i++) {
            await incrementBtn.click();
        }
        await expect(page.locator('#counter')).toHaveText('5');
    });


    // Test Case ID: TC-06 (Edge Case / User Behavior)
    test('should handle rapid-fire clicks correctly', async ({ page }) => {
        // This test checks for race conditions or state issues when events fire quickly.
        const incrementBtn = page.locator('#increment-btn');

        // Fire 10 click events as quickly as possible without waiting for each to complete
        await Promise.all([
            incrementBtn.click(), incrementBtn.click(), incrementBtn.click(),
            incrementBtn.click(), incrementBtn.click(), incrementBtn.click(),
            incrementBtn.click(), incrementBtn.click(), incrementBtn.click(),
            incrementBtn.click()
        ]);

        await expect(page.locator('#counter')).toHaveText('10');
    });

    // Test Case ID: TC-07 (Complex Flow)
    test('should correctly handle a sequence of increments and decrements', async ({ page }) => {
        const incrementBtn = page.locator('#increment-btn');
        const decrementBtn = page.locator('#decrement-btn');

        await incrementBtn.click(); // 1
        await incrementBtn.click(); // 2
        await incrementBtn.click(); // 3
        await decrementBtn.click(); // 2
        await incrementBtn.click(); // 3

        await expect(page.locator('#counter')).toHaveText('3');
    });

    // Test Case ID: TC-08 (Accessibility)
    test('should be fully operable using the keyboard', async ({ page }) => {
        // This is a critical accessibility test.
        const counter = page.locator('#counter');

        // Assuming the increment button is the first focusable element
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter'); // Increment to 1
        await expect(counter).toHaveText('1');

        // Tab to the next button (decrement)
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space'); // Decrement to 0 (using Space is also valid)
        await expect(counter).toHaveText('0');
    });

    // Test Case ID: TC-09 (Accessibility)
    test('should have correct ARIA attributes for screen readers', async ({ page }) => {
        // This test ensures the UI is understandable to assistive technologies.
        const counter = page.locator('#counter');

        // Buttons should have a role of "button"
        await expect(page.locator('#increment-btn')).toHaveAttribute('role', 'button');
        await expect(page.locator('#decrement-btn')).toHaveAttribute('role', 'button');

        // A live-updating region should announce its changes to screen readers.
        // 'aria-live="polite"' is the standard way to do this.
        await expect(counter).toHaveAttribute('aria-live', 'polite');
    });

    // Test Case ID: TC-10 (State Management)
    test('should reset to 0 on page reload', async ({ page }) => {
        const incrementBtn = page.locator('#increment-btn');
        const counter = page.locator('#counter');

        // Increment to a non-zero value
        await incrementBtn.click();
        await incrementBtn.click();
        await expect(counter).toHaveText('2');

        // Reload the page
        await page.reload();

        // Assert that the counter has reset to its initial state
        await expect(counter).toHaveText('0');
    });
});


    // A separate block for Visual and Responsive tests is good practice
    test.describe('Counter Application - Visual & Responsive', () => {

    // Test Case ID: TC-11 (Visual Regression)
    test('should match the visual snapshot on initial load', async ({ page }) => {
        // This test takes a screenshot and compares it to a master "golden" image.
        // It will fail if any CSS, layout, font, or color changes.
        // The first run creates the snapshot. Subsequent runs compare against it.
        await expect(page).toHaveScreenshot('counter-initial-state.png');
    });

    // Test Case ID: TC-12 (Responsive Testing)
    test('should be laid out correctly on a mobile viewport', async ({ page }) => {
        // Use a predefined mobile device from Playwright's device list
        await page.setViewportSize(devices['iPhone 13'].viewport);

        const counter = page.locator('#counter');
        const incrementBtn = page.locator('#increment-btn');

        // Check if the elements are visible on the mobile screen
        await expect(counter).toBeVisible();
        await expect(incrementBtn).toBeVisible();

        // Optional: Take a mobile-specific snapshot to lock in the responsive layout
        await expect(page).toHaveScreenshot('counter-mobile-view.png');
    });
});
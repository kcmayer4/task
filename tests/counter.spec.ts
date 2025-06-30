import { test, expect } from '@playwright/test';

// Group tests for better organization
test.describe('Counter Application', () => {

    // Run this before each test in the block
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
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

    // Test Case ID: TC-04
    test('should decrement the counter correctly from a positive number', async ({ page }) => {
        const incrementBtn = page.locator('#increment-btn');
        const decrementBtn = page.locator('#decrement-btn');
        const counter = page.locator('#counter');

        // Setup: Increment twice to get to 2
        await incrementBtn.click();
        await incrementBtn.click();
        await expect(counter).toHaveText('2');

        // Action: Decrement once
        await decrementBtn.click();
        await expect(counter).toHaveText('1');
    });

    // Test Case ID: TC-03 - THE IMPORTANT ONE
    test('should not allow the counter to go below 0', async ({ page }) => {
        // This test is written against the REQUIREMENT.
        // It is expected to FAIL with the current buggy code, proving the value of the test.
        const decrementBtn = page.locator('#decrement-btn');
        const counter = page.locator('#counter');

        // Verify initial state is 0
        await expect(counter).toHaveText('0');

        // Action: Attempt to decrement
        await decrementBtn.click();

        // Assertion: Verify the counter remains 0 as per the requirement
        await expect(counter).toHaveText('0');
        // The current code will fail here, as the text will become '-1'.
    });

    // Test Case ID: TC-05
    test('should handle multiple increments', async ({ page }) => {
        const incrementBtn = page.locator('#increment-btn');
        for (let i = 0; i < 3; i++) {
            await incrementBtn.click();
        }
        await expect(page.locator('#counter')).toHaveText('3');
    });

});
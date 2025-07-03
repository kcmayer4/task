import { test, expect, devices } from '@playwright/test';
import { CounterPage } from '../pages/counter.page';

// This test suite uses the Page Object Model (POM) pattern.
// All locators and core actions are defined in `pages/counter.page.ts`.
// This makes the tests more readable, maintainable, and separates test logic from page implementation.

test.describe('Counter Application - Functional & Accessibility', () => {
    let counterPage: CounterPage;

    // Before each test, create a new CounterPage instance and navigate to the page.
    // This ensures each test starts from a clean, known state.
    test.beforeEach(async ({ page }) => {
        counterPage = new CounterPage(page);
        await counterPage.goto();
    });

    // Test Case ID: TC-01
    test('should display 0 on initial load', async () => {
        // This test verifies the most basic requirement: the counter starts at 0.
        // It checks the initial text content of the counter element defined in the POM.
        await expect(counterPage.counter).toHaveText('0');
    });

    // Test Case ID: TC-02
    test('should increment the counter to 1 when Increment is clicked', async () => {
        // This test checks the primary user action by calling the `increment` method from the POM
        // and verifies the counter updates correctly.
        await counterPage.increment();
        await expect(counterPage.counter).toHaveText('1');
    });

    // Test Case ID: TC-03
    test('should not allow the counter to go below 0', async () => {
        // This test validates a critical business rule. It is expected to FAIL with the
        // current buggy code, proving the value of the automated checks.
        await counterPage.decrement();
        await expect(counterPage.counter).toHaveText('0');
    });

    // Test Case ID: TC-04
    test('should decrement the counter correctly from a positive number', async () => {
        // This test ensures the decrement functionality works from a positive value.
        // It uses action methods from the POM to set up the state and then validates the result.
        await counterPage.increment();
        await counterPage.increment();
        await counterPage.decrement();
        await expect(counterPage.counter).toHaveText('1');
    });

    // Test Case ID: TC-05
    test('should handle multiple increments', async () => {
        // This test validates that the counter correctly handles repeated actions
        // by calling the `increment` method within a loop.
        for (let i = 0; i < 5; i++) {
            await counterPage.increment();
        }
        await expect(counterPage.counter).toHaveText('5');
    });

    // Test Case ID: TC-06 (Edge Case / User Behavior)
    test('should handle rapid-fire clicks correctly', async () => {
        // This test checks for race conditions by firing clicks without awaiting each one.
        // We access the raw locator via the POM to more accurately simulate this behavior.
        await Promise.all([
            counterPage.incrementBtn.click(), counterPage.incrementBtn.click(),
            counterPage.incrementBtn.click(), counterPage.incrementBtn.click(),
            counterPage.incrementBtn.click(), counterPage.incrementBtn.click(),
            counterPage.incrementBtn.click(), counterPage.incrementBtn.click(),
            counterPage.incrementBtn.click(), counterPage.incrementBtn.click(),
        ]);
        await expect(counterPage.counter).toHaveText('10');
    });

    // Test Case ID: TC-07 (Complex Flow)
    test('should correctly handle a sequence of increments and decrements', async () => {
        // This test simulates a more realistic user journey to ensure state remains accurate.
        await counterPage.increment(); // 1
        await counterPage.increment(); // 2
        await counterPage.increment(); // 3
        await counterPage.decrement(); // 2
        await counterPage.increment(); // 3
        await expect(counterPage.counter).toHaveText('3');
    });

    // Test Case ID: TC-08 (Accessibility)
    test('should be fully operable using the keyboard', async ({ page }) => {
        // This is a critical accessibility test. Keyboard actions are global to the page,
        // so we interact with the `page` object directly for these commands.
        await page.keyboard.press('Tab'); // Focus increment
        await page.keyboard.press('Enter');
        await expect(counterPage.counter).toHaveText('1');

        await page.keyboard.press('Tab'); // Focus decrement
        await page.keyboard.press('Space');
        await expect(counterPage.counter).toHaveText('0');
    });

    // Test Case ID: TC-09 (Accessibility)
    test('should have correct ARIA attributes for screen readers', async () => {
        // This test ensures the UI is understandable to assistive technologies by checking for
        // essential ARIA attributes on elements defined in the POM.
        await expect(counterPage.incrementBtn).toHaveAttribute('role', 'button');
        await expect(counterPage.decrementBtn).toHaveAttribute('role', 'button');
        await expect(counterPage.counter).toHaveAttribute('aria-live', 'polite');
    });

    // Test Case ID: TC-10 (State Management)
    test('should reset to 0 on page reload', async ({ page }) => {
        // This test checks for correct state management by reloading the page and asserting
        // that the application state has correctly reset to its default.
        await counterPage.increment();
        await counterPage.increment();
        await expect(counterPage.counter).toHaveText('2');

        await page.reload();

        await expect(counterPage.counter).toHaveText('0');
    });
});

test.describe('Counter Application - Visual & Responsive', () => {
    let counterPage: CounterPage;

    test.beforeEach(async ({ page }) => {
        counterPage = new CounterPage(page);
        await counterPage.goto();
    });

    // Test Case ID: TC-11 (Visual Regression)
    test('should match the visual snapshot on initial load', async ({ page }) => {
        // This test takes a screenshot and compares it to a master "golden" image.
        // It first waits for a key element to be visible to prevent race conditions.
        await expect(counterPage.counter).toBeVisible();
        await expect(page).toHaveScreenshot('counter-initial-state.png');
    });

    // Test Case ID: TC-12 (Responsive Testing)
    test('should be laid out correctly on a mobile viewport', async ({ page }) => {
        // This test simulates a mobile device and takes a mobile-specific snapshot
        // to lock in the responsive layout and prevent visual regressions.
        await page.setViewportSize(devices['iPhone 13'].viewport);

        await expect(counterPage.counter).toBeVisible();
        await expect(counterPage.incrementBtn).toBeVisible();

        await expect(page).toHaveScreenshot('counter-mobile-view.png');
    });
});
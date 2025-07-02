// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests', // Where to look for tests
    fullyParallel: true,
    reporter: [
        ['list'], // Keep the default 'list' reporter for console output
        ['allure-playwright', {
            detail: true,
            outputFolder: 'allure-results',
            suiteTitle: false
        }]
    ],   // Creates a beautiful report after tests run
    use: {
        baseURL: 'http://localhost:3000', // Base URL for all page navigations
        trace: 'on-first-retry',
    },

    // This section automatically starts your local server for the tests
    webServer: {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
    ],
});
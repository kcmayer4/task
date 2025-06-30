// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests', // Where to look for tests
    fullyParallel: true,
    reporter: 'html',   // Creates a beautiful report after tests run
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
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ],
});
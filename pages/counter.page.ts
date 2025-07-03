import { type Page, type Locator } from '@playwright/test';

export class CounterPage {
    // --- PROPERTIES ---
    readonly page: Page;

    // --- LOCATORS ---
    readonly counter: Locator;
    readonly incrementBtn: Locator;
    readonly decrementBtn: Locator;

    // --- CONSTRUCTOR ---
    constructor(page: Page) {
        this.page = page;

        // Initialize the locators
        this.counter = page.locator('#counter');
        this.incrementBtn = page.locator('#increment-btn');
        this.decrementBtn = page.locator('#decrement-btn');
    }

    // --- ACTIONS ---

    async goto() {
        await this.page.goto('http://localhost:3000');
    }

    async increment() {
        await this.incrementBtn.click();
    }

    async decrement() {
        await this.decrementBtn.click();
    }

    async getCounterValue(): Promise<string> {
        return await this.counter.innerText();
    }
}
import { Locator, Page } from "@playwright/test";

class AlertPage {
    readonly alertBoxBtn: Locator;
    readonly confirmBoxBtn: Locator;
    readonly confirmBoxResult: Locator;
    readonly promptBoxBtn: Locator;
    readonly promptBoxResult: Locator;
    readonly alertBoxTab: Locator;
    readonly confirmBoxTab: Locator;
    readonly promptBoxTab: Locator;
    
    constructor(private page: Page) {
        this.alertBoxBtn = page.locator('#OKTab button');
        this.confirmBoxBtn = page.locator('#CancelTab button');
        this.promptBoxBtn = page.locator('#Textbox button');
        this.confirmBoxResult = page.locator('#demo');
        this.promptBoxResult = page.locator('#demo1');
        this.alertBoxTab = page.locator('a[href="#OKTab"]');
        this.confirmBoxTab = page.locator('a[href="#CancelTab"]');
        this.promptBoxTab = page.locator('a[href="#Textbox"]');
    }

    async open() {
        await this.page.goto('/Alerts.html');
    }
}

export default AlertPage;
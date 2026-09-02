import { Locator, Page } from "@playwright/test";
const path = '#header nav ul li >> text=';
class Nav {
    readonly homeBtn: Locator;
    readonly registerBtn: Locator;
    readonly webTableBtn: Locator;
    readonly switchToBtn: Locator;
    readonly switchToAlertsItem: Locator;
    readonly widgetsBtn: Locator;
    readonly interactionsBtn: Locator;
    readonly VideoBtn: Locator;
    readonly wysiwygBtn: Locator;
    readonly moreBtn: Locator;

    constructor(private page: Page) {
        this.homeBtn = page.locator(path + 'Home');
        this.registerBtn = page.locator(path + 'Register');
        this.webTableBtn = page.locator(path + 'WebTable');
        this.switchToBtn = page.locator(path + 'SwitchTo');
        this.switchToAlertsItem = page.locator(path + 'Alerts');
        this.widgetsBtn = page.locator(path + 'Widgets');
        this.interactionsBtn = page.locator(path + 'Interactions');
        this.VideoBtn = page.locator(path + 'Video');
        this.wysiwygBtn = page.locator(path + 'WYSIWYG');
        this.moreBtn = page.locator(path + 'More');

    }
}

export default Nav;
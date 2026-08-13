import type { Page } from '@playwright/test';

const AD_HOSTNAME_PATTERN =
    /doubleclick\.net|googlesyndication\.com|google-analytics\.com|googletagmanager\.com|googleadservices\.com|amazon-adsystem\.com|taboola\.com|outbrain\.com/;

export async function blockAds(page: Page): Promise<void> {
    await page.route(new RegExp(AD_HOSTNAME_PATTERN), route => route.abort());
}

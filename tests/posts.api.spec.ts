import { test, expect } from '@playwright/test';

/**
 * API-level checks that run without a browser.
 * Kept in a dedicated Playwright project (see playwright.config.ts) so the
 * suite doubles as functional + contract coverage and stays fast in CI.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('API - posts', () => {
    test('GET /posts returns a well-formed collection', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/posts`);

        expect(res.status()).toBe(200);
        expect(res.headers()['content-type']).toContain('application/json');

        const body = await res.json();
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBeGreaterThan(0);
        expect(body[0]).toMatchObject({
            id: expect.any(Number),
            userId: expect.any(Number),
            title: expect.any(String),
            body: expect.any(String),
        });
    });

    test('GET /posts/:id returns the requested resource', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/posts/1`);

        expect(res.status()).toBe(200);
        expect(await res.json()).toMatchObject({ id: 1, userId: expect.any(Number) });
    });

    test('GET /posts/:id with an unknown id returns 404', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/posts/999999`);

        expect(res.status()).toBe(404);
    });

    test('POST /posts echoes the payload and assigns an id', async ({ request }) => {
        const payload = { title: 'sdet', body: 'automated contract check', userId: 42 };

        const res = await request.post(`${BASE_URL}/posts`, { data: payload });

        expect(res.status()).toBe(201);
        expect(await res.json()).toMatchObject({ ...payload, id: expect.any(Number) });
    });
});

/**
 * Test accounts for practicesoftwaretesting.com (Toolshop).
 *
 * The values are public, shared demo credentials, but they are still read from
 * the environment (`.env`, git-ignored) rather than hard-coded here — so the
 * same pattern holds when an app needs real, private accounts.
 *
 * Local setup:  cp example.env .env
 */
export type TestUser = {
    email: string;
    password: string;
};

function required(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(
            `Missing environment variable "${name}". Copy example.env to .env (\`cp example.env .env\`).`,
        );
    }
    return value;
}

export const users = {
    customer: {
        email: required('CUSTOMER_EMAIL'),
        password: required('CUSTOMER_PASSWORD'),
    },
    admin: {
        email: required('ADMIN_EMAIL'),
        password: required('ADMIN_PASSWORD'),
    },
} satisfies Record<string, TestUser>;

/**
 * Public demo accounts for practicesoftwaretesting.com (Toolshop).
 * These are shared, well-known test credentials — safe to commit.
 * Docs: https://github.com/testsmith-io/practice-software-testing
 */
export type TestUser = {
    email: string;
    password: string;
};

export const users = {
    customer: {
        email: 'customer@practicesoftwaretesting.com',
        password: 'welcome01',
    },
    admin: {
        email: 'admin@practicesoftwaretesting.com',
        password: 'welcome01',
    },
} satisfies Record<string, TestUser>;

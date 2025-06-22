import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('StripeAccount Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdAccountId;
    beforeAll(async () => {
        app = await createFastify();
        await app.listen({ port: 0 });
        tenantId = new Types.ObjectId();
        authToken = generateJwt({ id: 'testuser', role: 'user' });
    });
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
    it('GET /stripeAccounts should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/stripeAccounts',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /stripeAccounts should create a stripe account', async () => {
        const newAccount = {
            accountId: 'acct_123456789',
            email: 'test@example.com',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/stripeAccounts',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newAccount,
        });
        expect(response.statusCode).toBe(201);
        const account = response.json();
        expect(account).toHaveProperty('accountId', newAccount.accountId);
        createdAccountId = account.id;
    });
    it('GET /stripeAccounts/:id should return a stripe account or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/stripeAccounts/${createdAccountId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const account = response.json();
            expect(account.id).toBe(createdAccountId);
        }
    });
    it('PUT /stripeAccounts/:id should update a stripe account or return 404', async () => {
        const updateData = { email: 'updated@example.com' };
        const response = await app.inject({
            method: 'PUT',
            url: `/stripeAccounts/${createdAccountId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const account = response.json();
            expect(account).toHaveProperty('email', updateData.email);
        }
    });
    it('DELETE /stripeAccounts/:id should delete a stripe account or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/stripeAccounts/${createdAccountId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

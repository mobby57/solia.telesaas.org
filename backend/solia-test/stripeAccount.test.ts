import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

// Mock Stripe API
vi.mock('../src/services/stripeService', () => ({
  createAccountLink: vi.fn().mockResolvedValue({ url: 'https://stripe.com/account-link' }),
  retrieveAccount: vi.fn().mockResolvedValue({ id: 'acct_test', charges_enabled: true }),
}));

describe('StripeAccount Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdStripeAccountId: string;

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

  it('POST /stripeAccounts should create a Stripe account link', async () => {
    const newAccount = {
      userId: 'testuser',
      type: 'express',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/stripeAccounts',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newAccount,
    });
    expect(response.statusCode).toBe(201);
    const account = response.json();
    expect(account).toHaveProperty('url');
    createdStripeAccountId = account.id;
  });

  it('GET /stripeAccounts/:id should return a Stripe account or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/stripeAccounts/${createdStripeAccountId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const account = response.json();
      expect(account.id).toBe(createdStripeAccountId);
    }
  });

  it('PUT /stripeAccounts/:id should update a Stripe account or return 404', async () => {
    const updateData = { charges_enabled: false };
    const response = await app.inject({
      method: 'PUT',
      url: `/stripeAccounts/${createdStripeAccountId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const account = response.json();
      expect(account).toHaveProperty('charges_enabled', updateData.charges_enabled);
    }
  });

  it('DELETE /stripeAccounts/:id should delete a Stripe account or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/stripeAccounts/${createdStripeAccountId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

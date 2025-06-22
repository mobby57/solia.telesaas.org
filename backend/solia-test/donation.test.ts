import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

// Mock external payment service (e.g., Stripe)
vi.mock('../src/services/stripeService', () => ({
  createPaymentIntent: vi.fn().mockResolvedValue({ id: 'pi_test', status: 'succeeded' }),
}));

describe('Donation Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdDonationId: string;

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

  it('GET /donations should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/donations',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /donations should create a donation with payment simulation', async () => {
    const newDonation = {
      amount: 100,
      currency: 'USD',
      donorName: 'Test Donor',
      paymentMethod: 'card',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/donations',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newDonation,
    });
    expect(response.statusCode).toBe(201);
    const donation = response.json();
    expect(donation).toHaveProperty('amount', newDonation.amount);
    createdDonationId = donation.id;
  });

  it('GET /donations/:id should return a donation or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/donations/${createdDonationId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const donation = response.json();
      expect(donation.id).toBe(createdDonationId);
    }
  });

  it('PUT /donations/:id should update a donation or return 404', async () => {
    const updateData = { donorName: 'Updated Donor' };
    const response = await app.inject({
      method: 'PUT',
      url: `/donations/${createdDonationId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const donation = response.json();
      expect(donation).toHaveProperty('donorName', updateData.donorName);
    }
  });

  it('DELETE /donations/:id should delete a donation or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/donations/${createdDonationId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

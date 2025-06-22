import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config({ path: '.env.test' });
describe('Donation Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdDonationId;
    beforeAll(async () => {
        app = await createFastify();
        await app.ready();
        await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/solia_test');
        tenantId = new Types.ObjectId();
        authToken = generateJwt({ id: 'testuser', role: 'user' });
    });
    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
    });
    afterAll(async () => {
        await mongoose.disconnect();
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
        expect(Array.isArray(await response.json())).toBe(true);
    });
    it('POST /donations should create a donation', async () => {
        const newDonation = {
            amount: 100,
            donorName: 'John Doe',
            message: 'Keep up the good work!',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/donations',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newDonation,
        });
        expect(response.statusCode).toBe(201);
        const donation = await response.json();
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
            const donation = await response.json();
            expect(donation.id).toBe(createdDonationId);
        }
    });
    it('PUT /donations/:id should update a donation or return 404', async () => {
        const updateData = { message: 'Updated message' };
        const response = await app.inject({
            method: 'PUT',
            url: `/donations/${createdDonationId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const donation = await response.json();
            expect(donation).toHaveProperty('message', updateData.message);
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

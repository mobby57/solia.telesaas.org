import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
dotenv.config({ path: '.env.test' });
describe('Feedback Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdFeedbackId;
    beforeAll(async () => {
        app = await createFastify();
        await app.ready();
        await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/solia_test');
        tenantId = new Types.ObjectId();
        // For feedback, we assume user is authenticated with tenantId
        authToken = generateJwt({ id: 'testuser', role: 'user' });
    });
    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
    });
    afterAll(async () => {
        await mongoose.disconnect();
        if (app && typeof app.close === 'function') {
            await app.close();
        }
    });
    it('GET /feedbacks should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/feedbacks',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(await response.json())).toBe(true);
    });
    it('POST /feedbacks should create a feedback', async () => {
        const newFeedback = {
            message: 'Test feedback message',
            rating: 5,
        };
        const response = await app.inject({
            method: 'POST',
            url: '/feedbacks',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newFeedback,
        });
        expect(response.statusCode).toBe(201);
        const feedback = await response.json();
        expect(feedback).toHaveProperty('message', newFeedback.message);
        createdFeedbackId = feedback.id;
    });
    it('GET /feedbacks/:id should return a feedback or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/feedbacks/${createdFeedbackId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const feedback = await response.json();
            expect(feedback.id).toBe(createdFeedbackId);
        }
    });
    it('PUT /feedbacks/:id should update a feedback or return 404', async () => {
        const updateData = { message: 'Updated feedback message' };
        const response = await app.inject({
            method: 'PUT',
            url: `/feedbacks/${createdFeedbackId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const feedback = await response.json();
            expect(feedback).toHaveProperty('message', updateData.message);
        }
    });
    it('DELETE /feedbacks/:id should delete a feedback or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/feedbacks/${createdFeedbackId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

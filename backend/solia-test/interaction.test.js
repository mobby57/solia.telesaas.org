import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Types } from 'mongoose';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';
dotenv.config({ path: '.env.test' });
describe('Interaction Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdInteractionId;
    beforeAll(async () => {
        await setupInMemoryMongo();
        app = await createFastify();
        await app.ready();
    });
    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
        tenantId = new Types.ObjectId();
        authToken = generateJwt({ id: 'testuser', role: 'user' });
    });
    afterAll(async () => {
        await teardownInMemoryMongo();
        if (app && typeof app.close === 'function') {
            await app.close();
        }
    });
    it('GET /interactions should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/interactions',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(await response.json())).toBe(true);
    });
    it('POST /interactions should create an interaction', async () => {
        const newInteraction = {
            type: 'comment',
            content: 'Test interaction content',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/interactions',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newInteraction,
        });
        expect(response.statusCode).toBe(201);
        const interaction = await response.json();
        expect(interaction).toHaveProperty('type', newInteraction.type);
        createdInteractionId = interaction.id;
    });
    it('GET /interactions/:id should return an interaction or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/interactions/${createdInteractionId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const interaction = await response.json();
            expect(interaction.id).toBe(createdInteractionId);
        }
    });
    it('PUT /interactions/:id should update an interaction or return 404', async () => {
        const updateData = { content: 'Updated interaction content' };
        const response = await app.inject({
            method: 'PUT',
            url: `/interactions/${createdInteractionId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const interaction = await response.json();
            expect(interaction).toHaveProperty('content', updateData.content);
        }
    });
    it('DELETE /interactions/:id should delete an interaction or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/interactions/${createdInteractionId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

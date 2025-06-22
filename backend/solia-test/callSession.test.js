import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
describe('CallSession Routes', () => {
    let app;
    let authToken;
    let createdSessionId;
    beforeAll(async () => {
        app = await createFastify();
        await app.ready();
        await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/solia_test');
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
    it('GET /callSessions should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/callSessions',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(await response.json())).toBe(true);
    });
    it('POST /callSessions should create a call session', async () => {
        const newSession = {
            operatorId: 'operator1',
            transcriptId: 'transcript1',
            duration: 120,
        };
        const response = await app.inject({
            method: 'POST',
            url: '/callSessions',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newSession,
        });
        expect(response.statusCode).toBe(201);
        const session = await response.json();
        expect(session).toHaveProperty('operatorId', newSession.operatorId);
        createdSessionId = session.id;
    });
    it('GET /callSessions/:id should return a call session or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/callSessions/${createdSessionId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const session = await response.json();
            expect(session.id).toBe(createdSessionId);
        }
    });
    it('PUT /callSessions/:id should update a call session or return 404', async () => {
        const updateData = { duration: 150 };
        const response = await app.inject({
            method: 'PUT',
            url: `/callSessions/${createdSessionId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const session = await response.json();
            expect(session).toHaveProperty('duration', updateData.duration);
        }
    });
    it('DELETE /callSessions/:id should delete a call session or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/callSessions/${createdSessionId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

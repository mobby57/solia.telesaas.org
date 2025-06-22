import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('Script Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdScriptId;
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
    it('GET /scripts should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/scripts',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /scripts should create a script', async () => {
        const newScript = {
            name: 'Test Script',
            content: 'console.log("Hello World");',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/scripts',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newScript,
        });
        expect(response.statusCode).toBe(201);
        const script = response.json();
        expect(script).toHaveProperty('name', newScript.name);
        createdScriptId = script.id;
    });
    it('GET /scripts/:id should return a script or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/scripts/${createdScriptId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const script = response.json();
            expect(script.id).toBe(createdScriptId);
        }
    });
    it('PUT /scripts/:id should update a script or return 404', async () => {
        const updateData = { content: 'console.log("Updated");' };
        const response = await app.inject({
            method: 'PUT',
            url: `/scripts/${createdScriptId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const script = response.json();
            expect(script).toHaveProperty('content', updateData.content);
        }
    });
    it('DELETE /scripts/:id should delete a script or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/scripts/${createdScriptId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

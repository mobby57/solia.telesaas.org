import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('Role Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdRoleId;
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
    it('GET /roles should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/roles',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /roles should create a role', async () => {
        const newRole = {
            name: 'Test Role',
            description: 'Role description',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/roles',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newRole,
        });
        expect(response.statusCode).toBe(201);
        const role = response.json();
        expect(role).toHaveProperty('name', newRole.name);
        createdRoleId = role.id;
    });
    it('GET /roles/:id should return a role or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/roles/${createdRoleId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const role = response.json();
            expect(role.id).toBe(createdRoleId);
        }
    });
    it('PUT /roles/:id should update a role or return 404', async () => {
        const updateData = { description: 'Updated description' };
        const response = await app.inject({
            method: 'PUT',
            url: `/roles/${createdRoleId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const role = response.json();
            expect(role).toHaveProperty('description', updateData.description);
        }
    });
    it('DELETE /roles/:id should delete a role or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/roles/${createdRoleId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

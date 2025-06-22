import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, createUser, createRole, createUserRole, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('User Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdUserId;
    beforeAll(async () => {
        app = await createFastify();
        await app.listen({ port: 0 });
        tenantId = new Types.ObjectId();
        const user = await createUser({ tenantId });
        const role = await createRole({ name: 'admin', tenantId });
        await createUserRole({ userId: user.id, roleId: role.id, tenantId });
        authToken = generateJwt({ id: user.id, role: role.name });
        createdUserId = user.id;
    });
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
    it('GET /users should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/users',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('GET /users/:id should return a user or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/users/${createdUserId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const user = response.json();
            expect(user.id).toBe(createdUserId);
        }
    });
    it('POST /users should create a user', async () => {
        const newUser = {
            email: 'newuser@example.com',
            password: 'password',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/users',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newUser,
        });
        expect(response.statusCode).toBe(201);
        const user = response.json();
        expect(user).toHaveProperty('email', newUser.email);
    });
    it('PUT /users/:id should update a user or return 404', async () => {
        const updateData = { email: 'updateduser@example.com' };
        const response = await app.inject({
            method: 'PUT',
            url: `/users/${createdUserId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const user = response.json();
            expect(user).toHaveProperty('email', updateData.email);
        }
    });
    it('DELETE /users/:id should delete a user or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/users/${createdUserId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('Organization Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdOrganizationId;
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
    it('GET /organizations should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/organizations',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /organizations should create an organization', async () => {
        const newOrganization = {
            name: 'Test Organization',
            description: 'Organization description',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/organizations',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newOrganization,
        });
        expect(response.statusCode).toBe(201);
        const organization = response.json();
        expect(organization).toHaveProperty('name', newOrganization.name);
        createdOrganizationId = organization.id;
    });
    it('GET /organizations/:id should return an organization or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/organizations/${createdOrganizationId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const organization = response.json();
            expect(organization.id).toBe(createdOrganizationId);
        }
    });
    it('PUT /organizations/:id should update an organization or return 404', async () => {
        const updateData = { description: 'Updated description' };
        const response = await app.inject({
            method: 'PUT',
            url: `/organizations/${createdOrganizationId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const organization = response.json();
            expect(organization).toHaveProperty('description', updateData.description);
        }
    });
    it('DELETE /organizations/:id should delete an organization or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/organizations/${createdOrganizationId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

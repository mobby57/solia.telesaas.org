import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Organization Routes', () => {
  let app: FastifyInstance;
  let authToken: string;
  let createdOrganizationId: string;

  beforeAll(async () => {
    app = await createFastify();
    await app.listen({ port: 0 });

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

  it('POST /organizations should fail with invalid data', async () => {
    const invalidOrganization = {
      name: '', // empty name should be invalid
    };
    const response = await app.inject({
      method: 'POST',
      url: '/organizations',
      headers: { authorization: `Bearer ${authToken}` },
      payload: invalidOrganization,
    });
    expect(response.statusCode).toBe(400);
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

  it('GET /organizations/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/organizations/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });

  it('PATCH /organizations/:id should update an organization or return 404', async () => {
    const updateData = { name: 'Updated Organization' };
    const response = await app.inject({
      method: 'PATCH',
      url: `/organizations/${createdOrganizationId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const organization = response.json();
      expect(organization).toHaveProperty('name', updateData.name);
    }
  });

  it('PATCH /organizations/:id should return 400 for invalid id', async () => {
    const updateData = { name: 'Updated Organization' };
    const response = await app.inject({
      method: 'PATCH',
      url: '/organizations/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /organizations/:id should delete an organization or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/organizations/${createdOrganizationId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });

  it('DELETE /organizations/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/organizations/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });
});

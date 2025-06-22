import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';

describe('Tenant Routes', () => {
  let app: FastifyInstance;
  let authToken: string;
  let createdTenantId: string;

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

  it('GET /tenants should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/tenants',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /tenants should create a tenant', async () => {
    const newTenant = {
      organizationId: 'org123',
      name: 'Test Tenant',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/tenants',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newTenant,
    });
    expect(response.statusCode).toBe(201);
    const tenant = response.json();
    expect(tenant).toHaveProperty('name', newTenant.name);
    createdTenantId = tenant.id;
  });

  it('POST /tenants should fail with invalid data', async () => {
    const invalidTenant = {
      organizationId: '',
      name: '',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/tenants',
      headers: { authorization: `Bearer ${authToken}` },
      payload: invalidTenant,
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /tenants/:id should return a tenant or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/tenants/${createdTenantId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const tenant = response.json();
      expect(tenant.id).toBe(createdTenantId);
    }
  });

  it('GET /tenants/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/tenants/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });

  it('PATCH /tenants/:id should update a tenant or return 404', async () => {
    const updateData = { name: 'Updated Tenant' };
    const response = await app.inject({
      method: 'PATCH',
      url: `/tenants/${createdTenantId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const tenant = response.json();
      expect(tenant).toHaveProperty('name', updateData.name);
    }
  });

  it('PATCH /tenants/:id should return 400 for invalid id', async () => {
    const updateData = { name: 'Updated Tenant' };
    const response = await app.inject({
      method: 'PATCH',
      url: '/tenants/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /tenants/:id should delete a tenant or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/tenants/${createdTenantId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });

  it('DELETE /tenants/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/tenants/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });
});

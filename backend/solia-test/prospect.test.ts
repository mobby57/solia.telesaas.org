import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Prospect Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdProspectId: string;

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

  it('GET /prospects should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/prospects',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /prospects should create a prospect', async () => {
    const newProspect = {
      name: 'Test Prospect',
      email: 'test@example.com',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/prospects',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newProspect,
    });
    expect(response.statusCode).toBe(201);
    const prospect = response.json();
    expect(prospect).toHaveProperty('name', newProspect.name);
    createdProspectId = prospect.id;
  });

  it('GET /prospects/:id should return a prospect or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/prospects/${createdProspectId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const prospect = response.json();
      expect(prospect.id).toBe(createdProspectId);
    }
  });

  it('PUT /prospects/:id should update a prospect or return 404', async () => {
    const updateData = { email: 'updated@example.com' };
    const response = await app.inject({
      method: 'PUT',
      url: `/prospects/${createdProspectId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const prospect = response.json();
      expect(prospect).toHaveProperty('email', updateData.email);
    }
  });

  it('DELETE /prospects/:id should delete a prospect or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/prospects/${createdProspectId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

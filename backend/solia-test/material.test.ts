import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Material Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdMaterialId: string;

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

  it('GET /materials should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/materials',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /materials should create a material', async () => {
    const newMaterial = {
      name: 'Test material',
      description: 'This is a test material',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/materials',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newMaterial,
    });
    expect(response.statusCode).toBe(201);
    const material = response.json();
    expect(material).toHaveProperty('name', newMaterial.name);
    createdMaterialId = material.id;
  });

  it('GET /materials/:id should return a material or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/materials/${createdMaterialId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const material = response.json();
      expect(material.id).toBe(createdMaterialId);
    }
  });

  it('PUT /materials/:id should update a material or return 404', async () => {
    const updateData = { description: 'Updated material description' };
    const response = await app.inject({
      method: 'PUT',
      url: `/materials/${createdMaterialId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const material = response.json();
      expect(material).toHaveProperty('description', updateData.description);
    }
  });

  it('DELETE /materials/:id should delete a material or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/materials/${createdMaterialId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

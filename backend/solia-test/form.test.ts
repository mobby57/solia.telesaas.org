import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Form Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdFormId: string;

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

  it('GET /forms should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/forms',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /forms should create a form', async () => {
    const newForm = {
      title: 'Test Form',
      description: 'This is a test form',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/forms',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newForm,
    });
    expect(response.statusCode).toBe(201);
    const form = response.json();
    expect(form).toHaveProperty('title', newForm.title);
    createdFormId = form.id;
  });

  it('POST /forms should fail with invalid data', async () => {
    const invalidForm = {
      title: '', // empty title should be invalid
      description: 'Invalid form',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/forms',
      headers: { authorization: `Bearer ${authToken}` },
      payload: invalidForm,
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /forms/:id should return a form or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/forms/${createdFormId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const form = response.json();
      expect(form.id).toBe(createdFormId);
    }
  });

  it('GET /forms/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/forms/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });

  it('PUT /forms/:id should update a form or return 404', async () => {
    const updateData = { description: 'Updated form description' };
    const response = await app.inject({
      method: 'PUT',
      url: `/forms/${createdFormId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const form = response.json();
      expect(form).toHaveProperty('description', updateData.description);
    }
  });

  it('PUT /forms/:id should return 400 for invalid id', async () => {
    const updateData = { description: 'Updated form description' };
    const response = await app.inject({
      method: 'PUT',
      url: '/forms/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /forms/:id should delete a form or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/forms/${createdFormId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });

  it('DELETE /forms/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/forms/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });
});

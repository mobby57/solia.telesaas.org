import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Interaction Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdInteractionId: string;

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

  it('GET /interactions should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/interactions',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /interactions should create an interaction with mission and comment', async () => {
    const newInteraction = {
      type: 'call',
      missionId: new Types.ObjectId().toHexString(),
      comment: 'Test interaction comment',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/interactions',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newInteraction,
    });
    expect(response.statusCode).toBe(201);
    const interaction = response.json();
    expect(interaction).toHaveProperty('type', newInteraction.type);
    createdInteractionId = interaction.id;
  });

  it('GET /interactions/:id should return an interaction or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/interactions/${createdInteractionId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const interaction = response.json();
      expect(interaction.id).toBe(createdInteractionId);
    }
  });

  it('PUT /interactions/:id should update an interaction or return 404', async () => {
    const updateData = { comment: 'Updated comment' };
    const response = await app.inject({
      method: 'PUT',
      url: `/interactions/${createdInteractionId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const interaction = response.json();
      expect(interaction).toHaveProperty('comment', updateData.comment);
    }
  });

  it('DELETE /interactions/:id should delete an interaction or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/interactions/${createdInteractionId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

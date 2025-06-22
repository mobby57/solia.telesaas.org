import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Message Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdMessageId: string;

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

  it('GET /messages should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/messages',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /messages should create a message with user and interaction link', async () => {
    const newMessage = {
      content: 'Test message content',
      userId: 'testuser',
      interactionId: new Types.ObjectId().toHexString(),
    };
    const response = await app.inject({
      method: 'POST',
      url: '/messages',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newMessage,
    });
    expect(response.statusCode).toBe(201);
    const message = response.json();
    expect(message).toHaveProperty('content', newMessage.content);
    createdMessageId = message.id;
  });

  it('GET /messages/:id should return a message or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/messages/${createdMessageId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const message = response.json();
      expect(message.id).toBe(createdMessageId);
    }
  });

  it('PUT /messages/:id should update a message or return 404', async () => {
    const updateData = { content: 'Updated message content' };
    const response = await app.inject({
      method: 'PUT',
      url: `/messages/${createdMessageId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const message = response.json();
      expect(message).toHaveProperty('content', updateData.content);
    }
  });

  it('DELETE /messages/:id should delete a message or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/messages/${createdMessageId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

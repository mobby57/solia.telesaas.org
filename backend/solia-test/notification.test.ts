import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Notification Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdNotificationId: string;

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

  it('GET /notifications should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/notifications',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /notifications should create a notification', async () => {
    const newNotification = {
      title: 'Test Notification',
      message: 'This is a test notification',
      userId: 'testuser',
      read: false,
    };
    const response = await app.inject({
      method: 'POST',
      url: '/notifications',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newNotification,
    });
    expect(response.statusCode).toBe(201);
    const notification = response.json();
    expect(notification).toHaveProperty('title', newNotification.title);
    createdNotificationId = notification.id;
  });

  it('POST /notifications should fail with invalid data', async () => {
    const invalidNotification = {
      title: '', // empty title should be invalid
      message: 'Invalid notification',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/notifications',
      headers: { authorization: `Bearer ${authToken}` },
      payload: invalidNotification,
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /notifications/:id should return a notification or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/notifications/${createdNotificationId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const notification = response.json();
      expect(notification.id).toBe(createdNotificationId);
    }
  });

  it('GET /notifications/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/notifications/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });

  it('PUT /notifications/:id should update a notification or return 404', async () => {
    const updateData = { read: true };
    const response = await app.inject({
      method: 'PUT',
      url: `/notifications/${createdNotificationId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const notification = response.json();
      expect(notification).toHaveProperty('read', updateData.read);
    }
  });

  it('PUT /notifications/:id should return 400 for invalid id', async () => {
    const updateData = { read: true };
    const response = await app.inject({
      method: 'PUT',
      url: '/notifications/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /notifications/:id should delete a notification or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/notifications/${createdNotificationId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });

  it('DELETE /notifications/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/notifications/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });
});

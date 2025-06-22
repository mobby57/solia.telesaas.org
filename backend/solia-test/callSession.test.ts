import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('CallSession Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdCallSessionId: string;

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

  it('GET /callSessions should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/callSessions',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /callSessions should create a call session with duration, users, and mission', async () => {
    const newCallSession = {
      duration: 3600,
      userIds: ['testuser'],
      missionId: new Types.ObjectId().toHexString(),
    };
    const response = await app.inject({
      method: 'POST',
      url: '/callSessions',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newCallSession,
    });
    expect(response.statusCode).toBe(201);
    const callSession = response.json();
    expect(callSession).toHaveProperty('duration', newCallSession.duration);
    createdCallSessionId = callSession.id;
  });

  it('GET /callSessions/:id should return a call session or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/callSessions/${createdCallSessionId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const callSession = response.json();
      expect(callSession.id).toBe(createdCallSessionId);
    }
  });

  it('PUT /callSessions/:id should update a call session or return 404', async () => {
    const updateData = { duration: 7200 };
    const response = await app.inject({
      method: 'PUT',
      url: `/callSessions/${createdCallSessionId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const callSession = response.json();
      expect(callSession).toHaveProperty('duration', updateData.duration);
    }
  });

  it('DELETE /callSessions/:id should delete a call session or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/callSessions/${createdCallSessionId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

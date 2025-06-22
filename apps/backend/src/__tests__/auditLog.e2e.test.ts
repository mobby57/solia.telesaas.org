import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import auditLogRoutes from '../modules/auditLog/auditLog.routes';

describe('AuditLog e2e tests', () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.register(auditLogRoutes);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('GET /auditLogs should return an array', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/auditLogs',
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(Array.isArray(body)).toBe(true);
  });

  it('POST /auditLogs should create a new audit log', async () => {
    const newLog = { action: 'test action', user: 'test user' };
    const response = await fastify.inject({
      method: 'POST',
      url: '/auditLogs',
      payload: newLog,
    });
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body).toMatchObject(newLog);
  });
});

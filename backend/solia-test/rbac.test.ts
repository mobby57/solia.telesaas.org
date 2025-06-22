import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createFastify } from './utils/buildFastify';
import type { FastifyInstance } from 'fastify';

describe('RBAC Tests', () => {
  let fastify: FastifyInstance;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    fastify = await createFastify();
    await fastify.ready();

    const resAdmin = await request(fastify.server)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'securePassword123' });
    adminToken = resAdmin.body.token;

    const resUser = await request(fastify.server)
      .post('/auth/login')
      .send({ email: 'user@example.com', password: 'userPassword123' });
    userToken = resUser.body.token;
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should allow admin access to admin route', async () => {
    const res = await request(fastify.server)
      .get('/admin-route')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });

  it('should deny user access to admin route', async () => {
    const res = await request(fastify.server)
      .get('/admin-route')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });
});

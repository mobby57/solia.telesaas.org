import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import type { FastifyInstance } from 'fastify';
import { createFastify } from './utils/buildFastify';

describe('Role Module Extended Tests', () => {
  let fastify: FastifyInstance | undefined;
  let tokenAdmin: string | undefined;
  let tokenUser: string | undefined;

  beforeAll(async () => {
    fastify = await createFastify();
    await fastify.ready();

    // Login as admin to get token
    const resAdmin = await request(fastify.server)
      .post('/auth/login')
      .send({ email: 'admin@example.com', password: 'securePassword123' });
    tokenAdmin = resAdmin.body.token;

    // Login as regular user to get token
    const resUser = await request(fastify.server)
      .post('/auth/login')
      .send({ email: 'user@example.com', password: 'userPassword123' });
    tokenUser = resUser.body.token;
  });

  afterAll(async () => {
    if (fastify && typeof fastify.close === 'function') {
      await fastify.close();
    }
  });

  it('should allow admin to create a role', async () => {
    const res = await request(fastify!.server)
      .post('/role')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'newRole' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should deny non-admin to create a role', async () => {
    const res = await request(fastify!.server)
      .post('/role')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ name: 'newRole' });
    expect(res.status).toBe(403);
  });

  it('should allow admin to list roles', async () => {
    const res = await request(fastify!.server)
      .get('/role')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Additional tests for update, delete, get by id, and error cases can be added here
});

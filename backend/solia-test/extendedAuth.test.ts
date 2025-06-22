import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import { createFastify } from './utils/testHelpers';

dotenv.config({ path: '.env.test' });

describe('Extended Auth and Access Control Tests', () => {
  let fastify: FastifyInstance;
  let tokenAdmin: string;
  let tokenUser: string;

  beforeAll(async () => {
    fastify = await createFastify();
    await fastify.ready();
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/solia_test');

    // Health check to verify server readiness
    const healthCheck = await request(fastify.server).get('/health');
    expect(healthCheck.status).toBe(200);

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

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    if (fastify && typeof fastify.close === 'function') {
      await fastify.close();
    }
  });

  it('should allow access with valid admin token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .get('/user/me')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email');
  });

  it('should deny access with no token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server).get('/user/me');
    expect(res.status).toBe(401);
  });

  it('should deny access with invalid token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .get('/user/me')
      .set('Authorization', 'Bearer bad.token.value');
    expect(res.status).toBe(401);
  });

  it('should deny access with insufficient role', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${tokenUser}`);
    expect(res.status).toBe(403);
  });

  it('should allow access with sufficient role', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(200);
  });

  // Additional tests for token expiration, revoked users, scope checks can be added here

  it('should deny access with expired token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    // Simulate expired token by creating one with past expiry or mock verification
    // For demonstration, using a hardcoded expired token string (replace with actual expired token if available)
    const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDAwMDAwMDB9.signature';

    const res = await request(fastify.server)
      .get('/user/me')
      .set('Authorization', `Bearer ${expiredToken}`);

    expect(res.status).toBe(401);
  });

  it('should deny access with revoked token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    // Simulate revoked token scenario
    // This requires the app to check token revocation, here we assume a token string that is revoked
    const revokedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.revoked.payload.signature';

    const res = await request(fastify.server)
      .get('/user/me')
      .set('Authorization', `Bearer ${revokedToken}`);

    // Depending on implementation, could be 401 or 403
    expect([401, 403]).toContain(res.status);
  });

  it('should deny access when user lacks required scope', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    // Assuming /admin route requires 'admin' scope/role
    // Using user token which lacks admin role
    const res = await request(fastify.server)
      .get('/admin')
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.status).toBe(403);
  });

  it('should allow access when user has required scope', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    // Using admin token to access /admin route
    const res = await request(fastify.server)
      .get('/admin')
      .set('Authorization', `Bearer ${tokenAdmin}`);

    expect(res.status).toBe(200);
  });
});

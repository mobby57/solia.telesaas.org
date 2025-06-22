import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import { createFastify } from './utils/testHelpers';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';

dotenv.config({ path: '.env.test' });

describe('API Key Module Tests', () => {
  let fastify: FastifyInstance;
  let adminToken: string;
  let userToken: string;

  beforeAll(async () => {
    await setupInMemoryMongo();
    fastify = await createFastify();
    await fastify.ready();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

    // Login as admin
    const resAdmin = await request(fastify.server)
      .post('/auth/login')
      .send({ email: 'admin@solia.com', password: 'admin123' });
    adminToken = resAdmin.body.token;

    // Login as user
    const resUser = await request(fastify.server)
      .post('/auth/login')
      .send({ email: 'user@solia.com', password: 'user123' });
    userToken = resUser.body.token;
  });

  afterAll(async () => {
    await teardownInMemoryMongo();
    if (fastify && typeof fastify.close === 'function') {
      await fastify.close();
    }
  });

  it('should create API key with admin token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ description: 'Test API Key' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('key');
  });

  it('should deny API key creation with user token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ description: 'Test API Key' });
    expect(res.status).toBe(403);
  });

  it('should list API keys with admin token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .get('/apiKey')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should deny API key listing with user token', async () => {
    if (!fastify) throw new Error('Fastify instance is undefined');
    const res = await request(fastify.server)
      .get('/apiKey')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });
});

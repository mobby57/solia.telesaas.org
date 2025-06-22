import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import { createFastify } from './utils/buildFastify';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';

dotenv.config({ path: '.env.test' });

describe('APIKey Module Extended Tests', () => {
  let fastify: FastifyInstance;
  let tokenAdmin: any;
  let tokenUser: any;

  beforeAll(async () => {
    await setupInMemoryMongo();
    fastify = await createFastify();
    await fastify.ready();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();

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
    await teardownInMemoryMongo();
    if (fastify && typeof fastify.close === 'function') {
      await fastify.close();
    }
  });

  it('should allow admin to create an API key', async () => {
    const res = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'testKey', scopes: ['read', 'write'] });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should deny non-admin to create an API key', async () => {
    const res = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ name: 'testKey', scopes: ['read', 'write'] });
    expect(res.status).toBe(403);
  });

  it('should successfully list API keys', async () => {
    const res = await request(fastify.server)
      .get('/apiKey')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });

  it('should successfully retrieve a specific API key by ID', async () => {
    // First, create an API key to retrieve
    const createRes = await request(fastify.server)
      .post('/apiKey')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({ name: 'retrieveTestKey', scopes: ['read'] });
    const createdId = createRes.body.id;

    // Now, retrieve the API key by ID
    const response = await fastify.inject({
      method: 'GET',
      url: `/apiKey/${createdId}`,
      headers: { authorization: `Bearer ${tokenAdmin}` }
    });
    // Ajoute ce log juste avant l'assertion
    console.log('DEBUG:', response.statusCode, response.body);
    expect(response.statusCode).toBe(200);

    const responseBody = JSON.parse(response.body);
    expect(responseBody).toHaveProperty('id', createdId);
    expect(responseBody).toHaveProperty('name', 'retrieveTestKey');
  });

  // Additional tests for revoke, delete, invalid inputs, and scope enforcement can be added here
});

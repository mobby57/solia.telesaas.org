import { describe, beforeAll, afterAll, it, expect } from 'vitest';
import Fastify from 'fastify';
import authRoutes from '../src/modules/auth/auth.routes';
import { connectInMemoryMongo, disconnectInMemoryMongo } from './utils/inMemoryMongoSetup';

const fastify = Fastify();

describe('Auth Endpoints', () => {
  beforeAll(async () => {
    try {
      // Connect to in-memory MongoDB for tests
      await connectInMemoryMongo();
      console.log('MongoDB connected for tests');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
    fastify.register(authRoutes, { prefix: '/auth' });
    await fastify.ready();
  }, 30000);

  afterAll(async () => {
    try {
      await fastify.close();
      await disconnectInMemoryMongo();
      console.log('MongoDB connection closed after tests');
    } catch (error) {
      console.error('Error during test teardown:', error);
      throw error;
    }
  });

  it('should register a new user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'testuser@example.com',
        password: 'password123',
      },
    });
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body.token).toBeDefined();
  }, 20000);

  it('should not register an existing user', async () => {
    // Register first time
    await fastify.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'existinguser@example.com',
        password: 'password123',
      },
    });
    // Register second time with same email
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'existinguser@example.com',
        password: 'password123',
      },
    });
    expect(response.statusCode).toBe(500); // Error thrown, adjust if error handling changes
  }, 20000);

  it('should login an existing user', async () => {
    // Register user first
    await fastify.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'loginuser@example.com',
        password: 'password123',
      },
    });
    // Login
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'loginuser@example.com',
        password: 'password123',
      },
    });
    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.token).toBeDefined();
  }, 20000);

  it('should not login with invalid credentials', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'nonexistent@example.com',
        password: 'wrongpassword',
      },
    });
    expect(response.statusCode).toBe(500); // Error thrown, adjust if error handling changes
  }, 20000);
});

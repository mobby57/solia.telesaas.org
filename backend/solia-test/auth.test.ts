import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { createFastify } from './utils/buildFastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import type { FastifyInstance } from 'fastify';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';

dotenv.config({ path: '.env.test' });

describe('Authentication Routes', () => {
  let app: Awaited<ReturnType<typeof createFastify>>;

  beforeAll(async () => {
    await setupInMemoryMongo();
    app = await createFastify();
    await app.ready();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await teardownInMemoryMongo();
    if (app && typeof app.close === 'function') {
      await app.close();
    }
  });

  it('POST /login with valid credentials should return token', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'test@example.com',
        password: 'password123',
      },
    });
    expect(response.statusCode).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });

  it('POST /login with invalid credentials should return 401', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: 'wrong@example.com',
        password: 'wrongpassword',
      },
    });
    expect(response.statusCode).toBe(401);
  });

  // Since registerUser is not implemented, skipping registration tests
});

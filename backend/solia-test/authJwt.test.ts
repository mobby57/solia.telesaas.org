import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { Types } from 'mongoose';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { createUser, createRole, createUserRole, generateJwt } from './utils/testHelpers';
import { generateExpiredToken } from './utils/tokenFactory';
import type { FastifyInstance } from 'fastify';
import { buildApp } from '../src/app';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';


dotenv.config({ path: '.env.test' });

let app: FastifyInstance;

describe('authJwt Middleware Tests', () => {
  beforeAll(async () => {
    await setupInMemoryMongo();
    app = await buildApp();

    // Register test route /test/protected-admin with auth and role check
    app.get('/test/protected-admin', {
      preHandler: async (request, reply) => {
        try {
          await request.jwtVerify();
          const user = request.user;
          const userRole = (typeof user === 'object' && user !== null && 'role' in user) ? (user as any).role : undefined;
          if (userRole !== 'admin') {
            reply.status(403).send({ statusCode: 403, error: 'Forbidden', message: 'Insufficient role' });
          }
        } catch (err) {
          reply.status(401).send({ statusCode: 401, error: 'Unauthorized', message: 'Invalid or missing token' });
        }
      }
    }, async (request, reply) => {
      reply.send({ message: 'You are admin' });
    });

    await app.ready();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await teardownInMemoryMongo();
    if (app.close) {
      await app.close();
    }
  });

  it('should deny access with insufficient role', async () => {
    const tenantId = new Types.ObjectId();

    // Create a role that is not "admin"
    const role = await createRole({ name: 'user', tenantId });

    // Create a user and assign the "user" role
    const user = await createUser({ tenantId });
    await createUserRole({ userId: user.id, roleId: role.id, tenantId });

    // Generate JWT for this user
    const token = generateJwt(user);

    // Call an admin-only protected route
    const response = await app.inject({
      method: 'GET',
      url: '/test/protected-admin',
      headers: {
        authorization: `Bearer ${token}`,
        'x-tenant-id': tenantId.toString(),
      },
    });

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body)).toMatchObject({
      statusCode: 403,
      error: 'Forbidden',
      message: 'Insufficient role',
    });
  });

  it('should allow access with valid token and role', async () => {
    const tenantId = new Types.ObjectId();

    const role = await createRole({ name: 'admin', tenantId });
    const user = await createUser({ tenantId });
    await createUserRole({ userId: user.id, roleId: role.id, tenantId });
    const token = generateJwt(user);

    const response = await app.inject({
      method: 'GET',
      url: '/test/protected-admin',
      headers: {
        authorization: `Bearer ${token}`,
        'x-tenant-id': tenantId.toString(),
      },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toMatchObject({
      message: 'You are admin',
    });
  });

  it('should deny access with invalid token', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/test/protected-admin',
      headers: {
        authorization: 'Bearer invalid.token',
      },
    });

    expect(response.statusCode).toBe(401);
  });

  it('should deny access with no token', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/test/protected-admin',
    });

    expect(response.statusCode).toBe(401);
  });

  it('should deny access with expired token', async () => {
    const expiredToken = generateExpiredToken();

    const response = await app.inject({
      method: 'GET',
      url: '/test/protected-admin',
      headers: {
        authorization: `Bearer ${expiredToken}`,
      },
    });

    expect(response.statusCode).toBe(401);
  });
});

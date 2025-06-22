import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import type { FastifyInstance } from 'fastify';
import fastify from 'fastify';
import { createFastify } from '../../apps/backend/src/server/createFastify';

let app: FastifyInstance;

describe('Security tests', () => {
  beforeAll(async () => {
    app = await createFastify();
    await app.listen({ port: 0 });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should respond to root route', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ message: 'Solia API is running' });
  });
});


import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildApp } from '../src/app';
import type { FastifyInstance } from 'fastify';


describe('Serveur complet (buildApp)', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp();
    await app.listen({ port: 0 }); // port 0 = auto free port
  });

  afterAll(async () => {
    if (app.close) {
      await app.close();
    }
  });

  it('GET /health should return status ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });

  // Additional tests for other routes can be added here
});

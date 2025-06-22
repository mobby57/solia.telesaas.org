import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { buildServer } from '../src/serverInstance';
import type { FastifyInstance } from 'fastify';

describe('Serveur minimaliste', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = buildServer();
    await app.listen({ port: 0 }); // port 0 = auto free port
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /health should return status ok', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'ok' });
  });
});

import type { FastifyInstance } from 'fastify';

import { createFastify } from '../../src/utils/buildFastify';

export async function setupTestServer(): Promise<FastifyInstance> {
  const app = await createFastify();
  await app.ready();
  return app;
}

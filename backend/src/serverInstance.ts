import Fastify from 'fastify';

export function buildServer() {
  const app = Fastify({ logger: false }); // disable logger for tests
  app.get('/health', async () => ({ status: 'ok' }));
  return app;
}

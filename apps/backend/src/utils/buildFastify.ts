import Fastify from 'fastify';

export function createFastify() {
  const app = Fastify();
  // Add any global plugins or decorators here
  return app;
}

import fastify from 'fastify';
import authMiddleware from './middleware/auth';
import apiKeyRoutes from './modules/apiKey/apiKey.routes';

export async function buildServer() {
  const app = fastify();

  // Register auth middleware plugin
  await app.register(authMiddleware);

  // Register ApiKey routes with prefix
  await app.register(apiKeyRoutes, { prefix: '/api/keys' });

  // Register other routes and plugins as needed

  return app;
}

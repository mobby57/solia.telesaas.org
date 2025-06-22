import type { FastifyInstance } from 'fastify';
import authRoutes from '../modules/auth/auth.routes';
import userRoutes from '../modules/user/user.routes';
import apiKeyRoutes from '../modules/apiKey/apiKey.routes';
import scriptRoutes from '../routes/script';
// Import other routes as needed

export async function registerRoutes(app: FastifyInstance) {
  app.register(authRoutes, { prefix: '/auth' });
  app.register(userRoutes, { prefix: '/user' });
  app.register(apiKeyRoutes, { prefix: '/apiKey' });
  app.register(scriptRoutes, { prefix: '/scripts' });
  // Register other routes here

  // Add a simple test route for debugging
  app.get('/test', async (request, reply) => {
    return { ok: true };
  });
}

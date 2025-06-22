import type { FastifyPluginAsync } from 'fastify';

export const registerAuth: FastifyPluginAsync = async (app) => {
  // Placeholder auth plugin
  app.get('/test-auth', async () => ({ message: 'Auth plugin placeholder' }));
};

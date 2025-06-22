import type { FastifyPluginAsync } from 'fastify';

export const registerUser: FastifyPluginAsync = async (app) => {
  // Placeholder user plugin
  app.get('/test-user', async () => ({ message: 'User plugin placeholder' }));
};

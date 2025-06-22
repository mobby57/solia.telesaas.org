import type { FastifyPluginAsync } from 'fastify';

export const registerRole: FastifyPluginAsync = async (app) => {
  // Placeholder role plugin
  app.get('/test-role', async () => ({ message: 'Role plugin placeholder' }));
};

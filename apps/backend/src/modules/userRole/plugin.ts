import type { FastifyPluginAsync } from 'fastify';

export const registerUserRole: FastifyPluginAsync = async (app) => {
  // Placeholder userRole plugin
  app.get('/test-userRole', async () => ({ message: 'UserRole plugin placeholder' }));
};

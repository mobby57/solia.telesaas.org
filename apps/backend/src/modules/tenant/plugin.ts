import type { FastifyPluginAsync } from 'fastify';

export const registerTenant: FastifyPluginAsync = async (app) => {
  // Placeholder tenant plugin
  app.get('/test-tenant', async () => ({ message: 'Tenant plugin placeholder' }));
};

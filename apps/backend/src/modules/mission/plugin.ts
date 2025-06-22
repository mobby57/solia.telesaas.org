import type { FastifyPluginAsync } from 'fastify';

export const registerMission: FastifyPluginAsync = async (app) => {
  // Placeholder mission plugin
  app.get('/test-mission', async () => ({ message: 'Mission plugin placeholder' }));
};

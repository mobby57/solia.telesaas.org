import type { FastifyPluginAsync } from 'fastify';

export const registerApiKey: FastifyPluginAsync = async (app) => {
  // Placeholder apiKey plugin
  app.get('/test-apikey', async () => ({ message: 'ApiKey plugin placeholder' }));
};

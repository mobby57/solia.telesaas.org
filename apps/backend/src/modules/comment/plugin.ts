import type { FastifyPluginAsync } from 'fastify';

export const registerComment: FastifyPluginAsync = async (app) => {
  // Placeholder comment plugin
  app.get('/test-comment', async () => ({ message: 'Comment plugin placeholder' }));
};

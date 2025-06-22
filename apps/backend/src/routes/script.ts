import type { FastifyInstance } from 'fastify';

export default async function scriptRoutes(app: FastifyInstance) {
  app.get('/scripts', async (request, reply) => {
    reply.send({ message: 'List of scripts' });
  });
}

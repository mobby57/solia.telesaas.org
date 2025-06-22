import type { FastifyInstance } from 'fastify';

export default async function callSessionRoutes(fastify: FastifyInstance) {
  fastify.get('/callSession', async (request, reply) => {
    return { message: 'CallSession route is working' };
  });

  // Add other callSession related routes here
}

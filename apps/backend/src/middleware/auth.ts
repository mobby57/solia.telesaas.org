/**
 * Removed redundant fastifyJWT registration to avoid conflicts.
 * JWT plugin is registered in backend/src/app.ts
 */

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export default async function authMiddleware(fastify: FastifyInstance) {
  fastify.decorate('verifyToken', async function (request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify();
  });
}

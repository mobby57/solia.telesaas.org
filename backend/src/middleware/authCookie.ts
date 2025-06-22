import type { FastifyReply, FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';

async function authCookieMiddleware(fastify: any) {
  fastify.decorateRequest('user', null);

  fastify.addHook('preHandler', async (request: FastifyRequest & { cookies?: Record<string, string> }, reply: FastifyReply) => {
    const token = request.cookies?.auth_token;
    if (!token) {
      reply.status(401).send({ error: 'Unauthorized' });
      return;
    }

    try {
      const secret = process.env.JWT_SECRET || 'your_jwt_secret';
      const decoded = jwt.verify(token, secret);
      request.user = decoded;
    } catch (err) {
      reply.status(401).send({ error: 'Invalid token' });
      return;
    }
  });
}

export default fp(authCookieMiddleware);

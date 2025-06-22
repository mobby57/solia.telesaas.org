import type { FastifyInstance } from 'fastify';
import { login, register, me, logout } from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

export default async function authRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.post('/login', login);
  fastify.post('/register', register);
  fastify.get('/me', me);
  fastify.post('/logout', logout);
}

import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';
import authMiddleware from '../middleware/auth.js';

function wrapAsyncMiddleware(fn: (request: FastifyRequest, reply: FastifyReply) => Promise<void>) {
  return (request: FastifyRequest, reply: FastifyReply, done: (err?: Error) => void) => {
    fn(request, reply).then(() => done()).catch(done);
  };
}

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.route({
    method: 'GET',
    url: '/user',
    preHandler: [tenantMiddleware],
    handler: listUsers,
  });

  fastify.route({
    method: 'GET',
    url: '/user/:id',
    preHandler: [tenantMiddleware],
    handler: getUser,
  });

  fastify.route({
    method: 'POST',
    url: '/user',
    preHandler: [tenantMiddleware],
    handler: createUser,
  });

  fastify.route({
    method: 'PUT',
    url: '/user/:id',
    preHandler: [tenantMiddleware],
    handler: updateUser,
  });

  fastify.route({
    method: 'DELETE',
    url: '/user/:id',
    preHandler: [tenantMiddleware],
    handler: deleteUser,
  });
}

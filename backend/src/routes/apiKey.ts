import type { FastifyInstance } from 'fastify';
import {
  create,
  list,
  show,
  revoke,
  remove,
} from '../controllers/apiKey.js';
import { authJwt } from '../middleware/authJwt.js';

import { verifyApiKey } from '../middleware/apiKey.js';

export default async function apiKeyRoutes(fastify: FastifyInstance) {
  // Admin routes protected by JWT auth with 'admin' role
  fastify.post('/', { preHandler: [authJwt(['admin'])] }, create);
  fastify.get('/', { preHandler: [authJwt(['admin'])] }, list);
  fastify.get('/:id', { preHandler: [authJwt(['admin'])] }, show);
  fastify.patch('/:id/revoke', { preHandler: [authJwt(['admin'])] }, revoke);
  fastify.delete('/:id', { preHandler: [authJwt(['admin'])] }, remove);

  // Example public route protected by API key middleware
  // fastify.get('/public/secure-data', { preHandler: [verifyApiKey] }, async (request, reply) => {
  //   reply.send({ ok: true });
  // });
}

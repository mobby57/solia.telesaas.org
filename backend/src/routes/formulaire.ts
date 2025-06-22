import type { FastifyInstance } from 'fastify';
import {
  listFormulaires,
  getFormulaire,
  createFormulaire,
  updateFormulaire,
  deleteFormulaire,
} from '../controllers/formulaire.js';
import authMiddleware from '../middleware/auth.js';
import { tenantMiddleware } from '../middleware/tenantMiddleware.js';

export default async function formulaireRoutes(fastify: FastifyInstance) {
  fastify.register(authMiddleware);
  fastify.addHook('preHandler', async (request, reply) => {
    await (fastify as any).verifyToken(request, reply);
  });

  fastify.route({
    method: 'GET',
    url: '/formulaire',
    preHandler: [tenantMiddleware],
    handler: listFormulaires,
  });

  fastify.route({
    method: 'GET',
    url: '/formulaire/:id',
    preHandler: [tenantMiddleware],
    handler: getFormulaire,
  });

  fastify.route({
    method: 'POST',
    url: '/formulaire',
    preHandler: [tenantMiddleware],
    handler: createFormulaire,
  });

  fastify.route({
    method: 'PUT',
    url: '/formulaire/:id',
    preHandler: [tenantMiddleware],
    handler: updateFormulaire,
  });

  fastify.route({
    method: 'DELETE',
    url: '/formulaire/:id',
    preHandler: [tenantMiddleware],
    handler: deleteFormulaire,
  });
}

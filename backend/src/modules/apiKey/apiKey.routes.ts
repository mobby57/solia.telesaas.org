import type { FastifyInstance } from 'fastify';
import {
  create,
  list,
  show,
  revoke,
  remove,
} from './apiKey.controller';
import { requireScope } from './apiKey.middleware';
import { authJwt } from '../../middleware/authJwt';

export default async function apiKeyRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      preHandler: [authJwt(['apiKey:write']), requireScope(['apiKey:write'])],
    },
    create
  );

  fastify.get(
    '/',
    {
      preHandler: [authJwt(['apiKey:read']), requireScope(['apiKey:read'])],
    },
    list
  );

  fastify.get(
    '/:id',
    {
      preHandler: [authJwt(['apiKey:read']), requireScope(['apiKey:read'])],
    },
    show
  );

  fastify.patch(
    '/:id/revoke',
    {
      preHandler: [authJwt(['apiKey:write']), requireScope(['apiKey:write'])],
    },
    revoke
  );

  fastify.delete(
    '/:id',
    {
      preHandler: [authJwt(['apiKey:write']), requireScope(['apiKey:write'])],
    },
    remove
  );
}

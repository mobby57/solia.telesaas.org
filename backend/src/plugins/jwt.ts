import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import { JWT_SECRET } from '../config/env';
import type { FastifyRequest, FastifyReply } from 'fastify';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: JWT_SECRET,
  });

  fastify.decorate("authenticate", async function (request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});

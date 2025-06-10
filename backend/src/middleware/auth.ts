import { FastifyPluginAsync } from 'fastify';
import fastifyJWT from '@fastify/jwt';

const authMiddleware: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyJWT, {
    secret: process.env.JWT_SECRET || 'supersecret', // Replace with environment variable in production!
  });

  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
};

export default authMiddleware;

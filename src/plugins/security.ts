import type { FastifyPluginAsync } from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import fastifyRateLimit from '@fastify/rate-limit';


export const security: FastifyPluginAsync = async (fastify, opts) => {
  await fastify.register(fastifyHelmet);
  await fastify.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });
};

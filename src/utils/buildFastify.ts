import Fastify from 'fastify';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '../plugins/jwt';
import security from '../plugins/security';

export function buildFastify() {
  const fastify = Fastify({
    logger: false,  // disable logger for tests, enable in production
  });

  // Register security plugins
  fastify.register(security);

  // Register JWT plugin with secret
  fastify.register(jwt, { secret: process.env.JWT_SECRET ?? 'supersecretkey' });

  // Register helmet for HTTP headers security
  fastify.register(helmet);

  // Register rate limiting
  fastify.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // You can register other plugins and routes here as needed

  return fastify;
}

import Fastify from 'fastify';
import apiGatewayRoutes from './routes/apiGateway';
import authMiddleware from './middleware/auth';

export async function buildFastify() {
  const fastify = Fastify({ logger: true });

  // Register middlewares
  fastify.register(authMiddleware);

  // Register routes
  fastify.register(apiGatewayRoutes, { prefix: '/api' });

  return fastify;
}

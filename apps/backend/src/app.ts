import type { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import mercurius from 'mercurius';
import fastifyCookie from '@fastify/cookie';
import authPlugin from './middleware/auth';
import { registerRoutes } from './plugins/routes';
import * as taskController from './controllers/tasks';
import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';

export async function buildApp(): Promise<FastifyInstance> {

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  const app = Fastify({
    logger: true,
  });

  // Register Cookie plugin
  app.register(fastifyCookie);

  // Register CORS
  app.register(fastifyCors, {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  // Register JWT plugin
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    sign: { expiresIn: '1h' },
  });

  // Register Mercurius GraphQL plugin
  app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
    context: async (request: FastifyRequest, reply: FastifyReply) => {
      // Extract JWT token and verify user for context
      const token = request.cookies?.token || request.headers.authorization?.replace('Bearer ', '');
      let user = null;
      try {
        if (token) {
          user = await app.jwt.verify(token);
        }
      } catch (_err) {
        // Token invalid or expired
      }
      return { user, request, reply };
    },
  });

  // Register Swagger for API documentation
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Solia API',
        description: 'Documentation API Solia',
        version: '1.0.0',
      },
      host: process.env.HOST || 'localhost:4000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
  });

  // Register auth middleware plugin (adds authMiddleware preHandler)
  app.register(authPlugin);

  // Register all routes via registerRoutes
  await registerRoutes(app);

  // Register task routes inline
  app.get('/tasks', taskController.getTasks);
  app.get('/tasks/:id', taskController.getTaskById);
  app.post('/tasks', taskController.createTask);
  app.put('/tasks/:id', taskController.updateTask);
  app.delete('/tasks/:id', taskController.deleteTask);

  // Health check route
  app.get('/health', async () => {
    return { status: 'ok' };
  });

  // Global error handler
  app.setErrorHandler((error: any, _request: any, _reply: any) => {
    app.log.error(error);
    _reply.status(500).send({ error: 'Internal Server Error' });
  });

  return app;
}

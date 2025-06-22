/// <reference types="fastify" />
/// <reference types="@fastify/cors" />
/// <reference types="@fastify/jwt" />
/// <reference types="@fastify/swagger" />
/// <reference types="@fastify/swagger-ui" />

import type { FastifyInstance } from 'fastify';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import authPlugin from '../middleware/auth';
import prismaMultiTenantMiddleware from '../middleware/prismaMultiTenant';
import userRoutes from '../routes/users';
import * as taskController from '../controllers/tasks';
import authRoutes from '../modules/auth/auth.routes';
import apiKeyRoutes from '../modules/apiKey/apiKey.routes';

export async function createFastify(): Promise<FastifyInstance> {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not set in environment variables');
  }

  const app = Fastify({
    logger: true,
  });

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

  // Register Prisma multi-tenant middleware to Prisma client
  // This is usually applied in prisma client setup, but if needed here, can be added

  // Register routes
  app.register(userRoutes);
  app.register(authRoutes);
  app.register(apiKeyRoutes, { prefix: '/apiKey' });

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
  app.setErrorHandler((error: Error, request: import('fastify').FastifyRequest, reply: import('fastify').FastifyReply) => {
    app.log.error(error);
    reply.status(500).send({ error: 'Internal Server Error' });
  });


  await app.ready();

  return app;
}

import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';
import authPlugin from './middleware/auth';
import { prismaMultiTenantMiddleware } from './middleware/prismaMultiTenant';
import userRoutes from './routes/users';
import * as taskController from './controllers/tasks';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

export { prisma };

// Register CORS
fastify.register(cors, {
  origin: '*',
});

// Register auth middleware plugin (adds authMiddleware preHandler)
fastify.register(authPlugin);

// Register routes
fastify.register(userRoutes);

// Register task routes inline
fastify.get('/tasks', taskController.getTasks);
fastify.get('/tasks/:id', taskController.getTaskById);
fastify.post('/tasks', taskController.createTask);
fastify.put('/tasks/:id', taskController.updateTask);
fastify.delete('/tasks/:id', taskController.deleteTask);

// Add Prisma multi-tenant middleware to Prisma client
prisma.$use(prismaMultiTenantMiddleware(fastify.decorateRequest('tenantId')));

// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Server listening on http://0.0.0.0:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

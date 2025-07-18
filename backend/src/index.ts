import { buildApp } from './app';
import { PrismaClient } from '@prisma/client';
import prismaMultiTenantMiddleware from './middleware/prismaMultiTenant';

import pino from 'pino';

async function start() {
  const fastify = await buildApp();
  const prisma = new PrismaClient();

  // Add Prisma multi-tenant middleware to Prisma client
  prisma.$use(prismaMultiTenantMiddleware());

  // Test pino logger
  const logger = pino();
  logger.info('Pino logger initialized successfully.');

  // Start server
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    fastify.log.info('Server listening on http://0.0.0.0:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();

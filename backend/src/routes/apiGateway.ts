import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import userRoutes from './user.js';
// Placeholder imports for other modules
// import taskRoutes from './tasks';
// import iaLayerRoutes from './iaLayer';
// import telephonieRoutes from './telephonie';
// import formulairesRoutes from './formulaires';
// import crmRoutes from './crm';
// import facturationRoutes from './facturation';
// import logistiqueRoutes from './logistique';
// import apiPubliqueRoutes from './apiPublique';
// import chatFormationRoutes from './chatFormation';

const apiGatewayRoutes: FastifyPluginAsync = async (fastify: FastifyInstance) => {
  await fastify.register(userRoutes, { prefix: '/users' });
  // Register other module routes here
  // await fastify.register(taskRoutes, { prefix: '/tasks' });
  // await fastify.register(iaLayerRoutes, { prefix: '/ia' });
  // await fastify.register(telephonieRoutes, { prefix: '/telephonie' });
  // await fastify.register(formulairesRoutes, { prefix: '/formulaires' });
  // await fastify.register(crmRoutes, { prefix: '/crm' });
  // await fastify.register(facturationRoutes, { prefix: '/facturation' });
  // await fastify.register(logistiqueRoutes, { prefix: '/logistique' });
  // await fastify.register(apiPubliqueRoutes, { prefix: '/apiPublique' });
  // await fastify.register(chatFormationRoutes, { prefix: '/chatFormation' });
};

export default apiGatewayRoutes;

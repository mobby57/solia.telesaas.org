import { FastifyInstance } from 'fastify';
import * as userRoutes from '@/controllers/auth';
import * as taskRoutes from '@/controllers/tasks';
// Placeholder imports for other modules
// import iaLayerRoutes from '@/controllers/iaLayer';
// import telephonieRoutes from '@/controllers/telephonie';
// import formulairesRoutes from '@/controllers/formulaires';
// import crmRoutes from '@/controllers/crm';
// import facturationRoutes from '@/controllers/facturation';
// import logistiqueRoutes from '@/controllers/logistique';
// import apiPubliqueRoutes from '@/controllers/apiPublique';
// import chatFormationRoutes from '@/controllers/chatFormation';

async function apiGatewayRoutes(fastify: FastifyInstance) {
  fastify.register(userRoutes, { prefix: '/users' });
  fastify.register(taskRoutes, { prefix: '/tasks' });
  // Register other module routes here
  // fastify.register(iaLayerRoutes, { prefix: '/ia' });
  // fastify.register(telephonieRoutes, { prefix: '/telephonie' });
  // fastify.register(formulairesRoutes, { prefix: '/formulaires' });
  // fastify.register(crmRoutes, { prefix: '/crm' });
  // fastify.register(facturationRoutes, { prefix: '/facturation' });
  // fastify.register(logistiqueRoutes, { prefix: '/logistique' });
  // fastify.register(apiPubliqueRoutes, { prefix: '/apiPublique' });
  // fastify.register(chatFormationRoutes, { prefix: '/chatFormation' });
}

export default apiGatewayRoutes;

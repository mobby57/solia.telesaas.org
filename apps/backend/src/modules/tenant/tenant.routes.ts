import type { FastifyInstance } from 'fastify';
import * as tenantController from './tenant.controller';

export default async function tenantRoutes(app: FastifyInstance) {
  app.get('/', tenantController.getTenants);
  app.post('/', tenantController.createTenant);
  app.get('/:id', tenantController.getTenantById);
  app.patch('/:id', tenantController.updateTenant);
  app.delete('/:id', tenantController.deleteTenant);
}

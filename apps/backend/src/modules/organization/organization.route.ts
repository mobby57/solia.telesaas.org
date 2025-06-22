import type { FastifyInstance } from 'fastify';
import * as organizationController from './organization.controller';

export default async function organizationRoutes(app: FastifyInstance) {
  app.get('/', organizationController.getOrganizations);
  app.post('/', organizationController.createOrganization);
  app.get('/:id', organizationController.getOrganizationById);
  app.patch('/:id', organizationController.updateOrganization);
  app.delete('/:id', organizationController.deleteOrganization);
}

import type { FastifyInstance } from 'fastify';
import * as prospectController from './prospect.controller';

export default async function prospectRoutes(app: FastifyInstance) {
  app.get('/', prospectController.getProspects);
  app.post('/', prospectController.createProspect);
  app.get('/:id', prospectController.getProspectById);
  app.patch('/:id', prospectController.updateProspect);
  app.delete('/:id', prospectController.deleteProspect);
}

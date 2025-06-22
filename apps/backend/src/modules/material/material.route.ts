import type { FastifyInstance } from 'fastify';
import * as materialController from './material.controller';

export default async function materialRoutes(app: FastifyInstance) {
  app.get('/', materialController.getMaterials);
  app.post('/', materialController.createMaterial);
  app.get('/:id', materialController.getMaterialById);
  app.patch('/:id', materialController.updateMaterial);
  app.delete('/:id', materialController.deleteMaterial);
}

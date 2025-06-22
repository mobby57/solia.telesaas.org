import type { FastifyInstance } from 'fastify';
import * as roleController from './role.controller';

export default async function roleRoutes(app: FastifyInstance) {
  app.get('/', roleController.getRoles);
  app.post('/', roleController.createRole);
  app.get('/:id', roleController.getRoleById);
  app.patch('/:id', roleController.updateRole);
  app.delete('/:id', roleController.deleteRole);
}

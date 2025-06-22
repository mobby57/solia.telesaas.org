import type { FastifyInstance } from 'fastify';
import * as userController from '../../controllers/user';

export default async function (app: FastifyInstance) {
  app.post('/', userController.createUser);
  app.get('/:id', userController.getUser);
  app.put('/:id', userController.updateUser);
  app.delete('/:id', userController.deleteUser);
}

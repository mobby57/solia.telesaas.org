import type { FastifyInstance } from 'fastify';
import * as userController from './user.controller';

export default async function userRoutes(app: FastifyInstance) {
  app.get('/', userController.getUsers);
  app.get('/:id', userController.getUserById);
  app.post('/', userController.createUser);
  app.patch('/:id', userController.updateUser);
  app.delete('/:id', userController.deleteUser);
}

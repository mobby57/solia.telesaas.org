import type { FastifyInstance } from 'fastify';
import * as userController from '../controllers/users';

async function userRoutes(server: FastifyInstance) {
  server.get('/users', userController.listUsers);
  server.get('/users/:id', userController.getUser);
  server.post('/users', userController.createUser);
  server.put('/users/:id', userController.updateUser);
  server.delete('/users/:id', userController.deleteUser);
}

export default userRoutes;

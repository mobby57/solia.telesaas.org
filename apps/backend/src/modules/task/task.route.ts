import type { FastifyInstance } from 'fastify';
import * as taskController from './task.controller';

export default async function taskRoutes(app: FastifyInstance) {
  app.get('/', taskController.getTasks);
  app.post('/', taskController.createTask);
  app.get('/:id', taskController.getTaskById);
  app.patch('/:id', taskController.updateTask);
  app.delete('/:id', taskController.deleteTask);
}

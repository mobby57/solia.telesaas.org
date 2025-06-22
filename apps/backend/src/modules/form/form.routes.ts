import type { FastifyInstance } from 'fastify';
import * as formController from './form.controller';

export default async function formRoutes(app: FastifyInstance) {
  app.get('/', formController.getForms);
  app.post('/', formController.createForm);
  app.get('/:id', formController.getFormById);
  app.patch('/:id', formController.updateForm);
  app.delete('/:id', formController.deleteForm);
}

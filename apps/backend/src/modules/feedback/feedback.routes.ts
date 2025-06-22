import type { FastifyInstance } from 'fastify';
import * as feedbackController from './feedback.controller';

export default async function feedbackRoutes(app: FastifyInstance) {
  app.get('/', feedbackController.getFeedbacks);
  app.post('/', feedbackController.createFeedback);
  app.get('/:id', feedbackController.getFeedbackById);
  app.patch('/:id', feedbackController.updateFeedback);
  app.delete('/:id', feedbackController.deleteFeedback);
}

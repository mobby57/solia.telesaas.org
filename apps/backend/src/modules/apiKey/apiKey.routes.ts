import type { FastifyInstance } from 'fastify';
import * as apiKeyController from './apiKey.controller';

export default async function apiKeyRoutes(app: FastifyInstance) {
  app.get('/', apiKeyController.getApiKeys);
  app.post('/', apiKeyController.createApiKey);
  app.get('/:id', apiKeyController.getApiKeyById);
  app.patch('/:id', apiKeyController.updateApiKey);
  app.delete('/:id', apiKeyController.deleteApiKey);
}

import type { FastifyReply, FastifyRequest } from 'fastify';
import * as apiKeyService from './apiKey.service';

export async function getApiKeys(request: FastifyRequest, reply: FastifyReply) {
  const apiKeys = await apiKeyService.getAllApiKeys();
  reply.send(apiKeys);
}

export async function createApiKey(request: FastifyRequest, reply: FastifyReply) {
  const newApiKey = await apiKeyService.createApiKey(request.body);
  reply.status(201).send(newApiKey);
}

export async function getApiKeyById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const apiKey = await apiKeyService.getApiKeyById(request.params.id);
  if (!apiKey) {
    reply.status(404).send({ message: 'ApiKey not found' });
    return;
  }
  reply.send(apiKey);
}

export async function updateApiKey(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const updatedApiKey = await apiKeyService.updateApiKey(request.params.id, request.body);
  if (!updatedApiKey) {
    reply.status(404).send({ message: 'ApiKey not found' });
    return;
  }
  reply.send(updatedApiKey);
}

export async function deleteApiKey(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const deleted = await apiKeyService.deleteApiKey(request.params.id);
  if (!deleted) {
    reply.status(404).send({ message: 'ApiKey not found' });
    return;
  }
  reply.send({ message: 'ApiKey deleted' });
}

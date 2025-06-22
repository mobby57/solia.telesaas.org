import type { FastifyRequest, FastifyReply } from 'fastify';
import {
  createApiKey,
  listApiKeys,
  getApiKey,
  revokeApiKey,
  deleteApiKey,
} from './apiKey.service';
import { createApiKeySchema, listApiKeysQuerySchema, revokeApiKeyParamsSchema } from './apiKey.schema';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  try {
    const parsed = createApiKeySchema.parse(req.body);
    const tenantId = (req.user as any)?.tenantId;
    if (!tenantId) {
      return reply.status(400).send({ message: 'Tenant ID missing in user context' });
    }
    const key = await createApiKey({ ...parsed, tenantId });
    reply.status(201).send(key);
  } catch (err) {
    reply.status(400).send({ message: 'Invalid request', error: err });
  }
}

export async function list(req: FastifyRequest, reply: FastifyReply) {
  try {
    const query = listApiKeysQuerySchema.parse(req.query);
    const tenantId = (req.user as any)?.tenantId;
    if (!tenantId) {
      return reply.status(400).send({ message: 'Tenant ID missing in user context' });
    }
    const keys = await listApiKeys({ tenantId, limit: query.limit, offset: query.offset });
    reply.send(keys);
  } catch (err) {
    reply.status(400).send({ message: 'Invalid query parameters', error: err });
  }
}

export async function show(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const key = await getApiKey(id);
  if (!key) {
    return reply.status(404).send({ message: 'ApiKey not found' });
  }
  reply.send(key);
}

export async function revoke(req: FastifyRequest, reply: FastifyReply) {
  try {
    const params = revokeApiKeyParamsSchema.parse(req.params);
    const key = await revokeApiKey(params.id);
    reply.send(key);
  } catch {
    reply.status(404).send({ message: 'ApiKey not found' });
  }
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  try {
    const params = revokeApiKeyParamsSchema.parse(req.params);
    await deleteApiKey(params.id);
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'ApiKey not found' });
  }
}

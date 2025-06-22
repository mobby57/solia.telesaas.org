import type { FastifyRequest, FastifyReply } from 'fastify';
import {
  createApiKey as serviceCreateApiKey,
  listApiKeys as serviceListApiKeys,
  getApiKey as serviceGetApiKey,
  revokeApiKey as serviceRevokeApiKey,
  deleteApiKey as serviceDeleteApiKey,
} from '../services/apiKeyService';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const { owner, permissions, ttlDays } = req.body as {
    owner: string;
    permissions?: string[];
    ttlDays?: number;
  };
  const tenantId = (req.user as any)?.tenantId;
  if (!tenantId) {
    reply.status(400).send({ message: 'Tenant ID missing in user context' });
    return;
  }
  const key = await serviceCreateApiKey({ owner, permissions, tenantId, ttlDays });
  reply.status(201).send(key);
}

export async function list(req: FastifyRequest, reply: FastifyReply) {
  const tenantId = (req.user as any)?.tenantId;
  if (!tenantId) {
    reply.status(400).send({ message: 'Tenant ID missing in user context' });
    return;
  }
  const keys = await serviceListApiKeys({ tenantId });
  reply.send(keys);
}

export async function show(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  const key = await serviceGetApiKey(id);
  if (!key) {
    reply.status(404).send({ message: 'ApiKey not found' });
    return;
  }
  reply.send(key);
}

export async function revoke(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  try {
    const key = await serviceRevokeApiKey(id);
    reply.send(key);
  } catch {
    reply.status(404).send({ message: 'ApiKey not found' });
  }
}

export async function remove(req: FastifyRequest, reply: FastifyReply) {
  const { id } = req.params as { id: string };
  try {
    await serviceDeleteApiKey(id);
    reply.status(204).send();
  } catch {
    reply.status(404).send({ message: 'ApiKey not found' });
  }
}

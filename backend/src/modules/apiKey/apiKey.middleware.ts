import type { FastifyRequest, FastifyReply } from 'fastify';
import { findByKeyString } from '../../services/apiKeyService';

export function requireScope(requiredScopes: string[]) {
  return async function (request: FastifyRequest, reply: FastifyReply) {
    const apiKeyHeader = request.headers['x-api-key'];
    if (!apiKeyHeader || typeof apiKeyHeader !== 'string') {
      return reply.status(401).send({ message: 'API key required' });
    }

    const key = await findByKeyString(apiKeyHeader);
    if (!key || !key.active) {
      return reply.status(403).send({ message: 'Invalid or revoked API key' });
    }

    const hasScope = requiredScopes.every(scope => key.permissions.includes(scope));
    if (!hasScope) {
      return reply.status(403).send({ message: 'Insufficient scope' });
    }

    // Attach apiKey info to request
    (request as any).apiKey = {
      id: key.id,
      tenantId: key.tenantId,
      scopes: key.permissions,
    };
  };
}

import type { FastifyReply, FastifyRequest } from 'fastify';
import { findByKeyString } from '../services/apiKeyService';

export async function verifyApiKey(req: FastifyRequest, reply: FastifyReply) {
  const key = req.headers['x-api-key'] as string | undefined;
  if (!key) {
    reply.status(403).send({ message: 'API key required' });
    return;
  }

  const apiKey = await findByKeyString(key);
  if (!apiKey) {
    reply.status(401).send({ message: 'Invalid or inactive API key' });
    return;
  }

  // Cast apiKey to any to access expiresAt without TS error
  const apiKeyAny = apiKey as any;
  if (apiKeyAny.expiresAt && apiKeyAny.expiresAt < new Date()) {
    reply.status(401).send({ message: 'API key expired' });
    return;
  }

  // Attach apiKey info to request for downstream handlers
  (req as any).apiKey = apiKey;
}

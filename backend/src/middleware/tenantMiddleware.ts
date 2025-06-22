import type { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';

declare module 'fastify' {
  interface FastifyRequest {
    tenantId?: string;
    user: string | object | Buffer;
  }
}

export async function tenantMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({ error: 'Missing or malformed Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('JWT_SECRET is not defined');
      return reply.status(500).send({ error: 'Internal server error' });
    }

    const payload = jwt.verify(token, secret) as any;

    if (!payload?.tenantId) {
      return reply.status(401).send({ error: 'tenantId missing in token' });
    }

    request.tenantId = payload.tenantId;
    request.user = payload;
  } catch (err) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }
}

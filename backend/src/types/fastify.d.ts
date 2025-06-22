import '@fastify/jwt';
import { FastifyRequest } from 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify(): Promise<void>;
    user?: {
      [key: string]: any;
    };
  }
}

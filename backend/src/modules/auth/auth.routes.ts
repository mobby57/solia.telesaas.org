import type { FastifyInstance } from 'fastify';
import { registerHandler, loginHandler } from './auth.controller';

export default async function (app: FastifyInstance) {
  app.post('/register', registerHandler);
  app.post('/login', loginHandler);
}

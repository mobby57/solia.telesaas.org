declare module '@fastify/autoload' {
  import type { FastifyPluginCallback } from 'fastify';
  const autoload: FastifyPluginCallback;
  export default autoload;
}

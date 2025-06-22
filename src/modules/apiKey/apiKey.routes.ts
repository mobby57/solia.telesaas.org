import type { FastifyInstance } from 'fastify'
import { createApiKey } from './apiKey.service'

export default async function apiKeyRoutes(fastify: FastifyInstance) {
  fastify.post('/create', async (request, reply) => {
    const { key, scopes, tenantId } = request.body as { key: string; scopes: string[]; tenantId: string }
    try {
      const newKey = await createApiKey({ key, scopes, tenantId })
      reply.code(201).send(newKey)
    } catch (err) {
      reply.code(500).send({ error: 'Failed to create API key' })
    }
  })
}

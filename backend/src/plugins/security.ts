import type { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import helmet from '@fastify/helmet'
import cors from '@fastify/cors'

/**
 * Plugin de sécurité : headers + CORS
 */
async function securityPlugin(app: FastifyInstance) {
  // Helmet en premier : ajoute les en‑têtes de protection
  await app.register(helmet, {
    contentSecurityPolicy: false,          // désactive CSP par défaut (à adapter en prod)
    global: true
  })

  // CORS : autorise uniquement tes domaines front (ex. localhost et ton domaine prod)
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',') ?? [
    'http://localhost:3000',             // dev front
    'https://app.solia.io'               // domaine prod
  ]
  await app.register(cors, {
    origin: allowedOrigins,
    credentials: true // cookies / auth
  })
}

export default fp(securityPlugin, {
  name: 'security'
})

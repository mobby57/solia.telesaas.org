// src/app.ts
import Fastify from 'fastify'
import { connectDB } from './db'
import { apiKeyRoutes } from './modules/apiKey/apiKey.routes'
import healthRoute from './routes/health'

export async function buildApp() {
  const app = Fastify({ logger: true })

  // Connect to MongoDB
  await connectDB()

  // Register routes
  app.register(healthRoute, { prefix: '/health' })
  app.register(apiKeyRoutes, { prefix: '/api/keys' })

  return app
}

// Alias
export const buildFastify = buildApp

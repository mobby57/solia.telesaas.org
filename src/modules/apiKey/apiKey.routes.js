import { createApiKey } from './apiKey.service';
export default async function apiKeyRoutes(fastify) {
    fastify.post('/create', async (request, reply) => {
        const { key, scopes, tenantId } = request.body;
        try {
            const newKey = await createApiKey({ key, scopes, tenantId });
            reply.code(201).send(newKey);
        }
        catch (err) {
            reply.code(500).send({ error: 'Failed to create API key' });
        }
    });
}

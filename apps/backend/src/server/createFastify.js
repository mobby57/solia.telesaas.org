import fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import helmet from '@fastify/helmet';
import { registerAuth } from '../modules/auth/plugin';
import { registerUser } from '../modules/user/plugin';
import { registerRole } from '../modules/role/plugin';
import { registerApiKey } from '../modules/apiKey/plugin';
import { registerMission } from '../modules/mission/plugin';
import { registerComment } from '../modules/comment/plugin';
import { registerTenant } from '../modules/tenant/plugin';
import { registerUserRole } from '../modules/userRole/plugin';
export async function createFastify() {
    const app = fastify({
        logger: {
            transport: {
                target: 'pino-pretty',
                options: {
                    translateTime: 'SYS:standard',
                    ignore: 'pid,hostname',
                },
            },
        },
    });
    // Secure HTTP headers
    await app.register(helmet);
    // CORS config pour le frontend local et prod
    await app.register(cors, {
        origin: [
            'http://localhost:3000',
            'https://solia.app', // à adapter pour la prod
        ],
        credentials: true,
    });
    await app.register(cookie, {
        secret: process.env.COOKIE_SECRET ?? 'solia-cookie-secret',
    });
    await app.register(multipart);
    // 🔐 Auth & modules
    await app.register(registerAuth, { prefix: '/auth' });
    await app.register(registerUser, { prefix: '/users' });
    await app.register(registerRole, { prefix: '/roles' });
    await app.register(registerUserRole, { prefix: '/user-roles' });
    await app.register(registerTenant, { prefix: '/tenants' });
    await app.register(registerApiKey, { prefix: '/apikeys' });
    await app.register(registerMission, { prefix: '/missions' });
    await app.register(registerComment, { prefix: '/comments' });
    // Root route for health check or test
    app.get('/', async () => {
        return { message: 'Solia API is running' };
    });
    return app;
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const fastify_1 = __importDefault(require("fastify"));
const auth_routes_1 = __importDefault(require("../src/modules/auth/auth.routes"));
const inMemoryMongoSetup_1 = require("./utils/inMemoryMongoSetup");
const fastify = (0, fastify_1.default)();
(0, vitest_1.describe)('Auth Endpoints', () => {
    (0, vitest_1.beforeAll)(async () => {
        try {
            // Connect to in-memory MongoDB for tests
            await (0, inMemoryMongoSetup_1.connectInMemoryMongo)();
            console.log('MongoDB connected for tests');
        }
        catch (error) {
            console.error('MongoDB connection error:', error);
            throw error;
        }
        fastify.register(auth_routes_1.default, { prefix: '/auth' });
        await fastify.ready();
    }, 30000);
    (0, vitest_1.afterAll)(async () => {
        try {
            await fastify.close();
            await (0, inMemoryMongoSetup_1.disconnectInMemoryMongo)();
            console.log('MongoDB connection closed after tests');
        }
        catch (error) {
            console.error('Error during test teardown:', error);
            throw error;
        }
    });
    (0, vitest_1.it)('should register a new user', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                email: 'testuser@example.com',
                password: 'password123',
            },
        });
        (0, vitest_1.expect)(response.statusCode).toBe(201);
        const body = JSON.parse(response.body);
        (0, vitest_1.expect)(body.token).toBeDefined();
    }, 20000);
    (0, vitest_1.it)('should not register an existing user', async () => {
        // Register first time
        await fastify.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                email: 'existinguser@example.com',
                password: 'password123',
            },
        });
        // Register second time with same email
        const response = await fastify.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                email: 'existinguser@example.com',
                password: 'password123',
            },
        });
        (0, vitest_1.expect)(response.statusCode).toBe(500); // Error thrown, adjust if error handling changes
    }, 20000);
    (0, vitest_1.it)('should login an existing user', async () => {
        // Register user first
        await fastify.inject({
            method: 'POST',
            url: '/auth/register',
            payload: {
                email: 'loginuser@example.com',
                password: 'password123',
            },
        });
        // Login
        const response = await fastify.inject({
            method: 'POST',
            url: '/auth/login',
            payload: {
                email: 'loginuser@example.com',
                password: 'password123',
            },
        });
        (0, vitest_1.expect)(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        (0, vitest_1.expect)(body.token).toBeDefined();
    }, 20000);
    (0, vitest_1.it)('should not login with invalid credentials', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/auth/login',
            payload: {
                email: 'nonexistent@example.com',
                password: 'wrongpassword',
            },
        });
        (0, vitest_1.expect)(response.statusCode).toBe(500); // Error thrown, adjust if error handling changes
    }, 20000);
});

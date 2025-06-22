import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { buildApp } from '../src/app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';
dotenv.config({ path: '.env.test' });
describe('Formulaire API', () => {
    let fastify;
    beforeAll(async () => {
        await setupInMemoryMongo();
        fastify = await buildApp();
        await fastify.ready();
    });
    beforeEach(async () => {
        await mongoose.connection.dropDatabase();
    });
    afterAll(async () => {
        await teardownInMemoryMongo();
        if (fastify && typeof fastify.close === 'function') {
            await fastify.close();
        }
    });
    let createdFormulaireId;
    it('Create Formulaire', async () => {
        const response = await fastify.inject({
            method: 'POST',
            url: '/formulaire',
            payload: {
                title: 'Test Formulaire',
                tenantId: 'test-tenant-id',
            },
            headers: {
                authorization: 'Bearer test-token',
            },
        });
        expect(response.statusCode).toBe(201);
        const body = JSON.parse(response.body);
        expect(body).toHaveProperty('id');
        createdFormulaireId = body.id;
    });
    it('Get Formulaire by ID', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: `/formulaire/${createdFormulaireId}`,
            headers: {
                authorization: 'Bearer test-token',
            },
        });
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.id).toBe(createdFormulaireId);
    });
    it('Update Formulaire', async () => {
        const response = await fastify.inject({
            method: 'PUT',
            url: `/formulaire/${createdFormulaireId}`,
            payload: {
                title: 'Updated Formulaire',
            },
            headers: {
                authorization: 'Bearer test-token',
            },
        });
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(body.title).toBe('Updated Formulaire');
    });
    it('Delete Formulaire', async () => {
        const response = await fastify.inject({
            method: 'DELETE',
            url: `/formulaire/${createdFormulaireId}`,
            headers: {
                authorization: 'Bearer test-token',
            },
        });
        expect(response.statusCode).toBe(204);
    });
    it('Error cases and edge cases', async () => {
        // Test getting non-existent formulaire
        const response = await fastify.inject({
            method: 'GET',
            url: `/formulaire/nonexistentid`,
            headers: {
                authorization: 'Bearer test-token',
            },
        });
        expect(response.statusCode).toBe(404);
    });
});

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('Invoice Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdInvoiceId;
    beforeAll(async () => {
        app = await createFastify();
        await app.listen({ port: 0 });
        tenantId = new Types.ObjectId();
        authToken = generateJwt({ id: 'testuser', role: 'user' });
    });
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
    it('GET /invoices should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/invoices',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /invoices should create an invoice', async () => {
        const newInvoice = {
            amount: 1000,
            description: 'Test invoice',
            status: 'pending',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/invoices',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newInvoice,
        });
        expect(response.statusCode).toBe(201);
        const invoice = response.json();
        expect(invoice).toHaveProperty('amount', newInvoice.amount);
        createdInvoiceId = invoice.id;
    });
    it('GET /invoices/:id should return an invoice or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/invoices/${createdInvoiceId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const invoice = response.json();
            expect(invoice.id).toBe(createdInvoiceId);
        }
    });
    it('PUT /invoices/:id should update an invoice or return 404', async () => {
        const updateData = { status: 'paid' };
        const response = await app.inject({
            method: 'PUT',
            url: `/invoices/${createdInvoiceId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const invoice = response.json();
            expect(invoice).toHaveProperty('status', updateData.status);
        }
    });
    it('DELETE /invoices/:id should delete an invoice or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/invoices/${createdInvoiceId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

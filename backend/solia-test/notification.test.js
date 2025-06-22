import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import { Types } from 'mongoose';
describe('Notification Routes', () => {
    let app;
    let tenantId;
    let authToken;
    let createdNotificationId;
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
    it('GET /notifications should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/notifications',
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /notifications should create a notification', async () => {
        const newNotification = {
            title: 'Test notification',
            message: 'This is a test notification',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/notifications',
            headers: { authorization: `Bearer ${authToken}` },
            payload: newNotification,
        });
        expect(response.statusCode).toBe(201);
        const notification = response.json();
        expect(notification).toHaveProperty('title', newNotification.title);
        createdNotificationId = notification.id;
    });
    it('GET /notifications/:id should return a notification or 404', async () => {
        const response = await app.inject({
            method: 'GET',
            url: `/notifications/${createdNotificationId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const notification = response.json();
            expect(notification.id).toBe(createdNotificationId);
        }
    });
    it('PUT /notifications/:id should update a notification or return 404', async () => {
        const updateData = { message: 'Updated notification message' };
        const response = await app.inject({
            method: 'PUT',
            url: `/notifications/${createdNotificationId}`,
            headers: { authorization: `Bearer ${authToken}` },
            payload: updateData,
        });
        expect([200, 404]).toContain(response.statusCode);
        if (response.statusCode === 200) {
            const notification = response.json();
            expect(notification).toHaveProperty('message', updateData.message);
        }
    });
    it('DELETE /notifications/:id should delete a notification or return 404', async () => {
        const response = await app.inject({
            method: 'DELETE',
            url: `/notifications/${createdNotificationId}`,
            headers: { authorization: `Bearer ${authToken}` },
        });
        expect([204, 404]).toContain(response.statusCode);
    });
});

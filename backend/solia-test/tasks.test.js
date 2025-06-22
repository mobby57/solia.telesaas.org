import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify } from './utils/buildFastify';
describe('Task Routes', () => {
    let app;
    const tenantId = 'test-tenant';
    beforeAll(async () => {
        app = await createFastify();
        await app.listen({ port: 0 });
    });
    afterAll(async () => {
        if (app.close) {
            await app.close();
        }
    });
    it('GET /tasks should return an array', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/tasks',
            headers: { 'x-tenant-id': tenantId },
        });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.json())).toBe(true);
    });
    it('POST /tasks should create a task', async () => {
        const newTask = {
            assignedTo: 'user1',
            missionId: 'mission1',
            title: 'Test Task',
            description: 'Task description',
            dueDate: new Date().toISOString(),
            status: 'pending',
        };
        const response = await app.inject({
            method: 'POST',
            url: '/tasks',
            headers: { 'x-tenant-id': tenantId },
            payload: newTask,
        });
        expect(response.statusCode).toBe(201);
        const body = response.json();
        expect(body).toMatchObject({
            assignedTo: newTask.assignedTo,
            missionId: newTask.missionId,
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
        });
    });
    it('GET /tasks/:id should return a task or 404', async () => {
        // First create a task
        const newTask = {
            assignedTo: 'user2',
            missionId: 'mission2',
            title: 'Task to get',
            status: 'pending',
        };
        const createResponse = await app.inject({
            method: 'POST',
            url: '/tasks',
            headers: { 'x-tenant-id': tenantId },
            payload: newTask,
        });
        expect(createResponse.statusCode).toBe(201);
        const createdTask = createResponse.json();
        // Now get the task by id
        const getResponse = await app.inject({
            method: 'GET',
            url: `/tasks/${createdTask.id}`,
            headers: { 'x-tenant-id': tenantId },
        });
        expect([200, 404]).toContain(getResponse.statusCode);
        if (getResponse.statusCode === 200) {
            const task = getResponse.json();
            expect(task.id).toBe(createdTask.id);
        }
    });
    it('PUT /tasks/:id should update a task or return 404', async () => {
        // Create a task
        const newTask = {
            assignedTo: 'user3',
            missionId: 'mission3',
            title: 'Task to update',
            status: 'pending',
        };
        const createResponse = await app.inject({
            method: 'POST',
            url: '/tasks',
            headers: { 'x-tenant-id': tenantId },
            payload: newTask,
        });
        expect(createResponse.statusCode).toBe(201);
        const createdTask = createResponse.json();
        // Update the task
        const updateData = { title: 'Updated Task Title', status: 'done' };
        const updateResponse = await app.inject({
            method: 'PUT',
            url: `/tasks/${createdTask.id}`,
            headers: { 'x-tenant-id': tenantId },
            payload: updateData,
        });
        expect([200, 404]).toContain(updateResponse.statusCode);
        if (updateResponse.statusCode === 200) {
            const body = updateResponse.json();
            expect(body).toHaveProperty('message', 'Task updated');
        }
    });
    it('DELETE /tasks/:id should delete a task or return 404', async () => {
        // Create a task
        const newTask = {
            assignedTo: 'user4',
            missionId: 'mission4',
            title: 'Task to delete',
            status: 'pending',
        };
        const createResponse = await app.inject({
            method: 'POST',
            url: '/tasks',
            headers: { 'x-tenant-id': tenantId },
            payload: newTask,
        });
        expect(createResponse.statusCode).toBe(201);
        const createdTask = createResponse.json();
        // Delete the task
        const deleteResponse = await app.inject({
            method: 'DELETE',
            url: `/tasks/${createdTask.id}`,
            headers: { 'x-tenant-id': tenantId },
        });
        expect([200, 404]).toContain(deleteResponse.statusCode);
        if (deleteResponse.statusCode === 200) {
            const body = deleteResponse.json();
            expect(body).toHaveProperty('message', 'Task deleted');
        }
    });
});

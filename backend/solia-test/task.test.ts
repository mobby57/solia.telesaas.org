import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Task Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdTaskId: string;

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

  it('GET /tasks should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/tasks',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /tasks should create a task', async () => {
    const newTask = {
      title: 'Test Task',
      description: 'This is a test task',
      assignedUserId: 'testuser',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newTask,
    });
    expect(response.statusCode).toBe(201);
    const task = response.json();
    expect(task).toHaveProperty('title', newTask.title);
    createdTaskId = task.id;
  });

  it('POST /tasks should fail with invalid data', async () => {
    const invalidTask = {
      title: '', // empty title should be invalid
      description: 'Invalid task',
    };
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      headers: { authorization: `Bearer ${authToken}` },
      payload: invalidTask,
    });
    expect(response.statusCode).toBe(400);
  });

  it('GET /tasks/:id should return a task or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/tasks/${createdTaskId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const task = response.json();
      expect(task.id).toBe(createdTaskId);
    }
  });

  it('GET /tasks/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/tasks/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });

  it('PUT /tasks/:id should update a task or return 404', async () => {
    const updateData = { description: 'Updated task description' };
    const response = await app.inject({
      method: 'PUT',
      url: `/tasks/${createdTaskId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const task = response.json();
      expect(task).toHaveProperty('description', updateData.description);
    }
  });

  it('PUT /tasks/:id should return 400 for invalid id', async () => {
    const updateData = { description: 'Updated task description' };
    const response = await app.inject({
      method: 'PUT',
      url: '/tasks/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect(response.statusCode).toBe(400);
  });

  it('DELETE /tasks/:id should delete a task or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/tasks/${createdTaskId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });

  it('DELETE /tasks/:id should return 400 for invalid id', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: '/tasks/invalid-id',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(400);
  });
});

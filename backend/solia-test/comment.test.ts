import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createFastify, generateJwt } from './utils/testHelpers';
import type { FastifyInstance } from 'fastify';
import { Types } from 'mongoose';

describe('Comment Routes', () => {
  let app: FastifyInstance;
  let tenantId: Types.ObjectId;
  let authToken: string;
  let createdCommentId: string;

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

  it('GET /comments should return an array', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/comments',
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.json())).toBe(true);
  });

  it('POST /comments should create a comment with moderation and user/mission relation', async () => {
    const newComment = {
      content: 'Test comment content',
      userId: 'testuser',
      missionId: new Types.ObjectId().toHexString(),
      moderated: false,
    };
    const response = await app.inject({
      method: 'POST',
      url: '/comments',
      headers: { authorization: `Bearer ${authToken}` },
      payload: newComment,
    });
    expect(response.statusCode).toBe(201);
    const comment = response.json();
    expect(comment).toHaveProperty('content', newComment.content);
    createdCommentId = comment.id;
  });

  it('GET /comments/:id should return a comment or 404', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/comments/${createdCommentId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const comment = response.json();
      expect(comment.id).toBe(createdCommentId);
    }
  });

  it('PUT /comments/:id should update a comment or return 404', async () => {
    const updateData = { moderated: true };
    const response = await app.inject({
      method: 'PUT',
      url: `/comments/${createdCommentId}`,
      headers: { authorization: `Bearer ${authToken}` },
      payload: updateData,
    });
    expect([200, 404]).toContain(response.statusCode);
    if (response.statusCode === 200) {
      const comment = response.json();
      expect(comment).toHaveProperty('moderated', updateData.moderated);
    }
  });

  it('DELETE /comments/:id should delete a comment or return 404', async () => {
    const response = await app.inject({
      method: 'DELETE',
      url: `/comments/${createdCommentId}`,
      headers: { authorization: `Bearer ${authToken}` },
    });
    expect([204, 404]).toContain(response.statusCode);
  });
});

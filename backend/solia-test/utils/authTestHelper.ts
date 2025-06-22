import request from 'supertest';
import { createFastify } from '../../src/utils/buildFastify';

const fastify = await createFastify();

interface AuthResponse {
  token: string;
  tenantId: string;
}

/**
 * Registers a new test user and returns the tenantId.
 * @param email - Email of the test user
 * @param password - Password of the test user
 * @param fullName - Full name of the test user
 * @returns tenantId of the created user
 */
export async function registerTestUser(
  email: string,
  password: string,
  fullName: string
): Promise<string> {
  const res = await request(fastify.server)
    .post('/auth/register')
    .send({ email, password, fullName });

  if (res.status !== 201) {
    throw new Error(`Failed to register test user: ${res.status} ${res.text}`);
  }

  return res.body.user.tenantId;
}

/**
 * Logs in a test user and returns the JWT token.
 * @param email - Email of the test user
 * @param password - Password of the test user
 * @returns JWT token string
 */
export async function loginTestUser(email: string, password: string): Promise<string> {
  const res = await request(fastify.server)
    .post('/auth/login')
    .send({ email, password });

  if (res.status !== 200) {
    throw new Error(`Failed to login test user: ${res.status} ${res.text}`);
  }

  return res.body.token;
}

/**
 * Registers and logs in a test user, returning token and tenantId.
 * @param email - Email of the test user
 * @param password - Password of the test user
 * @param fullName - Full name of the test user
 * @returns Object containing token and tenantId
 */
export async function registerAndLoginTestUser(
  email: string,
  password: string,
  fullName: string
): Promise<AuthResponse> {
  const tenantId = await registerTestUser(email, password, fullName);
  const token = await loginTestUser(email, password);
  return { token, tenantId };
}

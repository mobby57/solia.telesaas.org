import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import { beforeAll, afterAll, beforeEach, afterEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { setupInMemoryMongo, teardownInMemoryMongo } from './inMemoryMongoSetup';

const prisma = new PrismaClient();
let app: { close?: () => Promise<void> | void } | undefined;

beforeAll(async () => {
  // Global setup before all tests
  await setupInMemoryMongo();
  await prisma.$connect();
});

afterAll(async () => {
  // Global teardown after all tests
  await prisma.$disconnect();
  await teardownInMemoryMongo();
  if (app && app.close) {
    await app.close();
  }
});

beforeEach(async () => {
  // Setup before each test
  // Clear database tables for isolation
  await prisma.userRole.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.role.deleteMany({});
  // Reset mocks
  vi.clearAllMocks();
});

afterEach(async () => {
  // Cleanup after each test
  // Additional cleanup if needed
});

// Mock global variables or functions if needed
// Example:
// globalThis.fetch = vi.fn();

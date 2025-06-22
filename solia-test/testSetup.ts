// solia-test/testSetup.ts

import { beforeAll, afterAll, beforeEach } from 'vitest';
import mongoose from 'mongoose';

// Connect to MongoDB before all tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/solia_test');
}, 30000); // Increased timeout to 30000ms

// Disconnect from MongoDB after all tests
afterAll(async () => {
  await mongoose.connection.close();
}, 30000); // Increased timeout to 30000ms

// Reset database before each test (optional, can be customized)
beforeEach(async () => {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.deleteMany({});
    } catch (error) {
      console.warn(`Failed to clear collection ${collectionName}:`, error);
    }
  }
});

// Add auth helpers and factories here (example placeholders)

// Example auth helper
export const authHelper = {
  async login() {
    // Implement login mock or real login logic for tests
  },
};

// Example factory for user creation
export const userFactory = {
  async create(attrs = {}) {
    // Implement user creation logic for tests
  },
};

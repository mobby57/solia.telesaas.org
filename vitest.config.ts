import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    globals: true,
    environment: 'node',
    include: [
      'apps/backend/solia-test/**/*.test.ts',
      'apps/backend/solia-test/**/*.test.js',
      'apps/frontend/tests/**/*.test.ts',
      'apps/frontend/tests/**/*.test.js',
      'tests/**/*.test.ts',
      'tests/**/*.test.js'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**'
    ],
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'apps/frontend/src')
    }
  }
});

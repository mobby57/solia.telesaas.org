import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  root: path.resolve(__dirname),
  test: {
    globals: true,
    environment: 'node',
    include: ['solia-test/**/*.test.ts', 'solia-test/**/*.test.js'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.{idea,git,cache,output,temp}/**'
    ],
  coverage: {
    provider: 'istanbul',
    reporter: ['text', 'html'],
    reportsDirectory: './coverage'
  }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});

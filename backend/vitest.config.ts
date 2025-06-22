import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['backend/solia-test/**/*.test.ts', 'backend/solia-test/**/*.test.js', 'backend/solia-test/*.test.ts', 'backend/solia-test/*.test.js', 'backend/solia-test/*.ts', 'backend/solia-test/*.js'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
    ],
    environment: 'node',
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    watch: false,
  },
});

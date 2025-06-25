const path = require('path');

module.exports = {
  root: true,
  ignorePatterns: ['apps/frontend/**/*'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  overrides: [
    {
      files: ['apps/backend/**/*'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./apps/backend/tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
    },
    {
      files: ['vitest.config.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
  ],
};

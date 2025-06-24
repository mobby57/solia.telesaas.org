const path = require('path');

module.exports = {
  root: true,
  ignorePatterns: ['apps/frontend/**/*'],
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
  ],
};

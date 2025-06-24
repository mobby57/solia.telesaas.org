// apps/backend/.eslintrc.js
module.exports = {
  root: true,
  ignorePatterns: ['dist/', '*.d.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json', // local to backend
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
  ],
  rules: {
    // Add your custom rules here if needed
  },
};

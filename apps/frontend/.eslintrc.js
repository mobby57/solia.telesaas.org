module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',       // ✅ utilise le bon tsconfig
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ]
}

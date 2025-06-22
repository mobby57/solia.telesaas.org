module.exports = {
  globals: {
    'ts-jest': {
      tsconfig: 'backend/tsconfig.json',
      isolatedModules: true,
    },
  },
  testEnvironment: 'node',
  testMatch: ['**/solia-test/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['dotenv/config'],
  verbose: true,
};

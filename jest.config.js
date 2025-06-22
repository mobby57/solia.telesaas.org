module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/backend/solia-test/**/*.test.ts'],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};

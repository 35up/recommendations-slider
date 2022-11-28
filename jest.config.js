module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!lit|@lit|@35up)',
  ],
  coverageDirectory: './coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testEnvironment: 'jsdom',
  collectCoverageFrom: ['src/**/*.ts'],
  transform: {
    '^.+\\.[jt]s$': ['ts-jest', {tsConfig: './tsconfig.test.json'}],
  },
};

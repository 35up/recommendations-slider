module.exports = {
  setupFilesAfterEnv: ['./src/setup-tests.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!lit|@lit|@35up|nanoid)',
  ],
  moduleNameMapper: {
    '^lit/directives/(\\w+)$': 'lit/directives/$1.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/cypress/'],
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
    '^.+\\.[jt]s$': ['ts-jest', {tsconfig: './tsconfig.test.json'}],
  },
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'app/**/*.ts',
    '!app/**/*.d.ts',
    '!app/**/*.config.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
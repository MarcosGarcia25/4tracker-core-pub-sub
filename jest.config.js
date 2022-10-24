module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec).ts'],
  resetMocks: true,
  clearMocks: true,
  coverageDirectory: './coverage',
  modulePathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/__test__/'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
  },
  moduleFileExtensions: ['ts', 'js'],
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  testMatch: ['**/*.spec.ts'],
  globals: {
  },
  // detectOpenHandles: true,
  // forceExit: true,
};
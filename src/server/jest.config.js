{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!src/index.ts",
    "!src/**/*.d.ts"
  ],
  "testMatch": [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).ts"
  ],
  "setupFilesAfterEnv": [
    "<rootDir>/src/__tests__/setup.ts"
  ]
}
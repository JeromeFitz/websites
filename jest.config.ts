import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  modulePaths: ['<rootDir>/node_modules'],
  preset: 'ts-jest',
  rootDir: './',
  testMatch: ['**/*.test.ts'],
  watchman: false,
  verbose: true,
}

export default config

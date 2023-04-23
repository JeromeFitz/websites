const nextJest = require('next/jest')

/** @type {import('jest').Config} */
const config = {
  coverageReporters: ['text', 'html'],
  setupFilesAfterEnv: ['@jeromefitz/jest-config/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  watchman: false,
}

const defineConfig = nextJest({ dir: './' })
module.exports = defineConfig(config)

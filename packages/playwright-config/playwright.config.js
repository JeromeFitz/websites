const { defineConfig, devices } = require('@playwright/test')

const config = ({ basePath = '', port, website = 'jeromefitzgerald.com' }) => {
  const baseURL = `http://localhost:${port}${basePath}`

  /** @type {import('@playwright/test').PlaywrightTestConfig} */
  const config = {
    outputDir: 'e2e-results',
    projects: [
      { name: 'Desktop Chrome', use: { ...devices['Desktop Chrome'] } },
      // { name: 'Desktop Firefox', use: { ...devices['Desktop Firefox'] } },
      // { name: 'Desktop Safari', use: { ...devices['Desktop Safari'] } },
      // { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
      { name: 'Mobile Safari', use: { ...devices['iPhone 12'] } },
    ],
    reporter: [['list'], ['html', { open: 'never', outputFolder: 'e2e-report' }]],
    retries: 2,

    testDir: 'src/e2e',

    testMatch: '**/*.e2e.{js,jsx,ts,tsx}',

    use: {
      baseURL,
      screenshot: 'on',
      trace: 'on-first-retry',
      video: 'on-first-retry',
    },

    webServer: {
      command: `pnpm --filter ${website} start`,
      reuseExistingServer: !process.env.CI,
      url: baseURL,
    },
  }

  return defineConfig(config)
}

module.exports = config

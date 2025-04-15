import type { PlaywrightTestConfig } from '@playwright/test'

import { defineConfig, devices } from '@playwright/test'

const config = ({
  basePath = '',
  port,
  website = 'jeromefitzgerald.com',
}: {
  basePath?: string
  port: number
  website?: string
}) => {
  const baseURL = `http://localhost:${port}${basePath}`

  const config: PlaywrightTestConfig = {
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

    testDir: '.',

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

export default config

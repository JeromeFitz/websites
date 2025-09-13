import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    browser: {
      enabled: true,
      // at least one instance is required
      instances: [{ browser: 'chromium' }],
      provider: 'playwright', // or 'webdriverio'
    },
  },
})

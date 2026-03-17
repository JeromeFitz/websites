import react from '@vitejs/plugin-react'
import { playwright } from '@vitest/browser-playwright'
import svgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    browser: {
      enabled: true,
      // at least one instance is required
      instances: [{ browser: 'chromium' }],
      provider: playwright(),
    },
  },
})

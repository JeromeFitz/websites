// const isCI = require('is-ci')

const url = ['http://localhost:3000']
// if (!isCI) {
const urlAdditional = [
  '/events',
  '/events/2023/07/15/jerome-and',
  '/shows',
  '/shows/alex-o-jerome',
]
urlAdditional.map((ua) => {
  url.push(`${url[0]}${ua}`)
})
// }

const config = ({ website }) => ({
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'bf-cache': 'off',
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['warn', { minScore: 1 }],
        'categories:performance': ['warn', { minScore: 0.96 }],
        'categories:seo': ['warn', { minScore: 1 }],
        // @note(radix-ui) bg3+text11 passes, not sure what is going on here
        'color-contrast': 'warn',
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'largest-contentful-paint': ['warn', { minScore: 0.9 }],
        'legacy-javascript': 'off',
        // @note(lighthouse) does not score correctly locally :X
        'max-potential-fid': ['warn', { minScore: 0.66 }],
        'non-composited-animations': 'off',
        'render-blocking-resources': 'off',
        'speed-index': 'off',
        // @note(lighthouse) this is not representative of production
        'server-response-time': 'off',
        'tap-targets': 'off',
        'unused-css-rules': 'warn',
        'unused-javascript': 'off',
        'uses-responsive-images': 'off',
      },
    },
    collect: {
      // Don't run certain audits
      skipAudits: ['redirects-http'],
      // Don't clear localStorage/IndexedDB/etc before loading the page.
      disableStorageReset: true,
      // Wait up to 90s for the page to load
      maxWaitForLoad: 90000,
      startServerCommand: `pnpm turbo run start --filter="${website}"`,
      // startServerReadyPattern:
      //   'ready - started server on 0.0.0.0:3000, url: http://localhost:3000',
      startServerReadyPattern: `${website}:start: - ready started server on 0.0.0.0:3000, url: http://localhost:3000`,
      url,
      numberOfRuns: 1,
      settings: {
        preset: 'desktop',
      },
    },
    server: {},
    upload: {
      target: 'temporary-public-storage',
    },
  },
})

module.exports = config

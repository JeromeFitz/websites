const ERROR = 'error'
const OFF = 'off'
const WARN = 'warn'

const url = ['http://localhost:3000']

const config = ({ urlAdditional, website }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  !!urlAdditional &&
    urlAdditional.map((ua) => {
      url.push(`${url[0]}${ua}`)
    })
  return {
    ci: {
      assert: {
        assertions: {
          'bf-cache': OFF,
          'bootup-time': OFF,
          'categories:accessibility': [ERROR, { minScore: 1 }],
          'categories:best-practices': [WARN, { minScore: 1 }],
          'categories:performance': [WARN, { minScore: 0.96 }],
          'categories:seo': [WARN, { minScore: 0.9 }],
          'color-contrast': ERROR,
          'csp-xss': OFF,
          'dom-size': OFF,
          'empty-heading': OFF,
          'errors-in-console': OFF,
          'largest-contentful-paint': [WARN, { minScore: 0.9 }],
          'lcp-lazy-loaded': OFF,
          'legacy-javascript': OFF,
          'mainthread-work-breakdown': OFF,
          // @note(lighthouse) does not score correctly locally :X
          'max-potential-fid': [WARN, { minScore: 0.66 }],
          'non-composited-animations': OFF,
          'prioritize-lcp-image': OFF,
          'render-blocking-resources': OFF,
          'robots-txt': OFF,
          // @note(lighthouse) this is not representative of production
          'server-response-time': OFF,
          'speed-index': OFF,
          'tap-targets': OFF,
          'total-byte-weight': OFF,
          'unused-css-rules': OFF,
          'unused-javascript': OFF,
          'uses-responsive-images': OFF,
          'uses-text-compression': OFF,
        },
        preset: 'lighthouse:no-pwa',
      },
      collect: {
        // Don't clear localStorage/IndexedDB/etc before loading the page.
        disableStorageReset: true,
        // Wait up to 90s for the page to load
        maxWaitForLoad: 90000,
        numberOfRuns: 1,
        settings: {
          preset: 'desktop',
        },
        // startServerReadyPattern:
        // Don't run certain audits
        skipAudits: ['redirects-http'],
        startServerCommand: `pnpm turbo run start --filter="${website}"`,
        //   'ready - started server on 0.0.0.0:3000, url: http://localhost:3000',
        startServerReadyPattern: `${website}:start: - ready started server on 0.0.0.0:3000, url: http://localhost:3000`,
        url,
      },
      server: {},
      upload: {
        target: 'temporary-public-storage',
      },
    },
  }
}

// eslint-disable-next-line no-undef
module.exports = config

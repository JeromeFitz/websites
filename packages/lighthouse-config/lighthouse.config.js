const config = ({ website }) => ({
  ci: {
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        'bf-cache': 'off',
        'csp-xss': 'off',
        'errors-in-console': 'off',
        'legacy-javascript': 'off',
        'non-composited-animations': 'off',
        'render-blocking-resources': 'off',
        'speed-index': 'off',
        // @note(lighthouse) this is not representative of production
        'server-response-time': 'off',
        'tap-targets': 'off',
        'unused-javascript': 'off',
        'uses-responsive-images': 'off',
      },
    },
    collect: {
      startServerCommand: `pnpm turbo run start --filter="${website}"`,
      startServerReadyPattern:
        'ready - started server on 0.0.0.0:3000, url: http://localhost:3000',
      url: ['http://localhost:3000'],
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

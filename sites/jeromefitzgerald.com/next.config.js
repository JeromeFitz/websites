/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const isCI = require('is-ci')
!isCI && require('dotenv').config({ path: './.env' })

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { withPlaiceholder } = require('@plaiceholder/next')
const { withPlugins } = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['@jeromefitz/design-system'])

const { withBuildInfo } = require('./scripts/buildInfo')

// const getRedirects = require('./config/notion/website/getRedirects')

/**
 * @note this is probably no longer needed with:
 *       tsconfig.json => preserveSymlinks
 */
const isLocal = process.env.DESIGN_SYSTEM__LINK === 'true' ? true : false

/**
 * @yarn link stuff
 */
const externals = [
  '@radix-ui/colors',
  '@stitches/react',
  '@types/react',
  'react',
  'react-dom',
  'react-hot-toast',
  'swr',
]
const messagesDebug = [
  `warn  - [@note]`,
  `warn  - yarn link:`,
  `warn  - 🖼️  @jeromefitz/design-system`,
]

if (!process.env.NEXT_PUBLIC__SITE) {
  throw new Error('process.env.NEXT_PUBLIC__SITE is not set in env')
}

// @hack(dynamic) hack way to ensure when we build we are doing the right site
const urlBaseCheck = 'jeromefitzgerald.com'
// const urlBaseCheck = 'jerandky.com'
if (process.env.NEXT_PUBLIC__SITE !== urlBaseCheck) {
  throw new Error(`process.env.NEXT_PUBLIC__SITE is not: ${urlBaseCheck}`)
}

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com cdn.usefathom.com *.jerandky.com *.jeromefitzgerald.com;
  child-src *.youtube.com *.google.com *.twitter.com *.spotify.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src 'self' * blob: data:;
  object-src 'self' * blob: data:;
  media-src 'none';
  connect-src * vitals.vercel-insights.com;
  font-src 'self';
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
]

/**
 * @type {import('next').NextConfig}
 **/

const nextConfig = {
  amp: false,
  assetPrefix: '',
  distDir: './.next',
  compress: true,
  eslint: {
    // @note(eslint) we use @jeromefitz/codestyle opt out of next.js
    build: false,
  },
  experimental: {
    concurrentFeatures: false,
    serverComponents: false,
  },
  future: { strictPostcssConfiguration: true },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  images: {
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    deviceSizes: [640, 1200, 1920],
    domains: [
      'cdn.jerandky.com', // CDN
      'cdn.jeromefitzgerald.com', // CDN
      'og.jeromefitzgerald.com', // CDN for Open Graph
      'notion.so', // Notion
      'www.notion.so', // Notion
      's3-us-west-2.amazonaws.com', // AWS
      'cdn.aglty.io', // Agility
      'i.scdn.co', // Spotify Album Art
      'images.ctfassets.net', // Contentful
      'images.prismic.io', // Prismic
      'pbs.twimg.com', // Twitter Profile Picture
      'www.datocms-assets.com', // DataO
      'tailwindcss.com', // Tailwind
      'images.unsplash.com', // Unsplash
    ],
    formats: ['image/avif', 'image/webp'],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    imageSizes: [24, 64, 384],
    // minimumCacheTTL: 31536000, // 1 year
    minimumCacheTTL: 18144000, // 1 month
    // minimumCacheTTL: 604800, // 1 week
    // minimumCacheTTL: 86400, // 1 day
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  optimizeFonts: true,
  outputFileTracing: false,
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  // reactStrictMode: true,
  // rewrites() {
  //   return getRedirects
  // },
  // publicRuntimeConfig: {},
  // serverRuntimeConfig: {},
  swcMinify: true,
  useFileSystemPublicRoutes: true, // false will block './pages' as router
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // if (!isServer) {
    //   config.node = {
    //     fs: 'empty',
    //   }
    // }
    if (isLocal) {
      messagesDebug.map((msg) => console.debug(msg))
      if (isServer) {
        config.externals = [...externals, ...config.externals]
      }

      externals.map((_external) => {
        console.debug(`warn  - ›  📦️ ${_external}`)
        /**
         * @note(monorepo) node_modules resides at root
         */
        config.resolve.alias[_external] = path.resolve(
          __dirname,
          '..',
          '..',
          'node_modules',
          _external
        )
      })
    }

    return config
  },
}

/**
 * @note
 * [plugin, pluginConfig]
 */
module.exports = withPlugins(
  [
    // @next/bundle-analyzer
    [withBundleAnalyzer],
    // @plaiceholder/next
    [withPlaiceholder],
    // [
    //   withPWA({
    //     pwa: {
    //       // disable: process.env.NODE_ENV === 'development',
    //       disable: true,
    //       dest: 'public',
    //     },
    //   }),
    // ],
    [withBuildInfo()],
    [withTM],
  ],
  nextConfig
)

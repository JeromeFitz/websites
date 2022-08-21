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
/**
 * @note(pnpm) pass ENV variable to determine if we should transpile
 *            ./src  == transpile
 *            ./dist != transpile
 */
const transpileModules = ['@jeromefitz/shared', 'next-notion']
process.env.DESIGN_SYSTEM__TRANSPILE === 'true' &&
  transpileModules.push('@jeromefitz/design-system')
const withTM = require('next-transpile-modules')(transpileModules)

const { withBuildInfo } = require('./scripts/buildInfo')
// const getRedirects = require('./config/notion/website/getRedirects')

/**
 * @note(pnpm) until we move "websites" into "packages"...
 *
 * When developing locally:
 * - pnpm dev:ds
 * - OR update .env => pnpm dev
 *
 * This maps all the externals required for proper localized
 *  files system path mapping.
 */
const isLocal = process.env.DESIGN_SYSTEM__LINK === 'true' ? true : false
const externals = [
  '@radix-ui/colors',
  '@stitches/react',
  '@types/react',
  'cmdk',
  'react',
  'react-dom',
  'swr',
]
const isLocalDebugMessages = [
  `warn  - [ 📝 ]  pnpm link...`,
  `warn  - [ 🔗 ]  @jeromefitz/design-system`,
]

/**
 * @note The following environment variables are required
 */
const envRequired = [
  'GH_TOKEN',
  'NEXT_PUBLIC__FATHOM_CUSTOM_DOMAIN',
  'NEXT_PUBLIC__FATHOM_SITE_ID',
  'NEXT_PUBLIC__SITE',
  'NOTION_API_KEY',
  'PREVIEW_TOKEN',
  'REDIS_URL',
  'REVALIDATE_TOKEN',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REFRESH_TOKEN',
]
envRequired.map((item) => {
  if (!process.env[item]) {
    throw new Error(`process.env.${item} is not set in env`)
  }
})

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' data: *.youtube.com *.twitter.com cdn.usefathom.com *.${process.env.NEXT_PUBLIC__SITE};
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
  // compiler: {
  //   styledComponents: true,
  // },
  compress: true,
  eslint: {
    // @note(eslint) we use @jeromefitz/codestyle opt out of next.js
    build: false,
  },
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
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
      `cdn.${process.env.NEXT_PUBLIC__SITE}`, // CDN
      'cdn.jerandky.com', // CDN fallback
      'cdn.jeromefitzgerald.com', // CDN fallback
      'og.jeromefitzgerald.com', // CDN fallback for Open Graph
      'notion.so', // Notion
      'www.notion.so', // Notion
      's3-us-west-2.amazonaws.com', // AWS
      'i.scdn.co', // Spotify
      'pbs.twimg.com', // Twitter
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
    /**
     * @note(pnpm) path mapping if working locally
     * @note(npmrc) shamefully-hoist === node_modules at root
     */
    if (isLocal) {
      isLocalDebugMessages.map((msg) => console.debug(msg))
      externals.map((ext) => {
        console.debug(`warn  - [ 📦 ]  ›  ${ext}`)
        config.resolve.alias[ext] = path.resolve(
          __dirname,
          '..',
          '..',
          'node_modules',
          ext
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

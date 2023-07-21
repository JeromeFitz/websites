import { join, resolve } from 'path'

import withBundleAnalyzer from '@next/bundle-analyzer'
import withPlaiceholder from '@plaiceholder/next'

import { setupBuildInfo } from './src/build-info.mjs'
import envRequired from './src/env-required.mjs'
import securityHeaders from './src/security-headers.mjs'

envRequired()

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
  '@types/react',
  'cmdk',
  'react',
  'react-dom',
  'swr',
]
const isLocalDebugMessages = [
  `[ 📝 ] pnpm link...`,
  `[ 🔗 ] @jeromefitz/design-system`,
]

const PROTOCOL = {
  HTTP: 'http',
  HTTPS: 'https',
}
const protocol = PROTOCOL.HTTPS

/**
 * @note(turbopack) can only use the following configuration options
 *                  please see .npmrc, keep using webpack for now (sharp)
 * - configFileName
 * - env
 * - experimental.appDir
 * - experimental.serverComponentsExternalPackages
 * - experimental.turbo
 * - headers
 * - images
 * - onDemandEntries
 * - pageExtensions
 * - reactStrictMode
 * - redirects
 * - rewrites
 * - swcMinify
 * - transpilePackages
 */
const config = ({
  basePath,
  buildInfoConfig,
  pathDirName,
  serverComponentsExternalPackages = [],
  transpilePackages = [],
}) => {
  // console.dir(`> (debug) basePath:    ${basePath}`)
  // console.dir(`> (debug) pathDirName: ${pathDirName}`)

  /**
   * @note(pnpm) pass ENV variable to determine if we should transpile
   *            ./src  == transpile
   *            ./dist != transpile
   */

  process.env.DESIGN_SYSTEM__TRANSPILE === 'true' &&
    transpilePackages.push('@jeromefitz/design-system')

  /**
   * @type {import('next').NextConfig}
   **/
  let nextConfig = {
    amp: {
      canonicalBase: undefined,
    },
    // analyticsId: 'SELF_HOSTED_ONLY',
    assetPrefix: undefined,
    basePath,
    cleanDistDir: true,
    compiler: {},
    compress: true,
    // configFileName: ''
    // crossOrigin: 'same-origin',
    devIndicators: { buildActivity: true, buildActivityPosition: 'bottom-right' },
    distDir: './.next',
    // distDir: './out',
    // env,
    eslint: {
      // @note(eslint) handled outside of next
      ignoreDuringBuilds: true,
    },
    excludeDefaultMomentLocales: true,
    experimental: {
      appDir: true,
      legacyBrowsers: false,
      // @note(next) storybook needs this -- but nothing else.
      outputFileTracingExcludes: {
        '*': [
          'node_modules/.pnpm/@swc+core-linux-x64-musl',
          'node_modules/.pnpm/@swc+core-linux-x64-gnu',
          'node_modules/.pnpm/@esbuild+linux-x64',
        ],
      },
      outputFileTracingRoot: join(pathDirName, '../../'),
      serverComponentsExternalPackages,
    },
    // exportPathMap,
    // generateBuildId,
    // generateEtags,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    httpAgentOptions: {
      keepAlive: true,
    },
    // @note(next) something changed canary.9-13
    // leads me to believe this was incorrect config
    // comment out for now
    // i18n: {
    //   locales: ['en'],
    //   defaultLocale: 'en',
    // },
    images: {
      // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      deviceSizes: [640, 1200, 1920],
      formats: ['image/avif', 'image/webp'],
      // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      imageSizes: [24, 64, 384],
      // minimumCacheTTL: 31536000, // 1 year
      minimumCacheTTL: 18144000, // 1 month
      // minimumCacheTTL: 604800, // 1 week
      // minimumCacheTTL: 86400, // 1 day
      remotePatterns: [
        {
          protocol,
          hostname: `**.${process.env.NEXT_PUBLIC__SITE}`,
        },
        // @note(remotePattern) Podcast Imagery
        {
          protocol,
          hostname: `**.jerandky.com`,
        },
        // @note(remotePattern) Future proofing "other" websites
        {
          protocol,
          hostname: `**.jeromefitzgerald.com`,
        },
        // @note(remotePattern) AWS
        {
          protocol,
          hostname: `**.amazonws.com`,
        },
        {
          protocol,
          hostname: `**.**.amazonws.com`,
        },
        {
          protocol,
          hostname: 's3.us-west-2.amazonaws.com',
        },
        {
          protocol,
          hostname: 'sc-events.s3.amazonaws.com',
        },
        // @note(remotePattern) Notion
        {
          protocol,
          hostname: `**.notion.so`,
        },
        // @note(remotePattern) Spotify
        {
          protocol,
          hostname: `i.scdn.co`,
        },
        // @note(remotePattern) Twitter
        {
          protocol,
          hostname: `pbs.twimg.com`,
        },
        // @note(remotePattern) Unsplash
        {
          protocol,
          hostname: `images.unsplash.com`,
        },
        // @note(remotePattern) Giphy
        {
          protocol,
          hostname: `**.giphy.com`,
        },
      ],
    },
    onDemandEntries: {
      /**
       * @note(next)
       * period (in ms) where the server will keep pages in the buffer
       */
      maxInactiveAge: 15 * 1000,
      /**
       * @note(next)
       * number of pages that should be kept simultaneously without being disposed
       */
      pagesBufferLength: 2,
    },
    optimizeFonts: true,
    output: undefined,
    // output: 'export',
    // output: 'standalone',
    // outputFileTracing: false,
    pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
    publicRuntimeConfig: {
      // @note(next) available on server and client
    },
    // @todo(react) https://nextjs.org/docs/api-reference/next.config.js/react-strict-mode
    // reactStrictMode: true,
    // @note(next) redirect an incoming request path to a different destination path
    // redirects,
    // @note(next) map an incoming request path to a different destination path
    async rewrites() {
      /**
       * @note
       * hack way to get repository data via GitHub
       */
      await setupBuildInfo({ buildInfoConfig, pathDirName })

      // return getRedirects
      return {}
    },
    sassOptions: {},
    serverRuntimeConfig: {
      // @note(next) available on the server
    },
    staticPageGenerationTimeout: 60,
    swcMinify: true,
    trailingSlash: false,
    transpilePackages,
    typescript: {
      // @note(typescript) handled outside of next
      ignoreBuildErrors: true,
    },
    // @note(next) false will block: ./pages
    useFileSystemPublicRoutes: true,

    // @ts-ignore

    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // @note(pnpm)  path mapping if working locally
      if (isLocal) {
        isLocalDebugMessages.map((msg) =>
          console.debug('\x1b[33m%s\x1b[0m', 'warn', ' - ', msg)
        )
        externals.map((ext) => {
          console.debug('\x1b[33m%s\x1b[0m', 'warn', ' - [ 📦 ] ›  ', ext)
          // @note(npmrc) shamefully-hoist === node_modules at root
          // @todo(npmrc) would be nice to not shamefully-hoist
          config.resolve.alias[ext] = resolve(
            pathDirName,
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
   * Plugins cannot handle their own Configuration at this time.
   */
  const wBA = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })
  const plugins = [wBA, withPlaiceholder]

  return plugins.reduce((config, plugin) => plugin(config), nextConfig)
}

export default config

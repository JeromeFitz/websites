import { join, resolve } from 'node:path'

import withBundleAnalyzer from '@next/bundle-analyzer'
import withPlaiceholder from '@plaiceholder/next'

import { setupBuildInfo } from './src/build-info.mjs'
import securityHeaders from './src/security-headers.mjs'

import './src/env.client.mjs'
import './src/env.server.mjs'

/**
 * @todo(next) cannot remove all of these just yet   🫠
 *             moved here instead of env.server for now
 */
const envSecrets = [
  'DRAFT_TOKEN',
  'GH_TOKEN',
  'LHCI_GITHUB_APP_TOKEN',
  // 'NOTION_API_KEY',
  // // 'OCTOKIT_TOKEN',
  'OG_API_KEY',
  'PREVIEW_TOKEN',
  'REVALIDATE_TOKEN',
  'SPOTIFY_CLIENT_ID',
  'SPOTIFY_CLIENT_SECRET',
  'SPOTIFY_REFRESH_TOKEN',
  // // 'UPSTASH_REDIS_REST_TOKEN',
  // // 'UPSTASH_REDIS_REST_URL',
]
for (const envSecretsVar of envSecrets) {
  delete process.env[envSecretsVar]
}

const externals = [
  '@radix-ui/colors',
  'cmdk',
  'react',
  'react-dom',
  'prettier',
  'swr',
]

/**
 * @note(pnpm) remnant from pnpm linking, should be removed
 */
const isLocal = false
const isLocalDebugMessages = [`[ 📝 ] pnpm link...`]

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
 * - experimental.turbo
 * - headers
 * - images
 * - onDemandEntries
 * - outputFileTracingExcludes
 * - outputFileTracingRoot
 * - pageExtensions
 * - reactStrictMode
 * - redirects
 * - rewrites
 * - serverExternalPackages
 * - transpilePackages
 */
const config = ({
  basePath,
  buildInfoConfig,
  pathDirName,
  redirects = [],
  serverComponentsExternalPackages = [],
  transpilePackages = [],
}) => {
  // console.dir(`> (debug) basePath:    ${basePath}`)
  // console.dir(`> (debug) pathDirName: ${pathDirName}`)

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
    devIndicators: {
      buildActivity: true,
      buildActivityPosition: 'bottom-right',
    },
    distDir: './.next',
    // distDir: './out',
    // env,
    eslint: {
      // @note(eslint) handled outside of next
      ignoreDuringBuilds: true,
    },
    excludeDefaultMomentLocales: true,
    experimental: {
      // esmExternals: true,
      // optimizePackageImports: ['@radix-ui/themes'],
      useLightningcss: true,
    },
    // exportPathMap,
    // generateBuildId,
    // generateEtags,
    async headers() {
      return [
        {
          headers: securityHeaders,
          source: '/(.*)',
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
          hostname: `**.${process.env.NEXT_PUBLIC__SITE}`,
          protocol,
        },
        // @note(remotePattern) Podcast Imagery
        {
          hostname: `**.jerandky.com`,
          protocol,
        },
        {
          hostname: `cdn.jerandky.com`,
          protocol,
        },
        // @note(remotePattern) Future proofing "other" websites
        {
          hostname: `**.jeromefitzgerald.com`,
          protocol,
        },
        {
          hostname: `cdn.jeromefitzgerald.com`,
          protocol,
        },
        {
          hostname: `nice-fonts.s3.amazonaws.com`,
          protocol,
        },
        // @note(remotePattern) AWS
        {
          hostname: `**.amazonws.com`,
          protocol,
        },
        {
          hostname: `**.**.amazonws.com`,
          protocol,
        },
        {
          hostname: 's3.us-west-2.amazonaws.com',
          protocol,
        },
        {
          hostname: '*.s3.us-west-2.amazonaws.com',
          protocol,
        },
        {
          hostname: 'sc-events.s3.amazonaws.com',
          protocol,
        },
        {
          hostname: '*.sc-events.s3.amazonaws.com',
          protocol,
        },
        // @note(remotePattern) Notion
        {
          hostname: `**.notion.so`,
          protocol,
        },
        // @note(remotePattern) Spotify
        {
          hostname: `i.scdn.co`,
          protocol,
        },
        // @note(remotePattern) Twitter
        {
          hostname: `pbs.twimg.com`,
          protocol,
        },
        // @note(remotePattern) Unsplash
        {
          hostname: `images.unsplash.com`,
          protocol,
        },
        // @note(remotePattern) Giphy
        {
          hostname: `**.giphy.com`,
          protocol,
        },
        // @note(remotePattern) Apple Music
        {
          hostname: `*.mzstatic.com`,
          protocol,
        },
        // @note(remotePattern) Goodreads
        {
          hostname: `*.gr-assets.com`,
          protocol,
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
    output: undefined,
    // @note(next) storybook needs this -- but nothing else.
    outputFileTracingExcludes: {
      '*': [
        'node_modules/.pnpm/@swc+core-linux-x64-musl',
        'node_modules/.pnpm/@swc+core-linux-x64-gnu',
        'node_modules/.pnpm/@esbuild+linux-x64',
      ],
    },
    // @note(next) monorepo root
    outputFileTracingRoot: join(pathDirName, '../../'),
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
    async redirects() {
      return redirects
    },
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
    serverExternalPackages: serverComponentsExternalPackages,
    serverRuntimeConfig: {
      // @note(next) available on the server
    },
    staticPageGenerationTimeout: 60,
    trailingSlash: false,
    transpilePackages,
    typescript: {
      // @note(typescript) handled outside of next
      ignoreBuildErrors: true,
    },
    // @note(next) false will block: ./pages
    useFileSystemPublicRoutes: true,

    // @ts-ignore

    webpack: (config, { buildId, defaultLoaders, dev, isServer, webpack }) => {
      // @note(pnpm)  path mapping if working locally
      if (isLocal) {
        isLocalDebugMessages.map((msg) =>
          console.debug('\x1b[33m%s\x1b[0m', 'warn', ' - ', msg),
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
            ext,
          )
        })
      }

      // return { ...config, module: { ...config.module, exprContextCritical: false } }
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

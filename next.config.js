/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: './.env.build' })
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const { withPlaiceholder } = require('@plaiceholder/next')
const { withPlugins } = require('next-compose-plugins')
const withPWA = require('next-pwa')

// const getRedirects = require('./config/notion/website/getRedirects')

if (!process.env.NEXT_PUBLIC__SITE) {
  throw new Error('process.env.NEXT_PUBLIC__SITE is not set in env')
}

// @hack(dynamic) hack way to ensure when we build we are doing the right site
const urlBaseCheck = 'jeromefitzgerald.com'
if (process.env.NEXT_PUBLIC__SITE !== urlBaseCheck) {
  throw new Error(`process.env.NEXT_PUBLIC__SITE is not: ${urlBaseCheck}`)
}

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.youtube.com *.twitter.com cdn.usefathom.com *.jeromefitzgerald.com;
  child-src *.youtube.com *.google.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
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

const nextConfig = {
  amp: false,
  assetPrefix: '',
  distDir: './.next',
  eslint: {
    // @note(eslint) we use @jeromefitz/codestyle opt out of next.js
    build: false,
  },
  experimental: {
    catchAllRouting: true,
    enableBlurryPlaceholder: true,
    jsconfigPaths: true,
    modern: true,
    polyfillsOptimization: true,
    productionBrowserSourceMaps: false,
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
    domains: [
      'cdn.jerandky.com', // CDN
      'cdn.jeromefitzgerald.com', // CDN
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
    ],
    imageSizes: [24, 64, 300],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  poweredByHeader: false,
  // rewrites() {
  //   return getRedirects
  // },
  useFileSystemPublicRoutes: true, // false will block './pages' as router
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webpack: (config, { dev, isServer }) => {
    // @todo(sitemap)
    // if (isServer) {
    //   require('./scripts/generate-sitemap');
    // }

    // // Replace React with Preact only in client production build
    // if (!dev && !isServer) {
    //   Object.assign(config.resolve.alias, {
    //     react: 'preact/compat',
    //     'react-dom/test-utils': 'preact/test-utils',
    //     'react-dom': 'preact/compat',
    //   })
    // }

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
    [
      withPWA({
        pwa: {
          dest: 'public',
        },
      }),
    ],
  ],
  nextConfig
)

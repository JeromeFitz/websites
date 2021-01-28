/* eslint-disable @typescript-eslint/no-var-requires */
const { withPlugins } = require('next-compose-plugins')
const getRedirects = require('./config/notion/website/getRedirects')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  amp: false,
  assetPrefix: '',
  distDir: './.next',
  experimental: {
    jsconfigPaths: true,
    modern: true,
    catchAllRouting: true,
    polyfillsOptimization: true,
    productionBrowserSourceMaps: false,
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
    ],
    imageSizes: [24, 64, 300],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
  poweredByHeader: false,
  rewrites() {
    return getRedirects
  },
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
  ],
  nextConfig
)

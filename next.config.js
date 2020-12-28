/* eslint-disable @typescript-eslint/no-var-requires */
const { withPlugins } = require('next-compose-plugins')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  images: {
    domains: [
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
  webpack: (config, { dev, isServer }) => {
    // @todo(sitemap)
    // if (isServer) {
    //   require('./scripts/generate-sitemap');
    // }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
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
  ],
  nextConfig
)

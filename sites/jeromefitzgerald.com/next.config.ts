// import type { RemotePattern } from 'next/dist/shared/lib/image-config'
import '@jeromefitz/next-config/env.client.mjs'
import '@jeromefitz/next-config/env.server.mjs'

import type { NextConfig } from 'next'

// uh...
const PROTOCOL: {
  HTTP: 'http'
  HTTPS: 'https'
} = {
  HTTP: 'http',
  HTTPS: 'https',
}
const protocol = PROTOCOL.HTTPS

const config = () => {
  const nextConfig: NextConfig = {
    compiler: {
      removeConsole:
        process.env.NODE_ENV === 'development'
          ? false
          : { exclude: ['error', 'info'] },
    },
    compress: true,
    devIndicators: {
      position: 'bottom-right',
    },
    eslint: {
      // @note(eslint) handled outside of next
      ignoreDuringBuilds: true,
    },
    excludeDefaultMomentLocales: true,
    experimental: {
      useLightningcss: false,
      webVitalsAttribution: ['CLS', 'LCP'],
    },
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
      /**
       * @note why can you not do a map here?!
       */
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
      ],
    },
    output: undefined,
    pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
    poweredByHeader: false,
    productionBrowserSourceMaps: false,
    trailingSlash: false,
    typescript: {
      // @note(typescript) handled outside of next
      ignoreBuildErrors: true,
    },
    // @note(next) false will block: ./pages
    useFileSystemPublicRoutes: true,
  }

  return nextConfig
}

export default config

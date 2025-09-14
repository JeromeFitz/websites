'use client'

import type { ReactNode } from 'react'

import { envClient } from '@jeromefitz/next-config/env.client.mjs'

import Script from 'next/script'

const musickitUrl = `https://js-cdn.music.apple.com/musickit/v3/musickit.js`

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Script
        src={musickitUrl}
        async
        data-web-components
        id="music-kit"
        onLoad={() => {
          console.dir(`loaded: ${musickitUrl}`)
        }}
      />
      <meta
        name="apple-music-developer-token"
        content={envClient.NEXT_PUBLIC__APPLE_TOKEN_DEVELOPER}
      />
      <meta
        name="apple-music-app-name"
        content={envClient.NEXT_PUBLIC__APPLE_IDENTIFIER}
      />
      <meta name="apple-music-app-build" content="1.0.0" />

      {children}
    </>
  )
}

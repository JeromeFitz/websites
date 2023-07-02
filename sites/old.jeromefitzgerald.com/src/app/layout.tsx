// 'use client'

import '@jeromefitz/tailwind-config/styles/globals.css'
// import '~styles/output.css'

import { cx } from '@jeromefitz/shared/src/utils'
import localFont from 'next/font/local'
import { Fragment, Suspense } from 'react'

import { Analytics } from '~components/Analytics'
import { CommandMenu } from '~components/CommandMenu'
import { Footer } from '~components/Footer'
import { Navigation } from '~components/Navigation'
import { NavigationBar } from '~components/NavigationBar'
import { Providers } from '~components/Providers'
import { ScrollToTopHack } from '~components/ScrollToTopHack'
import { metadata as seo } from '~config/metadata'
// import { log } from '~utils/log'

// const DEBUG_KEY = 'layout.ts >> (root) > '

const fontSans = localFont({
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  src: '../../public/static/fonts/inter/inter-var.woff2',
  // src: '../../public/static/fonts/name-sans/at--name-sans--var-full.woff2',
  style: 'normal',
  variable: '--font-inter',
  weight: '100 900',
})

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = seo

const preconnects = [
  // https://web.dev/preconnect-and-dns-prefetch/#how-to-implement-rel=preconnect
  // 'https://jeromefitzgerald.com',
  'https://cdn.jeromefitzgerald.com',
  'https://crane.jeromefitzgerald.com',
  'https://vitals.vercel-insights.com',
]

function RootLayoutHOC({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {preconnects.map((preconnect, idx) => (
          <Fragment key={`preconnect-${idx}`}>
            <link rel="preconnect" href={preconnect} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={preconnect} />
          </Fragment>
        ))}
      </head>
      <body
        className={cx(
          'overflow-y-auto overflow-x-hidden',
          'transition-all duration-500',
          'selection:bg-radix-mauve12 selection:text-radix-mauve1',
          'bg-white dark:bg-black',
          'font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}

function RootLayoutKitchenSink({ children }: RootLayoutProps) {
  return (
    <RootLayoutHOC>
      <Suspense>
        <Analytics />
      </Suspense>
      <Providers>
        <>
          <Navigation />
          <main className="relative m-0 min-h-screen w-full p-0">
            <NavigationBar />
            <div className="z-10 mx-4 my-6 max-w-screen-sm md:mx-4 md:my-9   md:max-w-screen-lg lg:mx-auto">
              {/* @note(next) does not cause: deopted into client-side rendering  */}
              <ScrollToTopHack>{children}</ScrollToTopHack>
            </div>
          </main>
          <Footer />
          <Suspense>
            <CommandMenu />
          </Suspense>
        </>
      </Providers>
    </RootLayoutHOC>
  )
}

function RootLayout({ children }: RootLayoutProps) {
  return <RootLayoutKitchenSink>{children}</RootLayoutKitchenSink>
}

export default RootLayout

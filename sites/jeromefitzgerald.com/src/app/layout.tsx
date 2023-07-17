import '@jeromefitz/tailwind-config/styles/globals.css'

import { cx } from '@jeromefitz/ds/utils/cx'
import { Analytics } from '@jeromefitz/shared/src/components/Analytics'
import dynamic from 'next/dynamic'
import localFont from 'next/font/local'
import { Fragment, Suspense } from 'react'

import { Banner } from '~components/Banner'
import { Providers } from '~components/Providers'

// const Analytics = dynamic(
//   () =>
//     import('@jeromefitz/shared/src/components/Analytics').then(
//       (mod) => mod.Analytics
//     ),
//   { ssr: true }
// )
// const Footer = dynamic(
//   () => import('~components/Footer').then((mod) => mod.Footer),
//   { ssr: true }
// )
// const NowPlaying = dynamic(
//   () => import('~components/NowPlaying').then((mod) => mod.NowPlaying),
//   { ssr: true }
// )
// const NowReading = dynamic(
//   () => import('~components/NowReading').then((mod) => mod.NowReading),
//   { ssr: true }
// )
// const Analytics = dynamic(
//   async () => {
//     const { Analytics: Component } = await import(
//       '@jeromefitz/shared/src/components/Analytics'
//     )
//     return { default: Component }
//   },
//   { ssr: false }
// )
const Footer = dynamic(
  async () => {
    const { Footer: Component } = await import('~components/Footer')
    return { default: Component }
  },
  { ssr: true }
)
const NowPlaying = dynamic(
  async () => {
    const { NowPlaying: Component } = await import('~components/NowPlaying')
    return { default: Component }
  },
  { ssr: true }
)
const NowReading = dynamic(
  async () => {
    const { NowReading: Component } = await import('~components/NowReading')
    return { default: Component }
  },
  { ssr: true }
)

const fontSans = localFont({
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  // src: '../../public/fonts/inter/inter-var.woff2',
  src: '../../public/fonts/inter/inter-4.0.0-beta9g-var.woff2',
  // src: '../../public/fonts/name-sans/at--name-sans-variable.woff2',
  style: 'normal',
  variable: '--font-inter',
  weight: '100 900',
})

export const metadata = {
  metadataBase: new URL(`https://${process.env.NEXT_PUBLIC__SITE}`),
  colorScheme: 'dark',
  manifest: '/images/favicon/site.webmanifest',
  themeColor: '#0f0f0f',
  referrer: 'origin-when-cross-origin',
  //
  title: 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.',
  description:
    'Jerome Fitzgerald is an an actor, comedian, & writer hailing from Pittsburgh, PA.',
}

const preconnects = [
  // https://web.dev/preconnect-and-dns-prefetch/#how-to-implement-rel=preconnect
  // 'https://jeromefitzgerald.com',
  'https://cdn.jeromefitzgerald.com',
  'https://cdn.usefathom.com',
  'https://vitals.vercel-insights.com',
]

function Wrapper({ children }) {
  return (
    <div
      className={cx(
        // mobile
        'm-2 px-2',
        // desktop
        'md:m-6',
        ''
      )}
    >
      {children}
    </div>
  )
}

function Main({ children }) {
  return (
    <main className="m-0 min-h-screen w-full p-0">
      <Wrapper>{children}</Wrapper>
    </main>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          // 'transition-all duration-200',
          'selection:bg-radix-slate12 selection:text-radix-slate1',
          'bg-white dark:bg-black',
          'font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Suspense>
            <Analytics />
          </Suspense>
          {/* <Analytics /> */}
          <Banner />
          <Main>{children}</Main>
          <Wrapper>
            <NowPlaying />
            <NowReading />
          </Wrapper>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

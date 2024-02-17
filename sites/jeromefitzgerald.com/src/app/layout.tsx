import { cx } from '@jeromefitz/ds/utils/cx'
import { Analytics } from '@jeromefitz/shared/components/Analytics/Analytics'
import '@jeromefitz/tailwind-config/styles/globals.css'

import { Theme } from '@radix-ui/themes'
import { GeistMono as fontGeistMono } from 'geist/font/mono'
import { GeistSans as fontGeistSans } from 'geist/font/sans'
import { Viewport } from 'next'
// import localFont from 'next/font/local'

import '@radix-ui/themes/styles.css'

// import { Banner } from '~components/Banner'
// import NavigationMenu from '~components/Navigation/Navigation'
import { Footer } from '~app/_temp/Footer'
// import { Header } from '~app/_temp/Header'
// import { Layout } from '~components/Layout'
import { Providers } from '~components/Providers'

import { PreloadResources } from './_next/preload-resources'
// import { LayoutClient } from './layout.client'

// // const Footer = dynamic(
// //   () => import('~components/Footer').then((mod) => mod.Footer),
// //   { ssr: false }
// // )
// // const NowPlaying = dynamic(
// //   () => import('~components/NowPlaying').then((mod) => mod.NowPlaying),
// //   { ssr: false }
// // )
// // const NowReading = dynamic(
// //   () => import('~components/NowReading').then((mod) => mod.NowReading),
// //   { ssr: false }
// // )
// // const Analytics = dynamic(
// //   async () => {
// //     const { Analytics: Component } = await import(
// //       '@jeromefitz/shared/src/components/Analytics'
// //     )
// //     return { default: Component }
// //   },
// //   { ssr: false }
// // )
// const Footer = dynamic(
//   async () => {
//     const { Footer: Component } = await import('~components/Footer')
//     return { default: Component }
//   },
//   { ssr: false }
// )
// const NowPlaying = dynamic(
//   async () => {
//     const { NowPlaying: Component } = await import('~components/NowPlaying')
//     return { default: Component }
//   },
//   { ssr: false }
// )
// const NowReading = dynamic(
//   async () => {
//     const { NowReading: Component } = await import('~components/NowReading')
//     return { default: Component }
//   },
//   { ssr: false }
// )

const fontInter = { variable: '' }
// const fontInter = localFont({
//   declarations: [
//     {
//       prop: 'unicode-range',
//       value:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
//     },
//   ],
//   display: 'swap',
//   src: '../../public/fonts/inter/inter-4.0.0-beta9g-var.woff2',
//   style: 'normal',
//   variable: '--font-inter',
//   weight: '100 900',
// })
// const fontGeistMono = localFont({
//   declarations: [
//     {
//       prop: 'unicode-range',
//       value:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
//     },
//   ],
//   display: 'swap',
//   src: '../../public/fonts/geist/GeistMonoVF--1.0.0.woff2',
//   style: 'normal',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// })
// const fontGeistSans = localFont({
//   declarations: [
//     {
//       prop: 'unicode-range',
//       value:
//         'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
//     },
//   ],
//   display: 'swap',
//   src: '../../public/fonts/geist/GeistVF--1.0.0.woff2',
//   style: 'normal',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// })

// export const metadata = {
//   metadataBase: new URL(`https://${process.env.NEXT_PUBLIC__SITE}`),
//   manifest: '/images/favicon/site.webmanifest',
//   referrer: 'origin-when-cross-origin',
//   //
//   title: 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.',
//   description:
//     'Jerome Fitzgerald is an an actor, comedian, & writer hailing from Pittsburgh, PA.',
// }

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f0f0f',
}

function Wrapper({ children }) {
  return <div className={cx('')}>{children}</div>
}

function Main({ children }) {
  return (
    <main className="m-0 min-h-screen w-full p-0 font-sans">
      <Wrapper>{children}</Wrapper>
    </main>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      // className={cx(fontInter.variable, GeistSans.variable, GeistMono.variable)}
      className={cx(
        fontInter.variable,
        fontGeistMono.variable,
        fontGeistSans.variable,
        '',
      )}
      lang="en"
      suppressHydrationWarning
    >
      <PreloadResources />
      <body
        className={cx(
          'overflow-y-auto overflow-x-hidden md:overflow-y-auto',
          // 'transition-all duration-200',
          'selection:bg-[var(--gray-12)] selection:text-[var(--gray-1)]',
          'bg-white dark:bg-black',
          'font-sans antialiased',
          '',
        )}
      >
        <Theme
          accentColor="pink"
          grayColor="gray"
          panelBackground="translucent"
          radius="medium"
          scaling="100%"
        >
          <Providers>
            <Analytics />
            {/* <LayoutClient> */}
            {/* <Header /> */}
            <Main>{children}</Main>
            {/* <Layout /> */}
            <Footer />
            {/* </LayoutClient> */}
          </Providers>
        </Theme>
      </body>
    </html>
  )
}

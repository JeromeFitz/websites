import { cx } from '@jeromefitz/ds/utils/cx'
import { Analytics } from '@jeromefitz/shared/components/Analytics/Analytics'
import '@jeromefitz/tailwind-config/styles/globals.css'

import { Theme } from '@radix-ui/themes'
import { GeistMono as fontGeistMono } from 'geist/font/mono'
import { GeistSans as fontGeistSans } from 'geist/font/sans'
import { Viewport } from 'next'
// import localFont from 'next/font/local'

import { Footer } from '@/app/_temp/Footer'
import { BannerClient } from '@/components/Banner/Banner.client'
import { Navigation } from '@/components/Navigation/index'
import { Providers } from '@/components/Providers/index'
import { Wrapper } from '@/components/Wrapper/index'

import { PreloadResources } from './_next/preload-resources'

import '@radix-ui/themes/styles.css'

// // const Footer = dynamic(
// //   () => import('~components/Footer').then((mod) => mod.Footer),
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

      <Theme
        accentColor="pink"
        asChild
        grayColor="gray"
        panelBackground="translucent"
        radius="medium"
        scaling="100%"
      >
        <body
          className={cx(
            // 'overflow-y-auto overflow-x-hidden lg:overflow-y-auto',
            // 'transition-all duration-200',
            'selection:bg-[var(--mauve-12)] selection:text-[var(--mauve-1)]',
            'bg-white dark:bg-black',
            'font-sans antialiased',
            '',
          )}
        >
          <Providers>
            <Analytics />
            <Wrapper
              as="header"
              className={cx('sticky top-0 !z-30 mx-auto w-full ')}
            >
              <Navigation />
            </Wrapper>
            <Wrapper className="">
              <BannerClient />
            </Wrapper>
            <Wrapper as="main" className="">
              <>{children}</>
            </Wrapper>
            <Wrapper as="footer" className="">
              <Footer />
            </Wrapper>
            {/* <ThemePanel /> */}
          </Providers>
        </body>
      </Theme>
    </html>
  )
}

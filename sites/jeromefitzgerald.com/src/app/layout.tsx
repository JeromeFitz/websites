import { cx } from '@jeromefitz/ds/utils/cx'
import { Analytics } from '@jeromefitz/shared/components/Analytics/Analytics'

import { Theme } from '@radix-ui/themes/dist/esm/components/theme.js'
import { GeistMono as fontGeistMono } from 'geist/font/mono'
import { GeistSans as fontGeistSans } from 'geist/font/sans'
import { Viewport } from 'next'
// import localFont from 'next/font/local'

import { Banner } from '@/components/Banner/Banner'
import { Navigation } from '@/components/Navigation/index'
import { Providers } from '@/components/Providers/index'
import { Wrapper } from '@/components/Wrapper/index'

import { PreloadResources } from './_next/preload-resources'

/* eslint-disable perfectionist/sort-imports */
import '@jeromefitz/tailwind-config/styles/globals.css'
import '@radix-ui/themes/styles.css'

// const fontInter = { variable: '' }
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
  themeColor: '#030303',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      // className={cx(fontInter.variable, GeistSans.variable, GeistMono.variable)}
      className={cx(
        // fontInter.variable,
        fontGeistMono.variable,
        fontGeistSans.variable,
        '',
      )}
      lang="en"
      suppressHydrationWarning={true}
    >
      <PreloadResources />

      <Theme
        accentColor="pink"
        asChild
        grayColor="mauve"
        panelBackground="translucent"
        radius="medium"
        scaling="100%"
      >
        <body
          className={cx(
            'overflow-y-auto overflow-x-hidden lg:overflow-y-auto',
            'selection:bg-gray-12 selection:text-gray-1',
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
              <Banner />
            </Wrapper>
            {children}
          </Providers>
        </body>
      </Theme>
    </html>
  )
}

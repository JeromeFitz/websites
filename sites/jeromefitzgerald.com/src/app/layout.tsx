import '@jeromefitz/tailwind-config/styles/globals.css'

import { cx } from '@jeromefitz/ds/utils/cx'
import localFont from 'next/font/local'
import { Suspense } from 'react'

import { Analytics } from '~components/Analytics'
import { Banner } from '~components/Banner'
import { Footer } from '~components/Footer'
// // import { Header } from '~components/Header'
import { NowPlaying } from '~components/NowPlaying'
import { NowReading } from '~components/NowReading'
import { Providers } from '~components/Providers'

const fontSans = localFont({
  display: 'swap',
  declarations: [
    {
      prop: 'unicode-range',
      value:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
    },
  ],
  // src: '../../public/static/fonts/inter/inter-var.woff2',
  src: '../../public/static/fonts/inter/inter-4.0.0-beta9g-var.woff2',
  // src: '../../public/static/fonts/name-sans/at--name-sans-variable.woff2',
  style: 'normal',
  variable: '--font-inter',
  weight: '100 900',
})

export const metadata = {
  title: 'Jerome Fitzgerald (he/him) | Actor. Comedian. Writer.',
  description:
    'Jerome Fitzgerald is an an actor, comedian, & writer hailing from Pittsburgh, PA.',
}

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
        <Providers>
          <Suspense>
            <Analytics />
          </Suspense>
          <Banner />
          {/* <Header /> */}
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
